import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
opened = false;
  
  constructor(private auth: LoginService) { }

  ngOnInit(): void {
  
  }

  sairSistema(){
    
    this.auth.sairSistema();
    
  }

 

}
