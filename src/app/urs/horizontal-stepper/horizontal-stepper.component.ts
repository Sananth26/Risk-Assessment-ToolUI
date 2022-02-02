import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horizontal-stepper',
  templateUrl: './horizontal-stepper.component.html',
  styleUrls: ['./horizontal-stepper.component.scss']
})
export class HorizontalStepperComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $.getScript('./assets/js/horizontal-timeline.js');
  }

}
