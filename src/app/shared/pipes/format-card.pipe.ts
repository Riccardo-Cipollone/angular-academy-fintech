import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCard'
})
export class FormatCardPipe implements PipeTransform {

  transform(text: string): string {
    const formattedCard = [];
    const cardNumber = text.toString();
    
    for (let i = 0; i < cardNumber.length; i+= 4) {
      formattedCard.push(cardNumber.substring(i, i + 4));
    }
    return formattedCard.join(' ');
  }

}