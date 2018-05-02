import { Component, OnInit } from '@angular/core';
import { Services } from 'app/service/service.service';
import { DefaultModal } from '../default-modal/default-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Session } from 'app/service/session.session';

@Component({
  selector: 'data-tables',
  templateUrl: './dataTables.html',
  styleUrls: ['./dataTables.scss']
})
export class DataTables {
  public popoverTitle: string = 'Popover title';
  public popoverMessage: string = 'Popover description';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  modalHeader: string = 'Activate User';
  data = [];
  data2 = [];
  filterQuery = "";
  rowsOnPage = 10;
  sortBy = "FullName";
  sortOrder = "asc";

  constructor(private session: Session, public router: Router, public service: Services, private modalService: NgbModal, private slimLoader: SlimLoadingBarService) {
  }

  startProgress() {
    this.slimLoader.start(() => {
      console.log('Loading complete');
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

  staticModalShow(user) {
    const activeModal = this.modalService.open(DefaultModal, {
      size: 'sm',
      backdrop: 'static'
    });
    activeModal.componentInstance.modalHeader = this.modalHeader;
    activeModal.componentInstance.modalContent = user;
  }

  viewUser(selecteduser) {
    this.router.navigate(['pages/availables/employee', selecteduser._id]);
  }

  viewStudents(id, title) {
    this.router.navigate(['pages/students/student-list', title, id]);
  }
  
  remove(item) {
    console.log(item);
    this.startProgress();
    this.service.deleteEmployee(item._id).subscribe(res => {
      if (!res.error) {
        this.getData();
        this.completeProgress80();
      } else {
        alert('Error');
        this.completeProgress();
      }
    });
  }

  ngOnInit() {
    this.startProgress();
    this.getData();
  }

  getData() {
    this.data = [];
    this.service.getAllEmployees().subscribe(res => {
      if (res.success) {
        for (let item of res.users) {
          if (item._id != this.session.getId())
            if (item.userIsActiveByAdmin) {
              this.data.push(item);
            }
            else {
              this.data2.push(item);
            }
        }
        this.completeProgress();
      } else {
        console.log(res.msg);
        this.completeProgress();
      }
    });
  }

  toInt(num: string) {
    return +num;
  }

  sortByWordLength = (a: any) => {
    return a.city.length;
  }

}
