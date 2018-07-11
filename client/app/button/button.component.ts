import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'custombutton',
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  @Input() name: string = 'Ok';
  @Input() style: string = 'btn-default';
  @Input() buttonType: string = 'button';
  @Input() disabled: boolean = false;
  @Output() action = new EventEmitter();
  @Input() confirmation: boolean = false;

  execute() {
    if(this.confirmation) {
      if(confirm('Tem certeza?')) {
        this.action.emit(null);    
      }
    return;
    }
    this.action.emit(null);
  }
}
