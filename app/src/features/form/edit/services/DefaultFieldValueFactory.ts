import type { IField } from 'models/IField'

export function setFieldDefaults(field: IField): IField {
  if (field.type === 'checkbox-group') {
    field.value = { 'Option 1': 'Option 1' }
    field.options = ['Option 1', 'Option 2']
  }
  if (field.type === 'radio-group') {
    field.value = { 'Option 1': 'Option 1' }
    field.options = ['Option 1', 'Option 2']
  }
  return field
}
