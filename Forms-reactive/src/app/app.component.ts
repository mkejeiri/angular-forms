import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



/* * * * * * * * * * * * * I N F O * * * * * * * * * * * * * * * * * * * * * * * * 
 *  Forms: Angular suggests 2 ways in doing it!
 *  - 'Template-Driven' approach: Angular infers the form Object from the DOM.
 *  - 'Reactive' approach : Form is created programmatically in Typescript
 *                          and sync with the DOM.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
export class AppComponent implements OnInit {
  readonly genders:string[]=['Male','Female'];
  readonly forbiddenUserNames:string[]=['John','Bob'];

  /* *
   * In the template approach we already imported ngForm (FormsModule,NgModule), i.e. 
   * it's an automatic wrapper of 'FormGroup', in Angular a from is just 
   * a group of controls, hence the overall form is also a 'FormGroup'.
   * */
  signUpForm:FormGroup;

  ngOnInit(){
    // this.signUpForm = new FormGroup({}); //passing an empty JS object, tells this has no controls

    //basic form initialisation with 3 controls: 
    // this.signUpForm = new FormGroup({
    //   /* we use '' to avoid the destruction of property 'username' during minification and to make
    //     sure that the property name is kept (might not necessary, but just in case!),  
    //     because this name porperty will be referenced later in the HTML code!
    //     example:
    //     'username':new FormControl('default username') , //'default username' will be a the defaut value of username control.
    //   */
      
    //   'username':new FormControl(null, Validators.required) , /* defaut value is null*/
    //   'email':new FormControl(null, [Validators.required, Validators.email]), //note that Validators.required() is a function,this won't be immediately
                                                                                  //executed, at this point-in-time,we pass only a ref to the methods
                                                                                  //that why '()' are ommited!!!
    //   'gender':new FormControl('Male')
    // }); 

    //nested FormGroup
    this.signUpForm = new FormGroup({
      /* we use quotes ('') to avoid the destruction of property 'username' during minification and to make
        sure that the property name is kept (might not be necessary, but just in case!),  
        because this 'name property' will be referenced later in the HTML code!
        example:
        'username':new FormControl('default username') , //'default username' will be a the defaut value of username control.
      */
      //nested 'userData' FormGroup: we could use a FormGroup inside a FormGroup = nested FormGroup!  
      'userData': new FormGroup({
        'username':new FormControl(null, [Validators.required,//note that Validators.required() (same goes for email) is a function,
                                                              //this won't be immediately executed, at this point-in-time,
                                                              //we pass only a ref to the methods, that why '()' are ommited!!!
                        this.forbiddenNames.bind(this)  /* * * * * * * * * W A R N I N G * * * * * * * * * * * * * * * * * * 
                                                        * We need to bind forbiddenNames function to 'this' (this component!),
                                                        * because Angular calls it when it checks the validity, at that point in time,
                                                        * the keyword 'this' will not refer to the AppComponent class (we will be outside 
                                                        * of this component), and we will get: 
                                                        *   ERROR TypeError: Cannot read property 'forbiddenUserNames' 
                                                        *   of undefined at AppComponent.forbiddenNames    
                                                        */  

          ]), 
        'email':new FormControl(null, 
                        //array of sync validator
                        [Validators.required,Validators.email],//note that Validators.email() (same goes for required) is a function,
                                                              //this won't be immediately executed, at this point-in-time,
                                                              //we pass only a ref to the methods, that why '()' are ommited!!!  
                        
                        //array of async validator
                        //[this.forbiddenEmails.bind(this)] //we don't use 'this' inside forbiddenEmails func, so no need to do 'bind'                                 
                        [this.forbiddenEmails])
      }),
      'gender':new FormControl('Male'),
      'hobbies': new FormArray([]) //intialy this hold and array of controls!!!
    }); 

    this.signUpForm.valueChanges.subscribe((value)=>{
      // console.log(value);
    })

    this.signUpForm.statusChanges.subscribe((status)=>{
      console.log(status);
    })

    this.signUpForm.setValue({'userData': {
      'username':'Max',
      'email':'max@test.com'},
      'gender':'male',
      'hobbies':[]
    });

    //update: keep all set values but username is set to Brad 
    this.signUpForm.patchValue({'userData': {
      'username':'Brad'}
    });


  }
  /**
   * Unlike the template approach create by angular (template approach), we don't need tio have a reference to the form
   * through some ChildView, because we created it as property of component (this.signUpForm)
   * we could use reactive approach if we have a model that we need to bind to and also make 
   * easily sure that the form structure match the app model, e.g:
   * this.signUpForm.value = {username: "myUserName", email: "myEmail@gmail.com", gender: "Male"} 
   */
    onSubmit(){
      console.log(this.signUpForm);
      //this will empty the form
      this.signUpForm.reset();
    }
    onAddHobby(){
      const control = new FormControl(null,[Validators.required]);
      (<FormArray>this.signUpForm.get('hobbies')).push(control);
    }

  /* * * * * * * * * * * * * * C U S T O M  V A L I D A T O R * * * * * * * * * * * * * * * * * * 
   * A validator is utlimately a function that get automatically executed 
   * by angular when it checks the validity of FormControl whenever there is a change on that control.
   */
  forbiddenNames(control:FormControl):{[x:string]:boolean}{
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
        * when the control value is not forbbiden, we should return null instead of {'nameIsForbbiden':false}
        * otherwise, Angular will not understand that the control is valid!!!!
        * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
        *    info: -1 is true: the func will return 'true' if indexOf = -1 and control stays invalid,
        *    so we need to check against -1, e.g. :(indexOf !== -1)? true:false;
        //  */
        if (control.value !== null){
          return (this.forbiddenUserNames
            .map((item:string)=>{               
              return item.toLowerCase();
            })
            .indexOf((<string>control.value).toLowerCase()) !== -1)? {'nameIsForbbiden':true}:null;
        }
        return null;      
  }
/* *
 * This is async custom validation which suppose to reach the backend and get data.
 * promise & observables are 2 constructs which handles async data.  
 * we don't bind(this): because we don't use 'this' keyword to refer to this component inside the func
 */
  forbiddenEmails(control:FormControl):Promise<any> | Observable <any>{
    const promise = new Promise<any>((resolve,reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          /**
           * We are suppose to return data ({'emailIsForbidden':true)
           * but since we are inside a promise we use a resolve instead!!!.
           */
          resolve({'emailIsForbidden':true});
        } else{
          resolve(null);
        }   
      }, 1500);  
    });
    return promise; 
  }


}
