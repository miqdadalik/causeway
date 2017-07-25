import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * Application Component
 *
 * @export
 * @class AppComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'app',
    templateUrl: 'app.html',
})
export class AppComponent implements OnInit {

    /**
     * Creates an instance of AppComponent.
     * @param {Router} router
     * @param {Title} titleService
     * @param {GlobalService} globalService
     * @param {ActivatedRoute} activatedRoute
     *
     * @memberof AppComponent
     */
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    /**
     * Listen to route changes and update title
     *
     * @memberOf AppComponent
     */
    public ngOnInit() {

    }
}
