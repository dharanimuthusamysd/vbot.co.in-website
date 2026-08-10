import { Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-help-centre',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './help-centre.html',
  styleUrl: './help-centre.scss'
})
export class HelpCentreComponent {}