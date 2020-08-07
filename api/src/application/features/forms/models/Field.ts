export interface Field {
    name : string,
    label : string,
    type : string,
    [key : string] : any,
    display? : FieldCondition,
    updated? : boolean,
    required? : boolean,
    value? : FormValue
}

export type FormValue = {type : 'local' | 'remote', value : any, selector? : string} | string

export interface FieldCondition {
    target : string,
    condition : string,
    parameter : string
}

export interface LabelValue {
    value : string,
    label : string
}