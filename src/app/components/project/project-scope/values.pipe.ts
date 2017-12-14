import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'values'
})
export class ValuesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    //return null;
    return Object.keys(value).map(key => value[key]);
  }

}
