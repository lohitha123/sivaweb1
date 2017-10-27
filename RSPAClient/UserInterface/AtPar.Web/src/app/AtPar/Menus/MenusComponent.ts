


import { Component, Input } from '@angular/core';
import { MenuServices } from '../Menus/MenusService';
import { Menus } from '../Menus/routepath';
import { Map } from '../Menus/MenuMapping';
import { SpinnerComponent } from '../../components/spinner/spinner-component';
//import { SpinnerService } from '../../components/spinner/spinner-service';

@Component({
    selector: 'menu-app',
    templateUrl: './app/AtPar/Menus/Menus.html',
    providers: [MenuServices]
})


export class MenuComponent {
    @Input() data: string = "0";

    menudetails: Menus[];
    menusApp: Menus[];
    menus: Menus[];
    menulistnames: Map;
    submenulistnames: Map;

    profileId: string;
    appId: number;
    serverUser: string;
    clientUser: string;
    LdapUser: string;

    MenusList1: any[] = [];
    statuscode: number;


    menucode: string = "";
    menuname: string = "";

    mainMenus: Array<Map>;
    subMenus: Array<Map>;



    constructor(private menulistService: MenuServices) {

        this.mainMenus = new Array<Map>();
        this.subMenus = new Array<Map>();

        this.menulistnames = new Map("", "");
        this.submenulistnames = new Map("", "");
    }



    prevappid: number = -1;
    istrue: boolean = true;
    getmenulist(): void {
        try {

            //this.spinnerService.start();
            //this.menulistService.getmenulist().forEach(z => {
            //    this.menus = z.DataList



            //    for (let u = 0; u < this.menus.length; u++) {

            //        //this.profileId = this.menus[u].PROFILE_ID;
            //        //this.appId = this.menus[u].APP_ID;
            //        //this.serverUser = this.menus[u].SERVER_USER;
            //        //this.clientUser = this.menus[u].CLIENT_USER;
            //        //this.LdapUser = this.menus[u].LAST_UPDATE_USER;

            //        //if (this.serverUser.toUpperCase() == "Y") {

            //        if (this.prevappid != this.menus[u].APP_ID) {
            //            this.prevappid = this.menus[u].APP_ID;
            //            this.menulistnames.add(this.menus[u].APP_ID.toString(), this.menus[u].APP_NAME.toString());

            //        }
            //        else {
            //            this.prevappid = this.menus[u].APP_ID;
            //            if (this.menus.length < u + 1) {
            //                this.menulistnames.add(this.menus[u].APP_ID.toString(), this.menus[u].APP_NAME.toString());

            //            }
            //        }
            //    }
            //    // }

            //    this.mainMenus = this.menulistnames.get();
            //    this.subMenus = this.submenulistnames.get();

            //    this.spinnerService.stop();
            //});

        }
        catch (ex) {
            throw ex;
        }
    }


    ngOnInit(): void {

        this.getmenulist();


    }
    onSelect(appId: number, profileid: string) {
        this.submenulistnames.Clear();
        this.data = appId.toString();
        this.appId = appId;
        this.profileId = profileid;

        for (let u = 0; u < this.menus.length; u++) {
            if (appId == this.menus[u].APP_ID) {

                //this.submenulistnames.add(this.menus[u].ROUTE.toString(), this.menus[u].MENU_NAME.toString());

            }
        }
        this.subMenus = this.submenulistnames.get();

    }



}
