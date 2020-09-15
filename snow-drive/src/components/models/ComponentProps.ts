export interface DropdownButtonAction {
  label: string
  onClick: () => any
}

export interface ButtonAction {
  label: string
  type: string
  focus?: boolean
  onClick?: (() => Promise<any>) | (() => any)
}

export enum DynamicFormMode {
  Preview,
  Live,
}
