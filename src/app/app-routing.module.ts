import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'quiz', pathMatch: 'full' },
  {
    path: 'quiz',
    loadChildren: () =>
      import('./pages/quiz/quiz.module').then((m) => m.QuizModule),
  },
  {
    path: '**',
    redirectTo: 'quiz',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
