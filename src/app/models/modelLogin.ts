import { Empresa } from './empresa/ModelEmpresa';
import { Contato } from './contato/modelContato';
export class Usuario {
Id ? :string
DtCriacao : Date
Nome : string
Login : string
Senha : string
Cracha : string
BolSistema: boolean
BolResetaSenha : boolean
DataTrocaSenha : Date
CriadoPor : number
Bloqueado : boolean
EmpresaId : string
GrupoUsuarioId : number
contato : Contato

}
