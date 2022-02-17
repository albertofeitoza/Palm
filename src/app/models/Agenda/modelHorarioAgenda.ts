import { Time } from "@angular/common"
import { TimeInterval } from "rxjs"
import { Timestamp } from "rxjs/internal/operators/timestamp"
import { Horarios } from "./modeloHorarios"

export class HorarioAgenda{
    id?: number
    dtCriacao : Date
    agendaid : number
    intervalo : string
    tipoHorario : number
    diaDasemana : number
    hora : string
    criadoPor : number
    bloqueado : boolean
    naoDisponivel : boolean
    horainicio : string
    horafim : string
}