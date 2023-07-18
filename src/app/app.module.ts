import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ShareModule} from "./share/share.module";
import { DynamicPageComponent } from './reactive/pages/dynamic-page/dynamic-page.component';
import { SwitchesPageComponent } from './reactive/pages/switches-page/switches-page.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShareModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
