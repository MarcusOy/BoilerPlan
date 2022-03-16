import { Box, Heading, HStack, Stack } from "@chakra-ui/react";
import Course, { exampleCourse, ICourse } from "./Course";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DataStore } from "../data/Datastore";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export interface ISemester {
  year: number;
  term: "Fall" | "Spring" | "Summer";
  courses?: ICourse[];
}

const SemesterView = () => {
  const semesters = DataStore.useState((s) => s.semesters);

  return (
    <HStack h="100%" overflowX="scroll">
      {semesters.map((s) => {
        let title = `${s.term} ${s.year}`;
        return (
          <Stack
            p="5"
            minW="sm"
            height="100%"
            transition="0.1s all ease-out"
            _hover={{
              transform: "translateY(-5px)",
            }}
          >
            <Heading size="md">{title} - 0 ch</Heading>
            <Box
              p="2"
              flexGrow={1}
              borderColor="gray.700"
              borderWidth={3}
              borderRadius="md"
              borderStyle="dotted"
              transition="0.1s all ease-out"
              _hover={{
                borderColor: "gray.500",
              }}
            >
              <Course {...exampleCourse} />
              <Course {...exampleCourse} />
              <Course {...exampleCourse} />
            </Box>
          </Stack>
        );
      })}
    </HStack>
  );
};

export default SemesterView;
