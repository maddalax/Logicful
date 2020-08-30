import type { IForm } from "./IForm";

export interface Folder {
    name : string,
    id: string,
    forms : IForm[]
}