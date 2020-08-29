export interface IField {
    id : string,
    name? : string,
    label? : string,
    hideLabel? :boolean,
    type : string,
    [key : string] : any,
    display? : IFieldCondition,
    updated? : boolean,
    required? : boolean,
    value? : FormValue | undefined | any,
    onChange? : (value : any) => any,
    configTarget? : string,
    selected? : boolean,
    loadTransformer? : (value : any) => any,
    logic? : {
        action : string,
        rules : {
            field : string,
            condition : string,
            value : any
        }[]
    }
}

export type FormValue = {type : 'local' | 'remote', value : any, selector? : string} | string

export interface IFieldCondition {
    target : string,
    condition : string,
    parameter : string
}

export interface LabelValue {
    value : string,
    label : string
}
