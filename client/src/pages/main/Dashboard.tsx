import React from "react";
import { useNavigate } from "react-router-dom";
import Content from "../../components/Content/Content";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <Content
      titleName="Ana Sayfa"
      header="Dashboard"
      content={
        <>
          
        </>
      }
    />
  );
};

export default Dashboard;
