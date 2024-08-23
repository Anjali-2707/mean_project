import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSave(form: NgForm){
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    const {email, password} = form.value;
    this.auth.loginUser({email, password})
    .subscribe((result) => {
      console.log(result);
      this.router.navigate(['/posts']);
    })
  }   

  goToSignUp(){
    this.router.navigate(['/signup']);
  }
  // hide = signal(true);
  // clickEvent(event: MouseEvent) {
  //   this.hide.set(!this.hide());
  //   event.stopPropagation();
  // }

}


