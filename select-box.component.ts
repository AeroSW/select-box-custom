import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SelectOption} from './SelectBox';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
    selector: 'app-select-box',
    templateUrl: './select-box.component.html',
    styleUrls: ['./select-box.component.scss'],
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
export class SelectBoxComponent implements OnInit {
    display_dropdown: string;
    @Input() place_holder: string;
    @Input() value: string;
    @Input() label: string;
    @Input() items: Array<SelectOption>;
    @Output() CurrentSelection: EventEmitter<string> = new EventEmitter<string>();
    current: SelectOption;
    constructor() {}
    ngOnInit() {
        if(this.place_holder === null || typeof (this.place_holder) === "undefined") {
            this.place_holder = "Select an option";
        }
        if(this.items === null || typeof (this.items) === "undefined") {
            this.items = [];
        }
        if(this.items.length === 0) {
            this.items.push({
                "id": "none",
                "display": "None",
                "value": null
            });
        }
        if(this.value !== null && typeof (this.value) !== "undefined") {
            for(let ii = 0; ii < this.items.length; ii++){
                if(this.items[ii]['value'] == this.value) {
                    this.current = this.items[ii];
                    break;
                }
            }
        }
        else {
            this.current = null;
        }
        this.display_dropdown = 'inactive';
    }
    toggleDropdown(event) {
        event.preventDefault();
        this.display_dropdown = (this.display_dropdown === 'active') ? 'inactive' : 'active';
    }
    leftFocus(event) {
        event.preventDefault();
        this.display_dropdown = 'inactive';
    }
    itemSelected(item) {
        this.current = item;
        this.CurrentSelection.emit(item["value"]);
    }
}
