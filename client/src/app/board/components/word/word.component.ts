import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {
  currentLetterIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  insertLetter(): void {

  }

  deleteLetter(): void {

  }

}
