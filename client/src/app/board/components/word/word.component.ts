import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { WORD_LENGTH } from '../../board.constants';
import { LetterComponent } from '../letter/letter.component';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {
  iterator: number[] = Array(WORD_LENGTH).fill(0);
  currLetterIndex: number = 0;

  @ViewChildren('letters') letters!: QueryList<LetterComponent>;

  constructor() { }

  ngOnInit(): void {
  }

  insertLetter(letter: string): void {
    if (this.currLetterIndex < WORD_LENGTH) {
      this.letters.get(this.currLetterIndex)!.setValue(letter);
      this.currLetterIndex++;
    }
  }

  deleteLetter(): void {
    if (this.currLetterIndex > 0) {
      this.letters.get(this.currLetterIndex - 1)!.setValue();
      this.currLetterIndex--;
    }
  }

}
