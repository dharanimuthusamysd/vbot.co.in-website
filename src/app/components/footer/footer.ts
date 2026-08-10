import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, RevealOnScrollDirective],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {}