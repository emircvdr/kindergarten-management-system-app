import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { IStudents } from "../../../../interfaces/IStudents";

const ContainerArea = styled.div`
  display: flex;
  justify-content: center;
  gap: 120px;
`;
const HeirInfos = (props: {
  studentInfos: IStudents.ICreateStudent;
  setStudentInfos: React.Dispatch<React.SetStateAction<IStudents.ICreateStudent>>;
  setTabValue: React.Dispatch<React.SetStateAction<number>>;
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
}) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setStudentInfos({
      ...props.studentInfos,
      parent: {
        ...props.studentInfos.parent,
        heir: {
          ...props.studentInfos.parent.heir,
          [event.target.name]: event.target.value,
        }
      }
    })
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
            value={props.studentInfos.parent.heir.fullName}
            onChange={handleChange}
          />
          <TextField
            name="identificationNumber"
            label="TC Kimlik Numarası"
            variant="outlined"
            size="small"
            value={props.studentInfos.parent.heir.identificationNumber}
            onChange={handleChange}
          />
          <TextField
            name="phoneNumber"
            label="Cep Telefonu"
            variant="outlined"
            size="small"
            value={props.studentInfos.parent.heir.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            name="job"
            label="Mesleği"
            variant="outlined"
            size="small"
            value={props.studentInfos.parent.heir.job}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="E-mail"
            variant="outlined"
            size="small"
            value={props.studentInfos.parent.heir.email}
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
            value={props.studentInfos.parent.heir.address}
            onChange={handleChange}
          />
          <TextField
            name="workAddress"
            label="İş Adresi"
            multiline
            rows={5}
            value={props.studentInfos.parent.heir.workAddress}
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
          value={props.studentInfos.parent.heir.isParent}
          control={<Switch color="primary" />}
          label="Öğrencinin Velisi mi?"
          labelPlacement="start"
          onClick={(e) => {
            props.setStudentInfos({
              ...props.studentInfos,
              parent: {
                ...props.studentInfos.parent,
                heir: {
                  ...props.studentInfos.parent.heir,
                  isParent: !props.studentInfos.parent.heir.isParent,
                }
              }
            })
          }}
        />
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={(e) => props.setExpanded("panel2")}
            sx={{ height: "max-content" }}>
            Geri
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={(e) => props.setTabValue(2)}
            sx={{ height: "max-content" }}
          >
            İleri
          </Button>
        </div>
      </div>
    </>
  );
};

export default HeirInfos;
