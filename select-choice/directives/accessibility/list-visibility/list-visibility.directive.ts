import {Directive, ElementRef, HostListener, Input, Output, EventEmitter} from '@angular/core';
import {KeyCode} from '../key-code';

@Directive({
    selector: '[appListVisibility]'
})
export class ListVisibilityDirective {
    @Input("appListVisibility") state: string;
    @Output("appListVisibilityChange") stateChange: EventEmitter<string> = new EventEmitter<string>();
    constructor(private el: ElementRef) {}
    /*@HostListener("click", ["$event"]) public onClick(e) {
        e.preventDefault();
        let new_state = (this.state === 'active') ? 'inactive' : 'active';
        this.toggleState(new_state);
    }*/
    @HostListener("keydown", ["$event"]) public onKeyDown(e) {
        e.preventDefault();
        console.log("Hello World");
        let event = <KeyboardEvent>e;
        let key_pressed = event.keyCode
        console.log(key_pressed);
        switch(key_pressed) {
            case KeyCode.CHARACTERLESS:
            case KeyCode.SPACEBAR:
            case KeyCode.ENTER:
                this.toggleState('active');
                break;
            case KeyCode.ESCAPE:
                this.toggleState('inactive');
                break;
            case KeyCode.UP_ARROW:
                break;
            case KeyCode.DOWN_ARROW:
                break;
        }
    }
    private toggleState(state_activity) {
        this.state = state_activity;
        this.stateChange.emit(this.state);
    }
}
