import { Component, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { BOARD_LENGTH, WORD_LENGTH } from './board.constants';
import { WordComponent } from './components/word/word.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  iterator: number[] = Array(BOARD_LENGTH).fill(0);
  currWordIndex: number = 0;

  @ViewChildren('words') words!: QueryList<WordComponent>;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('document:keydown', ['$event'])
  handleKeypress(event: KeyboardEvent): void {
    const word: WordComponent = this.words.get(this.currWordIndex)!;
    if (event.key.match(/[a-z]/i) && event.key.length == 1) {
      word.insertLetter(event.key.toUpperCase());
    }
    else if (event.key == 'Backspace') {
      word.deleteLetter();
    }
    else if (event.key == 'Enter') {
      if (word.currLetterIndex == WORD_LENGTH) {
        this.currWordIndex++;
      }
    }
  }

  nextWord(): void {
    this.currWordIndex++;
  }

}
