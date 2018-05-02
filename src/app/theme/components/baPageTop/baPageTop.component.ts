import { Component } from '@angular/core';

import { GlobalState } from '../../../global.state';
import { Router } from '@angular/router';
import { environment } from 'environments/environment.prod';
import { Session } from 'app/service/session.session';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop {

  public isScrolled: boolean = false;
  public isMenuCollapsed: boolean = false;
  profileUrl: string;
  constructor(private router: Router, private _state: GlobalState, private session: Session) {
    if (this.session.getProfilePic().indexOf('http') != -1) {
      this.profileUrl = this.session.getProfilePic();
    } else {
      this.profileUrl = environment.profilepic + '' + this.session.getProfilePic();
    }
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  profile() {
    this.router.navigate(['pages/edit-profile']);
  }

  signout() {
    this.router.navigate(['login']);
  }
}
