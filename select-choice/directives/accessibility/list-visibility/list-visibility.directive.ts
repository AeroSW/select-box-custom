import {Directive, HostListener, Input, Output, EventEmitter, QueryList, ViewChildren, ElementRef} from '@angular/core';
import {Direction, KeyCode} from '../key-code';
import {StateActivity, SelectChoice} from '../../../choice';

@Directive({
    selector: '[appListVisibility]'
})
export class ListVisibilityDirective {
    private choices_html: Array<ElementRef>;
    
    @Input("appListVisibility") state: string;
    @Output("appListVisibilityChange") stateChange: EventEmitter<string> = new EventEmitter<string>();
    @Input() selected: SelectChoice;
    @Input() choices: Array<SelectChoice>;
    @Output() updateFocus: EventEmitter<Direction> = new EventEmitter<Direction>();
    constructor() {}
    @HostListener("keydown.enter", ["$event"])
    @HostListener("keydown.space", ["$event"])
    public toggleState(event) {
        event.preventDefault()
        if(this.state === StateActivity.INACTIVE)
            this._toggleState();
    }
    @HostListener("keydown.arrowdown", ["$event"])
    public moveFocus(event) {
        event.preventDefault();
        let e = <KeyboardEvent>event;
        this._moveFocus(e.keyCode);
    }
    @HostListener("keydown.escape", ["$event"])
    public inactivateState(event) {
        event.preventDefault();
        this._inactivateState();
    }
    private _toggleState() {
        this.state = (this.state === StateActivity.INACTIVE) ? StateActivity.ACTIVE : StateActivity.INACTIVE;
        this.stateChange.emit(this.state);
    }
    private _moveFocus(code) {
        if(this.choices.length > 0) {
            let index = this.choices.indexOf(this.selected);
            if(code === KeyCode.DOWN_ARROW && index === -1) {
                this.updateFocus.emit(Direction.NONE);
            }
        }
    }
    private _inactivateState() {
        this.state = StateActivity.INACTIVE;
        this.stateChange.emit(this.state);
    }
}
