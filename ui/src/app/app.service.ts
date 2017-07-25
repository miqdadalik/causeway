import 'rxjs/add/operator/finally';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AppService {

    protected http: Http;

    public constructor(http: Http) {

        this.http   = http;
    }

    public get(url: string, options: Object = {}): Observable<any> {
        return this.http.request(url, options);
    }
}
