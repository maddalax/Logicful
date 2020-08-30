export interface DropdownButtonAction {
    label : string,
    onClick : () => any
}

export interface ButtonAction {
    label : string,
    type : string,
    onClick? : (() => Promise<any>) | (() => any)
  }

export enum DynamicFormMode {
    Preview,
    Live
}