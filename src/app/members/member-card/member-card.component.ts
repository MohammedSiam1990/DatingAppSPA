import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() user: User;
  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService ) { }

  ngOnInit() {
  }

  sendLike(id: number) {
    console.log('Start Like');
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe( data => {
      console.log('Second Like');
      this.alertify.success('You have liked:' + this.user.knownAs);
      console.log('Final procces Like');
    }, error => {
      this.alertify.error(error);
    });
  }

}
