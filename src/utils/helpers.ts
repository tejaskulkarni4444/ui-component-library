//
// Returns integer with comma according to indian rupee system
// eg. 1,20,000 || 1,200
//
export function handleIntergerMasking (value: string) {
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
};

//
// Regex for date validation of format dd/mm/yyyy || dd-mm-yyyy || dd.mm.yyyy
//
const validDateRegEx: RegExp = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/gm


export function handleDateValidation (inputValue: string) {

  // Trim input value to remove empty spaces if any
  let trimmedValue = inputValue.replace(/\s/g, "");
  console.log('trimmed val', trimmedValue.length)
  //
  // return false for invalid inputs
  //
  if(!trimmedValue || trimmedValue === '' || (trimmedValue.length < 6 || trimmedValue.length > 8)) {
    return false;
  }

  //
  // if input does not contain spearators like / or - or .
  //
  if(trimmedValue.length === 6 || trimmedValue.length === 8){
    //
    // Add / between date after dd and mm
    //
    [2, 5].map((currentPos: number) => {
      trimmedValue = [trimmedValue.slice(0, currentPos), '/', trimmedValue.slice(currentPos)].join('');
    })
  }

  // TODO: check if below needs to be handled
  // if(trimmedValue.includes('/')){

  // } else if(trimmedValue.includes('-')){

  // }
}