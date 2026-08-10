import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss',
})
export class PrivacyPolicy implements AfterViewInit, OnDestroy {
  lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  currentYear = new Date().getFullYear();

  toc = [
    { id: 'sec-1', label: '1. Definitions' },
    { id: 'sec-2', label: '2. Information Collection and Use' },
    { id: 'sec-3', label: '3. Use of Data' },
    { id: 'sec-4', label: '4. Retention of Data' },
    { id: 'sec-5', label: '5. Transfer of Data' },
    { id: 'sec-6', label: '6. Disclosure of Data' },
    { id: 'sec-7', label: '7. Security of Data' },
    { id: 'sec-8', label: '8. GDPR Rights' },
    { id: 'sec-9', label: '9. Do Not Track Signals' },
    { id: 'sec-10', label: '10. CCPA Rights' },
    { id: 'sec-11', label: '11. Service Providers' },
    { id: 'sec-12', label: '12. Analytics' },
    { id: 'sec-13', label: '13. CI/CD Tools' },
    { id: 'sec-14', label: '14. Advertising' },
    { id: 'sec-15', label: '15. Behavioral Remarketing' },
    { id: 'sec-16', label: "16. Children's Privacy" },
    { id: 'sec-17', label: '17. Changes to This Policy' },
    { id: 'sec-18', label: '18. Contact Us' },
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