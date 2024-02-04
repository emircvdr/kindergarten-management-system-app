import React, { useState } from "react";
import Content from "../../../components/Content/Content";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControl, InputLabel } from "@mui/material";
import { IClass } from "../../../interfaces/IClass";
import Toast from "../../../components/Toast/Toast";
import { KindergartenAPI } from "../../../services/broker";
import { ITeacher } from "../../../interfaces/ITeacher";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IClass.ICreateClass>({
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
    Toast.fire({
      icon: "info",
      title: "Sınıf Ekleniyor...",
      timer: 15000,
    });
    KindergartenAPI.CreateClass(formData)
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: "Sınıf Başarıyla Eklendi",
        });
        navigate("/class/list");
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: "Sınıf Eklenirken Bir Hata Oluştu",
        });
      });
  };
  const [teachers, setTeachers] = React.useState<ITeacher.ITeacher[]>([]);
  React.useEffect(() => {
    KindergartenAPI.GetTeachers().then((res) => {
      setTeachers(res);
    });
  }, []);

  return (
    <Content
      titleName="Sınıflar"
      header="Sınıf Tanımlama"
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
                  {teachers.map((teacher) => {
                    return (
                      <MenuItem key={teacher._id} value={teacher.fullName}>
                        {teacher.fullName}
                      </MenuItem>
                    );
                  })}
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

export default AddClassView;
