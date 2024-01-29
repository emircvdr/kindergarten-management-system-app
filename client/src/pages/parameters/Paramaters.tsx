import React from "react";
import Content from "../../components/Content/Content";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, TextField } from "@mui/material";

const Paramaters = () => {
  const [lessonName, setLessonName] = React.useState("");

  return (
    <Content
      titleName="Parametreler"
      header="Ayarlar"
      content={
        <>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ cursor: "pointer!important" }}
            >
              Ders eklemek için:
            </AccordionSummary>
            <AccordionDetails sx={{}}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Ders Adı"
                variant="outlined"
                value={lessonName}
                onChange={(e) => setLessonName(e.target.value)}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{ marginTop: "50px" }}
                onClick={() => {
                  console.log(
                    lessonName.charAt(0).toUpperCase() + lessonName.slice(1)
                  );
                  setLessonName("");
                }}
              >
                Ekle
              </Button>
            </AccordionDetails>
          </Accordion>
        </>
      }
    />
  );
};

export default Paramaters;
