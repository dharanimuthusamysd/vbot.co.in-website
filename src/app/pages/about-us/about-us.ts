import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, RevealOnScrollDirective],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss'
})
export class AboutUsComponent {}