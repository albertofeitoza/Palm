import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-agenda',
  templateUrl: './home-agenda.component.html',
  styleUrls: ['./home-agenda.component.css']
})
export class HomeAgendaComponent implements OnInit {

  constructor(private route : Router) { }

  ngOnInit(): void {
    this.route.navigate(['Agenda'])
  }
}
