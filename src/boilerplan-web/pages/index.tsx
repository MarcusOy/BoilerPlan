import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import EdgesFlow from "../components/examples/EdgesFlow";
import CustomLayout from "../components/examples/CustomLayout";
import HorizontalLayout from "../components/examples/HorizontalLayout";
import { Box, Stack } from "@chakra-ui/react";
import SplitPane from "react-split-pane";
import Pane from "react-split-pane/lib/Pane";
import Header from "../components/Header";
import SemesterView from "../components/SemesterView";
import RequirementsView from "../components/RequirementsView";
import CoursePickerView from "../components/CoursePickerView";
import { useEffect } from "react";
import CourseService from "../data/CourseService";
import SemesterService from "../data/SemesterService";

const Home: NextPage = () => {
  useEffect(() => {
    CourseService.loadCourses();
    SemesterService.loadSemesters();
  }, []);

  return (
    <>
      <Head>
        <title>BoilerPlan</title>
        <meta name="description" content="powered by boilerplan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack height="100vh">
        <Header />
        <SplitPane
          split="vertical"
          resizerStyle={{ background: "var(--🗿-colors-gray-600)" }}
        >
          <Pane initialSize="75%">
            <SplitPane split="horizontal">
              <Pane initialSize="80%">
                <SemesterView />
              </Pane>
              <Pane initialSize="25%" minSize="10%" maxSize="500px">
                <RequirementsView />
              </Pane>
            </SplitPane>
          </Pane>
          <Pane initialSize="25%">
            <CoursePickerView />
          </Pane>
        </SplitPane>
        ;
      </Stack>
    </>
  );
};

export default Home;
