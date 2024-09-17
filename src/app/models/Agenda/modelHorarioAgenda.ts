export class HorarioAgenda {
    id?: number
    data: Date
    agendaId: number
    intervalo: string
    tipoHorario: number
    diaDasemana: number
    hora: string
    criadoPor: number
    bloqueado: boolean
    naoDisponivel: boolean
    horaInicio: string
    horaFim: string
    bloqueadoEmTela: boolean
}
