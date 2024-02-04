import React, { useEffect } from "react";
import Content from "../../../components/Content/Content";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IPreliminaryInterview } from "../../../interfaces/IPreliminaryInterview";
import dayjs from "dayjs";
import { trTR } from "@mui/x-date-pickers";
import { KindergartenAPI } from "../../../services/broker";
import { useNavigate, useParams } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import Toast from "../../../components/Toast/Toast";
import Swal from "sweetalert2";

const EditPreliminaryInterview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = React.useState<IPreliminaryInterview.IStudent>({
    _id: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    ageGroup: "",
    preinterviewDate: "",
    isActive: true,
    isDeleted: false,
  });

  const [parentInfo, setParentInfo] =
    React.useState<IPreliminaryInterview.IParent>({
      _id: "",
      studentId: "",
      fatherFullName: "",
      fatherJob: "",
      fatherPhoneNumber: "",
      motherFullName: "",
      motherJob: "",
      motherPhoneNumber: "",
      isActive: true,
      isDeleted: false,
    });
  const [other, setOther] = React.useState<IPreliminaryInterview.IOther>({
    _id: "",
    studentId: "",
    paymentMethod: "",
    paymentAmount: "",
    installmentPayment: "",
    unitinstallmentPayment: "",
    contractAmount: "",
    interviewNotes: "",
    isActive: true,
    isDeleted: false,
  });
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const handleAccordion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isActive, setIsActive] = React.useState<boolean>(true);
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
  const handleChangePaymentMethod = (event: any) => {
    const value = event.target.value;
    setOther({
      ...other,
      paymentMethod: value,
      ...(value === "installment-payment" &&
        (other.installmentPayment === "" ||
          other.unitinstallmentPayment === "" ||
          other.paymentAmount === "") && {
          contractAmount: "Lütfen Taksit Bilgilerini Giriniz",
        }),
    });
  };
  const handleDelete = () => {
    Swal.fire({
      title: "Emin misiniz?",
      text: "Ön Görüşme Silinecek!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Evet",
      cancelButtonText: "Hayır",
    }).then((result) => {
      if (result.isConfirmed) {
        if (!id) return;
        KindergartenAPI.DeleteInterview(id)
          .then((res) => {
            Toast.fire({
              icon: "success",
              title: "Ön Görüşme başarıyla silindi.",
              timer: 15000,
            });
            navigate("/preliminary-interview/list");
          })
          .catch((err) => {
            Toast.fire({
              icon: "error",
              title: "Ön Görüşme silinirken bir hata oluştu.",
            });
            console.error("Ön Görüşme silinirken bir hata oluştu", err);
          });
      }
    });
  };

  useEffect(() => {
    if (id) {
      KindergartenAPI.GetInterviewById(id)
        .then((res) => {
          setStudent(res.preliminaryInterview);
          setParentInfo(res.preliminaryInterviewParent);
          setOther(res.preliminaryInterviewOther);
          setIsActive(res.preliminaryInterview.isActive);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleSubmit = () => {
    if (id) {
      Toast.fire({
        icon: "info",
        title: "Ön Görüşme güncelleniyor...",
        timer: 15000,
      });

      KindergartenAPI.UpdateInterview(id, {
        student: student,
        parent: parentInfo,
        other: other,
      })
        .then((res) => {
          Toast.fire({
            icon: "success",
            title: "Ön Görüşme başarıyla güncellendi.",
          });
          navigate("/preliminary-interview/list");
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: "Ön Görüşme güncellenirken bir hata oluştu.",
          });
          console.error("Ön Görüşme güncellenirken bir hata oluştu", err);
        });
    } else {
    }
  };

  return (
    <Content
      titleName="Ön Görüşme"
      header="Ön Görüşme Kaydı Düzenleme"
      content={
        isLoading ? (
          <FadeLoader
            color="#cfcfcf"
            loading={isLoading}
            aria-label="Yükleniyor..."
            data-testid="loader"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          />
        ) : (
          <>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleAccordion("panel1")}
            >
              <AccordionSummary
                expandIcon={<GridExpandMoreIcon />}
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
                            birthDate: dayjs(e.$d).format("YYYY-MM-DD"),
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
                            preinterviewDate: dayjs(e.$d).format("YYYY-MM-DD"),
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
                  <FormControlLabel
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "start",
                    }}
                    onChange={(e: any) =>
                      setStudent({ ...student, isActive: e.target.checked })
                    }
                    value={student.isActive}
                    control={
                      <Switch color="primary" checked={student.isActive} />
                    }
                    label="Aktif mi?"
                    labelPlacement="start"
                  />
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
                    value={parentInfo.motherPhoneNumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,10}$/.test(value) || value === "") {
                        setParentInfo({
                          ...parentInfo,
                          motherPhoneNumber: value.replace(
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
                    value={parentInfo.fatherPhoneNumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,10}$/.test(value) || value === "") {
                        setParentInfo({
                          ...parentInfo,
                          fatherPhoneNumber: value.replace(
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
                        value={other.paymentMethod}
                        size="small"
                        required
                        onChange={handleChangePaymentMethod}
                      >
                        <MenuItem value="cash">Nakit</MenuItem>
                        <MenuItem value="installment-payment">
                          Taksitli
                        </MenuItem>
                      </Select>
                    </FormControl>
                    {other.paymentMethod === "installment-payment" && (
                      <>
                        <TextField
                          fullWidth
                          size="small"
                          label="Peşinat Tutarı"
                          variant="outlined"
                          name="paymentAmount"
                          onChange={(event) => {
                            setOther({
                              ...other,
                              paymentAmount: event.target.value,
                              ...(other.unitinstallmentPayment !== "" &&
                                other.installmentPayment !== "" && {
                                  contractAmount: String(
                                    parseInt(event.target.value) +
                                      parseInt(other.unitinstallmentPayment) *
                                        parseInt(other.installmentPayment)
                                  ),
                                }),
                            });
                          }}
                          value={other.paymentAmount}
                        />
                        <TextField
                          fullWidth
                          size="small"
                          label="Taksit Sayısı"
                          variant="outlined"
                          name="installmentPayment"
                          onChange={(event) => {
                            setOther({
                              ...other,
                              installmentPayment: event.target.value,
                              ...(other.unitinstallmentPayment !== "" &&
                                other.paymentAmount !== "" && {
                                  contractAmount: String(
                                    parseInt(event.target.value) *
                                      parseInt(other.unitinstallmentPayment) +
                                      parseInt(other.paymentAmount)
                                  ),
                                }),
                            });
                          }}
                          value={other.installmentPayment}
                        />
                        <TextField
                          fullWidth
                          size="small"
                          label="Birim Taksit Tutarı"
                          variant="outlined"
                          name="unitinstallmentPayment"
                          onChange={(event) => {
                            setOther({
                              ...other,
                              unitinstallmentPayment: event.target.value,
                              ...(other.paymentAmount !== "" &&
                                other.installmentPayment !== "" && {
                                  contractAmount: String(
                                    parseInt(event.target.value) *
                                      parseInt(other.installmentPayment) +
                                      parseInt(other.paymentAmount)
                                  ),
                                }),
                            });
                          }}
                          value={other.unitinstallmentPayment}
                        />
                      </>
                    )}
                    <TextField
                      fullWidth
                      size="small"
                      label="Sözleşme Tutarı"
                      variant="outlined"
                      name="contractAmount"
                      onChange={handleChangeOther}
                      value={other.contractAmount}
                      disabled={other.paymentMethod === "installment-payment"}
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
                  {!isActive && (
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={handleDelete}
                    >
                      Sil
                    </Button>
                  )}
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
        )
      }
    />
  );
};

export default EditPreliminaryInterview;
