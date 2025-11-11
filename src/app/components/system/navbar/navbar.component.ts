import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NavItem } from '../../../interfaces/navitem';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgFor,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

    isLoggedIn = false;
    isAdmin = false;
    loggedUserName = '';

    constructor(
      private auth: AuthService,
    ){}

    navItems:NavItem[] = []

    ngOnInit():void{
      this.auth.isLoggedIn$.subscribe(res =>{
        this.isLoggedIn = res
        this.isAdmin = this.auth.isAdmin()
        
        if(this.isLoggedIn){
          this.loggedUserName = this.auth.loggedUser()[0].name;
        }
        console.log(res)
        this.setupMenu(res);
      })
    }

    setupMenu(isLoggedIn:Boolean){
      this.navItems=[
        ...(this.isLoggedIn)?[
        {
          name: 'Kategóriák',
          icon: 'bi-tags-fill',
          url:'categories'
        },
        {
          name: 'Tárcák',
          icon: 'bi-wallet',
          url:'wallets',
        },
        {
          name: 'Tranzakciók',
          icon: 'bi-arrow-down-up',
          url:'transactions',
        },
        {
          name: 'Profil',
          icon: 'bi-people-fill',
          url:'profile'
        },
        {
          name: 'Kilépés',
          icon: 'bi-box-arrow-left',
          url:'logout'
        },
      ] : [
        {
          name: 'Regisztráció',
          icon: 'bi-person-add',
          url:'registration'
        },
        {
          name: 'Belépés',
          icon: 'bi-box-arrow-in-right',
          url:'login'
        },
      ]
      ]
    }
}
