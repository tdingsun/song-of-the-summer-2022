import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LensFlareComponent } from './lens-flare/lens-flare.component';
import { NavComponent } from './nav/nav.component';
import { EntriesContainerComponent } from './entries-container/entries-container.component';
import { EntryComponent } from './entries-container/entry/entry.component';
import { ReviewComponent } from './entries-container/entry/review/review.component';
import { MediaComponent } from './entries-container/entry/media/media.component';
import { SafePipe } from './pipes/safe.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LensFlareComponent,
    NavComponent,
    EntriesContainerComponent,
    EntryComponent,
    ReviewComponent,
    MediaComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
