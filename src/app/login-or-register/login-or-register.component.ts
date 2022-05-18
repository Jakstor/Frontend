import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-or-register',
  templateUrl: './login-or-register.component.html',
  styleUrls: ['./login-or-register.component.css'],
  animations: [
    trigger('list1',[
      state('in', style({
        opacity:1,
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        style({
          opacity:0,
          transform: 'translateY(-100px)'
        }),
        animate(800)])
    ])
  ]
})
export class LoginOrRegisterComponent implements OnInit {

  state = '';
  constructor(private router: Router) { }

  ngOnInit(): void {
    // this.state = 'open';
  }

  onRegister(){
    this.router.navigate(['/register']);
  }
  onLogin(){
    this.router.navigate(['/login']);
  }

}
