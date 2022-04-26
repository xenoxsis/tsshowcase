import React, { ChangeEvent, useState } from "react";

interface HeaderData<K> {
  property: K;
  title: string;
}

interface PropsWithAdd<T, K extends keyof T> {
  data: T[];
  headers: HeaderData<K>[];
  canAdd: true;
  onAdd: (item: Record<K, string>) => void;
}

interface PropsWithoutAdd<T, K extends keyof T> {
  data: T[];
  headers: HeaderData<K>[];
  canAdd: false;
  onAdd?: never;
}

const Table = <T, K extends keyof T>({
  data,
  headers,
  canAdd,
  onAdd,
}: PropsWithAdd<T, K> | PropsWithoutAdd<T, K>) => {
  const initialDataValues = headers.reduce((curr, next) => {
    return {
      ...curr,
      [next.property]: "",
    };
  }, {} as Record<K, string>);
  const [newData, setNewData] = useState<Record<K, string>>(initialDataValues);

  const renderAddRow = () => (
    <tr>
      {headers.map((header, i) => (
        <td key={i}>
          <input
            placeholder={header.title}
            name={header.property.toString()}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setNewData({
                ...newData,
                [header.property.toString()]: event.currentTarget.value,
              })
            }
            value={newData[header.property] ?? ""}
          />
        </td>
      ))}
      <td>
        <button
          onClick={() => {
            setNewData(initialDataValues);
            onAdd?.(newData);
          }}
        >
          Gem
        </button>
      </td>
    </tr>
  );

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, i) => {
            return <th key={i}>{header.title}</th>;
          })}
          {canAdd && <th></th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => {
          return (
            <tr key={i}>
              {headers.map((header, j) => (
                <td key={j}>{item[header.property]}</td>
              ))}
              {canAdd && <td></td>}
            </tr>
          );
        })}
        {canAdd && renderAddRow()}
      </tbody>
    </table>
  );
};

export default Table;
