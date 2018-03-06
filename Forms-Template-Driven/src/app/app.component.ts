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

  /* * 
   * @ViewChild('f') signUpForm:NgForm : this allow us to get access all times to the form by:   
   * using a selector 'f' (local ref #f in the template) we get access to the form! whenever we like it!
   *
   * We could also pass a component instead of selector (string : 'f') to get a access 
   * to the first occurence of the component nested in the AppComponent:
   * (eg.: @ViewChild(NestedComponentWinthinAppComp)) myNestedComponentWinthinAppComp: NestedComponentWinthinAppComp;
   */
  @ViewChild('f') signUpForm:NgForm;
  suggestUserName() {
    const suggestedName = 'Superuser';
    const suggestedEmail = 'Superuser@email.com';

  //a better approach is to use an update (this.signUpForm.form.patchValue), 
  //otherwise all values will be replaced if we use this.signUpForm.setValue
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
   *        to be more accurate the JS form type is HTMLFormElement:
   *            onSubmit(form:HTMLFormElement), HTMLFormElement is pure JS object not a class!
   */

   
  //using NgForm is more powerfull way to access a form in the template (#f="ngForm"), it will allow us to
  // have full access to the controls of the form : (properties and validation to enhance user experience), e.g.:
  // form.value = {email:"Mail",secret:"teacher",username:"Username"}
  
  
  /*
  * since we use "@ViewChild('f') signUpForm:NgForm"  we no longer need to pass form as param
  */
  // onSubmit(form:NgForm){
  //   console.log(form);
  //   console.log('Submitted!');
  // } 
  
  //Alternative approach: "@ViewChild('f') signUpForm:NgForm", with no params for onSubmit()
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
     * if we pass the same JS object as for setValue, hence you could only reset specific values
     * see example here after where we keep some original values
     
    this.signUpForm.reset({
        userData:
                {'username':this.signUpForm.value.userData.username},
        gender: this.defaultGender, 
        secret:this.defaultQuestion
    });    
     */    


  }


}
