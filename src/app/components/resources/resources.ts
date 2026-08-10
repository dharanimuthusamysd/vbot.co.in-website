import { Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './resources.html',
  styleUrl: './resources.scss'
})
export class ResourcesComponent {}