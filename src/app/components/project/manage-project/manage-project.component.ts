import { Project } from './../../../_model/project';
import { CommonService } from './../../../_service/common.service';
import { GlobalSettings } from 'app/class/global-settings';
import { ToastrService } from 'toastr-ng2';
import { ProjectService } from './../../../_service/project.service';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { IsuccessError } from 'app/_interface/isuccess-error.model';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrls: ['./manage-project.component.css'],
  providers:[ProjectService]
})
export class ManageProjectComponent implements OnInit {

  
  model = new Project();
  items:any;
  title:string;

  currentPage: number = 1;
  totalPage: number;
  lastPage:number;
  pages=[];
  
  q:any;
  
  id:any;
  iSuccessError:IsuccessError;

  @ViewChild('deleteModal') public deleteModal:ModalDirective;
  @ViewChild('scopeModal') public scopeModal:ModalDirective;
  

  isDesc: boolean = true;
  column: string = 'id';
  orderby:string = "desc";
  submitted: boolean = false; 
  constructor(private _router : Router,private _service:ProjectService,private toastrService: ToastrService,private _globalSettings : GlobalSettings,private _commonService : CommonService) {
    this.title = "Manage Project";
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

  create(form){

    if(form.valid){
      this._service.add(this.model).subscribe(     
        (res) => {
            this.iSuccessError.mSuccess = res['result']['info']['msg'];
            this.init(this.currentPage);
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
    
  }

  update(form,id){

    if(form.valid){
    this._service.update(this.model,id).subscribe(     
      (res) => {
           this.iSuccessError.mSuccess = res['result']['info']['msg'];
           this.init(this.currentPage);
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

  scopeModalFunc(id){
    this.scopeModal.show();
    this.id = id;
  }

  modalActions(routePath){
    this.scopeModal.hide();
    localStorage.setItem("project_id",this.id);
    this._router.navigate([routePath]);

  }

}