import { GrupoUsuario } from './../usuarios/GrupoUsuarios';
export interface ObjetoToken{

    id : string
    empresaid : string
    grupoUsuarioid : string
    token : string
    bloqueado : string
    statusEmpresa : boolean
    gruposUsuarios : Array<GrupoUsuario>
}