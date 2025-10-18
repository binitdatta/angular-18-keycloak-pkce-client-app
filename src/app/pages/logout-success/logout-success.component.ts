import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-logout-screen',
  standalone: true,
  imports: [RouterModule],
  styles: [`
    .logout-viewport { min-height: 75vh; }
    .logout-icon { font-size: 3rem; line-height: 1; }
    .lead { font-size: 1.1rem; }
  `],
  template: `
    <div class="container logout-viewport d-flex align-items-center justify-content-center">
      <div class="row w-100 justify-content-center">
        <div class="col-12 col-md-10 col-lg-8 col-xl-6">
          <div class="card shadow-sm border-0">
            <div class="card-body p-4 p-md-5 text-center">
              <div class="logout-icon mb-3">👋</div>
              <h1 class="h3 mb-2">You’ve been logged out</h1>
              <p class="lead text-muted mb-4">
                Your session has ended and any cached tokens have been cleared.
              </p>

              <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <a class="btn btn-primary btn-lg px-4" routerLink="/">Go to Home</a>
                <a class="btn btn-outline-secondary btn-lg px-4" routerLink="/">Sign in again</a>
              </div>

              <hr class="my-4">

              <div class="text-muted small">
                Tip: If you logged out from another tab, you may need to refresh this page.
              </div>
            </div>
          </div>

          <div class="text-center mt-3 text-muted small">
            &copy; {{ currentYear }} • Secure OAuth2 / OIDC Demo
          </div>
        </div>
      </div>
    </div>
  `
})
export class LogoutScreenComponent implements OnInit, OnDestroy {
  currentYear = new Date().getFullYear();

  private timerId?: any;
  seconds = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Optional auto-redirect (disabled by default)
    // this.seconds = 5;
    // this.timerId = setInterval(() => {
    //   this.seconds--;
    //   if (this.seconds <= 0) {
    //     clearInterval(this.timerId);
    //     this.router.navigateByUrl('/');
    //   }
    // }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId) clearInterval(this.timerId);
  }
}
