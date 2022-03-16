import { ICourse } from "./../components/Course";
import { Store } from "pullstate";
import { ISemester } from "./../components/SemesterView";

export interface IDataStore {
  semesters: ISemester[];
  courses: { [name: string]: ICourse };
}

const initialState: IDataStore = {
  semesters: [],
  courses: {},
};

export const DataStore = new Store<IDataStore>(initialState);
