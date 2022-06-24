import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Flare } from './flare-util';
@Component({
  selector: 'app-lens-flare',
  templateUrl: './lens-flare.component.html',
  styleUrls: ['./lens-flare.component.scss']
})
export class LensFlareComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', {static: false}) canvas!: ElementRef<HTMLCanvasElement>
  private context!: CanvasRenderingContext2D;
  flare: Flare;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    this.context.fillStyle = 'red';
    this.context.fillRect(0, 0, 5, 5);
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    this.flare = new Flare(this.canvas.nativeElement, this.context);
    this.flare.update({x: this.canvas.nativeElement.width/5, y: this.canvas.nativeElement.height/5})
  }


  onMouseMove(event) {
    let mousePos = this.getMousePos(this.canvas.nativeElement, event);
    this.flare.update(mousePos);
  }

  onResize(event) {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
  }

  getMousePos(canvas: HTMLCanvasElement, event) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

}
