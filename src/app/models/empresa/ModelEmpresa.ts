export interface Empresa {
    id ? :string
    dtCriacao : Date
    cnpj: string
    inscricaoEstadual: string
    inscricaoMunicipal: string
    razaoSocial: string
    nomeFantasia: string
    cnes : string
    codPIS : string
    bloqueado : boolean
    observacao : string
    idUsuarioCriacao : number
    idEndereco : number
    idContato : number
    codCnae : string
 }
