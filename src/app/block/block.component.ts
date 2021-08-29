import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: "app-block",
  templateUrl: "./block.component.html",
  styleUrls: ["./block.component.scss"],
})
export class BlockComponent {
  @Input() value: number;

  public get getBlockStyle() {
    switch (this.value) {
      case -1:
        return 'fruit';
      case 0:
        return 'empty';
      default:
        return 'snake';
    }
  }
}
