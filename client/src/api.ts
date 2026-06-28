import type { DocumentType, VariablesResponse } from './types'

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? ''

export interface Company {
  id: string
  name: string
}

export interface Employee {
  id: string
  email: string
  fullName: string
  companyId?: string
  company?: Company
}

export interface Building {
  id: string
  address: string
  cadastralNumber?: string
  yearBuilt?: number
  floors?: number
  entrances?: number
  totalArea?: number
  totalPremises?: number
  createdAt?: string
  updatedAt?: string
}

export interface OwnerWithPremises {
  id: string
  fullName: string
  premises: { id: string; number: string }[]
}

export interface Meeting {
  id: string
  buildingId?: string
  number?: string
  form?: string
  status?: string
  startDate?: string
  endDate?: string
  inPersonStartTime?: string
  inPersonAddress?: string
  ballotAcceptanceAddress?: string
  noticeAddress?: string
  resultsDate?: string
  initiatorEmployeeId?: string
  initiatorOwners?: { id: string; fullName: string; premises?: string[] }[]
  extensionReason?: string
  createdAt?: string
  updatedAt?: string
  activatedAt?: string
  completedAt?: string
  archivedAt?: string
}

export interface AgendaItem {
  id: string
  meetingId?: string
  questionId?: string
  orderNumber?: number
  customProtocolText?: string
  customBulletinText?: string
  question?: {
    id: string
    shortTitle?: string
    protocolText?: string
    bulletinText?: string
    quorumType?: string
    category?: string
  }
}

export interface QuestionPool {
  id: string
  name?: string
  type?: string
  items?: { id: string; question?: { id: string; shortTitle?: string } }[]
}

async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...options,
  })
  if (!res.ok) {
    const text = await res.text()
    let message = `Ошибка ${res.status}`
    try {
      const json = JSON.parse(text)
      message = json.message || message
    } catch { message = text || message }
    throw new Error(message)
  }
  const ct = res.headers.get('content-type') ?? ''
  if (ct.includes('application/json')) return res.json()
  return null
}

export async function getMe(): Promise<Employee | null> {
  try {
    const res = await fetch(`${API_BASE}/auth/me`, { credentials: 'include' })
    if (res.status === 401) return null
    if (!res.ok) return null
    const ct = res.headers.get('content-type') ?? ''
    if (!ct.includes('application/json')) return null
    return res.json()
  } catch { return null }
}

export async function login(email: string, password: string): Promise<Employee> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    const text = await res.text()
    let message = `Ошибка ${res.status}`
    try { const json = JSON.parse(text); message = json.message || message } catch { message = text || message }
    throw new Error(message)
  }
  const data = await res.json()
  return data.employee
}

export async function logout(): Promise<void> {
  await fetch(`${API_BASE}/auth/logout`, { method: 'POST', credentials: 'include' })
}

export interface Premise {
  id: string
  buildingId: string
  number: string
  cadastralNumber?: string
  area: number
  ownershipForm: string
  premiseType: string
  floor?: number
  createdAt: string
  updatedAt: string
}
export async function getPremises(buildingId: string): Promise<Premise[]> {
  try {
    const data = await apiFetch(`/premises?buildingId=${buildingId}`)
    return Array.isArray(data) ? data : (data?.data ?? [])
  } catch { return [] }
}
export async function deletePremise(id: string): Promise<void> {
  await apiFetch(`/premises/${id}`, { method: 'DELETE' })
}

export async function getBuildings(): Promise<Building[]> {
  const data = await apiFetch('/buildings')
  return Array.isArray(data) ? data : (data?.data ?? [])
}

