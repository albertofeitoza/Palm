
import { Empresa } from "../empresa/ModelEmpresa"
import { Agenda } from "./modelAgenda"

export class GrupoAgenda {

    id ? : number
    dtCriacao : Date
    nomeGrupoAgenda : string
    empresaid : number
    criadoPor : number
    bloqueado : boolean
    agendas : Array<Agenda>
}