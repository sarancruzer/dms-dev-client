import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { TerritoryService } from "app/_service/territory.service";
import { Territory } from "app/_model/territory";
import { IsuccessError } from "../../../_interface/isuccess-error.model";


@Component({
  selector: 'app-territory',
  templateUrl: './territory.component.html',
  styleUrls: ['./territory.component.css'],
  providers : [TerritoryService]
})


export class TerritoryComponent implements OnInit {
  
  territory = new Territory();
  items:any;
  title:string;
  page: number = 1;
  total: number;
  q:any;
  
  lSuccess : any;
  cSuccess : any;
  rSuccess : any;
  uSuccess : any;
  dSuccess : any;

  lError : any;
  cError:any;
  rError:any;
  uError:any;
  dError:any;

  @ViewChild('createModal') public createModal:ModalDirective;
  @ViewChild('editModal') public editModal:ModalDirective;
  

  constructor(private _territoryService:TerritoryService) {
    this.title = "Territory";
    this.q = "";
    
   }

  ngOnInit() {
    this.loadTerritory(1);
  }

  loadTerritory(page) {
    this._territoryService.getTerritory(page,this.q).subscribe(     
      (res) => {
           this.items = res['result']['info']['data'];
           this.total = res['result']['info']['total'];;
           this.page = res['result']['info']['current_page'];;
      },
    (err) => { 
       this.lError = err;
    }) 
 }

  create(){
    this._territoryService.addTerritory(this.territory).subscribe(     
      (res) => {
           this.cSuccess = res['result']['info']['msg'];
           this.loadTerritory(this.page);
           this.createModal.hide();
           
      },
    (err) => { 
        this.cError = err;
    }) 
  }

  edit(data){
    this.editModal.show();
    this.territory.id = data.id;
    this.territory.name = data.name;
    this.territory.short_code = data.short_code;

  }

  update(id){
    this._territoryService.updateTerritory(this.territory,id).subscribe(     
      (res) => {
           this.uSuccess = res['result']['info']['msg'];
           this.loadTerritory(this.page);
           this.editModal.hide();
      },
    (err) => { 
        this.uError = err;
    }) 
  }

  delete(id){
    this._territoryService.deleteTerritory(id).subscribe(     
      (res) => {
          console.log(res);
           this.territory = res['result']['info']['data'];
           this.dSuccess = res['result']['info']['msg'];
      },
    (err) => { 
        console.log(err);
        this.uError = err;
    }) 
  }

}
