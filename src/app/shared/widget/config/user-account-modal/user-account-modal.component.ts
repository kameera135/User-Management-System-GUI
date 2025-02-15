import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/shared/models/Cams-new/User';

@Component({
  selector: 'app-user-account-modal',
  templateUrl: './user-account-modal.component.html',
  styleUrls: ['./user-account-modal.component.scss']
})
export class UserAccountModalComponent {

  @Input() type!: string;
  @Input() modalType!: string;
  @Input() userId!:number
  @Input() password!:string;
  @Input() oldPassword!:string;
  @Input() confirmPaswword!:string;


  hidePassword: boolean = true;
  hideOldPassword: boolean = true;
  hideConfirmPassword: boolean = true;
  visibleCurrent: boolean = true;
  visible: boolean = true;
  visibleNew: boolean = true;


  buttonName: string = "Change";
  buttonIcon: string = "fa-pencil";
  cancelButtonIcon: string = "bi-x-circle-fill";
  cancelButtonName: string = "Cancel";

  constructor(public activeModal: NgbActiveModal,
              private notifierService: NgToastService,
              private auth:AuthService){}

   user = this.auth.getUser();

  userName!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  phoneNumber!: string;

  onFormSubmit() {
    if(
      this.oldPassword == "" ||
      this.oldPassword == undefined ||
      this.password == "" ||
      this.password == undefined ||
      this.confirmPaswword == undefined ||
      this.confirmPaswword == "" 
    ){
      this.notifierService.warning({
        detail: "Warning",
        summary: "Please fill required fields",
        duration: 2000,
      });
      return;
    }

    if(this.password != this.confirmPaswword) {
      this.notifierService.warning({
        detail: "Warning",
        summary: "Password does not match. Confirm with correct password.",
        duration: 4000,
      });
      return;
    }

    const user = new User();
    user.userId = this.userId;
    user.password = this.password;
    user.confirmPassword = this.confirmPaswword;

    this.activeModal.close(user);
  }

  //toggle for password visibility
  togglePasswordVisibility(){
    this.hideOldPassword = !this.hideOldPassword;
    this.visibleCurrent = !this.visibleCurrent
  }
  
  togglePasswordVisibilityNew(){
    this.hidePassword = !this.hidePassword;
    this.visible = !this.visible
  }

  togglePasswordVisibilityReNew(){
    this.hideConfirmPassword = !this.hideConfirmPassword;
    this.visibleNew = !this.visibleNew
  }
}
