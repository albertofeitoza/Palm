export class Faturamento{
id: number
DtCriacao: Date
CriadoPor: number
Servico: string
Produtoid: number
Empresaid: number
Valor: number 
ValorDesconto: number
VigenciaInicio: Date
VigenciaFim: Date
bloqueado: boolean
TipoBloqueio: number
MotivoBloqueio: string

constructor(
    id: number,
    DtCriacao: Date,
    CriadoPor: number,
    Servico: string,
    Produtoid: number,
    Empresaid: number,
    Valor: number ,
    ValorDesconto: number,
    VigenciaInicio: Date,
    VigenciaFim: Date,
    bloqueado: boolean,
    TipoBloqueio: number,
    MotivoBloqueio: string
) 
{
    this.id = id;
    this.DtCriacao = DtCriacao;
    this.CriadoPor = CriadoPor;
    this.Servico = Servico;
    this.Produtoid = Produtoid;
    this.Empresaid = Empresaid;
    this.Valor = Valor;
    this.ValorDesconto = ValorDesconto;
    this.VigenciaInicio = VigenciaInicio;
    this.VigenciaFim = VigenciaFim;
    this.bloqueado = bloqueado;
    this.TipoBloqueio = TipoBloqueio;
    this.MotivoBloqueio = MotivoBloqueio;
}


}