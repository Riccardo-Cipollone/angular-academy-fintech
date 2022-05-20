import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(textToTransform: string, requiredLength: number = 10, suffix: string = '...'): string {
    if (textToTransform.length > requiredLength) {
      const truncatedString: string = `${textToTransform.substring(0, requiredLength).trim()}${suffix}`;
      return truncatedString;
    } else {
      return textToTransform;
    }
  }

}
