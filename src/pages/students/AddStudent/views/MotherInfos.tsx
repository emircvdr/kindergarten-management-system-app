import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { IStudents } from "../../../../interfaces/IStudents";

const ContainerArea = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
`;

const MotherInfos = (props: {
  studentState: IStudents.ICreateStudent;
  setStudentState: React.Dispatch<React.SetStateAction<IStudents.ICreateStudent>>;
  setTabValue: React.Dispatch<React.SetStateAction<number>>;
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
}) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setStudentState({
      ...props.studentState,
      parent: {
        ...props.studentState.parent,
        mother: {
          ...props.studentState.parent.mother,
          [event.target.name]: event.target.value,
        }
      }
    });
  };

  return (
    <>
      <ContainerArea>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            width: "50%",
          }}
        >
          <TextField
            name="fullName"
            label="Adı-Soyadı"
            variant="outlined"
            size="small"
            value={props.studentState.parent.mother.fullName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="identificationNumber"
            label="TC Kimlik Numarası"
            variant="outlined"
            size="small"
            value={props.studentState.parent.mother.identificationNumber}
            onChange={handleChange}
          />
          <TextField
            name="phoneNumber"
            label="Cep Telefonu"
            variant="outlined"
            size="small"
            value={props.studentState.parent.mother.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            name="job"
            label="Mesleği"
            variant="outlined"
            size="small"
            value={props.studentState.parent.mother.job}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="E-mail"
            variant="outlined"
            size="small"
            value={props.studentState.parent.mother.email}
            onChange={handleChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "50%",
          }}
        >
          <TextField
            name="address"
            label="Ev Adresi"
            multiline
            rows={5}
            value={props.studentState.parent.mother.address}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="workAddress"
            label="İş Adresi"
            multiline
            rows={5}
            value={props.studentState.parent.mother.workAddress}
            onChange={handleChange}
          />
        </div>
      </ContainerArea>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <FormControlLabel
          value={props.studentState.parent.mother.isParent}
          control={<Switch color="primary" />}
          label="Öğrencinin Velisi mi?"
          labelPlacement="start"
          onClick={() => {
            props.setStudentState({
              ...props.studentState,
              parent: {
                ...props.studentState.parent,
                mother: {
                  ...props.studentState.parent.mother,
                  isParent: !props.studentState.parent.mother.isParent,
                }
              }
            });
          }}
        />
        <div style={{
          display: "flex",
          gap: "10px"
        }}>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={(e) => props.setTabValue(0)}
            sx={{ height: "max-content" }}>
            Geri
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={(e) => props.setExpanded("panel2")}
            sx={{ height: "max-content" }}
          >
            İleri
          </Button>
        </div>
      </div>
    </>
  );
};

export default MotherInfos;
