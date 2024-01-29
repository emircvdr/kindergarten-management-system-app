import React, { useState } from "react";
import Content from "../../../components/Content/Content";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControl, InputLabel } from "@mui/material";
import { IClass } from "../../../interfaces/IClass";
import Toast from "../../../components/Toast/Toast";

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


const AddClassView = () => {

  const [formData, setFormData] = useState <IClass.IClass>({
    className: "",
    ageGroup: "",
    classCapacity: "",
    relatedTeacher: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleAgeChange = (event: SelectChangeEvent<string>) => {
    setFormData({
   ...formData,
      ageGroup: event.target.value,
    });
  };

  const handleTeacherChange = (event: SelectChangeEvent<string>) => {
    setFormData({
   ...formData,
      relatedTeacher: event.target.value,
    }); 
  };

  const handleSubmit = () => {
    console.log("Form submitted!", formData)
    Toast.fire({
      icon: "success",
      title: "Başarılı!",
    })
  };

  return (
    <Content
            titleName="Sınıflar"
            header="Sınıf Tanımlama"
            content={
              <StyledContainer>
                <div style={{
                  display: "flex",
                  width: "80%",
                  justifyContent: "center",
                  gap: 20,
                }}>
                <StyledContainerLeft>
                  <TextField
                  name="className"
                  value={formData.className}
                  size="small"
                  label="Sınıf Adı"
                  onChange={handleChange}
                  required
                  />
                  <FormControl fullWidth size="small">
                    <InputLabel>Yaş Grubu</InputLabel>
                    <Select
                        name="ageGroup"
                        value={formData.ageGroup}
                        label="Yaş Grubu"
                        onChange={handleAgeChange}
                        size="small"
                        required
                    >
                      <MenuItem value="3 Yaş">3 Yaş</MenuItem>
                      <MenuItem value="4 Yaş">4 Yaş</MenuItem>
                      <MenuItem value="5 Yaş">5 Yaş</MenuItem>
                      <MenuItem value="6 Yaş">6 Yaş</MenuItem>
                    </Select>
                  </FormControl>

                </StyledContainerLeft>

                <StyledContainerRight>
                <TextField
                  name="classCapacity"
                  value={formData.classCapacity}
                  size="small"
                  label="Sınıf Kapasitesi"
                  onChange={handleChange}
                  required
                />
                <FormControl fullWidth size="small">
                  <InputLabel>Öğretmen</InputLabel>
                  <Select
                      name="relatedTeacher"
                      value={formData.relatedTeacher}
                      label="Öğretmen"
                      onChange={handleTeacherChange}
                      size="small"
                      required
                  >
                    <MenuItem value="Öğretmen Ad-Soyad1">Öğretmen Ad-Soyad1</MenuItem>
                    <MenuItem value="Öğretmen Ad-Soyad2">Öğretmen Ad-Soyad2</MenuItem>
                    <MenuItem value="Öğretmen Ad-Soyad3">Öğretmen Ad-Soyad3</MenuItem>
                  </Select>
                </FormControl>

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
                width: "80%"
              }}
              >
              <Button variant="contained" fullWidth size="small" onClick={handleSubmit}>KAYDET</Button>
              </div>
              </StyledContainer>
              
            }

    />
  )

  };





export default AddClassView