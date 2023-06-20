import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SimpleUserModel, UserModel } from 'src/api-models/user.model';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy, OnChanges {
  private destroy$ = new Subject<void>();
  private usersLimit = 6;

  @Input()
  user: UserModel | null = null;

  @Input()
  currentUser: UserModel | null = null;

  @Input()
  hasCurrentFollow = false;

  @Output()
  followChange = new EventEmitter<void>();

  followers: Array<SimpleUserModel> = [];
  followsTo: Array<SimpleUserModel> = [];
  mouseOver = false;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const user = changes?.['user']?.currentValue || this.user;
    if (user) {
      this.userService
        .getFollowers(user.id, this.usersLimit)
        .pipe(takeUntil(this.destroy$))
        .subscribe(followers => this.followers = followers);
      this.userService
        .getFollowsTo(user.id, this.usersLimit)
        .pipe(takeUntil(this.destroy$))
        .subscribe(followTo => this.followsTo = followTo);
    }
  }

  onMouseOverFollow($event: MouseEvent) {
    this.mouseOver = $event.type === 'mouseover';
  }

  changeFollow() {
    this.followChange.emit();
  }

  get followLabel() {
    return this.hasCurrentFollow
      ? (this.mouseOver ? 'Unfollow' : 'Followed')
      : 'Follow'
  }

  get followClass() {
    return this.hasCurrentFollow
      ? (this.mouseOver ? 'bi-person-dash-fill': 'bi-person-check-fill')
      : 'bi-person-plus-fill';
  }

  uploadAvatar(input: any) {
    const file: File = input.files[0];
    if (file) {
      this.userService.uploadAvatar(file).subscribe(
        (file) => {
          if (this.currentUser) {
            this.currentUser.avatar = file;
          }
        })
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
