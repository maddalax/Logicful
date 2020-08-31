export interface DialogOptions {
    child? : any,
    confirmCloseOnDirty? : boolean,
    props? : any
    title? : string,
    save? : boolean,
    onBack? : () => any,
    buttons? : {
        label : string,
        onClick : () => any,
        type : string
    }[]
}

export interface DropdownButtonAction {
    label : string,
    onClick : () => any
}

export enum DynamicFormMode {
    Preview,
    Live
}