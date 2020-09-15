import type { LabelValue } from './IField'

export interface Group {
  value: string
  label: string
  logic?: {
    action: string
    rules: {
      field: string
      condition: string
      value: any
    }[]
  }
}
