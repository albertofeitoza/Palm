export class ItensAgendados {
    id: number;
    agendaCatalogoId: number;
    horarioId: number;
    agendamentoId: number;
    nome: string;
    codigo: string;
    codigoBarras: string;
    qrCode: string;
    data: Date;
    hora: string;
    seg: number;
    ter: number;
    qua: number;
    qui: number;
    sex: number;
    sab: number;
    dom: number;
    valor: number;
    statusItem: number;
    agendaCatalogo: null;
    horario: null;
    agendamento: null;
    itensAgendadoAtividades: ItensAgendadoAtividade[];
}

export class ItensAgendadoAtividade {
    id: number;
    dataCriacao: Date;
    agendaId: null;
    agendamentosId: null;
    itensAgendadosId: number;
    historico: string;
}
