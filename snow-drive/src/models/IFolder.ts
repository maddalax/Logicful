import type { IForm } from "./IForm";

export interface IFolder {
  name: string;
  id: string;
  forms?: IForm[];
  parent?: string;
  children?: { [key: string]: IFolder };
}
