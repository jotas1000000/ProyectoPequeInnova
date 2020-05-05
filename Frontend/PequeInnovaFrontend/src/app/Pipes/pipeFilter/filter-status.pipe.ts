import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStatus'
})
export class FilterStatusPipe implements PipeTransform {

  transform(value: Array<any>): Array<any> {
    return value.filter(el => el.status === true);
  }

}
