import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { LetterStatus } from '../../board.component';
import { WORD_LENGTH } from '../../board.constants';
import { LetterComponent } from '../letter/letter.component';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {
  @Input() keyboard!: number[];
  iterator: number[] = Array(WORD_LENGTH).fill(0);
  currLetterIndex: number = 0;
  isRevealed: boolean = false;

  @ViewChildren('letters') letters!: QueryList<LetterComponent>;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  getWord(): string {
    let word = '';

    this.letters.forEach((letter: LetterComponent) => {
      word += letter.value;
    });

    return word;
  }

  wordExists(): Observable<any> {
    const params = new HttpParams().set('value', this.getWord());
    return this.apiService.getByQuery('AcceptedWords', params);
  }

  revealWord(answer: string): void {
    const answerMap: AnswerMap = {};

    for (let i = 0; i < answer.length; i++) {
      if (!answerMap[answer.charAt(i)]) {
        answerMap[answer.charAt(i)] = 1;
      }
      else {
        answerMap[answer.charAt(i)]++;
      }
    }

    let index: number = 0;
    // Check for letters in the correct spot first
    this.letters.forEach((letter: LetterComponent) => {
      if (answer.charAt(index) == letter.value) {
        letter.backgroundColor = '#388E3C';
        this.keyboard[letter.value.charCodeAt(0) - 65] = LetterStatus.GREEN;
        answerMap[letter.value!]--;
      }
      index++;
    });

    // Then check for letters in the wrong spot
    this.letters.forEach((letter: LetterComponent) => {
      if (answerMap[letter.value!] && !letter.backgroundColor) {
        letter.backgroundColor = '#FBC02D';
        this.keyboard[letter.value!.charCodeAt(0) - 65] = LetterStatus.YELLOW;
        answerMap[letter.value!]--;
      } else if (!letter.backgroundColor) {
        this.keyboard[letter.value!.charCodeAt(0) - 65] = LetterStatus.INCORRECT;
      }
    });

    // Reveal each letter 0.2 seconds apart
    let timeoutIndex: number = 0;
    this.letters.forEach((letter: LetterComponent) => {
      setTimeout(() => { letter.isRevealed = true }, 200 * timeoutIndex);
      timeoutIndex++;
    });
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

  /**
   * Called when user restarts game
   */
  clearWord(): void {
    this.letters.forEach((letter: LetterComponent) => {
      letter.backgroundColor = '';
      letter.value = undefined;
      letter.isRevealed = false;
    });
    this.currLetterIndex = 0;
  }

}

interface AnswerMap {
  [letter: string]: number;
}
