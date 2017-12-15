import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IsuccessError } from './../../../_interface/isuccess-error.model';
import { ValuesPipe } from './values.pipe';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/_service/common.service';
import { ProjectService } from 'app/_service/project.service';
import { ToastrService } from 'toastr-ng2/toastr-service';

@Component({
  selector: 'app-project-scope',
  templateUrl: './project-scope.component.html',
  styleUrls: ['./project-scope.component.scss'],
  providers:[ProjectService]
})

export class ProjectScopeComponent implements OnInit {

  
  people:any = [];
  keys: String[];  
  columns:any = [];
  keyvalues:any;
  iSuccessError:IsuccessError;

  form:FormGroup;
  id:number;  

  constructor(private _router:Router,private _route : ActivatedRoute,private _commonService:CommonService,private toastrService:ToastrService,private _service:ProjectService,private fb: FormBuilder) {
    this.iSuccessError = {mSuccess:"",mError:""};
    this.id = Number(localStorage.getItem("project_id"));
   }
  
  

  ngOnInit() {
    this.form = this.fb.group({
      project_details: this.fb.array([
        //this.initVariation(),
    ])
   });
    this.loadDyamicTable();
       
  }
  
  

  initVariation(res) {
    let v = this.fb.group({
      project_type:res['project_type'],
      building_class:res['building_class'],
      building_units:res['project_type'],
      aluminium_windows:[''],
      aluminium_doors:[''],      
      curtain_wall:[''],
      aluminium_louvres:[''],
      kitchens:[''],
      kitchenettes:[''],
      bedrooms:[''],
      laundries:[''],
      bathrooms:[''],
      ensuites:[''],
      balconies:[''],
      storage:[''],
      study	:[''],
      garages	:[''],
      other	:[''],
            
    });
    return v;
  }


  loadDyamicTable(){
    this._service.getProjectScopeMasterDataById(this.id).subscribe(     
    (res) => {
      let ress = res['result']['info']['lists'];
         this.people = ress;    
         this.loadFormControl(this.people);
         this.keyvalues = Object.getOwnPropertyNames(this.people[0]);
         console.log(this.keyvalues);
    },
  (err) => { 
     this.iSuccessError.mError = err;
     this.toastrService.error(err, 'Error!');
     if(err == 'No results found!'){
       
     }
  })

  }

  loadFormControl(res){
    let ress = res;
    let control = <FormArray>this.form.controls['project_details'];
    res.forEach((obj,index) => {
      console.log(obj);
      console.log(index);
      control.push(this.initVariation(obj));   
  });   
  }


submit(form){    
  console.log("form");
  console.log(form.value);

    if(form.valid){
     this._service.updateProjectScope(form.value,this.id).subscribe(     
       (res) => {
             this.iSuccessError.mSuccess = res['result']['info']['msg'];
             this.toastrService.success(this.iSuccessError.mSuccess, 'Success!');
             this._router.navigate(['/manageProject']);
             
       },
     (err) => { 
       console.log(err);
         this.iSuccessError.mError = err;
         this.toastrService.error(err, 'Error!');
     }) 
   }
   
}



}
