import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, FormControl, InputLabel } from "@mui/material";
import { trTR } from "@mui/x-date-pickers";
import { IStudents } from "../../../../interfaces/IStudents";
import dayjs from "dayjs";
import {
  StyledContainer,
  StyledContainerLeft,
  StyledContainerRight,
  StyledIcon,
  StyledIconContainer,
} from "../style";
import { useNavigate } from "react-router-dom";
import Base64 from "../../../../components/Base64Select/Base64";
import cities from "../../../../assets/cities";
import countries from "../../../../assets/countries";
import { KindergartenAPI } from "../../../../services/broker";
import { IClass } from "../../../../interfaces/IClass";

const StudentInfo = (props: {
  studentState: IStudents.ICreateStudentObj;
  setStudentState: React.Dispatch<
    React.SetStateAction<IStudents.ICreateStudentObj>
  >;
  setTabValue: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "identificationNumber") {
      if (event.target.value.length > 11) return;
    }
    props.setStudentState({
      ...props.studentState,
      student: {
        ...props.studentState.student,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    props.setStudentState({
      ...props.studentState,
      student: {
        ...props.studentState.student,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleFileChange = (e: any) => {
    props.setStudentState({
      ...props.studentState,
      student: {
        ...props.studentState.student,
        photo: e.base64,
      },
    });
  };
  const [classes, setClasses] = useState<IClass.IClass[]>([]);
  React.useEffect(() => {
    KindergartenAPI.GetClasses().then((res) => {
      setClasses(res);
    });
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <StyledIconContainer htmlFor="createPersonalPhoto">
          {props.studentState.student.photo ? (
            <img
              src={props.studentState.student.photo}
              alt="Seçilen Fotoğraf"
              style={{
                maxHeight: "80px",
                maxWidth: "80px",
                borderRadius: "50%",
              }}
            />
          ) : (
            <StyledIcon />
          )}
          <Base64 onDone={handleFileChange} />
        </StyledIconContainer>
        <StyledContainer>
          <StyledContainerLeft>
            <TextField
              name="identificationNumber"
              size="small"
              label="TC Kimlik No"
              onChange={handleChange}
              required
              value={props.studentState.student.identificationNumber}
            />
            <TextField
              name="firstName"
              size="small"
              label="Adı"
              onChange={handleChange}
              required
              value={props.studentState.student.firstName}
            />
            <TextField
              name="lastName"
              size="small"
              label="Soyadı"
              onChange={handleChange}
              required
              value={props.studentState.student.lastName}
            />
            <FormControl fullWidth size="small">
              <InputLabel>Uyruk</InputLabel>
              <Select
                name="nationality"
                value={props.studentState.student.nationality}
                label="Uyruk"
                onChange={handleSelectChange}
                size="small"
                required
              >
                {countries.map((country: any) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.baslik}
                  </MenuItem>
                ))}
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
                value={dayjs(props.studentState.student.birthDate)}
                onChange={(newValue: any) => {
                  props.setStudentState({
                    ...props.studentState,
                    student: {
                      ...props.studentState.student,
                      birthDate: dayjs(newValue.$d).format("YYYY-MM-DD"),
                    },
                  });
                }}
              />
            </LocalizationProvider>

            <FormControl fullWidth size="small">
              <InputLabel>Doğum Yeri</InputLabel>
              <Select
                name="birthPlace"
                value={props.studentState.student.birthPlace}
                label="Doğum Yeri"
                onChange={handleSelectChange}
                size="small"
                required
              >
                {cities
                  .filter(
                    (x) =>
                      x.ulke_id ===
                      Number(props.studentState.student.nationality)
                  )
                  .map((city: any) => (
                    <MenuItem key={city.id} value={city.baslik}>
                      {city.baslik}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Sınıf</InputLabel>
              <Select
                name="class"
                value={props.studentState.student.class}
                label="Sınıf"
                onChange={handleSelectChange}
                size="small"
                required
              >
                {classes.map((classes) => {
                  return (
                    <MenuItem key={classes._id} value={classes.className}>
                      {classes.className}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Cinsiyet</InputLabel>
              <Select
                name="gender"
                value={props.studentState.student.gender}
                label="Cinsiyet"
                onChange={handleSelectChange}
                size="small"
                required
              >
                <MenuItem value="Kız">Kız</MenuItem>
                <MenuItem value="Erkek">Erkek</MenuItem>
              </Select>
            </FormControl>
          </StyledContainerRight>
        </StyledContainer>

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
            onClick={() => props.setTabValue(1)}
          >
            İLERLE
          </Button>
          <Button
            variant="contained"
            fullWidth
            color="error"
            onClick={() => navigate("/students/list")}
          >
            GERİ DÖN
          </Button>
        </div>
      </div>
    </>
  );
};

export default StudentInfo;
