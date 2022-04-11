export class Endereco{
id?: number
dtCriacao : Date
cep : string
bairro : string
tipoLogradouro : number
logradouro: string
numero : string
complemento :string
idUsuarioCriacao : number
idCidade: number
referencia : string
bloqueado : boolean


constructor(
    id: number,
    dtCriacao : Date,
    cep : string,
    bairro : string,
    tipoLogradouro : number,
    logradouro: string,
    numero : string,
    complemento :string,
    idUsuarioCriacao : number,
    idCidade: number,
    referencia : string,
    bloqueado : boolean
) {
    this.id = id
    this.dtCriacao = dtCriacao
    this.cep = cep
    this.bairro = bairro
    this.tipoLogradouro = tipoLogradouro
    this.logradouro = logradouro
    this.numero = numero
    this.complemento = complemento
    this.idUsuarioCriacao = idUsuarioCriacao
    this.idCidade = idCidade
    this.referencia = referencia
    this.bloqueado = bloqueado
}

}