export async function createBuilding(dto: {
  address: string
  cadastralNumber: string
  yearBuilt?: number
  floors?: number
  entrances?: number
  totalArea: number
  totalPremises: number
}): Promise<Building> {
  return apiFetch('/buildings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  })
}

export async function getBuilding(id: string): Promise<Building> {
  return apiFetch(`/buildings/${id}`)
}

export async function getOwnersByBuilding(buildingId: string): Promise<OwnerWithPremises[]> {
  const data = await apiFetch(`/owners/by-building/${buildingId}`)
  return Array.isArray(data) ? data : []
}

export async function getMeetings(buildingId?: string): Promise<Meeting[]> {
  const query = buildingId ? `?buildingId=${buildingId}` : ''
  const data = await apiFetch(`/meetings${query}`)
  return Array.isArray(data) ? data : (data?.data ?? [])
}

export async function getMeeting(id: string): Promise<Meeting> {
  return apiFetch(`/meetings/${id}`)
}

export async function createMeeting(data: Partial<Meeting> & { ownerInitiatorIds?: string[] }): Promise<Meeting> {
  return apiFetch('/meetings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export async function updateMeeting(id: string, data: Partial<Meeting>): Promise<Meeting> {
  return apiFetch(`/meetings/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export async function deleteMeeting(id: string): Promise<void> {
  await apiFetch(`/meetings/${id}`, { method: 'DELETE' })
}

export async function transitionMeeting(id: string, status: string): Promise<Meeting> {
  return apiFetch(`/meetings/${id}/transition/${status}`, { method: 'POST' })
}

export async function addOwnerInitiator(meetingId: string, ownerId: string): Promise<Meeting> {
  return apiFetch(`/meetings/${meetingId}/owner-initiators/${ownerId}`, { method: 'POST' })
}

export async function removeOwnerInitiator(meetingId: string, ownerId: string): Promise<Meeting> {
  return apiFetch(`/meetings/${meetingId}/owner-initiators/${ownerId}`, { method: 'DELETE' })
}

export async function getAgendaItems(meetingId: string): Promise<AgendaItem[]> {
  try {
    const data = await apiFetch(`/agenda-items?meetingId=${meetingId}`)
    return Array.isArray(data) ? data : (data?.data ?? [])
  } catch { return [] }
}

export async function createAgendaItem(dto: {
  meetingId: string
  questionId?: string
  orderNumber: number
  customProtocolText?: string
  customBulletinText?: string
}): Promise<AgendaItem> {
  return apiFetch('/agenda-items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  })
}

export async function updateAgendaItem(id: string, dto: {
  orderNumber?: number
  customProtocolText?: string
  customBulletinText?: string
}): Promise<AgendaItem> {
  return apiFetch(`/agenda-items/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  })
}

export async function deleteAgendaItem(id: string): Promise<void> {
  await apiFetch(`/agenda-items/${id}`, { method: 'DELETE' })
}

export interface QuestionLibraryItem {
  id: string
  companyId?: string
  shortTitle: string
  protocolText?: string
  bulletinText?: string
  quorumType?: string
  category?: string
  tags?: string
  createdAt?: string
}

export async function createQuestionLibraryItem(dto: {
  shortTitle: string
  protocolText?: string
  bulletinText?: string
  quorumType?: string
  category?: string
  companyId?: string
  createdByEmployeeId?: string
}): Promise<QuestionLibraryItem> {
  return apiFetch('/question-library', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  })
}

