import { Component } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
templateUrl: 'app.conponent.html'
})
export class AppComponent {
  nome = 'Palm';

mostrarMenu : boolean = false; 
mostrarlogin : boolean = true; 

constructor(private authService : LoginService){

}

ngOnInit(){
    this.authService.mostrarMenuEmitter.subscribe(
        mostrar => this.mostrarMenu = mostrar
    );

    this.authService.mostrarLoginEmitter.subscribe(
        mostrarLogin => this.mostrarlogin = mostrarLogin
    );
}




}



