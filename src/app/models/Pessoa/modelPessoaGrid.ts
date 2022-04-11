import { NumberSymbol } from "@angular/common"

export class PessoaGrid {
    id ? : number
    nome : string
    protocolos : number
    grupoAgenda : string
    agendamentoFuturo : number
    responsavel : string 
    ura : string 
    cpf : string
    rg : string
    telefone : string
    celular : string
    email : string

    constructor(
        id : number,
        nome : string,
        protocolos : number,
        grupoAgenda : string,
        agendamentoFuturo : number,
        responsavel : string ,
        ura : string ,
        cpf : string,
        rg : string,
        telefone : string,
        celular : string,
        email : string
    ) 
    {
        this.id = id;
        this.nome = nome;
        this.protocolos = protocolos;
        this.grupoAgenda = grupoAgenda;
        this.agendamentoFuturo = agendamentoFuturo;
        this.responsavel = responsavel;
        this.ura = ura;
        this.cpf = cpf;
        this.rg = rg;
        this.telefone = telefone;
        this.celular = celular;
        this.email = email;

    }
}

