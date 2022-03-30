import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lines-list',
  templateUrl: './lines-list.component.html',
  styleUrls: ['./lines-list.component.scss']
})
export class LinesListComponent implements OnInit {
  lines = [
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
