
export class Agenda {
    id:                number;
    dtCriacao:         Date;
    nomeAgenda:        string;
    empresaId:         number;
    unidadeId:         number;
    salaId:            number;
    pessoaId:          number;
    substituicao:      boolean;
    grupoAgendaId:     number;
    vigenciaInicio:    Date;
    vigenciaFim:       Date;
    considerarFeriado: boolean;
    bloqueado:         boolean;
}
