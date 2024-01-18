import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgToastService } from "ng-angular-popup";
import { AppService } from "src/app/app.service";
import { Permission } from "src/app/shared/models/Cams-new/Permission";

@Component({
  selector: "app-permission-configuration-modal",
  templateUrl: "./permission-configuration-modal.component.html",
  styleUrls: ["./permission-configuration-modal.component.scss"],
}) //
export class PermissionConfigurationModalComponent {
  roleList: any[] = this.appService.appConfig[0].roleList;
  platformList: any[] = this.appService.appConfig[0].platformList;

  selectedPlatform: number = 1;

  @Input() type!: string;
  @Input() modalTitle!: string;

  @Input() permissionId!: string;
  @Input() permissionName!: string;
  // @Input() description!: string;
  @Input() createdDate!: string;
  @Input() status!: string;

  buttonName!: string;
  buttonIcon!: string;
  cancelButtonIcon: string = "bi-x-circle-fill";
  cancelButtonName: string = "Cancel";

  loadingInProgress: boolean = false;

  statusOptions: { label: string; value: string }[] = [
    { label: "Active", value: "Active" },
    { label: "Deactive", value: "Deactive" },
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private notifierService: NgToastService,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.status = this.status.slice(0, -4) + "e";
    console.log("permissionId", this.status);
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

    this.cancelButtonIcon;
    this.cancelButtonName;
  }

  onFormSubmit() {
    if (this.permissionName == "" || this.selectedPlatform == null) {
      this.notifierService.warning({
        detail: "Warning",
        summary: "Please fill required fields",
        duration: 2000,
      });
      return;
    }

    const feature = new Permission();
    feature.permission = this.permissionName;
    feature.platformId = this.selectedPlatform;
    //feature.createdDate = this.createdDate;
    // feature.status = this.status;

    this.activeModal.close(feature);
  }

  headArray = [
    { Head: "Platforms", FieldName: "Platforms", ColumnType: "Data" },
    { Head: "Role", FieldName: "Role", ColumnType: "Data" },
  ];

  tableData = [
    {
      Platforms: "Airecone Extention System",
      Role: "Facility Manager",
    },
    {
      Platforms: "Tenant Billing System",
      Role: "Tenant Manager",
    },
    {
      Platforms: "Airecone Extention System",
      Role: "Tenant Manager",
    },
  ];
}
