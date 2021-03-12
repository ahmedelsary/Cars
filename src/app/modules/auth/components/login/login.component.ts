import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../../../shared/user.service';
import { User } from '../../../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  error: string | null;
  user:User;
  constructor(private userService:UserService, private route:Router)
  {
    this.user=new User();
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null)
      this.route.navigateByUrl('/home');
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.user.userName=this.form.value.username;
      this.user.password=this.form.value.password;
console.log(this.user);
      this.userService.login(this.user).subscribe(
        (res: any)=>{
          console.log(res)
          localStorage.setItem('token', res.token);
          this.route.navigateByUrl("/home");
        },
        err=>{
          this.form.reset();
         this.error ="In valid username or password!"}


      );

    }
    else
    {
      this.error ="Error Happend!"
    }
  }


}
