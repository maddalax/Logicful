import type { LabelValue } from "./IField";

export interface OptionSet {
    name : string,
    type : 'local' | 'remote',
    value : string | LabelValue[],
    localSaveId? : string,
    remoteUrl? : string,
    [key : string] : any
}