export type Schedule = {
    id: string
    scheduledDate: Date
    patientName: string
    patientBirthDate: Date
    scheduleCompleted: boolean
    scheduleConclusion?: string | null
}