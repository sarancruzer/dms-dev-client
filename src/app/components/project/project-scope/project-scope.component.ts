import { P404Component } from './../../../views/pages/404.component';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IsuccessError } from './../../../_interface/isuccess-error.model';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/_service/common.service';
import { ProjectService } from 'app/_service/project.service';
import { ToastrService } from 'toastr-ng2/toastr-service';

@Component({
  selector: 'app-project-scope',
  templateUrl: './project-scope.component.html',
  styleUrls: ['./project-scope.component.scss'],
  providers:[ProjectService,CommonService]
})

export class ProjectScopeComponent implements OnInit {

  
  people:any = [];
  keys: String[];  
  columns:any = [];
  sidemenuItems:any;
  removedMenuItems = ['project_id','project_type_id','building_class_id','items',
  'aluminium_windows_price',
  'aluminium_doors_price',
  'curtain_wall_price',
  'aluminium_louvres_price',
  'kitchens_price',
  'kitchenettes_price',
  'bedrooms_price',
  'laundries_price',
  'bathrooms_price',
  'ensuites_price',
  'balconies_price',
  'storage_price',
  'study_price',
  'garages_price',
  'other_price',
  "all_joinery"
];  


  projectScopes:any = [];
  itemss:any = [];
  itemsLists:any = [];
  

  iSuccessError:IsuccessError;
  form:FormGroup;
  id:any;  
  calcAmt:number = 0;
  project_name:string;
  quoteAmt:number;

  projects:any = [];


  constructor(private _router:Router,private _route : ActivatedRoute,private _commonService:CommonService,private toastrService:ToastrService,private _service:ProjectService,private fb: FormBuilder) {
    this.iSuccessError = {mSuccess:"",mError:""};
    this.id = Number(localStorage.getItem("project_id"));
   }
  
  

  ngOnInit() {
    this.form = this.fb.group({
      quote:[''],  
      project_details: this.fb.array([      
        //this.initVariation(),
    ])
   });
    this.getProjectScopeMasterData();

    this.getMasterData();    
    this.getProjectList();   
  }


  
  

  initVariation(res) {
    let v = this.fb.group({
      project_type:res['project_type'],
      project_type_id:res['project_type_id'],
      building_class:res['building_class'],
      building_class_id:res['building_class_id'],
      building_units:res['building_units'],
      aluminium_windows:res['aluminium_windows'],
      aluminium_doors:res['aluminium_doors'],
      curtain_wall:res['aluminium_louvres'],
      aluminium_louvres:res['aluminium_louvres'],
      kitchens:res['kitchens'],
      kitchenettes:res['kitchenettes'],
      bedrooms:res['bedrooms'],
      laundries:res['laundries'],
      bathrooms:res['bathrooms'],
      ensuites:res['ensuites'],
      balconies:res['balconies'],
      powder_rooms_toilets	:res['powder_rooms_toilets'],
      showers :res['showers'],
      storage:res['storage'],
      study	:res['study'],
      garages	:res['garages'],
      other	:res['other'],
      
      

      aluminium_windows_price:res['aluminium_windows_price'],
      aluminium_doors_price:res['aluminium_doors_price'],
      curtain_wall_price:res['curtain_wall_price'],
      aluminium_louvres_price:res['aluminium_louvres_price'],
      kitchens_price:res['kitchens_price'],
      kitchenettes_price:res['kitchenettes_price'],
      bedrooms_price:res['bedrooms_price'],
      laundries_price:res['laundries_price'],
      bathrooms_price:res['bathrooms_price'],
      ensuites_price:res['ensuites_price'],
      balconies_price:res['balconies_price'],
      powder_rooms_toilets_price :res['powder_rooms_toilets_price'],
      showers_price :res['showers_price'],
      storage_price:res['storage_price'],
      study_price	:res['study_price'],
      garages_price	:res['garages_price'],
      other_price	:res['other_price'],
      
      
            
    });
    return v;
  }


  getProjectScopeMasterData(){
  
  this._service.getProjectScopeById(this.id).subscribe(     
    (res) => {
      let ress = res['result']['info']['lists'];
      let quote = res['result']['info']['quote'];
      this.project_name = res['result']['info']['project_name'];
      this.itemsLists = res['result']['info']['items_lists'];
      this.people = ress;    

         this.sidemenuItems = Object.getOwnPropertyNames(this.itemsLists[0]);
         console.log("THIS SIDEMENU ITESM");
         console.log(this.sidemenuItems);
         console.log(this.people[0]);
         
        // this.getSideMenuItems();

         this.loadFormControl(this.people);
         

         this.form.patchValue({quote: quote})
         this.quoteAmt = quote;
    },
  (err) => { 
     this.iSuccessError.mError = err;
     this.toastrService.error(err, 'Error!');
     if(err == 'No results found!'){
       
     }
  })

  }

  getSideMenuItems(){
    console.log("before sidemenuitems");   
    console.log(this.sidemenuItems);

    this.removedMenuItems.forEach(element => {
      console.log(element);      
      let idx = this.sidemenuItems.indexOf(element);
      this.sidemenuItems.splice(idx, 1);
    });

    console.log("after sidemenuitems");   
    console.log(this.sidemenuItems);
  }

