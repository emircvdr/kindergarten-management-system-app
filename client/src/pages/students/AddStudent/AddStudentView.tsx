import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MotherInfos from "./views/MotherInfos";
import FatherInfos from "./views/FatherInfos";
import HeirInfos from "./views/HeirInfos";
import Content from '../../../components/Content/Content'
import { AntTab, AntTabs, TabPanel, a11yProps } from '../../../components/Tabs/Tabs';
import StudentInfo from './views/StudentInfo';
import OtherInfo from './views/OtherInfo';
import { IStudents } from "../../../interfaces/IStudents";


const initialParentInfos: IStudents.IParent = {
  fullName: "",
  identificationNumber: "",
  phoneNumber: "",
  job: "",
  address: "",
  workAddress: "",
  email: "",
  isParent: false,
};

const initialStudentInfos: IStudents.ICreateStudent = {
  student: {
    photo: null,
    identificationNumber: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    birthPlace: "",
    class: "",
    gender: "",
    nationality: "",
  },
  parent: {
    father: initialParentInfos,
    mother: initialParentInfos,
    heir: initialParentInfos,
  },
  other: {
    bloodGroup: "",
    isParentsTogether: "",
    allergy: {
      allergyType: "",
      isAllergy: false,
    },
    chronicDisease: {
      chronicDiseaseType: "",
      isChronicDisease: false,
    },
    emergencyContact: {
      fullName: "",
      phoneNumber: "",
      degreeOfProximity: "",
    }
  },
}


const AddStudentView = () => {
  // tab state -- start
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // tab state -- end

  // accordion state -- start
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleAccordion = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  // accordion state -- end

  // add student form data -- start
  const [studentInfos, setStudentInfos] = React.useState<IStudents.ICreateStudent>(initialStudentInfos)
  // add student form data -- end

  return (
    <Content
      titleName="Öğrenciler"
      header="Öğrenci Tanımlama"
      content={
        <>
          <AntTabs value={value} onChange={handleChange}>
            <AntTab label="Öğrenci Bilgileri" {...a11yProps(0)} />
            <AntTab label="Ebeveyn Bilgileri" {...a11yProps(1)} />
            <AntTab label="Diğer Bilgiler" {...a11yProps(2)} />
          </AntTabs>
          <TabPanel value={value} index={0}>
            <StudentInfo
              studentState={studentInfos}
              setStudentState={setStudentInfos}
              setTabValue={setValue}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleAccordion("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                Anne Bilgileri
              </AccordionSummary>
              <AccordionDetails sx={{ height: "calc(100vh - 340px)" }}>
                <MotherInfos
                  studentState={studentInfos}
                  setStudentState={setStudentInfos}
                  setTabValue={setValue}
                  setExpanded={setExpanded}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleAccordion("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                Baba Bilgileri
              </AccordionSummary>
              <AccordionDetails sx={{ height: "calc(100vh - 345px)" }}>
                <FatherInfos
                  studentState={studentInfos}
                  setStudentState={setStudentInfos}
                  setExpanded={setExpanded}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleAccordion("panel3")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                Vasi Bilgileri
              </AccordionSummary>
              <AccordionDetails sx={{ height: "calc(100vh - 340px)" }}>
                <HeirInfos
                  studentInfos={studentInfos}
                  setStudentInfos={setStudentInfos}
                  setTabValue={setValue}
                  setExpanded={setExpanded}
                />
              </AccordionDetails>
            </Accordion>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <OtherInfo
              studentState={studentInfos}
              setStudentState={setStudentInfos}
              setTabValue={setValue}
            />
          </TabPanel>
        </>
      }
    />
  );
};

export default AddStudentView;
