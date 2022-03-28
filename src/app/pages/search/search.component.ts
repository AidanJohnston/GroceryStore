import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm: String = "";
  constructor(private route: ActivatedRoute, private router:Router, private itemService:ItemsService) { }
   items: Item[]=[];
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['searchTerm'])
        this.searchTerm = params['searchTerm'];
    })
    this.itemService.updateDB().then(res =>{
      this.items=JSON.parse(localStorage.getItem('items')||'{ }');
    });
  }

  search():void{
    if(this.searchTerm)
    this.router.navigateByUrl('/search/' + this.searchTerm);
  }
  }
  
  

