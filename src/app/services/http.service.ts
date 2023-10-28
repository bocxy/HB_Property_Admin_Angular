import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl = 'http://localhost:8080/';
  getAllWebsiteData: any;

  constructor(private http: HttpClient) { }

  getAllSchemesData(id: number): Observable<any> {
    const url = `${this.apiUrl}getAllSchemes`;
    const requestBody = { id: id };
    return this.http.post<any>(url, requestBody);
  }

  createSchemeData(schemeData: any): Observable<any[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any[]>(this.apiUrl + 'saveSchemeData', schemeData, { headers });
  }

  editSchemeData(schemeData: any): Observable<any[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any[]>(this.apiUrl + 'editSchemeData', schemeData, { headers });
  }

  getSchemeDataById(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { id: id };
    const url = `${this.apiUrl}getSchemeData`;
    return this.http.post<any>(url, requestBody, { headers });
  }

  deleteSchemeDataById(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiUrl}deleteScheme/${id}`;
    return this.http.delete<any>(url, { headers });
  }

  createUnitMasterData(unitData: any[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl + 'saveUnitData', unitData, { headers });
  }

  getUnitOfScheme(id: number): Observable<any> {
    const url = `${this.apiUrl}getUnitOfOneScheme`;
    const body = { id };
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(url, body, httpOptions);
  }

  updateUnitMasterData(unitData: any[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl + 'saveUnitData', unitData, { headers });
  }

  createAllottee(allotteeTableData: any[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl + 'saveAllottees', allotteeTableData, { headers });
  }

  getAllAllottees(schemeId: number): Observable<any[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { nSchemeId: schemeId };
    return this.http.post<any[]>(this.apiUrl + 'getAllotteesBySchemeId', requestBody, { headers });
  }

  updateAllotteeData(updatedAllotteeData: any[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any[]>(this.apiUrl + 'saveAllottees', updatedAllotteeData, { headers });
  }

  uploadSaleDeedFiles(saleDeedFiles: any[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl + 'saveSalesDeed', saleDeedFiles, { headers });
  }

  getSalesDeedFiles(schemeId: number): Observable<any[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { id: schemeId };
    return this.http.post<any[]>(this.apiUrl + 'getAllSalesDeed', requestBody, { headers });
  }

  updateSaleDeedFiles(updatedsaleDeedFiles: any[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any[]>(this.apiUrl + 'saveSalesDeed', updatedsaleDeedFiles, { headers });
  }

  updateFinanceData(updatedFinanceData: any[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any[]>(this.apiUrl + 'emirows', updatedFinanceData, { headers });
  }

  // saveWebsiteData(websiteDataList: WebsiteData[]): Observable<any> {

  //   const url = `${this.apiUrl}saveWebsiteData`;
  //   console.log(websiteDataList);
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post<any>(url, websiteDataList,{headers});
  // }

  // showWebsiteData(websiteDataList: WebsiteData[])

  getBlockForWebsite(schemeId: number): Observable<any[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { nSchemeId: schemeId };
    return this.http.post<any[]>(this.apiUrl + 'getBlocksForWebsite', requestBody, { headers });
  }

  getFloorForWebsite(schemeId: number): Observable<any[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { nSchemeId: schemeId };
    return this.http.post<any[]>(this.apiUrl + 'getFloorForWebsite', requestBody, { headers });
  }

  getBlockFloorApartmentList(schemeId: number): Observable<any[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { nSchemeId: schemeId };
    return this.http.post<any[]>(this.apiUrl + 'getBlockFloorApartmentList', requestBody, { headers });
  }


  bookNow(schemeId: number): Observable<any[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { nSchemeId: schemeId };
    return this.http.post<any[]>(this.apiUrl + 'bookNow', requestBody, { headers });
  }


  getAllAppl(): Observable<any[]> {
    const url = `${this.apiUrl}getAllCustomerApp`;
    const requestBody = {};
    return this.http.post<any>(url, requestBody);
  }

  getSchemeAppl(scheme: string): Observable<any> {
    const url = `${this.apiUrl}getAllApplicationsOfOneScheme`;
    const requestBody = { scheme: scheme };
    return this.http.post<any>(url, requestBody);
  }

  getApplform(id: string): Observable<any> {
    const url = `${this.apiUrl}getByIdCustomerApp`;
    const requestBody = { id: id };
    return this.http.post<any>(url, requestBody);
  }

  saveApplform(applData: any[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl + 'saveCustomerApplication', applData, { headers });
  }

  listreduce(applData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl + 'getCategoryWiseUnsold', applData, { headers });
  }

  createUnitData(unitData: any): Observable<any[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any[]>(this.apiUrl + 'saveOneUnitData', unitData, { headers });
  }

  viewUnitData(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { nId: id };
    const url = `${this.apiUrl}getOneUnitData`;
    return this.http.post<any>(url, requestBody, { headers });
  }



  getWebsiteData(nSchemeId: number): Observable<any> {
    const url = `${this.apiUrl}getParticularData`;
    const request = { nSchemeId: nSchemeId };
    return this.http.post<any>(url, request);
  }


  deleteWebsiteData(id: number) {
    const url = `${this.apiUrl}deleteWebsite`;
    const requestBody = { id };
    console.log(id)
    return this.http.delete(url, { body: requestBody });
  }

}
