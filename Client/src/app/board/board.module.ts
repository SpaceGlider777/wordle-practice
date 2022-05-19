import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { WordComponent } from './components/word/word.component';
import { LetterComponent } from './components/letter/letter.component';


@NgModule({
  declarations: [
    BoardComponent,
    WordComponent,
    LetterComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule
  ]
})
export class BoardModule { }
