import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/overview-page/overview-page.component').then(m => m.OverviewPageComponent)
  },
  {
    path: 'deliveries',
    loadComponent: () => import('./pages/deliveries-page/deliveries-page.component').then(m => m.DeliveriesPageComponent)
  },
  {
    path: 'routes',
    loadComponent: () => import('./pages/routes-page/routes-page.component').then(m => m.RoutesPageComponent)
  },
  {
    path: 'stocks',
    loadComponent: () => import('./pages/stocks-page/stocks-page.component').then(m => m.StocksPageComponent)
  },
  {
    path: 'costs',
    loadComponent: () => import('./pages/costs-page/costs-page.component').then(m => m.CostsPageComponent)
  }
];

