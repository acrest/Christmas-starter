import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  template: `
    <p>
      Please Log in to change content!
    </p>
  `,
  styles: []
})
export class ErrorPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
