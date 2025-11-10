import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APIService } from '../../../services/api.service';
import { User } from '../../../interfaces/user';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
    constructor(
      private api: APIService
    ){}
    updUser: User = {
      id: 0,
      name: '',
      email: '',
      password: '',
      confirm: '',
      role: ''
    }
  profUpdate(){}
}
