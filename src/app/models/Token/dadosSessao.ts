export class dadosSessao{

    dominio : string
    usuarioId : number
    bloqueado : boolean
    nomeUsuario : string
    idGrupoUsuario : number
    empresaUsuarioId : number
    statusEmpresa : boolean
    erroLogin : boolean
    accessToken : string

    constructor(
        dominio : string,
        usuarioId : number,
        bloqueado : boolean,
        nomeUsuario : string,
        idGrupoUsuario : number,
        empresaUsuarioId : number,
        statusEmpresa : boolean,
        erroLogin : boolean,
        accessToken : string

    ) {
        this.dominio = dominio;
        this.usuarioId = usuarioId;
        this.bloqueado = bloqueado;
        this.nomeUsuario = nomeUsuario;
        this.idGrupoUsuario = idGrupoUsuario;
        this.empresaUsuarioId = empresaUsuarioId;
        this.statusEmpresa = statusEmpresa;
        this.erroLogin = erroLogin;
        this.accessToken = accessToken;
        
    }

}