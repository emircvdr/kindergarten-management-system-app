import React from "react";
import Content from "../../../components/Content/Content";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StyledDataGrid from "../../../components/StyledDataGrid/StyledDataGrid";
import styled from "styled-components";
import { GridColDef } from "@mui/x-data-grid";
import { KindergartenAPI } from "../../../services/broker";
import { IStudents } from "../../../interfaces/IStudents";
import { useParams } from "react-router-dom";
import { IPreliminaryInterview } from "../../../interfaces/IPreliminaryInterview";

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

const PreliminaryInterviewList = () => {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "firstName",
      headerName: "Öğrencinin Adı",
      minWidth: 150,
      flex: 1,
      editable: false,
    },
    {
      field: "lastName",
      headerName: "Öğrencinin Soyadı",
      minWidth: 150,
      flex: 1,
      editable: false,
    },
    {
      field: "preinterviewDate",
      headerName: "Görüşme Tarihi",
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

  const [rows, setRows] = React.useState<IPreliminaryInterview.IStudent[]>([]);
  const [selectedRow, setSelectedRow] = React.useState<
    IPreliminaryInterview.IStudent[]
  >([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const handleSearch = (e: any) => {
    const value = e.target.value;
    const search = rows.filter(
      (row) => row.firstName.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    setSelectedRow(search);
  };

  React.useEffect(() => {
    KindergartenAPI.GetInterviews().then((res) => {
      setRows(res.map((item: any) => ({ ...item, id: item._id })));
      setSelectedRow(res.map((item: any) => ({ ...item, id: item._id })));
      setIsLoading(false);
    });
  }, []);

  return (
    <Content
      titleName="Ön Görüşme Listesi"
      header="Ön Görüşme Kayıtları"
      content={
        isLoading ? (
          <div>Loading...</div>
        ) : (
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
                  onClick={() => navigate("/preliminary-interview/add")}
                >
                  Yeni Ön Görüşme Ekle
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
        )
      }
    />
  );
};

export default PreliminaryInterviewList;
