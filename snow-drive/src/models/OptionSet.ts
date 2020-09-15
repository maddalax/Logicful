import type { LabelValue } from './IField'

export interface OptionSet {
  name?: string
  type: 'local' | 'remote'
  value: string | LabelValue[] | undefined
  localSaveId?: string
  remoteUrl?: string | any
  [key: string]: any
  lastModified?: number
}
