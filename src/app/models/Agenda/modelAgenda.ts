import { Unidade } from "../Unidade/unidadeModel"
import { GrupoAgenda } from "./modelGrupoAgenda"

export class Agenda {
    id ?: string
    DtCriacao: Date 
    nomeAgenda: string
    Profissionalid: string
    Empresaid: number
    Unidadeid : number
    Salaid : number
    substituicao: Boolean
    GrupoAgendaid: number
    vigenciaInicio: Date
    vigenciaFim: Date
    considerarFeriado: Boolean
    bloqueado: Boolean
}

