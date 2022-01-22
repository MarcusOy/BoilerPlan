import puppeteer from "puppeteer";
import fs from "fs";

async function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 10 });
  const page = await browser.newPage();

  // Navigate to login page and login
  await page.goto("https://mypurdue.purdue.edu");
  await page.type("#username", "morciuch");
  await page.type("#password", "9482,push");
  await page.click("input[type=submit]");
  await page.waitForResponse((response) => response.ok());

  // Redirect to Lookup classes Self Service
  await page.goto(
    "https://wl.mypurdue.purdue.edu/static_resources/portal/jsp/ss_redir_lp5.jsp?pg=23"
  );
  await page.waitForResponse((response) => response.ok());

  // Select term page and select Spring 2022
  await page.select("select", "202220");
  var [_, submitButton] = await page.$$("input[type=submit]");
  await submitButton.click();
  await page.waitForResponse((response) => response.ok());

  // Grab subject list
  await page.waitForSelector("#subj_id");
  let subjects = await page.$$eval("#subj_id option", (subj) =>
    subj.map((s) => s.textContent)
  );
  // Convert subjects list to subject codes
  let subjectCodes = subjects.map((s) => s.split("-")[0]);
  // Select all subjects in select and submit
  await page.select("#subj_id", ...subjectCodes);
  var [_, submitButton] = await page.$$("input[type=submit]");
  await submitButton.click();

  await page.waitForResponse((response) => response.ok());

  // Scrape all displayed courses
  await page.waitForSelector(".datadisplaytable tbody tr th");
  await timeout(10000);

  let allCourses = await page.$$eval("table", (tables) => {
    let courses = [];
    tables.map((t) => {
      let [term, subject, ...classes] = t.querySelectorAll("tbody tr");
      if (subject == undefined || subject.querySelector("th") == null) return;
      let subjectCode = subject.querySelector("th").innerText.split("-")[0];
      let c = classes.map(
        (tr) => `${subjectCode} ${tr.querySelector("td").innerText}`
      );
      courses.push(...c);
    });
    return courses;
  });

  await console.log(allCourses);

  await browser.close();

  fs.writeFile(
    "./src/boilerplan-scrapers/courselist.json",
    JSON.stringify(allCourses),
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    }
  );
})();
