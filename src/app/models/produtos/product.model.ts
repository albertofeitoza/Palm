export interface Product {
    id ?: number
    dtCriacao : Date
    criadoPor : number
    nome: string
    valor : number
    empresaId : string
    bloqueado : boolean
}