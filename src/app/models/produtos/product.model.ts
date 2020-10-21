export interface Product {
    id ?: number
    dtCriacao : Date
    nome : string
    preco : number
    criadoPor : number
    bloqueado : boolean
    empresaId : number
}