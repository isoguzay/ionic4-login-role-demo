import {
  Injectable
} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router
} from '@angular/router';
import {
  Observable
} from 'rxjs';
import {
  AuthService
} from '../services/auth.service';
import {
  AlertController
} from '@ionic/angular';
import {
  take, map
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService, private alertController: AlertController) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const expectedRole = route.data.role;

    return this.auth.user.pipe(
      take(1),
      map(user => {
        if (!user) {
          this.showAlert();
          return this.router.parseUrl('/login');
        } else {
          let role = user['role'];

          if (expectedRole === role) {
            return true;
          } else {
            this.showAlert();
            return this.router.parseUrl('/login');
          }
        }

      })
    );
  }

  async showAlert() {
    let alert = await this.alertController.create({
      header: 'Unauthorizated',
      message: 'You are not authorized now !',
      buttons: ['OK']
    });
    alert.present();
  }
}
