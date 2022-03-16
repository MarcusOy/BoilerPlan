import { CheckIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Link,
  useDisclosure,
} from "@chakra-ui/react";

export interface ICourse {
  id: string;
  subject: string;
  number: number;
  title: string;
  description: string;
  creditHours: number;
  offered: string;
}

export const exampleCourse: ICourse = {
  id: "12af1a7a-257d-5160-86cb-e367edd43b6d",
  subject: "AAE",
  number: 20300,
  title: "Aeromechanics I",
  description:
    "Credit Hours: 3.00.  Fundamental concepts and principles of bodies in motion, with applications to aeronautical and astronautical problems. Subjects covered include rectilinear motion, curvilinear motion, rotation, and plane motion. The static equilibrium and quasistatic equilibrium situations are treated as a part of motion in which the acceleration is zero. Problems involving impact, separation, work, and energy are considered.",
  creditHours: 3,
  offered: "Fall,Spring,Summer",
};

const Course = (c: ICourse) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let title = `${c.subject} ${c.number}`;

  return (
    <>
      <HStack
        p="2"
        spacing={4}
        borderColor="gray.700"
        borderWidth={1}
        borderRadius="sm"
      >
        <CheckIcon color="green" />
        <Stack>
          <Heading size="sm">
            <Link onClick={onOpen}>{c.title}</Link>
          </Heading>
          <Text mt="0px !important">{title}</Text>
        </Stack>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {title} - {c.title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{c.description}</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              variant="outline"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Course;
