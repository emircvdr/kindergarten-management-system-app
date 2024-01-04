//Global Imports//
import React from "react";
import Content from "../../../components/Content/Content";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { trTR } from "@mui/x-date-pickers";
import styled from "styled-components";
import { KindergartenAPI } from "../../../services/broker";
import { IPreliminaryInterview } from "../../../interfaces/IPreliminaryInterview";
import { useNavigate } from "react-router-dom";
import Toast from "../../../components/Toast/Toast";

const StyledTypography = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledContainer = styled.div`
  display: "flex",
flexDirection: "column",
gap: "20px",
width: "100%",
alignItems: "center",
`;

const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

//UseStates//
const AddPreliminaryInterview = () => {
  const [student, setStudent] =
    React.useState<IPreliminaryInterview.ICreateStudent>({
      firstName: "",
      lastName: "",
      birthDate: "",
      gender: "",
      ageGroup: "",
      preinterviewDate: "",
    });

  const [parentInfo, setParentInfo] =
    React.useState<IPreliminaryInterview.ICreateParent>({
      fatherFullName: "",
      fatherJob: "",
      fatherPhone: "",
      motherFullName: "",
      motherJob: "",
      motherPhone: "",
    });
  const [other, setOther] = React.useState<IPreliminaryInterview.ICreateOther>({
    paymentMethod: "",
    installmentPayment: "",
    unitinstallmentPayment: "",
    contractAmount: "",
    interviewNotes: "",
  });
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const handleAccordion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const navigate = useNavigate();

  const handleChangeStudent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({
      ...student,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeParent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParentInfo({
      ...parentInfo,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeOther = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOther({
      ...other,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    KindergartenAPI.CreateInterview({
      student: student,
      parent: parentInfo,
      other: other,
    })
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: "Ön Görüşme Kaydı Başarıyla Eklendi",
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: "Ön Görüşme Kaydı Eklenirken Bir Sorun Oluştu",
        });
      });
    navigate("/preliminary-interview/list");
  };

  return (
    <Content
      titleName="Ön Görüşme"
      header="Ön Görüşme Kaydı Ekleme"
      content={
        <>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleAccordion("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              Öğrenci Bilgileri
            </AccordionSummary>
            <AccordionDetails sx={{ height: "calc(100vh - 280px)" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <TextField
                  name="firstName"
                  label="Adı"
                  variant="outlined"
                  value={student.firstName}
                  onChange={handleChangeStudent}
                  sx={{ width: "50%" }}
                  size="small"
                />
                <TextField
                  name="lastName"
                  label="Soyadı"
                  variant="outlined"
                  value={student.lastName}
                  onChange={handleChangeStudent}
                  sx={{ width: "50%" }}
                  size="small"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["Doğum Tarihi"]}
                    sx={{ width: "50%" }}
                  >
                    <DatePicker
                      value={dayjs(new Date(student.birthDate))}
                      onChange={(e: any) => {
                        setStudent({
                          ...student,
                          birthDate: e.$d.toISOString(),
                        });
                      }}
                      label="Doğum Tarihi"
                      format="DD/MM/YYYY"
                      localeText={
                        trTR.components.MuiLocalizationProvider.defaultProps
                          .localeText
                      }
                      slotProps={{
                        textField: {
                          size: "small",
                          error: false,
                          required: true,
                        },
                      }}
                      sx={{ width: "100%" }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <FormControl sx={{ width: "50%" }} size="small">
                  <InputLabel>Cinsiyeti</InputLabel>
                  <Select
                    value={student.gender}
                    label="Cinsiyeti"
                    fullWidth
                    onChange={(e) => {
                      setStudent({
                        ...student,
                        gender: e.target.value,
                      });
                    }}
                  >
                    <MenuItem value={"male"}>Erkek</MenuItem>
                    <MenuItem value={"female"}>Kadın</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "50%" }} size="small">
                  <InputLabel>Yaş Grubu</InputLabel>
                  <Select
                    value={student.ageGroup}
                    label="Yaş Grubu"
                    fullWidth
                    onChange={(e) => {
                      setStudent({
                        ...student,
                        ageGroup: e.target.value,
                      });
                    }}
                  >
                    <MenuItem value={"1"}>1</MenuItem>
                    <MenuItem value={"2"}>2</MenuItem>
                    <MenuItem value={"3"}>3</MenuItem>
                    <MenuItem value={"4"}>4</MenuItem>
                    <MenuItem value={"5"}>5</MenuItem>
                    <MenuItem value={"6"}>6</MenuItem>
                    <MenuItem value={"7"}>7</MenuItem>
                  </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["Öngörülen Kayıt Tarihi"]}
                    sx={{ width: "50%" }}
                  >
                    <DatePicker
                      value={dayjs(new Date(student.preinterviewDate))}
                      onChange={(e: any) => {
                        setStudent({
                          ...student,
                          preinterviewDate: e.$d.toISOString(),
                        });
                      }}
                      label="Öngörülen Kayıt Tarihi"
                      format="DD/MM/YYYY"
                      localeText={
                        trTR.components.MuiLocalizationProvider.defaultProps
                          .localeText
                      }
                      slotProps={{
                        textField: {
                          size: "small",
                          error: false,
                          required: true,
                        },
                      }}
                      sx={{ width: "100%" }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    setExpanded("panel2");
                  }}
                >
                  İleri
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleAccordion("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              Ebeveyn Bilgileri
            </AccordionSummary>
            <AccordionDetails sx={{ height: "calc(100vh - 290px)" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <TextField
                  size="small"
                  sx={{ width: "50%" }}
                  label="Anne Adı-Soyadı"
                  variant="outlined"
                  name="motherFullName"
                  value={parentInfo.motherFullName}
                  onChange={handleChangeParent}
                />
                <TextField
                  sx={{ width: "50%" }}
                  size="small"
                  label="Anne Telefon Numarası"
                  variant="outlined"
                  value={parentInfo.motherPhone}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value) || value === "") {
                      setParentInfo({
                        ...parentInfo,
                        motherPhone: value.replace(
                          /(\d{3})(\d{3})(\d{4})/,
                          "$1-$2-$3"
                        ),
                      });
                    }
                  }}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
                <TextField
                  sx={{ width: "50%" }}
                  size="small"
                  label="Anne Meslek"
                  variant="outlined"
                  value={parentInfo.motherJob}
                  onChange={(e) => {
                    setParentInfo({
                      ...parentInfo,
                      motherJob: e.target.value,
                    });
                    console.log(e.target.value);
                  }}
                />
                <TextField
                  sx={{ width: "50%" }}
                  size="small"
                  label="Baba Adı Soyadı"
                  name="fatherFullName"
                  variant="outlined"
                  value={parentInfo.fatherFullName}
                  onChange={handleChangeParent}
                />
                <TextField
                  sx={{ width: "50%" }}
                  size="small"
                  label="Baba Telefon Numarası"
                  variant="outlined"
                  value={parentInfo.fatherPhone}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value) || value === "") {
                      setParentInfo({
                        ...parentInfo,
                        fatherPhone: value.replace(
                          /(\d{3})(\d{3})(\d{4})/,
                          "$1-$2-$3"
                        ),
                      });
                    }
                  }}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
                <TextField
                  sx={{ width: "50%" }}
                  size="small"
                  label="Baba Meslek"
                  variant="outlined"
                  value={parentInfo.fatherJob}
                  onChange={(e) => {
                    setParentInfo({
                      ...parentInfo,
                      fatherJob: e.target.value,
                    });
                    console.log(e.target.value);
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setExpanded("panel1");
                  }}
                >
                  Geri
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setExpanded("panel3");
                  }}
                >
                  İleri
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleAccordion("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              Diğer Bilgileri
            </AccordionSummary>
            <AccordionDetails sx={{ height: "calc(100vh - 280px)" }}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <FormControl fullWidth size="small">
                    <InputLabel>Ödeme Tipi</InputLabel>
                    <Select
                      label="Ödeme Tipi"
                      size="small"
                      required
                      onChange={(e: any) => {
                        setOther({
                          ...other,
                          paymentMethod: e.target.value.toString(),
                        });
                      }}
                    >
                      <MenuItem value="cash">Nakit</MenuItem>
                      <MenuItem value="installment-payment">Taksitli</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    size="small"
                    label="Taksit Sayısı"
                    variant="outlined"
                    name="installmentPayment"
                    onChange={handleChangeOther}
                    value={other.installmentPayment}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="Birim Taksit Tutarı"
                    variant="outlined"
                    name="unitinstallmentPayment"
                    onChange={handleChangeOther}
                    value={other.unitinstallmentPayment}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="Sözleşme Tutarı"
                    variant="outlined"
                    name="contractAmount"
                    onChange={handleChangeOther}
                    value={other.contractAmount}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="Görüşme Notları"
                    variant="outlined"
                    multiline
                    name="interviewNotes"
                    onChange={handleChangeOther}
                    value={other.interviewNotes}
                    rows={4}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setExpanded("panel2");
                  }}
                >
                  Geri
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                >
                  Kaydet
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
        </>
      }
    />
  );
};

export default AddPreliminaryInterview;
