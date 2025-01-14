export class SolucoesEmpresa {
    id: number = 0;
    solucaoId: number;
    solucaoNome: string;
    solucaoRota: string;
    icone: string;
    empresaId: number;
    ativo: boolean;
}

export class ViewPermissaoUsuariosSolucao {
    id: number = 0;
    nome: string;
    usuarioId: number;
    solucaoEmpresaId: number;
    empresaId: number;
    ativo: boolean;
}