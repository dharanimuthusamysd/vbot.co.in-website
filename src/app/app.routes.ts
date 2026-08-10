import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AboutUsComponent } from './pages/about-us/about-us';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';
import { TermsConditions } from './pages/terms-conditions/terms-conditions';
import { Demo } from './pages/demo/demo';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: 'terms-conditions', component: TermsConditions },
  { path: 'demo', component: Demo },
];