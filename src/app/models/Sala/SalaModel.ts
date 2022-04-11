import { Agenda } from "../Agenda/modelAgenda"


export class Sala {
    id? : null
    dtCriacao : Date
    nomeSala : string
    unidadeid : number
    criadoPor : number
    ativo : boolean
    agendas : Array<Agenda>

    constructor(
        id : null,
        dtCriacao : Date,
        nomeSala : string,
        unidadeid : number,
        criadoPor : number,
        ativo : boolean,
        agendas : Array<Agenda>
    ) {
        this.id = id;
        this.dtCriacao = dtCriacao;
        this.nomeSala = nomeSala;
        this.unidadeid = unidadeid;
        this.criadoPor = criadoPor;
        this.ativo = ativo;
        this.agendas = agendas;

    }
}