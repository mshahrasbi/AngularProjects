import { Injectable } from '@angular/core';


// @Injectable({providedIn: 'root'})
export class LoggingService {

    lastlog: string;

    printlog(message: string) {
        console.log('[LoggingService] printlog: message: ', message);
        console.log('[LoggingService] printlog: lastlog: ', this.lastlog);

        this.lastlog = message;
    }
}