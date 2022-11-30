import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private notification: NotificationService) { }

    public logout(): void {
      this.authService.logout().subscribe(response => {
        this.notification.showMessage("Até logo!");
        this.router.navigate(["/login"]);
      });
    }

  ngOnInit(): void {
  }

}
