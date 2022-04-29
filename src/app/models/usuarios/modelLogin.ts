import { Agenda } from "../Agenda/modelAgenda";
import { GrupoUsuario } from "./GrupoUsuarios";

export class Usuario {
    id: number
    dtCriacao : Date;
    nome: string
    login : string
    senha : string
    cracha : string
    bolSistema:  boolean
    bolResetaSenha : boolean
    dataTrocaSenha : Date
    criadoPor : number
    bloqueado : boolean
    empresaid : string
    grupoUsuarioid : string
    profissional : boolean
    agendas : Array<Agenda>
    grupoUsuario : Array<GrupoUsuario>

}

