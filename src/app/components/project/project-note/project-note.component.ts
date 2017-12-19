import { ProjectNote } from './../../../_model/project-note';
import { AdditionalInfoService } from './../../../_service/additional-info.service';
import { CommonService } from './../../../_service/common.service';
import { Router } from '@angular/router';
import { GlobalSettings } from './../../../class/global-settings';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from "toastr-ng2";
import { IsuccessError } from "app/_interface/isuccess-error.model";
import { FormGroup, FormControl ,Validators} from '@angular/forms';


@Component({
  selector: 'app-project-note',
  templateUrl: './project-note.component.html',
  styleUrls: ['./project-note.component.scss'],
  providers:[AdditionalInfoService]
})
export class ProjectNoteComponent implements OnInit {

  model = new ProjectNote();
  items:any;
  title:string;

  currentPage: number = 1;
  totalPage: number;
  lastPage:number;
  pages=[];
  
  q:any;
  
  id:number;
  iSuccessError:IsuccessError;
  form:FormGroup;
  project_name:string;
  
  
  isDesc: boolean = true;
  column: string = 'id';
  orderby:string = "desc";
  submitted: boolean = false; 
  constructor(private _router : Router,private _service:AdditionalInfoService,private toastrService: ToastrService,private _globalSettings : GlobalSettings,private _commonService : CommonService) {
    this.title = "Additional Info";
    this.q = "";
    this.iSuccessError = {mSuccess:"",mError:""};
    this.id = JSON.parse(localStorage.getItem("project_id"));
    
   }


   ngOnInit() {    
    this.loadFormControl();
    this.getDetailsById(this.id);    
  }

  getDetailsById(id) {
    this._service.getProjectNoteById(id).subscribe(     
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

loadFormControl(){
  this.form = new FormGroup({
    id: new FormControl(''),
    note: new FormControl(''),    
  });
  
}

loadFormAfterControl(res){
  this.form = new FormGroup({
    id: new FormControl(res['project_id']),
    note: new FormControl(res['note']),    
  });
  
}

  submit(form){
    console.log(form.value);    
    if(form.valid){
      this._service.saveProjectNoteById(form.value,this.id).subscribe(     
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
