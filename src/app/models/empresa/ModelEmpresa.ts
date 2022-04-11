import { Product } from './../produtos/product.model';
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
    produtos : Array<Product>
    usuarios : Array<Usuario>
    agendas : Array<Agenda>
    faturamento : Array<Faturamento>
    GrupoAgenda : Array<GrupoAgenda>
    Unidade : Array<Unidade>

    constructor(
        id : number,
        dtCriacao : Date,
        cnpj: string,
        razaoSocial: string,
        nomeFantasia: string,
        inscricaoEstadual: string,
        inscricaoMunicipal: string,
        cnes : string,
        codPIS : string,
        observacao : string,
        codCnae : string,
        empresaPai : number,
        criadoPor : number,
        bloqueado : boolean,
        produtos : Array<Product>,
        usuarios : Array<Usuario>,
        agendas : Array<Agenda>,
        faturamento : Array<Faturamento>,
        GrupoAgenda : Array<GrupoAgenda>,
        Unidade : Array<Unidade>
    )
    {
        this.id = id
        this.dtCriacao = dtCriacao
        this.cnpj = cnpj
        this.razaoSocial = razaoSocial
        this.nomeFantasia = nomeFantasia
        this.inscricaoEstadual = inscricaoEstadual
        this.inscricaoMunicipal = inscricaoMunicipal
        this.cnes = cnes
        this.codPIS = codPIS
        this.observacao = observacao
        this.codCnae = codCnae
        this.empresaPai = empresaPai
        this.criadoPor = criadoPor
        this.bloqueado = bloqueado
        this.produtos = produtos
        this.usuarios = usuarios
        this.agendas = agendas
        this.faturamento = faturamento
        this.GrupoAgenda = GrupoAgenda
        this.Unidade = Unidade
    }
 }
