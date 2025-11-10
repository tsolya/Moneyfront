import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


import { FormsModule } from '@angular/forms'

import { APIService } from '../../../services/api.service';
import { User } from '../../../interfaces/user';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterModule,
    FormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

    

    acceptTerms: boolean = false;

    newUser: User={
      id: 0,
      name: '',
      email: '',
      password: '',
      confirm: '',
      role: 'user'
    }

    constructor(
      private api: APIService,
      private message: MessageService,
      private router: Router
    ){}
    register(){
      if(!this.acceptTerms)
        {
          this.message.show('danger','Hiba','Nem fogadtad el a szabályzatot!')
          return
        }
      this.api.Registration('users', this.newUser).then(res =>{
        if(res.status == 500){
          this.message.show('danger','Hiba',res.message)
          return
        }
        this.message.show('success','OK',res.message)
        this.router.navigate(['login'])
      } )}
}
