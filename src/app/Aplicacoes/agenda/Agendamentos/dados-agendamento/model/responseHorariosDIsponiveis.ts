export class ResponseHorariosDisponiveis {
    id: number;
    agendaCatalogoId: number;
    nome: string;
    codigoBarras: string;
    qrCode: string;
    codigo: string;
    agendaDisponivel: AgendaDisponivel;
}

export class AgendaDisponivel {
    id: number;
    nomeAgenda: string;
    unidadeId: number;
    salaId: number;
    pessoaId: number;
    grupoAgendaId: number;
    horariosDisponiveis: HorariosDisponiveis[];
}

export class HorariosDisponiveis {
    id: number;
    data: Date;
    tipoHorario: number;
    diaDasemana: number;
    hora: string;
}
