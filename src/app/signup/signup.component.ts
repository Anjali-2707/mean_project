import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
  }
  onSave(form: NgForm){
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    const {email, password} = form.value;
    this.auth.saveUser({email, password})
    .subscribe((result) => {
      console.log(result);
      this.router.navigate(['']);
    })
  }

  goToLogin(){
    this.router.navigate(['']);
  }

}
