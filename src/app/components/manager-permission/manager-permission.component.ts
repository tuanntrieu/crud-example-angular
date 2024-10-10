import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { UpdateRole } from '../../models/request/update-role';
import { PermissionResponse } from '../../models/response/persmission-response';
import { ChangePermission } from '../../models/request/change-permission';

@Component({
  selector: 'app-manager-permission',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './manager-permission.component.html',
  styleUrls: ['./manager-permission.component.scss']
})
export class ManagerPermissionComponent {
  listRole!: string[];
  updateRole: UpdateRole = new UpdateRole();
  listPerByRole: PermissionResponse[] = [];
  allPermissions: PermissionResponse[] = [];
  changePer: ChangePermission = new ChangePermission();

  constructor(private authService: AuthService) {
    this.loadRole();
    this.loadAllPermissions();
  }

  loadRole() {
    this.authService.findAllRole().subscribe(
      (response) => {
        this.listRole = response.data;
      }
    );
  }

  loadPermissionByRole() {
    this.authService.loadPermissionByRole(this.updateRole).subscribe(
      (response) => {
        this.listPerByRole = [];
        this.listPerByRole = response.data;
        this.changePer.role = this.updateRole.role;
        this.changePer.permissions = [];
        console.log(this.changePer.permissions);

        for (var i of response.data) {
          this.changePer.permissions.push(i.namePermission);

        }
      }
    );
  }

  loadAllPermissions() {
    this.authService.loadAllPermission().subscribe(
      (response) => {
        this.allPermissions = response.data;
      }
    );
  }

  changePermission() {
    this.authService.changePermission(this.changePer).subscribe(
      (res) => {
        console.log(res);
      }
    );
  }

  onRoleClick(role: string) {
    this.updateRole.role = role;
    this.loadPermissionByRole();
  }

  isChecked(permission: PermissionResponse): boolean {
    return this.listPerByRole.some(per => per.namePermission === permission.namePermission);
  }

  onPerChange(permission: PermissionResponse) {

    console.log(permission);

    if (!this.changePer.permissions.includes(permission.namePermission)) {
      console.log(this.changePer.permissions);
      this.changePer.permissions.push(permission.namePermission);
      console.log(this.changePer.permissions);

    }
    else {
      const indexToRemove: number = this.changePer.permissions.findIndex(item => item == permission.namePermission);

      if (indexToRemove !== -1) {
        this.changePer.permissions.splice(indexToRemove, 1);
      }
    }
    console.log(this.changePer);

    this.changePermission();
  }

}
