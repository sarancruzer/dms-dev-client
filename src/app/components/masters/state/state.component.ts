import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { State } from "app/_model/state";
import { IsuccessError } from "app/_interface/isuccess-error.model";
import { StateService } from "app/_service/state.service";
import { ToastrService } from "toastr-ng2";

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css'],
  providers:[StateService]
})
export class StateComponent implements OnInit {

  
  model = new State();
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
  submitted: boolean = false; 
  constructor(private _router:Router,private _service:StateService,private toastrService: ToastrService) {
    this.title = "State";
    this.q = "";
    this.iSuccessError = {mSuccess:"",mError:""};
    
   }

   ngOnInit() {
     this.init(1);
   }

   sort(property){
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.orderby = this.isDesc ? 'desc' : 'asc'
    this.init(this.currentPage);
  };


  init(page) {
    console.log(page,this.q);
    let params = {column:this.column,orderby:this.orderby,q:this.q};
    this._service.get(page,params).subscribe(     
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
       if(err == 'token_expired'){
            this._router.navigate(['/logout']);
       }
    }) 

   
 }

 createModalFunc(form){
  form.resetForm();  
  this.createModal.show(); 
 }
 

  create(form){

    if(form.valid){
      this._service.add(this.model).subscribe(     
        (res) => {
            this.iSuccessError.mSuccess = res['result']['info']['msg'];
            this.init(this.currentPage);
            this.createModal.hide();
            this.toastrService.success(this.iSuccessError.mSuccess, 'Success!');
            form.resetForm(); 
            
        },
      (err) => { 
          this.iSuccessError.mError = err;
          this.toastrService.error(err, 'Error!');
      }) 
    
   }
  }

  edit(data){
    this.editModal.show();
    this.model.id = data.id;
    this.model.name = data.name;
    this.model.short_code = data.short_code;

  }

  update(form,id){

    if(form.valid){
    this._service.update(this.model,id).subscribe(     
      (res) => {
           this.iSuccessError.mSuccess = res['result']['info']['msg'];
           this.init(this.currentPage);
           this.editModal.hide();
           this.toastrService.success(this.iSuccessError.mSuccess, 'Success!');
           
      },
    (err) => { 
        this.iSuccessError.mError = err;
        this.toastrService.error(err, 'Error!');
    }) 
  }

  }

  deleteModalFunc(id){
    this.deleteModal.show();
    this.id = id;    
  }

  delete(){
    this._service.delete(this.id).subscribe(     
      (res) => {
          console.log(res);
           this.iSuccessError.mSuccess = res['result']['info']['msg'];
           this.init(this.currentPage);
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
