// Generated by https://quicktype.io

export class Solucoes {
    id:               number;
    solucaoId:        number;
    solucaoNome:      string;
    solucaoRota:      string;
    empresaId:        number;
    ativo:            boolean;
    permissaoUsuario: PermissaoUsuario[];
}

export class PermissaoUsuario {
    usuarioId: number;
    empresaId: number;
    ativo:     boolean;
}
