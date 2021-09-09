export const componentTypes = [
  "FormInput",
  "FormDropDownList",
  "FormNumericTextBox",
  "FormTextArea",
  "FormDatePicker",
  "FormTimePicker",
  "FormAutoComplete",
  "FormMultiSelect",
  "FormCheckbox",
  "FormRadioGroup",
  "FormMaskedTextBox",
  "FormComboBox",
  "FormDateTimePicker",
  "FormDateInput",
  "FormDateRangePicker",
  "FormUpload",
  "FormColorPicker",
  "FormSlider",
];
export const componentProperties = [
  {
    FormInput: {
    },
  },
  {
    FormDropDownList: {
      data: "",
      textField: "",
      dataItemKey: "",
    },
  },
  {
    FormNumericTextBox: {
      format: "n2",
    },
  },
  {
    FormDatePicker: {
      format: "dd/MMM/yyyy",
    },
  },
  {
    FormMultiSelect: {
      data: "",
      textField: "",
      dataItemKey: "",
    },
  },
  {
    FormAutoComplete: {
      data: "",
      textField: "",
      dataItemKey: "",
    },
  },
  {
    FormRadioGroup: {
      data: "",
      layout: "horizontal",
    },
  },
  {
    FormTimePicker: {
      format: "HH:mm",
    },
  },
  {
    FormDateRangePicker: {
      format: "dd/MMM/yyyy",
    },
  },
  {
    FormSwitch: {
      checked: false,
    },
  },
];

export function getComponentTypes() {
  return componentTypes;
}

export function getComponentProperties() {
  return componentProperties;
}

export default componentTypes;
