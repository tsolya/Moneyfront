import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../../interfaces/category';
import { APIService } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categorieslist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categorieslist.component.html',
  styleUrl: './categorieslist.component.scss'
})
export class CategorieslistComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private api: APIService,
    private msg: MessageService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

   getCategories(): void {

      this.api.SelectAll('categories').then(res=>{
      if(res && res.status === 200){
        this.categories = res.data;
      } else {
        this.msg.show('danger', 'Hiba', 'Nem sikerült betölteni a kategóriákat');
      }
      })
    }

  async deleteCategory(id: number, name: string): Promise<void> {
    const confirm = window.confirm(`Biztosan törölni szeretnéd a "${name}" kategóriát?`);
    if(!confirm) return;

    
      await this.api.Delete('categories', id).then(res=>{
        if(res && res.status === 200){
        this.msg.show('success', 'OK', 'Kategória sikeresen törölve');
        this.getCategories();
      } else {
        this.msg.show('danger', 'Hiba', 'Nem sikerült törölni a kategóriát');
      }
      });
      
    
  }
}
