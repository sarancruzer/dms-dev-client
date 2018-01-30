import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectScope } from 'app/_model/project-scope';
import { IsuccessError } from 'app/_interface/isuccess-error.model';
import { ModalDirective } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { ProjectScopeService } from 'app/_service/project-scope.service';
import { ToastrService } from 'toastr-ng2';
import { CommonService } from 'app/_service/common.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-project-scope-configure',
  templateUrl: './project-scope-configure.component.html',
  styleUrls: ['./project-scope-configure.component.scss'],
  providers:[ProjectScopeService,CommonService]
})
export class ProjectScopeConfigureComponent implements OnInit {

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
  
  iSuccessError:IsuccessError;
  projectScopeItems : any = [];

  projectScopeArr : any = [];
  buildingClassId:any;
  isEdit:string = '';
  modelTitle = "";
  
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
    this._commonService.getBuildingClassDetails().subscribe(     
      (res) => {
            this.buildingClasses = res['result']['info']['lists'];
            console.log(res);
      },
    (err) => { 
        this.iSuccessError.mError = err;
       // this.toastrService.error(err, 'Error!');
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
      // this.toastrService.error(err, 'Error!');
       this.items = [];
       this.pages = [];
       if(err == 'token_expired'){
            this._router.navigate(['/logout']);
       }
    }) 

   
 }

 createModalFunc(form){
  this.isEdit = ""; 
  this.modelTitle = "Create";
  form.resetForm();  
  this.projectScopeItems = [];
  this.createModal.show();
 }
 

 changeBuildingClass(buildingClassId){
   
    console.log("buildingClassId " +buildingClassId);
    console.log(buildingClassId);
    if(buildingClassId != 0){

      this._service.getBuildingClass(buildingClassId).subscribe(     
        (res) => {
          console.log(res);
          this.projectScopeItems = res['result']['info']['lists'];
          this.buildingClassId = buildingClassId;
          console.log(this.projectScopeItems);
        },
      (err) => { 
          this.iSuccessError.mError = err;
          this.toastrService.error(err, 'Error!');
      }) 
    }else{
      this.projectScopeItems = [];
    }
}


 

  updateBuildingClass(form){
    console.log(form);
    let arr = form.value;
    console.log(arr);
    console.log(this.projectScopeItems.length);
    for(var i=0;i<this.projectScopeItems.length;i++){
      this.projectScopeArr[i] = {
                  // 'item_name':arr['item_name-'+i],
                  'items_id':arr['items_id-'+i],
                  'price':arr['price-'+i]
                };
    }

    console.log(this.projectScopeArr);
    
    if(form.valid){
      this._service.updateBuildingClass(this.projectScopeArr,this.buildingClassId).subscribe(     
        (res) => {
            this.iSuccessError.mSuccess = res['result']['info']['msg'];
            this.init(this.currentPage);
            this.createModal.hide();
            this.toastrService.success(this.iSuccessError.mSuccess, 'Success!');
            form.resetForm(); 
            this.getMasterData();
            
        },
      (err) => { 
          this.iSuccessError.mError = err;
          this.toastrService.error(err, 'Error!');
      }) 
    
   }
  }

  editModelFunc(buildingClassId){    
    this.isEdit = "disabled";
    this.modelTitle = "Edit";
    this.createModal.show();
    this.model.building_class_id = buildingClassId;
    this._service.getBuildingClass(buildingClassId).subscribe(     
      (res) => {
        console.log(res);
        this.projectScopeItems = res['result']['info']['lists'];
        this.buildingClassId = buildingClassId;
        console.log(this.projectScopeItems);
           
      },
    (err) => { 
        this.iSuccessError.mError = err;
        this.toastrService.error(err, 'Error!');
    }) 
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