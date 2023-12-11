// Global Imports//
import React from "react";
import styled from "styled-components";
import { PiGraduationCapDuotone } from "react-icons/pi";

// Start point Styled Components //
const SideBarContainer = styled.div`
  width: 288px;
  height: 100vh;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const LinksContainer = styled.div`
  width: 100%;
  height: calc(100vh - 69px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Students = styled.div`
  width: 250px;
  height: 50px;
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  padding-left: 20px;
  background: rgba(33, 150, 243, 1);
  color: white;
  border-radius: 10px;
  h1 {
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    letter-spacing: 1px;
  }
`;
// End point Styled Components //

interface IMenuItem {
    icon: JSX.Element;
    title: string;
    path: string;
}


const SideBar = ({ titleName }: { titleName: string }) => {


    const menuItems: IMenuItem[] = [
        {
            icon: <PiGraduationCapDuotone size={25} />,
            title: "Öğrenciler",
            path: "/students/list",
        },
        {
            icon: <PiGraduationCapDuotone size={25} />,
            title: "Öğrenciler1",
            path: "/students/list",
        }
    ];


    return (
        <>
            <SideBarContainer>
                <h3>Kreş Yönetim Sistemi</h3>
                <LinksContainer>
                    {menuItems.map((item, index) => (
                        <Students key={index}>
                            {item.icon}
                            <h1
                                style={{
                                    color: titleName == item.title ? "white" : "rgba(0,0,0,0.8)",
                                    fontWeight: titleName == item.title ? "bold" : "normal",
                                    background: titleName == item.title ? "rgba(33, 150, 243, 1)" : "white",
                                }}

                            >{item.title}</h1>
                        </Students>
                    ))}
                </LinksContainer>
            </SideBarContainer>
        </>
    );
};

export default SideBar;
