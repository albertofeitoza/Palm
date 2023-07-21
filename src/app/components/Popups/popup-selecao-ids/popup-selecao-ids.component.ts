import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PopupSelecaoIds } from 'src/app/models/Popups/popupSelecaoIds';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-popup-selecao-ids',
  templateUrl: './popup-selecao-ids.component.html'
})
export class PopupSelecaoIdsComponent implements OnInit {



  constructor(
    private servico : UtilService,
    private dialofRef : MatDialogRef<PopupSelecaoIdsComponent>

  ) { }

  
  displayedColumns = ['check','Id','Nome','Codigo']
  dadosGrid : PopupSelecaoIds [] = new Array()
  teste : PopupSelecaoIds
  selected : number = 0;

  ngOnInit(): void {
    
    
    this.teste = new PopupSelecaoIds()
    
    this.teste.check = true;
    this.teste.Id = 1;
    this.teste.Nome = 'Alberto',
    this.teste.Codigo = "ALB";
  
    this.dadosGrid.push(this.teste);

    this.teste = new PopupSelecaoIds()

    this.teste.check = true;
    this.teste.Id = 2;
    this.teste.Nome = 'Kelly',
    this.teste.Codigo = "KEL";
    this.dadosGrid.push(this.teste);
  }

  Adicionar(){

    let componente = this.dialofRef.componentInstance

    this.dialofRef.afterClosed().subscribe(x => {
      
      
      
      this.fecharPopup()
    });
  }

  selecionaLinha(id : any){

  }

  fecharPopup(){
    
    this.dialofRef.close();
  }

}
