import { Component, ElementRef } from '@angular/core';



declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: 'login', title: 'Login',  icon: 'dashboard', class: '' },
  { path: 'dashboard', title: 'Dashboard',  icon:'dashboard', class: '' },
  { path: 'manageUsers', title: 'Manage Users',  icon:'person', class: '' },
  { path: 'addUser', title: 'Add User',  icon:'content_paste', class: '' },
  { path: 'editUser', title: 'Edit User',  icon:'library_books', class: '' },
  { path: 'manageRoles', title: 'Manage Roles',  icon:'bubble_chart', class: '' },
  { path: 'addRole', title: 'Add Role',  icon:'location_on', class: '' },
  { path: 'editRole', title: 'Edit Role',  icon:'notifications', class: '' }

];



@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html'
})
export class AppSidebar {
  menuItems: any[];
  constructor(private el: ElementRef) { }

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

    this.menuItems = ROUTES.filter(menuItem => menuItem);

  }
}
