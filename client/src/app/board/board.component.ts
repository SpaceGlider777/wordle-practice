import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  currentWordIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('document:keypress', ['$event'])
  handleKeypress(event: KeyboardEvent): void {
    console.log(event);
    if (event.key.match(/[a-zA-Z]/)) {
      
    }
    else if (event.key == 'Enter') {

    }
  }

}
