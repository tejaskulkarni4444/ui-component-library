import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { Button, Container } from '@mui/material';

// const columns: GridColDef[] = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'firstName', headerName: 'First name', width: 130 },
//   { field: 'lastName', headerName: 'Last name', width: 130 },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 90,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params: GridValueGetterParams) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
// ];

const data = [
  {
    "id": "1",
    "name": "Retired",
    "city": "London"
  },
  {
    "id": "2",
    "name": "Doctor",
    "city": "Madrid"
  },
  {
    "id": "3",
    "name": "Architect",
    "city": "Paris"
  },
  {
    "id": "4",
    "name": "Engineer",
    "city": "Alabama"
  },
  {
    "id": "5",
    "name": "Business",
    "city": "Nashik"
  },
  {
    "id": "6",
    "name": "Student",
    "city": "NY"
  },
  {
    "id": "7",
    "name": "Service",
    "city": "Alabama"
  },
  {
    "id": "8",
    "name": "Teacher",
    "city": "Alabama"
  },
  {
    "id": "9",
    "name": "Teller",
    "city": "Mumbai"
  }
];

///////////////////////////////
//         Types            //
//////////////////////////////

interface CallbackType {
  (list: any): void;
}

interface ICloseCallback {
  (): void;
}

interface SearchableTableProps {
  tableData: Array<{}>,
  returnSelectedOptions: CallbackType;
  multipleSelection: boolean;
  handleClose: ICloseCallback;
}

export default function SearchableTable({
  tableData = data,
  returnSelectedOptions,
  multipleSelection = true,
  handleClose
}: SearchableTableProps) {
  const [ selectionList, setSelectionList] = useState <any[]>([])

  //
  // Filter out column named id
  //
  var keyCollection: any = Object.keys(tableData[0]).reduce((colArray: Array<{}>, key: string) => {
    if (key && key !== 'id') colArray.push({ 'field': key, 'headerName': key, 'width': 100 });
    return colArray;
  }, []);

  const columns: GridColDef[] = [...keyCollection];

  const rows = [...data];

  //
  // update state with newly selected options
  //
  const onRowsSelectionHandler = (ids: Array<{}>) => {
    const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
    setSelectionList(selectedRowsData)
  };

  //
  // Close modal and return selected options
  //
  const handleCloseMoal = () => {
    returnSelectedOptions(selectionList)
  }

  return (
    <Container style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
      />
      <Box display="flex" justifyContent="flex-end" marginTop={"15px"}>
        <Button
          onClick={handleCloseMoal}
          variant="contained"
          sx={{
            fontWeight: 600
          }}
        >
          Done;
        </Button>
      </Box>
    </Container>
  );
}
