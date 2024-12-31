import { Agenda } from "../Agenda/modelAgenda"


export class Sala {
    id? : number = 0;
    dtCriacao : Date
    nomeSala : string
    unidadeid : number
    criadoPor : number
    ativo : boolean
}