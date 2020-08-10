export interface DialogOptions {
    child : any,
    confirmCloseOnDirty : boolean
}

export interface DropdownButtonAction {
    label : string,
    onClick : () => any
}

export enum DynamicFormMode {
    Preview,
    Live
}