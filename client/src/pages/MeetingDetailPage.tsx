import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  getMeeting, getBuilding, getAgendaItems, getQuestionPools, generateDocument, updateMeeting,
  addOwnerInitiator, removeOwnerInitiator, createAgendaItem, deleteAgendaItem,
  createQuestionLibraryItem, updateQuestionLibraryItem, createQuestionPool, addPoolToMeeting,
  getDecisionRegistry, uploadBallotsZip, generateBallotsZip, transitionMeeting,
  getOwnerAnswers, upsertQuestionAnswer, getScanStatus, correctScanResult, getOwnersByBuilding,
} from '../api'
import type { Meeting, Building, AgendaItem, QuestionPool, Employee, DecisionRegistry, RegistryRow, ScanJob, OwnerWithPremises } from '../api'
import type { DocumentType } from '../types'
import { Layout } from '../components/Layout'
import { AddInitiatorModal } from '../components/AddInitiatorModal'
import styles from './MeetingDetailPage.module.css'

type Tab = 'info' | 'agenda' | 'registry' | 'documents'

function formatDate(s?: string) {
  if (!s) return '—'
  try { return new Date(s).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }) }
  catch { return s }
}

function formatDateTime(s?: string) {
  if (!s) return '—'
  try {
    const d = new Date(s)
    return `${d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`
  } catch { return s }
}

function toDatetimeLocal(s?: string) {
  if (!s) return ''
  try { return new Date(s).toISOString().slice(0, 16) } catch { return '' }
}

const STATUS_LABELS: Record<string, string> = {
  draft: 'Черновик',
  active: 'Подготовка',
  voting: 'Идёт голосование',
  counting: 'Подсчёт голосов',
  completed: 'Завершено',
  archived: 'Архив',
}

function getStageBadgeClass(status?: string) {
  if (!status) return ''
  if (status === 'voting' || status === 'counting') return styles.voting
  if (status === 'completed' || status === 'archived') return styles.done
  if (status === 'active') return styles.prep
  return ''
}

function IconEdit() {
  return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
}

function IconDelete() {
  return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
}

function IconChevronRight() {
  return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
}

function IconChevronDown() {
  return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
}

function IconDownload() {
  return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
}

function IconGenerate() {
  return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
}

function IconSettings() {
  return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
}

function IconFileDoc({ color }: { color: 'blue' | 'yellow' }) {
  return (
    <svg viewBox="0 0 24 24" fill={color === 'blue' ? '#1976d2' : '#f9a825'}>
      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
    </svg>
  )
}

function IconSave() {
  return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>
}

interface PageProps {
  employee: Employee
  onLogout: () => void
}

const FORM_LABELS: Record<string, string> = {
  'in_person': 'Очная',
  'absentee': 'Заочная',
  'mixed': 'Очно-заочная',
}

type EditState = {
  form: string
  startDate: string
  endDate: string
  inPersonAddress: string
  ballotAcceptanceAddress: string
  noticeAddress: string
  extensionReason: string
}

