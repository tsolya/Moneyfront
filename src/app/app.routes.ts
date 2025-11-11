import { Routes } from '@angular/router';
import { NotfoundComponent } from './components/system/notfound/notfound.component';
import { LoginComponent } from './components/user/login/login.component';
import { LogoutComponent } from './components/user/logout/logout.component';
import { LostpassComponent } from './components/user/lostpass/lostpass.component';
import { PassmodComponent } from './components/user/passmod/passmod.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { WalletsComponent } from './components/user/wallets/wallets.component';
import { AddwalletComponent } from './components/user/addwallet/addwallet.component';
import { TransactionsComponent } from './components/user/transactions/transactions.component';
import { NewtransactionComponent } from './components/user/newtransaction/newtransaction.component';
import { CategorieslistComponent } from './components/user/categorieslist/categorieslist.component';
import { AddcategoryComponent } from './components/user/addcategory/addcategory.component';

export const routes: Routes = [
    //General routeok
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'lostpass', component:LostpassComponent},
    {path: 'passmod', component:PassmodComponent},
    {path: 'profile', component:ProfileComponent},

    //User routeok
    {path: 'wallets', component:WalletsComponent},
    {path: 'addwallet', component:AddwalletComponent},
    {path: 'transactions', component:TransactionsComponent},
    {path: 'newtransaction/:id', component:NewtransactionComponent},
    {path: 'categories', component:CategorieslistComponent},
    {path: 'addcategory', component:AddcategoryComponent},



    //Kivételes routeok
    {path: '', redirectTo: "/login", pathMatch: 'full'},
    {path: '**', component:NotfoundComponent}
    
];
