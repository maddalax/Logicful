export function setFieldDefaults(field) {
  if (field.type === "checkbox-group") {
    field.value = {"Option 1": "Option 1"};
    field.options = ["Option 1", "Option 2"];
  }
  if (field.type === "radio-group") {
    field.value = {"Option 1": "Option 1"};
    field.options = ["Option 1", "Option 2"];
  }
  return field;
}
