import { CommonService } from './../../../_service/common.service';
import { Router } from '@angular/router';
import { GlobalSettings } from './../../../class/global-settings';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { ToastrService } from "toastr-ng2";
import { IsuccessError } from "app/_interface/isuccess-error.model";
import { ProjectDocs } from '../../../_model/project-docs';
import { ProjectDocsService } from '../../../_service/project-docs.service';
import { FormGroup, FormControl ,Validators} from '@angular/forms';



@Component({
  selector: 'app-project-docs',
  templateUrl: './project-docs.component.html',
  styleUrls: ['./project-docs.component.scss'],
  providers:[ProjectDocsService,CommonService]
})
export class ProjectDocsComponent implements OnInit {

  model = new ProjectDocs();
  items:any;
  title:string;

  currentPage: number = 1;
  totalPage: number;
  lastPage:number;
  pages=[];
  
  q:any;
  
  project_id:number;
  id:number;
  iSuccessError:IsuccessError;
  form:FormGroup;
  project_name:string;

  
  @ViewChild('createModal') public createModal:ModalDirective;
  @ViewChild('editModal') public editModal:ModalDirective;
  @ViewChild('deleteModal') public deleteModal:ModalDirective;
  

  isDesc: boolean = true;
  column: string = 'id';
  orderby:string = "desc";
  submitted: boolean = false; 
  constructor(private _router : Router,private _service:ProjectDocsService,private toastrService: ToastrService,private _globalSettings : GlobalSettings,private _commonService : CommonService) {
    this.title = "Project Documents";
    this.q = "";
    this.iSuccessError = {mSuccess:"",mError:""};
    this.project_id = JSON.parse(localStorage.getItem("project_id"));
    
   }


   ngOnInit() {    

    this.loadFormControl();
    this.init(1);
    this._commonService.authRedirect('/projectDocs');
  }

  sort(property){
   this.isDesc = !this.isDesc; //change the direction    
   this.column = property;
   this.orderby = this.isDesc ? 'desc' : 'asc'
   this.init(this.currentPage);
 };


 init(page) {
   console.log(page,this.q);
   let params = {column:this.column,orderby:this.orderby,q:this.q,"project_id":this.project_id};
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

loadFormControl(){
  this.form = new FormGroup({
    ref: new FormControl('', Validators.required),
    arch_ref: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    revision: new FormControl('', Validators.required),
    p_date: new FormControl('', Validators.required),
    p_link: new FormControl('', Validators.required),   
    project_id: new FormControl(this.project_id),   
  });
  
}

createModalFunc(){

  this._service.getReferenceId(this.project_id).subscribe(     
    (res) => {
        let refId = res['result']['info']['reference_id'];
        let archId = res['result']['info']['arch_id'];
        this.form.patchValue({ref: refId})
        this.form.patchValue({arch_ref: archId})
        this.project_name = res['result']['info']['project_name'];
    },
  (err) => { 
      this.iSuccessError.mError = err;
      this.toastrService.error(err, 'Error!');
  }) 
  this.createModal.show();
}


  create(form){
    console.log(form.value);
    
    if(form.valid){
      this._service.add(form.value).subscribe(     
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

  loadEditFormControl(res){
    this.form = new FormGroup({
      ref: new FormControl(res['id'], Validators.required),
      arch_ref: new FormControl(res['arch_ref'], Validators.required),
      description: new FormControl(res['description'], Validators.required),
      revision: new FormControl(res['revision'], Validators.required),
      p_date: new FormControl(res['p_date'], Validators.required),
      p_link: new FormControl(res['p_link'], Validators.required),   
    });
    
  }

  edit(data){
    this.editModal.show();
    this._service.edit(data.id).subscribe(     
      (res) => {
           this.model = res['result']['info']['lists'];
           this.loadEditFormControl(this.model);
           console.log(res);
      },
    (err) => { 
       this.iSuccessError.mError = err;
       this.toastrService.error(err, 'Error!');
    }) 

  }

  update(form){

    if(form.valid){
    this._service.update(this.model,this.model.id).subscribe(     
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
