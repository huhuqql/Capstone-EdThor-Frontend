import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Record } from "./model/record";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private baseUrl: string;


  constructor(private httpService: HttpClient) {
    this.baseUrl = environment.base_url + "/ws/records";
  }

  public getRecords(): Observable<Record[]> {
    return this.httpService.get<Record[]>(this.baseUrl);
  }

  public saveRecord(r: Record): Observable<Record> {
    return this.httpService.post<Record>(this.baseUrl, r);
  }

  public getRecord(r: Record): Observable<any> {
    const params = new HttpParams().set('studentId', r.studentId.toString());
    return this.httpService.get<any>(this.baseUrl, { params: params });
  }


}
