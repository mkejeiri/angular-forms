import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';


/* we don't need this for reactive approach */
// import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // FormsModule, /* we don't need this for reactive approach, it required only for template approach */
    HttpModule,    
    ReactiveFormsModule /* we need this for reactive approach, it contains all tools need to build 
                          our forms on our own and sync with our HTML template.
                          we need 'ReactiveFormsModule' to attach or to sync the 'signUpForm' with the form using 
                          a form formGroup directive:
                                e.g. (***): <form [formGroup]='signUpForm' (ngSubmit)="onSubmit()">
                          if we forget to include the 'ReactiveFormsModule', (***) will give an error                           
                          */

  ],
  providers: [],
  bootstrap: [AppComponent]
})

/* * * * * * * * * * * * * I N F O * * * * * * * * * * * * * * * * * * * * * * * * 
 *  Forms: Angular suggests 2 ways in doing it!
 *  - 'Template-Driven' approach: Angular infers the form Object from the DOM.
 *  - 'Reactive' approach : Form is created programmatically in Typescript
 *                          and sync with the DOM.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
export class AppModule { }
