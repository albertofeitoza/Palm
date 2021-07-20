export interface AgendaDto {
    id ?: null
    DtCriacao: Date 
    NomeAgenda: string
    Funcionario: string
    NomeEmpresa: string
    NomeUnidade: string
    NomeSala: string
    substituicao: string
    GrupoAgenda: string
    vigenciaInico: Date
    vigenciaFim: Date
    considerarFeriado: string
    bloqueado: string
}

