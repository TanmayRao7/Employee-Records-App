import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup


  constructor(private formBuilder:FormBuilder, private _http:HttpClient,private router:Router){

    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })

  }

  login(){
      this._http.get<any>("http://localhost:3000/signup").subscribe(res=>{

        const user = res.find((a:any)=>{
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password 
        })
        if(user){
          alert("User Login Successfull")
          this.loginForm.reset()
          this.router.navigate(['dashboard'])
        }else{
          alert("Credential Error or User Not Found")
        }
      })
  }

}
