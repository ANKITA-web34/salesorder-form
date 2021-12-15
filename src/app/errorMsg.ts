import { Component, Input, DoCheck } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-control-messages',
  // template: '<div *ngIf="_errorMessage !==null" class="error w3-text-red w3-small">{{_errorMessage}}</div>',
  template: '<small *ngIf="_errorMessage !==null" class="form-text text-danger">{{_errorMessage}}</small>',
  styles: [],
})
export class ControlMessagesComponent implements DoCheck {
  public _errorMessage: string;
  @Input() control: FormControl;
  @Input() message: any;

  constructor() {
    this.message = null;
  }
  ngDoCheck() {
    this.errorMessage();
  }
  errorMessage() {
    if (this.control.errors != null) {
      for (const propertyName in this.control.errors) {
        if (
          (this.control.errors.hasOwnProperty(propertyName) && this.control.touched === true && this.control.invalid === true) ||
          this.control.disabled === true
        ) {
          this._errorMessage = this.getmessage(propertyName);
          break;
        }
      }
    } else {
      this._errorMessage = null;
    }
    return null;
  }

  getmessage(param) {
    if (this.message != null && this.message.hasOwnProperty(param)) {
      return this.message[param];
    } else {
      return null;
    }
  }
}
