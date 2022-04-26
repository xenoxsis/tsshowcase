/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Person } from "./dataTypes";
import Table from "./Table";
import "./Table.styles.scss";
import { useTableData } from "./useTableData";

export default function App() {
  const [data, addData] = useTableData();

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Table
        data={data}
        headers={[
          {
            property: "firstName",
            title: "First Name",
          },
          {
            property: "lastName",
            title: "Last Name",
          },
          {
            property: "occupation",
            title: "Occupation",
          },
          {
            property: "age",
            title: "Age",
          },
        ]}
        canAdd={true}
        onAdd={(item) => addData(item)}
      />
    </div>
  );
}
