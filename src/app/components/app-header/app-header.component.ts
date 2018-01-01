import { Component, ElementRef } from '@angular/core';
import { CommonService } from 'app/_service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  providers:[CommonService]
})
export class AppHeader {

  projects:any;
  project:any = 1; 
  constructor(private el: ElementRef,private _commonService:CommonService,private _router:Router) {

   }

  //wait for the component to render completely
  ngOnInit(): void {
    var nativeElement: HTMLElement = this.el.nativeElement,
    parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);

    this.getMasterData();
    
  }


  getMasterData(){ 
    let params = [];
    this._commonService.getProjectList(params).subscribe(     
      (res) => {
          this.projects = res['result']['info'];
          localStorage.setItem("project_id",this.projects[0].id);

          this.project = JSON.parse(localStorage.getItem("project_id"));
      },
    (err) => { 
        if(err == 'token_expired'){
              this._router.navigate(['/logout']);
         }
    }) 
    }

    changeProject() {
      console.log(this.project);
      localStorage.setItem("project_id",this.project);
  }

}