export function MeetingDetailPage({ employee, onLogout }: PageProps) {
  const { buildingId, meetingId } = useParams<{ buildingId: string; meetingId: string }>()

  const [meeting, setMeeting] = useState<Meeting | null>(null)
  const [building, setBuilding] = useState<Building | null>(null)
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([])
  const [questionPools, setQuestionPools] = useState<QuestionPool[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('info')
  const [expandedPools, setExpandedPools] = useState<Set<string>>(new Set())
  const [generatingDoc, setGeneratingDoc] = useState<string | null>(null)
  const [docError, setDocError] = useState<string | null>(null)
  const [showInitiatorModal, setShowInitiatorModal] = useState(false)

  const [isEditing, setIsEditing] = useState(false)
  const [editState, setEditState] = useState<EditState>({
    form: '', startDate: '', endDate: '',
    inPersonAddress: '', ballotAcceptanceAddress: '',
    noticeAddress: '', extensionReason: '',
  })
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [editingItem, setEditingItem] = useState<AgendaItem | null>(null)
  const [questionForm, setQuestionForm] = useState({ shortTitle: '', bulletinText: '', quorumType: 'simple_majority' })
  const [questionSaving, setQuestionSaving] = useState(false)

  const [showCreatePoolModal, setShowCreatePoolModal] = useState(false)
  const [newPoolName, setNewPoolName] = useState('')
  const [poolSaving, setPoolSaving] = useState(false)

  const [addingPool, setAddingPool] = useState<string | null>(null)
  const [selectedPoolQuestions, setSelectedPoolQuestions] = useState<Record<string, Set<string>>>({})
  const [addingPoolItems, setAddingPoolItems] = useState(false)

  const [registry, setRegistry] = useState<DecisionRegistry | null>(null)
  const [registryLoading, setRegistryLoading] = useState(false)
  const [registrySearch, setRegistrySearch] = useState('')
  const [registryDecisionFilter, setRegistryDecisionFilter] = useState('')
  const [registryStatusFilter, setRegistryStatusFilter] = useState<'' | 'filled' | 'empty'>('')
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [scanJob, setScanJob] = useState<ScanJob | null>(null)
  const [scanPolling, setScanPolling] = useState(false)
  const [editingResultIdx, setEditingResultIdx] = useState<number | null>(null)
  const [editOwnerId, setEditOwnerId] = useState('')
  const [editVotes, setEditVotes] = useState<Record<number, string>>({})
  const [buildingOwners, setBuildingOwners] = useState<OwnerWithPremises[]>([])
  const [ownersLoaded, setOwnersLoaded] = useState(false)
  const [correcting, setCorrecting] = useState(false)
  const [correctionError, setCorrectionError] = useState<string | null>(null)
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())

  const [showStageDropdown, setShowStageDropdown] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  const [generatedDocs, setGeneratedDocs] = useState<Record<string, { blob: Blob; filename: string }>>({})
  const [generatingDocOnly, setGeneratingDocOnly] = useState<string | null>(null)

  const [selectedRegistryRow, setSelectedRegistryRow] = useState<RegistryRow | null>(null)
  const [registryModalTab, setRegistryModalTab] = useState<'info' | 'votes'>('info')
  const [ownerAnswers, setOwnerAnswers] = useState<Record<string, string>>({})
  const [answersLoading, setAnswersLoading] = useState(false)
  const [answersSaving, setAnswersSaving] = useState(false)
  const [answersSaveError, setAnswersSaveError] = useState<string | null>(null)

  useEffect(() => {
    if (!meetingId || !buildingId) return
    setLoading(true)
    Promise.all([getMeeting(meetingId), getBuilding(buildingId)])
      .then(([m, b]) => { setMeeting(m); setBuilding(b) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [meetingId, buildingId])

  useEffect(() => {
    if (activeTab === 'agenda' && meetingId) {
      getAgendaItems(meetingId).then(setAgendaItems).catch(console.error)
      getQuestionPools().then(setQuestionPools).catch(console.error)
    }
    if (activeTab === 'registry' && meetingId) {
      setRegistryLoading(true)
      getDecisionRegistry(meetingId)
        .then(setRegistry)
        .catch(console.error)
        .finally(() => setRegistryLoading(false))
      getAgendaItems(meetingId).then(setAgendaItems).catch(console.error)
    }
  }, [activeTab, meetingId])

  useEffect(() => {
    if (!scanPolling || !scanJob || !meetingId) return
    if (scanJob.status !== 'processing') { setScanPolling(false); return }
    const timer = setTimeout(async () => {
      try {
        const updated = await getScanStatus(meetingId, scanJob.jobId)
        setScanJob(updated)
        if (updated.status !== 'processing') {
          setScanPolling(false)
          if (updated.status === 'completed' && activeTab === 'registry') {
            setRegistryLoading(true)
            getDecisionRegistry(meetingId)
              .then(setRegistry)
              .catch(console.error)
              .finally(() => setRegistryLoading(false))
          }
        }
      } catch (e) {
        console.error('Polling error:', e)
        setScanPolling(false)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [scanPolling, scanJob, meetingId, activeTab])

  const breadcrumbs = [
    { label: 'Реестр домов', to: '/buildings' },
    { label: building ? building.address : `Дом #${buildingId}`, to: `/buildings/${buildingId}` },
    { label: 'Собрания', to: `/buildings/${buildingId}` },
    { label: meeting ? (meeting.number ? `Собрание №${meeting.number}` : formatDate(meeting.startDate)) : `#${meetingId}` },
  ]

  const togglePool = (id: string) => {
    setExpandedPools((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  const handleGenerate = async (docKey: string, backendType: DocumentType) => {
    if (!meetingId) return
    setGeneratingDoc(docKey)
    setDocError(null)
    try {
      if (backendType === 'ballot') {
        const { blob, filename } = await generateBallotsZip(meetingId)
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        a.click()
        URL.revokeObjectURL(url)
      } else {
        const { blob, filename } = await generateDocument({
          type: backendType,
          meetingId,
          manualFields: {},
        })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        a.click()
        URL.revokeObjectURL(url)
      }
    } catch (e) {
      setDocError(e instanceof Error ? e.message : 'Ошибка генерации')
    } finally {
      setGeneratingDoc(null)
    }
  }

  const startEditing = () => {
    if (!meeting) return
    setEditState({
      form: meeting.form || '',
      startDate: toDatetimeLocal(meeting.startDate),
      endDate: toDatetimeLocal(meeting.endDate),
      inPersonAddress: meeting.inPersonAddress || '',
      ballotAcceptanceAddress: meeting.ballotAcceptanceAddress || '',
      noticeAddress: meeting.noticeAddress || '',
      extensionReason: meeting.extensionReason || '',
    })
    setSaveError(null)
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setIsEditing(false)
    setSaveError(null)
  }

  const handleSave = async () => {
    if (!meeting) return
    setSaving(true)
    setSaveError(null)
    try {
      const updated = await updateMeeting(meeting.id, {
        form: editState.form || undefined,
        startDate: editState.startDate || undefined,
        endDate: editState.endDate || undefined,
        inPersonAddress: editState.inPersonAddress || undefined,
        ballotAcceptanceAddress: editState.ballotAcceptanceAddress || undefined,
        noticeAddress: editState.noticeAddress || undefined,
        extensionReason: editState.extensionReason || undefined,
      })
      setMeeting(updated)
      setIsEditing(false)
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'Ошибка сохранения')
    } finally {
      setSaving(false)
    }
  }

  const reloadAgenda = () => {
    if (meetingId) {
      getAgendaItems(meetingId).then(setAgendaItems).catch(console.error)
      getQuestionPools().then(setQuestionPools).catch(console.error)
    }
  }

  const handleToggleItem = (id: string) => {
    setSelectedItems(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  const handleSelectAll = () => {
    setSelectedItems(new Set(agendaItems.map(i => i.id)))
  }

  const handleDeselectAll = () => {
    setSelectedItems(new Set())
  }

  const openAddQuestion = () => {
    setEditingItem(null)
    setQuestionForm({ shortTitle: '', bulletinText: '', quorumType: 'simple_majority' })
    setShowQuestionModal(true)
  }

  const openEditQuestion = (item: AgendaItem) => {
    setEditingItem(item)
    setQuestionForm({
      shortTitle: item.question?.shortTitle || '',
      bulletinText: item.question?.bulletinText || item.customBulletinText || '',
      quorumType: item.question?.quorumType || 'simple_majority',
    })
    setShowQuestionModal(true)
  }

  const handleSaveQuestion = async () => {
    if (!meetingId) return
    setQuestionSaving(true)
    try {
      if (editingItem) {
        if (editingItem.questionId) {
          await updateQuestionLibraryItem(editingItem.questionId, {
            shortTitle: questionForm.shortTitle,
            bulletinText: questionForm.bulletinText,
            quorumType: questionForm.quorumType,
          })
        }
      } else {
        const q = await createQuestionLibraryItem({
          shortTitle: questionForm.shortTitle,
          bulletinText: questionForm.bulletinText,
          quorumType: questionForm.quorumType,
          createdByEmployeeId: employee.id,
        })
        await createAgendaItem({
          meetingId,
          questionId: q.id,
          orderNumber: agendaItems.length + 1,
        })
      }
      setShowQuestionModal(false)
      reloadAgenda()
    } catch (e) {
      console.error('Ошибка сохранения вопроса', e)
    } finally {
      setQuestionSaving(false)
    }
  }

  const handleDeleteAgendaItem = async (id: string) => {
    try {
      await deleteAgendaItem(id)
      setSelectedItems(prev => { const n = new Set(prev); n.delete(id); return n })
      reloadAgenda()
    } catch (e) {
      console.error('Ошибка удаления вопроса', e)
    }
  }

  const handleCreatePool = async () => {
    if (!newPoolName.trim()) return
    setPoolSaving(true)
    try {
      const selectedAgendaItems = agendaItems.filter(i => selectedItems.has(i.id))
      const questionIds = selectedAgendaItems
        .map(i => i.questionId)
        .filter((id): id is string => !!id)
      await createQuestionPool({ name: newPoolName.trim(), type: 'GLOBAL', questionIds })
      setShowCreatePoolModal(false)
      setNewPoolName('')
      setSelectedItems(new Set())
      reloadAgenda()
    } catch (e) {
      console.error('Ошибка создания набора', e)
    } finally {
      setPoolSaving(false)
    }
  }

  const handleAddPoolToMeeting = async (poolId: string) => {
    if (!meetingId) return
    setAddingPool(poolId)
    try {
      await addPoolToMeeting(meetingId, poolId)
      reloadAgenda()
    } catch (e) {
      console.error('Ошибка добавления набора', e)
    } finally {
      setAddingPool(null)
    }
  }

  const togglePoolQuestion = (poolId: string, itemId: string) => {
    setSelectedPoolQuestions(prev => {
      const set = new Set(prev[poolId] ?? [])
      if (set.has(itemId)) set.delete(itemId)
      else set.add(itemId)
      return { ...prev, [poolId]: set }
    })
  }

  const handleAddSelectedPoolQuestions = async (pool: QuestionPool) => {
    if (!meetingId) return
    const selected = selectedPoolQuestions[pool.id]
    if (!selected || selected.size === 0) return
    setAddingPoolItems(true)
    try {
      const items = (pool.items ?? []).filter(item => selected.has(item.id))
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.question?.id) {
          await createAgendaItem({
            meetingId,
            questionId: item.question.id,
            orderNumber: agendaItems.length + i + 1,
          })
        }
      }
      setSelectedPoolQuestions(prev => ({ ...prev, [pool.id]: new Set() }))
      reloadAgenda()
    } catch (e) {
      console.error('Ошибка добавления вопросов из набора', e)
    } finally {
      setAddingPoolItems(false)
    }
  }

  const handleAddInitiator = async (initiator: { type: 'owner' | 'employee'; ownerId?: string; employeeId?: string }) => {
    if (!meeting) return
    try {
      if (initiator.type === 'owner' && initiator.ownerId) {
        const updated = await addOwnerInitiator(meeting.id, initiator.ownerId)
        setMeeting(updated)
      } else if (initiator.type === 'employee' && initiator.employeeId) {
        const updated = await updateMeeting(meeting.id, { initiatorEmployeeId: initiator.employeeId })
        setMeeting(updated)
      }
    } catch (e) {
      console.error('Ошибка добавления инициатора', e)
    }
    setShowInitiatorModal(false)
  }

  const handleRemoveOwnerInitiator = async (ownerId: string) => {
    if (!meeting) return
    try {
      const updated = await removeOwnerInitiator(meeting.id, ownerId)
      setMeeting(updated)
    } catch (e) {
      console.error('Ошибка удаления инициатора', e)
    }
  }

  const handleRemoveEmployeeInitiator = async () => {
    if (!meeting) return
    try {
      const updated = await updateMeeting(meeting.id, { initiatorEmployeeId: undefined })
      setMeeting(updated)
    } catch (e) {
      console.error('Ошибка удаления инициатора', e)
    }
  }

  const handleTransition = async (targetStatus: string) => {
    if (!meeting) return
    setTransitioning(true)
    setShowStageDropdown(false)
    try {
      const updated = await transitionMeeting(meeting.id, targetStatus)
      setMeeting(updated)
    } catch (e) {
      console.error('Ошибка смены стадии', e)
    } finally {
      setTransitioning(false)
    }
  }

  const handleGenerateOnly = async (docKey: string, backendType: DocumentType) => {
    if (!meetingId) return
    setGeneratingDocOnly(docKey)
    setDocError(null)
    try {
      if (backendType === 'ballot') {
        const result = await generateBallotsZip(meetingId)
        setGeneratedDocs(prev => ({ ...prev, [docKey]: result }))
      } else {
        const result = await generateDocument({ type: backendType, meetingId, manualFields: {} })
        setGeneratedDocs(prev => ({ ...prev, [docKey]: result }))
      }
    } catch (e) {
      setDocError(e instanceof Error ? e.message : 'Ошибка генерации')
    } finally {
      setGeneratingDocOnly(null)
    }
  }

  const handleDownloadDoc = async (docKey: string, backendType: DocumentType) => {
    if (!meetingId) return
    let cached = generatedDocs[docKey]
    if (!cached) {
      setGeneratingDoc(docKey)
      setDocError(null)
      try {
        if (backendType === 'ballot') {
          cached = await generateBallotsZip(meetingId)
        } else {
          cached = await generateDocument({ type: backendType, meetingId, manualFields: {} })
        }
        setGeneratedDocs(prev => ({ ...prev, [docKey]: cached }))
      } catch (e) {
        setDocError(e instanceof Error ? e.message : 'Ошибка генерации')
        setGeneratingDoc(null)
        return
      } finally {
        setGeneratingDoc(null)
      }
    }
    const url = URL.createObjectURL(cached.blob)
    const a = document.createElement('a')
    a.href = url
    a.download = cached.filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const VOTE_LABELS: Record<string, string> = { for: 'За', against: 'Против', abstain: 'Воздержался' }
  const VOTE_KEYS: Record<string, string> = { 'За': 'for', 'Против': 'against', 'Воздержался': 'abstain' }

  const handleOpenOwnerModal = async (row: RegistryRow) => {
    setSelectedRegistryRow(row)
    setRegistryModalTab('info')
    setOwnerAnswers({})
    setAnswersSaveError(null)
    setAnswersLoading(true)
    try {
      const answers = await getOwnerAnswers(row.ownerId)
      const map: Record<string, string> = {}
      answers.forEach(a => { map[a.agendaItemId] = VOTE_LABELS[a.vote] ?? a.vote })
      setOwnerAnswers(map)
    } catch (e) {
      console.error('Ошибка загрузки ответов', e)
    } finally {
      setAnswersLoading(false)
    }
  }

  const handleVoteChange = (agendaItemId: string, label: string) => {
    setOwnerAnswers(prev => ({ ...prev, [agendaItemId]: label }))
    setAnswersSaveError(null)
  }

  const handleSaveAllVotes = async () => {
    if (!selectedRegistryRow) return
    setAnswersSaving(true)
    setAnswersSaveError(null)
    try {
      await Promise.all(
        Object.entries(ownerAnswers)
          .filter(([, label]) => label)
          .map(([agendaItemId, label]) =>
            upsertQuestionAnswer({
              ownerId: selectedRegistryRow.ownerId,
              agendaItemId,
              vote: VOTE_KEYS[label] ?? label,
            })
          )
      )
      if (meetingId) {
        setRegistryLoading(true)
        getDecisionRegistry(meetingId)
          .then(setRegistry)
          .catch(console.error)
          .finally(() => setRegistryLoading(false))
      }
      setSelectedRegistryRow(null)
    } catch (e) {
      setAnswersSaveError(e instanceof Error ? e.message : 'Ошибка сохранения')
    } finally {
      setAnswersSaving(false)
    }
  }

  const status = meeting?.status ?? ''
  const isCompleted = status === 'completed' || status === 'archived'
  const isCountingOrLater = status === 'counting' || isCompleted
  const isDraft = status === 'draft'

  const existingOwnerIds = (meeting?.initiatorOwners ?? []).map(o => o.id)
  const hasEmployeeInitiator = !!meeting?.initiatorEmployeeId

  const DOCUMENT_TYPES: {
    key: string
    name: string
    color: 'blue' | 'yellow'
    available: boolean
    note?: string
    backendType?: DocumentType
    hasSettings?: boolean
  }[] = [
    { key: 'notice', name: 'Сообщение о собрании', color: 'blue', available: !isDraft, backendType: 'meeting_message', note: isDraft ? 'Документ будет доступен после активации собрания' : undefined },
    { key: 'notice_act', name: 'Акт о размещении сообщения', color: 'blue', available: !isDraft, backendType: 'act', note: isDraft ? 'Документ будет доступен после активации собрания' : undefined },
    {
      key: 'protocol', name: 'Протокол общего собрания', color: 'blue',
      available: isCompleted,
      note: isCompleted ? undefined : 'Документ будет доступен на стадии «Завершено»',
      backendType: 'protocol',
    },
    {
      key: 'results_notice', name: 'Сообщение об итогах голосования', color: 'blue',
      available: isCompleted,
      note: isCompleted ? undefined : 'Документ будет доступен на стадии «Завершено»',
      backendType: 'voting_results_notice',
    },
    {
      key: 'results_act', name: 'Акт о размещении сообщения об итогах голосования', color: 'blue',
      available: !isDraft,
      backendType: 'act_after_voting',
      note: isDraft ? 'Документ будет доступен после активации собрания' : undefined,
    },
    {
      key: 'vote_results', name: 'Результаты голосования на Общем собрании', color: 'blue',
      available: isCompleted,
      note: isCompleted ? undefined : 'Документ будет доступен на стадии «Завершено»',
      backendType: 'voting_results',
    },
    { key: 'envelope', name: 'Почтовый конверт', color: 'yellow', available: true },
    { key: 'ballot', name: 'Решение собственника', color: 'yellow', available: !isDraft, backendType: 'ballot', hasSettings: true, note: isDraft ? 'Документ будет доступен после активации собрания' : undefined },
    { key: 'delivery_registry', name: 'Реестр вручения сообщений об ОСС', color: 'blue', available: true },
    { key: 'owners_registry', name: 'Реестр собственников МКД (44-пр Минстрой)', color: 'blue', available: !isDraft, backendType: 'register_of_owners', note: isDraft ? 'Документ будет доступен после активации собрания' : undefined },
    {
      key: 'attendees_list', name: 'Список присутствующих лиц на Общем собрании', color: 'blue',
      available: isCompleted,
      backendType: 'sheet_of_the_persons_present',
      note: isCompleted ? undefined : 'Документ будет доступен на стадии «Завершено»',
    },
    { key: 'reg_list', name: 'Лист регистрации присутствующих на очной части', color: 'blue', available: true, backendType: 'registration_sheet' },
    { key: 'invited_list', name: 'Список приглашённых лиц на Общем собрании', color: 'blue', available: !isDraft, backendType: 'sheet_of_invited_persons', note: isDraft ? 'Документ будет доступен после активации собрания' : undefined },
  ]

  if (loading) {
    return (
      <Layout employee={employee} onLogout={onLogout} breadcrumbs={breadcrumbs}>
        <div className={styles.loading}><span className={styles.spinner} /> Загрузка...</div>
      </Layout>
    )
  }

  const stageName = meeting?.status ? (STATUS_LABELS[meeting.status] || meeting.status) : ''

  const STATUS_TRANSITIONS_FRONTEND: Record<string, string[]> = {
    draft:     ['active'],
    active:    ['voting', 'draft'],
    voting:    ['counting', 'active'],
    counting:  ['completed', 'voting'],
    completed: ['archived'],
    archived:  [],
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', border: 'none', borderBottom: '1px solid #1565c0',
    outline: 'none', fontSize: 13, color: '#212121', padding: '6px 0',
    background: 'transparent',
  }
  const selectStyle: React.CSSProperties = {
    ...inputStyle, appearance: 'none' as const, cursor: 'pointer',
  }

  const allowedTransitions = meeting?.status ? (STATUS_TRANSITIONS_FRONTEND[meeting.status] ?? []) : []

  return (
    <Layout employee={employee} onLogout={onLogout} breadcrumbs={breadcrumbs}>
      <div className={styles.page}>
        {stageName && (
          <div className={styles.pageHeader}>
            <span className={`${styles.stageBadge} ${getStageBadgeClass(meeting?.status)}`}>
              СТАДИЯ: {stageName.toUpperCase()}
            </span>
            <div className={styles.stageDropWrap}>
              <button
                className={`${styles.stageDropBtn} ${styles.stageBadge} ${getStageBadgeClass(meeting?.status)}`}
                onClick={() => setShowStageDropdown(v => !v)}
                disabled={transitioning}
                title="Сменить стадию"
              >
                {transitioning ? 'Переход...' : 'СМЕНИТЬ СТАДИЮ'}
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
              </button>
              {showStageDropdown && (
                <div className={styles.stageDropMenu} onClick={() => setShowStageDropdown(false)}>
                  <div className={styles.stageDropMenuHeader}>Перейти в стадию</div>
                  {allowedTransitions.length === 0 ? (
                    <div className={styles.stageDropMenuEmpty}>Нет доступных переходов</div>
                  ) : allowedTransitions.map(s => (
                    <div
                      key={s}
                      className={styles.stageDropMenuItem}
                      onClick={() => handleTransition(s)}
                    >
                      {STATUS_LABELS[s] || s}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className={styles.tabs}>
          {([
            { key: 'info', label: 'ОСНОВНЫЕ СВЕДЕНИЯ' },
            { key: 'agenda', label: 'ВОПРОСЫ ДЛЯ СОБРАНИЯ' },
            { key: 'registry', label: 'РЕЕСТР РЕШЕНИЙ' },
            { key: 'documents', label: 'ДОКУМЕНТЫ' },
          ] as { key: Tab; label: string }[]).map(({ key, label }) => (
            <button
              key={key}
              className={`${styles.tab} ${activeTab === key ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── ОСНОВНЫЕ СВЕДЕНИЯ ── */}
        {activeTab === 'info' && meeting && (
          <div className={styles.tabContent}>
            <div className={styles.leftCol}>
              {/* Edit / Save buttons for draft */}
              {isDraft && (
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  {!isEditing ? (
                    <button
                      onClick={startEditing}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '7px 16px', background: '#1565c0', color: '#fff',
                        border: 'none', borderRadius: 4, fontSize: 12,
                        fontWeight: 700, letterSpacing: '0.06em', cursor: 'pointer',
                        textTransform: 'uppercase',
                      }}
                    >
                      <span style={{ width: 16, height: 16, display: 'flex' }}><IconEdit /></span>
                      Редактировать
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 6,
                          padding: '7px 16px', background: '#4caf50', color: '#fff',
                          border: 'none', borderRadius: 4, fontSize: 12,
                          fontWeight: 700, letterSpacing: '0.06em',
                          cursor: saving ? 'not-allowed' : 'pointer',
                          opacity: saving ? 0.7 : 1, textTransform: 'uppercase',
                        }}
                      >
                        <span style={{ width: 16, height: 16, display: 'flex' }}><IconSave /></span>
                        {saving ? 'Сохранение...' : 'Сохранить'}
                      </button>
                      <button
                        onClick={cancelEditing}
                        disabled={saving}
                        style={{
                          padding: '7px 16px', background: '#fff', color: '#757575',
                          border: '1px solid #e0e0e0', borderRadius: 4, fontSize: 12,
                          fontWeight: 700, letterSpacing: '0.06em', cursor: 'pointer',
                          textTransform: 'uppercase',
                        }}
                      >
                        Отмена
                      </button>
                    </>
                  )}
                </div>
              )}

              {saveError && (
                <div style={{ color: '#e53935', fontSize: 12, marginBottom: 12, padding: '6px 10px', background: '#ffebee', borderRadius: 4 }}>
                  {saveError}
                </div>
              )}

              <div className={styles.formField}>
                <label className={styles.formLabel}>Форма собрания</label>
                {isEditing ? (
                  <div style={{ position: 'relative' }}>
                    <select
                      value={editState.form}
                      onChange={e => setEditState(s => ({ ...s, form: e.target.value }))}
                      style={selectStyle}
                    >
                      <option value="">Выберите форму</option>
                      <option value="in_person">Очная</option>
                      <option value="absentee">Заочная</option>
                      <option value="mixed">Очно-заочная</option>
                    </select>
                    <span style={{ position: 'absolute', right: 0, top: 6, pointerEvents: 'none', color: '#757575', fontSize: 12 }}>▼</span>
                  </div>
                ) : (
                  <div className={styles.formValue}>
                    <span className={styles.formValueText}>{FORM_LABELS[meeting.form || ''] || meeting.form || '—'}</span>
                  </div>
                )}
              </div>

              <div className={styles.formField}>
                <label className={styles.formLabel}>Номер собрания</label>
                <div className={styles.formValue}>
                  <span className={styles.formValueText}>{meeting.number || '—'}</span>
                </div>
              </div>

              <div className={styles.formField}>
                <label className={styles.formLabel}>Дата и время начала</label>
                {isEditing ? (
                  <input
                    type="datetime-local"
                    value={editState.startDate}
                    onChange={e => setEditState(s => ({ ...s, startDate: e.target.value }))}
                    style={inputStyle}
                  />
                ) : (
                  <div className={styles.formValue}>
                    <span className={styles.formValueText}>{formatDateTime(meeting.startDate)}</span>
                  </div>
                )}
              </div>

              <div className={styles.formField}>
                <label className={styles.formLabel}>Дата и время окончания приёма решений</label>
                {isEditing ? (
                  <input
                    type="datetime-local"
                    value={editState.endDate}
                    onChange={e => setEditState(s => ({ ...s, endDate: e.target.value }))}
                    style={inputStyle}
                  />
                ) : (
                  <div className={styles.formValue}>
                    <span className={styles.formValueText}>{formatDateTime(meeting.endDate)}</span>
                  </div>
                )}
              </div>

              <div className={styles.formField}>
                <label className={styles.formLabel}>Адрес дома</label>
                <div className={styles.formValue}>
                  <span className={styles.formValueText}>{building?.address || '—'}</span>
                </div>
              </div>

              <div className={styles.formField}>
                <label className={styles.formLabel}>Адрес проведения очной части</label>
                {isEditing ? (
                  <input
                    value={editState.inPersonAddress}
                    onChange={e => setEditState(s => ({ ...s, inPersonAddress: e.target.value }))}
                    placeholder="Не указан"
                    style={inputStyle}
                  />
                ) : (
                  <div className={styles.formValue}>
                    <span className={styles.formValueText}>{meeting.inPersonAddress || '—'}</span>
                  </div>
                )}
              </div>

              <div className={styles.formField}>
                <label className={styles.formLabel}>Адрес приёма заполненных решений</label>
                {isEditing ? (
                  <input
                    value={editState.ballotAcceptanceAddress}
                    onChange={e => setEditState(s => ({ ...s, ballotAcceptanceAddress: e.target.value }))}
                    placeholder="Не указан"
                    style={inputStyle}
                  />
                ) : (
                  <div className={styles.formValue}>
                    <span className={styles.formValueText}>{meeting.ballotAcceptanceAddress || '—'}</span>
                  </div>
                )}
              </div>

              <div className={styles.formField}>
                <label className={styles.formLabel}>Адрес для ознакомления с документами</label>
                {isEditing ? (
                  <input
                    value={editState.noticeAddress}
                    onChange={e => setEditState(s => ({ ...s, noticeAddress: e.target.value }))}
                    placeholder="Не указан"
                    style={inputStyle}
                  />
                ) : (
                  <div className={styles.formValue}>
                    <span className={styles.formValueText}>{meeting.noticeAddress || '—'}</span>
                  </div>
                )}
              </div>

              <div className={styles.formField}>
                <label className={styles.formLabel}>Основание для переноса</label>
                {isEditing ? (
                  <input
                    value={editState.extensionReason}
                    onChange={e => setEditState(s => ({ ...s, extensionReason: e.target.value }))}
                    placeholder="Не указано"
                    style={inputStyle}
                  />
                ) : (
                  <div className={styles.formValue}>
                    <span className={styles.formValueText}>{meeting.extensionReason || '—'}</span>
                  </div>
                )}
              </div>

              <div className={styles.formField}>
                <label className={styles.formLabel}>Дата создания</label>
                <div className={styles.formValue}>
                  <span className={styles.formValueText}>{formatDateTime(meeting.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className={styles.rightCol}>
              <div className={styles.initiatorsBlock}>
                <div className={styles.initiatorsHeader}>
                  <span className={styles.initiatorsTitle}>Инициаторы</span>
                  {isDraft && (
                    <button className={styles.addBtn} onClick={() => setShowInitiatorModal(true)}>+</button>
                  )}
                </div>
                <table className={styles.initiatorsTable}>
                  <thead>
                    <tr>
                      <th>Тип</th>
                      <th>Наименование</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Employee initiator row */}
                    {meeting.initiatorEmployeeId && (
                      <tr>
                        <td style={{ fontSize: 12, color: '#757575' }}>Сотрудник (УК)</td>
                        <td style={{ fontSize: 13, color: '#212121' }}>
                          {employee.fullName || employee.email}
                        </td>
                        <td>
                          {isDraft && (
                            <button
                              className={styles.deleteBtn}
                              onClick={handleRemoveEmployeeInitiator}
                              title="Удалить"
                            ><IconDelete /></button>
                          )}
                        </td>
                      </tr>
                    )}

                    {/* Owner initiator rows */}
                    {(meeting.initiatorOwners ?? []).map(owner => (
                      <tr key={owner.id}>
                        <td style={{ fontSize: 12, color: '#757575' }}>Собственник</td>
                        <td style={{ fontSize: 13, color: '#212121' }}>
                          {owner.fullName}
                          {owner.premises && owner.premises.length > 0
                            ? `, кв. ${owner.premises.join(', ')}`
                            : ''}
                        </td>
                        <td>
                          {isDraft && (
                            <button
                              className={styles.deleteBtn}
                              onClick={() => handleRemoveOwnerInitiator(owner.id)}
                              title="Удалить"
                            ><IconDelete /></button>
                          )}
                        </td>
                      </tr>
                    ))}

                    {/* Empty state */}
                    {!meeting.initiatorEmployeeId && (!meeting.initiatorOwners || meeting.initiatorOwners.length === 0) && (
                      <tr>
                        <td colSpan={3} style={{ padding: '16px', textAlign: 'center', color: '#9e9e9e', fontSize: 12 }}>
                          Инициаторы не добавлены
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── ВОПРОСЫ ДЛЯ СОБРАНИЯ ── */}
        {activeTab === 'agenda' && (
          <div className={styles.agendaContent}>
            <div className={styles.agendaLeft}>
              <div className={styles.agendaToolbar}>
                <div className={styles.agendaToolbarLeft}>
                  <button className={styles.toolbarBtn} onClick={handleSelectAll}>ВЫБРАТЬ ВСЕ</button>
                  <button className={styles.toolbarBtn} onClick={handleDeselectAll}>ОТМЕНИТЬ ВЫБОР</button>
                  <button
                    className={`${styles.toolbarBtn} ${styles.toolbarBtnBlue}`}
                    disabled={selectedItems.size === 0}
                    onClick={() => { setNewPoolName(''); setShowCreatePoolModal(true) }}
                  >
                    ДОБАВИТЬ В НАБОР
                  </button>
                </div>
                {isDraft && (
                  <button className={styles.agendaAddBtn} title="Добавить вопрос" onClick={openAddQuestion}>+</button>
                )}
              </div>

              {agendaItems.length === 0 ? (
                <div className={styles.empty}>Вопросы не добавлены</div>
              ) : (
                agendaItems.map((item, idx) => {
                  const quorum = item.question?.quorumType
                  const quorumLabel = quorum === 'simple_majority' ? '25%+1'
                    : quorum === 'absolute_majority' ? '50%+1'
                    : quorum === 'qualified_majority' ? '2/3'
                    : quorum || ''
                  const title = item.question?.shortTitle || item.customProtocolText || `Вопрос ${idx + 1}`
                  const desc = item.question?.bulletinText || item.customBulletinText || ''
                  return (
                    <div key={item.id} className={styles.agendaItem}>
                      <input
                        type="checkbox"
                        className={styles.agendaCheckbox}
                        checked={selectedItems.has(item.id)}
                        onChange={() => handleToggleItem(item.id)}
                      />
                      <div className={styles.agendaNum}>{item.orderNumber ?? idx + 1}</div>
                      <div className={styles.agendaItemBody}>
                        <div className={styles.agendaTitle}>{title}</div>
                        {desc && <div className={styles.agendaDesc}>{desc}</div>}
                      </div>
                      <div className={styles.agendaMeta}>
                        {quorumLabel && (
                          <span className={styles.percentBadge}>{quorumLabel}</span>
                        )}
                        {isDraft && (
                          <>
                            <button className={styles.agendaActionBtn} title="Редактировать" onClick={() => openEditQuestion(item)}>
                              <IconEdit />
                            </button>
                            <button
                              className={`${styles.agendaActionBtn} ${styles.delAgenda}`}
                              title="Удалить"
                              onClick={() => handleDeleteAgendaItem(item.id)}
                            >
                              <IconDelete />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <div className={styles.agendaRight}>
              <div className={styles.poolsHeader}>
                <span className={styles.poolsTitle}>Наборы вопросов</span>
              </div>

              {questionPools.length === 0 ? (
                <div className={styles.poolEmpty}>
                  <span style={{ color: '#f9a825', marginRight: 6 }}>!</span>
                  Наборы вопросов не добавлены
                </div>
              ) : (
                questionPools.map((pool) => (
                  <div key={pool.id} className={styles.poolItem}>
                    <div className={styles.poolItemHeader}>
                      <button
                        className={styles.poolChevron}
                        onClick={() => togglePool(pool.id)}
                      >
                        {expandedPools.has(pool.id) ? <IconChevronDown /> : <IconChevronRight />}
                      </button>
                      <span className={styles.poolName} onClick={() => togglePool(pool.id)}>
                        {pool.name || `Набор #${pool.id}`}
                      </span>
                      {isDraft && (
                        <button
                          className={styles.poolAddToMeetingBtn}
                          title="Добавить вопросы в собрание"
                          onClick={() => handleAddPoolToMeeting(pool.id)}
                          disabled={addingPool === pool.id}
                        >
                          {addingPool === pool.id ? '...' : '+'}
                        </button>
                      )}
                    </div>
                    {expandedPools.has(pool.id) && pool.items && (
                      <div className={styles.poolItemsList}>
                        {pool.items.length === 0 ? (
                          <div style={{ fontSize: 12, color: '#9e9e9e' }}>Нет вопросов</div>
                        ) : pool.items.map((item) => (
                          <div key={item.id} className={styles.poolQuestion} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                            {isDraft && (
                              <input
                                type="checkbox"
                                style={{ marginTop: 2, flexShrink: 0, cursor: 'pointer' }}
                                checked={selectedPoolQuestions[pool.id]?.has(item.id) ?? false}
                                onChange={() => togglePoolQuestion(pool.id, item.id)}
                              />
                            )}
                            <span style={{ flex: 1 }}>{item.question?.shortTitle || item.id}</span>
                          </div>
                        ))}
                        {isDraft && (selectedPoolQuestions[pool.id]?.size ?? 0) > 0 && (
                          <button
                            style={{
                              marginTop: 8, width: '100%', padding: '5px 10px',
                              background: '#1565c0', color: '#fff', border: 'none',
                              borderRadius: 4, fontSize: 11, fontWeight: 700,
                              letterSpacing: '0.05em', cursor: addingPoolItems ? 'not-allowed' : 'pointer',
                              opacity: addingPoolItems ? 0.7 : 1, textTransform: 'uppercase',
                            }}
                            disabled={addingPoolItems}
                            onClick={() => handleAddSelectedPoolQuestions(pool)}
                          >
                            {addingPoolItems
                              ? 'ДОБАВЛЕНИЕ...'
                              : `ДОБАВИТЬ ВЫБРАННЫЕ (${selectedPoolQuestions[pool.id]?.size ?? 0})`}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ── РЕЕСТР РЕШЕНИЙ ── */}
        {activeTab === 'registry' && (() => {
          const filteredRows: RegistryRow[] = (registry?.rows ?? []).filter(row => {
            const search = registrySearch.toLowerCase()
            const matchSearch = !search ||
              row.premiseNumber.toLowerCase().includes(search) ||
              row.ownerName.toLowerCase().includes(search)
            const matchDecision = !registryDecisionFilter ||
              String(row.decisionNumber).includes(registryDecisionFilter)
            const matchStatus = !registryStatusFilter || row.status === registryStatusFilter
            return matchSearch && matchDecision && matchStatus
          })

          const votedArea = registry?.totalVotedArea ?? 0
          const totalArea = registry?.totalArea ?? 0
          const votedPct = totalArea > 0 ? (votedArea / totalArea * 100).toFixed(2) : '0.00'
          const quorumPct = totalArea > 0 ? (votedArea / totalArea * 100).toFixed(2) : '-'
          const quorumMet = votedArea / totalArea >= 0.5

          const allKeys = filteredRows.map(r => `${r.ownerId}:${r.decisionNumber}`)
          const allSelected = allKeys.length > 0 && allKeys.every(k => selectedRows.has(k))

          const toggleAllRows = () => {
            setSelectedRows(prev => {
              const next = new Set(prev)
              if (allSelected) allKeys.forEach(k => next.delete(k))
              else allKeys.forEach(k => next.add(k))
              return next
            })
          }
          const toggleRow = (key: string) => {
            setSelectedRows(prev => {
              const next = new Set(prev)
              if (next.has(key)) next.delete(key); else next.add(key)
              return next
            })
          }

          return (
            <div className={styles.registryWrap}>
              {/* Фильтры */}
              <div className={styles.registryFilters}>
                <div className={styles.registrySearchField}>
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                  <input
                    className={styles.registrySearchInput}
                    placeholder="Поиск"
                    value={registrySearch}
                    onChange={e => setRegistrySearch(e.target.value)}
                  />
                </div>
                <div className={styles.registryFilterField}>
                  <input
                    className={styles.registryFilterInput}
                    placeholder="№ Решения"
                    value={registryDecisionFilter}
                    onChange={e => setRegistryDecisionFilter(e.target.value)}
                  />
                </div>
                <div className={styles.registryFilterDropWrap} style={{ position: 'relative' }}>
                  <button
                    className={`${styles.registryFilterBtn} ${registryStatusFilter ? styles.registryFilterBtnActive : ''}`}
                    onClick={() => setShowStatusDropdown(v => !v)}
                  >
                    {registryStatusFilter === 'filled' ? 'Заполнен' : registryStatusFilter === 'empty' ? 'Не заполнен' : 'Статус'}
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14, marginLeft: 4 }}><path d="M7 10l5 5 5-5z"/></svg>
                  </button>
                  {showStatusDropdown && (
                    <div className={styles.registryDropdown} onClick={() => setShowStatusDropdown(false)}>
                      <div className={`${styles.registryDropdownItem} ${registryStatusFilter === '' ? styles.registryDropdownItemActive : ''}`} onClick={() => setRegistryStatusFilter('')}>Все</div>
                      <div className={`${styles.registryDropdownItem} ${registryStatusFilter === 'filled' ? styles.registryDropdownItemActive : ''}`} onClick={() => setRegistryStatusFilter('filled')}>Заполнен</div>
                      <div className={`${styles.registryDropdownItem} ${registryStatusFilter === 'empty' ? styles.registryDropdownItemActive : ''}`} onClick={() => setRegistryStatusFilter('empty')}>Не заполнен</div>
                    </div>
                  )}
                </div>
                <button className={styles.registryAllFiltersBtn}>
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}><path d="M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39A.998.998 0 0 0 18.95 4H5.04a1 1 0 0 0-.79 1.61z"/></svg>
                  ВСЕ ФИЛЬТРЫ
                </button>
                <div style={{ flex: 1 }} />
                <button
                  className={styles.registryAddBtn}
                  onClick={() => { setShowUploadModal(true); setUploadFile(null); setUploadError(null); setUploadSuccess(false) }}
                  title="Загрузить ZIP с бюллетенями"
                >+</button>
              </div>

              {/* Итог */}
              <div className={styles.registrySummary}>
                Всего голосов:&nbsp;
                <strong>{votedArea > 0 ? `${votedArea.toFixed(2)} м²` : '—'}</strong>
                &nbsp;/&nbsp;
                <strong>{votedArea > 0 ? `${votedPct}%` : '100%'}</strong>,&nbsp;
                кворум:&nbsp;
                <strong>{votedArea > 0 ? `${votedArea.toFixed(2)} м²` : '—'} / {quorumPct}%{quorumMet ? ' ✓' : ''}</strong>
              </div>

              {/* Таблица */}
              <div className={styles.registryTableWrap}>
                {registryLoading ? (
                  <div className={styles.loading}><span className={styles.spinner} /> Загрузка...</div>
                ) : (
                  <table className={styles.registryTable}>
                    <thead>
                      <tr>
                        <th><input type="checkbox" className={styles.checkbox} checked={allSelected} onChange={toggleAllRows} /></th>
                        <th>№кв/пом</th>
                        <th>Собственник</th>
                        <th>Голоса м²/%</th>
                        <th>Вид помещения</th>
                        <th>№ решения</th>
                        <th>Статус</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRows.length === 0 ? (
                        <tr><td colSpan={8} className={styles.registryEmpty}>Нет данных</td></tr>
                      ) : filteredRows.map(row => {
                        const key = `${row.ownerId}:${row.decisionNumber}`
                        return (
                          <tr
                            key={key}
                            className={styles.rowClickable}
                            onClick={() => handleOpenOwnerModal(row)}
                          >
                            <td onClick={e => e.stopPropagation()}>
                              <input type="checkbox" className={styles.checkbox} checked={selectedRows.has(key)} onChange={() => toggleRow(key)} />
                            </td>
                            <td className={styles.registryCell}>{row.premiseNumber}</td>
                            <td className={styles.registryCell}>{row.ownerName}</td>
                            <td className={styles.registryCell} style={{ whiteSpace: 'nowrap' }}>
                              {row.shareArea.toFixed(2)} м² / {row.sharePercent.toFixed(2)}%
                            </td>
                            <td className={styles.registryCell}>{row.premiseType}</td>
                            <td className={styles.registryCell}>{row.decisionNumber}</td>
                            <td className={styles.registryCell}>
                              <span className={row.status === 'filled' ? styles.statusFilled : styles.statusEmpty}>
                                {row.status === 'filled' ? 'Заполнен' : 'Не заполнен'}
                              </span>
                            </td>
                            <td onClick={e => e.stopPropagation()}>
                              <button className={styles.registryDelBtn} title="Удалить">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )
        })()}

        {/* ── ДОКУМЕНТЫ ── */}
        {activeTab === 'documents' && (
          <div className={styles.docsContent}>
            {docError && (
              <div className={styles.docErrorBanner}>
                <strong>Ошибка:</strong> {docError}
                <button className={styles.docErrorClose} onClick={() => setDocError(null)}>✕</button>
              </div>
            )}
            <div className={styles.docsSection}>
              <div className={styles.docsSectionHeader}>
                <span>Основные</span>
                <IconChevronDown />
              </div>
              {DOCUMENT_TYPES.map((doc) => {
                const isGenerating = generatingDoc === doc.key || generatingDocOnly === doc.key
                const isGenerated = !!generatedDocs[doc.key]
                return (
                  <div key={doc.key} className={styles.docItem}>
                    <span className={styles.docIcon}>
                      <IconFileDoc color={doc.color} />
                    </span>
                    {doc.available ? (
                      <>
                        <span className={styles.docName}>
                          {doc.name}
                          {isGenerated && (
                            <span className={styles.docGeneratedBadge} style={{ marginLeft: 8 }}>✓ сгенерирован</span>
                          )}
                        </span>
                        <div className={styles.docActions}>
                          {isGenerating ? (
                            <span className={styles.docSpinner} />
                          ) : doc.backendType ? (
                            <>
                              <button
                                className={`${styles.docActionBtn} ${styles.green}`}
                                title="Сгенерировать документ"
                                onClick={() => handleGenerateOnly(doc.key, doc.backendType!)}
                                disabled={!!generatingDoc || !!generatingDocOnly}
                              >
                                <IconGenerate />
                              </button>
                              <button
                                className={`${styles.docActionBtn} ${styles.blue}`}
                                title={isGenerated ? 'Скачать документ' : 'Сгенерировать и скачать'}
                                onClick={() => handleDownloadDoc(doc.key, doc.backendType!)}
                                disabled={!!generatingDoc || !!generatingDocOnly}
                              >
                                <IconDownload />
                              </button>
                              {doc.hasSettings && (
                                <button className={`${styles.docActionBtn} ${styles.settings}`} title="Настройки">
                                  <IconSettings />
                                </button>
                              )}
                            </>
                          ) : (
                            <span className={styles.docNoTemplate} title="Шаблон не добавлен">—</span>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className={styles.docUnavailable}>
                        <div className={styles.docUnavailableName}>{doc.name}</div>
                        {doc.note && <div className={styles.docUnavailableNote}>{doc.note}</div>}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {showInitiatorModal && meeting && buildingId && (
        <AddInitiatorModal
          buildingId={buildingId}
          currentEmployee={employee}
          existingOwnerIds={existingOwnerIds}
          hasEmployeeInitiator={hasEmployeeInitiator}
          onAdd={handleAddInitiator}
          onClose={() => setShowInitiatorModal(false)}
        />
      )}

      {/* ── МОДАЛ ВОПРОСА ── */}
      {showQuestionModal && (
        <div className={styles.modalOverlay} onClick={() => setShowQuestionModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>
                {editingItem ? 'Редактирование вопроса' : 'Новый вопрос'}
              </span>
              <button className={styles.modalClose} onClick={() => setShowQuestionModal(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalRow2}>
                <div className={styles.modalField}>
                  <label className={styles.modalLabel}>Номер вопроса <span className={styles.req}>*</span></label>
                  <input
                    className={styles.modalInput}
                    value={editingItem ? (editingItem.orderNumber ?? '') : agendaItems.length + 1}
                    disabled
                    readOnly
                  />
                </div>
                <div className={styles.modalField}>
                  <label className={styles.modalLabel}>Критерии принятия решения</label>
                  <select
                    className={styles.modalSelect}
                    value={questionForm.quorumType}
                    onChange={e => setQuestionForm(f => ({ ...f, quorumType: e.target.value }))}
                  >
                    <option value="simple_majority">Простое большинство от участвующих в собрании (25%+1)</option>
                    <option value="absolute_majority">Абсолютное большинство от общего числа голосов в доме (50%+1)</option>
                    <option value="qualified_majority">Квалифицированное большинство от общего числа голосов в доме (2/3)</option>
                  </select>
                </div>
              </div>

              <div className={styles.modalField}>
                <label className={styles.modalLabel}>
                  Формулировка вопроса <span className={styles.req}>*</span>
                </label>
                <textarea
                  className={styles.modalTextarea}
                  value={questionForm.shortTitle}
                  onChange={e => setQuestionForm(f => ({ ...f, shortTitle: e.target.value }))}
                  rows={3}
                  placeholder="Введите формулировку вопроса..."
                />
              </div>

              <div className={styles.modalField}>
                <label className={styles.modalLabel}>
                  Решение по вопросу <span className={styles.req}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <textarea
                    className={styles.modalTextarea}
                    value={questionForm.bulletinText}
                    onChange={e => setQuestionForm(f => ({ ...f, bulletinText: e.target.value }))}
                    rows={3}
                    placeholder="Введите текст решения..."
                  />
                  {questionForm.bulletinText && (
                    <button
                      style={{ position: 'absolute', right: 6, top: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#9e9e9e', fontSize: 16 }}
                      onClick={() => setQuestionForm(f => ({ ...f, bulletinText: '' }))}
                    >✕</button>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.modalCancelBtn} onClick={() => setShowQuestionModal(false)}>
                ЗАКРЫТЬ
              </button>
              <button
                className={styles.modalSaveBtn}
                disabled={questionSaving || !questionForm.shortTitle.trim()}
                onClick={handleSaveQuestion}
              >
                {questionSaving ? 'СОХРАНЕНИЕ...' : 'СОХРАНИТЬ'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── МОДАЛ ЗАГРУЗКИ ZIP ── */}
      {showUploadModal && (
        <div className={styles.modalOverlay} onClick={() => setShowUploadModal(false)}>
          <div className={styles.modal} style={{ maxWidth: 620 }} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>Загрузка архива с бюллетенями</span>
              <button className={styles.modalClose} onClick={() => setShowUploadModal(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <p style={{ fontSize: 13, color: '#757575', marginBottom: 16, lineHeight: 1.5 }}>
                Прикрепите ZIP-архив, содержащий отсканированные бюллетени решений собственников.
              </p>
              <label className={styles.zipDropZone}>
                <input
                  type="file"
                  accept=".zip,application/zip"
                  style={{ display: 'none' }}
                  onChange={e => {
                    const f = e.target.files?.[0] ?? null
                    setUploadFile(f)
                    setUploadError(null)
                    setUploadSuccess(false)
                  }}
                />
                {uploadFile ? (
                  <div className={styles.zipFileChosen}>
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 24, height: 24, color: '#4caf50', flexShrink: 0 }}><path d="M20 6h-2.18c.07-.44.18-.88.18-1.34C18 2.54 15.46 0 12.34 0c-1.67 0-3.16.72-4.2 1.86L6 4 3.5 1.5A2 2 0 0 0 0 3v18a2 2 0 0 0 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 11l-4-4 1.41-1.41L12 14.17l6.59-6.59L20 9l-8 8z"/></svg>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13, color: '#212121' }}>{uploadFile.name}</div>
                      <div style={{ fontSize: 12, color: '#9e9e9e' }}>{(uploadFile.size / 1024 / 1024).toFixed(2)} МБ</div>
                    </div>
                    <button
                      style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#9e9e9e', fontSize: 16 }}
                      onClick={e => { e.preventDefault(); setUploadFile(null) }}
                    >✕</button>
                  </div>
                ) : (
                  <div className={styles.zipDropContent}>
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 32, height: 32, color: '#bdbdbd' }}><path d="M20 6h-2.18c.07-.44.18-.88.18-1.34C18 2.54 15.46 0 12.34 0c-1.67 0-3.16.72-4.2 1.86L6 4 3.5 1.5A2 2 0 0 0 0 3v18a2 2 0 0 0 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
                    <div style={{ fontSize: 13, color: '#9e9e9e', marginTop: 8 }}>Нажмите или перетащите ZIP-файл</div>
                    <div style={{ fontSize: 11, color: '#bdbdbd', marginTop: 4 }}>Максимальный размер: 200 МБ</div>
                  </div>
                )}
              </label>
              {uploadError && (
                <div style={{ marginTop: 10, padding: '8px 12px', background: '#ffebee', borderRadius: 4, color: '#c62828', fontSize: 13 }}>
                  {uploadError}
                </div>
              )}
              {uploadSuccess && !scanJob && (
                <div style={{ marginTop: 10, padding: '8px 12px', background: '#e8f5e9', borderRadius: 4, color: '#2e7d32', fontSize: 13 }}>
                  Архив загружен, запускается сканирование...
                </div>
              )}

              {scanJob && (
                <div style={{ marginTop: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#424242' }}>
                      {scanJob.status === 'processing' && '⏳ Сканирование...'}
                      {scanJob.status === 'completed' && '✅ Сканирование завершено'}
                      {scanJob.status === 'failed' && '❌ Ошибка сканирования'}
                    </span>
                    <span style={{ fontSize: 12, color: '#757575' }}>
                      {scanJob.processed} / {scanJob.total}
                    </span>
                  </div>

                  <div style={{ background: '#e0e0e0', borderRadius: 4, height: 6, overflow: 'hidden', marginBottom: 12 }}>
                    <div style={{
                      background: scanJob.status === 'failed' ? '#e53935' : '#43a047',
                      height: '100%',
                      width: scanJob.total > 0 ? `${Math.round((scanJob.processed / scanJob.total) * 100)}%` : '0%',
                      transition: 'width 0.4s ease',
                    }} />
                  </div>

                  {scanJob.errors.length > 0 && (
                    <div style={{ padding: '8px 12px', background: '#ffebee', borderRadius: 4, color: '#c62828', fontSize: 12, marginBottom: 10 }}>
                      {scanJob.errors.map((e, i) => <div key={i}>{e}</div>)}
                    </div>
                  )}

                  {scanJob.results.length > 0 && (
                    <div style={{ border: '1px solid #e0e0e0', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ maxHeight: 320, overflowY: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                          <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                            <tr style={{ background: '#f5f5f5' }}>
                              <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: 600, color: '#616161', borderBottom: '1px solid #e0e0e0' }}>Файл</th>
                              <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: 600, color: '#616161', borderBottom: '1px solid #e0e0e0' }}>Собственник</th>
                              <th style={{ padding: '6px 8px', textAlign: 'center', fontWeight: 600, color: '#616161', borderBottom: '1px solid #e0e0e0' }}>Голосов</th>
                              <th style={{ padding: '6px 8px', textAlign: 'center', fontWeight: 600, color: '#616161', borderBottom: '1px solid #e0e0e0' }}>Статус</th>
                              <th style={{ padding: '6px 8px', textAlign: 'center', fontWeight: 600, color: '#616161', borderBottom: '1px solid #e0e0e0' }}></th>
                            </tr>
                          </thead>
                          <tbody>
                            {scanJob.results.map((r, i) => (
                              <React.Fragment key={i}>
                                <tr style={{ borderBottom: editingResultIdx === i ? 'none' : '1px solid #f0f0f0', background: editingResultIdx === i ? '#f3f8ff' : 'transparent' }}>
                                  <td style={{ padding: '5px 8px', color: '#424242', maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={r.filename}>
                                    {r.filename.split('/').pop()}
                                  </td>
                                  <td style={{ padding: '5px 8px', color: '#424242' }}>
                                    {r.ownerName || r.ownerId || '—'}
                                  </td>
                                  <td style={{ padding: '5px 8px', textAlign: 'center', color: '#424242' }}>
                                    {r.votes.length}{r.conflicts?.length > 0 ? ` +${r.conflicts.length}⚠` : ''}
                                  </td>
                                  <td style={{ padding: '5px 8px', textAlign: 'center' }}>
                                    {r.saved
                                      ? <span style={{ color: '#2e7d32', fontWeight: 600 }}>✓ Сохранён</span>
                                      : r.conflicts?.length > 0
                                        ? <span style={{ color: '#e65100', fontWeight: 600 }} title={r.error}>⚠ Конфликт</span>
                                        : <span style={{ color: '#c62828', fontWeight: 600 }} title={r.error}>✗ Ошибка</span>
                                    }
                                  </td>
                                  <td style={{ padding: '5px 8px', textAlign: 'center' }}>
                                    {editingResultIdx !== i ? (
                                      <button
                                        title="Редактировать"
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1976d2', fontSize: 14, padding: '2px 4px', borderRadius: 3 }}
                                        onClick={async () => {
                                          setEditingResultIdx(i)
                                          setCorrectionError(null)
                                          const initVotes: Record<number, string> = {}
                                          r.votes.forEach(v => { initVotes[v.questionNumber] = v.vote })
                                          setEditVotes(initVotes)
                                          setEditOwnerId(r.ownerId ?? '')
                                          if (!ownersLoaded && building) {
                                            try {
                                              const owners = await getOwnersByBuilding(building.id)
                                              setBuildingOwners(owners)
                                              setOwnersLoaded(true)
                                            } catch { /* ignore */ }
                                          }
                                        }}
                                      >✏️</button>
                                    ) : (
                                      <button
                                        title="Отменить"
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#757575', fontSize: 14, padding: '2px 4px' }}
                                        onClick={() => { setEditingResultIdx(null); setCorrectionError(null) }}
                                      >✕</button>
                                    )}
                                  </td>
                                </tr>
                                {editingResultIdx === i && (
                                  <tr key={`edit-${i}`} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                    <td colSpan={5} style={{ padding: '10px 12px', background: '#f3f8ff' }}>
                                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        <div>
                                          <label style={{ fontSize: 11, fontWeight: 600, color: '#616161', display: 'block', marginBottom: 4 }}>СОБСТВЕННИК</label>
                                          <select
                                            value={editOwnerId}
                                            onChange={e => setEditOwnerId(e.target.value)}
                                            style={{ width: '100%', padding: '5px 8px', border: '1px solid #ccc', borderRadius: 4, fontSize: 12 }}
                                          >
                                            <option value="">— выберите собственника —</option>
                                            {buildingOwners.map(o => (
                                              <option key={o.id} value={o.id}>
                                                {o.fullName}{o.premises?.length ? ` (кв. ${o.premises.map(p => p.number).join(', ')})` : ''}
                                              </option>
                                            ))}
                                          </select>
                                        </div>

                                        {r.conflicts?.length > 0 && (
                                          <div style={{ padding: '8px 10px', background: '#fff3e0', border: '1px solid #ffcc80', borderRadius: 4 }}>
                                            <div style={{ fontSize: 11, fontWeight: 600, color: '#e65100', marginBottom: 6 }}>
                                              ⚠ Конфликт: в {r.conflicts.length} вопр. обнаружено несколько отметок
                                            </div>
                                            {r.conflicts.map(c => (
                                              <div key={c.questionNumber} style={{ fontSize: 11, color: '#5d4037', marginBottom: 3 }}>
                                                <span style={{ fontWeight: 600 }}>Вопрос {c.questionNumber}:</span>{' '}
                                                {c.marks.map(m => `${m.vote} (${(m.darkRatio * 100).toFixed(0)}%)`).join(', ')}
                                                {' — '}
                                                <span style={{ fontStyle: 'italic' }}>выберите правильный вариант ниже</span>
                                              </div>
                                            ))}
                                          </div>
                                        )}

                                        {agendaItems.length > 0 && (
                                          <div>
                                            <label style={{ fontSize: 11, fontWeight: 600, color: '#616161', display: 'block', marginBottom: 6 }}>ГОЛОСА ПО ВОПРОСАМ</label>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                              {agendaItems.map(item => {
                                                const hasConflict = r.conflicts?.some(c => c.questionNumber === item.orderNumber)
                                                return (
                                                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 8, background: hasConflict ? '#fff8e1' : 'transparent', borderRadius: 3, padding: hasConflict ? '2px 4px' : 0 }}>
                                                    <span style={{ fontSize: 11, color: hasConflict ? '#e65100' : '#424242', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: hasConflict ? 600 : 400 }}>
                                                      {hasConflict ? '⚠ ' : ''}{item.orderNumber}. {(item as any).customBulletinText || (item as any).question?.bulletinText || (item as any).question?.shortTitle || `Вопрос ${item.orderNumber}`}
                                                    </span>
                                                    <select
                                                      value={editVotes[item.orderNumber] ?? ''}
                                                      onChange={e => setEditVotes(prev => ({ ...prev, [item.orderNumber]: e.target.value }))}
                                                      style={{ padding: '3px 6px', border: hasConflict ? '1px solid #e65100' : '1px solid #ccc', borderRadius: 4, fontSize: 11, minWidth: 110 }}
                                                    >
                                                      <option value="">— не указан —</option>
                                                      <option value="За">За</option>
                                                      <option value="Против">Против</option>
                                                      <option value="Воздержался">Воздержался</option>
                                                    </select>
                                                  </div>
                                                )
                                              })}
                                            </div>
                                          </div>
                                        )}

                                        {correctionError && (
                                          <div style={{ padding: '6px 10px', background: '#ffebee', borderRadius: 4, color: '#c62828', fontSize: 11 }}>
                                            {correctionError}
                                          </div>
                                        )}

                                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                          <button
                                            style={{ padding: '5px 14px', border: '1px solid #ccc', borderRadius: 4, background: '#fff', color: '#424242', fontSize: 12, cursor: 'pointer' }}
                                            onClick={() => { setEditingResultIdx(null); setCorrectionError(null) }}
                                          >
                                            ОТМЕНА
                                          </button>
                                          <button
                                            disabled={!editOwnerId || correcting}
                                            style={{ padding: '5px 14px', border: 'none', borderRadius: 4, background: editOwnerId && !correcting ? '#1976d2' : '#bdbdbd', color: '#fff', fontSize: 12, cursor: editOwnerId && !correcting ? 'pointer' : 'default', fontWeight: 600 }}
                                            onClick={async () => {
                                              if (!editOwnerId || !meetingId || !scanJob) return
                                              setCorrecting(true)
                                              setCorrectionError(null)
                                              try {
                                                const votes = Object.entries(editVotes)
                                                  .filter(([, v]) => v)
                                                  .map(([qn, v]) => ({ questionNumber: Number(qn), vote: v }))
                                                const updated = await correctScanResult(meetingId, scanJob.jobId, i, editOwnerId, votes)
                                                setScanJob(updated)
                                                setEditingResultIdx(null)
                                              } catch (e) {
                                                setCorrectionError(e instanceof Error ? e.message : 'Ошибка сохранения')
                                              } finally {
                                                setCorrecting(false)
                                              }
                                            }}
                                          >
                                            {correcting ? 'СОХРАНЕНИЕ...' : 'СОХРАНИТЬ'}
                                          </button>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {scanJob.status === 'completed' && (
                    <div style={{ marginTop: 10, padding: '8px 12px', background: '#e8f5e9', borderRadius: 4, color: '#2e7d32', fontSize: 13 }}>
                      Успешно обработано: {scanJob.results.filter(r => r.saved).length} из {scanJob.total} бюллетеней.
                      {scanJob.results.filter(r => !r.saved).length > 0 && ` Не распознано: ${scanJob.results.filter(r => !r.saved).length}.`}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.modalCancelBtn} onClick={() => setShowUploadModal(false)}>
                ЗАКРЫТЬ
              </button>
              <button
                className={styles.modalSaveBtn}
                disabled={!uploadFile || uploading || scanJob?.status === 'processing'}
                onClick={async () => {
                  if (!uploadFile || !meetingId) return
                  setUploading(true)
                  setUploadError(null)
                  setUploadSuccess(false)
                  setScanJob(null)
                  try {
                    const res = await uploadBallotsZip(meetingId, uploadFile)
                    setUploadSuccess(true)
                    setUploadFile(null)
                    const initialJob = await getScanStatus(meetingId, res.jobId)
                    setScanJob(initialJob)
                    setScanPolling(true)
                  } catch (e) {
                    setUploadError(e instanceof Error ? e.message : 'Ошибка загрузки')
                  } finally {
                    setUploading(false)
                  }
                }}
              >
                {uploading ? 'ЗАГРУЗКА...' : 'ЗАГРУЗИТЬ И СКАНИРОВАТЬ'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── МОДАЛ СОБСТВЕННИКА (РЕЕСТР) ── */}
      {selectedRegistryRow && (
        <div className={styles.modalOverlay} onClick={() => setSelectedRegistryRow(null)}>
          <div className={styles.modal} style={{ maxWidth: 600 }} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>{selectedRegistryRow.ownerName}</span>
              <button className={styles.modalClose} onClick={() => setSelectedRegistryRow(null)}>✕</button>
            </div>
            <div className={styles.ownerModalTabs}>
              <button
                className={`${styles.ownerModalTab} ${registryModalTab === 'info' ? styles.ownerModalTabActive : ''}`}
                onClick={() => setRegistryModalTab('info')}
              >Основные сведения</button>
              <button
                className={`${styles.ownerModalTab} ${registryModalTab === 'votes' ? styles.ownerModalTabActive : ''}`}
                onClick={() => setRegistryModalTab('votes')}
              >Результаты голосования</button>
            </div>
            <div className={styles.modalBody} style={{ gap: 0 }}>
              {registryModalTab === 'info' && (
                <div className={styles.ownerInfoGrid}>
                  <span className={styles.ownerInfoLabel}>Собственник</span>
                  <span className={styles.ownerInfoValue}>{selectedRegistryRow.ownerName}</span>
                  <span className={styles.ownerInfoLabel}>№ кв/пом</span>
                  <span className={styles.ownerInfoValue}>{selectedRegistryRow.premiseNumber}</span>
                  <span className={styles.ownerInfoLabel}>Вид помещения</span>
                  <span className={styles.ownerInfoValue}>{selectedRegistryRow.premiseType}</span>
                  <span className={styles.ownerInfoLabel}>Голоса (м²)</span>
                  <span className={styles.ownerInfoValue}>{selectedRegistryRow.shareArea.toFixed(2)} м²</span>
                  <span className={styles.ownerInfoLabel}>Доля (%)</span>
                  <span className={styles.ownerInfoValue}>{selectedRegistryRow.sharePercent.toFixed(2)}%</span>
                  <span className={styles.ownerInfoLabel}>№ решения</span>
                  <span className={styles.ownerInfoValue}>{selectedRegistryRow.decisionNumber}</span>
                  <span className={styles.ownerInfoLabel}>Статус</span>
                  <span className={styles.ownerInfoValue}>
                    <span className={selectedRegistryRow.status === 'filled' ? styles.statusFilled : styles.statusEmpty}>
                      {selectedRegistryRow.status === 'filled' ? 'Заполнен' : 'Не заполнен'}
                    </span>
                  </span>
                </div>
              )}
              {registryModalTab === 'votes' && (
                <div>
                  {answersLoading ? (
                    <div className={styles.loading}><span className={styles.spinner} /> Загрузка...</div>
                  ) : agendaItems.length === 0 ? (
                    <div style={{ color: '#9e9e9e', fontSize: 13, padding: '16px 0' }}>Вопросы собрания не добавлены</div>
                  ) : agendaItems.map((item, i) => {
                    const title = item.question?.shortTitle || item.customBulletinText || `Вопрос ${item.orderNumber ?? i + 1}`
                    const currentVote = ownerAnswers[item.id] ?? ''
                    return (
                      <div key={item.id} className={styles.voteQuestion}>
                        <div className={styles.voteQuestionTitle}>
                          {item.orderNumber ?? i + 1}. {title}
                        </div>
                        <div className={styles.voteRadioGroup}>
                          {(['За', 'Против', 'Воздержался'] as const).map(label => (
                            <label key={label} className={styles.voteRadioLabel}>
                              <input
                                type="radio"
                                name={`vote_${item.id}`}
                                value={label}
                                checked={currentVote === label}
                                disabled={answersSaving}
                                onChange={() => handleVoteChange(item.id, label)}
                              />
                              <span className={label === 'За' ? styles.voteFor : label === 'Против' ? styles.voteAgainst : styles.voteAbstain}>
                                {label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                  {answersSaveError && (
                    <div style={{ marginTop: 8, padding: '8px 12px', background: '#ffebee', borderRadius: 4, color: '#c62828', fontSize: 13 }}>
                      {answersSaveError}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.modalCancelBtn} onClick={() => setSelectedRegistryRow(null)} disabled={answersSaving}>
                ЗАКРЫТЬ
              </button>
              {registryModalTab === 'votes' && (
                <button
                  className={styles.modalSaveBtn}
                  onClick={handleSaveAllVotes}
                  disabled={answersSaving || answersLoading || Object.keys(ownerAnswers).length === 0}
                >
                  {answersSaving ? 'СОХРАНЕНИЕ...' : 'СОХРАНИТЬ'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── МОДАЛ СОЗДАНИЯ НАБОРА ── */}
      {showCreatePoolModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCreatePoolModal(false)}>
          <div className={styles.modal} style={{ maxWidth: 480 }} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>Создание набора</span>
              <button className={styles.modalClose} onClick={() => setShowCreatePoolModal(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalField}>
                <label className={styles.modalLabel}>Название набора <span className={styles.req}>*</span></label>
                <input
                  className={styles.modalInput}
                  value={newPoolName}
                  onChange={e => setNewPoolName(e.target.value)}
                  placeholder="Введите название набора..."
                  autoFocus
                />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.modalCancelBtn} onClick={() => setShowCreatePoolModal(false)}>
                ЗАКРЫТЬ
              </button>
              <button
                className={styles.modalSaveBtn}
                disabled={poolSaving || !newPoolName.trim()}
                onClick={handleCreatePool}
              >
                {poolSaving ? 'СОХРАНЕНИЕ...' : 'СОХРАНИТЬ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

