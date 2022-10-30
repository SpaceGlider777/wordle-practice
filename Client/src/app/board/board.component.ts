import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Word } from '../core/models/word';
import { ApiService } from '../core/services/api.service';
import { NotificationService } from '../core/services/notification.service';
import { PauseGameService } from '../core/services/pause-game.service';
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
  answer?: string;
  keyboard: number[] = [];
  letterColors = ['unset', '#FBC02D', '#388E3C', '#D50000'];

  @ViewChildren('words') words!: QueryList<WordComponent>;

  constructor(
    private notificationService: NotificationService, 
    private apiService: ApiService,
    private pauseGameService: PauseGameService
    ) { }

  ngOnInit(): void {
    this.getWord().subscribe((word: Word) => {
      this.answer = word.value.toUpperCase();
    });

    this.resetKeyboard();
  }

  resetKeyboard(): void {
    for (let i = 0; i < 26; i++) {
      this.keyboard[i] = LetterStatus.UNKNOWN;
    }
  }

  getWord(): Observable<any> {
    return this.apiService.getCount('AnswerWords').pipe(
      switchMap((count: number) => {
        const randomIndex = Math.floor(Math.random() * count);
        return this.apiService.getById('AnswerWords', randomIndex);
      })
    );
  }

  @HostListener('document:keydown', ['$event'])
  handleKeypress(event: KeyboardEvent): void {
    if (!this.answer || this.isGameOver || this.pauseGameService.isGamePaused)
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
        word.wordExists().subscribe(() => {
          word.revealWord(this.answer!);
          
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
        }, (error: HttpErrorResponse) => {
          if (error.status == 404) {
            this.notificationService.show('Word does not exist');
          }
        });
      }
    }
  }

  restart(): void {
    this.getWord().subscribe((word: Word) => {
      this.answer = word.value.toUpperCase();
      this.words.forEach((word: WordComponent) => {
        word.clearWord();
      });
      this.currWordIndex = 0;
      this.isGameOver = false;
    });

    this.resetKeyboard();
  }

}

export enum LetterStatus {
  UNKNOWN,
  YELLOW,
  GREEN,
  INCORRECT
}
