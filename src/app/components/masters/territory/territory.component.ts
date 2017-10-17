import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { TerritoryService } from "app/_service/territory.service";
import { Territory } from "app/_model/territory";
import { IsuccessError } from "../../../_interface/isuccess-error.model";
import { ToastrService } from 'toastr-ng2';


@Component({
  selector: 'app-territory',
  templateUrl: './territory.component.html',
  styleUrls: ['./territory.component.css'],
  providers : [TerritoryService,ToastrService]
})


export class TerritoryComponent implements OnInit {
  
  territory = new Territory();
  items:any;
  title:string;

  currentPage: number = 1;
  totalPage: number;
  lastPage:number;
  pages=[];
  
  q:any;
  
  id:number;
  iSuccessError:IsuccessError;

  @ViewChild('createModal') public createModal:ModalDirective;
  @ViewChild('editModal') public editModal:ModalDirective;
  @ViewChild('deleteModal') public deleteModal:ModalDirective;
  

  isDesc: boolean = true;
  column: string = 'id';
  orderby:string = "desc";

  constructor(private _territoryService:TerritoryService,private toastrService: ToastrService) {
    this.title = "Territory";
    this.q = "";
    this.iSuccessError = {mSuccess:"",mError:""};
    
   }

   ngOnInit() {
     this.loadTerritory(1);
   }

   sort(property){
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.orderby = this.isDesc ? 'desc' : 'asc'
    this.loadTerritory(this.currentPage);
  };
  

  loadTerritory(page) {
    console.log(page,this.q);
    let params = {column:this.column,orderby:this.orderby,q:this.q};
    this._territoryService.getTerritory(page,params).subscribe(     
      (res) => {
           this.items = res['result']['info']['data'];
           this.totalPage = res['result']['info']['total'];
           this.currentPage = res['result']['info']['current_page'];
           this.lastPage = res['result']['info']['last_page'];
  
           this.pages = [];
           for(var i=1;i<=this.lastPage;i++) {          
             this.pages.push(i);
           }
           
      },
    (err) => { 
       this.iSuccessError.mError = err;
       this.toastrService.error(err, 'Error!');
       this.items = [];
       this.pages = [];
    }) 
 }

  create(){
    this._territoryService.addTerritory(this.territory).subscribe(     
      (res) => {
           this.iSuccessError.mSuccess = res['result']['info']['msg'];
           this.loadTerritory(this.currentPage);
           this.createModal.hide();
           this.toastrService.success(this.iSuccessError.mSuccess, 'Success!');
      },
    (err) => { 
        this.iSuccessError.mError = err;
        this.toastrService.error(err, 'Error!');
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
           this.iSuccessError.mSuccess = res['result']['info']['msg'];
           this.loadTerritory(this.currentPage);
           this.editModal.hide();
           this.toastrService.success(this.iSuccessError.mSuccess, 'Success!');
      },
    (err) => { 
        this.iSuccessError.mError = err;
        this.toastrService.error(err, 'Error!');
    }) 
  }

  deleteModalFunc(id){
    this.deleteModal.show();
    this.id = id;    
  }

  delete(){
    this._territoryService.deleteTerritory(this.id).subscribe(     
      (res) => {
          console.log(res);
           this.iSuccessError.mSuccess = res['result']['info']['msg'];
           this.loadTerritory(this.currentPage);
           this.deleteModal.hide();
           this.toastrService.success(this.iSuccessError.mSuccess, 'Success!');
      },
    (err) => { 
        console.log(err);
        this.iSuccessError.mError = err;
        this.toastrService.error(err, 'Error!');
    }) 
  }

}
