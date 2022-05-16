import { Component, OnInit } from '@angular/core';
import { faFacebook, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faGithub = faGithub;

  constructor() { }

  ngOnInit(): void {
  }

}
