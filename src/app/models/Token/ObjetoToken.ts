import { GrupoUsuario } from './../usuarios/GrupoUsuarios';
export interface ObjetoToken{

    id : string
    empresaId : string
    grupoUsuarioId : string
    token : string
    bloqueado : string
    statusEmpresa : boolean
    gruposUsuarios : Array<GrupoUsuario>
}