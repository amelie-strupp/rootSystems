import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectedRootSystemsComponent } from './components/projected_root_systems/projected-root-systems/projected-root-systems.component';
import { RootSystems2DComponent } from './components/root-systems2-d/root-systems2-d.component';
import { RootSystems3DComponent } from './components/root-systems3-d/root-systems3-d.component';

const routes: Routes = [
  { path: '2D', component: RootSystems2DComponent },
  { path: '3D', component: RootSystems3DComponent },
  { path: 'Projection', component: ProjectedRootSystemsComponent },

  {path: '**', component: RootSystems2DComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
