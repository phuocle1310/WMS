import React from "react";

import { ValidatorComponent } from "react-material-ui-form-validator";
import { KeyboardDatePicker } from "@material-ui/pickers";
class ValidatedDatePicker extends ValidatorComponent {
  renderValidatorComponent() {
    const {
      errorMessages,
      validators,
      requiredError,
      helperText,
      validatorListener,
      ...rest
    } = this.props;
    const { isValid } = this.state;
    return (
      <KeyboardDatePicker
        {...rest}
        error={!isValid}
        helperText={(!isValid && this.getErrorMessage()) || helperText}
      />
    );
  }
}

export default ValidatedDatePicker;
