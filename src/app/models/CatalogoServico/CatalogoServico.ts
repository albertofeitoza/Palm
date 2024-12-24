export class CatalogoServico {
    check: boolean = false
    id: number;
    dtCriacao: Date;
    codigoBarras: string;
    qrCode: string;
    codigo: string;
    qtdEstoque: number;
    nome: string;
    tipoCatalogo: number;
    peso: number;
    margem: number;
    valorCompra: number;
    valor: number;
    excluido: boolean;
    empresaId: number;
}

export class CatalogoServicoCadastro {
    id: number;
    dtCriacao: Date;
    codigoBarras: string;
    qrCode: string;
    codigo: string;
    qtdEstoque: number;
    nome: string;
    tipoCatalogo: number;
    peso: number;
    margem: number;
    valorCompra: number;
    valor: number;
    excluido: boolean;
    empresaId: number;
}
