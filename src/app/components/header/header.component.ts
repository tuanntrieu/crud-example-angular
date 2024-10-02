import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router) {

  }
  onLogout() {
    this.authService.logout().subscribe(
      () => {
        localStorage.removeItem("access_token")
        this.router.navigate(['/'])
      }
    );
  }
}
