
import { Component, Inject } from '@angular/core';
import { DOCUMENT, Title } from '@angular/platform-browser';

/**
*	This class represents the lazy loaded HomeComponent.
*/
declare var module: {
    id: string;
}

@Component({
    templateUrl: 'trackit.requestor.item.visibility.report.html',

})

export class RequestorItemVisibilityReportComponent {

    constructor( 
        private title: Title,
        @Inject(DOCUMENT) private document)
       {
        try {
       
            this.title.setTitle('TrackIT - Requestor Item Visibility Report');
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        
    }
    clientErrorMsg(ex) {

    }

}
