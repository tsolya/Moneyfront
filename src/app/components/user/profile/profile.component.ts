import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APIService } from '../../../services/api.service';
import { User } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
    constructor(
      private api: APIService,
      private auth: AuthService,
      private msg: MessageService
    ){}
    
    loggeduser = this.auth.loggedUser()[0]
    updUser: User = {
      id: 0,
      name: '',
      email: '',
      role: ''
    }

    ngOnInit(): void {
      this.loadUserData();
    }

    loadUserData(): void {
      // betöltjük a jelenlegi user adatait
      if(this.loggeduser){
        this.updUser = {
          id: this.loggeduser.id,
          name: this.loggeduser.name || '',
          email: this.loggeduser.email || '',
          role: this.loggeduser.role || ''
        };
      }
    }

    async profUpdate(): Promise<void> {
      try {
        if(!this.updUser.name){
          this.msg.show('danger', 'Hiba', 'A név nem lehet üres!');
          return;
        }
        if(!this.updUser.email){
          this.msg.show('danger', 'Hiba', 'Az email nem lehet üres!');
          return;
        }
        const res = await this.api.Update('users', this.loggeduser.id, this.updUser);
        
        if(res && res.status === 200){
          this.msg.show('success', 'OK', 'Profil sikeresen frissítve!');

          const updatedLoggedUser = {
            ...this.loggeduser,
            name: this.updUser.name,
            email: this.updUser.email,
          };
          this.auth.storeUser(JSON.stringify(updatedLoggedUser))
        } else {
          this.msg.show('danger', 'Hiba', res?.message || 'A profil frissítése sikertelen');
        }
      } catch(err: any){
        console.error('profUpdate error', err);
        this.msg.show('danger', 'Hiba', err?.message || 'Ismeretlen hiba történt');
      }
    }
}
