import React from "react";
import Content from "../../components/Content/Content";
import { Scheduler } from "devextreme-react";
import "devextreme/dist/css/dx.light.css";
import { View } from "devextreme-react/cjs/scheduler";
import data from "./data";

const dayOfWeekNames = ["Pzr", "Pzt", "Sal", "Car", "Per", "Cum", "Cmt"];
type DateCellProps = {
  data: any;
};
const DateCell = ({ data: cellData }: DateCellProps) => (
  <React.Fragment>
    <div className="name">{dayOfWeekNames[cellData.date.getDay()]}</div>
    <div className="number">{cellData.date.getDate()}</div>
  </React.Fragment>
);

const Schedule = () => {
  return (
    <Content
      titleName="Ders Programı"
      header="Ders Programı"
      content={
        <>
          <Scheduler
            dataSource={[]}
            timeZone="Europe/Istanbul"
            views={["day", "workWeek", "month"]}
            defaultCurrentView="workWeek"
            showAllDayPanel={false}
            height={680}
            startDayHour={8}
            endDayHour={16}
            timeCellTemplate={(e) => {
              return new Date(e.date).toLocaleString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              });
            }}
            onAppointmentFormOpening={(e) => {
              e.popup.option("showTitle", true);
              e.popup.option("title", "Ders Ekle");
              e.popup.option("minWidth", 500);
              e.popup.option("showCloseButton", true);
              const form = e.form;
              form.option("items", [
                {
                  dataField: "text",

                  label: {
                    text: "Ders Adı",
                  },
                  editorType: "dxSelectBox",
                  editorOptions: {
                    width: "100%",
                    location: "before",
                    dataSource: {
                      store: data,
                      sort: "text",
                    },
                    displayExpr: "text",
                    valueExpr: "text",
                  },
                },
                {
                  dataField: "startDate",
                  label: {
                    text: "Başlangıç Tarihi",
                  },
                  editorType: "dxDateBox",
                  editorOptions: {
                    width: "100%",
                    type: "datetime",
                    displayFormat: "dd/MM/yyyy HH:mm",
                  },
                },
                {
                  dataField: "endDate",
                  label: {
                    text: "Bitiş Tarihi",
                  },
                  editorType: "dxDateBox",
                  editorOptions: {
                    width: "100%",
                    type: "datetime",
                    displayFormat: "dd/MM/yyyy HH:mm",
                  },
                },
                // change button name
              ]);
            }}
            onAppointmentAdded={(e) => {
              console.log(e);
            }}
            dateCellComponent={DateCell}
          />
          <View type="day" />
          <View type="workWeek" />
          <View type="month" />
        </>
      }
    />
  );
};

export default Schedule;
