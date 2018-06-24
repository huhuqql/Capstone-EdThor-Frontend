import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Member} from "./model/member";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private baseUrl: string;


  constructor(private httpService: HttpClient) {
    this.baseUrl = environment.base_url + "/ws/members";
  }

  public getMembers(): Observable<Member[]> {
    return this.httpService.get<Member[]>(this.baseUrl);
  }

  public saveMember(m: Member): Observable<Member> {
    return this.httpService.post<Member>(this.baseUrl, m);
  }
}
