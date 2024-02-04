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
import { KindergartenAPI } from "../../../services/broker";
import { useNavigate, useParams } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import Toast from "../../../components/Toast/Toast";
import Swal from "sweetalert2";
import styled from "styled-components";
import { ITeacher } from "../../../interfaces/ITeacher";
import { IClass } from "../../../interfaces/IClass";

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

const EditClassView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classes, setClasses] = React.useState<IClass.IClass>({
    _id: "",
    className: "",
    ageGroup: "",
    classCapacity: "",
    relatedTeacher: "",
    isActive: true,
    isDeleted: false,
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isActive, setIsActive] = React.useState<boolean>(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClasses({
      ...classes,
      [event.target.name]: event.target.value,
    });
  };
  const handleAgeChange = (event: SelectChangeEvent<string>) => {
    setClasses({
      ...classes,
      ageGroup: event.target.value,
    });
  };

  const handleTeacherChange = (event: SelectChangeEvent<string>) => {
    setClasses({
      ...classes,
      relatedTeacher: event.target.value,
    });
  };
  const [teachers, setTeachers] = React.useState<ITeacher.ITeacher[]>([]);
  React.useEffect(() => {
    KindergartenAPI.GetTeachers().then((res) => {
      setTeachers(res);
    });
  }, []);

  const handleDelete = () => {
    Swal.fire({
      title: "Emin misiniz?",
      text: "Sınıf Silinecek!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Evet",
      cancelButtonText: "Hayır",
    }).then((result) => {
      if (result.isConfirmed) {
        if (!id) return;
        KindergartenAPI.DeleteClass(id)
          .then((res) => {
            Toast.fire({
              icon: "success",
              title: "Sınıf başarıyla silindi.",
              timer: 15000,
            });
            navigate("/class/list");
          })
          .catch((err) => {
            Toast.fire({
              icon: "error",
              title: "Sınıf  silinirken bir hata oluştu",
            });
            console.error("Sınıf  silinirken bir hata oluştu", err);
          });
      }
    });
  };

  useEffect(() => {
    if (id) {
      KindergartenAPI.GetClassById(id)
        .then((res) => {
          setClasses(res.classes);
          setIsActive(res.classes.isActive);
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
      KindergartenAPI.UpdateClass(id, {
        _id: classes._id,
        className: classes.className,
        ageGroup: classes.ageGroup,
        classCapacity: classes.classCapacity,
        relatedTeacher: classes.relatedTeacher,
        isActive: classes.isActive,
        isDeleted: classes.isDeleted,
      })
        .then((res) => {
          Toast.fire({
            icon: "success",
            title: "Sınıf başarıyla güncellendi.",
          });
          navigate("/class/list");
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: "Sınıf güncellenirken bir hata oluştu",
          });
          console.error("Sınıf güncellenirken bir hata oluştu", err);
        });
    }
  };

  return (
    <Content
      titleName="Sınıflar"
      header="Sınıf Düzenleme"
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
                    name="className"
                    value={classes.className}
                    size="small"
                    label="Sınıf Adı"
                    onChange={handleChange}
                    required
                  />
                  <FormControl fullWidth size="small">
                    <InputLabel>Yaş Grubu</InputLabel>
                    <Select
                      name="ageGroup"
                      value={classes.ageGroup}
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
                  <FormControlLabel
                    sx={{
                      width: "30%",
                      alignContent: "end",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    onChange={(e: any) => {
                      setClasses({
                        ...classes,
                        isActive: e.target.checked,
                      });
                    }}
                    value={classes.isActive}
                    control={
                      <Switch color="primary" checked={classes.isActive} />
                    }
                    label="Aktif mi?"
                    labelPlacement="start"
                  />
                </StyledContainerLeft>

                <StyledContainerRight>
                  <TextField
                    name="classCapacity"
                    value={classes.classCapacity}
                    size="small"
                    label="Sınıf Kapasitesi"
                    onChange={handleChange}
                    required
                  />
                  <FormControl fullWidth size="small">
                    <InputLabel>Öğretmen</InputLabel>
                    <Select
                      name="relatedTeacher"
                      value={classes.relatedTeacher}
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

export default EditClassView;
