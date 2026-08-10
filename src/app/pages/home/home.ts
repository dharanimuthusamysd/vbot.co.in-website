import { Component, signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar';
import { HeroComponent } from '../../components/hero/hero';
import { LogoStripComponent } from '../../components/logo-strip/logo-strip';
import { D2cIntroComponent } from '../../components/d2c-intro/d2c-intro';
import { FeatureIconsComponent } from '../../components/feature-icons/feature-icons';
import { FeatureCardsComponent } from '../../components/feature-cards/feature-cards';
import { ChallengesComponent } from '../../components/challenges/challenges';
import { ResourcesComponent } from '../../components/resources/resources';
import { MobileAppSectionComponent } from '../../components/mobile-app-section/mobile-app-section';
import { PricingComponent } from '../../components/pricing/pricing';
import { LiveDemoComponent } from '../../components/live-demo/live-demo';
import { HelpCentreComponent } from '../../components/help-centre/help-centre';
import { FooterComponent } from '../../components/footer/footer';
import { ShopifyIntegrationComponent } from '../../components/shopify-integration/shopify-integration';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, HeroComponent, LogoStripComponent,
    D2cIntroComponent, FeatureIconsComponent, FeatureCardsComponent, ChallengesComponent,
    ResourcesComponent, MobileAppSectionComponent, ShopifyIntegrationComponent, PricingComponent, LiveDemoComponent,
    HelpCentreComponent, FooterComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  title = signal('vbot');
}