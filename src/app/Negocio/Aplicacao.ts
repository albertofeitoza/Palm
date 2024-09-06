export enum Aplicacao{
  Agenda = 'Agenda',
  Cartões = 'Cartões',
  Vendas = 'Vendas',
}

export const TipoAplicacao = new Map<string, string>([
  ['Agenda', 'Agenda'],
  ['Cartões', 'Cartões'],
  ['FrenteCaixa', 'FrenteCaixa'],
  ['Octoplex', 'Octoplex']
  
])