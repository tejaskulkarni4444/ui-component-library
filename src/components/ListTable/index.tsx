import React, { useState } from "react";
//@ts-ignore
import styled from "styled-components";
import { useTable, useSortBy, useRowSelect } from "react-table";
import { BsSortAlphaUpAlt, BsSortAlphaDownAlt } from "react-icons/bs";
import Button from "@mui/material/Button";

const Styles = styled.div`
  padding: 1rem;
  max-height: 350px;
  overflow: auto;
  max-width: 100%;

  table {
    border-spacing: 0;
    margin: auto;
    width: 100%;
    border: 1px solid lightgrey;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
      :nth-child(even) {
        background-color: #efefef !important;
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid lightgrey;

      :last-child {
        border-right: 0;
      }
    }
    thead {
      background-color: #efefef !important;
      border-bottom: 1px solid lightgrey;
      font-weight: 600;
      text-transform: uppercase;
    }
  }
`;

///////////////////////////////
//         Types            //
//////////////////////////////

export interface IReturnValueCallback {
  (list: any): void;
}
export interface ICloseCallback {
  (): void;
}

interface SearchableTableProps {
  tableData: Array<{}>,
  returnSelectedOptions: IReturnValueCallback;
  multipleSelection: boolean;
  handleClose: ICloseCallback;
}

export default function ListTable({
  returnSelectedOptions,
  tableData
}: SearchableTableProps) {
  ////////////////////////////
  //         states         //
  ////////////////////////////

  // const data = React.useMemo(
  //   () => [
  //     {
  //       id: "1",
  //       name: "Retired",
  //       city: "London",
  //     },
  //     {
  //       id: "2",
  //       name: "Doctor",
  //       city: "Madrid",
  //     },
  //     {
  //       id: "3",
  //       name: "Architect",
  //       city: "Paris",
  //     },
  //     {
  //       id: "4",
  //       name: "Engineer",
  //       city: "Alabama",
  //     },
  //     {
  //       id: "5",
  //       name: "Business",
  //       city: "Nashik",
  //     },
  //     {
  //       id: "6",
  //       name: "Student",
  //       city: "NY",
  //     },
  //     {
  //       id: "7",
  //       name: "Service",
  //       city: "Alabama",
  //     },
  //     {
  //       id: "8",
  //       name: "Teacher",
  //       city: "Alabama",
  //     },
  //     {
  //       id: "9",
  //       name: "Teller",
  //       city: "Mumbai",
  //     },
  //   ],
  //   []
  // );

  const data = React.useMemo(() => tableData, [])

  const columnsData: any = Object.keys(data[0]).reduce(
    (colArray: Array<{}>, key: string) => {
      // if (key && key !== "id")
        colArray.push({ Header: key, accessor: key, width: 100 });
      return colArray;
    },
    []
  );

  const columns: any = React.useMemo(
    () => [
      {
        id: "selection",
        // The header can use the table's getToggleAllRowsSelectedProps method
        // to render a checkbox
        Header: ({ getToggleAllRowsSelectedProps }: any) => (
          <div>
            <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        Cell: ({ row }: any) => (
          <div>
            <input type="checkbox" {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      ...columnsData,
    ],
    []
  );

  const { 
    getTableProps, getTableBodyProps, 
    headerGroups, rows, prepareRow,
    state
  } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy,
      useRowSelect
    );

  //
  // Close modal and return selected options
  //
  const handleCloseMoal = () => {
    // @ts-ignore
    let selectionData = Object.keys(state.selectedRowIds).map((id) => rows.find((row) => row.id === id)?.original)
    returnSelectedOptions(selectionData)
  }
  
  return (
    <>
      <div>
        <Styles>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: any) => (
                    // Add the sorting props to control sorting. For this example
                    // we can add them into the header props
                    <td
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      {/* Sort Direction indicator */}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <BsSortAlphaDownAlt style={{ margin: '0 5px'}} />
                          ) : (
                            <BsSortAlphaUpAlt style={{ margin: '0 5px'}} />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Styles>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "15px",
          }}
        >
          <Button
            onClick={handleCloseMoal}
            variant="contained"
            sx={{
              fontWeight: 600,
            }}
          >
            Done
          </Button>
        </div>
      </div>
    </>
  );
}