  loadFormControl(res){
    let ress = res;
    console.log("FORM CONTROL");
    //let quote = <FormArray>this.form.controls['quote'];
    let control = <FormArray>this.form.controls['project_details'];     
    res.forEach((obj,index) => {
      console.log(obj);
      console.log(index);
      control.push(this.initVariation(obj));   
  });   
  }

  getMasterData(){
    let params = ['m_project_scope','m_items'];
    this._commonService.getMasterDetails(params).subscribe(     
      (res) => {
            this.projectScopes = res['result']['info']['m_project_scope'];            
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

    getProjectList(){ 
      let params = [];
      this._commonService.getProjectList(params).subscribe(     
        (res) => {
            this.projects = res['result']['info'];
            //localStorage.setItem("project_id",this.projects[0].id);
  
            this.id = JSON.parse(localStorage.getItem("project_id"));
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
      this.form = this.fb.group({
        quote:[''],  
        project_details: this.fb.array([      
          //this.initVariation(),
      ])
     });
     this.getMasterData(); 
     this.getProjectScopeMasterData();
   
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

onQtyChange(building_class_id,qty,item){
  console.log(this.projectScopes);
  this.calcAmt=0;

  console.log("building_class_id "+building_class_id);
  console.log("qty "+qty);
  console.log("item "+item);  

  this.form.value.project_details.forEach(element => {
    console.log(element);
    console.log(element.aluminium_doors);

     
    if(element.aluminium_windows == ''){element.aluminium_windows=0;}
    this.calcAmt = this.calcAmt + parseInt(element.aluminium_windows) * parseInt(element.aluminium_windows_price);
    

    if(element.aluminium_doors == ''){element.aluminium_doors=0;}
    this.calcAmt = this.calcAmt + parseInt(element.aluminium_doors) * parseInt(element.aluminium_doors_price);

    if(element.curtain_wall == ''){element.curtain_wall=0;}
    this.calcAmt = this.calcAmt + parseInt(element.curtain_wall) * parseInt(element.curtain_wall_price);

    if(element.aluminium_louvres == ''){element.aluminium_louvres=0;}
    this.calcAmt = this.calcAmt + parseInt(element.aluminium_louvres) * parseInt(element.aluminium_louvres_price);

    if(element.kitchens == ''){element.kitchens=0;}
    this.calcAmt = this.calcAmt + parseInt(element.kitchens) * parseInt(element.kitchens_price);

    if(element.kitchenettes == ''){element.kitchenettes=0;}
    this.calcAmt = this.calcAmt + parseInt(element.kitchenettes) * parseInt(element.kitchenettes_price);

    if(element.bedrooms == ''){element.bedrooms=0;}
    this.calcAmt = this.calcAmt + parseInt(element.bedrooms) * parseInt(element.bedrooms_price);

    if(element.laundries == ''){element.laundries=0;}
    this.calcAmt = this.calcAmt + parseInt(element.laundries) * parseInt(element.laundries_price);

    if(element.bathrooms == ''){element.bathrooms=0;}
    this.calcAmt = this.calcAmt + parseInt(element.bathrooms) * parseInt(element.bathrooms_price);

    if(element.ensuites == ''){element.ensuites=0;}
    this.calcAmt = this.calcAmt + parseInt(element.ensuites) * parseInt(element.ensuites_price);

    if(element.balconies == ''){element.balconies=0;}
    this.calcAmt = this.calcAmt + parseInt(element.balconies) * parseInt(element.balconies_price);

    if(element.storage == ''){element.storage=0;}
    this.calcAmt = this.calcAmt + parseInt(element.storage) * parseInt(element.storage_price);

    if(element.study == ''){element.study=0;}
    this.calcAmt = this.calcAmt + parseInt(element.study) * parseInt(element.study_price);

    if(element.garages == ''){element.garages=0;}
    this.calcAmt = this.calcAmt + parseInt(element.garages) * parseInt(element.garages_price);

    if(element.other == ''){element.other=0;}
    this.calcAmt = this.calcAmt + parseInt(element.other) * parseInt(element.other_price);

    if(element.powder_rooms_toilets == ''){element.powder_rooms_toilets=0;}
    this.calcAmt = this.calcAmt + parseInt(element.powder_rooms_toilets) * parseInt(element.powder_rooms_toilets_price);

    if(element.showers == ''){element.showers=0;}
    this.calcAmt = this.calcAmt + parseInt(element.showers) * parseInt(element.showers_price);

    
    
    console.log(this.calcAmt);

    this.form.patchValue({quote: this.calcAmt})
    this.quoteAmt = this.calcAmt;
    
  });

    
    // if(itm != undefined){     
    //   let currValue = this.form.get('quote').value;   
    //   console.log("currValue");
      
    //   let newValue =  parseInt(itm['price']) * qty;
    //   currValue = currValue + newValue;   
    //   console.log(currValue); 
    //   this.form.patchValue({quote: currValue})
      
    //   //this.form.setValue({quote: '5000' });    
    // }



}


cancelFunc(){
  this._router.navigate(['/manageProject']);
}


}
