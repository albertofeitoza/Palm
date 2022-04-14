import { dadosSessao } from "../Token/dadosSessao";

export enum TipoUsuario {
    Administrador = 1,   
    Sistema = 2,
    Usuario = 3,
    Master = 4,
}

export const TipoUsuarioSistema = new Map<string, number>([
['Administrador', Number(1)],
['Sistema', Number(2)],
['Usuario', Number(3)],
['Master', Number(4)]
])
 
