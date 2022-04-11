import { Telefone } from './../Telefone/telefoneModel';
export class Contato {
    id ?: null
    dtCriacao : Date
    nome: string
    email: string
    email_secundario ?: string
    Website: string
    observacao : string
    padrao : boolean
    idUsuarioCriacao : number
    telefone : Telefone

    constructor(
        id : null,
        dtCriacao : Date,
        nome: string,
        email: string,
        email_secundario : string,
        Website: string,
        observacao : string,
        padrao : boolean,
        idUsuarioCriacao : number,
        telefone : Telefone
    ) 
    {
        this.id = id
        this.dtCriacao = dtCriacao
        this.nome = nome
        this.email = email
        this.email_secundario = email_secundario
        this.Website = Website
        this.observacao = observacao
        this.padrao = padrao
        this.idUsuarioCriacao = idUsuarioCriacao
        this.telefone = telefone
         
    }
}