import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RootSystems2DComponent } from './components/root-systems2-d/root-systems2-d.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { TransformPanelComponent } from './components/transform-panel/transform-panel.component';
import { SwitchRootSystemPanelComponent } from './components/switch-root-system-panel/switch-root-system-panel.component';
import { RootSystems3DComponent } from './components/root-systems3-d/root-systems3-d.component';
import { SwitchRootSystem3DComponent } from './components/switch-root-system3-d/switch-root-system3-d.component';
import { ObjectSelector3DComponent } from './components/object-selector3-d/object-selector3-d.component';
@NgModule({
  declarations: [
    AppComponent,
    RootSystems2DComponent,
    HomepageComponent,
    TransformPanelComponent,
    SwitchRootSystemPanelComponent,
    RootSystems3DComponent,
    SwitchRootSystem3DComponent,
    ObjectSelector3DComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
