import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('myCanvas') canvasEl: ElementRef | undefined;

  private context: CanvasRenderingContext2D | null = null;
  constructor() { }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
    this.context = (
      this.canvasEl!.nativeElement as HTMLCanvasElement
    ).getContext('2d');

    this.draw();
  }

  private draw() {
    if (this.context){
      this.context.font = '30px Arial';
      this.context.textBaseline = 'middle';
      this.context.textAlign = 'center';

      const x = (this.canvasEl!.nativeElement as HTMLCanvasElement).width / 2;
      const y = (this.canvasEl!.nativeElement as HTMLCanvasElement).height / 2;
      this.context.fillText('@realappie', x, y);
    }

  }

}
