export type DocumentType =
  | 'act'
  | 'registration_sheet'
  | 'protocol'
  | 'ballot'
  | 'meeting_message'
  | 'register_of_owners'
  | 'sheet_of_invited_persons'
  | 'sheet_of_the_persons_present'
  | 'voting_results_notice'
  | 'voting_results'
  | 'act_after_voting'

export interface DocumentMeta {
  type: DocumentType
  label: string
  description: string
}

export interface VariablesResponse {
  auto: string[]
  manual: string[]
}

export interface AutoPlaceholder {
  key: string
  label: string
  value: string
}

export interface ManualFieldMeta {
  key: string
  label: string
  type: 'text' | 'textarea' | 'list' | 'date' | 'select' | 'json-persons'
  options?: string[]
  placeholder?: string
}
