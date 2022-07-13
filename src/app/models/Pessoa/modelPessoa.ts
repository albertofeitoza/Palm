import { Contato } from "../contato/modelContato"

export class Pessoa {
    id : number
    dtCriacao : Date
    nome : string
    tipoPessoa : number
    cpfcnpj : string
    rg : string
    dataNascimento : Date
    responsavel : string
    parentesco : string
    estCivil : number
    sexo : number
    contatos : Contato[]
}
