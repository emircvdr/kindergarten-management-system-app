import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import React, { SetStateAction } from "react";
import styled from "styled-components";

const ContainerArea = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
`;

const FatherInfos = (props: {
  fatherInfos: {
    fullName: string;
    identificationNumber: string;
    phoneNumber: string;
    job: string;
    address: string;
    workAddress: string;
    email: string;
    isParent: boolean;
  };
  setFatherInfos: React.Dispatch<
    React.SetStateAction<{
      fullName: string;
      identificationNumber: string;
      phoneNumber: string;
      job: string;
      address: string;
      workAddress: string;
      email: string;
      isParent: boolean;
    }>
  >;
  setExpanded: React.Dispatch<SetStateAction<string | false>>;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setFatherInfos({
      ...props.fatherInfos,
      [event.target.name]: event.target.value,
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
            value={props.fatherInfos.fullName}
            onChange={handleChange}
          />
          <TextField
            name="identificationNumber"
            label="TC Kimlik Numarası"
            variant="outlined"
            size="small"
            value={props.fatherInfos.identificationNumber}
            onChange={handleChange}
          />
          <TextField
            name="phoneNumber"
            label="Cep Telefonu"
            variant="outlined"
            size="small"
            value={props.fatherInfos.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            name="job"
            label="Mesleği"
            variant="outlined"
            size="small"
            value={props.fatherInfos.job}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="E-mail"
            variant="outlined"
            size="small"
            value={props.fatherInfos.email}
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
            value={props.fatherInfos.address}
            onChange={handleChange}
          />
          <TextField
            name="workAddress"
            label="İş Adresi"
            multiline
            rows={5}
            value={props.fatherInfos.workAddress}
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
          value="start"
          control={<Switch color="primary" />}
          label="Öğrencinin Velisi mi?"
          labelPlacement="start"
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
