import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-terms-conditions',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './terms-conditions.html',
  styleUrl: './terms-conditions.scss',
})
export class TermsConditions implements AfterViewInit, OnDestroy {
  effectiveDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  currentYear = new Date().getFullYear();

  toc = [
    { id: 'sec-1', label: '1. Introduction' },
    { id: 'sec-2', label: '2. Cookies' },
    { id: 'sec-3', label: '3. License' },
    { id: 'sec-4', label: '4. Comments' },
    { id: 'sec-5', label: '5. Hyperlinking to our Content' },
    { id: 'sec-6', label: '6. iFrames' },
    { id: 'sec-7', label: '7. Content Liability' },
    { id: 'sec-8', label: '8. Reservation of Rights' },
    { id: 'sec-9', label: '9. Removal of Links from our Website' },
    { id: 'sec-10', label: '10. Disclaimer' },
    { id: 'sec-11', label: '11. Contact Us' },
  ];

  private observer?: IntersectionObserver;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => this.observer?.observe(el));
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  print() {
    window.print();
  }
}