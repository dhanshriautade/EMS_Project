import { Component, OnInit, Input, Output, ViewChild, ViewContainerRef, EventEmitter, ElementRef, Renderer } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgUploaderOptions } from 'ngx-uploader';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from 'app/theme/validators';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Services } from 'app/service/service.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

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
  public friendMobNo: AbstractControl;
  public CurrentAddress: AbstractControl;
  public PostalAddress: AbstractControl;
  public UGDegree: AbstractControl;
  public UGDegreeCollege: AbstractControl;
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
  matchingList = [];
  duplicateStudent = false;
  public submitted: boolean = false;
  register = {
    ExcelSchema: {
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
    },
    
    _id: null,
    HscDiploma: null,
    HscDiplomaCollege: null,
    HscDiplomaPercent: null,
    HscDiplomaPassYear: null,
    SSC: null,
    SSCCollege: null,
    SSCPercent: null,
    SSCPassYear: null,
    friendMobNo: null,
    friendName: null,
    selectedDuration: '3 Month',
  };
  durations = [
    { key: 1, value: "1 Month" },
    { key: 2, value: "2 Months" },
    { key: 3, value: "3 Months" },
    { key: 4, value: "4 Months" },
    { key: 5, value: "5 Months" },
    { key: 6, value: "6 Months" },
    { key: 7, value: "7 Months" },
    { key: 8, value: "8 Months" },
    { key: 9, value: "9 Months" },
    { key: 10, value: "10 Months" },
    { key: 11, value: "11 Months" },
    { key: 12, value: "12 Months" }
  ]
  courses = [];
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

  constructor(fb: FormBuilder, private service: Services, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.form = fb.group({
      'FullName': [''],
      'Email': [''],
      'MobNo': [''],
      "friendMobNo": [''],
      "dobForm": [''],
      "CurrentAddress": [''],
      "PostalAddress": [''],
      "UGDegree": [''],
      "UGDegreeCollege": [''],
      "UGDegreePercent": [''],
      "UGDegreePassYear": [''],
      "HscDiploma": [''],
      "HscDiplomaCollege": [''],
      "HscDiplomaPercent": [''],
      "HscDiplomaPassYear": [''],
      "SSC": ['SSC'],
      "SSCCollege": [''],
      "SSCPercent": [''],
      "SSCPassYear": [''],
      "friendName": [''],
      "Source": [''],
      "selectedDuration": [''],
      "CourceToEnroll": [''],
      "ProgLanguages": [''],
    });
    this.toastr.setRootViewContainerRef(vcr);

    this.FullName = this.form.controls['FullName'];
    this.Email = this.form.controls['Email'];
    this.MobNo = this.form.controls['MobNo'];
    this.friendMobNo = this.form.controls['friendMobNo'];
    this.dobForm = this.form.controls['dobForm'];
    this.CurrentAddress = this.form.controls['CurrentAddress'];
    this.PostalAddress = this.form.controls['PostalAddress'];
    this.UGDegree = this.form.controls['UGDegree'];
    this.UGDegreeCollege = this.form.controls['UGDegreeCollege'];
    this.UGDegreePercent = this.form.controls['UGDegreePercent'];
    this.UGDegreePassYear = this.form.controls['UGDegreePassYear'];
    this.HscDiploma = this.form.controls['HscDiploma'];
    this.HscDiplomaCollege = this.form.controls['HscDiplomaCollege'];
    this.HscDiplomaPercent = this.form.controls['HscDiplomaPercent'];
    this.HscDiplomaPassYear = this.form.controls['HscDiplomaPassYear'];
    this.SSC = this.form.controls['SSC'];
    this.SSCCollege = this.form.controls['SSCCollege'];
    this.SSCPercent = this.form.controls['SSCPercent'];
    this.SSCPassYear = this.form.controls['SSCPassYear'];
    this.friendName = this.form.controls['friendName'];
    this.Source = this.form.controls['Source'];
    this.selectedDuration = this.form.controls['selectedDuration'];
    this.CourceToEnroll = this.form.controls['CourceToEnroll'];
    this.ProgLanguages = this.form.controls['ProgLanguages'];
  }
  loadStudent() {
    this.register.ExcelSchema = this.matchingList[0];
    this.dob = this.matchingList[0].DateOfBirth ? this.matchingList[0].DateOfBirth : null;
    this.duplicateStudent = false;
    this.matchingList = [];
    this.register.ExcelSchema.CourceToEnroll = this.matchingList[0].InterestedInCources ? this.matchingList[0].InterestedInCources : null;
  }
  public onSubmit(values: Object): void {
    this.register.SSC = "SSC"
    this.submitted = true;
    if (this.form.valid) {
      this.register.ExcelSchema.DateOfBirth = values["dobForm"]["year"] + '-' + values["dobForm"]["month"] + '-' + values["dobForm"]["day"];
   
      this.service.registerStudent(this.register).subscribe(res => {
        if (res.success) {
          this.toastr.success('Student Registered!', 'Success!', { dismiss: 'auto' })
        } else {
          this.toastr.error('Error in registering student!', 'Error!', { dismiss: 'auto' })
        }
      });
    } else {
      this.toastr.warning('Please re-check all details!', 'Invalid Details!', { dismiss: 'auto' })
    }
  }
  searchStudent(student) {
    var tempname = this.register.ExcelSchema.FullName;
    var tempemail = this.register.ExcelSchema.Email;
    this.clear();
    this.register.ExcelSchema.Email = tempemail;
    this.register.ExcelSchema.FullName = tempname;
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
    this.register.ExcelSchema._id = null;
    this.register.ExcelSchema.InterestedInCources = [];
    this.register.ExcelSchema.FullName = null;
    this.register.ExcelSchema.Email = null;
    this.register.ExcelSchema.MobNo = null;
    this.register.ExcelSchema.CurrentAddress = null;
    this.register.ExcelSchema.PostalAddress = null;
    this.register.ExcelSchema.UGDegree = null;
    this.register.ExcelSchema.UGDegreeCollege = null;
    this.register.ExcelSchema.UGPercentage = null;
    this.register.ExcelSchema.PassingYear = null;
    this.register.ExcelSchema.Source = null;
    this.register.ExcelSchema.CourceToEnroll = [];
    this.register.ExcelSchema.ProgLanguages = [];
    this.register.ExcelSchema.DateOfBirth = null;
    this.matchingList = [];
  }
}
