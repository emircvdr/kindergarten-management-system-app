import React from 'react'
import Content from '../../../components/Content/Content';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
    const navigate = useNavigate();

    return (
        <Content
            titleName="Öğrenciler"
            header="Öğrenci Listesi"
            content={
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px",
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        alignItems: "center",
                    }}>
                        <div style={{ width: "80%" }}>
                            <TextField id="outlined-basic" label="Öğrenci Ara" variant="outlined" fullWidth size='small' />
                        </div>
                        <div style={{ width: "20%" }}>
                            <Button variant="contained" color="primary" size='small' fullWidth onClick={() => navigate("/students/add")}>Yeni Öğrenci Ekle</Button>
                        </div>
                    </div>
                </div>
            }
        />
    );
}

export default StudentList