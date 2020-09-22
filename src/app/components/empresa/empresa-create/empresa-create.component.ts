import { UtilService } from './../../../services/util.service';
import { Contato } from './../../../models/contato/modelContato';
import { ContatoService } from './../../../services/contato.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-empresa-create',
  templateUrl: './empresa-create.component.html',
  styleUrls: ['./empresa-create.component.css']
})
export class EmpresaCreateComponent implements OnInit {

  contato : Contato
  formulario : FormGroup;



  constructor(private formbuilder: FormBuilder,
              private servicoContato : ContatoService,
              private utilService : UtilService) { }

  ngOnInit(): void {

      this.configurarFormulario();

    

  }

  configurarFormulario(){

    this.formulario = this.formbuilder.group({
      nome : [null, Validators.required],
      email : [null,[Validators.required, Validators.email]],
      emailsecundario : [null, Validators.email],

    })

  }

  criar(){
  
    this.servicoContato.criar(this.formulario.value).subscribe(contato => {
      this.contato = contato;
      this.formulario.reset();
      this.utilService.showMessage("Contato Criado com sucesso!",false);
    })
  
  }


}
