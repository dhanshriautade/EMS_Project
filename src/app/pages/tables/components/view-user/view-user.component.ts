import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Services } from 'app/service/service.service';
import { ViewChild, Input, Output, EventEmitter, ElementRef, Renderer } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { environment } from 'environments/environment.prod';
import * as XLSX from 'xlsx';
import { Session } from 'app/service/session.session';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
type AOA = any[][];

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  profileUrl: string;
  sendList = [];
  user: any;
  fileselected = false;
  uploadSelected: any;
  checker: boolean = false;

  source = '';

  data: AOA = null;
  previewTable = false;


  duplicateRecords = [];
  badRecords = [];
  badRecordsfound = false;
  duplicateRecordsfound = false;
  @Input() defaultValue: string = '';
  sourceList = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };

  constructor(public router: Router, public toastr: ToastsManager, vcr: ViewContainerRef, public session: Session, public service: Services, public route: ActivatedRoute, private renderer: Renderer, private slimLoader: SlimLoadingBarService) {
    this.toastr.setRootViewContainerRef(vcr);
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

  onFileChange(evt: any) {
    this.startProgress();
    this.defaultValue = evt.target.value;
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1)
      this.toastr.warning('Please Select Only One File!', 'Warning!', { dismiss: 'auto' });
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      /* save data */
      this.completeProgress80();
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data);
      this.completeProgress80();
      this.checker = true;
      this.completeProgress();
    };
    reader.readAsBinaryString(target.files[0]);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.startProgress();
      this.service.getEmployeeById(params['id']).subscribe(res => {
        if (res.success) {
          this.user = res.user;
          if (res.user.profileUrl.indexOf('http') != -1) {
            this.profileUrl = res.user.profileUrl;
          } else {
            this.profileUrl = environment.profilepic + '' + res.user.profileUrl;
          }
          this.completeProgress();
        } else {
          console.log(res.msg);
          this.completeProgress();
        }
      });
    });
    this.sourceList = [
      "Naukri.com",
      "FirstNaukri.com",
      "Quikr.com",
    ];
  }
  back() {
    window.history.back();
  }
  confirmUpload() {
    if (this.checker && this.source != '' && this.data.length && this.data.length > 0) {
      this.startProgress();
      var headerList = this.data.splice(0, 1);
      var temp: RegExp = new RegExp('[A-Za-z0-9.%+-]+@[A-Za-z.-]+\.[A-Za-z]{2,3}$');
      // for first naukri...
      if (this.source == "FirstNaukri.com") {
        for (let item of this.data) {
          if (item[2] != '' && item[2] != ' ' && item[2] != null && item[2] != undefined) {
            item[2] = item[2].replace(/[\s]/g, '');
            if (temp.test(item[2])) {
              this.sendList.push({
                "FullName": item[0],
                "MobNo": item[1],
                "Email": item[2],
                "DateOfBirth": item[3],
                "CurrentAddress": item[4],
                "PostalAddress": item[5],
                "UGDegree": item[6],
              });
            } else {
              this.badRecords.push(item[2]);
            }
          } else {
            this.badRecords.push(item[2]);
          }
        }
      } else if (this.source == "Naukri.com") {
        for (let item of this.data) {
          if (item[2] != '' && item[2] != ' ' && item[2] != null && item[2] != undefined) {
            item[2] = item[2].replace(/[\s]/g, '');
            if (temp.test(item[2])) {
              this.sendList.push({
                "FullName": item[0],
                "MobNo": item[1],
                "Email": item[2],
                "DateOfBirth": item[3],
                "CurrentAddress": item[4],
                "PostalAddress": item[5],
                "UGDegree": item[6],
              });
            } else {
              this.badRecords.push(item[2]);
            }
          } else {
            this.badRecords.push(item[2]);
          }
        }
      } else if (this.source == "Quikr.com") {
        for (let item of this.data) {
          if (item[2] != '' && item[2] != ' ' && item[2] != null && item[2] != undefined) {
            item[2] = item[2].replace(/[\s]/g, '');
            if (temp.test(item[2])) {
              this.sendList.push({
                "FullName": item[0],
                "MobNo": item[1],
                "Email": item[2],
                "DateOfBirth": item[3],
                "CurrentAddress": item[4],
                "PostalAddress": item[5],
                "UGDegree": item[6],
              });
            } else {
              this.badRecords.push(item[2]);
            }
          } else {
            this.badRecords.push(item[2]);
          }
        }
      }
      console.log(this.sendList);
      if (this.sendList.length > 0) {
        var list = { data: this.sendList, Source: this.source };
        // call to api here
        this.service.uploadStudentList(list).subscribe(res => {
          if (res.success) {
            console.log('Records Added ' + res.RecordsAdded);
            console.log('Duplicate Records ' + res.RejectedCount);
            console.log('Rejected List ' + res.List);
            console.log('Records added list(ids):' + res.RecordsAddedList);
            if (res.RecordsAddedList.length) {
              if (res.RecordsAddedList.length > 0) {
                this.service.assignStudents(res.RecordsAddedList, this.user._id).subscribe(r => {
                  if (r.success) {
                    this.toastr.success('Students Assigned Successfully!', 'Success!', { dismiss: 'auto' });
                  } else {
                    this.toastr.error('Unable to assign students', 'Error!', { dismiss: 'auto' });
                  }
                })
              }
            }
            if (Array.isArray(res.List)) {
              for (let item of res.List) {
                this.duplicateRecords.push(item);
              }
            } else {
              this.duplicateRecords.push(res.List);
            }
            this.completeProgress();
            this.toastr.success('Records saved successfully!', 'Success!', { dismiss: 'auto' });
            this.clear(null);
          } else {
            this.toastr.error(res.msg, 'Error!', { dismiss: 'auto' });
            this.completeProgress();
          }
        });
      } else {
        this.toastr.error('No Records To Upload', 'Error!', { dismiss: 'auto' });
        this.completeProgress();
      }
    } else {
      if (this.data !== null) {
        this.toastr.warning('No Source Selected', 'Warning!', { dismiss: 'auto' });
      } else {
        this.toastr.warning('File Not Selected', 'Warning!', { dismiss: 'auto' });

      }
    }
    if (this.badRecords.length > 0) {
      this.badRecordsfound = true;
    }
    if (this.duplicateRecords.length > 0) {
      this.duplicateRecordsfound = true;
    }
  }

  viewStudents(id, title) {
    this.router.navigate(['pages/students/student-list', title, id]);
  }

  clear(val: any) {
    this.defaultValue = '';
    this.data = null;
    this.previewTable = false;
    this.source = '';
    this.sendList = [];
  }
  preview() {
    this.previewTable = !this.previewTable;
  }

}