export async function updateQuestionLibraryItem(id: string, dto: {
  shortTitle?: string
  protocolText?: string
  bulletinText?: string
  quorumType?: string
}): Promise<QuestionLibraryItem> {
  return apiFetch(`/question-library/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  })
}

export async function getQuestionPools(): Promise<QuestionPool[]> {
  try {
    const data = await apiFetch('/question-pools')
    return Array.isArray(data) ? data : (data?.data ?? [])
  } catch { return [] }
}

export async function createQuestionPool(dto: {
  name: string
  type: string
  questionIds: string[]
}): Promise<QuestionPool> {
  return apiFetch('/question-pools', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  })
}

export async function addPoolToMeeting(meetingId: string, poolId: string): Promise<AgendaItem[]> {
  try {
    const data = await apiFetch(`/meetings/${meetingId}/agenda-items/from-pool/${poolId}`, { method: 'POST' })
    return Array.isArray(data) ? data : (data?.items ?? [])
  } catch { return [] }
}

export async function getVariables(type: DocumentType): Promise<VariablesResponse> {
  const res = await fetch(`${API_BASE}/documents/variables/${type}`, { credentials: 'include' })
  if (!res.ok) throw new Error(`Ошибка ${res.status}: ${res.statusText}`)
  return res.json()
}

export interface RegistryRow {
  premiseId: string
  premiseNumber: string
  premiseType: string
  ownerId: string
  ownerName: string
  shareArea: number
  sharePercent: number
  decisionNumber: number
  status: 'filled' | 'empty'
}

export interface DecisionRegistry {
  totalArea: number
  totalVotedArea: number
  rows: RegistryRow[]
}

export async function getDecisionRegistry(meetingId: string): Promise<DecisionRegistry> {
  return apiFetch(`/meetings/${meetingId}/registry`)
}

export interface QuestionAnswerRecord {
  ownerId: string
  agendaItemId: string
  vote: string
  weight?: number
}

export async function getOwnerAnswers(ownerId: string): Promise<QuestionAnswerRecord[]> {
  try {
    const data = await apiFetch(`/question-answers?ownerId=${ownerId}`)
    return Array.isArray(data) ? data : []
  } catch { return [] }
}

export async function upsertQuestionAnswer(dto: { ownerId: string; agendaItemId: string; vote: string }): Promise<QuestionAnswerRecord> {
  return apiFetch('/question-answers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  })
}

export async function uploadBallotsZip(meetingId: string, file: File): Promise<{ filename: string; size: number; jobId: string }> {
  const form = new FormData()
  form.append('file', file)
  const res = await fetch(`${API_BASE}/meetings/${meetingId}/ballots-zip`, {
    method: 'POST',
    credentials: 'include',
    body: form,
  })
  if (!res.ok) {
    const text = await res.text()
    let message = `Ошибка ${res.status}`
    try { const json = JSON.parse(text); message = json.message || message } catch { message = text || message }
    throw new Error(message)
  }
  return res.json()
}

export interface ScanVote {
  questionNumber: number
  vote: string
  confidence?: number
}

export interface ConflictMark {
  vote: string
  darkRatio: number
}

export interface ConflictVote {
  questionNumber: number
  marks: ConflictMark[]
}

export interface ScanResult {
  filename: string
  ownerId?: string
  ownerName?: string
  meetingId?: string
  votes: ScanVote[]
  conflicts: ConflictVote[]
  saved: boolean
  error?: string
}

export interface ScanJob {
  jobId: string
  meetingId: string
  status: 'processing' | 'completed' | 'failed'
  total: number
  processed: number
  results: ScanResult[]
  errors: string[]
  createdAt: string
}

export async function getScanStatus(meetingId: string, jobId: string): Promise<ScanJob> {
  const res = await fetch(`${API_BASE}/meetings/${meetingId}/ballots-zip/status/${jobId}`, {
    credentials: 'include',
  })
  if (!res.ok) {
    const text = await res.text()
    let message = `Ошибка ${res.status}`
    try { const json = JSON.parse(text); message = json.message || message } catch { message = text || message }
    throw new Error(message)
  }
  return res.json()
}

export async function correctScanResult(
  meetingId: string,
  jobId: string,
  index: number,
  ownerId: string,
  votes: ScanVote[],
): Promise<ScanJob> {
  const res = await fetch(`${API_BASE}/meetings/${meetingId}/ballots-zip/status/${jobId}/results/${index}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ownerId, votes }),
  })
  if (!res.ok) {
    const text = await res.text()
    let message = `Ошибка ${res.status}`
    try { const json = JSON.parse(text); message = json.message || message } catch { message = text || message }
    throw new Error(message)
  }
  return res.json()
}

export async function generateBallotsZip(meetingId: string): Promise<{ blob: Blob; filename: string }> {
  const res = await fetch(`${API_BASE}/documents/ballots-zip/${meetingId}`, {
    method: 'GET',
    credentials: 'include',
  })
  if (!res.ok) {
    const text = await res.text()
    let message = `Ошибка ${res.status}`
    try { const json = JSON.parse(text); message = json.message || message } catch { message = text || message }
    throw new Error(message)
  }
  const disposition = res.headers.get('Content-Disposition') ?? ''
  const match = disposition.match(/filename\*=UTF-8''(.+)/)
  const filename = match ? decodeURIComponent(match[1]) : `Бюллетени_${meetingId}.zip`
  const blob = await res.blob()
  return { blob, filename }
}

export async function generateDocument(params: {
  type: DocumentType
  meetingId: string
  manualFields: Record<string, string>
  ownerId?: string
}): Promise<{ blob: Blob; filename: string }> {
  const res = await fetch(`${API_BASE}/documents/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      type: params.type,
      meetingId: params.meetingId,
      manualFields: params.manualFields,
      ownerId: params.ownerId || undefined,
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    let message = `Ошибка ${res.status}`
    try { const json = JSON.parse(text); message = json.message || message } catch { message = text || message }
    throw new Error(message)
  }
  const disposition = res.headers.get('Content-Disposition') ?? ''
  const match = disposition.match(/filename\*=UTF-8''(.+)/)
  const filename = match ? decodeURIComponent(match[1]) : `document_${params.type}.docx`
  const blob = await res.blob()
  return { blob, filename }
}
