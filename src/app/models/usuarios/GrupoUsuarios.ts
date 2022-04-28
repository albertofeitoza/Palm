import { Usuario } from "./modelLogin"

export class GrupoUsuario{
    id? : number
    dtCriacao : Date
    nome : string
    usuarioApp : boolean
    criadoPor : number
    bloqueado : boolean
    usuarios : Array<Usuario>
}