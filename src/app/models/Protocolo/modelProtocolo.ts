import { Pessoa } from "../Pessoa/modelPessoa"

export class Protocolo{
    id: Number
    dtCriacao: Date
    tipo: Number
    descricao: string
    usuarioid: Number
    empresaid: Number
    criadoPor: Number
    pessoaid: Number
    pessoa : Pessoa 
    
    
}