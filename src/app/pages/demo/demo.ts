import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';

interface CalendarDay {
  date: Date;
  day: number;
  inCurrentMonth: boolean;
  isPast: boolean;
  isSunday: boolean;
  isToday: boolean;
}

interface BookingForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
}

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NavbarComponent, FooterComponent],
  templateUrl: './demo.html',
  styleUrls: ['./demo.scss']
})
export class Demo {
  // ---- API ----
  // Point this at your backend. During local dev this is localhost:4000;
  // update it to your deployed backend URL when you go live.
  private readonly apiUrl = '/api/bookings';

  readonly demoDurationLabel = '30 min';
  readonly availabilityLabel = 'Mon – Sat, 10:00 AM – 5:00 PM';
  readonly timezoneLabel = 'IST (UTC+5:30)';

  readonly weekDayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  monthCursor = this.startOfMonth(new Date());
  calendarDays: CalendarDay[] = [];

  selectedDate: Date | null = null;
  selectedTime: string | null = null;
  timeSlots: string[] = [];

  form: BookingForm = { name: '', email: '', phone: '', company: '', notes: '' };
  submitted = false;
  submitting = false;
  submitError: string | null = null;

  trustPoints = [
    { kind: 'response', label: 'Avg. response time', value: '< 2 hrs' },
    { kind: 'duration', label: 'Demo duration', value: this.demoDurationLabel },
    { kind: 'availability', label: 'Availability', value: this.availabilityLabel }
  ];

  whatToExpect = [
    'A walkthrough of the real Vbot dashboard — inbox, campaigns, and leads CRM',
    'How Shopify orders and abandoned carts flow into WhatsApp automatically',
    'Reporting: sent, delivered and read rates for your own use case',
    'Open Q&A — no generic slides, just the product'
  ];

  constructor(private http: HttpClient) {
    this.buildCalendar();
  }

  // ---- Calendar ---- (unchanged)

  private startOfMonth(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), 1);
  }

  get monthLabel(): string {
    return this.monthCursor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  private buildCalendar(): void {
    const year = this.monthCursor.getFullYear();
    const month = this.monthCursor.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const lastOfMonth = new Date(year, month + 1, 0);
    const firstWeekday = (firstOfMonth.getDay() + 6) % 7;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days: CalendarDay[] = [];

    for (let i = firstWeekday; i > 0; i--) {
      const date = new Date(year, month, 1 - i);
      days.push(this.toCalendarDay(date, false, today));
    }

    for (let day = 1; day <= lastOfMonth.getDate(); day++) {
      const date = new Date(year, month, day);
      days.push(this.toCalendarDay(date, true, today));
    }

    while (days.length % 7 !== 0) {
      const last = days[days.length - 1].date;
      const date = new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1);
      days.push(this.toCalendarDay(date, false, today));
    }

    this.calendarDays = days;
  }

  private toCalendarDay(date: Date, inCurrentMonth: boolean, today: Date): CalendarDay {
    const isSunday = date.getDay() === 0;
    const isPast = date.getTime() < today.getTime();
    const isToday = date.getTime() === today.getTime();
    return { date, day: date.getDate(), inCurrentMonth, isPast, isSunday, isToday };
  }

  isSelectable(d: CalendarDay): boolean {
    return d.inCurrentMonth && !d.isPast && !d.isSunday;
  }

  isSelectedDay(d: CalendarDay): boolean {
    return !!this.selectedDate && d.date.toDateString() === this.selectedDate.toDateString();
  }

  prevMonth(): void {
    const prev = new Date(this.monthCursor.getFullYear(), this.monthCursor.getMonth() - 1, 1);
    const today = this.startOfMonth(new Date());
    if (prev.getTime() < today.getTime()) return;
    this.monthCursor = prev;
    this.buildCalendar();
  }

  nextMonth(): void {
    this.monthCursor = new Date(this.monthCursor.getFullYear(), this.monthCursor.getMonth() + 1, 1);
    this.buildCalendar();
  }

  selectDay(d: CalendarDay): void {
    if (!this.isSelectable(d)) return;
    this.selectedDate = d.date;
    this.selectedTime = null;
    this.timeSlots = this.buildTimeSlots(d.date);
  }

  // ---- Time slots ---- (unchanged)

  private buildTimeSlots(date: Date): string[] {
    const slots: string[] = [];
    const isToday = date.toDateString() === new Date().toDateString();
    const now = new Date();

    for (let hour = 10; hour <= 16; hour++) {
      for (const minute of [0, 30]) {
        const slotDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute);
        if (isToday && slotDate.getTime() <= now.getTime()) continue;
        slots.push(this.formatTime(hour, minute));
      }
    }
    return slots;
  }

  private formatTime(hour: number, minute: number): string {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    const displayMinute = minute === 0 ? '00' : String(minute);
    return `${displayHour}:${displayMinute} ${period}`;
  }

  selectTime(slot: string): void {
    this.selectedTime = slot;
  }

  // ---- Form ----

  get canSubmit(): boolean {
    return !!this.selectedDate && !!this.selectedTime
      && this.form.name.trim().length > 0
      && this.form.email.trim().length > 0
      && !this.submitting;
  }

  get selectedDateLabel(): string {
    return this.selectedDate
      ? this.selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
      : '';
  }

  // Builds YYYY-MM-DD from the LOCAL date parts — avoids the UTC
  // conversion bug in toISOString(), which can roll the date back
  // a day for timezones ahead of UTC (like IST, UTC+5:30).
  private toLocalISODate(d: Date): string {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  submit(): void {
    if (!this.canSubmit || !this.selectedDate || !this.selectedTime) return;

    this.submitting = true;
    this.submitError = null;

    // Format the date as YYYY-MM-DD for the backend/MySQL DATE column
    const isoDate = this.toLocalISODate(this.selectedDate);

    const payload = {
      name: this.form.name,
      email: this.form.email,
      phone: this.form.phone,
      company: this.form.company,
      notes: this.form.notes,
      date: isoDate,
      time: this.selectedTime
    };

    this.http.post(this.apiUrl, payload).subscribe({
      next: () => {
        this.submitting = false;
        this.submitted = true;
      },
      error: (err) => {
        console.error('Booking failed:', err);
        this.submitting = false;
        this.submitError = 'Something went wrong saving your booking. Please try again.';
      }
    });
  }

  bookAnother(): void {
    this.submitted = false;
    this.selectedDate = null;
    this.selectedTime = null;
    this.form = { name: '', email: '', phone: '', company: '', notes: '' };
  }
}