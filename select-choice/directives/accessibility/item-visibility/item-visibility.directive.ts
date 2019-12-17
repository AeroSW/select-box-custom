import {Directive, HostListener, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import {SelectChoice} from '../../../choice';
import {KeyCode} from '../key-code';

@Directive({
  selector: '[appItemVisibility]'
})
export class ItemVisibilityDirective {
    @Input("appItemVisibility") item: SelectChoice;
    //@Output("appItemVisibilityChange") itemChange: EventEmitter<SelectChoice> = new EventEmitter<SelectChoice>();
    @Input() selected: SelectChoice;
    @Output() selectedChange: EventEmitter<SelectChoice> = new EventEmitter<SelectChoice>();
    @Input() choices: Array<SelectChoice>;
    @Input() html_list: Array<ElementRef>;
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
        if(this.item !== this.selected) {
            this.selected = this.item;
            this.selectedChange.emit(this.selected);
        }
    }
    private _navigateChoices(code) {
        console.log("Hey Mom!");
        let index = this.choices.indexOf(this.item);
        console.log("index: " + index);
        console.log(this.html_list);
        if(code === KeyCode.UP_ARROW && index > 0) {
            let html = this.html_list[index - 1].nativeElement as HTMLElement;
            html.focus();
        }
        else if(code === KeyCode.DOWN_ARROW && index < (this.choices.length - 1)) {
            let html = this.html_list[index + 1].nativeElement as HTMLElement;
            html.focus();
        }
    }
}
