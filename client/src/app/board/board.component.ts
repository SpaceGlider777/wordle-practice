import { Component, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NotificationService } from '../core/services/notification.service';
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
  isGameOver: boolean = false;
  answer: string = 'GUESS';

  @ViewChildren('words') words!: QueryList<WordComponent>;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  @HostListener('document:keydown', ['$event'])
  handleKeypress(event: KeyboardEvent): void {
    if (this.isGameOver)
      return;

    const word: WordComponent = this.words.get(this.currWordIndex)!;
    if (event.key.match(/[a-z]/i) && event.key.length == 1) {
      word.insertLetter(event.key.toUpperCase());
    }
    else if (event.key == 'Backspace') {
      word.deleteLetter();
    }
    else if (event.key == 'Enter') {
      if (word.currLetterIndex == WORD_LENGTH) {
        word.revealWord(this.answer);
        
        if (this.answer == word.getWord()) {
          this.isGameOver = true;
          this.notificationService.show('You win!');
          return;
        }

        if (this.currWordIndex + 1 == BOARD_LENGTH) {
          this.isGameOver = true;
          this.notificationService.show(`The word was ${this.answer}`);
          return;
        }
        
        this.currWordIndex++;
      }
    }
  }

}
