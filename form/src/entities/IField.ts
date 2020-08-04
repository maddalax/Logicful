export interface IField {
    name : string,
    type : string,
    [key : string] : any,
    display? : IFieldCondition,
    updated? : boolean
}

export interface IFieldCondition {
    target : string,
    condition : string,
    parameter : string
}