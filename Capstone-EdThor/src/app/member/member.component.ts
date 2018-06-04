import {Component, OnInit} from '@angular/core';
import {Member} from "../service/model/member";
import {MemberService} from "../service/member.service";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {


  ms: Member[] = [];
  m2add: Member = new Member();

  constructor(private memberService: MemberService) {
  }

  ngOnInit() {
    this.getMembers();
  }

  public getMembers(): void {
    this.memberService.getMembers().subscribe((ms: Member[]) => {
      this.ms = ms;
    })

  }

  public addMember(): void {
    this.memberService.saveMember(this.m2add).subscribe(
      () => {
        this.m2add = new Member();
        this.getMembers();
      }
    )
  }

}
