export interface Agenda {
    id ?: string
    DtCriacao: Date 
    nomeAgenda: string
    profissionalid: string
    Empresaid: number
    unidadeid: string
    salaid: string
    substituicao: Boolean
    grupoAgendaid: string
    vigenciaInicio: Date
    vigenciaFim: Date
    considerarFeriado: Boolean
    bloqueado: Boolean
}

