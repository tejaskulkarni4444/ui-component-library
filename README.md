# React UI components library
This library contains UI components to be used in forms with various inputs.
## Documentation links

 - [Material UI](https://mui.com/material-ui/)

## Installation and usage.

To install and use the components in the library run below commands:

```bash
npm i react-component-library-sutradhar
```
    
## Usage/Examples

```javascript
import { Textfield } from 'react-components-library-sutradhar'
/* Props Example: 
  border: "standard" | "outlined" | "filled";
  width: '100px' '50%';
  fontSize: '14px';
  fontColor: '#000000'
  errorState: {
    isError: true | false,
    errorMessage: 'Enter error message here'
  }
  handleReturnValue: callbackfunction
*/
function App() {
  return <TextField
          label={label}
          placeholder='Enter date'
          border={border}
          width='200px'
          fontSize={fontSize}
          fontColor={fontColor}
          handleReturnValue={handleValue}
          error={errorState}
        />
}
```
```javascript
import { TextInputWithSearch } from 'react-components-library-sutradhar'
/* Props Example: 
  border: "standard" | "outlined" | "filled";
  width: '100px' '50%';
  fontSize: '14px';
  fontColor: '#000000'
  listData: [
    {
      id: 1,
      firstName: Jon,
      lastName: Doe
    },
    {
      id: 1,
      firstName: Jon,
      lastName: Doe
    },
    ....
  ]
  // searchBy will be the same value you will enter in textfield as input
  searchBy: firstName
  handleReturnValue: callbackfunction
*/

function App() {
  return <TextInputWithSearch
          fontFamily='Arial'
          label='Test Label'
          fontSize='14px'
          fontColor='#000000'
          listData={testData}
          placeholder='Enter text'
          searchBy='firstName'
          width='200px'
          handleReturnValue={handleSelectedValues}
        />
}
```

```javascript
import { NumberInput } from 'react-components-library-sutradhar'

/* Props Example: 
  border: "standard" | "outlined" | "filled";
  width: '100px' '50%';
  fontSize: '14px';
  fontColor: '#000000'
  type: 'integer' | 'decimal' | 'decimalMasking' | 'amount'
  handleReturnValue: callbackfunction
*/

function App() {
  return <NumberInput
          type= 'decimalMasking'
          label='Test label'
          border='outlined'
          fontSize='14px'
          font='Arial'
          width='200px'
          placeholder='Enter text'
          handleReturnValue={handleReturnedValue}
        />
}
```