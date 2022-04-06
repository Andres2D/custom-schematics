import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-<%= dasherize(name) %>',
    templateUrl: './seed-<%= dasherize(name) %>.component.html',
    styleUrls: ['./seed-<%= dasherize(name) %>.component.scss'],
})
export class <%= dasherize(name) %>Component implements OnInit {

    constructor() {}

    ngOnInit(): void {
        console.log('Hello <%= name %>');
        console.log('<%= dasherize(name) %>');
        console.log('<%= classify(name) %>');
        console.log('<%= camelize(name) %>');
    }
}