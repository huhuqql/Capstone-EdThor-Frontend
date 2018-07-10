import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService } from '../globals.service';
import * as KC from '../../assets/files/kc.json';
import { DomSanitizer } from '@angular/platform-browser';

import { Problem } from '../service/model/problem';
import { Record } from '../service/model/record';
import { User } from '../service/model/user';
import { RecordService } from "../service/record.service";

import { HttpClient } from '@angular/common/http';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css', '../problem-set/problem-set.component.css', "../../assets/css/bootstrap.min.css"]
})
export class StatisticsComponent implements OnInit {

  search_id: string;
  user_list: any;
  shown_user_list: any = [];
  history_list: any[];
  page = 0;
  cur_user: any;

  list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  cur_mastery: any;

  constructor(private recordService: RecordService, private sanitized: DomSanitizer, private route: ActivatedRoute, private global: GlobalsService, private http: HttpClient, private userService: UserService) { }

  ngOnInit() {
    console.log("stat page...");
    this.getAllUsers();
    // this.shown_user_list = this.user_list;
  }

  public getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.user_list = data;
        this.shown_user_list = this.user_list;
        console.log("all users ---------->");
        console.log(this.user_list);
        this.getAllUserStats(1);
      }
    )
  }

  searchId() {
    console.log("search --->" + this.search_id);
    this.shown_user_list = [];
    for (var i = 0; i < this.user_list.length; i++) {
      console.log(this.user_list[i].username);
      if (this.user_list[i].username.toUpperCase().indexOf(this.search_id.toUpperCase()) >= 0 || this.user_list[i].studentId == this.search_id) {
        this.shown_user_list.push(this.user_list[i]);
      }
    }
  }

  reset() {
    this.page = 0;
    this.shown_user_list = this.user_list;
  }

  cardDetail(i) {
    this.page = 1;
    this.cur_user = this.shown_user_list[i];
  }

  showRecord(masterylevel, history) {
    this.cur_mastery = masterylevel;
  }


  public getAllUserStats(id) {
    if (id >= this.user_list.length + 1) {
      return;
    }
    this.recordService.getRecordHistory(id).subscribe(
      (history) => {
        this.history_list[id - 1].push(history.length);
        this.getAllUserStats(id + 1);
      }
    )
  }

  public retrieveRecord(): void {
    let temp_user_id = this.userService.getStudentId();
    this.recordService.getRecordMasteryLevel(temp_user_id).subscribe(
      (masterylevel) => {

        console.log("retrieve masterylevel ----->");
        console.log(masterylevel);

        this.recordService.getRecordHistory(temp_user_id).subscribe(
          (history) => {

            console.log("retrieve history ----->");
            console.log(history);

            this.showRecord(masterylevel, history);
          }
        )

      }
    )
  }

}
