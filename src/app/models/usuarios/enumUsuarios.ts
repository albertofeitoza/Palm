import { map } from 'rxjs/operators';

export enum TipoUsuario {
    
    Administrador = 1,
    Sistema = 2,
    Usuario = 3,
    Master = 4,
}

export const TipoUsuarioSistema = new Map<string, number>([
['Administrador',1],
['Sistema', 2],
['Usuario',3],
['MasterEmpresa',4]

])
