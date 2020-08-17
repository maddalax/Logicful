export interface DialogOptions {
    child : any,
    confirmCloseOnDirty : boolean,
    props? : any
    title : string,
    save? : boolean
}

export interface DropdownButtonAction {
    label : string,
    onClick : () => any
}

export enum DynamicFormMode {
    Preview,
    Live
}