import { Faturamento } from "../Faturamento/Faturamento"

export class Product {
    id ?: number
    dtCriacao : Date
    criadoPor : number
    nome: string
    valor : number
    empresaid : string
    bloqueado : boolean | undefined
    faturamento : Array<Faturamento>

    constructor(
        id : number,
        dtCriacao : Date,
        criadoPor : number,
        nome: string,
        valor : number,
        empresaid : string,
        bloqueado : boolean,
        faturamento : Array<Faturamento>
    ) 
    {
        this.id = id;
        this.dtCriacao =   dtCriacao 
        this.criadoPor =   criadoPor 
        this.nome =   nome 
        this.valor =   valor 
        this.empresaid =   empresaid 
        this.bloqueado =   bloqueado 
        this.faturamento =   faturamento 
    }

}