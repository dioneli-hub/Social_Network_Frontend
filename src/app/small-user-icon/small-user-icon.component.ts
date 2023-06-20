import { Component, Input, OnInit } from '@angular/core';
import { SimpleUserModel } from 'src/api-models/user.model';

@Component({
  selector: 'app-small-user-icon',
  templateUrl: './small-user-icon.component.html',
  styleUrls: ['./small-user-icon.component.css']
})
export class SmallUserIconComponent implements OnInit {

  @Input()
  user: SimpleUserModel | null = null;

  constructor() { }

  ngOnInit(): void {
  }
}