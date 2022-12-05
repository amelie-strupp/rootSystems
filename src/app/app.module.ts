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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ObjectTransformerPanelComponent } from './components/object-transformer-panel/object-transformer-panel.component'; 
import {MatIconModule} from '@angular/material/icon';
import { DimensionSwitchButtonComponent } from './components/dimension-switch-button/dimension-switch-button.component';
import { MiniView3DComponent } from './components/mini-view3-d/mini-view3-d.component';
import { ObjectSelector2DComponent } from './components/object-selector2-d/object-selector2-d.component';
import { MiniView2DComponent } from './components/mini-view2-d/mini-view2-d.component';
import { ObjectTransformerPanel2DComponent } from './components/object-transformer-panel2-d/object-transformer-panel2-d.component'; 
import {MatRadioModule} from '@angular/material/radio'; 
@NgModule({
  declarations: [
    AppComponent,
    RootSystems2DComponent,
    HomepageComponent,
    TransformPanelComponent,
    SwitchRootSystemPanelComponent,
    RootSystems3DComponent,
    SwitchRootSystem3DComponent,
    ObjectSelector3DComponent,
    ObjectTransformerPanelComponent,
    DimensionSwitchButtonComponent,
    MiniView3DComponent,
    ObjectSelector2DComponent,
    MiniView2DComponent,
    ObjectTransformerPanel2DComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatIconModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
