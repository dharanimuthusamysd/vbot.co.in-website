import { Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-shopify-integration',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './shopify-integration.html',
  styleUrl: './shopify-integration.scss'
})
export class ShopifyIntegrationComponent {}