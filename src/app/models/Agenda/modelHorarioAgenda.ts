import { Time } from "@angular/common"

export class HorarioAgenda{
    id: number
    dtCriacao : Date
    id_agenda : number
    id_empresa : number
    intervalo : string
    tipoHorario : number
    diaDasemana : number
    hora : string
    criadoPor : number
    bloqueado : boolean
    naoDisponivel : boolean
    horainicio : Time
    horafim : Time
}