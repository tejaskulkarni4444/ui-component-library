//
// Regex for date validation of format dd/mm/yyyy || dd-mm-yyyy || dd.mm.yyyy
//
export const validDateRegEx: RegExp =  /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
const numberRegEx: RegExp = /^\d+\.\d+$|^\d+$/; //regex to check numbers

//
// Returns integer with comma according to indian rupee system
// eg. 1,20,000 || 1,200
//
export function handleIntergerMasking(value: string) {
  //
  // Return 0 is value is 0
  //
  if (parseFloat(value) === 0) {
    return "0";
  }

  //
  // Getting the last 3 digits and remaining digits into variables
  //
  let lastThree = value.substring(value.length - 3);
  let otherNumbers = value.substring(0, value.length - 3);

  //
  // Check if rest of the digits are not empty or null
  //
  if (otherNumbers != "") lastThree = "," + lastThree;

  //
  // Add comma to to first (value.length - 3) digits after every 2 digits then
  // Join the first remaining numbers with last three numbers with a ','
  //
  const transformedInteger =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  return transformedInteger;
}

//
// Validates if string only contains numbers
//
export function handleValidateInteger(value: string) {
  if (numberRegEx.test(value)) {
    return true;
  } else {
    return false;
  }
}

//
// formats the value to limit the last decimals 
//
export const handleFormatIntegers = (value: string, isAmount = false) => {
  //
  // Separate numbers before and after decimal
  //
  let numbersBeforeDecimal = value.split(".")[0];
  let numbersAfterDecimal = value.split(".")[1];
  // @ts-ignore
  let formattedInput = handleIntergerMasking(
    numbersBeforeDecimal.replaceAll(",", "")
  );
  if (numbersAfterDecimal !== undefined) {
    return `${formattedInput}.${numbersAfterDecimal.slice(0, 2)}`;
  } else {
    if(isAmount) return `${formattedInput}.00`
    return formattedInput;
  }
};
