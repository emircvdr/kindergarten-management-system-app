import React from "react";
import Content from "../../../components/Content/Content";
import { Button, TextField, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StyledDataGrid from "../../../components/StyledDataGrid/StyledDataGrid";
import styled from "styled-components";
import { GridColDef } from "@mui/x-data-grid";
import { KindergartenAPI } from "../../../services/broker";
import { IoFilterOutline } from "react-icons/io5";
import { ITeacher } from "../../../interfaces/ITeacher";

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

const TeacherList = () => {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "Öğretmenin Adı",
      minWidth: 150,
      flex: 1,
      editable: false,
    },
    {
      field: "dutyGroup",
      headerName: "Öğretmenin Görevi",
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
        return (
          <Edit onClick={() => navigate(`/teacher/edit/${params.row.id}`)}>
            Düzenle
          </Edit>
        );
      },
    },
  ];

  const [rows, setRows] = React.useState<ITeacher.ITeacher[]>([]);
  const [selectedRow, setSelectedRow] = React.useState<ITeacher.ITeacher[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const handleSearch = (e: any) => {
    const value = e.target.value;
    const search = rows.filter(
      (row) => row.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    setSelectedRow(search);
  };

  const [isActive, setIsActive] = React.useState<boolean>(true);

  React.useEffect(() => {
    KindergartenAPI.GetTeachers().then((res) => {
      setRows(res.map((item: any) => ({ ...item, id: item._id })));
      setSelectedRow(res.map((item: any) => ({ ...item, id: item._id })));
      setIsLoading(false);
    });
  }, []);

  return (
    <Content
      titleName="Öğretmen Listesi"
      header="Öğretmen Listesi"
      content={
        // isLoading ? (
        //   <div>Loading...</div>
        // ) : (
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
                label="Öğretmen Ara"
                variant="outlined"
                fullWidth
                size="small"
                onChange={handleSearch}
              />
            </div>
            <div>
              <Tooltip
                title={
                  isActive ? "Pasif Listesini Göster" : "Aktif Listesini Göster"
                }
              >
                <Button
                  startIcon={<IoFilterOutline />}
                  onClick={() => setIsActive(!isActive)}
                />
              </Tooltip>
            </div>
            <div style={{ width: "20%" }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                fullWidth
                onClick={() => navigate("/teacher/add")}
              >
                Yeni Öğretmen Ekle
              </Button>
            </div>
          </div>
          <DataGridContainer>
            <StyledDataGrid
              rows={selectedRow.filter((item) => item.isActive === isActive)}
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

export default TeacherList;
