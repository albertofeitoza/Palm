export interface Agenda {
    id ?: null
    DtCriacao: Date 
    NomeAgenda: string
    Funcionario: string
    NomeEmpresa: string
    NomeUnidade: string
    NomeSala: string
    substituicao: Boolean
    GrupoAgenda: string
    vigenciaInico: Date
    vigenciaFim: Date
    considerarFeriado: Boolean
    ativo: Boolean
}

