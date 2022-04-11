
export class Agendamentos {
    id ? : number
    dtCriacao : Date
    horaAgendada : Date
    nome: string
    responsavel: string
    cpf: string
    rg: string
    dataNascimento: Date
    telefone: number
    celular: number
    email: string
    agendaid: number
    empresaid: number
    statusAgendamento: number
    protocoloid : number
    criadoPor: number

    constructor(
        id : number,
        dtCriacao : Date,
        horaAgendada : Date,
        nome: string,
        responsavel: string,
        cpf: string,
        rg: string,
        dataNascimento: Date,
        telefone: number,
        celular: number,
        email: string,
        agendaid: number,
        empresaid: number,
        statusAgendamento: number,
        protocoloid : number,
        criadoPor: number
    ) {
        this.id = id;
        this.dtCriacao = dtCriacao;
        this.horaAgendada = horaAgendada;
        this.nome = nome;
        this.responsavel = responsavel;
        this.cpf = cpf;
        this.rg = rg;
        this.dataNascimento = dataNascimento;
        this.telefone = telefone;
        this.celular = celular;
        this.email = email;
        this.agendaid = agendaid;
        this.empresaid = empresaid;
        this.statusAgendamento = statusAgendamento;
        this.protocoloid = protocoloid;
        this.criadoPor = criadoPor;
        
    }
}

