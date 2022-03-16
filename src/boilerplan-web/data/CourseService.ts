import { DataStore } from "./Datastore";
import Courses from "./detailed-tagged-courses.json";

class CourseService {
  static loadCourses() {
    let courseMap = {};
    for (let x = 0; x < 25; x++) {
      let c = Courses.courseNodes[x];
      let courseName = `${c.subject} ${c.number}`;
      courseMap[courseName] = c;
    }

    // for (let x = 0; x < Courses.courseEdges.length; x++) {}

    DataStore.update((s) => {
      s.courses = courseMap;
    });

    console.log(
      "loaded " +
        Object.entries(DataStore.getRawState().courses).length +
        " courses"
    );
  }
}

export default CourseService;
