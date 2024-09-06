import { TipoPessoa } from '../../../../Negocio/TipoPessoa';
import { Endpoint } from '../../../../Negocio/Endpoint';
import { TipoUsuario } from '../../../../models/usuarios/enumUsuarios';
import { Empresa } from '../../../../models/empresa/ModelEmpresa';
import { ServiceAllService } from '../../../../services/service-all.service';
import { Router } from '@angular/router';
import { UtilService } from '../../../../services/util.service';
import { Contato } from '../../../../models/contato/modelContato';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { DadosLogados } from 'src/app/models/usuarios/modelUsuarios';

@Component({
  selector: 'app-empresa-create',
  templateUrl: './empresa-create.component.html',
  styleUrls: ['./empresa-create.component.css']
})
export class EmpresaCreateComponent implements OnInit {


  empresa: Empresa = new Empresa();
  dadosLogados: DadosLogados = new DadosLogados();
  tipoPessoa: any[]
  constructor(private utilService: UtilService,
    private router: Router,
    private servicoEmpresa: ServiceAllService<Empresa>,
    public dialofRef: MatDialogRef<EmpresaCreateComponent>,
    private auth: LoginService
  ) { }

  ngOnInit(): void {
    this.dadosLogados = this.auth.dadosUsuario;
    this.CarregarCombos()
    this.BuscarEmpresa(this.dialofRef.id)
  }

  private BuscarEmpresa(id: string): void {

    if (id && Number(id) > 0) {
      this.servicoEmpresa.readById(id, Endpoint.Empresa)
        .subscribe((result: Empresa) => {
          this.empresa = result;
        })
    }

  }

  public cadastrarEmpresa(): void {

    this.empresa.criadoPor = Number(this.dadosLogados.IdUsuario);
    this.empresa.dtCriacao = new Date;
    this.empresa.empresaPai = this.dadosLogados.EmpresaId;

    if (this.empresa.tipoPessoa == 0) {
      this.utilService.showMessage("Informe o tipo de pessoa", true)
      return;
    }

    if (this.empresa.tipoPessoa == TipoPessoa.PessoaFisica) {
      if (!cpf.isValid(this.empresa.cpfCnpj)) {
        this.utilService.showMessage("Cpf Inválido", true)
        return;
      }
    } else {
      if (!cnpj.isValid(this.empresa.cpfCnpj)) {
        this.utilService.showMessage("cnpj Inválido", true)
        return;
      }
    }

    if (this.dadosLogados.TipoUsuarioLogado == TipoUsuario.Usuario) {
      this.utilService.showMessage("Você não possui permissão para cadastro de novas empresas", false)
      return;
    }

    if (this.empresa.id === 0) {
      this.servicoEmpresa.readById(this.empresa.cpfCnpj, Endpoint.Empresa + `/buscarporcpfcnpj`)
        .subscribe((result: Empresa) => {

          if (result && result.id === 0) {

            if (this.dadosLogados.TipoUsuarioLogado == TipoUsuario.Administrador) {
              this.empresa.status = true;
              this.servicoEmpresa.create(this.empresa, Endpoint.Empresa)
                .subscribe(() => {
                  this.utilService.showMessage("Empresa cadastrada com sucesso!", false);
                  this.fecharPopup();
                })
            }
            else if (this.dadosLogados.TipoUsuarioLogado == TipoUsuario.MasterEmpresa && this.dadosLogados.EmpresaPai === 0) {
              this.empresa.empresaPai = this.dadosLogados.EmpresaId;
              this.empresa.status = false
              this.servicoEmpresa.create(this.empresa, Endpoint.Empresa)
                .subscribe(() => {
                  this.utilService.showMessage("Empresa cadastrada com sucesso!", false);
                  this.fecharPopup();
                })
            } else {
              this.utilService.showMessage("Para criação de uma empresa precisa está logado com a Matriz.!", false);
            }
          } else {
            this.utilService.showMessage(`Esse Cpf/cnpj já está cadastrado para empresa ${result.razaoSocial} e o Status está  ${result.status ? 'Ativo' : 'Inativo'}`, true);
          }
        });
    } else {
      this.servicoEmpresa.create(this.empresa, Endpoint.Empresa)
        .subscribe(() => {
          this.utilService.showMessage("dados alterados com sucesso!", false);
          this.fecharPopup();
        });
    }
  }

  private CarregarCombos(): void {
    this.tipoPessoa = this.utilService.TipoPessoa();
  }

  fecharPopup() {
    this.dialofRef.close()
  }

}
