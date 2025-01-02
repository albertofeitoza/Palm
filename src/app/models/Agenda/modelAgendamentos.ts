export class ViewAgendamentos {
    id: number;
    horaAgendada: Date;
    nome: string;
    responsavel: string;
    dataNascimento: Date;
    telefone: string;
    celular: string;
    email: string;
    profissional: string;
    statusAgendamento: string;
    protocoloId: number;
    criadoPor: number;
    ura: string;
}

export class Agendamentos {
    id: number = 0;
    dtCriacao: Date = new Date;
    horaAgendada: Date = new Date;
    nome: string;
    responsavel: string;
    cpf: string;
    rg: string;
    dataNascimento: Date;
    telefone: string;
    celular: string;
    email: string;
    agendaId: number;
    statusAgendamento: number;
    protocoloId: number;
    criadoPor: number;
    pessoaId: number;
    ura: number;
    catalogoAgendado: CatalogoAgendado[];
}

export class CatalogoAgendado {
    id: number;
    agendaCatalogoId: number;
    horarioId: number;
    agendamentoId: number;
    nome: string;
    codigo: string;
    codigoBarras: string;
    qrCode: string;
    data?: Date;
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
}
