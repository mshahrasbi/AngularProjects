import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];

  signupForm: FormGroup;
  forbiddenUsernames = ['mmm', 'xxx', 'yyy', 'zzz'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // this.signupForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });

    this.signupForm.statusChanges.subscribe((status) => {
      console.log(status);
    });

    this.signupForm.setValue({
      'userData': {
        'username': 'Joan',
        'email': 'joan@mail.com'
      },
      'gender': 'female',
      'hobbies': []
    });

    this.signupForm.patchValue({
      'userData': {
        'username': 'Anna',
      }
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    
    this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);

    /*
    here we have to tell Typescript that this is of type FormArray do not get an error.
    you rarely have to do this but here we have to explicity cast this. So by placing
    <FormArray> then placing whole in (), we are telling typescript this part actually
    is a FormArray, so everything enclosed in these outer () now is treated as FormArray
    so now we can push a new control on this array
    */
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  // OR
  get controls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }
  /*
  think about who is calling this function, we are not calling if from inside of this class,
  Angular will call it when it checks the validity. 
  to be able to call this function we have to bind(this) to the function like this:
    'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)])
  */
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true};
    } else {
      return null; // we should return null if the this is false
    }
  }

  forbiddenEmail(control: FormControl): Promise<any> | Promise<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });

    return promise;
  }

}
