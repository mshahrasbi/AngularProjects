import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  // we don't need extra arguments here, we dont use parameterize
  transform(value: any): any {
    return value.split('').reverse().join('');
  }

}
