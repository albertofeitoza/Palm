import { Usuario } from "./modelLogin"

export class GrupoUsuario{
    id? : number
    dtCriacao : Date
    nome : string
    usuarioApp : boolean
    criadoPor : number
    bloqueado : boolean
    usuarios : Array<Usuario>

    constructor(id : number,
        dtCriacao : Date,
        nome : string,
        usuarioApp : boolean,
        criadoPor : number,
        bloqueado : boolean,
        usuarios : Array<Usuario>
        ) 
        {
            this.id = id
            this.dtCriacao = dtCriacao
            this.nome = nome
            this.usuarioApp = usuarioApp
            this.criadoPor = criadoPor
            this.bloqueado = bloqueado
            this.usuarios = usuarios
        }
}