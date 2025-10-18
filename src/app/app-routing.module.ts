// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddTutorialComponent } from './pages/admin/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from './pages/content/tutorial-details/tutorial-details.component';
import { TutorialsListComponent } from './pages/content/tutorials-list/tutorials-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './guards/auth-guard';
import { LogoutScreenComponent } from './pages/logout-success/logout-success.component';
import { LogoutRouteGuard } from './guards/logout-guard';
import { Oauth2DocComponent } from './pages/content/oauth2-doc/oauth2-doc.component';
import { AuthGuardComponent } from './pages/content/auth-guard/auth-guard.component';
import { CustomersComponent } from './pages/content/customers/customers.component';

import { OidcDocComponent } from './pages/content/oidc-doc/oidc-doc.component';
import { PkceDocComponent } from './pages/content/pkce-doc/pkce-doc.component';
import { SequenceComponent } from './pages/sequence/sequence.component';

export enum AppRoutes {
  Home = '',
  Tutorials = 'tutorials',
  TutorialsDetails = 'tutorials/:id',
  AddTutorials = 'add',
  Logout = 'logout',
  NotFound = '404',
  Dependencies = 'docs/dependencies', // 👈 new route key
  Wiring = 'docs/wiring', // 👈 new route key
  AuthGuard = 'docs/auth-guard', // 👈 new route key
  Environment = 'docs/environment', // 👈 new route key
  AdminLogoutComponent = 'docs/admin-logout', // 👈 new route key
  GettingStartedComponent = 'docs/getting-started', // 👈 new route key
  ViewClaimsComponent = 'docs/view-claims', // 👈 new route key
  SequenceComponent = 'docs/app-sequence', // 👈 new route key
  BuildComponent = 'docs/app-build', // 👈 new route key

  AnyOther = '**',
}

const routes: Routes = [
  { path: AppRoutes.Home, redirectTo: AppRoutes.Tutorials, pathMatch: 'full' },

  { path: AppRoutes.Tutorials, component: TutorialsListComponent },
  { path: AppRoutes.TutorialsDetails, component: TutorialDetailsComponent },
  { path: AppRoutes.AddTutorials, canActivate: [AuthGuard], component: AddTutorialComponent },

  { path: 'docs/oauth2', component: Oauth2DocComponent },
  { path: 'docs/oidc', component: OidcDocComponent },
  { path: 'docs/pkce', component: PkceDocComponent },
  { path: 'docs/customers', component: CustomersComponent },

  // ✅ Standalone component (lazy-loaded)
  {
    path: AppRoutes.Dependencies,
    loadComponent: () =>
      import('./pages/content/dependencies/dependencies.component')
        .then(m => m.DependenciesComponent),
  },
  {
    path: AppRoutes.Wiring,
    loadComponent: () =>
      import('./pages/content/wiring/wiring.component')
        .then(m => m.WiringComponent),
  },
  {
    path: AppRoutes.AuthGuard,
    loadComponent: () =>
      import('./pages/content/auth-guard/auth-guard.component')
        .then(m => m.AuthGuardComponent),
  },
  // ➜ New Environment doc (standalone)
  {
    path: 'docs/environment',
    loadComponent: () =>
      import('./pages/content/environment/environment.component')
        .then(m => m.EnvironmentComponent)
  },
  {
    path: 'docs/app-sequence',
    loadComponent: () =>
      import('./pages/sequence/sequence.component')
        .then(m => m.SequenceComponent)
  },
  {
    path: 'docs/app-build',
    loadComponent: () =>
      import('./pages/build/build.component')
        .then(m => m.BuildComponent)
  },
  {
    path: 'docs/landingpage',
    loadComponent: () =>
      import('./pages/content/landingpage/landingpage.component')
        .then(m => m.LandingpageComponent)
  },
  {
    path: 'docs/admin-logout',
    loadComponent: () =>
      import('./pages/content/admin-logout/admin-logout.component')
        .then(m => m.AdminLogoutComponent)
  },
  {
    path: 'docs/getting-started',
    loadComponent: () =>
      import('./pages/content/getting-started/getting-started.component')
        .then(m => m.GettingStartedComponent)
  },
  {
    path: 'docs/view-claims',
    loadComponent: () =>
      import('./pages/content/view-claims/view-claims.component')
        .then(m => m.ViewClaimsComponent)
  },
  {
    path: AppRoutes.Logout,
    canActivate: [LogoutRouteGuard],
    component: LogoutScreenComponent,
  },
  { path: AppRoutes.AnyOther, redirectTo: AppRoutes.NotFound },
  { path: AppRoutes.NotFound, component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
