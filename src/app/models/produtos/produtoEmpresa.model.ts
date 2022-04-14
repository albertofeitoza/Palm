import { Faturamento } from "../Faturamento/Faturamento"

export class ProdutoEmpresa {
    id ?: number
    dtCriacao : Date
    criadoPor : number
    nome: string
    valor : number
    empresaid : string
    bloqueado : boolean | undefined
    faturamento : Array<Faturamento>

}