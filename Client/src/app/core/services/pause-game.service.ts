import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PauseGameService {
  isGamePaused: boolean = false;

  constructor() { }
}
