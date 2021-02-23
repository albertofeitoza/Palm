export enum Aplicacao{
  Agenda = 'Agenda',
  Vendas = 'Vendas',
  Cartões = 'Cartões'
}

export const TipoAplicacao = new Map<string, string>([
  ['Agenda', 'Agenda'],
  ['FrenteCaixa', 'FrenteCaixa'],
  ['Cartões', 'Cartões'],

])