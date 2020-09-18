import type { Group } from './Group'
import type { IField } from './IField'

export type IForm = {
  fields: IField[]
  title?: string
  description?: string
  enableLogic?: boolean
  id?: string
  changeTime?: string
  changeBy?: string
  groups?: Group[]
  disableSubmissions?: boolean
  maxSubmissions?: number
  openDateTime?: string
  closeDateTime?: string
  emailOnSubmission?: boolean
  loaded? : boolean
  url?: string
  initialized? : boolean
}

export type ISubmission = {
  id : string
  formId : string,
  details : {[key : string] : any},
  meta : {
    env : any,
    ipAddress : string
  }
  [key : string] : any
}