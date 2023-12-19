import React, { useState, useRef } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { BsPersonCircle } from "react-icons/bs";
import { FormControl, InputLabel } from "@mui/material";
import { trTR } from "@mui/x-date-pickers";

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
    background-color: white;
    color: rgba(33, 150, 243, 1);
    border-color: rgba(33, 150, 243, 1);
  }

  &.reverse:hover {
    background-color: rgba(33, 150, 243, 1);
    color: white;
    border-color: rgba(33, 150, 243, 1);
  }
`;

const StyledIconContainer = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const StyledIcon = styled(BsPersonCircle)`
  font-size: 80px;
  color: lightgray;
  border-radius: 50%;
  overflow: hidden;
`;

const StyledFileInput = styled.input`
  display: none;
`;

const StudentInfo = () => {
  const [selectedUyruk, setSelectedUyruk] = React.useState("");
  const [selectedDogumYeri, setSelectedDogumYeri] = React.useState("");
  const [selectedSınıf, setSelectedSınıf] = React.useState("");
  const [selectedCinsiyet, setSelectedCinsiyet] = React.useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUyrukChange = (event: SelectChangeEvent) => {
    setSelectedUyruk(event.target.value as string);
  };
  const handleDogumYeriChange = (event: SelectChangeEvent) => {
    setSelectedDogumYeri(event.target.value as string);
  };
  const handleSınıfChange = (event: SelectChangeEvent) => {
    setSelectedSınıf(event.target.value as string);
  };
  const handleCinsiyetChange = (event: SelectChangeEvent) => {
    setSelectedCinsiyet(event.target.value as string);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      if (
        selectedFile.type !== "image/png" &&
        selectedFile.type !== "image/jpeg"
      ) {
        alert(
          "Dosya türü desteklenmiyor. Lütfen .png veya .jpeg/.jpg uzantılı bir dosya seçin."
        );
      } else {
        const imageUrl = URL.createObjectURL(selectedFile);
        setSelectedImage(imageUrl);
      }
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <StyledIconContainer htmlFor="createPersonalPhoto">
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Seçilen Fotoğraf"
            className="rounded-md"
            style={{
              maxHeight: "100px",
              maxWidth: "100px",
              borderRadius: "50%",
            }}
          />
        ) : (
          <StyledIcon />
        )}

        <span>Fotograf Seç</span>
        <StyledFileInput
          id="createPersonalPhoto"
          type="file"
          accept=".png, .jpeg, .jpg"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </StyledIconContainer>

      <StyledContainer>
        <StyledContainerLeft>
          <TextField
            size="small"
            id="filled-multiline-static-1"
            label="TC Kimlik No"
            variant="outlined"
          />
          <TextField
            size="small"
            id="filled-multiline-static-2"
            label="Adı"
            variant="outlined"
          />
          <TextField
            size="small"
            id="filled-multilinte-static-3"
            label="Soyadı"
            variant="outlined"
          />

          <FormControl fullWidth size="small">
            <InputLabel>Uyruk</InputLabel>
            <Select
              name="nationality"
              value={selectedUyruk}
              label="Uyruk"
              onChange={handleUyrukChange}
              size="small"
              required
            >
              <MenuItem value="Türk">Türk</MenuItem>
              <MenuItem value="İngiliz">İngiliz</MenuItem>
            </Select>
          </FormControl>
        </StyledContainerLeft>

        <StyledContainerRight>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{
                textField: { size: "small" },
              }}
              label="Doğum Tarihi"
              localeText={
                trTR.components.MuiLocalizationProvider.defaultProps.localeText
              }
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>

          <FormControl fullWidth size="small">
            <InputLabel>Doğum Yeri</InputLabel>
            <Select
              name="city"
              value={selectedDogumYeri}
              label="Doğum Yeri"
              onChange={handleDogumYeriChange}
              size="small"
              required
            >
              <MenuItem value="Sakarya">Sakarya</MenuItem>
              <MenuItem value="Kocaeli">Kocaeli</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Sınıf</InputLabel>
            <Select
              name="sınıf"
              value={selectedSınıf}
              label="Sınıf"
              onChange={handleSınıfChange}
              size="small"
              required
            >
              <MenuItem value="1-A">1-A</MenuItem>
              <MenuItem value="1-B">1-B</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Cinsiyet</InputLabel>
            <Select
              name="cinsiyet"
              value={selectedCinsiyet}
              label="Cinsiyet"
              onChange={handleCinsiyetChange}
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
        }}
      >
        <StyledButton>İLERLE</StyledButton>
        <StyledButton className="reverse">GERİ DÖN</StyledButton>
      </div>
    </>
  );
};

export default StudentInfo;

{
  /* <BsPersonCircle size={80} color='lightgray' /> */
}

// const handleFileChange = (e: any) => {
//   if (e.target.files[0].type !== "image/png" && e.target.files[0].type !== "image/jpeg") {
//     Toast.fire({
//     icon: 'error',
//     title: 'Dosya türü desteklenmiyor'
//     });
//     return;
//   }
//   setSelectedImage(e.target.files[0]);
// };

{
  /* <div className='flex gap-4 mt-2 items-center'>
      <label htmlFor="createPersonalPhoto" className='text-[10px] cursor-pointer bg-blue-500 text-white py-1 px-2 rounded-md transition-all hover:bg-blue-600'>
        Fotograf Seç
      </label>
      <input
        id="createPersonalPhoto"
        type="file"
        className="sr-only"
        accept=".png, .jpeg, .jpg"
        onChange={handleFileChange}
      />
    </div> */
}
