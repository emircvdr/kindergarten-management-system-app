import React from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControl, InputLabel } from "@mui/material";
import { IStudents } from "../../../../interfaces/IStudents";

const StyledContainer = styled.div`
  display: flex;
  width: 80%;
  gap: 30px;
  margin-top: 20px;
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

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid red;
  border-radius: 5px;
  padding: 50px 10px 50px 10px;
  gap: 10px;
`;



const StudentInfo = (props: {
  studentState: IStudents.ICreateStudent;
  setStudentState: React.Dispatch<React.SetStateAction<IStudents.ICreateStudent>>;
  setTabValue: React.Dispatch<React.SetStateAction<number>>;
  handleSubmit: () => void;
}) => {

  const emergencyContact = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setStudentState({
      ...props.studentState,
      other: {
        ...props.studentState.other,
        [e.target.name]: e.target.value,
      },
    });
  }


  return (
    <div style={{
      display: "flex",
      width: "100%",
      justifyContent: "center",

    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "80%",
        gap: "20px"
      }}>
        <StyledContainer>
          <StyledContainerLeft>
            <FormControl fullWidth size="small">
              <InputLabel>Anne Baba Beraber Mi?</InputLabel>
              <Select
                value={props.studentState.other.isParentsTogether}
                label="Anne Baba Beraber Mi?"
                onChange={(e) => {
                  props.setStudentState({
                    ...props.studentState,
                    other: {
                      ...props.studentState.other,
                      isParentsTogether: e.target.value as string,
                    },
                  });
                }}
                size="small"
                required
              >
                <MenuItem value="together">Beraber</MenuItem>
                <MenuItem value="apart">Ayrı</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Kan Grubu</InputLabel>
              <Select
                label="Kan Grubu"
                size="small"
                required
                value={props.studentState.other.bloodGroup}
                onChange={(e) => {
                  props.setStudentState({
                    ...props.studentState,
                    other: {
                      ...props.studentState.other,
                      bloodGroup: e.target.value as string,
                    },
                  });
                }}
              >
                <MenuItem value="0(+)">0(+)</MenuItem>
                <MenuItem value="0(-)">0(-)</MenuItem>
                <MenuItem value="A(+)">A(+)</MenuItem>
                <MenuItem value="A(-)">A(-)</MenuItem>
                <MenuItem value="B(+)">B(+)</MenuItem>
                <MenuItem value="B(-)">B(-)</MenuItem>
                <MenuItem value="AB(+)">AB(+)</MenuItem>
                <MenuItem value="AB(-)">AB(-)</MenuItem>
              </Select>
            </FormControl>

            <StyledTextContainer>
              <div style={{
                position: "absolute",
                fontSize: "12px",
                transform: "translate(10px, -60px)",
                backgroundColor: "white",
                padding: "0 5px 0 5px",
                color: "red",
                fontWeight: "bold",
              }}>
                Acil Durumda Ulaşılacak Kişi
              </div>
              <TextField
                name="emergencyContactFullName"
                size="small"
                label="Adı-Soyadı"
                value={props.studentState.other.emergencyContactFullName}
                onChange={emergencyContact}
              />
              <TextField
                name="emergencyContactPhoneNumber"
                size="small"
                label="Telefon Numarası"
                value={props.studentState.other.emergencyContactPhoneNumber}
                onChange={emergencyContact}
              />
              <TextField
                name="emergencyContactDegreeOfProximity"
                size="small"
                label="Yakınlık Derecesi"
                value={props.studentState.other.emergencyContactDegreeOfProximity}
                onChange={emergencyContact}
              />
            </StyledTextContainer>
          </StyledContainerLeft>

          <StyledContainerRight>
            <FormControl fullWidth size="small">
              <InputLabel>Alerji</InputLabel>
              <Select
                label="Alerji"
                size="small"
                required
                value={String(props.studentState.other.isAllergy)}
                onChange={(e) => {
                  props.setStudentState({
                    ...props.studentState,
                    other: {
                      ...props.studentState.other,
                      isAllergy: Boolean(e.target.value),
                    },
                  });
                }}
              >
                <MenuItem value="true">Evet</MenuItem>
                <MenuItem value="false">Hayır</MenuItem>
              </Select>
            </FormControl>
            {props.studentState.other.isAllergy ?
              <TextField
                rows={4}
                multiline
                size="small"
                label="Alerji Detayları"
                value={props.studentState.other.allergyType}
                onChange={(e) => {
                  props.setStudentState({
                    ...props.studentState,
                    other: {
                      ...props.studentState.other,
                      allergyType: e.target.value,
                    },
                  });
                }}
              /> : null
            }

            <FormControl fullWidth size="small">
              <InputLabel>Kronik</InputLabel>
              <Select
                label="Kronik"
                size="small"
                required
                value={String(props.studentState.other.isChronicDisease)}
                onChange={(e) => {
                  props.setStudentState({
                    ...props.studentState,
                    other: {
                      ...props.studentState.other,
                      isChronicDisease: Boolean(e.target.value),
                    },
                  });
                }}
              >
                <MenuItem value="true">Evet</MenuItem>
                <MenuItem value="false">Hayır</MenuItem>
              </Select>
            </FormControl>

            {props.studentState.other.isChronicDisease ?
              <TextField
                value={props.studentState.other.chronicDiseaseType}
                onChange={(e) => {
                  props.setStudentState({
                    ...props.studentState,
                    other: {
                      ...props.studentState.other,
                      chronicDiseaseType: e.target.value,
                    },
                  });
                }}
                rows={4}
                multiline
                size="small"
                label="Kronik Hastalık Detayları"
              /> : null
            }
          </StyledContainerRight>
        </StyledContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
            gap: "10px",
          }}
        >
          <Button variant="contained" fullWidth size="small" onClick={props.handleSubmit}>KAYDET</Button>
          <Button variant="contained" color="error" fullWidth size="small">GERİ DÖN</Button>
        </div>
      </div>


    </div>
  );
};

export default StudentInfo;
