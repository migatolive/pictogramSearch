import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar.component';
import { PictogramButtonComponent } from './pictogram-button.component';
import { ArasaacService } from './services/arasaac.service';
import { TextToSpeechService } from './services/speech.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    PictogramButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    ArasaacService,
    TextToSpeechService,
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
