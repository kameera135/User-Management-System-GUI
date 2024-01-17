import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { PaginatedResponse } from 'src/app/shared/models/Cams-new/PaginatedResponse';
import { SystemToken } from 'src/app/shared/models/Cams-new/SystemToken';

@Injectable({
  providedIn: 'root'
})
export class SystemTokensService {

  constructor(private appService: AppService, private httpClient: HttpClient) { }

  apiUrl = this.appService.appConfig[0].apiUrl;
  user = this.appService.user;

  getAllTokens(page: number, pageSize: number) {
    let queryParams = new HttpParams();
    //queryParams = queryParams.append("viewedBy", this.user.id);
    queryParams = queryParams.append("page", page);
    queryParams = queryParams.append("pageSize", pageSize);

    const url = `${this.apiUrl}/api/apiTokens/${page}/${pageSize}`;
    //const url = "http://127.0.0.1:3000/api/tokens";
    return this.httpClient.get<PaginatedResponse>(url, { params: queryParams });
  }

  getSearchedTokens(searchedTerm: string, page: number, pageSize: number) {
    let queryParams = new HttpParams();
    // queryParams = queryParams.append("viewedBy", this.user.id);
    // queryParams = queryParams.append("searchedTerm", searchedTerm);
    // queryParams = queryParams.append("page", page);
    // queryParams = queryParams.append("pageSize", pageSize);

    queryParams = queryParams.append("searchedTokens", searchedTerm);
    
    const url = `${this.apiUrl}/api/apiTokens/${page}/${pageSize}`;
    return this.httpClient.get<PaginatedResponse>(url, { params: queryParams });
  }

  // getSearchedUsersByRole(
  //   searchedTerm: string,
  //   role: string,
  //   page: number,
  //   pageSize: number
  // ) {
  //   let queryParams = new HttpParams();
  //   queryParams = queryParams.append("viewedBy", this.user.id);
  //   queryParams = queryParams.append("searchedTerm", searchedTerm);
  //   queryParams = queryParams.append("role", role);
  //   queryParams = queryParams.append("page", page);
  //   queryParams = queryParams.append("pageSize", pageSize);

  //   const url = `${this.apiUrl}/end-point`;
  //   return this.httpClient.get<PaginatedResponse>(url, { params: queryParams });
  // }

  postToken(model: SystemToken) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("createdBy", this.user.id);

    return this.httpClient.post(`${this.apiUrl}/api/token`, model, {
      params: queryParams,
    });
  }

  putToken(model: SystemToken) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("updatedBy", this.user.id);

    return this.httpClient.put(`${this.apiUrl}/api/token`, model, {
      params: queryParams,
    });
  }

  deleteToken(list: number[]) {
    //list is the id list of users which have to be deleted
    let queryParams = new HttpParams();
    queryParams = queryParams.append("deletedBy", this.user.id);

    return this.httpClient.delete(`${this.apiUrl}/api/tokens`, {
      params: queryParams,
      body: list,
    });
  }
}
