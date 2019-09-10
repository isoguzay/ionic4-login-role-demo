import {
  Component,
  OnInit
} from '@angular/core';
import {
  AuthService
} from 'src/app/services/auth.service';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    email: '',
    pw: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  signIn() {
    this.auth.signIn(this.user).subscribe(user => {
      let role = user['role'];
      if (role === 'USER') {
        this.router.navigateByUrl('/user-dashboard');
      } else if (role === 'ADMIN') {
        this.router.navigateByUrl('/admin-dashboard');
      }
    });
  }
}
