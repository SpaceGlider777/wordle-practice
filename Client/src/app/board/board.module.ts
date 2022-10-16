import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { WordComponent } from './components/word/word.component';
import { LetterComponent } from './components/letter/letter.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    BoardComponent,
    WordComponent,
    LetterComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    MatButtonModule
  ]
})
export class BoardModule { }
