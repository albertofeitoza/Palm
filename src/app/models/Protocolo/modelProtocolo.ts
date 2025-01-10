export class Protocolo {
    id: number = 0;
    dtCriacao: Date = new Date;
    nome: string = '';
    tipoProtocolo: number;
    descricao: string = '';
    criadoPor: number;
    pessoaId: number;
    empresaId: number;
    idServico: number = 0;
    statusProtocolo: number;
    descricaoStatusProtocolo: string = ''; 
}
