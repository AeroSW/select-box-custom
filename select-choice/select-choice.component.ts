import {Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, AfterViewInit, ElementRef} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

import {SelectChoice, example_choices, StateActivity} from "./choice";
import {ItemVisibilityDirective} from './directives/accessibility/item-visibility/item-visibility.directive';
import {createViewChildren} from '@angular/compiler/src/core';

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
    private selected: SelectChoice;
    private state: StateActivity;
    private ref_list: Array<ElementRef>;
    @ViewChildren(ItemVisibilityDirective, {read: ElementRef}) private choice_list: QueryList<any>;
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
        this.ref_list = [];
    }
    ngAfterViewInit() {
        this.choice_list.changes.subscribe(choices => {
            console.log(choices.length + " Hello");
            choices.forEach(element => {
                this.ref_list.push(element);
                console.log(element);
            });
        });
    }
    selectChoice(new_selection: SelectChoice) {
        if(this.selected != new_selection)
            this.selected = new_selection;
    }
    toggleChoices(e) {
        e.preventDefault();
        this.state = (this.state === StateActivity.INACTIVE) ? StateActivity.ACTIVE : StateActivity.INACTIVE;
    }
    leftFocus(e) {
        e.preventDefault();
        this.state = StateActivity.INACTIVE;
    }
    isActive() {
        return this.state === StateActivity.ACTIVE;
    }
    private updateItemsVisible() {
        
    }
}
