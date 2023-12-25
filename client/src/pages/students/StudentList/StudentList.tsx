import React from "react";
import Content from "../../../components/Content/Content";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StyledDataGrid from "../../../components/StyledDataGrid/StyledDataGrid";
import styled from "styled-components";
import { GridColDef } from "@mui/x-data-grid";
import { KindergartenAPI } from "../../../services/broker";
import { IStudents } from "../../../interfaces/IStudents";

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
    field: "firstName",
    headerName: "Adı",
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: "lastName",
    headerName: "Soyadı",
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: "birthDate",
    headerName: "Doğum Tarihi",
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: "id",
    headerName: "İşlemler",
    minWidth: 90,
    width: 90,
    renderCell: (params: any) => {
      return <Edit>Düzenle</Edit>;
    },
  },
];

const StudentList = () => {
  const navigate = useNavigate();

  const [rows, setRows] = React.useState<IStudents.IStudent[]>([]);
  const [selectedRow, setSelectedRow] = React.useState<IStudents.IStudent[]>(
    []
  );
  const handleSearch = (e: any) => {
    const value = e.target.value;
    const search = rows.filter(
      (row) => row.firstName.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    setSelectedRow(search);
  };

  React.useEffect(() => {
    KindergartenAPI.GetStudents().then((res) => {
      setRows(res.map((item: any) => ({ ...item, id: item._id })));
      setSelectedRow(res.map((item: any) => ({ ...item, id: item._id })));
    });
  }, []);

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
                onChange={handleSearch}
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
              rows={selectedRow}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 50,
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
