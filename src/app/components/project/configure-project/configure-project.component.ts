import { ToastrService } from 'toastr-ng2';
import { CommonService } from './../../../_service/common.service';
import { ProjectService } from './../../../_service/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IsuccessError } from 'app/_interface/isuccess-error.model';
import { Project } from './../../../_model/project';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Customer } from 'app/_interface/customer.model';

@Component({
  selector: 'app-configure-project',
  templateUrl: './configure-project.component.html',
  styleUrls: ['./configure-project.component.css'],
  providers:[ProjectService,CommonService]
})
export class ConfigureProjectComponent implements OnInit {

  
 model = new Project();
 iSuccessError:IsuccessError;
 projectTypes : any = [];
 buildingClass : any = [];
 id:number;
 
 public form: FormGroup;

 
 constructor(private _router:Router,private _service : ProjectService,private toastrService : ToastrService,private _commonService : CommonService,private _route : ActivatedRoute,private fb: FormBuilder) {


  }
  
   ngOnInit() {
     // get URL parameters
     this._route.params.subscribe(params => {
       this.id = params['id']; // --> Name must match wanted parameter
       console.log(this.id);
     });
     this.getMasterData();    
     this.getDetailsById(this.id);
     
     this.form = this.fb.group({
      project_details: this.fb.array([
        this.initVariation(),
    ])
    });
    this.initAttributes();
    
}


initVariation() {
  const emptyArr = this.fb.array([]);
  let v = this.fb.group({
    project_type: [''],
    building_details: emptyArr
  });
  return v;
}

initAttributes(){
  const control = <FormArray>this.form.get(['project_details', 0, 'building_details']);
  control.push(this.initVattr())
}

addNewVar(index) {
  const control = <FormArray>this.form.controls['project_details'];
  control.push(this.initVariation());
  console.log(<FormArray>this.form.controls['project_details']['_value']['length']);
  console.log(index);

  var len = Number(<FormArray>this.form.controls['project_details']['_value']['length']);
  const controll = <FormArray>this.form.get(['project_details',len-1, 'building_details']);
  controll.push(this.initVattr())
  

}

removeVar(index: number) {
  // remove address from the list
  const control = <FormArray>this.form.controls['project_details'];
  control.removeAt(index);
}

addAttrRow(index) {
  const control = <FormArray>this.form.get(['project_details', index, 'building_details']);
  control.push(this.initVattr())
}

initVattr() {
  return this.fb.group({
    building_class: [''],
    building_units: ['']
  });
}




getMasterData(){
 let params = ['m_project_type','m_building_class'];
 this._commonService.getMasterDetails(params).subscribe(     
   (res) => {
         this.projectTypes = res['result']['info']['m_project_type'];
         this.buildingClass = res['result']['info']['m_building_class'];
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

getDetailsById(id) {
 this._service.getConfigureProjectById(id).subscribe(     
   (res) => {
        this.model = res['result']['info']['lists'];
        console.log(res);
   },
 (err) => { 
    this.iSuccessError.mError = err;
    this.toastrService.error(err, 'Error!');
    if(err == 'No results found!'){
      
    }
 }) 
}

submit(form){    
     if(form.valid){
     this._service.update(this.model,1).subscribe(     
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
