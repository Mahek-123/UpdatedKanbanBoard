import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../service/authservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router:Router ,private authService: AuthserviceService,  
    private userService:UserService,
    private _snackBar: MatSnackBar) { }

  loginForm:any|FormGroup;

  loginStatus:boolean=true;

  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  ngOnInit() {
    
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required)
    });
  }

  responsedata:any;
  loginCustomer() {
    this.userService.loginUser(this.loginForm.value).subscribe( response=>{
      this.responsedata=response;
      localStorage.setItem("jwt", this.responsedata.Token);
      console.log(response);

      this.loginStatus=false;

      this.openSnackBar("Your Login was successful", "Ok") 
      console.log(this.loginForm.get('userName').value);
      localStorage.setItem("currentUser", this.loginForm.get('userName').value)
       
      this.userService.setUser(this.loginForm.get('userName').value);         
      this.router.navigate(['/boardView']);      
  
    }, error=> {

      this.openSnackBar("There was error Login Try again", "Ok")  

    })
  }
  logout(){

    this.loginForm.reset();
    this.loginStatus=true;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  // Route to register page

  toRegisterPage(){
   this.router.navigate(['/register']); 
  }
}
