import { Pipe, PipeTransform } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Pipe({
  name: 'seemore'
})
export class SeemorePipe implements PipeTransform {

  transform(title: string, limit: number): String {
    return title.split(' ').slice(0, limit).join(' ')
  }
}
