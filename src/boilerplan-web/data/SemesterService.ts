import { ISemester } from "../components/SemesterView";
import { DataStore } from "./Datastore";

class CourseService {
  static loadSemesters() {
    let loadedSemesters = localStorage.getItem("savedSchedule");

    if (loadedSemesters == null) {
      this.generateSemesters();
      return;
    } else {
      console.log("Loading semesters from storage...");

      DataStore.update((s) => {
        s.semesters = JSON.parse(loadedSemesters!);
      });
    }
  }

  static saveSemesters() {
    console.log("Saving semesters...");
    localStorage.setItem(
      "savedSchedule",
      JSON.stringify(DataStore.getRawState().semesters)
    );
  }

  static generateSemesters(startingYear: number = 2019) {
    console.log("Generating semesters...");

    let semesters: ISemester[] = [];

    for (let x = 0; x < 4; x++) {
      semesters.push({ year: startingYear + x, term: "Fall" });
      semesters.push({ year: startingYear + x + 1, term: "Spring" });
      semesters.push({ year: startingYear + x + 1, term: "Summer" });
    }
    DataStore.update((s) => {
      s.semesters = semesters;
    });
    this.saveSemesters();
  }
}

export default CourseService;
