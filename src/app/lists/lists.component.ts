import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Pagination, PaginationResult } from '../models/pagination';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  likesParam: string;

  constructor(private authService: AuthService, private userService: UserService,
              private route: ActivatedRoute, private alertify: AlertifyService) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users.result;
      console.log(this.users);
      this.pagination = data.users.pagination;
      console.log(this.pagination);
    });
    this.likesParam = 'Likers';
    console.log('Fenish The NGONINIT');
  }

  loadUsers() {
    console.log('Start loadUsers');
    this.userService
      .getUsers(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        null, this.likesParam
      )
      .subscribe(
        (res: PaginationResult<User[]>) => {
          this.users = res.result;
          this.pagination = res.pagination;
          console.log('End loadUsers');
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    // console.log(this.pagination.currentPage);
    this.loadUsers();
  }
}
