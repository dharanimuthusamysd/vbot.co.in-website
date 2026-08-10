import { Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-feature-cards',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './feature-cards.html',
  styleUrl: './feature-cards.scss'
})
export class FeatureCardsComponent {}