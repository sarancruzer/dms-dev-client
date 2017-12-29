import { ProjectService } from 'app/_service/project.service';

import { Router } from '@angular/router';
import { ToastrService } from 'toastr-ng2';
import { IsuccessError } from './../../../_interface/isuccess-error.model';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/_service/common.service';
import { FormGroup ,FormBuilder, FormArray} from '@angular/forms';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';


@Component({
  selector: 'app-supply-items',
  templateUrl: './supply-items.component.html',
  styleUrls: ['./supply-items.component.scss'],
  providers:[ProjectService,CommonService]
})
export class SupplyItemsComponent implements OnInit {

  items:any = [];
  id:number;
  iSuccessError:IsuccessError;

  form:FormGroup;

  model:any;
  sidemenuItems:any;
  
  myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
};
  
  constructor(private _router:Router,private _commonService:CommonService,private toastrService:ToastrService,private _service:ProjectService,private fb:FormBuilder) {
    this.iSuccessError = {mSuccess:"",mError:""};
    this.id = JSON.parse(localStorage.getItem("project_id"));
   }

  ngOnInit() {

    this.initFormControl();
    this.getMasterData();
    this.getDetailsById(this.id);
  }


getMasterData(){
  let params = ['m_items'];
  this._commonService.getMasterDetails(params).subscribe(     
    (res) => {
        this.items = res['result']['info']['m_items'];
        console.log(this.items);
       
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
    this._service.getSupplyItemsById(id).subscribe(     
      (res) => {
        let ress = res['result']['info']['lists'];
           //Object.keys(ress); // ['name', 'age']
           console.log(res);
           this.sidemenuItems = Object.getOwnPropertyNames(ress[0]);
           
           this.loadFormControl(ress[0]);
      },
    (err) => { 
      console.log(err);
       this.iSuccessError.mError = err['result']['error'];
       
       //this.toastrService.error(err['result']['error'], 'Error!');
       if(err == 'No results found!'){
         
       }
    }) 
   }


   submit(form){    
    console.log("form");
    console.log(form.value);
  
      if(form.valid){
       this._service.updateSupplyItems(form.value,this.id).subscribe(     
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

 
   initFormControl() {
    
        this.form = this.fb.group({     
          
          all_joinery:'',
          aluminium_windows:'',
          aluminium_doors:'',
          curtain_wall:'',
          aluminium_louvres:'',
          kitchens:'',
          kitchenettes:'',
          bedrooms:'',
          laundries:'',
          bathrooms:'',
          ensuites:'',
          balconies:'',
          storage:'',
          study	:'',
          garages	:'',
          other	:'',
          // aluminium_doors: this.fb.array([      
          //   this.initVarSub(res['aluminium_doors']),
          // ])
    
    
    
          all_joinery_estimated_date:'',
          aluminium_windows_estimated_date:'',
          aluminium_doors_estimated_date:'',
          curtain_wall_estimated_date:'',
          aluminium_louvres_estimated_date:'',
          kitchens_estimated_date:'',
          kitchenettes_estimated_date:'',
          bedrooms_estimated_date:'',
          laundries_estimated_date:'',
          bathrooms_estimated_date:'',
          ensuites_estimated_date:'',
          balconies_estimated_date:'',
          storage_estimated_date:'',
          study_estimated_date	:'',
          garages_estimated_date	:'',
          other_estimated_date	:'',
    
    
          all_joinery_quoted_date:'',
          aluminium_windows_quoted_date:'',
          aluminium_doors_quoted_date:'',
          curtain_wall_quoted_date:'',
          aluminium_louvres_quoted_date:'',
          kitchens_quoted_date:'',
          kitchenettes_quoted_date:'',
          bedrooms_quoted_date:'',
          laundries_quoted_date:'',
          bathrooms_quoted_date:'',
          ensuites_quoted_date:'',
          balconies_quoted_date:'',
          storage_quoted_date:'',
          study_quoted_date	:'',
          garages_quoted_date	:'',
          other_quoted_date	:'',

          all_joinery_interest:'',
          aluminium_windows_interest:'',
          aluminium_doors_interest:'',
          curtain_wall_interest:'',
          aluminium_louvres_interest:'',
          kitchens_interest:'',
          kitchenettes_interest:'',
          bedrooms_interest:'',
          laundries_interest:'',
          bathrooms_interest:'',
          ensuites_interest:'',
          balconies_interest:'',
          storage_interest:'',
          study_interest	:'',
          garages_interest	:'',
          other_interest	:'',

          all_joinery_status:'',
          aluminium_windows_status:'',
          aluminium_doors_status:'',
          curtain_wall_status:'',
          aluminium_louvres_status:'',
          kitchens_status:'',
          kitchenettes_status:'',
          bedrooms_status:'',
          laundries_status:'',
          bathrooms_status:'',
          ensuites_status:'',
          balconies_status:'',
          storage_status:'',
          study_status	:'',
          garages_status	:'',
          other_status	:'',

          
    
    
    
        });    
      }

  
   
  loadFormControl(res) {

    this.form = this.fb.group({     
      
      all_joinery:'1',
      aluminium_windows:res['aluminium_windows'].interest,
      aluminium_doors:res['aluminium_doors'].interest,
      curtain_wall:res['aluminium_louvres'].interest,
      aluminium_louvres:res['aluminium_louvres'].interest,
      kitchens:res['kitchens'].interest,
      kitchenettes:res['kitchenettes'].interest,
      bedrooms:res['bedrooms'].interest,
      laundries:res['laundries'].interest,
      bathrooms:res['bathrooms'].interest,
      ensuites:res['ensuites'].interest,
      balconies:res['balconies'].interest,
      storage:res['storage'].interest,
      study	:res['study'].interest,
      garages	:res['garages'].interest,
      other	:res['other'].interest,
      // aluminium_doors: this.fb.array([      
      //   this.initVarSub(res['aluminium_doors']),
      // ])


      


      all_joinery_estimated_date:'',
      aluminium_windows_estimated_date:res['aluminium_windows'].estimated_date,
      aluminium_doors_estimated_date:res['aluminium_doors'].estimated_date,
      curtain_wall_estimated_date:res['aluminium_louvres'].estimated_date,
      aluminium_louvres_estimated_date:res['aluminium_louvres'].estimated_date,
      kitchens_estimated_date:res['kitchens'].estimated_date,
      kitchenettes_estimated_date:res['kitchenettes'].estimated_date,
      bedrooms_estimated_date:res['bedrooms'].estimated_date,
      laundries_estimated_date:res['laundries'].estimated_date,
      bathrooms_estimated_date:res['bathrooms'].estimated_date,
      ensuites_estimated_date:res['ensuites'].estimated_date,
      balconies_estimated_date:res['balconies'].estimated_date,
      storage_estimated_date:res['storage'].estimated_date,
      study_estimated_date	:res['study'].estimated_date,
      garages_estimated_date	:res['garages'].estimated_date,
      other_estimated_date	:res['other'].estimated_date,


      all_joinery_quoted_date:'',
      aluminium_windows_quoted_date:res['aluminium_windows'].quoted_date,
      aluminium_doors_quoted_date:res['aluminium_doors'].quoted_date,
      curtain_wall_quoted_date:res['aluminium_louvres'].quoted_date,
      aluminium_louvres_quoted_date:res['aluminium_louvres'].quoted_date,
      kitchens_quoted_date:res['kitchens'].quoted_date,
      kitchenettes_quoted_date:res['kitchenettes'].quoted_date,
      bedrooms_quoted_date:res['bedrooms'].quoted_date,
      laundries_quoted_date:res['laundries'].quoted_date,
      bathrooms_quoted_date:res['bathrooms'].quoted_date,
      ensuites_quoted_date:res['ensuites'].quoted_date,
      balconies_quoted_date:res['balconies'].quoted_date,
      storage_quoted_date:res['storage'].quoted_date,
      study_quoted_date	:res['study'].quoted_date,
      garages_quoted_date	:res['garages'].quoted_date,
      other_quoted_date	:res['other'].quoted_date,

      all_joinery_interest:'',
      aluminium_windows_interest:res['aluminium_windows'].interest,
      aluminium_doors_interest:res['aluminium_doors'].interest,
      curtain_wall_interest:res['aluminium_louvres'].interest,
      aluminium_louvres_interest:res['aluminium_louvres'].interest,
      kitchens_interest:res['kitchens'].interest,
      kitchenettes_interest:res['kitchenettes'].interest,
      bedrooms_interest:res['bedrooms'].interest,
      laundries_interest:res['laundries'].interest,
      bathrooms_interest:res['bathrooms'].interest,
      ensuites_interest:res['ensuites'].interest,
      balconies_interest:res['balconies'].interest,
      storage_interest:res['storage'].interest,
      study_interest	:res['study'].interest,
      garages_interest	:res['garages'].interest,
      other_interest	:res['other'].interest,

      all_joinery_status:'',
      aluminium_windows_status:res['aluminium_windows'].status,
      aluminium_doors_status:res['aluminium_doors'].status,
      curtain_wall_status:res['aluminium_louvres'].status,
      aluminium_louvres_status:res['aluminium_louvres'].status,
      kitchens_status:res['kitchens'].status,
      kitchenettes_status:res['kitchenettes'].status,
      bedrooms_status:res['bedrooms'].status,
      laundries_status:res['laundries'].status,
      bathrooms_status:res['bathrooms'].status,
      ensuites_status:res['ensuites'].status,
      balconies_status:res['balconies'].status,
      storage_status:res['storage'].status,
      study_status	:res['study'].status,
      garages_status	:res['garages'].status,
      other_status	:res['other'].status,



    });    

    //this.form.patchValue({garages_quoted_date: {formatted:res['garages'].quoted_date }});
 


  }


  initVarSub(res) {
    let v = this.fb.group({
      interest:res['interest'],
      estimated_date:res['estimated_date'],
      quoted_date:res['quoted_date'],
      status:res['status'],
    });
    return v;
  }

  

}
