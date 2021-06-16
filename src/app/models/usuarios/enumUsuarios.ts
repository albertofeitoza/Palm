import { convertActionBinding, ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { map } from 'rxjs/operators';

export enum TipoUsuario {
    
    Administrador =  Number(localStorage.getItem("grpUsGrpAdm")),
    Sistema = Number(localStorage.getItem("grpUsGrpsis")),
    Usuario = Number(localStorage.getItem("grpUsGrpUs")),
    Master = Number(localStorage.getItem("grpUsGrpMs")),
}

export const TipoUsuarioSistema = new Map<string, number>([
['Administrador', Number(localStorage.getItem("grpUsGrpAdm"))],
['Sistema', Number(localStorage.getItem("grpUsGrpsis"))],
['Usuario', Number(localStorage.getItem("grpUsGrpUs"))],
['Master', Number(localStorage.getItem("grpUsGrpMs"))]
])
