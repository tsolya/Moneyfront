import { Component } from '@angular/core';
import { Wallet } from '../../../interfaces/wallet';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { APIService } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-addwallet',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './addwallet.component.html',
  styleUrl: './addwallet.component.scss'
})
export class AddwalletComponent {
  constructor(
    private api : APIService,
    private msg: MessageService,
    private auth: AuthService,
    private Router: Router
  ){}
  loggeduser = this.auth.loggedUser()

  newWallet:Wallet = {
    id: 0,
    userId: 0,
    name: '',
    balance: 0
  }

  addwallet(){
    if(this.newWallet.name == ""){
      this.msg.show("danger",'HIBA',"Nem adtál meg minden kötelező adatot!")
      return
    }
    
    this.newWallet.userId = this.loggeduser[0].id

    this.api.Insert("wallets", this.newWallet).then(res =>{
      if(res.status == 500){
          this.msg.show('danger','Hiba',res.message)
          return
        }
      this.msg.show('success','OK',"Tárca sikeresen létrehozva")
      this.newWallet = {
        id: 0,
        userId: 0,
        name: '',
        balance: 0
      }
      this.Router.navigate(['/wallets'])
    })

  }
}
