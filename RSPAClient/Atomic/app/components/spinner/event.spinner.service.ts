import { Injectable } from '@angular/core';
import { EventBase } from './event.base';
import { SpinnerSentEvent } from './spinner.sent.event';

@Injectable()
export class SpinnerService {

    getEvent<T extends EventBase>(type: { new (): T; }): T {
        let instance: T;

        let index = this.events.findIndex(item => item[0] === type.toLocaleString());

        if (index > -1) {
            const eventBase: EventBase = this.events[index][1];
            return eventBase as T;
        } else {
            instance = new type();
            this.events.push([type.toLocaleString(), instance]);
        }

        return instance;
    }

    private activator<T>(type: { new (): T; }): T {
        return new type();
    }

    private events: Array<[string, EventBase]> = [];

    start() {
        this.getEvent(SpinnerSentEvent).publish(true);
    }

    stop() {
        this.getEvent(SpinnerSentEvent).publish(false);
    }

}