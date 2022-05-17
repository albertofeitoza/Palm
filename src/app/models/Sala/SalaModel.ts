import { Agenda } from "../Agenda/modelAgenda"


export class Sala {
    id? : null
    dtCriacao : Date
    nomeSala : string
    unidadeid : number
    criadoPor : number
    ativo : boolean
    agendas : Array<Agenda>
}