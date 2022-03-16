import { SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { DataStore } from "../data/Datastore";
import Course, { exampleCourse } from "./Course";

const CoursePickerView = () => {
  const courses = DataStore.useState((s) => s.courses);
  let list = Object.entries(courses).map((c) => c[1]);

  return (
    <Stack h="100%">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input placeholder="Search for a class" />
      </InputGroup>
      <Stack overflowY="scroll">
        <Text>Recommended</Text>
        <Course {...exampleCourse} />
        <Course {...exampleCourse} />
        <Course {...exampleCourse} />
        <Text>Other</Text>
        {list.map((c) => (
          <Course key={c.id} {...c} />
        ))}
      </Stack>
    </Stack>
  );
};

export default CoursePickerView;
