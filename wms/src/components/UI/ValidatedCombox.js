import React from "react";
import { ValidatorComponent } from "react-material-ui-form-validator";
import ComboBox from "./ComboBox";
class ValidatedCombox extends ValidatorComponent {
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
      <ComboBox
        {...rest}
        error={!isValid}
        helperText={(!isValid && this.getErrorMessage()) || helperText}
      />
    );
  }
}

export default ValidatedCombox;
