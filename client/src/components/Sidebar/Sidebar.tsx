// Global Imports//
import React from "react";
import styled from "styled-components";
import { PiGraduationCapDuotone } from "react-icons/pi";
import logo from "../../assets/logo";
import { RiParentLine } from "react-icons/ri";
import { PiChalkboardTeacher } from "react-icons/pi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdDashboard, MdOutlineClass } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

//// Start point Styled Components ////
const SideBarContainer = styled.div`
  width: 288px;
  height: 100vh;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: rgb(239, 239, 239);
`;

const SideBarHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1px;
  color: rgb(9 70 200 / 84%);
  img {
    margin-bottom: 10px;
  }
`;

const SideBarMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  gap: 10px;
`;

const MenuItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => (props.active ? "white" : "rgb(9 70 200 / 95%)")};
  background: ${(props) =>
    props.active ? "rgb(9 70 200 / 84%)" : "transparent"};
  cursor: pointer;
  &:hover {
    background: ${(props) =>
      props.active ? "rgb(9 70 200 / 70%)" : "#e0e0e0"};
  }
`;
//// End point Styled Components ////

interface IMenuItem {
  icon: JSX.Element;
  title: string;
  path: string;
}

const SideBar = ({ titleName }: { titleName: string }) => {
  const menuItems: IMenuItem[] = [
    {
      icon: <MdDashboard size={25} />,
      title: "Ana Sayfa",
      path: "/",
    },
    {
      icon: <PiGraduationCapDuotone size={25} />,
      title: "Öğrenciler",
      path: "/students/list",
    },
    {
      icon: <RiParentLine size={25} />,
      title: "Veliler",
      path: "/parents/list",
    },
    {
      icon: <PiChalkboardTeacher size={25} />,
      title: "Öğretmenler",
      path: "/teacher/add",
    },
    {
      icon: <BsFillPersonLinesFill size={25} />,
      title: "Personeller",
      path: "/employee/add",
    },
    {
      icon: <MdOutlineClass size={25} />,
      title: "Sınıflar",
      path: "/class/add",
    },
    {
      icon: <AiOutlineSchedule size={25} />,
      title: "Ders Programı",
      path: "/schedule/list",
    },
    {
      icon: <IoSettingsOutline size={25} />,
      title: "Parametreler",
      path: "/parameters",
    },
  ];

  const navigate = useNavigate();

  return (
    <SideBarContainer>
      <SideBarHeader>
        <img src={logo} width={50} height={50} alt="logo" />
        Kreş Yönetim Sistemi
      </SideBarHeader>
      <SideBarMenu>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            active={titleName === item.title}
            onClick={(e) => navigate(item.path)}
          >
            {item.icon}
            {item.title}
          </MenuItem>
        ))}
      </SideBarMenu>
    </SideBarContainer>
  );
};

export default SideBar;
