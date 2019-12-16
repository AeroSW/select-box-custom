import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

import {SelectChoice, example_choices} from "./choice";

@Component({
    selector: 'app-select-choice',
    templateUrl: './select-choice.component.html',
    styleUrls: ['./select-choice.component.scss'],
    animations: [
        trigger('toggleDropdown', [
            state('inactive', style({
                height: '0',
                opacity: 0
            })),
            state('active', style({
                height: '*',
                opacity: 1
            })),
            transition('inactive => active', animate('200ms ease-in')),
            transition('active => inactive', animate('200ms ease-out'))
        ])
    ]
})
export class SelectChoiceComponent implements OnInit {
    private choices: Array<SelectChoice>;
    private selected: SelectChoice;
    private state: string;
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
        this.state = 'inactive';
        this.place_holder = "Please select an option.";
        this.label = "Hello World";
    }
    selectChoice(new_selection: SelectChoice) {
        if(this.selected != new_selection)
            this.selected = new_selection;
    }
    toggleChoices(e) {
        e.preventDefault();
        this.state = (this.state === 'active') ? 'inactive' : 'active';
    }
    leftFocus(e) {
        e.preventDefault();
        this.state = 'inactive';
    }
    isActive() {
        return this.state === 'active';
    }
}
