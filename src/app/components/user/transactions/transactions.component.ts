import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Transaction } from '../../../interfaces/transaction';
import { APIService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';
import { Wallet } from '../../../interfaces/wallet';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  transactions: Transaction[] = []
  wallets : Wallet[] = []
  loggeduser = this.auth.loggedUser()[0]
   ids : number[] = []
  constructor(
    private api: APIService,
    private msg: MessageService,
    private auth: AuthService
  ){}
async ngOnInit(): Promise<void> {
    await this.getWallets()
    this.getTransactions()
    
  } 
  async getTransactions(){
    await this.getIds()
    this.api.Transactionget("transactions/"+this.ids.toString()).then(res =>{
      this.transactions = res.data
    })
  }
  async getWallets(){
    await this.api.Select("wallets/userId/eq",this.loggeduser.id).then(res =>{
      this.wallets = res.data
    })
    
  }
  getIds(){
    this.wallets.forEach(wallet => {
      this.ids.push(wallet.id)
    });
    
  }
}
