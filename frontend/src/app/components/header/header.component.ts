import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  authName?: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authName = this.authService.credentials?.username;
    }
  }

  logOut(): void {
    this.authService.logout();
  }

}
