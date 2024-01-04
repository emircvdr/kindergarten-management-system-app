import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MotherInfos from "../EditStudent/views/MotherInfos";
import FatherInfos from "../EditStudent/views/FatherInfos";
import HeirInfos from "../EditStudent/views/HeirInfos";
import Content from "../../../components/Content/Content";
import StudentInfo from "../EditStudent/views/StudentInfo";
import OtherInfo from "../EditStudent/views/OtherInfo";
import {
  AntTab,
  AntTabs,
  TabPanel,
  a11yProps,
} from "../../../components/Tabs/Tabs";
import { TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import StyledDataGrid from "../../../components/StyledDataGrid/StyledDataGrid";
import Toast from "../../../components/Toast/Toast";
import { KindergartenAPI } from "../../../services/broker";
import { IStudents } from "../../../interfaces/IStudents";

const DataGridContainer = styled.div`
  width: 100%;
  height: calc(100vh - 340px);
`;

const EditStudents = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
      photo: "",
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
      allergyType: "",
      isAllergy: false,
      chronicDiseaseType: "",
      isChronicDisease: false,
      emergencyContactFullName: "",
      emergencyContactPhoneNumber: "",
      emergencyContactDegreeOfProximity: "",
    },
  };

  const [value, setValue] = useState(0);
  const [expanded, setExpanded] = useState<string | false>("panel1");
  const [studentInfos, setStudentInfos] =
    useState<IStudents.ICreateStudent>(initialStudentInfos);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleAccordion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    if (id) {
      KindergartenAPI.GetStudentById(id)
        .then((res) => {
          setStudentInfos(res);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Öğrenci bilgileri getirilirken bir hata oluştu", err);
        });
    }
  }, []);

  const handleSubmit = () => {
    if (id) {
      Toast.fire({
        icon: "info",
        title: "Öğrenci güncelleniyor...",
        timer: 15000,
      });

      KindergartenAPI.UpdateStudent(id, studentInfos)
        .then((res) => {
          Toast.fire({
            icon: "success",
            title: "Öğrenci başarıyla güncellendi.",
          });
          navigate("/students/list");
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: "Öğrenci güncellenirken bir hata oluştu.",
          });
          console.error("Öğrenci güncellenirken bir hata oluştu", err);
        });
    } else {
    }
  };

  return (
    <Content
      titleName="Öğrenciler"
      header="Öğrenci Tanımlama"
      content={
        isLoading ? (
          <div>Yükleniyor...</div>
        ) : (
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
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
                handleSubmit={handleSubmit}
              />
            </TabPanel>
          </>
        )
      }
    />
  );
};
export default EditStudents;
