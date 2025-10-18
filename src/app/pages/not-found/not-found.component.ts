import { Component } from "@angular/core";
import { CommonModule, Location } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [`
    .nf-wrap { min-height: calc(100vh - 120px); } /* leaves room for navbar/footer if any */
    .nf-illustration { width: 160px; height: 160px; }
    .nf-code { letter-spacing: .08em; }
  `],
  template: `
  <div class="container nf-wrap d-flex align-items-center justify-content-center py-5">
    <div class="card shadow-sm w-100" style="max-width: 860px;">
      <div class="row g-0 align-items-center">
        <!-- Illustration -->
        <div class="col-12 col-md-5 text-center p-4 border-end">
          <!-- Simple SVG illustration (no external assets needed) -->
          <svg class="nf-illustration mb-3" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="60" cy="60" r="58" stroke="#dee2e6" stroke-width="4"/>
            <path d="M20 75c10-20 30-30 55-18" stroke="#6c757d" stroke-width="3" stroke-linecap="round"/>
            <path d="M32 44h20M32 52h12" stroke="#adb5bd" stroke-width="3" stroke-linecap="round"/>
            <circle cx="84" cy="42" r="10" stroke="#0d6efd" stroke-width="3"/>
            <path d="M78 82h14" stroke="#198754" stroke-width="4" stroke-linecap="round"/>
          </svg>
          <div class="text-muted small">We couldn’t find that page.</div>
        </div>

        <!-- Content -->
        <div class="col-12 col-md-7 p-4">
          <div class="d-flex align-items-center mb-2">
            <span class="badge bg-secondary me-2 nf-code">404</span>
            <h1 class="h4 mb-0">Page not found</h1>
          </div>

          <p class="text-muted mb-3">
            The page you’re looking for doesn’t exist, was moved, or the link is broken.
          </p>

          <div class="mb-3">
            <div class="text-muted small">Requested URL</div>
            <code class="d-inline-block text-break">{{ currentUrl || '/' }}</code>
          </div>

          <div class="d-flex flex-wrap gap-2">
            <a class="btn btn-primary" routerLink="/">Go to Home</a>
            <button class="btn btn-outline-secondary" type="button" (click)="goBack()">Go Back</button>
            <a class="btn btn-outline-primary" routerLink="/tutorials">View Tutorials</a>
          </div>

          <hr class="my-4">

          <div class="small text-muted">
            Tip: Check the URL for typos, or use the navigation menu to find what you need.
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})
export class NotFoundComponent {
  currentUrl = '';

  constructor(private location: Location) {
    // shows the path the user tried to access (works well with PathLocationStrategy)
    try {
      this.currentUrl = location.path() || window.location.pathname;
    } catch {
      this.currentUrl = '/';
    }
  }

  goBack(): void {
    this.location.back();
  }
}
