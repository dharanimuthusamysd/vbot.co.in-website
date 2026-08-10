import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-live-demo',
  standalone: true,
  imports: [],
  templateUrl: './live-demo.html',
  styleUrl: './live-demo.scss'
})
export class LiveDemoComponent {

  constructor(private router: Router) {}

  scheduleDemo() {
    this.router.navigate(['/demo']);
  }

}