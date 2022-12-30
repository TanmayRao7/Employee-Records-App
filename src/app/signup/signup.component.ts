import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm!: FormGroup


  constructor(private formBuilder:FormBuilder, private _http:HttpClient,private router:Router){

    this.signupForm = this.formBuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      password:['']

    })

  }

  signUp(){

    this._http.post<any>("http://localhost:3000/signup",this.signupForm.value).subscribe(res=>{
      alert("SignUp Successfull");
      this.signupForm.reset();
    })
    this.router.navigate(['login'])

  }

}
