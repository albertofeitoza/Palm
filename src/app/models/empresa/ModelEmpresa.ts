
export class Empresa {
    id: number;
    dtCriacao: Date;
    nome: string;
    tipoPessoa: number;
    cpfCnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    inscricaoEstadual: string;
    inscricaoMunicipal: string;
    cnes: string;
    codPIS: string;
    codCnae: string;
    dominio: string;
    empresaPai: number;
    criadoPor: number;
    status: boolean;
    pessoas: null;
}


export class ViewEmpresas {
    id: number;
    cpfCnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    nomeEmpresaPai: string;
    inscricaoEstadual: string;
    inscricaoMunicipal: string;
    status: boolean;
    empresaPai: number;
}


