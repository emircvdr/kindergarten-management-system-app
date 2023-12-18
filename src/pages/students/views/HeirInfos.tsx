import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";

const ContainerArea = styled.div`
  display: flex;
  justify-content: center;
  gap: 120px;
`;
const HeirInfos = (props: {
  heirInfos: {
    fullName: string;
    identificationNumber: string;
    phoneNumber: string;
    job: string;
    address: string;
    workAddress: string;
    email: string;
    isParent: boolean;
  };
  setHeirInfos: React.Dispatch<
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
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  motherInfos: any;
  fatherInfos: any;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setHeirInfos({
      ...props.heirInfos,
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
            value={props.heirInfos.fullName}
            onChange={handleChange}
          />
          <TextField
            name="tc"
            label="TC Kimlik Numarası"
            variant="outlined"
            size="small"
            value={props.heirInfos.identificationNumber}
            onChange={handleChange}
          />
          <TextField
            name="phoneNumber"
            label="Cep Telefonu"
            variant="outlined"
            size="small"
            value={props.heirInfos.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            name="job"
            label="Mesleği"
            variant="outlined"
            size="small"
            value={props.heirInfos.job}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="E-mail"
            variant="outlined"
            size="small"
            value={props.heirInfos.email}
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
            value={props.heirInfos.address}
            onChange={handleChange}
          />
          <TextField
            name="workAddress"
            label="İş Adresi"
            multiline
            rows={5}
            value={props.heirInfos.workAddress}
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
              props.setExpanded("panel2");
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
              props.setValue(2);
              console.log(
                props.heirInfos,
                props.motherInfos,
                props.fatherInfos
              );
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

export default HeirInfos;
