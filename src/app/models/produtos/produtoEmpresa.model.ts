import { Faturamento } from "../Faturamento/Faturamento"

export class ProdutoEmpresa {
    id : number
    dtCriacao : Date
    criadoPor : number
    nome: string
    nomeEmpresa : string
    valor : number
    empresaid : string
    produtoid : number
    bloqueado : boolean
}