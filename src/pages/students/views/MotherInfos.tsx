import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";

const ContainerArea = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
`;

const MotherInfos = (props: {
  motherInfos: {
    name: string;
    tc: string;
    phoneNumber: string;
    job: string;
    address: string;
    workAddress: string;
    isParent: boolean;
    email: string;
  };
  setMotherInfos: React.Dispatch<
    React.SetStateAction<{
      name: string;
      tc: string;
      phoneNumber: string;
      job: string;
      address: string;
      workAddress: string;
      isParent: boolean;
      email: string;
    }>
  >;
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setMotherInfos({
      ...props.motherInfos,
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
            name="name"
            label="Adı-Soyadı"
            variant="outlined"
            size="small"
            value={props.motherInfos.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="tc"
            label="TC Kimlik Numarası"
            variant="outlined"
            size="small"
            value={props.motherInfos.tc}
            onChange={handleChange}
          />
          <TextField
            name="phoneNumber"
            label="Cep Telefonu"
            variant="outlined"
            size="small"
            value={props.motherInfos.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            name="job"
            label="Mesleği"
            variant="outlined"
            size="small"
            value={props.motherInfos.job}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="E-mail"
            variant="outlined"
            size="small"
            value={props.motherInfos.email}
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
            value={props.motherInfos.address}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="workAddress"
            label="İş Adresi"
            multiline
            rows={5}
            value={props.motherInfos.workAddress}
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
          value="top"
          control={<Switch color="primary" />}
          label="Öğrencinin Velisi Mi?"
          labelPlacement="top"
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={(e) => {
            e.preventDefault();
            props.setExpanded("panel2");
          }}
          sx={{
            height: "max-content",
          }}
        >
          İleri
        </Button>
      </div>
    </>
  );
};

export default MotherInfos;
