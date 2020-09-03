import type { IForm } from "./IForm";

export interface IFolder {
    name : string,
    id: string,
    forms : IForm[]
}