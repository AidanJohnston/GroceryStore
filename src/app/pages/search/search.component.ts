import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
<<<<<<< Updated upstream
import { Item } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/services/items.service';
=======
>>>>>>> Stashed changes

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
<<<<<<< Updated upstream
  searchTerm: String = "";
  constructor(private route: ActivatedRoute, private router:Router, private itemService:ItemsService) { }
   items: Item[]=[];
=======

  searchTerm: String = "";
  constructor(private route: ActivatedRoute, private router:Router) { }

>>>>>>> Stashed changes
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['searchTerm'])
        this.searchTerm = params['searchTerm'];
    })
<<<<<<< Updated upstream
    this.itemService.updateDB().then(res =>{
      this.items=JSON.parse(localStorage.getItem('items')||'{ }');
    });
=======
>>>>>>> Stashed changes
  }

  search():void{
    if(this.searchTerm)
    this.router.navigateByUrl('/search/' + this.searchTerm);
<<<<<<< Updated upstream
  }
=======
>>>>>>> Stashed changes
  }
  
  

