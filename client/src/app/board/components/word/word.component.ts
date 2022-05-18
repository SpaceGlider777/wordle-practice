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
  isRevealed: boolean = false;

  @ViewChildren('letters') letters!: QueryList<LetterComponent>;

  constructor() { }

  ngOnInit(): void {
  }

  getWord(): string {
    let word = '';

    this.letters.forEach((letter: LetterComponent) => {
      word += letter.value;
    });

    return word;
  }

  revealWord(answer: string): void {
    let index: number = 0;
    const answerMap: AnswerMap = {};

    for (let i = 0; i < answer.length; i++) {
      if (!answerMap[answer.charAt(i)]) {
        answerMap[answer.charAt(i)] = 1;
      }
      else {
        answerMap[answer.charAt(i)]++;
      }
    }

    // Check for letters in the correct spot first
    this.letters.forEach((letter: LetterComponent) => {
      if (answer.charAt(index) == letter.value) {
        letter.backgroundColor = '#388E3C';
        answerMap[letter.value!]--;
      }
      index++;
    });

    // Then check for letters in the wrong spot
    index = 0;
    this.letters.forEach((letter: LetterComponent) => {
      if (answerMap[letter.value!]) {
        letter.backgroundColor = '#FBC02D';
        answerMap[letter.value!]--;
      }
    });

    this.isRevealed = true;
  }

  insertLetter(letter: string): void {
    if (this.currLetterIndex < WORD_LENGTH) {
      this.letters.get(this.currLetterIndex)!.value = letter;
      this.currLetterIndex++;
    }
  }

  deleteLetter(): void {
    if (this.currLetterIndex > 0) {
      this.letters.get(this.currLetterIndex - 1)!.value = undefined;
      this.currLetterIndex--;
    }
  }

}

interface AnswerMap {
  [letter: string]: number;
}
