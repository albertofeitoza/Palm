import { Product } from './../produtos/product.model';
import { Usuario } from '../usuarios/modelLogin';
import { Contato } from './../contato/modelContato';
export interface Empresa {
    id ? : number
    dtCriacao : Date
    cnpj: string
    razaoSocial: string
    nomeFantasia: string
    inscricaoEstadual: string
    inscricaoMunicipal: string
    cnes : string
    codPIS : string
    observacao : string
    codCnae : string
    empresaPai : number
    criadoPor : number
    bloqueado : boolean
 }
