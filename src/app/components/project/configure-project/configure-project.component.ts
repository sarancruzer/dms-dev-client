import { ConfigureProject } from './../../../_model/configure-project';
import { ToastrService } from 'toastr-ng2';
import { CommonService } from './../../../_service/common.service';
import { ProjectService } from './../../../_service/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IsuccessError } from 'app/_interface/isuccess-error.model';
import { Project } from './../../../_model/project';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-configure-project',
  templateUrl: './configure-project.component.html',
  styleUrls: ['./configure-project.component.css'],
  providers:[ProjectService,CommonService]
})
export class ConfigureProjectComponent implements OnInit {

  
 //model = new Project();
 iSuccessError:IsuccessError;
 projectTypes : any = [];
 buildingClass : any = [];
 id:number;
 project_name:string;
 
 public form: FormGroup;
 private model:ConfigureProject;
 
 constructor(private _router:Router,private _service : ProjectService,private toastrService : ToastrService,private _commonService : CommonService,private _route : ActivatedRoute,private fb: FormBuilder) {

  this.iSuccessError = {mSuccess:"",mError:""};
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
    //     this.initVariation(),
     ])
    });
    //this.initAttributes();
    
 
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


initVariation() {
  const emptyArr = this.fb.array([]);
  let v = this.fb.group({
    project_type: [''],
    building_details: emptyArr
  });
  return v;
}


initVattr() {
  return this.fb.group({
    building_class: [''],
    building_units: ['']
  });
}


initVariationn(res) {
  let ress = res;

  const emptyArr = this.fb.array([]);
  let v = this.fb.group({
    project_type: res['project_type_id'],
    building_details: emptyArr
  });
  return v;
}

initVattrr(res) {
  let ress = res;
  return this.fb.group({
    building_class: res['building_class_id'],
    building_units: res['building_units']
  });
}


processData(res)
{
  let ress = res;
  let control = <FormArray>this.form.controls['project_details'];

console.log("for each start");
  res.forEach((obj,index) => {
    console.log(obj);
    console.log(index);
    control.push(this.initVariationn(obj));

    obj['building_class'].forEach((val,ind) => {      
          const controll = <FormArray>this.form.get(['project_details',index, 'building_details']);
          console.log(val);
          console.log(ind);
          controll.push(this.initVattrr(val))
      });

});

  console.log("AFTER CONTROL");
  console.log(control);
  console.log(control.value);
  
  
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

removeVAttr(parentIndex:number,index: number) {
  console.log("parentIndex");
  console.log(parentIndex);
  console.log("index");
  console.log(index);
  // remove address from the list
  const control = <FormArray>this.form.get(['project_details', parentIndex, 'building_details']);
  control.removeAt(index);
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
        this.project_name = res['result']['info']['project_name'];
        console.log('this.model');
        console.log(this.model);
    
        this.processData(res['result']['info']['lists']);
   },
 (err) => { 
  this.project_name = err['error']['info']['project_name'];  
   this.processDataa();
    this.iSuccessError.mError = err;
    //this.toastrService.error(err, 'Error!');
    if(err == 'No results found!'){
      
    }
 }) 
}


processDataa()
{

  let control = <FormArray>this.form.controls['project_details'];

console.log("for each start");
  
  control.push(this.initVariation());

  const controll = <FormArray>this.form.get(['project_details',0, 'building_details']);
  controll.push(this.initVattrr_r())

  console.log("AFTER CONTROL");
  console.log(control);
  console.log(control.value); 
  
 }

 initVattrr_r() {  
  return this.fb.group({
    building_class: [''],
    building_units: ['']
  });
}


submit(form){    
  console.log("form");
  console.log(form.value);

    if(form.valid){
     this._service.updateConfigureProject(form.value,this.id).subscribe(     
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


cancelFunc(){
  this._router.navigate(['/manageProject']);
}   

 
}
