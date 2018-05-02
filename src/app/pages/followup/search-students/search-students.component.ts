import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Services } from 'app/service/service.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-search-students',
  templateUrl: './search-students.component.html',
  styleUrls: ['./search-students.component.scss']
})
export class SearchStudentsComponent implements OnInit {
  searchFromDate: any = null;
  searchToDate: any = null;

  sourceList = [];
  source: string = '';
  assigned='';
  dataNaukri: any = [];
  dataFirstNaukri: any = [];
  dataQuikr: any = [];

  data = [];
  filterQuery = "";
  rowsOnPage = 10;
  sortBy = "FullName";
  sortOrder = "asc";

  constructor(public toastr: ToastsManager, public vcr: ViewContainerRef, public service: Services, private slimLoader: SlimLoadingBarService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.sourceList = [
      "Naukri.com",
      "FirstNaukri.com",
      "Quikr.com",
    ];
  }

  searchRecord() {
    this.startProgress();
    if (this.searchFromDate !== undefined && this.searchFromDate !== null)
      this.searchFromDate = this.searchFromDate.year + '-' + this.searchFromDate.month + '-' + this.searchFromDate.day;

    if (this.searchToDate !== undefined && this.searchToDate !== null)
      this.searchToDate = this.searchToDate.year + '-' + this.searchToDate.month + '-' + this.searchToDate.day;

    var filter = {
      startDate: this.searchFromDate,
      endDate: this.searchToDate,
      source: this.source,
      assigned: this.assigned
    };

    this.service.getStudents(JSON.stringify(filter))
      .subscribe(res => {
        if (res.success) {
          var result: any = [];
          this.dataNaukri = [];
          this.dataFirstNaukri = [];
          this.dataQuikr = [];
          result.push(res);
          console.log(result);
          result[0].students.forEach(element => {
            if (element.Source === 'Naukri.com') {
              this.dataNaukri.push(element)
            } else if (element.Source === 'FirstNaukri.com') {
              this.dataFirstNaukri.push(element)
            } else if (element.Source === 'Quikr.com') {
              this.dataQuikr.push(element)
            }
          });
          this.completeProgress();
          this.toastr.success('Records fetched successfully!', 'Success!', { dismiss: 'auto' });
        } else {
          this.slimLoader.color = 'red';
          this.completeProgress();
          this.toastr.success('Unabel to search! Please try again', 'Error!', { dismiss: 'auto' });
        }
      })
  }

  startProgress() {
    this.slimLoader.start(() => {
    });
    this.slimLoader.color = 'green';
    this.slimLoader.height = '5px';
  }

  completeProgress() {
    this.slimLoader.complete();
  }
}
