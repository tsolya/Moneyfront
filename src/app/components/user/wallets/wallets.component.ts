import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Wallet } from '../../../interfaces/wallet';
import { APIService } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wallets',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './wallets.component.html',
  styleUrl: './wallets.component.scss'
})
export class WalletsComponent implements OnInit{
  wallets: Wallet[] = []
  loggeduser = this.auth.loggedUser()[0]
  constructor(
    private api: APIService,
    private msg: MessageService,
    private auth: AuthService
  ){}
ngOnInit(): void {
    this.getWallets()
  } 
  getWallets(){
    this.api.Select("wallets/userId/eq",this.loggeduser.id).then(res =>{
      this.wallets = res.data
    })
  } 
}
