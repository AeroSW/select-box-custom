import {Directive, HostListener, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import {SelectChoice} from '../../../choice';
import {Direction, KeyCode} from '../key-code';

@Directive({
  selector: '[appItemVisibility]'
})
export class ItemVisibilityDirective {
    @Input() choice: SelectChoice;
    @Input() choices: Array<SelectChoice>;
    @Output() updateFocus: EventEmitter<Direction> = new EventEmitter<Direction>();
    @Output() updateChoice: EventEmitter<SelectChoice> = new EventEmitter<SelectChoice>();
    constructor() { }
    @HostListener("keydown.enter", ["$event"])
    @HostListener("keydown.space", ["$event"])
    selectChoice(event) {
        event.preventDefault();
        this._selectChoice();
    }
    @HostListener("keydown.arrowup", ["$event"])
    @HostListener("keydown.arrowdown", ["$event"])
    navigateChoices(event) {
        event.preventDefault();
        let e = <KeyboardEvent>event;
        this._navigateChoices(e.keyCode);
    }
    
    private _selectChoice() {
        this.updateChoice.emit(this.choice);
    }
    private _navigateChoices(code) {
        if(this.choices.length > 0) {
            let index = this.choices.indexOf(this.choice);
            if(index !== -1) {
                if(code === KeyCode.UP_ARROW) {
                    this.updateFocus.emit(Direction.UP);
                }
                else if(code === KeyCode.DOWN_ARROW) {
                    this.updateFocus.emit(Direction.DOWN);
                }
            }
        }
    }
}
