import { Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss'
})
export class PricingComponent {}