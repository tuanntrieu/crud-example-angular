import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { UpdateRole } from '../../models/request/update-role';
import { jwtDecode } from 'jwt-decode';
import { PermissionConstant } from '../../models/permission-constant';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public canCreateStudent: boolean = false;
  public canManageRole: boolean = false;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.checkPermissions(PermissionConstant.CREATE_STUDENT).then((canCreate) => {
      this.canCreateStudent = canCreate;
    });
    this.authService.checkPermissions(PermissionConstant.MANAGE_ROLES).then((canManage) => {
      this.canManageRole = canManage;
    });
    
  }

  onLogout() {
    this.authService.logout().subscribe(
      () => {
        localStorage.removeItem("access_token");
        this.router.navigate(['/']);
      }
    );
  }
}
