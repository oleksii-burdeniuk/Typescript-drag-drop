// validation
export interface Validateble {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate(userInput: Validateble) {
  let isValid = true;
  if (userInput.required) {
    isValid = isValid && userInput.value.toString().trim().length !== 0;
  }
  if (userInput.minLength && typeof userInput.value == 'string') {
    isValid = isValid && userInput.value.length >= userInput.minLength;
  }
  if (userInput.maxLength && typeof userInput.value == 'string') {
    isValid = isValid && userInput.value.length <= userInput.maxLength;
  }
  if (userInput.min && typeof userInput.value == 'number') {
    isValid = isValid && userInput.value >= userInput.min;
  }
  if (userInput.max && typeof userInput.value == 'number') {
    isValid = isValid && userInput.value <= userInput.max;
  }

  return isValid;
}
