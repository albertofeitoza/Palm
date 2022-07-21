import { Telefone } from './../Telefone/telefoneModel';
export class Contato {
    id : 0
    dtCriacao : Date
    nome: string
    email: string
    email_secundario : string
    website: string
    observacao : string
    padrao : boolean
    criadoPor : number
    pessoaId : number
    bloqueado : boolean
}
