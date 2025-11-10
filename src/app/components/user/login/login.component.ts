import { Component } from '@angular/core';
import { Route, Router, RouterLink, RouterModule } from "@angular/router";

import { APIService } from '../../../services/api.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  user: User ={
    id: 0,
    name: '',
    email: '',
    password: '',
    confirm: '',
    role: '',
  }

  rememberMe : boolean = false;

  constructor(
    private api: APIService,
    private auth: AuthService,
    private message: MessageService,
    private router: Router
  ){}

    login(){
      this.api.Login('users',this.user).then(res=>{
        if(res.status == 500){
          this.message.show('danger','Hiba',res.message)
          return
        }
        if(this.rememberMe){
          this.auth.storeUser(JSON.stringify(res.data))
        }

        this.auth.login(JSON.stringify(res.data));
        this.router.navigate(['/wallets'])
      })
    }
}
