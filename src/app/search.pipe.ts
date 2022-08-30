import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any,filterString:string) {
    if(value.length===0){
      return value;

    }

    const games=[];
    for(const game of value){
      if(game['gameName'].includes(filterString)){
        games.push(game);
      }
    }
    return games;
  }

}
