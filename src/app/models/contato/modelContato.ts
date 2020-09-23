export interface Contato {
    id ?: null
    dtCriacao : Date
    nome: string
    email: string
    email_secundario ?: string
    Website: string
    observacao : string
    padrao : boolean
    idUsuarioCriacao : number
}