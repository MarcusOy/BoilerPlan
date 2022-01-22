import { Box, Heading, HStack, Stack } from "@chakra-ui/react";
import Course from "./Course";

export interface ISemester {
  year: number;
  term: "Fall" | "Spring" | "Summer";
}

const SemesterView = () => {
  let startingYear = 2019;
  let semesters: ISemester[] = [];

  for (let x = 0; x < 4; x++) {
    semesters.push({ year: startingYear + x, term: "Fall" });
    semesters.push({ year: startingYear + x + 1, term: "Spring" });
    semesters.push({ year: startingYear + x + 1, term: "Summer" });
  }

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
              <Course />
              <Course />
              <Course />
            </Box>
          </Stack>
        );
      })}
    </HStack>
  );
};

export default SemesterView;
