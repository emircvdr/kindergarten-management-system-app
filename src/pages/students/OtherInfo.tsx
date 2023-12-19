import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel } from "@mui/material";

const StyledContainer = styled.div`
  display: flex;
  padding: 50px 80px 50px 80px;
  gap: 30px;
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
  padding: 50px 10px 50px 10px;
  gap: 10px;
`;

const StyledButton = styled.button`
  padding: 10px;
  width: 800px;
  color: white;
  background-color: rgba(33, 150, 243, 1);
  border: 1px solid rgba(33, 150, 243, 1);
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.1s, border-color 0.1s;

  &:hover {
    background-color: white;
    color: rgba(33, 150, 243, 1);
    border-color: rgba(33, 150, 243, 1);
  }

  &.reverse {
    background-color: rgba(33, 150, 243, 1);
    color: white;
    border-color: rgba(33, 150, 243, 1);

    &:hover {
      background-color: white;
      color: rgba(33, 150, 243, 1);
      border-color: rgba(33, 150, 243, 1);
    }
  }
`;

interface StyledTextContainerProps {
  show: boolean;
}

const StyledTextContainerTrue = styled.div<StyledTextContainerProps>`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  & > div input {
    height: 100px;
  }
`;

const StudentInfo = () => {
  const [selectedEvli, setSelectedEvli] = React.useState("");
  const [selectedAlerji, setSelectedAlerji] = React.useState("");
  const [selectedKronik, setSelectedKronik] = React.useState("");
  const [selectedKanGrubu, setSelectedKanGrubu] = React.useState("");
  const [showAlerjiTextField, setShowAlerjiTextField] = useState(false);
  const [showKronikTextField, setShowKronikTextField] = useState(false);

  const handleEvliChange = (event: SelectChangeEvent) => {
    setSelectedEvli(event.target.value as string);
  };
  const handleKanGrubuChange = (event: SelectChangeEvent) => {
    setSelectedKanGrubu(event.target.value as string);
  };
  const handleAlerjiChange = (event: SelectChangeEvent) => {
    setSelectedAlerji(event.target.value as string);
    setShowAlerjiTextField(event.target.value === "Evet");
  };
  const handleKronikChange = (event: SelectChangeEvent) => {
    setSelectedKronik(event.target.value as string);
    setShowKronikTextField(event.target.value === "Evet");
  };

  return (
    <>
      <StyledContainer>
        <StyledContainerLeft>
          <FormControl fullWidth size="small">
            <InputLabel>Anne Baba Beraber Mi?</InputLabel>
            <Select
              name="isMarried"
              value={selectedEvli}
              label="Anne Baba Beraber Mi?"
              onChange={handleEvliChange}
              size="small"
              required
            >
              <MenuItem value="beraber">Beraber</MenuItem>
              <MenuItem value="ayrı">Ayrı</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Kan Grubu</InputLabel>
            <Select
              name="kanGrubu"
              value={selectedKanGrubu}
              label="Kan Grubu"
              onChange={handleKanGrubuChange}
              size="small"
              required
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
            <TextField
              size="small"
              id="filled-multiline-static-1"
              label="Adı-Soyadı"
              variant="outlined"
            />
            <TextField
              size="small"
              id="filled-multiline-static-2"
              label="Telefon Numarası"
              variant="outlined"
            />
            <TextField
              size="small"
              id="filled-multilinte-static-3"
              label="Yakınlık Derecesi"
              variant="outlined"
            />
          </StyledTextContainer>
        </StyledContainerLeft>

        <StyledContainerRight>
          <FormControl fullWidth size="small">
            <InputLabel>Alerji</InputLabel>
            <Select
              name="alerji"
              value={selectedAlerji}
              label="Alerji"
              onChange={handleAlerjiChange}
              size="small"
              required
            >
              <MenuItem value="Evet">Evet</MenuItem>
              <MenuItem value="Hayır">Hayır</MenuItem>
            </Select>
          </FormControl>

          <StyledTextContainerTrue show={showAlerjiTextField}>
            <TextField
              id="filled-multiline-static-alerji"
              label="Alerji Detayları"
              variant="outlined"
            />
          </StyledTextContainerTrue>

          <FormControl fullWidth size="small">
            <InputLabel>Kronik</InputLabel>
            <Select
              name="kronik"
              value={selectedKronik}
              label="Kronik"
              onChange={handleKronikChange}
              size="small"
              required
            >
              <MenuItem value="Evet">Evet</MenuItem>
              <MenuItem value="Hayır">Hayır</MenuItem>
            </Select>
          </FormControl>

          <StyledTextContainerTrue show={showKronikTextField}>
            <TextField
              size="small"
              id="filled-multiline-static-kronik"
              label="Kronik Hastalık Detayları"
              variant="outlined"
            />
          </StyledTextContainerTrue>
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
        }}
      >
        <StyledButton>KAYDET</StyledButton>
        <StyledButton className="reverse">GERİ DÖN</StyledButton>
      </div>
    </>
  );
};

export default StudentInfo;
