export interface Agenda {
    id ?: null
    DtCriacao: Date 
    nomeAgenda: string
    Profissionalid: number
    Empresaid: number
    Unidadeid: number
    Salaid: number
    substituicao: Boolean
    GrupoAgendaid: number
    vigenciaInico: Date
    vigenciaFim: Date
    considerarFeriado: Boolean
    bloqueado: Boolean
}

