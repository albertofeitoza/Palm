//import { LoginService } from '../app/'
import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { UtilService } from './services/util.service';



@Component({
  selector: 'app-root',
templateUrl: 'app.conponent.html'
})
export class AppComponent {
  nome = 'Palm';

mostrarMenu : boolean = false; 
mostrarlogin : boolean = true; 

constructor(private authService : LoginService,
            private servico : UtilService
            ){

}

ngOnInit(){
  this.mostramenu()
  this.mostraLogin()
}

  mostramenu(){
        this.authService.mostrarMenuEmitter.subscribe(
          mostrar => this.mostrarMenu = mostrar
      );
      if(this.mostrarMenu){
        this.mostrarlogin = false;
        this.servico.showMessage("Bem Vindo", false)
      }
          

          
  }

  mostraLogin () {
      this.authService.mostrarLoginEmitter.subscribe(
        mostrarLogin => this.mostrarlogin = mostrarLogin
      );
      if(this.mostrarlogin)
        this.mostrarMenu = false;
  }
}



