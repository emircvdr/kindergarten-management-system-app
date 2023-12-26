//Global Imports//
import React from "react";
import Content from "../../../components/Content/Content";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { trTR } from "@mui/x-date-pickers";
import styled from "styled-components";

const StyledTypography = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
    `;

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 50%;
    height: calc(100vh - 320px);
`;

const StyledButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

interface IParentInfo {
    motherFullName: string;
    motherPhone: string;
    motherJob: string;
    fatherFullName: string;
    fatherPhone: string;
    fatherJob: string;
}




//Global Imports//

//İnterface//
interface PreinterviewProps {
    name: string;
    surname: string;
    birthDate: string;
    gender: string;
    ageGroup: string;
    preinterviewDate: string;
}

//UseStates//
const AddPreliminaryInterview = () => {

    const [preinterview, setPreinterview] = React.useState<PreinterviewProps>({
        name: "",
        surname: "",
        birthDate: "",
        gender: "",
        ageGroup: "",
        preinterviewDate: "",
    });

    const [parentInfo, setParentInfo] = React.useState<IParentInfo>({
        fatherFullName: "",
        fatherJob: "",
        fatherPhone: "",
        motherFullName: "",
        motherJob: "",
        motherPhone: "",
    });

    const [expanded, setExpanded] = React.useState<string | false>("panel1");
    const handleAccordion =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPreinterview({
            ...preinterview,
            [event.target.name]: event.target.value,
        });
    };


    return (
        <Content
            titleName="Öğrenciler"
            header="Ön Görüşme Kaydı Ekleme"
            content={
                <>
                    <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleAccordion("panel1")}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            Öğrenci Bilgileri
                        </AccordionSummary>
                        <AccordionDetails sx={{ height: "calc(100vh - 280px)" }}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "20px",
                                    width: "100%",
                                    alignItems: "center",
                                }}
                            >
                                <TextField
                                    name="name"
                                    label="Adı"
                                    variant="outlined"
                                    value={preinterview.name}
                                    onChange={handleChange}
                                    sx={{ width: "50%" }}
                                    size="small"
                                />
                                <TextField
                                    name="surname"
                                    label="Soyadı"
                                    variant="outlined"
                                    value={preinterview.surname}
                                    onChange={handleChange}
                                    sx={{ width: "50%" }}
                                    size="small"
                                />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer
                                        components={["Doğum Tarihi"]}
                                        sx={{ width: "50%" }}
                                    >
                                        <DatePicker
                                            value={dayjs(new Date(preinterview.birthDate))}
                                            onChange={(e: any) => {
                                                setPreinterview({
                                                    ...preinterview,
                                                    birthDate: e.$d.toISOString(),
                                                });
                                            }}
                                            label="Doğum Tarihi"
                                            format="DD/MM/YYYY"
                                            localeText={
                                                trTR.components.MuiLocalizationProvider.defaultProps
                                                    .localeText
                                            }
                                            slotProps={{
                                                textField: {
                                                    size: "small",
                                                    error: false,
                                                    required: true,
                                                },
                                            }}
                                            sx={{ width: "100%" }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <FormControl sx={{ width: "50%" }} size="small">
                                    <InputLabel>Cinsiyeti</InputLabel>
                                    <Select
                                        id="demo-simple-select"
                                        value={preinterview.gender}
                                        label="Cinsiyeti"
                                        fullWidth
                                        onChange={(e) => {
                                            setPreinterview({
                                                ...preinterview,
                                                gender: e.target.value,
                                            });
                                        }}
                                    >
                                        <MenuItem value={"Erkek"}>Erkek</MenuItem>
                                        <MenuItem value={"Kadın"}>Kadın</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ width: "50%" }} size="small">
                                    <InputLabel>Yaş Grubu</InputLabel>
                                    <Select
                                        value={preinterview.ageGroup}
                                        label="Yaş Grubu"
                                        fullWidth
                                        onChange={(e) => {
                                            setPreinterview({
                                                ...preinterview,
                                                ageGroup: e.target.value,
                                            });
                                        }}
                                    >
                                        <MenuItem value={"1"}>1</MenuItem>
                                        <MenuItem value={"2"}>2</MenuItem>
                                        <MenuItem value={"3"}>3</MenuItem>
                                        <MenuItem value={"4"}>4</MenuItem>
                                        <MenuItem value={"5"}>5</MenuItem>
                                        <MenuItem value={"6"}>6</MenuItem>
                                        <MenuItem value={"7"}>7</MenuItem>
                                    </Select>
                                </FormControl>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer
                                        components={["Öngörülen Kayıt Tarihi"]}
                                        sx={{ width: "50%" }}
                                    >
                                        <DatePicker
                                            value={dayjs(new Date(preinterview.preinterviewDate))}
                                            onChange={(e: any) => {
                                                setPreinterview({
                                                    ...preinterview,
                                                    preinterviewDate: e.$d.toISOString(),
                                                });
                                            }}
                                            label="Öngörülen Kayıt Tarihi"
                                            format="DD/MM/YYYY"
                                            localeText={
                                                trTR.components.MuiLocalizationProvider.defaultProps
                                                    .localeText
                                            }
                                            slotProps={{
                                                textField: {
                                                    size: "small",
                                                    error: false,
                                                    required: true,
                                                },
                                            }}
                                            sx={{ width: "100%" }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        console.log(preinterview);
                                        setExpanded("panel2");
                                    }}
                                >
                                    İleri
                                </Button>
                            </div>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion
                        expanded={expanded === "panel2"}
                        onChange={handleAccordion("panel2")}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            Ebeveyn Bilgileri
                        </AccordionSummary>
                        <AccordionDetails>
                            <StyledTypography>
                                <StyledContainer>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Anne Adı-Soyadı"
                                        variant="outlined"
                                        value={parentInfo.motherFullName}
                                        onChange={(e) => {
                                            setParentInfo({
                                                ...parentInfo,
                                                motherFullName: e.target.value,
                                            });
                                            console.log(e.target.value);
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Anne Telefon Numarası"
                                        variant="outlined"
                                        value={parentInfo.motherPhone}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d{0,10}$/.test(value) || value === "") {
                                                setParentInfo({
                                                    ...parentInfo,
                                                    motherPhone: value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
                                                });
                                            }
                                        }}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    />
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Anne Meslek"
                                        variant="outlined"
                                        value={parentInfo.motherJob}
                                        onChange={(e) => {
                                            setParentInfo({
                                                ...parentInfo,
                                                motherJob: e.target.value,
                                            });
                                            console.log(e.target.value);
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Baba Adı Soyadı"
                                        variant="outlined"
                                        value={parentInfo.fatherFullName}
                                        onChange={(e) => {
                                            setParentInfo({
                                                ...parentInfo,
                                                fatherFullName: e.target.value,
                                            });
                                            console.log(e.target.value);
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Baba Telefon Numarası"
                                        variant="outlined"
                                        value={parentInfo.fatherPhone}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d{0,10}$/.test(value) || value === "") {
                                                setParentInfo({
                                                    ...parentInfo,
                                                    fatherPhone: value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
                                                });
                                            }
                                        }}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    />
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Baba Meslek"
                                        variant="outlined"
                                        value={parentInfo.fatherJob}
                                        onChange={(e) => {
                                            setParentInfo({
                                                ...parentInfo,
                                                fatherJob: e.target.value,
                                            });
                                            console.log(e.target.value);
                                        }}
                                    />
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                console.log(preinterview);
                                                setExpanded("panel2");
                                            }}
                                        >
                                            İleri
                                        </Button>
                                    </div>
                                </StyledContainer>
                            </StyledTypography>


                        </AccordionDetails>
                    </Accordion>

                    <Accordion
                        expanded={expanded === "panel3"}
                        onChange={handleAccordion("panel3")}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            Diğer Bilgileri
                        </AccordionSummary>
                        <AccordionDetails sx={{ height: "calc(100vh - 280px)" }}>
                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <div style={{ width: "50%", display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Ödeme Tipi</InputLabel>
                                        <Select
                                            label="Ödeme Tipi"
                                            size="small"
                                            required
                                        >
                                            <MenuItem value="cash">Nakit</MenuItem>
                                            <MenuItem value="installment-payment">Taksitli</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Taksit Sayısı"
                                        variant="outlined"
                                    />
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Birim Taksit Tutarı"
                                        variant="outlined"
                                    />
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Sözeşme Tutarı"
                                        variant="outlined"
                                    />
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Görüşme Notları"
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                    />
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </>
            }
        />
    );
};

export default AddPreliminaryInterview;
