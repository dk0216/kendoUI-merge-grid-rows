import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
            BrowserModule,
            BrowserAnimationsModule,
            FormsModule,
            GridModule,
            ButtonsModule,
            InputsModule
        ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
