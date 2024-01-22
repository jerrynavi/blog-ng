import { Routes } from '@angular/router';
import { BlogComponent } from './blog.component';

export const blogRoutes: Routes = [
  {
    path: '',
    component: BlogComponent,
  },
  {
    path: ':slug',
    pathMatch: 'full',
    loadComponent: () =>
      import('./page-renderer/page-renderer.component').then(
        (m) => m.PageRendererComponent,
      ),
  },
];
