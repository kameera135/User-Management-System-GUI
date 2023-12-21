import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgToastService } from "ng-angular-popup";
import { AppService } from "src/app/app.service";
import { Platform } from "src/app/shared/models/Cams-new/Platform";

@Component({
  selector: "app-platform-configuration",
  templateUrl: "./platform-configuration-modal.component.html",
  styleUrls: ["./platform-configuration-modal.component.scss"],
})
export class PlatformConfigurationModalComponent {
  roleList: any[] = this.appService.appConfig[0].roleList;

  @Input() type!: string;
  @Input() modalTitle!: string;

  @Input() platformCode!: string;
  @Input() applicationName!: string;
  @Input() description!: string;
  @Input() status!: any;

  buttonName!: string;
  buttonIcon!: string;

  constructor(
    public activeModal: NgbActiveModal,
    private notifierService: NgToastService,
    private appService: AppService
  ) {}

  ngOnInit() {
    if (this.type == "Add") {
      this.buttonName = "Add";
      this.buttonIcon = "bi-person-plus-fill";
    } else if (this.type == "Edit") {
      this.buttonName = "Save";
      this.buttonIcon = "bi-floppy2-fill";
    } else {
      this.buttonName = "Edit";
      this.buttonIcon = "bi-pencil-fill";
    }
  }

  onFormSubmit() {
    if (
      this.platformCode == "" ||
      this.applicationName == "" ||
      this.description == "" ||
      this.status == ""
    ) {
      this.notifierService.warning({
        detail: "Warning",
        summary: "Please fill required fields",
        duration: 2000,
      });
      return;
    }

    const platform = new Platform();
    platform.platformCode = this.platformCode;
    platform.applicationName = this.applicationName;
    platform.description = this.description;
    platform.status = this.status;

    this.activeModal.close(platform);
  }
}
