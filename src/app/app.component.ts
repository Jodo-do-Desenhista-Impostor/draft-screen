import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>
  private ctx!: CanvasRenderingContext2D
  private lastX = 0
  private lastY = 0
  private isDrawing = false

  canvasWidth = window.innerWidth
  canvasHeight = window.innerHeight - 150
  currentTool: 'brush' | 'eraser' = 'brush'
  currentColor = '#000000'
  brushSize = 3

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!
  }

  handlePointerDown() {
    this.isDrawing = true
  }

  handlePointerUp() {
    this.isDrawing = false
  }

  handlePointerMove(event: PointerEvent) {
    event.preventDefault()
    if(this.isDrawing)
      this.drawSegment(event.x, event.y)
    this.updateAxles(event.x, event.y)
  }

  hadleTouchStart(event: TouchEvent) {
    this.updateAxles(event.touches[0].clientX, event.touches[0].clientY);
  }

  handleTouchMove(event: TouchEvent) {
    event.preventDefault()
    this.drawSegment(event.touches[0].clientX, event.touches[0].clientY)
    this.updateAxles(event.touches[0].clientX, event.touches[0].clientY)
  }

  private drawSegment(currentX: number, currentY: number) {
    this.ctx.beginPath()
    this.ctx.moveTo(this.lastX, this.lastY)
    this.ctx.lineTo(currentX, currentY)
    this.ctx.stroke()
  }

  private updateAxles(currentX: number, currentY: number) {
    this.lastX = currentX
    this.lastY = currentY
  }

  updateColor() {
    this.ctx.strokeStyle = this.currentTool === 'eraser' ? 'white' : this.currentColor;
  }
  
  updateBrushSize() {
    this.ctx.lineWidth = this.brushSize;
  }

  setTool(tool: 'brush' | 'eraser') {
    this.currentTool = tool
    this.ctx.strokeStyle = this.currentTool === 'eraser' ? 'white' : this.currentColor
  }

  clearCanvas() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  routeToConfig() {
    window.location.href = "/config"
  }
}
