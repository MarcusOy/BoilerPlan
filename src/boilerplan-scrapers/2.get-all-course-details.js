import * as rax from "retry-axios";
import axios from "axios";
import qs from "qs";
import convert from "xml-js";
import getUuid from "uuid-by-string";
import courses from "./courselist.json";

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const scrapeCourse = async (subj, num) => {
  console.log(`Scraping ${subj} ${num}`);
  var data = {
    SCRIPT: "SD2COURSEINFO",
    // COURSEDISC: "AGEC",
    // COURSENUMB: "32700",
    COURSEDISC: subj,
    COURSENUMB: num,
    REPORT: "WEB31",
    REPORTUCLASS: "WEB31STU",
    ContentType: "xml",
  };

  var options = {
    method: "POST",
    url: "https://mypurdueplan.purdue.edu/dashboard/dashboard",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie:
        "JSESSIONID=54A6C8A03FA71DADC3CBF60D2A19C61E; NAME=Marcus%20A%20Orciuch; REFRESH_TOKEN=Bearer+eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMzEzNjc1NzQiLCJpbnRlcm5hbElkIjoiMDMxMzY3NTc0IiwidXNlckNsYXNzIjoiU1RVIiwiYXBwTmFtZSI6ImRlZ3JlZXdvcmtzIiwibmFtZSI6Ik9yY2l1Y2gsIE1hcmN1cyBBIiwiZXhwaXJlSW5jcmVtZW50U2Vjb25kcyI6NzIwMCwiZXhwIjoxNjQyOTA3NjI2LCJhbHRJZCI6IjAwMzEzNjc1NzQiLCJpYXQiOjE2NDI4MjM2MjYsImp0aSI6IjNlYTNiYjc5LTI0NWUtNGJhNi04MTEwLTQyYWJiZmIyYmQ2ZSJ9.gZNG8lQFHQTiMd-uITDcqmEvI5ek0DDx7Tqx1xd4QXU; DGW_BigIP_Cookie=!jKC8nMF7zcnzghJ3ZAchGuGk1L0WogWD4K7f1eA5xFHFtK1XcWZZOJqyFx4hW5GPnzija60RQCD5+Q==; X-AUTH-TOKEN=Bearer+eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMzEzNjc1NzQiLCJpbnRlcm5hbElkIjoiMDMxMzY3NTc0IiwidXNlckNsYXNzIjoiU1RVIiwiYXBwTmFtZSI6ImRlZ3JlZXdvcmtzIiwicm9sZXMiOlsiU0VQUFRNT0QiLCJTREdQQUNMQyIsIlNER1BBR1JEIiwiU0RXSEFUSUYiLCJTRVBQRURJVCIsIlNFUFBURU1QIiwiU0VQUFRERUwiLCJTRVBWQVVEIiwiU0RYTUwzMSIsIlJTUExBTiIsIlNFUFBBVUQiLCJTRVBQUlFFRCIsIlNFUFBSUUFEIiwiUlNTRVRUTkciLCJTRVBQTEFOIiwiU0VQUFNFTCIsIlNEU1RVTUUiLCJTRVBQVEFERCIsIlNFUFBBREQiLCJTREFVRElUIiwiU0VQUE1PRCIsIlNFUFZDQUwiLCJTREFVRFJFViIsIlNEV09SS1MiLCJTREFVRFBERiIsIlNETE9LQUhEIiwiU0RXRUIzMSIsIlNFUFBSUURMIiwiU0RHUEFBRFYiLCJTRVBQQ09NUCIsIlNER1BBVFJNIiwiU0RXRUIzNiJdLCJuYW1lIjoiT3JjaXVjaCwgTWFyY3VzIEEiLCJkZXBhcnRtZW50cyI6W10sImV4cCI6MTY0MjgzODI4MiwiYWx0SWQiOiIwMDMxMzY3NTc0IiwiaWF0IjoxNjQyODMxMDgyLCJqdGkiOiJjMzA1ZTU1NC00N2UyLTQyZDUtOTFlNy1lNmVmOWRlMDhiZTIifQ.e3mIJ2nCwZuzKu3KXAx2dfpEG4hV45MVR7_UqzvBV3E",
      Origin: "https://mypurdueplan.purdue.edu",
    },
    data: qs.stringify(data),
    raxConfig: {
      // Retry 3 times on requests that return a response (500, etc) before giving up.  Defaults to 3.
      retry: 100,
      // Milliseconds to delay at first.  Defaults to 100. Only considered when backoffType is 'static'
      retryDelay: 500,
      // You can set the backoff type.
      // options are 'exponential' (default), 'static' or 'linear'
      backoffType: "exponential",
      // You can detect when a retry is happening, and figure out how many
      // retry attempts have been made
      onRetryAttempt: (err) => {
        const cfg = rax.getConfig(err);
        console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
      },
    },
  };

  let response = await axios.request(options);

  try {
    var convertedBody = convert.xml2js(response.data, {
      compact: true,
      spaces: 4,
      alwaysArray: ["Prereq"],
    });

    var uuid = getUuid(
      `${convertedBody.CourseInformation.Course._attributes.SubjCode} ${convertedBody.CourseInformation.Course._attributes.CrseNumb}`
    );
    var result = {
      id: uuid,
      subject: convertedBody.CourseInformation.Course._attributes.SubjCode,
      number: parseInt(
        convertedBody.CourseInformation.Course._attributes.CrseNumb
      ),
      title: convertedBody.CourseInformation.Course._attributes.Title,
      description:
        convertedBody.CourseInformation.Course.DescriptionAdditional.Text._cdata.replace(
          /\n/g,
          ""
        ),
    };
    var edges = [];

    if (convertedBody.CourseInformation.Course.Prereqs.Prereq != undefined) {
      edges = convertedBody.CourseInformation.Course.Prereqs.Prereq.map((p) => {
        if (p == undefined) return;
        return {
          courseId: uuid,
          prerequisiteId: getUuid(
            `${p._attributes.SubjCodePreq} ${p._attributes.CrseNumbPreq}`
          ),
          minimumGrade: p._attributes.MinGrde,
        };
      });
    }
    return { result, edges };
  } catch (ex) {
    console.error(`Unable to scrape ${subj} ${num}`, ex);
    return { result: {}, edges: [] };
  }
};

const interceptorId = rax.attach();

let data = {
  courseNodes: [],
  courseEdges: [],
};
for (let x = 0; x < courses.length; x++) {
  let [subj, num] = courses[x].split(" ");
  let { result, edges } = await scrapeCourse(subj, num);
  data.courseNodes.push(result);
  data.courseEdges.push(...edges);
  await timeout(500);
}

fs.writeFile(
  "detailedcourses.json",
  JSON.stringify(detailedCourses),
  function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  }
);
