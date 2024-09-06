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

}