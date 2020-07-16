import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chamado-crud',
  templateUrl: './chamado-crud.component.html',
  styleUrls: ['./chamado-crud.component.css']
})
export class ChamadoCrudComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  navigateToChamadoCreate():void{
    this.router.navigate(['chamados/read'])
  }

}
