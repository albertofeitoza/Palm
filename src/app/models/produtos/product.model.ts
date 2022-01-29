import { Faturamento } from "../Faturamento/Faturamento"

export class Product {
    id ?: number
    dtCriacao : Date
    criadoPor : number
    nome: string
    valor : number
    empresaid : string
    bloqueado : boolean
    faturamento : Array<Faturamento>
}