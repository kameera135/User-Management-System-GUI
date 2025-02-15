import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Subject, firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { appSettingModel } from "./shared/models/appSettingModel";
import { toastServicePopUpConfigurations } from "./shared/models/Configurations/toastServicePopUpConfigurations";
import { AuthService } from "./auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class AppService implements OnDestroy {
  private destroy$!: Subject<void>;

  private appSettings: any = {};

  appConfig: appSettingModel[] = [];

  popUpMessageConfig: toastServicePopUpConfigurations[] = [];

  constructor(private httpClient: HttpClient, private auth: AuthService) {
    this.destroy$ = new Subject<void>();

    if (!this.appSettings) {
      const localData = localStorage.getItem(`${environment.appName}-settings`);

      if (localData) {
        this.appSettings = JSON.parse(localData);
      }
    }
  }

  init() {
    return this.loadConfig();
  }

  //This method loads the configuration values from the configuration json file
  async loadConfig() {
    await firstValueFrom(
      this.httpClient.get("/assets/config.json")
    ).then((value: any) => {
      this.appConfig[0] = value as appSettingModel;
    });

    await firstValueFrom(
      this.httpClient.get(
        "/assets/configurations/toastServicePopUpConfigurations.json"
      )
    ).then((value: any) => {
      this.popUpMessageConfig[0] = value as toastServicePopUpConfigurations;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout(): void {
    this.auth.logout();
  }

  get user() {
    // //remove this line
    // const userDetails =
    //   '{"id":2000,"fName":"John","lName":"Doe","email":null,"platforms":[{"id":1068,"name":"Config","url":"http://localhost:4200","security":null,"connectivity":null,"extraData":null,"sortingIndex":null}],"token":"8jO29OmjMDR6OiJg25mdXZwnBJbbcI2kOCnt3W6EJ24mIfHuwcB5m28jWBAAMlge","permissions":[],"role":"facility_manager"}';

    // let tempUser = JSON.parse(userDetails);
    // tempUser = new User(tempUser);
    // return tempUser;

    //use this in production
    return this.auth.getUser();
  }

  // login(model: auth){
  //   let queryParams = new HttpParams();

  //   return this.httpClient.post(`${this.apiUrl}/api/user/login`,model,{
  //     params:queryParams
  //   });
  // }
}
