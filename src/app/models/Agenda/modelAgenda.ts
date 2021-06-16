export interface Agenda {
    id ?: null
    DtCriacao: Date 
    nomeAgenda: string
    empresaid: number
    unidadeid: number
    salaid: number
    profissionalid: number
    substituicao: Boolean
    grupoAgendaid: 0
    vigenciaInico: Date
    vigenciaFim: Date
    considerarFeriado: Boolean
    ativo: Boolean
}

