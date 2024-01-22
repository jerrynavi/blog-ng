import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.routes').then((m) => m.blogRoutes),
  },
];
