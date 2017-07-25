import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { AppService } from './app.service';

/**
 * Application Module
 *
 * @export
 * @class AppModule
 */
@NgModule({
    imports: [ BrowserModule, HttpModule, AppRoutes ],
    declarations: [ AppComponent ],
    providers: [ AppService ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
