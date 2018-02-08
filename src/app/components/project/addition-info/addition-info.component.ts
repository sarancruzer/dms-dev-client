import { AdditionalInfoService } from './../../../_service/additional-info.service';
import { AdditionalInfo } from './../../../_model/additional-info';
import { CommonService } from './../../../_service/common.service';
import { Router } from '@angular/router';
import { GlobalSettings } from './../../../class/global-settings';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { ToastrService } from "toastr-ng2";
import { IsuccessError } from "app/_interface/isuccess-error.model";
import { FormGroup, FormControl ,Validators} from '@angular/forms';


@Component({
  selector: 'app-addition-info',
  templateUrl: './addition-info.component.html',
  styleUrls: ['./addition-info.component.scss'],
  providers:[AdditionalInfoService]
})
export class AdditionInfoComponent implements OnInit {

  model = new AdditionalInfo();
  items:any;
  title:string;

  currentPage: number = 1;
  totalPage: number;
  lastPage:number;
  pages=[];
  
  q:any;
  
  id:any;
  iSuccessError:IsuccessError;
  form:FormGroup;
  project_name:string;

  projects:any = []
  
  
  isDesc: boolean = true;
  column: string = 'id';
  orderby:string = "desc";
  submitted: boolean = false; 
  constructor(private _router : Router,private _service:AdditionalInfoService,private toastrService: ToastrService,private _globalSettings : GlobalSettings,private _commonService : CommonService) {
    this.title = "Additional Info";
    this.q = "";
    this.iSuccessError = {mSuccess:"",mError:""};
    this.id = localStorage.getItem("project_id");
    
   }


   ngOnInit() {    
    this.loadFormControl();
    this.getDetailsById(this.id);   
    this.getProjectList(); 
  }

  getDetailsById(id) {
    this._service.getAdditionalInfoById(id).subscribe(     
      (res) => {
           this.model = res['result']['info']['lists'];
           this.project_name = res['result']['info']['project_name'];
           this.loadFormAfterControl(this.model);                     
      },
    (err) => { 
      
       this.iSuccessError.mError = err;
       //this.toastrService.error(err, 'Error!');
       if(err == 'No results found!'){
         
       }
    }) 
   }


 
  getProjectList(){ 
    let params = [];
    this._commonService.getProjectList(params).subscribe(     
      (res) => {
          this.projects = res['result']['info'];
          //localStorage.setItem("project_id",this.projects[0].id);

          this.id = localStorage.getItem("project_id");
      },
    (err) => { 
        if(err == 'token_expired'){
              this._router.navigate(['/logout']);
         }
    }) 
  }

  changeProject() {
    console.log(this.id);
    localStorage.setItem("project_id",this.id);
    this.getDetailsById(this.id);
  }


loadFormControl(){
  this.form = new FormGroup({
    id: new FormControl(''),
    information: new FormControl(''),    
  });
  
}

loadFormAfterControl(res){
  this.form = new FormGroup({
    id: new FormControl(res['project_id']),
    information: new FormControl(res['information']),    
  });
  
}

  submit(form){
    console.log(form.value);    
    if(form.valid){
      this._service.saveAdditionalInfoById(form.value,this.id).subscribe(     
        (res) => {
            this.iSuccessError.mSuccess = res['result']['info']['msg'];
            this.getDetailsById(this.id);
            this.toastrService.success(this.iSuccessError.mSuccess, 'Success!');            
            
        },
      (err) => { 
          this.iSuccessError.mError = err;
          this.toastrService.error(err, 'Error!');
      }) 
    
   }
  }



}
