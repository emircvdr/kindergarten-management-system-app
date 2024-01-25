import React from "react";
import SideBar from "../Sidebar/Sidebar";

const Content = ({
  titleName,
  header,
  content,
}: {
  titleName: string;
  header: string;
  content: JSX.Element;
}) => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <SideBar titleName={titleName} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "calc(100vw - 288px)",
        }}
      >
        <div
          style={{
            padding: "15px 15px 15px 20px",
            textTransform: "capitalize",
            boxShadow: "0 4px 2px -2px rgba(128,128,128,.3)",
            fontSize: "24px",
            justifyContent: "center",
            backgroundColor: "rgb(239, 239, 239, 0.5)",
            fontWeight: 400,
          }}
        >
          {header}
        </div>
        <div
          style={{
            padding: "10px 15px",
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default Content;
