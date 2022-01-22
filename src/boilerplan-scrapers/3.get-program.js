import axios from "axios";
import qs from "qs";
import convert from "xml-js";
import fs from "fs";

var data = {
  // SERVICE: 'SCRIPTER',
  // REPORT: 'WEB31',
  // SCRIPT: 'SD2GETAUD&ContentType=xml',
  // USERID: '031367574',
  // USERCLASS: 'STU',
  // BROWSER: 'NOT-NAV4',
  // ACTION: 'REVAUDIT',
  // DEGREETERM: 'ACTV',
  // INPROGRESS: 'N',
  // CUTOFFTERM: 'ACTV',
  // REFRESHBRDG: 'N',
  // RELOADSEP: 'TRUE',
  // ContentType: 'xml',
  // STUID: '031367574',
  // SCHOOL: 'UG',
  // STUSCH: 'UG',
  // DEGREE: 'PICIT-BS',
  // STUDEG: 'PICIT-BS',
  // '': '',ß
  SERVICE: "SCRIPTER",
  SCRIPT: "SD2GETAUD",
  ACTION: "WHATIFAUDIT",
  USERID: "031367574",
  STUID: "031367574",
  DEGREETERM: "ACTV",
  INTNOTES: "Y",
  DEGINTEREST: "",
  INPROGRESS: "Y",
  CUTOFFTERM: "9999",
  REFRESH: "N",
  WHATIF: "Y",
  BLOCKLIST: "dummy&GOALCODE=COLLEGE&GOALVALUE=\"S\"&&GOALCODE=MAJOR&GOALVALUE=\"CS\"&GOALCATYR=202220&GOALCODE=CONC&GOALVALUE=\"X06P\"&GOALCATYR=202220&",
  SCHOOL: "\"UG\"",
  DEGREE: "\"COMPSCI-BS\"",
  SCHOOLLIT: "\"Undergraduate\"",
  DEGREELIT: "\"Computer+Science-BS\"",
  CATYEAR: "202220",
  PROGRAM: "",
  ContentType: "xml",
  CLASSLIST: "",
  REPORT: "WEB31",
  InProgress: "Y",
  CutOffTerm: "on",
};


var options = {
  method: 'POST',
  url: 'https://mypurdueplan.purdue.edu/dashboard/dashboard',
  headers: {
    // cookie: 'DGW_BigIP_Cookie=!FZMqtus8nrJOKnd3ZAchGuGk1L0WohiiCG6exGvJlGsvayt8t3r0acw9yxv%2BJdS5ncJaesBgQcQiRw%3D%3D',
    'Content-Type': 'application/x-www-form-urlencoded',
    Cookie: "JSESSIONID=54A6C8A03FA71DADC3CBF60D2A19C61E; REFRESH_TOKEN=Bearer+eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMzEzNjc1NzQiLCJpbnRlcm5hbElkIjoiMDMxMzY3NTc0IiwidXNlckNsYXNzIjoiU1RVIiwiYXBwTmFtZSI6ImRlZ3JlZXdvcmtzIiwibmFtZSI6Ik9yY2l1Y2gsIE1hcmN1cyBBIiwiZXhwaXJlSW5jcmVtZW50U2Vjb25kcyI6NzIwMCwiZXhwIjoxNjQyOTU5Mjc3LCJhbHRJZCI6IjAwMzEzNjc1NzQiLCJpYXQiOjE2NDI4NzUyNzcsImp0aSI6IjJjYTVlZWMyLTM1NDUtNGIwOC1iMWE0LTk4ZWZlYTc2Y2E4YSJ9.kp18bBc0ft7-kT8LLp2VV0iuXaWyZM6lbHg7OuTEHxQ; DGW_BigIP_Cookie=!A+q3Cc/Bb8anXFF3ZAchGuGk1L0WosPgKHSWmhTL8tExnaEw/A3mRFuzdWI0EUjYxw3lTTLa/Nu5DQ==; X-AUTH-TOKEN=Bearer+eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMzEzNjc1NzQiLCJpbnRlcm5hbElkIjoiMDMxMzY3NTc0IiwidXNlckNsYXNzIjoiU1RVIiwiYXBwTmFtZSI6ImRlZ3JlZXdvcmtzIiwicm9sZXMiOlsiU0VQUFRNT0QiLCJTREdQQUNMQyIsIlNER1BBR1JEIiwiU0RXSEFUSUYiLCJTRVBQRURJVCIsIlNFUFBURU1QIiwiU0VQUFRERUwiLCJTRVBWQVVEIiwiU0RYTUwzMSIsIlJTUExBTiIsIlNFUFBBVUQiLCJTRVBQUlFFRCIsIlNFUFBSUUFEIiwiUlNTRVRUTkciLCJTRVBQTEFOIiwiU0VQUFNFTCIsIlNEU1RVTUUiLCJTRVBQVEFERCIsIlNFUFBBREQiLCJTREFVRElUIiwiU0VQUE1PRCIsIlNFUFZDQUwiLCJTREFVRFJFViIsIlNEV09SS1MiLCJTREFVRFBERiIsIlNETE9LQUhEIiwiU0RXRUIzMSIsIlNFUFBSUURMIiwiU0RHUEFBRFYiLCJTRVBQQ09NUCIsIlNER1BBVFJNIiwiU0RXRUIzNiJdLCJuYW1lIjoiT3JjaXVjaCwgTWFyY3VzIEEiLCJkZXBhcnRtZW50cyI6W10sImV4cCI6MTY0MjkwMDk4NiwiYWx0SWQiOiIwMDMxMzY3NTc0IiwiaWF0IjoxNjQyODkzNzg2LCJqdGkiOiI4ZjNhYjY2Zi01ZmI5LTQxYTMtYWE5MS01YTMxNTdlYWI0ZTMifQ.k55O8NDZ_lI4v1BcmEMHZoTn5WkxzMJ8OXtjzk0lqEs; NAME=Marcus%20A%20Orciuch",
    Origin: 'https://mypurdueplan.purdue.edu'
  },
  data: qs.stringify(data)
};

let response = await axios.request(options);

var convertedBody = convert.xml2js(response.data, {
  compact: true,
  spaces: 4,
});

console.log(convertedBody);

fs.writeFile(
  "./program.json",
  JSON.stringify(convertedBody),
  function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  }
);