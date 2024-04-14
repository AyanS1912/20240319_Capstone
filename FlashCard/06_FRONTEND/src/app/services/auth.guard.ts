import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { RegisterService } from './auth/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: RegisterService,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  canActivate(): Promise<boolean> | boolean {
    return this.authService.isAuthenticated().then(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      } else {
        this.snackBar.open('You need to log in', 'Close', {
          duration: 3000
        });
        this.router.navigate(['/login']);
        return false;
      }
    }).catch(() => {
      this.snackBar.open('An error occurred while checking authentication status', 'Close', {
        duration: 3000
      });
      this.router.navigate(['/login']);
      return false;
    });
  }
}
