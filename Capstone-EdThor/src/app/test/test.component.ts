import { Component, OnInit } from '@angular/core';

declare var MathJax: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(function () { MathJax.Hub.Queue(["Typeset", MathJax.Hub]); }, 5);
  }

}
