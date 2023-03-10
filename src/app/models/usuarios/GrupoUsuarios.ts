import { Usuario } from "./modelLogin"

export class GrupoUsuario{
    id? : number
    dtCriacao : Date
    nome : string
    TipoUsuario : number
    usuarioApp : boolean
    criadoPor : number
    bloqueado : boolean
}