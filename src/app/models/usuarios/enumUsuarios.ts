
export enum TipoUsuario {
    Administrador = 1,   
    MasterEmpresa = 2,
    Usuario = 3
}

export const TipoUsuarioSistema = new Map<string, number>([
['Administrador', Number(1)],
['Sistema', Number(2)],
['Usuario', Number(3)],
['Master', Number(4)]
])
 
