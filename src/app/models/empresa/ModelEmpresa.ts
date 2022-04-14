import { ProdutoEmpresa } from '../produtos/produtoEmpresa.model';
import { Usuario } from '../usuarios/modelLogin';
import { Contato } from './../contato/modelContato';
import { Agenda } from '../Agenda/modelAgenda';
import { Faturamento } from '../Faturamento/Faturamento';
import { GrupoAgenda } from '../Agenda/modelGrupoAgenda';
import { Unidade } from '../Unidade/unidadeModel';
export class Empresa {
    id: number
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
    produtos : Array<ProdutoEmpresa>
    usuarios : Array<Usuario>
    agendas : Array<Agenda>
    faturamento : Array<Faturamento>
    GrupoAgenda : Array<GrupoAgenda>
    Unidade : Array<Unidade>
   
 }
