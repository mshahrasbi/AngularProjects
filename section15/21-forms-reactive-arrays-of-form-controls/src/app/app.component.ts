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

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signupForm);
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
}
