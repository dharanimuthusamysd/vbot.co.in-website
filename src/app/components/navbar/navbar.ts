import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  isMenuOpen = false;
  isScrolled = false;

  private ticking = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  @HostListener('window:scroll')
  onScroll() {
    // Only read/update once per animation frame, no matter how many
    // scroll events fire in between — this stops layout thrashing.
    if (!this.ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        if (!this.isScrolled && scrollY > 40) {
          this.isScrolled = true;
        } else if (this.isScrolled && scrollY < 20) {
          this.isScrolled = false;
        }

        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  startFreeTrial() {
    // route to signup flow
  }
}