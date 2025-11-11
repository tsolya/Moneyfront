import { Component } from '@angular/core';
import { Category } from '../../../interfaces/category';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { APIService } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-addcategory',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.scss'
})
export class AddcategoryComponent {
  constructor(
    private api: APIService,
    private msg: MessageService,
    private Router: Router
  ) {}

  newCategory: Category = {
    id: 0,
    name: ''
  }

  addCategory(): void {
    if(this.newCategory.name == ''){
      this.msg.show('danger', 'HIBA', 'Nem adtál meg minden kötelező adatot!');
      return;
    }

    this.api.Insert('categories', this.newCategory).then(res => {
      if(res.status === 500){
        this.msg.show('danger', 'Hiba', res.message);
        return;
      }
      this.msg.show('success', 'OK', 'Kategória sikeresen létrehozva');
      this.newCategory = {
        id: 0,
        name: ''
      }
      this.Router.navigate(['/categories']);
    });
  }
}
