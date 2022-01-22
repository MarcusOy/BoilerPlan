import courseTags from './course-tags.json'
import courses from './detailedcourses.json'
import fs from "fs";

for (let x = 0; x < courses.courseNodes.length; x++) {
    let c = courses.courseNodes[x];
    let name = `${c.subject} ${c.number}`

    if (courseTags[name]) {
        let tags = [courseTags[name].FO1]
        if (courseTags[name].FO2) tags.push(courseTags[name].FO2)
        courses.courseNodes[x].tags = tags;
    } else {
        courses.courseNodes[x].tags = [];
    }
}

console.log(courses);

fs.writeFile(
    "./detailed-tagged-courses.json",
    JSON.stringify(courses),
    function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }
);