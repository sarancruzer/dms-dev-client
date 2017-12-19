import { ModalDirective } from 'ngx-bootstrap';
import { IsuccessError } from './../../../_interface/isuccess-error.model';
import { ProjectScope } from './../../../_model/project-scope';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectScopeService } from 'app/_service/project-scope.service';
import { CommonService } from 'app/_service/common.service';
import { ToastrService } from 'toastr-ng2/toastr-service';

@Component({
  selector: 'app-mproject-scope',
  templateUrl: './mproject-scope.component.html',
  styleUrls: ['./mproject-scope.component.scss'],
  providers:[ProjectScopeService,CommonService]
})
export class MprojectScopeComponent implements OnInit {

  model = new ProjectScope();
  items:any;
  title:string;

  currentPage: number = 1;
  totalPage: number;
  lastPage:number;
  pages=[];
  
  q:any;
  
  id:number;
  buildingClasses : any = [];
  itemss : any = [];
  
  iSuccessError:IsuccessError;

  
  @ViewChild('createModal') public createModal:ModalDirective;
  @ViewChild('editModal') public editModal:ModalDirective;
  @ViewChild('deleteModal') public deleteModal:ModalDirective;
  

  isDesc: boolean = true;
  column: string = 'id';
  orderby:string = "desc";
  submitted: boolean = false; 
  constructor(private _router:Router,private _service:ProjectScopeService,private toastrService: ToastrService,private _commonService:CommonService) {
    this.title = "Project SCope";
    this.q = "";
    this.iSuccessError = {mSuccess:"",mError:""};
    
   }

   ngOnInit() {
     this.init(1);
     this.getMasterData();
   }

   getMasterData(){
    let params = ['m_building_class','m_items'];
    this._commonService.getMasterDetails(params).subscribe(     
      (res) => {
            this.buildingClasses = res['result']['info']['m_building_class'];
            this.itemss = res['result']['info']['m_items'];
            console.log(res);
      },
    (err) => { 
        this.iSuccessError.mError = err;
        this.toastrService.error(err, 'Error!');
        if(err == 'token_expired'){
              this._router.navigate(['/logout']);
         }
    }) 
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
    this.model.price = data.price;
    this.model.short_code = data.short_code;
    this.model.building_class_id = data.building_class_id;
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