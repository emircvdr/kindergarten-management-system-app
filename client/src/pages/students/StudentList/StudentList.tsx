import React from "react";
import Content from "../../../components/Content/Content";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StyledDataGrid from "../../../components/StyledDataGrid/StyledDataGrid";
import styled from "styled-components";
import { GridColDef } from "@mui/x-data-grid";

const DataGridContainer = styled.div`
  width: 100%;
  height: calc(100vh - 200px);
`;
const Edit = styled.div`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
const columns: GridColDef[] = [
  {
    field: "studentNumber",
    headerName: "Öğrenci No",
    width: 150,
    flex: 1,
    editable: false,
  },
  {
    field: "firstName",
    headerName: "Adı",
    width: 150,
    flex: 1,
    editable: false,
  },
  {
    field: "lastName",
    headerName: "Soyadı",
    width: 150,
    flex: 1,
    editable: false,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    flex: 1,
    editable: false,
  },
  {
    field: "id",
    headerName: "İşlemler",
    width: 90,
    flex: 1,
    renderCell: (params) => {
      return <Edit>Düzenle</Edit>;
    },
  },
];
const rows = [
  {
    id: "1",
    lastName: "Cell",
    firstName: "Cell",
    email: "Cell",
    studentNumber: "Cell",
  },
  {
    id: "2",
    lastName: "Cell",
    firstName: "Cell",
    email: "Cell",
    studentNumber: "Cell",
  },
  {
    id: "3",
    lastName: "Cell",
    firstName: "Cell",
    email: "Cell",
    studentNumber: "Cell",
  },
  {
    id: "4",
    lastName: "Cell",
    firstName: "Cell",
    email: "Cell",
    studentNumber: "Cell",
  },
];
const StudentList = () => {
  const navigate = useNavigate();

  return (
    <Content
      titleName="Öğrenciler"
      header="Öğrenci Listesi"
      content={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div style={{ width: "80%" }}>
              <TextField
                id="outlined-basic"
                label="Öğrenci Ara"
                variant="outlined"
                fullWidth
                size="small"
              />
            </div>
            <div style={{ width: "20%" }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                fullWidth
                onClick={() => navigate("/students/add")}
              >
                Yeni Öğrenci Ekle
              </Button>
            </div>
          </div>
          <DataGridContainer>
            <StyledDataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
              disableColumnMenu
            />
          </DataGridContainer>
        </div>
      }
    />
  );
};

export default StudentList;
