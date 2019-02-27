import { Pipe, PipeTransform } from '@angular/core';
import { IArticle } from 'src/interfaces';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Array<IArticle>, keyWords: string): Array<IArticle> {
    const listKeyWords = keyWords.trim().split(/\W+/g);

    if (!listKeyWords[0]) {
      return value;
    }

    const filterWordsLowerCase = [];

    listKeyWords.forEach((word) => {
      filterWordsLowerCase.push(word.toLocaleLowerCase());
    });

    return value.filter((news) => {
      return ['author', 'description', 'title'].some((field) => {
        if (news[field]) {
          const wordsField = news[field].trim().split(/\W+/g);
          return wordsField.some((keyWord) => {
            return filterWordsLowerCase.includes(keyWord.toLocaleLowerCase());
          });
        }
      });
    });
  }
}
