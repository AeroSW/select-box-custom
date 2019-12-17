import {Directive, HostListener, Input, Output, EventEmitter, QueryList, ViewChildren, ElementRef} from '@angular/core';
import {KeyCode} from '../key-code';
import {StateActivity, SelectChoice} from '../../../choice';
import {ItemVisibilityDirective} from '../item-visibility/item-visibility.directive';

@Directive({
    selector: '[appListVisibility]'
})
export class ListVisibilityDirective {
    @ViewChildren(ItemVisibilityDirective, {read: ElementRef}) private choices: QueryList<any>;
    private choices_html: Array<ElementRef>;
    
    @Input("appListVisibility") state: string;
    @Output("appListVisibilityChange") stateChange: EventEmitter<string> = new EventEmitter<string>();
    @Input() hover: HTMLElement;
    //@Output() hoverChange: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>();
    @Input() list_elements: Array<ElementRef>;
    @Input() selected: SelectChoice;
    @Input() select_list: Array<SelectChoice>;
    constructor() {}
    @HostListener("keydown.enter", ["$event"])
    @HostListener("keydown.space", ["$event"])
    public toggleState(event) {
        event.preventDefault()
        this._toggleState();
    }
    @HostListener("keydown.arrowdown", ["$event"])
    @HostListener("keydown.arrowup", ["$event"])
    public moveFocus(event) {
        event.preventDefault();
        let e = <KeyboardEvent>event;
        let code = e.keyCode;
        if(code === KeyCode.DOWN_ARROW && this.state === StateActivity.INACTIVE) this._toggleState();
        this._moveFocus(code);
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
        console.log(this.list_elements.length);
        let index = this.select_list.indexOf(this.selected);
        if(code === KeyCode.UP_ARROW && index > 0) {
            let html = this.list_elements[index - 1].nativeElement as HTMLElement;
            html.focus();
        }
        else if(code === KeyCode.DOWN_ARROW && index < (this.select_list.length - 1)) {
            let html = this.list_elements[index + 1].nativeElement as HTMLElement;
            html.focus();
        }
    }
    private _inactivateState() {
        this.state = StateActivity.INACTIVE;
        this.stateChange.emit(this.state);
    }
}
