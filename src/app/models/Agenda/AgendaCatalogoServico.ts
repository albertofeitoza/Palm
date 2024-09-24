export class AgendaCatalogoServico {
    id: number;
    dtCriacao: Date;
    agendaId: number;
    catalogoServicoId: number;
}

export class ResponseAgendaCatalagoServicos {
    id: number;
    dtCriacao: Date;
    agendaId: number;
    catalogoServicoId: number;
    agenda: null;
    catalogoServico: CatalogoServicoResponse;
}

export class CatalogoServicoResponse {
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
