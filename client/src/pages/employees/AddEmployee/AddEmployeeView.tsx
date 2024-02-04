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
import { IEmployee } from "../../../interfaces/IEmployee";
import Toast from "../../../components/Toast/Toast";
import { useNavigate } from "react-router-dom";
import { KindergartenAPI } from "../../../services/broker";

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

const AddEmployeeView = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<IEmployee.ICreateEmployee>({
    fullName: "",
    gender: "",
    birthDate: "",
    phoneNumber: "",
    dutyGroup: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({
      ...employee,
      [event.target.name]: event.target.value,
    });
  };

  const handleGenderChange = (event: SelectChangeEvent<string>) => {
    setEmployee({
      ...employee,
      gender: event.target.value,
    });
  };

  const handledutyGroupChange = (event: SelectChangeEvent<string>) => {
    setEmployee({
      ...employee,
      dutyGroup: event.target.value,
    });
  };

  const handleSubmit = () => {
    Toast.fire({
      icon: "info",
      title: "Personel ekleniyor...",
      timer: 15000,
    });
    KindergartenAPI.CreateEmployee(employee)
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: "Personel Başarıyla Eklendi",
        });
        navigate("/employee/list");
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: "Personel Eklenirken Bir Hata Oluştu",
        });
      });
  };

  return (
    <Content
      titleName="Personeller"
      header="Personel Tanımlama"
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
                value={employee.fullName}
                size="small"
                label="Adı-Soyadı"
                onChange={handleChange}
                required
              />
              <FormControl fullWidth size="small">
                <InputLabel>Cinsiyeti</InputLabel>
                <Select
                  name="gender"
                  value={employee.gender}
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
                  name="dutyGroup"
                  value={employee.dutyGroup}
                  label="Görevi"
                  onChange={handledutyGroupChange}
                  size="small"
                  required
                >
                  <MenuItem value="Yönetici">Yönetici</MenuItem>
                  <MenuItem value="Psikolog">Psikolog</MenuItem>
                  <MenuItem value="Sorumlu">Sorumlu</MenuItem>
                  <MenuItem value="Aşçı">Aşçı</MenuItem>
                  <MenuItem value="İdari İşler">İdari İşler</MenuItem>
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
                  value={dayjs(employee.birthDate)}
                  onChange={(newValue: any) => {
                    setEmployee({
                      ...employee,
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
                value={employee.phoneNumber}
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

export default AddEmployeeView;
