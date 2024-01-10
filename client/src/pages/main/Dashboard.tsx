import React from "react";
import Content from "../../components/Content/Content";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ButtonLink = styled.a`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px 15px;
  margin: 0 10px;
  color: #222;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #eee;
    border-color: #ccc;
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Content
      titleName="Ana Sayfa"
      header="Dashboard"
      content={
        <>
          <div style={{ display: "flex", gap: "10px" }}>
            <ButtonLink
              onClick={(e) => navigate("/preliminary-interview/list")}
            >
              Ön Görüşme Kaydı
            </ButtonLink>
            <ButtonLink onClick={(e) => navigate("/preliminary-interview/add")}>
              Kayıt Listeleri
            </ButtonLink>
            <ButtonLink onClick={(e) => navigate("/preliminary-interview/add")}>
              Diğer
            </ButtonLink>
          </div>
        </>
      }
    />
  );
};

export default Dashboard;
