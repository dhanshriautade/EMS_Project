import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ViewContainerRef, ElementRef, Renderer } from '@angular/core';
import * as jQuery from 'jquery';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from 'app/theme/validators';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgUploaderOptions } from 'ngx-uploader';
import { Services } from 'app/service/service.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})

export class EnquiryComponent implements OnInit {

  @Input() defaultPicture: string = '';
  @Input() picture: string = '';
  @Input() uploaderOptions: NgUploaderOptions = { url: '' };
  @Input() canDelete: boolean = true;
  @Output() onUpload = new EventEmitter<any>();
  @Output() onUploadCompleted = new EventEmitter<any>();

  public form: FormGroup;
  public FullName: AbstractControl;
  public Email: AbstractControl;
  public MobNo: AbstractControl;
 // public friendMobNo: AbstractControl;
  public CurrentAddress: AbstractControl;
  public PostalAddress: AbstractControl;
  public UGDegree: AbstractControl;
  //public UGDegreeCollege: AbstractControl;
  public UGDegreePercent: AbstractControl;
  public UGDegreePassYear: AbstractControl;
  public HscDiploma: AbstractControl;
  public HscDiplomaCollege: AbstractControl;
  public HscDiplomaPercent: AbstractControl;
  public HscDiplomaPassYear: AbstractControl;
  public SSC: AbstractControl;
  public SSCCollege: AbstractControl;
  public SSCPercent: AbstractControl;
  public SSCPassYear: AbstractControl;
  public friendName: AbstractControl;
  public Source: AbstractControl;
  public selectedDuration: AbstractControl;
  public CourceToEnroll: AbstractControl;
  public ProgLanguages: AbstractControl;
  public dobForm: AbstractControl;
  duplicateStudent = false;
  public submitted: boolean = false;
  minDate: any
  register = {
    _id: null,
    InterestedInCources: [],
    FullName: null,
    Email: null,
    MobNo: null,
    CurrentAddress: null,
    PostalAddress: null,
     UGDegree: null,
    UGDegreeCollege: null,
    UGPercentage: null,
    PassingYear: null,
    Source: null,
    CourceToEnroll: [],
    ProgLanguages: [],
    DateOfBirth: null
  };
  courses = [];
  matchingList = [];
  dob: NgbDateStruct;
  date: { year: number, month: number };
  degreeList = [
    { degree: "ME - COMPS", value: "ME - COMPS" },
    { degree: "ME - E&TC", value: "ME - E&TC" },
    { degree: "ME - ELEC", value: "ME - ELEC" },
    { degree: "BE - COMPS", value: "BE - COMPS" },
    { degree: "BE - E&TC", value: "BE - E&TC" },
    { degree: "BE - ELEC", value: "BE - ELEC" },
    { degree: "MCA", value: "MCA" },
    { degree: "BSC", value: "BSC" },
    { degree: "BCA", value: "BCA" }
  ];
  hscoptions = [
    { degree: "HSC", value: "HSC" },
    { degree: "DIPLOMA", value: "DIPLOMA" }
  ];

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, fb: FormBuilder, private service: Services) {
    this.toastr.setRootViewContainerRef(vcr);
    this.minDate = { year: 1981, month: 1, day: 1 };
    this.form = fb.group({
      'FullName': [null, Validators.compose([Validators.required,Validators.minLength(4),Validators.pattern('^[a-zA-Z \-\']+')])],
      'Email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'MobNo': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{10,10}')])],
      //"friendMobNo": ['', Validators.compose([Validators.pattern('[0-9]{10,10}')])],
      "dobForm": [null,''],
      "CurrentAddress": [null,''],
      "PostalAddress": [null,''],
      "UGDegree": [null,''],
      //"UGDegreeCollege": [''],
      "UGDegreePercent": ['', Validators.compose([Validators.pattern('[0-9.]{2,2}')])],
      "UGDegreePassYear": ['', Validators.compose([Validators.pattern('[0-9]{4,4}')])],
      //"friendName": [''],
      "Source": [null,''],
     // "selectedDuration": [''],
      "CourceToEnroll": [null,''],
      "ProgLanguages": [null,''],
    });

    this.FullName = this.form.controls['FullName'];
    this.Email = this.form.controls['Email'];
    this.MobNo = this.form.controls['MobNo'];
    //this.friendMobNo = this.form.controls['friendMobNo'];
    this.dobForm = this.form.controls['dobForm'];
    this.CurrentAddress = this.form.controls['CurrentAddress'];
    this.PostalAddress = this.form.controls['PostalAddress'];
    this.UGDegree = this.form.controls['UGDegree'];
    //this.UGDegreeCollege = this.form.controls['UGDegreeCollege'];
    this.UGDegreePercent = this.form.controls['UGDegreePercent'];
    this.UGDegreePassYear = this.form.controls['UGDegreePassYear'];
    //this.friendName = this.form.controls['friendName'];
    this.Source = this.form.controls['Source'];
   // this.selectedDuration = this.form.controls['selectedDuration'];
    this.CourceToEnroll = this.form.controls['CourceToEnroll'];
    this.ProgLanguages = this.form.controls['ProgLanguages'];
  }

  public onSubmit(values: Object): void {
    var temp = [];
    var proglang;
    this.submitted = true;
    if (this.form.valid) {
      this.register.Source = "Direct";
      this.register.DateOfBirth = values["dobForm"]["year"] + '-' + values["dobForm"]["month"] + '-' + values["dobForm"]["day"];
      temp = [];
      for (let item of this.register.CourceToEnroll) {
        temp.push(item);
      }
      this.register.InterestedInCources = temp;
      var t = { data: [this.register] };
      if (this.register._id == null) {
        this.service.uploadStudentList(t).subscribe(res => {
          if (res.success) {
            if (res.RecordsAdded > 0) {
              this.toastr.success('Record added Successfully!', 'Success!', { dismiss: 'auto' });
            } else {
              this.toastr.error('Duplicate Record', 'Error!', { dismiss: 'auto' });
            }
          } else {
            this.toastr.error('Failed to add record', 'Error!', { dismiss: 'auto' });
          }
        });
      } else {
        this.service.updateStudent(this.register).subscribe(res => {
          if (res.success) {
            this.toastr.success('Record added Successfully!', 'Success!', { dismiss: 'auto' });
          } else {
            this.toastr.error('Failed to add record', 'Error!', { dismiss: 'auto' });
          }
        });
      }
    } else {
      this.toastr.warning('please check all field ', 'Error!', { dismiss:'auto' });
    }
  }

  loadStudent() {
    this.register = this.matchingList[0];
    this.dob = this.matchingList[0].DateOfBirth ? this.matchingList[0].DateOfBirth : null;
    this.duplicateStudent = false;
    this.matchingList = [];
    this.register.CourceToEnroll = this.matchingList[0].InterestedInCources ? this.matchingList[0].InterestedInCources : null;
  }

  searchStudent(student) {
    var tempname = this.register.Email;
    var tempemail = this.register.Email;
    this.clear();
    this.register.Email = tempemail;
    this.register.FullName = tempname;
    this.matchingList = [];
    var temp = { "Email": student };
    if (student != '' && student != null && student != undefined) {
      this.service.getStudentByEmail(temp).subscribe(res => {
        if (res.success) {
          var checker = false;
          if (res.students.length > 0) {
            for (let item of res.students) {
              if (!checker && item.Email.startsWith(student)) {
                this.matchingList[0] = item;
                this.toastr.info('Please click on email to load student info!', 'Match Found!', { dismiss: 'auto' })
                checker = true;
              }
            }
            if (this.matchingList.length > 0) {
              this.duplicateStudent = true;
            }
          } else {
            this.duplicateStudent = false;
            this.matchingList = [];
          }
        } else {
          this.duplicateStudent = false;
          this.matchingList = [];
        }
      });
    } else {
      this.duplicateStudent = false;
      this.matchingList = [];
    }
  }

  onEnrollForSelect(item: any) {

  }

  OnEnrollForDeSelect(item: any) {

  }

  onEnrollForSelectAll(items: any) {

  }

  onEnrollForDeSelectAll(items: any) {

  }

  onTechSkillSelect(item: any) {

  }

  OnTechSkillDeSelect(item: any) {

  }

  onTechSkillSelectAll(items: any) {

  }

  onTechSkillDeSelectAll(items: any) {

  }

  ngOnInit() {
    this.courses = [
      { "id": 1, "itemName": "C" },
      { "id": 2, "itemName": "CPP" },
      { "id": 3, "itemName": "Java" },
      { "id": 4, "itemName": "Angular" },
      { "id": 5, "itemName": "NodeJS" },
      { "id": 6, "itemName": ".Net" }
    ];
  }
  clear() {
    this.register._id = null;
    this.register.InterestedInCources = [];
    this.register.FullName = null;
    this.register.Email = null;
    this.register.MobNo = null;
    this.register.CurrentAddress = null;
    this.register.PostalAddress = null;
    this.register.UGDegree = null;
    this.register.UGDegreeCollege = null;
    this.register.UGPercentage = null;
    this.register.PassingYear = null;
    this.register.Source = null;
    this.register.CourceToEnroll = [];
    this.register.ProgLanguages = [];
    this.register.DateOfBirth = null;
    this.matchingList = [];
  }
}
