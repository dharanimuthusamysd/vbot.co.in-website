// mobile-app-section.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-mobile-app',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './mobile-app-section.html',
  styleUrl: './mobile-app-section.scss'
})
export class MobileAppSectionComponent {
  isLoading = signal<boolean>(false);

  // Feature data
  features = [
    {
      icon: '💬',
      title: 'Built for Business Communication',
      description: 'Start new chats, manage customer conversations, send bulk messages, and use WhatsApp-approved templates. Share text, photos, videos, voice notes, documents, and files—all from a unified mobile inbox.'
    },
    {
      icon: '🛍',
      title: 'Connected to Your Business',
      description: 'Stay synced with Shopify to access customers, orders, and abandoned carts. Seamlessly connect with VBook to view invoices, shipment tracking, and order updates without switching between multiple apps.'
    },
    {
      icon: '🤖',
      title: 'Automation on the Go',
      description: 'Send automated customer notifications, order updates, reminders, and follow-ups while managing conversations within WhatsApp\'s customer service window.'
    }
  ];

  // Stats data
  stats = [
    { number: '10K+', label: 'Downloads' },
    { number: '4.8', label: 'App Rating' },
    { number: '50K+', label: 'Messages Sent' }
  ];

  /**
   * Download app - redirect to Play Store
   */
  downloadApp(): void {
    if (this.isLoading()) return;

    this.isLoading.set(true);

    // Simulate loading
    setTimeout(() => {
      this.isLoading.set(false);
      // Open Play Store link
      window.open('https://play.google.com/store/apps/details?id=com.vbot.app', '_blank');
      console.log('Redirecting to Play Store...');
    }, 1000);
  }

  /**
   * Learn more - navigate or scroll
   */
  learnMore(): void {
    console.log('Navigating to mobile app features page');
    // Optional: Scroll to element
    const element = document.getElementById('mobile-features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}