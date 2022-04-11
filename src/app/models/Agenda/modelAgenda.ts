export class Agenda {
    id : number
    DtCriacao: Date 
    nomeAgenda: string
    usuarioid: string
    empresaid: number
    unidadeid : number
    salaid : number
    substituicao: Boolean
    grupoAgendaid: number
    vigenciaInicio: Date
    vigenciaFim: Date
    considerarFeriado: Boolean
    bloqueado: Boolean
 
    constructor(
        id: number,
        DtCriacao: Date ,
        nomeAgenda: string,
        usuarioid: string,
        empresaid: number,
        unidadeid : number,
        salaid : number,
        substituicao: Boolean,
        grupoAgendaid: number,
        vigenciaInicio: Date,
        vigenciaFim: Date,
        considerarFeriado: Boolean,
        bloqueado: Boolean

    ) {
        this.id = id;
        this.DtCriacao = DtCriacao;
        this.nomeAgenda = nomeAgenda;
        this.usuarioid = usuarioid;
        this.empresaid = empresaid;
        this.unidadeid = unidadeid;
        this.salaid = salaid;
        this.substituicao = substituicao;
        this.grupoAgendaid = grupoAgendaid;
        this.vigenciaInicio = vigenciaInicio;
        this.vigenciaFim = vigenciaFim;
        this.considerarFeriado = considerarFeriado;
        this.bloqueado = bloqueado;
        
        
    }
}
