import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss']
})
export class LetterComponent implements OnInit {
  value?: string;

  constructor() { }

  ngOnInit(): void {
  }

  setValue(value?: string): void {
    this.value = value;
  }

}
