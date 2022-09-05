import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InfoBarComponent } from './shared/info-bar/info-bar.component';
import { ModalComponent } from './core/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoBarComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
