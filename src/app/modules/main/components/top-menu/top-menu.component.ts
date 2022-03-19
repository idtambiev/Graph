import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  @Input() isGraphBlock: boolean = true;
  @Output() newBlockOutput = new EventEmitter<number>();
  lineTypes = [

  ]
  constructor(
  ) { }

  ngOnInit(): void {
  }
}
