export class Map {
    private menucode: any;
    private menuname: any;
    map: Map;
    public lstMenus: Array<Map>;

    constructor(menuCode: any, menuName: any) {
        this.menucode = menuCode;
        this.menuname = menuName;
        this.lstMenus = new Array<Map>();
    }

    public Clear() {
        this.lstMenus = null;
        this.lstMenus = new Array<Map>(); //clearing
    }
    public get(): Array<Map> {
        return this.lstMenus;
    }
    public add(mcode: any, mname: any) {
        this.menucode = mcode;
        this.menuname = mname;

        this.map = new Map(mcode, mname);

        if (this.lstMenus.length != 0) {
            this.lstMenus[this.lstMenus.length] = this.map;
        }
        else {
            this.lstMenus[0] = this.map;
        }

    }


    get MENUCODE(): string {
      
        return this.menucode;
    }
    set MENUCODE(value: string) {
 
        this.menucode = value;
    }

    get MENUNAME(): string {
  
        return this.menuname;
    }
    set MENUNAME(value: string) {
   
        this.menuname = value;
    }

}