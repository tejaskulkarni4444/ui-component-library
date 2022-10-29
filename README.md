# React UI components library
This library contains UI components to be used in forms with various inputs.
## Documentation links

 - [Material UI](https://mui.com/material-ui/)

## Installation and usage.

To install and use the components in the library run below commands:

```bash
npm i react-component-library-sutradhar
```
#### Note: In case of missing dependecy error, run below command: 
```bash
npm i @mui/material react react-dom react-table styled-components react-icons @emotion/styled
```
## Usage/Examples

### TextField
TextField accepts regular string input.

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
### TextInput with Search Modal
TextInputWithSearch accepts string input. On presssing enter the provided value to the input can be submitted.
If the provided values matches the provided data options the matched value will be set.

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
### NumberInput
NumberInput accepts integers as input. \
4 types of integer inputs:\
&nbsp;&nbsp;&nbsp; 1. integer: accepts numbers. \
&nbsp;&nbsp;&nbsp; 2. decimal: accepts float values and with 2 digits after the decimal. \
&nbsp;&nbsp;&nbsp; 3. amount: accepts integers and masks the value with commas. Eg. 10,200 \
&nbsp;&nbsp;&nbsp; 4. decimalMasking: Masks decimal values with commas. 


```javascript
import { NumberInput } from 'react-components-library-sutradhar'

/* Props Example: 
  border: "standard" | "outlined" | "filled";
  width: '100px' '50%';
  fontSize: '14px';
  fontColor: '#000000'
  type: 'integer' | 'decimal' | 'decimalMasking' | 'amount'
  handleReturnValue: callbackfunction,
  // To provide range input i.e. To & From values 
  isRangeInput: true | false
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
          isRangeInput={false}
        />
}
```
### DateInput
Accepts integer values as dates. If the input format is correct then input value is accpeted as enter is pressed. \
Supportted formats: ddmmyy, ddmmyyyy  \
Eg. 010211 (ddmmyy) = 01/02/2011 \
01042022 (ddmmyyyyy) = 01/04/2022

```javascript
import { DateInput } from 'react-components-library-sutradhar'

/* Props Example: 
  border: "standard" | "outlined" | "filled";
  width: '100px' '50%';
  fontSize: '14px';
  fontColor: '#000000'
  type: 'integer' | 'decimal' | 'decimalMasking' | 'amount'
  handleReturnValue: callbackfunction,
  // To provide range input i.e. To & From values 
  isRangeInput: true | false
*/

function App() {
  return <DateInput
          type= 'decimalMasking'
          label='Test label'
          border='outlined'
          fontSize='14px'
          font='Arial'
          width='200px'
          placeholder='Enter text'
          handleReturnValue={handleReturnedValue}
          isRangeInput={false}
        />
}
```