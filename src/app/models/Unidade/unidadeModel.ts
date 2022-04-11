import { Agenda } from "../Agenda/modelAgenda"
import { Sala } from "../Sala/SalaModel"

export class Unidade {
    id : number
    dtCriacao : Date
    nomeUnidade : string
    empresaid : number
    Sala : Array<Sala>
    criadoPor : number
    bloqueado : boolean
    agendas : Array<Agenda>
  
    constructor(
        id : 0,
        dtCriacao : Date,
        nomeUnidade : string,
        empresaid : number,
        Sala : Array<Sala>,
        criadoPor : number,
        bloqueado : boolean,
        agendas : Array<Agenda>
    ) {
            this.id = id;
            this.dtCriacao = dtCriacao;
            this.nomeUnidade = nomeUnidade;
            this.empresaid = empresaid;
            this.Sala = Sala;
            this.criadoPor = criadoPor;
            this.bloqueado = bloqueado;
            this.agendas = agendas;

    }
}