import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

import {SelectChoice, example_choices, StateActivity} from "./choice";
import {ItemVisibilityDirective} from './directives/accessibility/item-visibility/item-visibility.directive';
import {Direction} from './directives/accessibility/key-code';

@Component({
    selector: 'app-select-choice',
    templateUrl: './select-choice.component.html',
    styleUrls: ['./select-choice.component.scss'],
    animations: [
        trigger('toggleDropdown', [
            state(StateActivity.INACTIVE, style({
                height: '0',
                opacity: 0
            })),
            state(StateActivity.ACTIVE, style({
                height: '*',
                opacity: 1
            })),
            transition('inactive => active', animate('200ms ease-in')),
            transition('active => inactive', animate('200ms ease-out'))
        ])
    ]
})
export class SelectChoiceComponent implements OnInit, AfterViewInit {
    private choices: Array<SelectChoice>;
    @ViewChildren("option") private choiceElements!: QueryList<ElementRef>;
    private elementRefs: Array<ElementRef>;
    private selected: SelectChoice;
    private state: StateActivity;
    private focus: number;
    @Input() place_holder: string;
    @Input() value: any;
    @Input() name: string;
    @Input() label: string;
    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
    constructor() {}
    ngOnInit() {
        this.choices = example_choices;
        this.name = "Example-Dropdown";
        this.selected = null;
        this.state = StateActivity.INACTIVE;
        this.place_holder = "Please select an option.";
        this.label = "Hello World";
        this.focus = null;
        this.elementRefs = [];
    }
    ngAfterViewInit() {
        this.choiceElements.changes.subscribe(choices => {
            console.log("Hello Items");
            console.log(choices.length);
            if(this.choices.length !== this.choiceElements.length && this.state === StateActivity.ACTIVE) {
                alert("Error! Lengths do not match!");
            }
            else if(this.state === StateActivity.ACTIVE){
                this.elementRefs = choices.toArray();
            }
        });
    }
    selectChoice(new_selection: SelectChoice) {
        if(this.selected != new_selection) {
            this.selected = new_selection;
            this.toggleActive();
        }
    }
    toggleChoices(e) {
        e.preventDefault();
        this.toggleActive();
    }
    leftFocus(e) {
        e.preventDefault();
        this.state = StateActivity.INACTIVE;
        this.focus = null;
    }
    isActive() {
        return this.state === StateActivity.ACTIVE;
    }
    private toggleActive() {
        this.state = (this.state === StateActivity.INACTIVE) ? StateActivity.ACTIVE : StateActivity.INACTIVE;
        if(this.state === StateActivity.INACTIVE) this.focus = null;
        /*else if(this.state === StateActivity.ACTIVE && this.selected !== null) {
            let index = this.choices.indexOf(this.selected);
            if(index > -1 && this.elementRefs.length > 0) {
                this.focus = index;
                let focus_ref = this.elementRefs[this.focus].nativeElement as HTMLElement;
                focus_ref.focus();
                console.log("Good day")
            }
        }*/
    }
    private updateFocus(direction_event) {
        let prev = null;
        if(this.elementRefs.length > 0 && this.isActive() && this.focus !== null) {
            prev = this.focus;
            if(direction_event === Direction.DOWN && this.focus < (this.choices.length - 1)) {
                this.focus = this.focus + 1;
            }
            else if(direction_event === Direction.UP && this.focus > 0) {
                this.focus = this.focus - 1;
            }
            if(prev !== null) {
                let prev_elem = this.elementRefs[prev].nativeElement as HTMLElement;
                //prev_elem.blur();
            }
        }
        else if(direction_event === Direction.NONE && this.focus === null) {
            this.focus = 0;
        }
        if(this.isActive() && this.focus !== null) {
            let focus_elem = this.elementRefs[this.focus].nativeElement as HTMLElement;
            focus_elem.focus();
        }
    }
}
