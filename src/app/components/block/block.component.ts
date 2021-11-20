import { Component, Input, OnInit } from '@angular/core';
import { GraphService } from 'src/app/core/services/graph/graph.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  @Input() value: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
