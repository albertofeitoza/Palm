import { Agenda } from "../Agenda/modelAgenda"
import { Sala } from "../Sala/SalaModel"

export class Unidade {
    id? : number
    dtCriacao : Date
    nomeUnidade : string
    empresaid : number
    Sala : Array<Sala>
    criadoPor : number
    bloqueado : boolean
    agendas : Array<Agenda>
}