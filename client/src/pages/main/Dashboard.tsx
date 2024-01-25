import React, { useEffect } from "react";
import Content from "../../components/Content/Content";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "jose";
import Cookies from "js-cookie";
import { KindergartenAPI } from "../../services/broker";

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
  useEffect(() => {
    const token = Cookies.get("token");
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      Cookies.remove("token");
      navigate("/login");
    }
    if (!token || !decodeJwt(token)) {
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        KindergartenAPI.RefreshToken(refreshToken).then((data) => {
          const token = decodeJwt(data?.token);
          const refreshToken = decodeJwt(data?.refreshToken);
          if (!token || !refreshToken) {
            navigate("/login");
            return;
          }
          Cookies.set("token", data.token, {
            expires: new Date(Number(token?.exp) * 1000),
          });
          Cookies.set("refreshToken", data.refreshToken, {
            expires: new Date(Number(refreshToken?.exp) * 1000),
          });
        });
      } else {
        navigate("/login");
      }
    }
  }, []);

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
