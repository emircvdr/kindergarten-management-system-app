import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import React, { SetStateAction } from "react";
import styled from "styled-components";
import { IStudents } from "../../../../interfaces/IStudents";

const ContainerArea = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
`;

const FatherInfos = (props: {
  studentState: IStudents.IStudentDetails;
  setStudentState: React.Dispatch<
    React.SetStateAction<IStudents.IStudentDetails>
  >;
  setExpanded: React.Dispatch<SetStateAction<string | false>>;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setStudentState({
      ...props.studentState,
      parent: {
        ...props.studentState.parent,
        father: {
          ...props.studentState.parent.father,
          [event.target.name]: event.target.value,
        },
      },
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
            value={props.studentState.parent.father.fullName}
            onChange={handleChange}
          />
          <TextField
            name="identificationNumber"
            label="TC Kimlik Numarası"
            variant="outlined"
            size="small"
            value={props.studentState.parent.father.identificationNumber}
            onChange={handleChange}
          />
          <TextField
            name="phoneNumber"
            label="Cep Telefonu"
            variant="outlined"
            size="small"
            value={props.studentState.parent.father.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            name="job"
            label="Mesleği"
            variant="outlined"
            size="small"
            value={props.studentState.parent.father.job}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="E-mail"
            variant="outlined"
            size="small"
            value={props.studentState.parent.father.email}
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
            value={props.studentState.parent.father.address}
            onChange={handleChange}
          />
          <TextField
            name="workAddress"
            label="İş Adresi"
            multiline
            rows={5}
            value={props.studentState.parent.father.workAddress}
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
          value={props.studentState.parent.father.isParent}
          control={<Switch color="primary" />}
          label="Öğrencinin Velisi mi?"
          labelPlacement="start"
          onClick={(e) =>
            props.setStudentState({
              ...props.studentState,
              parent: {
                ...props.studentState.parent,
                father: {
                  ...props.studentState.parent.father,
                  isParent: !props.studentState.parent.father.isParent,
                },
              },
            })
          }
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
            onClick={(e) => {
              e.preventDefault();
              props.setExpanded("panel1");
            }}
            sx={{
              height: "max-content",
            }}
          >
            Geri
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              props.setExpanded("panel3");
            }}
            sx={{
              height: "max-content",
            }}
          >
            İleri
          </Button>
        </div>
      </div>
    </>
  );
};

export default FatherInfos;
