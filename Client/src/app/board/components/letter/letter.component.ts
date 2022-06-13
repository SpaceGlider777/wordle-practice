import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
  animations: [
    trigger('revealLetter', [
      state('unrevealed', style({})),
      state('revealed', style({
        backgroundColor: '{{ background_color }}',
        transform: 'rotateX(180deg)'
      }), { params: { background_color: '' } }),
      transition('unrevealed => revealed', [
        animate('1s')
      ])
    ])
  ]
})
export class LetterComponent implements OnInit {
  value?: string;
  backgroundColor: string = '';

  @Input() isRevealed!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
