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

    constructor(
        id: number,
        dtCriacao : Date ,
        agendaid : number,
        intervalo : string,
        tipoHorario : number,
        diaDasemana : number,
        hora : string,
        criadoPor : number,
        bloqueado : boolean,
        naoDisponivel : boolean,
        horainicio : string,
        horafim : string
    ) {
        this.id = id;
        this.dtCriacao = dtCriacao;
        this.agendaid = agendaid;
        this.intervalo = intervalo;
        this.tipoHorario = tipoHorario;
        this.diaDasemana = diaDasemana;
        this.hora = hora;
        this.criadoPor = criadoPor;
        this.bloqueado = bloqueado;
        this.naoDisponivel = naoDisponivel;
        this.horainicio = horainicio;
        this.horafim = horafim;
    }
}