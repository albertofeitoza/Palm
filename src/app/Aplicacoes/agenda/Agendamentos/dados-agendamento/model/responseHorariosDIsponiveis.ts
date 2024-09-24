export class ResponseHorariosDisponiveis {
    id: number;
    dtCriacao: Date;
    catalogoServicosId: number;
    agendaId: number;
    agenda: Agenda;
}

export class Agenda {
    id: number;
    dtCriacao: Date;
    nomeAgenda: string;
    empresaId: number;
    unidadeId: number;
    salaId: number;
    pessoaId: number;
    substituicao: boolean;
    grupoAgendaId: number;
    vigenciaInicio: Date;
    vigenciaFim: Date;
    considerarFeriado: boolean;
    bloqueado: boolean;
    agendaHorarios: AgendaHorario[];
}

export class AgendaHorario {
    id: number;
    data: Date;
    agendaId: number;
    intervalo: string;
    tipoHorario: number;
    diaDasemana: number;
    hora: string;
    criadoPor: number;
    bloqueado: boolean;
    naoDisponivel: boolean;
    horaInicio: string;
    horaFim: string;
    bloqueadoEmTela: boolean;
}
