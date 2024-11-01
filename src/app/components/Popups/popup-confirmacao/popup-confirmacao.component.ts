import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-confirmacao',
  templateUrl: './popup-confirmacao.component.html',
  styleUrls: ['./popup-confirmacao.component.css']
})
export class PopupConfirmacaoComponent implements OnInit {

  mensagem = '';

  constructor(private matdialogRef: MatDialogRef<PopupConfirmacaoComponent>

  ) { }

  ngOnInit(): void {
    this.mensagem = this.matdialogRef._containerInstance._config.data.object;
  }

  public FecharPopup(confirm: boolean): void {
    this.matdialogRef.close(confirm)
  }
}
