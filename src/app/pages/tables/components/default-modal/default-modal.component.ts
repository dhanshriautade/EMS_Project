import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Services } from 'app/service/service.service';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./default-modal.component.scss')],
  templateUrl: './default-modal.component.html'
})

export class DefaultModal implements OnInit {
  modalHeader: string;
  modalContent: any;
  constructor(public vcr: ViewContainerRef, private activeModal: NgbActiveModal, public services: Services, public toastr: ToastsManager) {
  }

  ngOnInit() {
    console.log(this.modalContent);
  }

  closeModal() {
    this.activeModal.close();
  }

  save(param) {
    this.activeModal.close();
    if (param != this.modalContent.userIsActiveByAdmin) {
      this.modalContent.userIsActiveByAdmin = param;
      this.services.activateEmployee(this.modalContent).subscribe(res => {
        if (res.success) {
          this.toastr.success('Update Successfull', 'Success!', { dismiss: 'auto' });
        } else {
          this.toastr.error(res.msg, 'Error!', { dismiss: 'auto' });
        }
      });
    }
  }
}
