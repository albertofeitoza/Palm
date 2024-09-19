import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceAllService } from 'src/app/services/service-all.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-agenda-associar-catalogo',
  templateUrl: './agenda-associar-catalogo.component.html',
  styleUrls: ['./agenda-associar-catalogo.component.css']
})
export class AgendaAssociarCatalogoComponent implements OnInit {


  dados: any;

  constructor(
    private matdialogRef: MatDialogRef<AgendaAssociarCatalogoComponent>,
    private serverApi: ServiceAllService<any>,
    private serviceUtil: UtilService
  ) { }

  ngOnInit(): void {
    this.dados = this.matdialogRef._containerInstance._config.data.object.id;
  }

  


}
