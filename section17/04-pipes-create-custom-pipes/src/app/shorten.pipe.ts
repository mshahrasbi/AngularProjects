import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

    transform(value: any, ...args: any[]) {
        if (value.length > 10) {
            return value.substr(0, 10) + ' ...';
        } else {
            return value;
        }
    }

}