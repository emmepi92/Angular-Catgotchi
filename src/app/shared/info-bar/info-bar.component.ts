import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.scss']
})
export class InfoBarComponent implements OnInit {
  @Input() title: string = '';
  @Input() value: number = 0;


  constructor() { }

  ngOnInit(): void {
  }

}
