import React, { useState } from "react";
import Content from "../../../components/Content/Content";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControl, InputLabel } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { trTR } from "@mui/x-date-pickers";
import { ITeacher } from "../../../interfaces/ITeacher";
import Toast from "../../../components/Toast/Toast";
import { Navigate, useNavigate } from "react-router-dom";
import { KindergartenAPI } from "../../../services/broker";
import { strict } from "assert";

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

const AddTeacherView = () => {
  const [teacher, setTeacher] = React.useState<ITeacher.ICreateTeacher>({
    fullName: "",
    gender: "",
    dutyGroup: "",
    birthDate: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();
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

  const handleSubmit = () => {
    KindergartenAPI.CreateTeacher({
      fullName: teacher.fullName,
      gender: teacher.gender,
      dutyGroup: teacher.dutyGroup,
      birthDate: teacher.birthDate,
      phoneNumber: teacher.phoneNumber,
    })
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: "Öğretmen Başarıyla Eklendi",
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: "Öğretmen Eklenirken Bir Hata Oluştu",
        });
      });
    navigate("/teacher/list");
  };

  return (
    <Content
      titleName="Öğretmenler"
      header="Öğretmen Tanımlama"
      content={
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
                  <MenuItem value="Branş Öğretmeni">Branş Öğretmeni</MenuItem>
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
          </div>
        </StyledContainer>
      }
    />
  );
};

export default AddTeacherView;
