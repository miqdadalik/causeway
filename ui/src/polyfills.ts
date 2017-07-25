import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

if (process.env.NODE_ENV === 'production') {
    // Production
    require('rxjs/add/operator/map');
    require('rxjs/add/operator/mergeMap');
    require('rxjs/add/observable/fromPromise');
} else {
    // Development
    Error[ 'stackTraceLimit' ] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
