import { Component, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Services } from 'app/service/service.service';
import { Session } from 'app/service/session.session';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  user: any;
  title: string;

  data = [];
  filterQuery = "";
  rowsOnPage = 10;
  sortBy = "FullName";
  sortOrder = "asc";
  constructor(public router: Router, public session: Session, public service: Services, public route: ActivatedRoute, private renderer: Renderer, private slimLoader: SlimLoadingBarService) {
  }

  startProgress() {
    this.slimLoader.start(() => {
    });
    this.slimLoader.color = 'green';
    this.slimLoader.height = '5px';
  }

  completeProgress80() {
    this.slimLoader.progress = 80;
  }

  completeProgress() {
    this.slimLoader.complete();
  }

  back() {
    window.history.back();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.title = params['title'];
      this.startProgress();
      this.service.getAssignedStudents(params['id']).subscribe(res => {
        if (res.success) {
          this.user = res.User;
          this.completeProgress80();
          // get all assigned student lists
          for (let item of res.students) {
            this.data.push(item);
          }
          this.completeProgress();
        } else {
          console.log(res.msg);
          this.completeProgress();
        }
      });
    });
  }

}
