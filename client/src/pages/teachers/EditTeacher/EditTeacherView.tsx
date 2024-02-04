import React, { useEffect } from "react";
import Content from "../../../components/Content/Content";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { trTR } from "@mui/x-date-pickers";
import { KindergartenAPI } from "../../../services/broker";
import { useNavigate, useParams } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import Toast from "../../../components/Toast/Toast";
import Swal from "sweetalert2";
import styled from "styled-components";
import { ITeacher } from "../../../interfaces/ITeacher";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 30px;
  margin-top: 20px;
  align-items: center;
`;

const StyledContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

const StyledContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

const EditTeacherView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = React.useState<ITeacher.ITeacher>({
    _id: "",
    fullName: "",
    gender: "",
    dutyGroup: "",
    birthDate: "",
    phoneNumber: "",
    isActive: true,
    isDeleted: false,
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isActive, setIsActive] = React.useState<boolean>(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeacher({
      ...teacher,
      [event.target.name]: event.target.value,
    });
  };

  const handleGenderChange = (event: SelectChangeEvent<string>) => {
    setTeacher({
      ...teacher,
      gender: event.target.value,
    });
  };

  const handleDutyGroupChange = (event: SelectChangeEvent<string>) => {
    setTeacher({
      ...teacher,
      dutyGroup: event.target.value,
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Emin misiniz?",
      text: "Öğretmen Silinecek!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Evet",
      cancelButtonText: "Hayır",
    }).then((result) => {
      if (result.isConfirmed) {
        if (!id) return;
        KindergartenAPI.DeleteTeacher(id)
          .then((res) => {
            Toast.fire({
              icon: "success",
              title: "Öğretmen kaydı başarıyla silindi.",
            });
            navigate("/teacher/list");
          })
          .catch((err) => {
            Toast.fire({
              icon: "error",
              title: "Öğretmen kaydı silinirken bir hata oluştu",
            });
            console.error("Öğretmen kaydı silinirken bir hata oluştu", err);
          });
      }
    });
  };

  useEffect(() => {
    if (id) {
      KindergartenAPI.GetTeacherById(id)
        .then((res) => {
          setTeacher(res.teacher);
          setIsActive(res.teacher.isActive);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleSubmit = () => {
    if (id) {
      Toast.fire({
        icon: "info",
        title: "Öğretmen güncelleniyor...",
        timer: 15000,
      });

      KindergartenAPI.UpdateTeacher(id, teacher)
        .then((res) => {
          Toast.fire({
            icon: "success",
            title: "Öğretmen başarıyla güncellendi.",
          });
          navigate("/teacher/list");
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: "Öğretmeni güncellenirken bir hata oluştu.",
          });
          console.error("Öğretmeni güncellenirken bir hata oluştu", err);
        });
    }
  };

  return (
    <Content
      titleName="Öğretmen Listesi"
      header="Öğretmen Listesi"
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
            <StyledContainer>
              <div
                style={{
                  display: "flex",
                  width: "80%",
                  justifyContent: "center",
                  gap: 20,
                }}
              >
                <StyledContainerLeft>
                  <TextField
                    name="fullName"
                    value={teacher.fullName}
                    size="small"
                    label="Adı-Soyadı"
                    onChange={handleChange}
                    required
                  />
                  <FormControl fullWidth size="small">
                    <InputLabel>Cinsiyeti</InputLabel>
                    <Select
                      name="gender"
                      value={teacher.gender}
                      label="Cinsiyeti"
                      onChange={handleGenderChange}
                      size="small"
                      required
                    >
                      <MenuItem value="Kadın">Kadın</MenuItem>
                      <MenuItem value="Erkek">Erkek</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth size="small">
                    <InputLabel>Görevi</InputLabel>
                    <Select
                      name="duty group"
                      value={teacher.dutyGroup}
                      label="Görevi"
                      onChange={handleDutyGroupChange}
                      size="small"
                      required
                    >
                      <MenuItem value="Öğretmen">Öğretmen</MenuItem>
                      <MenuItem value="Branş Öğretmeni">
                        Branş Öğretmeni
                      </MenuItem>
                      <MenuItem value="Yardımcı Öğretmen">
                        Yardımcı Öğretmeni
                      </MenuItem>
                    </Select>
                  </FormControl>
                </StyledContainerLeft>

                <StyledContainerRight>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      slotProps={{ textField: { size: "small", error: false } }}
                      label="Doğum Tarihi"
                      localeText={
                        trTR.components.MuiLocalizationProvider.defaultProps
                          .localeText
                      }
                      format="DD/MM/YYYY"
                      value={dayjs(teacher.birthDate)}
                      onChange={(newValue: any) => {
                        setTeacher({
                          ...teacher,
                          birthDate: dayjs(newValue.$d).format("YYYY-MM-DD"),
                        });
                      }}
                    />
                  </LocalizationProvider>
                  <TextField
                    name="phoneNumber"
                    label="Cep Telefonu"
                    variant="outlined"
                    size="small"
                    value={teacher.phoneNumber}
                    onChange={handleChange}
                  />
                  <FormControlLabel
                    sx={{
                      width: "100%",
                      alignContent: "end",
                    }}
                    onChange={(e: any) => {
                      setTeacher({
                        ...teacher,
                        isActive: e.target.checked,
                      });
                    }}
                    value={teacher.isActive}
                    control={
                      <Switch color="primary" checked={teacher.isActive} />
                    }
                    label="Aktif mi?"
                    labelPlacement="start"
                  />
                </StyledContainerRight>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "20px",
                  gap: "20px",
                  width: "80%",
                }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  size="small"
                  onClick={handleSubmit}
                >
                  KAYDET
                </Button>
                {!isActive && (
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    size="small"
                    onClick={handleDelete}
                  >
                    SİL
                  </Button>
                )}
              </div>
            </StyledContainer>
          </>
        )
      }
    />
  );
};

export default EditTeacherView;
