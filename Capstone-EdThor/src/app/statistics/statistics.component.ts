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
export declare var jquery: any;
export declare var $: any;

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css', '../problem-set/problem-set.component.css', "../../assets/css/bootstrap.min.css"]
})
export class StatisticsComponent implements OnInit {

  search_id: string;
  //user_list = [{ "id": "5b3b1ee9503aba7e8a76cd3f", "username": "siyu", "password": "123", "pseudoname": null, "studentId": 1 }, { "id": "5b3b27d0503aba7e8a76cd94", "username": "siyu1", "password": "123", "pseudoname": null, "studentId": 2 }, { "id": "5b3cd586503aba7e8a76cdae", "username": "LuSun", "password": "LuSun", "pseudoname": null, "studentId": 3 }];
  user_list: any = [];
  shown_user_list: any = [];

  history_list: any[] = [];
  page = 0;
  cur_user: any;

  list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  cur_mastery: any;
  cur_record: any;

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

  dataToCsvRecord() {
    var csvString: string = "";
    var filename = this.cur_user.username + "-record.csv";

    let tablerows = (document.getElementById("record_table") as HTMLTextAreaElement).rows;

    for (var i = 0; i < 18; i++) {
      var cells = tablerows[i].cells;
      for (var j = 0; j < cells.length; j++) {
        console.log(cells[j].innerHTML);
        csvString = csvString + cells[j].innerHTML + ",";
      }
      csvString = csvString.substring(0, csvString.length - 1);
      csvString = csvString + "\n";
    }

    var _utf = '\uFEFF';
    var a = $('<a/>', {
      style: 'display:none',
      href: 'data:attachment/csv;charset=utf-8,' + _utf + encodeURIComponent(csvString),
      download: filename
    }).appendTo('body');
    a[0].click();
    a.remove();
  }

  dataToCsvMastery() {
    var csvString: string = "";
    var filename = this.cur_user.username + "-masterylevel.csv";

    let tablerows = (document.getElementById("mastery_table") as HTMLTextAreaElement).rows;

    for (var i = 0; i < 18; i++) {
      var cells = tablerows[i].cells;
      for (var j = 0; j < cells.length; j++) {
        console.log(cells[j].innerHTML);
        csvString = csvString + cells[j].innerHTML + ",";
      }
      csvString = csvString.substring(0, csvString.length - 1);
      csvString = csvString + "\n";
    }

    var _utf = '\uFEFF';
    var a = $('<a/>', {
      style: 'display:none',
      href: 'data:attachment/csv;charset=utf-8,' + _utf + encodeURIComponent(csvString),
      download: filename
    }).appendTo('body');
    a[0].click();
    a.remove();
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
    this.retrieveRecord(this.cur_user.studentId);
  }

  showRecord(masterylevel, record) {
    this.cur_mastery = masterylevel;
    this.cur_record = record;
    console.log(this.cur_record);
  }


  public getAllUserStats(id) {
    console.log()
    if (id >= this.user_list.length + 1) {
      return;
    }
    this.recordService.getRecordHistory(id).subscribe(
      (history) => {
        this.history_list.push(history.length);
        this.getAllUserStats(id + 1);
      }
    )
  }

  public retrieveRecord(id): void {
    this.recordService.getRecordMasteryLevel(id).subscribe(
      (masterylevel) => {

        console.log("retrieve masterylevel ----->");
        console.log(masterylevel);

        this.recordService.getRecordbyId(id).subscribe(
          (record) => {

            console.log("retrieve record ----->");
            console.log(record);

            this.showRecord(masterylevel, record);
          }
        )

      }
    )
  }

}
