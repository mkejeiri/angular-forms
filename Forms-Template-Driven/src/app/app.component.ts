import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //one way binding with the select input: [ngModel] ="defaultQuestion"
  readonly defaultQuestion:string='pet';
  answer:string='';
  genders:string[]=['Male','Female'];
  readonly defaultGender:string = this.genders[0];
  user={ username:'',email:'',questionAnswer:'', gender:'',secretQuestion:''};
  submitted:boolean=false;

  /**
   * Using a selector 'f' (local ref #f in the template) 
   * we could also get access to the form!
   * we could also pass a component instead of selector (string) to get a access 
   * to the first occurence of the component nested in the AppComponent 
   */
  @ViewChild('f') signUpForm:NgForm;
  suggestUserName() {
    const suggestedName = 'Superuser';
    const suggestedEmail = 'Superuser@email.com';

    //a better approach is to use an update (this.signUpForm.path), 
    //otherwise all values will be replaced by this.signUpForm.setValue
  //   this.signUpForm.setValue(
  //     {
  //       userData:
  //             {'username':suggestedName,
  //              'email':suggestedEmail              
  //             },
  //       secret:'pet',
  //       questionAnswer:this.answer,
  //       gender:'Male'
  //     }
  // );
    this.signUpForm.form.patchValue(
        {
          userData:
                {'username':suggestedName}
        }
      );
    }


  /* *
   * We could also use the following signature
   *        onSubmit(form:ElementRef) :  import { ElementRef } from '@angular/core'; 
   *        onSubmit(form:Form) : import { Form } from '@angular/forms';
   *        to be more accurate we should use:
   *            onSubmit(form:HTMLFormElement), HTMLFormElement is pure JS object not a class!
   */

   //ElementRef: is not a JS created by angular in the template we the do the change #f="ngForm"

  //using NgForm is proper way to access a form in the template and we will get:
  // form.value = {email:"Mail",secret:"teacher",username:"Username"}
  // onSubmit(form:NgForm){
  //   console.log(form);
  //   console.log('Submitted!');
  // } 
  

  //Alternative approach using child view, we no longer pass 
  //the 'f' as param for onSubmit() in the template.
  onSubmit(){ 
    this.submitted=true;
    // console.log(this.signUpForm.value);
    this.user.username=this.signUpForm.value.userData.username;
    this.user.email=this.signUpForm.value.userData.email;    
    this.user.questionAnswer=this.signUpForm.value.questionAnswer;
    this.user.gender=this.signUpForm.value.gender;
    this.user.secretQuestion=this.signUpForm.value.secret;    
  }
  onReset(){
    this.signUpForm.reset();    
    /**
     * this will have the same behviour as this.signUpForm.setValue     
     * if you pass the same JS object as for setValue, hence you could only reset specific values
     * see example here after where we keep some original values
     
      this.signUpForm.reset({
      userData:
            {'username':this.signUpForm.value.userData.username},gender: this.defaultGender, secret:this.defaultQuestion});    
     */    


  }


}
