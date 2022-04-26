import { useState } from "react";
import { tableData } from "./data";
import { Person } from "./dataTypes";

type UseTableData = [Person[], (item: Partial<Person>) => void];

export const useTableData = (): UseTableData => {
  const [data, setData] = useState(tableData);

  const addData = (item: Partial<Person>) => {
    if (!item.id) item.id = Math.max(...data.map((d) => d.id)) + 1;

    setData([...data, item as Person]);
  };

  return [data, addData];
};
