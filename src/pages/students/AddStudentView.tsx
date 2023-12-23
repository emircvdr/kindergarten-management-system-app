import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MotherInfos from "./views/MotherInfos";
import FatherInfos from "./views/FatherInfos";
import HeirInfos from "./views/HeirInfos";

//
interface IFormData {
  fullName: string;
  identificationNumber: string;
  phoneNumber: string;
  job: string;
  address: string;
  workAddress: string;
  isParent: boolean;
  email: string;
}
import Content from '../../components/Content/Content'
import { AntTab, AntTabs, TabPanel, a11yProps } from '../../components/Tabs/Tabs';
import StudentInfo from './StudentInfo';
import OtherInfo from './OtherInfo';


const AddStudentView = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const handleAccordion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const [motherInfos, setMotherInfos] = React.useState<IFormData>({
    fullName: "",
    identificationNumber: "",
    phoneNumber: "",
    job: "",
    address: "",
    workAddress: "",
    email: "",
    isParent: false,
  });
  const [fatherInfos, setFatherInfos] = React.useState<IFormData>({
    fullName: "",
    identificationNumber: "",
    phoneNumber: "",
    job: "",
    address: "",
    workAddress: "",
    email: "",
    isParent: false,
  });
  const [heirInfos, setHeirInfos] = React.useState<IFormData>({
    fullName: "",
    identificationNumber: "",
    phoneNumber: "",
    job: "",
    address: "",
    workAddress: "",
    email: "",
    isParent: false,
  });

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
            <StudentInfo />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleAccordion("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                Anne Bilgileri
              </AccordionSummary>
              <AccordionDetails sx={{ height: "calc(100vh - 340px)" }}>
                <MotherInfos
                  motherInfos={motherInfos}
                  setMotherInfos={setMotherInfos}
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
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                Baba Bilgileri
              </AccordionSummary>
              <AccordionDetails sx={{ height: "calc(100vh - 345px)" }}>
                <FatherInfos
                  fatherInfos={fatherInfos}
                  setFatherInfos={setFatherInfos}
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
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                Vasi Bilgileri
              </AccordionSummary>
              <AccordionDetails sx={{ height: "calc(100vh - 340px)" }}>
                <HeirInfos
                  heirInfos={heirInfos}
                  setHeirInfos={setHeirInfos}
                  setExpanded={setExpanded}
                  setValue={setValue}
                  motherInfos={motherInfos}
                  fatherInfos={fatherInfos}
                />
              </AccordionDetails>
            </Accordion>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <OtherInfo />
          </TabPanel>
        </>
      }
    />
  );
};

export default AddStudentView;
