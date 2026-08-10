import { Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-challenges',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './challenges.html',
  styleUrl: './challenges.scss'
})
export class ChallengesComponent {}