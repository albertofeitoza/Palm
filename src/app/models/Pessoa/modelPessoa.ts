export class Pessoa {
    id ? : number
    DtCriacao : Date
    nome : string
    tipoPessoa : number
    cpf : string
    rg : string
    dataNascimento : Date
    responsavel : string
    parentesco : string
    estCivil : number
    sexo : number
    empresaid : number
    /**
     *
     */
    constructor(
        id  : number,
        DtCriacao : Date,
        nome : string,
        tipoPessoa : number,
        cpf : string,
        rg : string,
        dataNascimento : Date,
        responsavel : string,
        parentesco : string,
        estCivil : number,
        sexo : number,
        empresaid : number

    ) {
        this.id = id;
        this.DtCriacao = DtCriacao;
        this.nome = nome;
        this.tipoPessoa = tipoPessoa;
        this.cpf = cpf;
        this.rg = rg;
        this.dataNascimento = dataNascimento;
        this.responsavel = responsavel;
        this.parentesco = parentesco;
        this.estCivil = estCivil;
        this.sexo = sexo;
        this.empresaid = empresaid;
        
    }
}

