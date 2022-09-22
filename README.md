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
/* errorState Example:
  {
        isError: false,
        errorMessage: ''
    }
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

function App() {
  return <TextInputWithSearch
          fontFamily='Arial'
          label='Test Label'
          fontSize='14px'
          fontColor='#000000'
          listData={testData}
          placeholder='Enter text'
          searchBy='first<Name'
          width='200px'
          handleReturnValue={handleSelectedValues}
        />
}
```

```javascript
import { NumberInput } from 'react-components-library-sutradhar'

function App() {
  return <NumberInput
            type={'integer' | 'decimal' | 'decimalMasking' | 'amount'}
            label='Test label'
            fontSize='14px'
            font='Arial'
            width='200px'
            placeholder='Enter text'
            handleReturnValue={handleReturnedValue}
        />
}
```
