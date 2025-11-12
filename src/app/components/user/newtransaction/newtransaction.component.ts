import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { APIService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';
import { Category } from '../../../interfaces/category';
import { Wallet } from '../../../interfaces/wallet';
import { Transaction } from '../../../interfaces/transaction';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-newtransaction',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './newtransaction.component.html',
  styleUrl: './newtransaction.component.scss'
})
export class NewtransactionComponent implements OnInit{
  categories: Category[] = []
  wallet: Wallet = { id: 0, userId: 0, name: '', balance: 0 }
  selectedWallet: number = 0
  newTransaction: Transaction = { id: 0, walletId: 0, amount: 0, categoryId: 0, type: true }

  constructor(
    private api: APIService,
    private msg: MessageService,
    private auth: AuthService,
    private Router: Router,
    private route: ActivatedRoute
  ){}

  async ngOnInit(): Promise<void> {
    this.selectedWallet = Number(this.route.snapshot.params['id']) || 0;
    await this.getWallet();
    await this.getCategories();
    console.log(this.wallet)
  }

  async getWallet(): Promise<void> {
    await this.api.Select('wallets', this.selectedWallet).then(res=>{
      if(res && res.status === 200){
        this.wallet = res.data[0];
        this.newTransaction.walletId = this.wallet.id;
      }
    })
    
  }

  async getCategories(): Promise<void> {
    await this.api.SelectAll('categories').then(res=>{
      if(res && res.status === 200){
        this.categories = res.data || [];
      }
    })
    
  }

  async MakeTransaction(): Promise<void> {
    
      const amount = Number(this.newTransaction.amount);
      if(!isFinite(amount) || amount <= 0){
        this.msg.show('danger','Hiba','Az összegnek pozitív számnak kell lennie!');
        return;
      }
      if(!this.newTransaction.categoryId || this.newTransaction.categoryId === 0){
        this.msg.show('danger','Hiba','Válassz kategóriát!');
        return;
      }

      const walletBalance = Number(this.wallet.balance);
      console.log('walletBalance:', walletBalance);
      if(!isFinite(walletBalance)){
        this.msg.show('danger','Hiba','A tárca egyenlege érvénytelen');
        return;
      }

      this.newTransaction.amount = amount;
      this.newTransaction.type = Boolean(this.newTransaction.type);

      this.api.Insert("transactions", this.newTransaction).then(res =>{
        if(res.status == 500){
          this.msg.show('danger','Hiba',res.message)
          return
        }

        const newBalance = this.newTransaction.type ? (walletBalance + amount) : (walletBalance - amount);

        const updatedWallet: Wallet = {
          id: this.selectedWallet,
          name: this.wallet.name,
          userId: this.auth.loggedUser()[0]?.id ?? this.wallet.userId,
          balance: Number(newBalance)
        }

        this.api.Update("wallets", this.selectedWallet, updatedWallet).then(res =>{
          if(res.status == 200){
            this.msg.show('success','OK',"Tranzakció létrehozva és a tárca frissítve")
            this.Router.navigate(['/wallets'])
          } else {
            this.msg.show('danger','Hiba',"A tranzakció létrejött, de a tárca frissítése sikertelen")
          }
        })
      })
    } 
  }