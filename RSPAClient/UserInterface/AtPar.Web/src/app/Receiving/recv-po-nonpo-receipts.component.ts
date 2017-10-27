import { Component, Input, OnDestroy, ViewChild, Inject } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";
import { Http, Response } from '@angular/http';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { TokenEntry_Enum, StatusType, EnumApps, YesNo_Enum, Enterprise_Enum, BusinessType, SendNonPOs_Hdr, Process_Type, Perform_Action, Shiping_Label_PrinterType, Enable_Lot_Serial_Tracking, AppTransactionStatus } from '../Shared/AtParEnums';
import { HttpService } from '../Shared/HttpService';
import { AtParConstants } from '../Shared/AtParConstants';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Message } from './../components/common/api';
import { DataTable } from '../components/datatable/datatable';
import { regExpValidator } from '../components/atpartext/Validators';
import { ConfirmationService } from '../components/common/api';
import { RecvPoNonPoReceiptsService } from './recv-po-nonpo-receipts.service';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../entities/mt_atpar_org_group_bunits';
import { MT_RECV_SHIPTO_ID_ALLOCATION } from '../entities/mt_recv_shipto_id_allocation';
import { MT_ATPAR_IBU_ALLOCATION } from '../entities/mt_atpar_ibu_allocation';
import { MT_ATPAR_ORG_GROUP_PARAMETERS } from '../entities/mt_atpar_org_group_parameters';
import { MT_ATPAR_PROFILE_PARAMETERS } from '../entities/mt_atpar_profile_parameters';
import { MT_ATPAR_USER_APP_PARAMETERS } from '../entities/mt_atpar_user_app_parameters';
import { VM_ATPAR_PROFILE_LIST_VIEW } from '../entities/vm_atpar_profile_list_view';
import { VM_RECV_IUTGETPOS } from '../entities/vm_recv_iutgetpos';
import { VM_RECV_POHEADER } from '../entities/vm_recv_poheader';
import { VM_RECV_SENDPOHEADER } from '../entities/vm_recv_sendpoheader';
import { VM_PTWY_HEADER } from '../entities/vm_ptwy_header';
import { VM_RECV_SENDLINEHEADER } from '../entities/vm_recv_sendlineheader';
import { VM_RECV_IUT_ITEMS } from '../entities/vm_recv_iut_items';
import { MT_ATPAR_SETUP_PRO_PRINTERES } from '../entities/mt_atpar_setup_pro_printeres';
import { MT_RECV_CARRIER } from '../entities/mt_recv_carrier';
import { VM_RECV_ALTUOM } from '../entities/vm_recv_altuom';
import { VM_PRINTLABEL_RECEIVE_HEADER } from '../entities/vm_printlabel_receive_header';
import { VM_RECV_PRINTER_HEADER } from '../entities/vm_recv_printer_header';
import { VM_RECV_SEARCHHEADER } from '../entities/vm_recv_searchheader';
import { VM_IUT_SENDHEADER } from '../Entities/VM_IUT_SENDHEADER';
import { VM_IUT_SEARCHHEADER } from '../Entities/VM_IUT_SEARCHHEADER';
import { VM_RECV_SENDNONPOHEADER } from '../Entities/MT_RECV_NONPO';
import { RM_USER_LOCATIONS } from '../Entities/RM_USER_LOCATIONS';
import { VM_RECV_LOTSERIAL } from '../Entities/VM_RECV_LOTSERIAL';
import { VM_RECV_ITEMS_INFO } from '../Entities/VM_RECV_ITEMS_INFO';
import { VM_RECV_RECEIVER_IDS } from '../entities/vm_recv_receiver_ids';
import { VM_RECV_NONPO_PRINTERDETAILS } from '../entities/vm_recv_nonpo_printerdetails';
import { VM_RECV_RECALL_INFO } from '../entities/vm_recv_recall_info';
import { Menus } from '../AtPar/Menus/routepath';
import { DOCUMENT, Title } from '@angular/platform-browser';

declare var module: {
    id: string;
}
@Component({
    templateUrl: 'recv-po-nonpo-receipts.component.html',
    providers: [datatableservice, AtParCommonService, RecvPoNonPoReceiptsService, ConfirmationService]
})

export class PoNonPoReceiptsComponent {

    pop: boolean = false;
    page: boolean = true;
    purchase: boolean = false;
    printtbl: boolean = false;
    tbl: boolean = false;
    plus: boolean = true;
    minus: boolean = false;
    bysch: boolean = false;
    recvSearchPos: boolean = false;
    recvIUTSearch: boolean = false;
    editform: boolean = false;
    lotserial: boolean = false;
    sales: Employee[];
    blnFlag: boolean = false;
    ven: any;
    loading: boolean = true;
    blnSchedsExist: boolean = false;
    blnReceiveall: boolean = false;
    lotserialGrid: boolean = false;

    macAddressStatus: number;
    date1: Date;
    date2: Date;
    minDateValue1: Date = new Date();
    minDateValue2: Date;

    btnTrackingNumber: boolean = false;
    lblTrackingNumber: boolean = false;
    btnPntrLotSerialDisable: boolean = false;

    public newItem = new PAR_MNGT_VENDOR();
    public poNewItem = new VM_RECV_SENDNONPOHEADER();
    lstNonPoItems: VM_RECV_SENDNONPOHEADER[];
    lstRecipients: RM_USER_LOCATIONS[];
    lstCheckedRecipients: RM_USER_LOCATIONS[];
    lstRecipientsChck: RM_USER_LOCATIONS[];

    //Variables
    @Input() appId: string;
    @ViewChild(DataTable) dataTableComponent: DataTable;
    deviceTokenEntry: string[] = [];
    statusMsgs: Message[] = [];

    lstBunits: MT_ATPAR_ORG_GROUP_BUNITS[];
    lstShipToIds: MT_RECV_SHIPTO_ID_ALLOCATION[];
    lstOrgParms: MT_ATPAR_ORG_GROUP_PARAMETERS[];
    lstProfileApp: MT_ATPAR_PROFILE_PARAMETERS[];
    lstUserApp: MT_ATPAR_USER_APP_PARAMETERS[];
    lstInventoryBunits: string[];
    lstScreenApp: VM_ATPAR_PROFILE_LIST_VIEW[];
    lstRecvIUTGetPo: Array<VM_RECV_IUTGETPOS>;
    arrlstIUTSearch: VM_IUT_SEARCHHEADER[];
    arrlstPOSearch: VM_RECV_SEARCHHEADER[];
    lstRecvPoItems: Array<VM_RECV_POHEADER>;
    lstRecvSendPoHdrs: VM_RECV_SENDPOHEADER[];
    lstRecvIutPoItems: VM_PTWY_HEADER[];
    lstRecvSendPoLines: VM_RECV_SENDLINEHEADER[];
    lstGridRecvSendPoLines: VM_RECV_SENDLINEHEADER[];
    lstRecvIutItems: VM_RECV_IUT_ITEMS[];
    lstSetUpProPrinters: MT_ATPAR_SETUP_PRO_PRINTERES[];
    lstPrintersDetails: MT_ATPAR_SETUP_PRO_PRINTERES[];
    lstCarriersData: MT_RECV_CARRIER[];
    lstRecvAltUomData: VM_RECV_ALTUOM[];
    lstReceivePoHeaderData: VM_RECV_SENDPOHEADER[];
    lstReceiveDetailsData: VM_RECV_SENDLINEHEADER[];
    lstPrinterLabelRecvHeader: VM_PRINTLABEL_RECEIVE_HEADER[];
    receive_itemSubdetails_dt: VM_RECV_LOTSERIAL[] = [];
    lstRecvSendData: VM_RECV_SENDLINEHEADER[];
    lstRecvSearchPO: VM_RECV_SEARCHHEADER[];
    lstSeachItems: VM_RECV_SEARCHHEADER[];
    lstRecvIUTSearchPO: VM_IUT_SENDHEADER[];
    lstRecvSearchIuts: VM_IUT_SEARCHHEADER[];
    lstMainItemLotSerial: VM_RECV_LOTSERIAL[] = [];
    lstFinalLotSerial: VM_RECV_LOTSERIAL[] = [];
    LotSerialentity: VM_RECV_LOTSERIAL;
    editLotSerialEntity: VM_RECV_LOTSERIAL;
    lstItemsInfo: VM_RECV_ITEMS_INFO[];
    lstAsnDetails: VM_RECV_RECEIVER_IDS[] = [];
    lstReCallInfo: VM_RECV_RECALL_INFO[];
    receItemColumns: VM_ATPAR_PROFILE_LIST_VIEW[] = [];
    receIutItemColumns: VM_ATPAR_PROFILE_LIST_VIEW[] = [];
    receSchdlItemColumns: VM_ATPAR_PROFILE_LIST_VIEW[] = [];

    lstFilterItems: any = [];
    ddlRecvUom: any = [];
    lstLotSerial: any = [];
    selecstedRow: any;
    ddlBusinessUnits: any;
    ddlCarrier: any;
    grdDdlCarrier: any
    ddlNonPOCarrier: any;
    ddlShipToId: any;
    selectedlotserialUOM: string = "";
    txtFrmDate: any = new Date();
    txtToDate: any = new Date();

    currentDate = new Date();
    currentFromDate = new Date();

    selectedBUnits: string = "Select BusinessUnit";
    selectedDdlCarrier: string = "Select Carrier";
    selectedSchdDdlCarrier: string = "Select Carrier";
    selectedShipToId: string = "Select ShipToID";
    selectedRecvUom: string = "";
    gstrLoader: string;
    hdnBunit: string = "";
    hdnPO: string = "";
    hdnIUT: string = "";
    hdnPoSearch: string = "";
    hdnIUTSearch: string = "";
    hdnConfirmNonPo: string = "";
    hdnConfirmPoDelete: string = "";
    hdnConfirmIUTDelete: string = "";
    hdnItemId: string = "";
    hdnItemType: string = "";
    hdnInvItemId: string = "";
    hdnSearchWithOutBU: string = "";
    hdnNonPo: string = "";
    hdnCnfmZroQty: string = "";
    txtShipId: string = "";
    txtPONumber: string = "";
    txtIUT: string = "";
    txtInvoice: string = "";
    txtPkgs: string = "";
    txtTrk: string = "";
    txtSchdExTrk: string = "";
    txtLading: string = "";
    lblReceiverId: string = "";
    lblBuyerId: string = "";
    lblPhoneValue: string = "";
    standardUOM: string = "";
    strDefaultCarrierID: string = "";
    standardConversionRate: string = "";
    txtNoOfBoxes: string = "";
    lnkItemId: string = "";
    txtQty: string = "";
    ddlGridCarrier: string = "";
    txtLadg: string = "";
    lnkLineNbr: string = "";
    ERS_TYPE: string = "INR"
    concatinateTrkNoPoID: string = "";
    txtSerchItemId: string = "";
    txtItemId: string = "";
    txtVendorId: string = "";
    txtVendorName: string = "";
    schedNbr: string = "";
    lotSerialConverfactor: number = 0;
    serialControl: string = "";
    lotControl: string = "";
    strTotalQty: string = "";
    txtLotserialExpDate: any = new Date();
    strLotSerialUom: string = "";
    lblHdrComments: string = "";
    lblHdrCommentsToolTip: string = "";
    selectedINVITEMID: string = "";
    selectedSCHEDNBR: string = "";
    selectedReceiverId: string = "";
    mode: string;
    presentScreen: string = "PO";
    hdnReqShiptoId: string = "";
    hdnIncludeASNPOs: string = YesNo_Enum[YesNo_Enum.N].toString();
    selectedRecvId: string = "";
    recnonstaticFields: string = "INV_ITEM_ID,LINE_QTY,UNIT_OF_MEASURE,CARRIER_ID,BILL_OF_LADING,LINE_NBR,NO_OF_BOXES,EXT_TRK_NO,NO_OF_BOXES,DESCR";

    gIUTTransactionID: string;
    gStrASNDownload: string = "";
    gStrReceiverId: string = "";
    gStrLotSerial: string = "";
    gTransactionID: string = "";
    gInvoiceMthdCode: string = "";
    gDropShipFlag: string = "";
    gStrDefaultInput: string = "";
    gStrEditShipToId: string = "";
    gStrNonPoItemsReceive: string = "";
    gStrUOMEditFlag: string = "";
    gStrReqdShipToId: string = "";
    gStrDisplayReceivedQty: string = "";
    gStrAllowIUTAccess: string = "";
    gASNReceiptStatus: string = "";
    gStrNonStockStore: string = "";
    gStrSearchType: string = "";
    gStrAltUOMDisplay: string = "";
    gStrAllowExcessQty: string = "";
    gStrZeroReceiptWarn: string = "";
    gDefaultDateRange: string = "";
    gDisplayComments: string = "";
    gStrDefPrinter: string = "";
    gStrSelPrinter: string = "";
    gStrPrintPoIDComments: string = "";
    gConcatinateTrkNoPoID: string = "";
    gStrRecDelprintoption: string = "";
    gdonotDefaulttrackingNumber: string = "";
    gPrintStockHeader: string = "";
    gRecv_StandardUOM: string = "STANDARDUOM";
    gRecv_PoUOM: string = "PO UOM";
    gPOUOM: string = "";
    gPOUOMConversionRate: string = "";
    gSTime: string = "";
    gStrInvoice: string = "";
    gstrPrevComments: string = "";
    gstrlnkitemid: string = "";
    gstrlnklineNbr: string = "";

    gblnCancel: boolean = false;
    gblnASNPO: boolean = false;
    gblnLotSerialFlg: boolean = false;
    gblnScheduleFlg: boolean = false;

    nonStockCount: number;
    stockCount: number;
    recordsPerPageSize: number;
    intAppId: number;
    statusCode: number = -1;
    statusType: number = -1;
    shipToIdCount: number = 0;
    cntLotSerialQty: number = 0;
    intTolRecvQty: number = 0;
    hdnItmLineNo: number;
    hdnItmSchedLineNo: number;

    blnShipToId: boolean = true;
    chkIncludeAllPOLines: boolean = false;
    btnPntrHeaderVisible: boolean = true;
    btnPntrDetailsVisible: boolean = true;
    btnPntrLotSerialVisible: boolean = false;
    txtIutIsEditMode: boolean = true;// false;
    blnGrdRecvPoItems: boolean = false;
    blnGrdRecvIutItems: boolean = false;
    btnIUTSearch: boolean = true;
    btnNonPo: boolean = true;
    btnPoSearch: boolean = true;
    btnGetEnableDisable: boolean = false;
    btnPoSearchEnableDisable: boolean = false;
    btnIUTSearchEnableDisable: boolean = false;
    btnNonPoEnableDisable: boolean = false;
    recvGrdCarrierEnable: boolean = false;
    ddlRecvUomEnable: boolean = false;
    btnLotSerialDisable: boolean = false;
    btnPntrHeaderDisable: boolean = false;
    btnPntrDetailsDisable: boolean = false;
    blnTxtExtTrk: boolean = true;
    blnLblExtTrk: boolean = true;
    blnImgCountAll: boolean = true;
    blnImgResetAll: boolean = true;
    blnPrinted: boolean;
    txtLadingIsEditMode: boolean = false;
    txtExtTrkIsEditMode: boolean = false;
    grdRecvLinesRbBtnCheck: boolean = false;
    grdRecvIutItemsRbBtnCheck: boolean = false;
    grdRecvSearchPos: boolean = false;
    txtPkgsIsReadonly: boolean = false;
    rbtnDueDate: boolean = false;
    rbtnPODate: boolean = false;
    blnlnkItemIdEnable: boolean = false;
    blnlnkLineNbrEnable: boolean = false;
    ddllotserialUomEnable: boolean = false;
    txtLotSerialQtyIsEditMode: boolean = false;
    txtSerialIDIsEditMode: boolean = false;
    txtLotIdIsEditMode: boolean = false;
    txtLotserialExpDateIsEditMode: boolean = false;
    blnShowPopUp: boolean = false;
    blnScheduleItems: boolean = false;
    blntxtShipIdDisable: boolean = true;// false;
    lotSerialDeleteFlg: boolean = false;

    /*Non PO*/
    nonPO: boolean = false;
    nonPoDisable: boolean = true;
    intNoOfBoxses: number;
    nonPOReceipts: boolean = false;
    blnRecipients: boolean = false;
    shipIDStatus: number;
    trackNoStatus: number;

    /**	Scheduled Po*/
    dblConvertionfactor: number;
    mStandardConversionRate: string;
    StrSerialControlled: string;
    StrLotControlled: string;
    strItemId: string;
    strLineNbr: string;
    strUOM: string;
    strLineId: string;
    dtScheduleItems: any = [];
    schPO: boolean = false;
    isScheduleSave: boolean = false;
    lotSerialSchdFlg: boolean = false;

    blnMgf: boolean = false;
    blnLot: boolean = false;
    blnSerial: boolean = false;
    blnPackage: boolean = false;
    blnItemPrice: boolean = false;
    blnNoofBoxes: boolean = false;
    blnTrkNo: boolean = false;
    blnExtrkNo: boolean = false;
    blnRecQty: boolean = false;
    blnGTIN: boolean = false;
    blnUPC: boolean = false;
    blnShip: boolean = false;
    lstCheckedBUnits: any = [];
    startIndex: number;
    endIndex: number;
    breadCrumbMenu: Menus;
    selectedPrinterName: string = "";

    constructor(public dataservice: datatableservice, private spnrService: SpinnerService,
        private httpService: HttpService,
        private atParConstant: AtParConstants,
        private commonService: AtParCommonService,
        @Inject(DOCUMENT) private document,
        private recvPoNonPoService: RecvPoNonPoReceiptsService,
        private confirmationService: ConfirmationService) {
        this.breadCrumbMenu = new Menus();

        this.ven = new Employee();
        this.poNewItem = new VM_RECV_SENDNONPOHEADER();// VM_MT_RECV_NONPO();
        //this.addUserData.City = [];
    }

    // Grid visibility events start
    go() {
        this.pop = !this.pop;
    }

    plusShow() {
        this.statusMsgs = [];
        this.minus = true;
        this.plus = false;
        setTimeout(() => { this.rbtnPODate = true; }, 1);
    }

    minusShow() {
        this.statusMsgs = [];
        this.plus = true;
        this.minus = false;
        setTimeout(() => { this.rbtnPODate = true; }, 1);
    }

    poBack() {
        this.statusMsgs = [];
        this.tbl = false;
        this.page = true;
        this.recvSearchPos = false;
        this.recvIUTSearch = false;
    }

    lot() {
        this.statusMsgs = [];
        this.bysch = false;
        this.lotserial = !this.lotserial;
    }

    print() {
        this.statusMsgs = [];
        this.printtbl = true;
        this.bysch = false;
    }

    printback() {
        this.statusMsgs = [];
        this.printtbl = false;
        if (this.presentScreen == "NONPO") {
            this.nonPO = true;
        }
        else if (this.presentScreen == "ScheduledPo") {
            this.bysch = true;
        }
        else {
            this.tbl = true;
            this.page = true;
        }
    }

    get2() {
        this.statusMsgs = [];
        this.purchase = !this.purchase;
        this.tbl = false;
        this.page = false;
        this.recvSearchPos = false;
        this.recvIUTSearch = false;
    }

    getBack() {
        this.statusMsgs = [];
        this.purchase = false;
        this.tbl = false;
        this.page = true;
        this.recvSearchPos = false;
        this.recvIUTSearch = false;
    }

    close() {
        this.statusMsgs = [];
        this.page = true;
        this.pop = true;
    }

    onfocusToCalendar(e) {
        this.statusMsgs = [];
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        }
        else {
            this.minDateValue2 = this.date1;
        }
    }

    onfocusFromCalendar(e) {
        this.statusMsgs = [];
        localStorage.removeItem("FromDate");
        this.date1 = null;
    }
    // Grid visibility events end

    // Page Initialization.
    async ngOnInit() {
        try {
            this.statusMsgs = [];
            this.statusCode = -1;
            this.spnrService.start();
            this.intAppId = parseInt(this.appId);
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.statusCode = await this.getReceivePrerequisites();
            if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                return;
            }
            await this.loadparameters("mt_recv_po_or_nonpo_receipts");
            if (this.gDefaultDateRange != null && this.gDefaultDateRange != "") {
                this.currentFromDate = new Date();
                this.currentFromDate.setDate(this.currentFromDate.getDate() - parseInt(this.gDefaultDateRange));
                this.txtFrmDate = (this.currentFromDate.getMonth() + 1) + '/' + (this.currentFromDate.getDate()) + '/' + this.currentFromDate.getFullYear();
                this.txtToDate = (this.currentDate.getMonth() + 1) + '/' + (this.currentDate.getDate()) + '/' + this.currentDate.getFullYear();
            }
            else {
                this.currentFromDate = new Date();
                this.txtToDate = (this.currentDate.getMonth() + 1) + '/' + (this.currentDate.getDate()) + '/' + this.currentDate.getFullYear();
                this.txtFrmDate = (this.currentFromDate.getMonth() + 1) + '/' + (this.currentFromDate.getDate()) + '/' + this.currentFromDate.getFullYear();
            }
            this.spnrService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    // Page Load Event.
    async page_Load() {
        try {
            this.spnrService.start();
            //this.RegisterScripts();
            this.statusMsgs = [];
            this.statusCode = -1;
            if (this.gDefaultDateRange != null && this.gDefaultDateRange != "") {
                this.currentFromDate = new Date();
                this.currentFromDate.setDate(this.currentFromDate.getDate() - parseInt(this.gDefaultDateRange));
                this.txtFrmDate = (this.currentFromDate.getMonth() + 1) + '/' + (this.currentFromDate.getDate()) + '/' + this.currentFromDate.getFullYear();
                this.txtToDate = (this.currentDate.getMonth() + 1) + '/' + (this.currentDate.getDate()) + '/' + this.currentDate.getFullYear();
            } else {
                this.currentFromDate = new Date();
                this.txtToDate = (this.currentDate.getMonth() + 1) + '/' + (this.currentDate.getDate()) + '/' + this.currentDate.getFullYear();
                this.txtFrmDate = (this.currentFromDate.getMonth() + 1) + '/' + (this.currentFromDate.getDate()) + '/' + this.currentFromDate.getFullYear();
            }

            this.clearData();
            this.gStrReceiverId = "";
            if (this.hdnConfirmPoDelete == YesNo_Enum[YesNo_Enum.Y].toString()) {//& (Session["ReceiveDetails"] != null)
                //Delte PO 
                this.deletePo();
                return;
            } else if (this.hdnConfirmIUTDelete == YesNo_Enum[YesNo_Enum.Y].toString()) {// & (Session["IUTItems"] != null)
                //Delete IUT
                this.deleteIUTOrder();
                return;
            }
            await this.bindDataGrid();
            if (this.selectedDdlCarrier == "Select Carrier") {
                this.populateCarrierDropDown(this.selectedDdlCarrier);
            }
            else {
                if (this.lstUserApp != null && this.lstUserApp.length > 0) {
                    let strDefaultCarrierID = asEnumerable(this.lstUserApp).ToArray()[1].PARAMETER_VALUE;
                    if (strDefaultCarrierID != null && strDefaultCarrierID != "") {
                        if (this.selectedDdlCarrier.toUpperCase() == strDefaultCarrierID.toUpperCase()) {
                            this.selectedDdlCarrier = strDefaultCarrierID.toUpperCase();
                        } else {
                            this.ddlCarrier.push({ label: strDefaultCarrierID, value: strDefaultCarrierID });
                            this.selectedDdlCarrier = strDefaultCarrierID.toUpperCase();
                        }
                    } else {
                        this.selectedDdlCarrier = "Select Carrier";
                    }
                }
            }

            if (this.gstrLoader != undefined && this.gstrLoader != "") {
                this.gstrLoader = "Loader";
            }

            await this.lotScheduleQty();
            if (this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0 && this.txtIUT != null && this.txtIUT != "") {
                await this.postbackGridBind(this.lstRecvIutItems, "IUT ITEMS");
            }
            else if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                await this.postbackGridBind(this.lstRecvSendPoLines, "RECEIVE ITEMS");
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "page_Load");
        }
    }

    bUnit_selectChanged(option, event) {
        try {
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bUnit_selectChanged");
        }
    }

    async ddlCarrier_selectChanged(option, event) {
        try {
            this.statusMsgs = [];
            if (this.selecstedRow != null) {
                if (this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0) {
                    this.selecstedRow.CARRIER_ID = this.selectedDdlCarrier;
                    this.selecstedRow.PRVCARRIER_ID = this.selecstedRow.CARRIER_ID;
                } else if (this.selecstedRow.SCHED_COUNT <= 1) {
                    this.selecstedRow.CARRIER_ID = this.selectedDdlCarrier;
                    this.selecstedRow.PRVCARRIER_ID = this.selecstedRow.CARRIER_ID;
                }
                let ddlCarriertxtDDSearch1 = <HTMLInputElement>document.getElementById("txtddlCarrier");
                if (ddlCarriertxtDDSearch1 != null) {

                    ddlCarriertxtDDSearch1.focus();

                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "ddlCarrier_selectChanged");
        }
    }

    ddlSchdCarrier_selectChanged(option, event) {
        try {
            this.statusMsgs = [];
            if (this.selecstedRow != null) {
                this.selecstedRow.CARRIER_ID = this.selectedSchdDdlCarrier;
                this.selecstedRow.PRVCARRIER_ID = this.selecstedRow.CARRIER_ID;

                let ddlCarriertxtDDSearch1 = <HTMLInputElement>document.getElementById("txtddlCarrier");
                if (ddlCarriertxtDDSearch1 != null) {

                    ddlCarriertxtDDSearch1.focus();

                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "ddlCarrier_selectChanged");
        }
    }

    async txtPkgs_TextChanged(event) {
        try {
            this.statusMsgs = [];
            setTimeout(() => {
                if (this.selecstedRow != null && this.selecstedRow.SCHED_COUNT <= 1) {
                    this.selecstedRow.NO_OF_BOXES = this.txtPkgs;
                }
            }, 10);
            // await this.changedata("NoOfBoxes", null);//this.selecstedRow
        }
        catch (ex) {
            this.clientErrorMsg(ex, "txtPkgs_TextChanged");
        }
    }

    txtSchdPkgs_TextChanged(event) {
        try {
            this.statusMsgs = [];
            setTimeout(() => {
                if (this.selecstedRow != null && this.selecstedRow.SCHED_COUNT <= 1) {
                    this.selecstedRow.NO_OF_BOXES = this.txtPkgs;
                }
            }, 10);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "txtSchdPkgs_TextChanged");
        }
    }

    async txtTrk_TextChanged(event) {
        try {
            this.statusMsgs = [];
            this.statusMsgs = [];
            setTimeout(() => {
                if (this.selecstedRow != null && this.selecstedRow.SCHED_COUNT <= 1) {
                    this.selecstedRow.EXT_TRK_NO = this.txtTrk;
                }
            }, 10);
            // await this.changedata("ExtTrkno", null);//this.selecstedRow
        }
        catch (ex) {
            this.clientErrorMsg(ex, "txtTrk_TextChanged");
        }
    }

    txtSchdTrk_TextChanged(event) {
        try {
            this.statusMsgs = [];
            this.statusMsgs = [];
            setTimeout(() => {
                if (this.selecstedRow != null) {
                    this.selecstedRow.EXT_TRK_NO = this.txtSchdExTrk;
                }
            }, 10);
            // await this.changedata("ExtTrkno", null);//this.selecstedRow
        }
        catch (ex) {
            this.clientErrorMsg(ex, "txtSchdTrk_TextChanged");
        }
    }

    async txtRecvQty_TextChanged(event, recvData) {
        try {
            this.statusMsgs = [];
            if (recvData.QTY != null && recvData.QTY != "") {
                if (parseInt(recvData.QTY) > 0) {
                    recvData.RECEIVED_FLAG = YesNo_Enum[YesNo_Enum.Y].toString();
                    recvData.LINE_QTY = recvData.QTY;

                }
            }
            if (recvData != null && recvData.INV_ITEM_ID == this.selectedINVITEMID) {
                this.txtPkgs = recvData.NO_OF_BOXES;
            }
            if (recvData.QTY != "" && parseInt(recvData.QTY) == 0 && this.hdnCnfmZroQty == YesNo_Enum[YesNo_Enum.Y].toString()) {
                this.confirmationService.confirm({
                    message: "Zero Receipt Quantity entered, continue?",
                    accept: async () => {
                        this.spnrService.stop();
                        return;
                    },
                    reject: () => {
                        setTimeout(() => {
                            let itemtxtRecvQty = document.getElementById('txtRecvQty' + recvData.INV_ITEM_ID)
                            if (itemtxtRecvQty != null) {
                                itemtxtRecvQty.focus();
                            }
                        }, 1);
                        recvData.QTY = "";
                        this.spnrService.stop();
                        return;
                    }
                });
                this.spnrService.stop();
            }
            let dateStr = new Date(new Date()).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
            if (this.gSTime != "") {
                this.gSTime = dateStr.replace(',', '');
            }

            await this.chkItemQty(recvData);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "txtRecvQty_TextChanged");
        }
    }

    txtNoOfBoxUnFocus(recvData) {
        try {
            this.statusMsgs = [];

            if (recvData != null) {
                if (recvData.INV_ITEM_ID == this.selectedINVITEMID) {
                    this.txtPkgs = recvData.NO_OF_BOXES;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "txtNoOfBoxUnFocus");
        }
    }

    txtSchdNoOfBoxUnFocus(recvData) {
        try {
            this.statusMsgs = [];

            if (recvData != null) {
                if (recvData.SCHED_NBR == this.selectedSCHEDNBR) {
                    this.txtPkgs = recvData.NO_OF_BOXES;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "txtSchdNoOfBoxUnFocus");
        }
    }

    txtExtTrackNoUnFocus(recvData) {
        try {
            this.statusMsgs = [];

            if (recvData != null) {
                if (recvData.INV_ITEM_ID == this.selectedINVITEMID) {
                    this.txtTrk = recvData.EXT_TRK_NO;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "txtExtTrackNoUnFocus");
        }
    }

    txtSchExtTrackNoUnFocus(recvData) {
        try {
            this.statusMsgs = [];

            if (recvData != null) {
                if (recvData.SCHED_NBR == this.selectedSCHEDNBR) {
                    this.txtSchdExTrk = recvData.EXT_TRK_NO;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "txtExtTrackNoUnFocus");
        }
    }

    async txtSchdRecvQty_TextChanged(event, recvData) {
        try {
            this.statusMsgs = [];
            if (recvData.QTY != null && recvData.QTY != "") {
                if (parseInt(recvData.QTY) > 0) {
                    recvData.RECEIVED_FLAG = YesNo_Enum[YesNo_Enum.Y].toString();
                    recvData.QTY = recvData.QTY;
                    recvData.SCHDQTYCHANGFLAG = true;
                }
            }

            if (recvData.QTY != "" && parseInt(recvData.QTY) == 0 && this.hdnCnfmZroQty == YesNo_Enum[YesNo_Enum.Y].toString()) {
                this.confirmationService.confirm({
                    message: "Zero Receipt Quantity entered, continue?",
                    accept: async () => {
                        this.spnrService.stop();
                        return;
                    },
                    reject: () => {
                        setTimeout(() => {
                            let itemtxtRecvQty = document.getElementById('txtRecvQty' + recvData.SCHED_NBR)
                            if (itemtxtRecvQty != null) {
                                itemtxtRecvQty.focus();
                            }
                        }, 1);
                        recvData.QTY = "";
                        this.spnrService.stop();
                        return;
                    }
                });
                this.spnrService.stop();
            }
            // await this.chkItemQty(recvData);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "txtSchdRecvQty_TextChanged");
        }
    }

    shipToId_selectChanged(option, event) {

    }

    async  receiveAll() {
        try {
            this.statusMsgs = [];
            let intScheduleCnt: number = 0;
            let strRecedQty: string = null;
            let strSerialControlled: string = null;
            let strLotControlled: string = null;
            this.blnReceiveall = true;

            if ((this.selectedDdlCarrier == 'Select Carrier' || this.selectedDdlCarrier == '' || this.selectedDdlCarrier == undefined) || (this.txtLading == '' || this.txtLading == null || this.txtLading == undefined)) {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Carrier and Lading are mandatory" });
                return;
            }

            this.lstCheckedBUnits = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.endIndex = + sessionStorage.getItem("RecordsEndindex");
            if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                if (this.endIndex > this.lstRecvSendPoLines.length) {
                    this.endIndex = this.lstRecvSendPoLines.length;
                }
                for (let i = this.endIndex - 1; i >= this.startIndex; i--) {
                    this.lstCheckedBUnits.push(this.lstRecvSendPoLines[i]);
                }
            }
            else if (this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0) {
                if (this.endIndex > this.lstRecvIutItems.length) {
                    this.endIndex = this.lstRecvIutItems.length;
                }
                for (let i = this.endIndex - 1; i >= this.startIndex; i--) {
                    this.lstCheckedBUnits.push(this.lstRecvIutItems[i]);
                }
            }

            for (var i = 0; i < this.lstCheckedBUnits.length; i++) {
                await this.poNonPo_RbtnChange(this.lstCheckedBUnits[i], false);
                this.txtSerchItemId = "";
                this.txtPkgs = "";
                this.blnSchedsExist = false;
                //}
                if (this.lstRecvIutItems == null || this.lstRecvIutItems == undefined) {
                    let lnkItemId = this.lstCheckedBUnits[i].INV_ITEM_ID;
                    intScheduleCnt = this.lstCheckedBUnits[i].SCHED_COUNT;
                    strSerialControlled = this.lstCheckedBUnits[i].SERIAL_CONTROLLED;
                    strLotControlled = this.lstCheckedBUnits[i].LOT_CONTROLLED;
                    let strRecallFlag: string = this.lstCheckedBUnits[i].RECAL_FLAG.toString();
                    if (intScheduleCnt == 1 && (this.gStrLotSerial == Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.None].toString() ||
                        !(strSerialControlled == YesNo_Enum[YesNo_Enum.Y].toString() || strLotControlled == YesNo_Enum[YesNo_Enum.Y].toString()))) {
                        this.blnFlag = true;
                        //Recall Checking
                        if (strRecallFlag == YesNo_Enum[YesNo_Enum.Y].toString()) {
                            let dtRecallInfo = this.lstReCallInfo;
                            if (dtRecallInfo != null && dtRecallInfo.length > 0) {
                                let dr = dtRecallInfo.filter(x => x.ITEM_ID == lnkItemId && (x.LOT_NO == "" || x.LOT_NO == null) && (x.SERIAL_NO == "" || x.SERIAL_NO == null));
                                if (dr != null && dr.length > 0) {
                                    this.blnFlag = false;
                                }
                            }
                        }
                    } else if (intScheduleCnt > 1) {
                        this.lstCheckedBUnits[i].SCHDFLAG = true;
                        this.blnSchedsExist = true;

                    } else if (strSerialControlled == YesNo_Enum[YesNo_Enum.Y].toString() || strLotControlled == YesNo_Enum[YesNo_Enum.Y].toString()) {
                        this.blnSchedsExist = true;
                        this.lstCheckedBUnits[i].SCHDFLAG = true;
                    }
                }

            }
            if (this.blnSchedsExist) {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Lines with schedules or lot serial have not been updated" });
                //   this.selectedINVITEMID = "";
            }
            setTimeout(() => {
                let serchItemId = document.getElementById('txtSerchItemId');
                if (serchItemId != null) {
                    serchItemId.focus();
                }
            }, 1);
            return;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ReceiveAll");
        }
    }

    resetAll() {
        try {
            this.statusMsgs = [];
            if (this.lstCheckedBUnits != null && this.lstCheckedBUnits.length > 0) {
                if (this.gStrDefaultInput) {

                }
            }
            let intScheduleCnt: number = 0;
            let strRecedQty: string = null;
            let strSerialControlled: string = null;
            let strLotControlled: string = null;
            let strPoQty: string = null;
            let txtNoOfBoxes: number;
            let blnFlag: boolean = false;
            let dtReceiveDetails: any;
            let strLot: string;
            let strSerial: string;
            let lnkLineNbr: number;
            let lbQtyPO: any;
            let lnkItemId: any;
            let txtQty: any;//.LINE_QTY;

            if (this.gStrDefaultInput) {
                if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines != undefined) {
                    if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                        for (var i = 0; i < this.lstRecvSendPoLines.length; i++) {
                            this.blnFlag = false;
                            dtReceiveDetails = this.lstRecvSendPoLines;
                            strLot = this.lstRecvSendPoLines[i].LOT_CONTROLLED;
                            this.lotControl = this.lstRecvSendPoLines[i].LOT_CONTROLLED;
                            strSerial = this.lstRecvSendPoLines[i].SERIAL_CONTROLLED;
                            this.serialControl = this.lstRecvSendPoLines[i].SERIAL_CONTROLLED;
                            lnkLineNbr = this.lstRecvSendPoLines[i].LINE_NBR;
                            this.schedNbr = this.lstRecvSendPoLines[i].SCHED_NBR + "";
                            lbQtyPO = this.lstRecvSendPoLines[i].LINE_PO_QTY;
                            lnkItemId = this.lstRecvSendPoLines[i].INV_ITEM_ID;
                            txtQty = this.lstRecvSendPoLines[i].QTY;//.LINE_QTY;
                            strRecedQty = this.lstRecvSendPoLines[i].RECEIVED_QTY + "";;
                            strPoQty = this.lstRecvSendPoLines[i].QTY_PO + "";//LINE_PO_QTY check once Qty
                            intScheduleCnt = this.lstRecvSendPoLines[i].SCHED_COUNT;
                            strSerialControlled = this.lstRecvSendPoLines[i].SERIAL_CONTROLLED;
                            strLotControlled = this.lstRecvSendPoLines[i].LOT_CONTROLLED;
                            if (lnkItemId != null) {
                                if (lnkItemId == "") {// && lnkLineNbr.Enabled == false check once
                                    this.blnFlag = true;
                                }

                                //Do not default Lines which have schedules
                                if (strSerialControlled == null || strSerialControlled == "") {
                                    strSerialControlled = YesNo_Enum[YesNo_Enum.N].toString();
                                }
                                if (strLotControlled == null && strLotControlled == "") {
                                    strLotControlled = YesNo_Enum[YesNo_Enum.N].toString();
                                }
                                if (intScheduleCnt == 1 && (this.gStrLotSerial == Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.None].toString() ||
                                    !(strSerialControlled == YesNo_Enum[YesNo_Enum.Y].toString() || strLotControlled == YesNo_Enum[YesNo_Enum.Y].toString()))) {
                                    this.blnFlag = true;

                                }
                                else if (intScheduleCnt > 1) {
                                    this.lstRecvSendPoLines[i].SCHDFLAG = true;
                                    this.blnSchedsExist = true;

                                }
                                else if (strSerialControlled == YesNo_Enum[YesNo_Enum.Y].toString() || strLotControlled == YesNo_Enum[YesNo_Enum.Y].toString()) {
                                    this.blnSchedsExist = true;
                                    this.lstRecvSendPoLines[i].SCHDFLAG = true;
                                }
                            }

                            if (this.blnFlag) {
                                this.lstRecvSendPoLines[i].QTY = null;
                                this.lstRecvSendPoLines[i].RBFlAG = false;
                                if ((this.lstRecvSendPoLines[i].NO_OF_BOXES != null)) {
                                    this.lstRecvSendPoLines[i].NO_OF_BOXES = null;
                                    this.txtPkgs = "";
                                }
                                this.lstRecvSendPoLines[i].CARRIER_ID = "Select Carrier";
                                this.lstRecvSendPoLines[i].BILL_OF_LADING = "";
                                this.lstRecvSendPoLines[i].NO_OF_BOXES = null;
                                this.txtPkgs = "";
                                this.txtLading = "";
                            }
                        }
                    }
                }
                if (this.lstRecvIutItems != null && this.lstRecvIutItems != undefined) {
                    if (this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0) {
                        for (var i = 0; i < this.lstRecvIutItems.length; i++) {
                            let lbInterUnit = this.lstRecvIutItems[i].INTERUNIT_LINE;
                            txtNoOfBoxes = parseInt(this.lstRecvIutItems[i].NO_OF_PKGS);
                            lnkItemId = this.lstRecvIutItems[i].ITEM_ID;
                            txtQty = parseInt(this.lstRecvIutItems[i].QTY);
                            if (this.lstRecvIutItems[i].ITEM_ID == lnkItemId && this.lstRecvIutItems[i].INTERUNIT_LINE == lbInterUnit) {
                                this.lstRecvIutItems[i].NO_OF_PKGS = "";
                                this.lstRecvIutItems[i].BILL_OF_LADING = ""
                                if (this.selectedDdlCarrier == 'Select Carrier') {
                                    this.lstRecvIutItems[i].CARRIER_ID = this.selectedDdlCarrier;
                                }
                                this.lstRecvIutItems[i].RBFlAG = false;
                                this.lstRecvIutItems[i].QTY = null;
                                this.lstRecvIutItems[i].CARRIER_ID = "Select Carrier";
                                this.lstRecvIutItems[i].BILL_OF_LADING = "";
                                this.lstRecvIutItems[i].NO_OF_PKGS = null;
                                this.txtPkgs = "";
                                this.txtLading = "";
                            }
                        }
                    }
                }
            }
            if (this.blnSchedsExist) {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Lines with schedules or lot serial have not been updated" });
                //this.selectedINVITEMID = "";
                return;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ResetAll");
        }
    }

    async btnGet_Click() {
        try {
            // this.selectedINVITEMID = "";
            this.presentScreen = "PO";
            this.page = true;
            this.purchase = false;
            this.plus = true;
            this.minus = false;
            this.statusMsgs = [];
            this.selectedRecvId = "";
            if ((this.selectedBUnits == "Select BusinessUnit" || this.selectedBUnits == "")) {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                return;
            }

            if ((this.selectedBUnits == "Select BusinessUnit" || this.selectedBUnits == "") && this.hdnSearchWithOutBU == YesNo_Enum[YesNo_Enum.N].toString()) {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                return;
            }
            if (this.txtPONumber.trim() == "" && this.txtIUT.trim() == "") {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Enter PO or IUT Number" });
                this.tbl = false;
                this.lstRecvIutItems = [];
                this.lstRecvSendPoLines = [];
                return;
            }
            else if (this.txtPONumber != "" && this.txtIUT != "") {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Enter any one PO or IUT Number" });
                return;
            }
            if (this.hdnReqShiptoId == YesNo_Enum[YesNo_Enum.Y].toString() && this.txtPONumber.trim() != "") {
                if (this.ddlShipToId != undefined && this.ddlShipToId != null && this.blnShipToId == true) {
                    if (this.selectedShipToId == "Select ShipToID" || this.selectedShipToId == "") {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ShipTo ID is mandatory to download the PO" });
                        return;
                    }
                }
                if (this.txtShipId != null && this.blnShipToId == false) {
                    if (this.txtShipId == "") {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ShipTo ID is mandatory to download the PO" });
                        return;
                    }
                }
            }

            if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                this.btnPntrHeaderDisable = false;
                this.btnPntrDetailsDisable = true;
                if (this.hdnBunit == this.selectedBUnits && this.txtPONumber != "" && this.hdnPO == this.txtPONumber.toUpperCase()) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "This PO is in Download status" });
                    return;
                }
                else {
                    this.selectedINVITEMID = "";
                    await this.confirmData("Get");
                }
            }
            else if (this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0) {
                this.btnPntrHeaderDisable = true;
                this.btnPntrDetailsDisable = true;

                if (this.hdnBunit == this.selectedBUnits && this.txtIUT != "" && this.hdnIUT == this.txtIUT.toUpperCase()) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "This IUT is in Download status" });
                    return;
                } else {
                    this.selectedINVITEMID = "";
                    await this.confirmIUT("Get");
                }
            }
            else {
                this.txtTrk = "";
                this.selectedINVITEMID = "";
                await this.bindDataGrid();
                await this.populateCarrierDropDown(this.selectedDdlCarrier);
                this.spnrService.stop();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnGet_Click");
        }
    }

    async btnSend_Click(event) {
        try {
            this.statusMsgs = [];
            this.statusCode = -1;
            if (this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0) {
                for (let i = 0; i < this.lstRecvIutItems.length; i++) {
                    this.txtNoOfBoxes = this.lstRecvIutItems[i].NO_OF_PKGS;
                    this.lnkItemId = this.lstRecvIutItems[i].ITEM_ID;
                    this.txtQty = this.lstRecvIutItems[i].QTY;
                    if (this.txtQty != null && this.txtQty != "" && this.txtQty != undefined) {
                        let checkQtyValue = await this.chkItemQty(this.lstRecvIutItems[i]);
                        if (checkQtyValue) {
                            setTimeout(() => {
                                let itemtxtRecvQty = document.getElementById('txtRecvQty' + this.lstRecvIutItems[i].ITEM_ID)
                                if (itemtxtRecvQty != null) {
                                    itemtxtRecvQty.focus();
                                }
                            }, 2);
                            return;
                        }
                    }

                    if (this.lstRecvIutItems[i].CARRIER_ID != null && this.lstRecvIutItems[i].CARRIER_ID != "Select Carrier" &&
                        this.lstRecvIutItems[i].CARRIER_ID != "" && this.lstRecvIutItems[i].CARRIER_ID != undefined) {
                        this.ddlGridCarrier = this.lstRecvIutItems[i].CARRIER_ID;
                    }
                    if (this.lstRecvIutItems[i].BILL_OF_LADING != null &&
                        this.lstRecvIutItems[i].BILL_OF_LADING != "" && this.lstRecvIutItems[i].BILL_OF_LADING != undefined) {
                        this.txtLadg = this.lstRecvIutItems[i].BILL_OF_LADING;
                    }

                    if (this.txtQty != "" && (this.txtLadg == "" || this.ddlGridCarrier == "" || this.ddlGridCarrier == "Select Carrier")) {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Carrier and Lading are mandatory" });
                        setTimeout(() => {
                            let itemtxtRecvQty = document.getElementById('txtLading')
                            if (itemtxtRecvQty != null) {
                                itemtxtRecvQty.focus();
                            }
                        }, 1);
                        return;
                    }
                }

                let drIUTCount = asEnumerable(this.lstRecvIutItems).Where(x => x.QTY != "").ToArray();// poDS.Tables(0).Select("QTY <> '' ");
                if (drIUTCount.length == 0) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter Receive quantity" });
                    return;
                }

                let sTime: Date = new Date();  //System.DateTime
                sTime = new Date(this.gSTime);

                let eTime: Date = new Date(); //System.DateTime.Now
                // IUT Qty Recv End Time
                let transactionId: string = this.gIUTTransactionID;
                let strIUT: string = this.lstRecvIutItems[0].INTERUNIT_ID;
                this.statusCode = await this.sendIUTOrderToServer(transactionId, this.lstRecvIutItems, sTime, eTime);

                if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "IUT: " + strIUT + " received successfully." });
                    this.clearData();
                    this.clearSentDetails();
                    this.minus = false;
                    this.plus = true;
                    this.tbl = false;
                    this.blnGrdRecvIutItems = false;
                }
                else if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to receive the IUT:" + strIUT });
                }
            }
            else {
                if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                    let drowlotitem = asEnumerable(this.lstRecvSendPoLines).Where(x => x.QTY != null && (x.LOT_CONTROLLED == "Y" || x.SERIAL_CONTROLLED == "Y")).ToArray();
                    for (let i = 0; i < this.lstRecvSendPoLines.length; i++) {
                        if (this.lstRecvSendPoLines[i].NO_OF_BOXES != null) {
                            this.txtNoOfBoxes = this.lstRecvSendPoLines[i].NO_OF_BOXES.toString();
                        }
                        this.lnkItemId = this.lstRecvSendPoLines[i].INV_ITEM_ID;
                        if (this.lstRecvSendPoLines[i].QTY != null) {
                            this.txtQty = this.lstRecvSendPoLines[i].QTY.toString();
                        }
                        if (this.lstRecvSendPoLines[i].CARRIER_ID != null && this.lstRecvSendPoLines[i].CARRIER_ID != "Select Carrier" &&
                            this.lstRecvSendPoLines[i].CARRIER_ID != "" && this.lstRecvSendPoLines[i].CARRIER_ID != undefined) {
                            this.ddlGridCarrier = this.lstRecvSendPoLines[i].CARRIER_ID;
                        }
                        if (this.lstRecvSendPoLines[i].BILL_OF_LADING != null &&
                            this.lstRecvSendPoLines[i].BILL_OF_LADING != "" && this.lstRecvSendPoLines[i].BILL_OF_LADING != undefined) {
                            this.txtLadg = this.lstRecvSendPoLines[i].BILL_OF_LADING;
                        }

                        if (this.lstRecvSendPoLines[i].LINE_NBR != null) {
                            this.lnkLineNbr = this.lstRecvSendPoLines[i].LINE_NBR.toString();
                        }

                        if (this.gStrLotSerial == Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.MMIS].toString() &&
                            (drowlotitem.length > 0)) {
                            if (this.lstMainItemLotSerial != null && this.lstMainItemLotSerial.length > 0) {
                                let drSerialLotRows = asEnumerable(this.lstMainItemLotSerial).Where(x => ((x.SERIAL_ID != null && x.SERIAL_ID != "") || (x.LOT_ID != null && x.LOT_ID != "")) && ((x.QTY != null) && parseInt(x.QTY) > 0) && x.DELETE_FLAG == YesNo_Enum[YesNo_Enum.N].toString()).ToArray();

                                if (drSerialLotRows.length == 0) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please capture Lot and/or Serial information before sending to Server" });
                                    return;
                                }
                            }
                            else {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please capture Lot and/or Serial information before sending to Server" });
                                return;
                            }
                        }

                        if (this.txtQty != "" && (this.txtLadg == "" || this.ddlGridCarrier == "" || this.ddlGridCarrier == "Select Carrier") &&
                            (!(this.lstRecvSendPoLines[i].SCHED_COUNT != null && this.lstRecvSendPoLines[i].SCHED_COUNT >= 1))) {//(this.blnlnkItemIdEnable == false || this.blnlnkLineNbrEnable == false)
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Carrier and Lading are mandatory" });

                            setTimeout(() => {
                                let itemtxtRecvQty = document.getElementById('txtLading')
                                if (itemtxtRecvQty != null) {
                                    itemtxtRecvQty.focus();
                                }
                            }, 1);
                            return;
                        }
                        else if (this.gInvoiceMthdCode == this.ERS_TYPE && this.txtInvoice == "") {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter the Invoice#" });

                            setTimeout(() => {
                                let itemtxtRecvQty = document.getElementById('txtInvoice')
                                if (itemtxtRecvQty != null) {
                                    itemtxtRecvQty.focus();
                                }
                            }, 1);
                            return;
                        }
                        else {
                            for (let i = 0; i < this.lstRecvSendPoLines.length; i++) {
                                if (this.lstRecvSendPoLines[i].LINE_NBR == parseInt(this.lnkLineNbr)) {
                                    if (this.lstRecvSendPoLines[i].SCHED_COUNT != null && this.lstRecvSendPoLines[i].SCHED_COUNT == 1) {//this.blnlnkItemIdEnable == false || this.blnlnkLineNbrEnable == false
                                        if (this.txtNoOfBoxes != null && this.txtNoOfBoxes != "") {
                                            this.lstRecvSendPoLines[i].NO_OF_BOXES = parseInt(this.txtNoOfBoxes);
                                        }
                                        else {
                                            if (this.lstRecvSendPoLines[i].NO_OF_BOXES != null) {

                                            }
                                            else {
                                                this.lstRecvSendPoLines[i].NO_OF_BOXES = 1;
                                            }
                                        }

                                        this.lstRecvSendPoLines[i].BILL_OF_LADING = this.txtLadg;
                                        if (this.lstRecvSendPoLines[i].QTY == null) {
                                            this.lstRecvSendPoLines[i].RECEIVED_FLAG = YesNo_Enum[YesNo_Enum.Y].toString();
                                        }
                                    }
                                }
                            }
                        }
                    }
                    let drNonStockCount = asEnumerable(this.lstRecvSendPoLines).Where(x => x.QTY != null && x.RECEIVED_FLAG == YesNo_Enum[YesNo_Enum.Y].toString() && x.INVENTORY_ITEM == YesNo_Enum[YesNo_Enum.N].toString()).ToArray();
                    this.nonStockCount = drNonStockCount.length;
                    //Get the No. of Stock Items in the PO
                    let drStockCount = asEnumerable(this.lstRecvSendPoLines).Where(x => x.QTY != null && x.RECEIVED_FLAG == YesNo_Enum[YesNo_Enum.Y].toString() && x.INVENTORY_ITEM == YesNo_Enum[YesNo_Enum.Y].toString()).ToArray();
                    this.stockCount = drStockCount.length;
                    if (this.nonStockCount == 0 && this.stockCount == 0) {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter Receive quantity" });
                        return;
                    }

                    let transactionId: number = this.lstRecvSendPoHdrs[0].TRANSACTION_ID;
                    let transCode: string = this.lstRecvSendPoHdrs[0].TRANSACTION_CODE;
                    let tempPoId: string = this.lstRecvSendPoHdrs[0].PO_ID;

                    let sTime: Date = new Date();// default(System.DateTime);
                    // PO Qty Recv Start Time
                    let dateStr = new Date(new Date()).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                    if (this.gSTime != "") {
                        this.gSTime = dateStr.replace(',', '');
                    }
                    // PO Qty Recv End Time
                    this.spnrService.start();
                    this.statusCode = await this.sendToServer(transactionId, transCode, tempPoId, this.gSTime, dateStr.replace(',', ''));
                    this.spnrService.stop();
                    if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "PO: " + tempPoId + " received successfully." });
                        this.clearData();
                        this.clearSentDetails();
                        this.plus = true;
                        this.minus = false;
                        this.tbl = false;
                        this.blnGrdRecvPoItems = false;
                    }
                    //else if (this.statusCode == AtparStatusCodes.RECV_ERP_EMPLOYEEID) {
                    //    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Corresponding ERP User ID /Employee ID is not found in Oracle Applications" });
                    //} else if (this.statusCode == AtparStatusCodes.RECV_S_RECEIPTALREADYUPDATED) {
                    //    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Receipt status not in " + this.gASNReceiptStatus });
                    //} else if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                    //    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Failed to receive the PO:" + tempPoId });
                    //}
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnSend_Click");
        }
    }

    async btnPrntHed_Click(event) {
        try {
            this.statusMsgs = [];
            let blnstockhdr: boolean = false;
            let blnNonstkhdr: boolean = false;
            let blnNonStockHed: boolean = false;
            let blnStockHed: boolean = false;
            let blnmsgdisplayed: boolean = false;
            let intNoOfBoxses: number = 0;

            let drowRecStatus = asEnumerable(this.lstRecvSendPoLines).Where(x => x.QTY != null && x.RECEIVED_FLAG == YesNo_Enum[YesNo_Enum.Y].toString()).ToArray();
            let drowRecNonStockStatus = asEnumerable(this.lstRecvSendPoLines).Where(x => x.QTY != null && x.RECEIVED_FLAG == YesNo_Enum[YesNo_Enum.Y].toString() && x.INVENTORY_ITEM == YesNo_Enum[YesNo_Enum.N].toString()).ToArray();
            let drowRecStockStatus = asEnumerable(this.lstRecvSendPoLines).Where(x => x.QTY != null && x.RECEIVED_FLAG == YesNo_Enum[YesNo_Enum.Y].toString() && x.INVENTORY_ITEM == YesNo_Enum[YesNo_Enum.Y].toString()).ToArray();

            if (this.gStrRecDelprintoption == Shiping_Label_PrinterType.Both_MobilePrinter_StationaryPrinter.toString() ||
                this.gStrRecDelprintoption == Shiping_Label_PrinterType.HeaderLbl_MobilePrinter.toString()) {
                if (drowRecStatus.length == 0) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "PO is in download status, please receive it to print the labels." });
                    return;
                }

                //if (poDS.Tables.Count > 0) {
                if (this.txtPkgs != "") {
                    intNoOfBoxses = parseInt(this.txtPkgs);
                }
                else {
                    intNoOfBoxses = 1;
                }

                if (this.lstSetUpProPrinters != null && this.lstSetUpProPrinters.length > 0) {
                    if (this.lstSetUpProPrinters.length > 0) {
                        if (this.gStrSelPrinter == YesNo_Enum[YesNo_Enum.Y].toString()) {
                            let drowPrnterDet = asEnumerable(this.lstSetUpProPrinters).Where(x => x.LABEL_DESCRIPTION == "NonStock PO Header").ToArray();//LABEL_DESCRIPTION='NonStock PO Header'

                            if (drowRecNonStockStatus != null && drowRecNonStockStatus.length > 0) {
                                if (drowPrnterDet != null && drowPrnterDet.length > 0) {
                                    await this.showModalPopup(drowPrnterDet);
                                }
                                else {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Printer Not Configured for the Functionality NonStock PO Header" });
                                    blnmsgdisplayed = true;
                                }
                            }
                            else if (drowRecStockStatus != null && drowRecStockStatus.length > 0) {
                                if (this.gPrintStockHeader != null) {
                                    if (this.gPrintStockHeader == YesNo_Enum[YesNo_Enum.Y].toString()) {
                                        drowPrnterDet = asEnumerable(this.lstSetUpProPrinters).Where(x => x.LABEL_DESCRIPTION == "Stock PO Header").ToArray();//LABEL_DESCRIPTION='Stock PO Header'
                                        if (drowPrnterDet != null && drowPrnterDet.length > 0) {
                                            await this.showModalPopup(drowPrnterDet);
                                        }
                                        else {
                                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Printer Not Configured for the Functionality Stock PO Header" });
                                            blnmsgdisplayed = true;
                                        }
                                    }
                                }
                            }

                        }
                        else if (this.gStrDefPrinter != "") {
                            let drowPrnterDet = asEnumerable(this.lstSetUpProPrinters).Where(x => x.FRIENDLY_NAME == this.gStrDefPrinter).ToArray();
                            if (drowPrnterDet.length > 0) {
                                if (drowRecNonStockStatus != null && drowRecNonStockStatus.length > 0) {
                                    if (drowPrnterDet[0].LABEL_DESCRIPTION == "NonStock PO Header") {//LABEL_DESCRIPTION Check Once
                                        blnNonStockHed = true;
                                        this.statusCode = await this.print_NonStockLabel(intNoOfBoxses, this.lstSetUpProPrinters, this.gStrDefPrinter);
                                        if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to Print Non Stock Label " });
                                            blnmsgdisplayed = true;
                                        }
                                    } else {
                                        blnmsgdisplayed = true;
                                    }
                                }

                                if (drowRecStockStatus != null && drowRecStockStatus.length > 0) {
                                    if (drowPrnterDet[0].LABEL_DESCRIPTION == "Stock PO Header") {//"LABEL_DESCRIPTION")  Check once
                                        blnStockHed = true;
                                        if (this.gPrintStockHeader != null) {
                                            if (this.gPrintStockHeader == YesNo_Enum[YesNo_Enum.Y].toString()) {
                                                this.statusCode = await this.print_StockLabel(intNoOfBoxses, this.lstSetUpProPrinters, this.gStrDefPrinter);
                                                if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                                                    this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to Print Stock Label " });
                                                    blnmsgdisplayed = true;
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        blnmsgdisplayed = true;
                                    }
                                }
                            }
                        }
                        else {
                            blnmsgdisplayed = true;
                        }
                    }
                    else {
                        blnmsgdisplayed = true;
                    }
                }

                if (drowRecNonStockStatus.length == 0) {
                    if (!(blnmsgdisplayed)) {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No NonStock Items to Print" });
                    }
                }
                else if (drowRecStockStatus.length == 0) {
                    if (!(blnmsgdisplayed)) {
                        this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Warn, detail: "No Stock Items to Print" });
                    }
                }
                else {
                    // lblErrorCode.Text = string.Empty;
                }
            }

            if (this.gStrRecDelprintoption == Shiping_Label_PrinterType.DeliveryTic_StationaryPrinter.toString() ||
                this.gStrRecDelprintoption == Shiping_Label_PrinterType.Both_MobilePrinter_StationaryPrinter.toString()) {
                this.statusCode = await this.prepareStationaryPrinting(YesNo_Enum[YesNo_Enum.N].toString(), blnNonstkhdr);

                if (this.statusCode == AtparStatusCodes.ATPAR_E_NOPRINTADDRESS) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please provide printer address for stationary printer" });
                    return;
                }
                else if (this.statusCode == AtparStatusCodes.ATPAR_E_NOTVALIDPRINTER) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please provide printer address for stationary printerPlease provide valid printer address for stationary printer" });
                    return;
                }
                else if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Failed to Print Non Stock Stationary Print" });
                    return;
                }
                else if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                    blnNonstkhdr = this.blnPrinted;
                }
                if (this.gPrintStockHeader != null) {
                    if (this.gPrintStockHeader == YesNo_Enum[YesNo_Enum.Y].toString()) {
                        this.statusCode = await this.prepareStationaryPrinting(YesNo_Enum[YesNo_Enum.Y].toString(), blnstockhdr);
                        if (this.statusCode == AtparStatusCodes.ATPAR_E_NOPRINTADDRESS) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please provide printer address for stationary printer" });
                            return;
                        } else if (this.statusCode == AtparStatusCodes.ATPAR_E_NOTVALIDPRINTER) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please provide valid printer address for stationary printer" });
                            return;
                        } else if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to Print Stock Stationary Print" });
                            return;
                        }
                    } else {
                        blnstockhdr = true;
                    }
                } else {
                    blnstockhdr = true;
                }
                if (blnstockhdr == false && blnNonstkhdr == false) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "PO in Downloaded status,please receive it to print" });
                    return;
                }

                if (blnNonstkhdr == false) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No NonStock Items to Print" });
                    return;
                } else if (this.gPrintStockHeader == YesNo_Enum[YesNo_Enum.Y].toString() && blnstockhdr == false) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Stock Items to Print" });
                    return;
                } else {
                    // lblErrorCode.Text = string.Empty;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnPrntHed_Click");
        }
    }

    async btnPrntDet_Click(event) {
        try {
            this.statusMsgs = [];
            this.statusCode = -1;
            let intNoOfBoxses: number = 1;
            let itemType: string = null;
            let blnlblPrinted: boolean = false;

            if (this.lstSetUpProPrinters != null) {
                if (this.lstSetUpProPrinters.length > 0) {
                    if (this.lstRecvSendPoLines.length > 0) {
                        if (this.txtPkgs != "") {
                            intNoOfBoxses = parseInt(this.txtPkgs);
                        }
                        else {
                            intNoOfBoxses = 1;
                        }
                        if (this.hdnItemType == YesNo_Enum[YesNo_Enum.Y].toString()) {
                            itemType = "Stock Item";
                        }
                        else {
                            itemType = "NonStock Item";
                        }

                        if (this.gStrSelPrinter == YesNo_Enum[YesNo_Enum.Y].toString()) {
                            let drowPrnterDet = asEnumerable(this.lstSetUpProPrinters).Where(x => x.LABEL_DESCRIPTION == itemType).ToArray();//("LABEL_DESCRIPTION='" + itemType + "'");
                            if (drowPrnterDet.length > 0) {
                                await this.showModalPopup(drowPrnterDet);
                                return;
                            }
                            else {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Printer Not Configured for the Functionality " + itemType });
                            }
                        }
                        else if (this.gStrDefPrinter != "") {
                            let drowPrnterDet = asEnumerable(this.lstSetUpProPrinters).Where(x => x.FRIENDLY_NAME == this.gStrDefPrinter).ToArray();
                            if (drowPrnterDet.length > 0) {
                                if (drowPrnterDet[0].LABEL_DESCRIPTION == itemType) {//LABEL_DESCRIPTION Check Once
                                    blnlblPrinted = true;
                                    this.statusCode = await this.printReceiveItemLabel(intNoOfBoxses, this.lstSetUpProPrinters, this.gStrDefPrinter);
                                    if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                                        this.statusMsgs.push({
                                            severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Failed to Print Non Stock Label  "
                                        });
                                    }
                                }
                                else {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Printer Not Configured for the Functionality " + itemType });
                                }
                            }
                        }
                        else {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please setup Default Printer settings for the labels." });
                        }
                    }
                    else {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Items data to Print" });
                    }
                }
                else {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Configure Label Printers before Printing" });
                }
            }
            else {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Configure Label Printers before Printing  " });
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnPrntDet_Click");
        }
    }

    async btnDetailPrint_Click() {
        try {
            this.statusMsgs = [];
            this.spnrService.start();
            let printerName: string = "";
            let labeldesc: string = "";
            let statusCode: string = "";
            let intNoOfBoxses: number = 0;
            if (this.txtPkgs != "" && this.txtPkgs != undefined) {
                intNoOfBoxses = parseInt(this.txtPkgs);
            } else {
                intNoOfBoxses = 1;
            }
            for (let i = 0; i < this.lstPrintersDetails.length; i++) {
                printerName = this.lstPrintersDetails[i].FRIENDLY_NAME;
                labeldesc = this.lstPrintersDetails[i].LABEL_DESCRIPTION;

                if (labeldesc == "NonStock PO Header") {
                    this.statusCode = await this.print_NonStockLabel(intNoOfBoxses, this.lstPrintersDetails, this.gStrDefPrinter);
                }
                else if (labeldesc == "Stock PO Header") {
                    this.statusCode = await this.print_StockLabel(intNoOfBoxses, this.lstPrintersDetails, printerName);
                }
                else if (labeldesc == "Stock Item" || labeldesc == "NonStock Item") {
                    this.statusCode = await this.printReceiveItemLabel(intNoOfBoxses, this.lstPrintersDetails, printerName);
                }
                else if (labeldesc == "NonPO") {
                    this.statusCode = await this.printNonPONiceLabel(intNoOfBoxses, this.lstPrintersDetails, printerName);
                    if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.printtbl = false;
                        if (this.presentScreen == "NONPO") {
                            await this.getinitialvalues();
                            this.nonPO = true;
                        }
                    }
                }
            }
            this.spnrService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnDetailPrint_Click");
        }
    }

    async grdRbPrinterChanged(printerRowData, event) {
        try {
        }
        catch (ex) {
            this.clientErrorMsg(ex, "grdRbPrinterChanged");
        }
    }

    async grdRdbtnChanged(event) {
        try {

            this.statusMsgs = [];
            this.statusCode = -1;

            //  let parameterLst = this.lstRecvSendPoLines[0];
            if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                if (event == null) {
                    if (this.lstRecvSendPoLines.length == 1) {
                        this.selecstedRow = this.lstRecvSendPoLines[0];

                    } else { return; }

                } else {
                    this.selecstedRow = this.lstRecvSendPoLines.filter(x => x.INV_ITEM_ID == event)[0];
                }

            } else if (this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0) {
                if (event == null) {
                    if (this.lstRecvIutItems.length == 1) {
                        this.selecstedRow = this.lstRecvIutItems[0];
                    } else { return; }

                } else {
                    let selectRow = this.lstRecvIutItems.filter(x => x.ITEM_ID == event);
                    if (selectRow != null && selectRow.length > 0) {
                        this.selecstedRow = selectRow[0];
                    }
                }
            }

            this.txtPkgs = "1";
            let rbtn: string = "";
            if (this.schPO == false) {
                rbtn = "ASP.mt_recv_po_or_nonpo_receipts_aspx";
            }
            else { rbtn = "ASP.mt_recv_Schedule.aspx"; }
            this.spnrService.start();
            await this.poNonPo_RbtnChange(this.selecstedRow, false);
            this.spnrService.stop();
            this.spnrService.start();
            if (this.selecstedRow != null && this.selecstedRow != undefined) {
                await this.updateDs(rbtn, this.selecstedRow);
            }
            this.spnrService.stop();

        }
        catch (ex) {
            this.spnrService.stop();
            this.clientErrorMsg(ex, "grdRdbtnChanged");
        }
    }

    async grdDdlCarrier_Changed(nonporec, event) {
        try {
            this.statusMsgs = [];
            if (nonporec.RBFlAG) {
                if (nonporec.CARRIER_ID == 'Select Carrier' || nonporec.CARRIER_ID == "") {
                    if (nonporec.PRVCARRIER_ID != null && nonporec.PRVCARRIER_ID != "") {
                        setTimeout(() => {
                            nonporec.CARRIER_ID = nonporec.PRVCARRIER_ID;
                            let itemtxtRecvQty = document.getElementById('txtRecvQty' + nonporec.INV_ITEM_ID)
                            if (itemtxtRecvQty != null) {
                                itemtxtRecvQty.focus();
                            }
                        }, 1);
                    }
                }
                else {
                    this.selectedDdlCarrier = nonporec.CARRIER_ID;
                }
            }
            if (nonporec.CARRIER_ID != 'Select Carrier' && nonporec.CARRIER_ID != "") {
                nonporec.PRVCARRIER_ID = nonporec.CARRIER_ID;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "grdDdlCarrier_Changed");
        }
    }

    iutGrdDdlCarrier_Changed(nonporec, event) {
        try {
            this.statusMsgs = [];
            if (nonporec.RBFlAG) {
                if (nonporec.CARRIER_ID == 'Select Carrier' || nonporec.CARRIER_ID == "") {
                    if (nonporec.PRVCARRIER_ID != null && nonporec.PRVCARRIER_ID != "") {
                        setTimeout(() => {
                            nonporec.CARRIER_ID = nonporec.PRVCARRIER_ID;
                            let itemtxtRecvQty = document.getElementById('txtRecvQty' + nonporec.ITEM_ID)
                            if (itemtxtRecvQty != null) {
                                itemtxtRecvQty.focus();
                            }
                        }, 1);
                    }
                }
                else {
                    this.selectedDdlCarrier = nonporec.CARRIER_ID;
                }
            }
            if (nonporec.CARRIER_ID != 'Select Carrier' && nonporec.CARRIER_ID != "") {
                nonporec.PRVCARRIER_ID = nonporec.CARRIER_ID;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "iutGrdDdlCarrier_Changed");
        }
    }

    schdGrdDdlCarrier_Changed(nonporec, event) {
        try {
            this.statusMsgs = [];
            if (nonporec.RBFlAG) {
                if (nonporec.CARRIER_ID == 'Select Carrier' || nonporec.CARRIER_ID == "") {
                    if (nonporec.PRVCARRIER_ID != null && nonporec.PRVCARRIER_ID != "") {
                        setTimeout(() => {
                            nonporec.CARRIER_ID = nonporec.PRVCARRIER_ID;
                            let itemtxtRecvQty = document.getElementById('txtRecvQty' + nonporec.INV_ITEM_ID)
                            if (itemtxtRecvQty != null) {
                                itemtxtRecvQty.focus();
                            }
                        }, 1);
                    }
                }
                else {
                    this.selectedSchdDdlCarrier = nonporec.CARRIER_ID;
                }
            }
            if (nonporec.CARRIER_ID != 'Select Carrier' && nonporec.CARRIER_ID != "") {
                nonporec.PRVCARRIER_ID = nonporec.CARRIER_ID;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "grdDdlCarrier_Changed");
        }
    }

    async grdddlUOM_Changed(nonporec, event) {
        try {
            this.statusMsgs = [];
            let uom: any = "";
            if (event.label != null && event.label != undefined) {
                uom = event.label.split('(');
            }
            if (uom != null) {
                nonporec.UNIT_OF_MEASURE = uom[0].trim();
                nonporec.SELECTEDUOM = event.label;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "grdddlUOM_Changed");
        }
    }

    async btnPoSearch_Click(event) {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'PO Search';
            this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.statusMsgs = [];
            let bunit: string = "";
            let reqShipToId: string = this.hdnReqShiptoId;
            let ship: string = this.selectedShipToId;

            if (this.selectedBUnits == "Select BusinessUnit" || this.selectedBUnits == "") {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                return;
            }
            else {
                bunit = this.selectedBUnits;
            }
            if (reqShipToId == YesNo_Enum[YesNo_Enum.Y].toString()) {
                if (ship != null) {
                    if (this.selectedShipToId == "Select ShipToID") {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ShipTo ID is mandatory to download the PO" });
                        return;
                    }
                }
                if (this.txtShipId != null && this.txtShipId != undefined) {
                    if (this.txtShipId == "") {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ShipTo ID is mandatory to download the PO" });
                        return;
                    }
                }
            }

            bunit = this.selectedBUnits;
            let frmDate = this.txtFrmDate;
            let toDate = this.txtToDate;
            if (frmDate == "" || frmDate == null || frmDate == undefined) {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select From date" });
                return;
            }

            if (toDate == "" || toDate == null || toDate == undefined) {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select To date" });
                return;
            }

            // to validate PO downloaded            
            if (this.hdnBunit == bunit && this.hdnPO == this.txtPONumber) {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "This PO/IUT is in Download status" });
                return;
            }
            else if (this.hdnBunit != "") {
                this.hdnPoSearch = YesNo_Enum[YesNo_Enum.Y].toString();
                await this.confirmData("posearch");
            }
            else {
                await this.showPoSearchPopup();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnPoSearch_Click");
        }
    }

    async btnIutSearch_Click(event) {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'IUT Search';
            this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.statusMsgs = [];
            let bunit: string = "";
            if (this.selectedBUnits == "Select BusinessUnit" || this.selectedBUnits == "") {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                return;
            }
            else {
                bunit = this.selectedBUnits;
            }
            bunit = this.selectedBUnits;
            let frmDate = this.txtFrmDate;
            let toDate = this.txtToDate;
            if (frmDate == "" || frmDate == null || frmDate == undefined) {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select From date" });
                return;
            }

            if (toDate == "" || toDate == null || toDate == undefined) {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select To date" });
                return;
            }
            // to validate IUT downloaded         
            if (this.hdnBunit == bunit && this.hdnIUT == this.txtIUT) {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "This PO/IUT is in Download status" });
                return;
            }
            else if (this.hdnBunit != "") {// && this.hdnIUT == "IUT"
                this.hdnPoSearch = YesNo_Enum[YesNo_Enum.Y].toString();
                await this.confirmIUT("IUTsearch");
            }
            else {
                await this.showIUTSearchPopup();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnIutSearch_Click");
        }
    }

    async grdPoSearchRdbtnChanged(paramLst: VM_RECV_SEARCHHEADER, event) {
        try {
            this.statusMsgs = [];
            if (paramLst.RBFlAG == "true") {
                paramLst.RBFlAG = "false";
            } else {
                paramLst.RBFlAG = "true";
            }
        }
        catch (ex) {
            this.spnrService.stop();
            this.clientErrorMsg(ex, "grdPoSearchRdbtnChanged");
        }
    }

    async btnSearchPosGet_Click(event) {
        try {
            this.statusMsgs = [];
            this.arrlstPOSearch = [];
            this.txtIUT = "";
            let searchLst = asEnumerable(this.lstSeachItems).Where(x => x.RBFlAG.toString() == "true").ToArray();
            if (searchLst != null && searchLst.length > 0) {
                for (let i = 0; i < searchLst.length; i++) {
                    let arrlstPOSearchEntity = new VM_RECV_SEARCHHEADER();
                    this.txtPONumber = searchLst[i].POID;
                    arrlstPOSearchEntity.BUSINESS_UNIT = searchLst[i].BUSINESS_UNIT;
                    arrlstPOSearchEntity.POID = searchLst[i].POID;
                    arrlstPOSearchEntity.PODT = searchLst[i].PODT;
                    arrlstPOSearchEntity.SHPTID = searchLst[i].SHPTID;
                    arrlstPOSearchEntity.VNDRID = searchLst[i].VNDRID;
                    arrlstPOSearchEntity.RECVID = searchLst[i].RECVID;
                    arrlstPOSearchEntity.ITEM_ID = searchLst[i].ITEM_ID;
                    arrlstPOSearchEntity.RBFlAG = searchLst[i].RBFlAG;
                    this.arrlstPOSearch.push(arrlstPOSearchEntity);
                }
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Click the Go Back button to show the items grid." });
                this.page = false;
                this.tbl = false;
                this.purchase = false;
            }
            else {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select the PO ID." });
                return;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnSearchPosGet_Click");
        }
    }

    async searchPoBack() {
        try {
            this.statusMsgs = [];
            this.presentScreen = "PO";
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            if (this.arrlstPOSearch != null && this.arrlstPOSearch.length > 0) {
                await this.page_Load();
                this.recvSearchPos = false;
                this.recvIUTSearch = false;
                this.purchase = false;
                this.page = true;
                this.tbl = true;
                this.blnGrdRecvPoItems = true;
                this.blnGrdRecvIutItems = false;
                this.grdRecvSearchPos = false;
            }
            else {
                this.recvSearchPos = false;
                this.recvIUTSearch = false;
                this.purchase = false;
                this.page = true;
                this.grdRecvSearchPos = false;
                if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                    this.tbl = true;
                    this.blnGrdRecvPoItems = true;
                    this.blnGrdRecvIutItems = false;
                }
            }
            this.plus = true;
            this.minus = false;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "searchPoBack");
        }
    }

    async grdrecvIUTDataRdbtnChanged(paramLst: VM_IUT_SEARCHHEADER, event) {
        try {
            this.statusMsgs = [];
            if (paramLst.RBFlAG == "true") {
                paramLst.RBFlAG = "false";
            }
            else {
                paramLst.RBFlAG = "true";
            }
        }
        catch (ex) {
            this.spnrService.stop();
            this.clientErrorMsg(ex, "grdrecvIUTDataRdbtnChanged");
        }
    }

    async btnSearchIUTGet_Click(event) {
        try {
            this.statusMsgs = [];
            this.arrlstIUTSearch = [];
            this.txtPONumber = "";
            let searchLst = asEnumerable(this.lstRecvSearchIuts).Where(x => x.RBFlAG.toString() == "true").ToArray();
            if (searchLst != null && searchLst.length > 0) {
                for (let i = 0; i < searchLst.length; i++) {
                    let arrlstIUTSearchEntity = new VM_IUT_SEARCHHEADER();
                    this.txtIUT = searchLst[i].INTERUNIT_ID;
                    arrlstIUTSearchEntity.DESTIN_BU = searchLst[i].DESTIN_BU;
                    arrlstIUTSearchEntity.INTERUNIT_ID = searchLst[i].INTERUNIT_ID;
                    arrlstIUTSearchEntity.ORIG_BU = searchLst[i].ORIG_BU;
                    arrlstIUTSearchEntity.SHIP_DTTM = searchLst[i].SHIP_DTTM;
                    arrlstIUTSearchEntity.RBFlAG = searchLst[i].RBFlAG;
                    this.arrlstIUTSearch.push(arrlstIUTSearchEntity);
                }
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Close the popup to show the items grid." });
                this.recvSearchPos = false;
                this.page = false;
                this.tbl = false;
                this.purchase = false;
            }
            else {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select the PO ID." });
                return;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnSearchIUTGet_Click");
        }
    }

    async iutSearchPoBack() {
        try {
            this.statusMsgs = [];
            this.presentScreen = "PO";
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            if (this.arrlstIUTSearch != null && this.arrlstIUTSearch.length > 0) {
                await this.page_Load();
                this.recvSearchPos = false;
                this.recvIUTSearch = false;
                this.purchase = false;
                this.blnGrdRecvPoItems = false;
                this.page = true;
                this.tbl = true;
                this.blnGrdRecvIutItems = true;
            }
            else {
                this.recvSearchPos = false;
                this.recvIUTSearch = false;
                this.purchase = false;
                this.page = true;
                if (this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0) {
                    this.blnGrdRecvPoItems = false;
                    this.blnGrdRecvIutItems = true;
                    this.tbl = true;
                }
            }
            this.plus = true;
            this.minus = false;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "iutSearchPoBack");
        }
    }

    async btnTxtSerchItemId_Click() {
        try {
            let lstRecords = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.endIndex = + sessionStorage.getItem("RecordsEndindex");
            let lstMainRecords = [];
            if (this.lstRecvSendPoLines != null || this.lstRecvSendPoLines != undefined && this.lstRecvSendPoLines.length > 0) {
                lstMainRecords = this.lstRecvSendPoLines;
            }
            else if (this.lstRecvIutItems != null || this.lstRecvIutItems != undefined && this.lstRecvIutItems.length > 0) {
                lstMainRecords = this.lstRecvIutItems;
            }

            if (lstMainRecords != null || lstMainRecords.length > 0) {
                if (this.endIndex > lstMainRecords.length) {
                    this.endIndex = lstMainRecords.length;
                }
                for (let i = this.startIndex; i <= this.endIndex - 1; i++) {
                    lstRecords.push(lstMainRecords[i]);
                }
            }

            if (this.txtSerchItemId != "" && lstRecords != null && lstRecords.length > 0) {
                let filterItem = lstRecords.filter(x => x.INV_ITEM_ID == this.txtSerchItemId);
                if (filterItem != null && filterItem.length > 0) {
                    this.selecstedRow = filterItem[0];
                    this.selectedINVITEMID = this.selecstedRow.INV_ITEM_ID;
                    this.poNonPo_RbtnChange(this.selecstedRow, true);
                }
                else {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.txtSerchItemId + ": ItemId not found" });
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnTxtSerchItemId_Click");
        }
    }

    btnTxtPreSerchItemId_Click() {
        try {
            let lstRecords = [];
            this.statusMsgs = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.endIndex = + sessionStorage.getItem("RecordsEndindex");

            let lstMainRecords = [];
            if (this.lstRecvSendPoLines != null || this.lstRecvSendPoLines != undefined && this.lstRecvSendPoLines.length > 0) {
                lstMainRecords = this.lstRecvSendPoLines;
            }
            else if (this.lstRecvIutItems != null || this.lstRecvIutItems != undefined && this.lstRecvIutItems.length > 0) {
                lstMainRecords = this.lstRecvIutItems;
            }

            if (lstMainRecords != null || lstMainRecords.length > 0) {
                if (this.endIndex > lstMainRecords.length) {
                    this.endIndex = lstMainRecords.length;
                }
                for (let i = this.startIndex; i <= this.endIndex - 1; i++) {
                    lstRecords.push(lstMainRecords[i]);
                }
            }

            if (this.selecstedRow != null && lstRecords != null) {
                let index = lstRecords.indexOf(this.selecstedRow);
                if (index <= 0) {
                    this.confirmationService.confirm({
                        message: 'This is the first item, would you like to continue from the last item?',
                        accept: () => {
                            this.selecstedRow = lstRecords[lstRecords.length - 1];
                            this.selectedINVITEMID = this.selecstedRow.INV_ITEM_ID;
                            this.poNonPo_RbtnChange(this.selecstedRow, true);
                        },
                        reject: () => {
                            return;
                        }
                    });
                }
                else {
                    this.selecstedRow = lstRecords[index - 1];
                    this.selectedINVITEMID = this.selecstedRow.INV_ITEM_ID;
                    this.poNonPo_RbtnChange(this.selecstedRow, true);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnTxtPreSerchItemId_Click");
        }
    }

    btnTxtNextSerchItemId_Click() {
        try {
            let lstRecords = [];
            this.statusMsgs = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.endIndex = + sessionStorage.getItem("RecordsEndindex");

            let lstMainRecords = [];
            if (this.lstRecvSendPoLines != null || this.lstRecvSendPoLines != undefined && this.lstRecvSendPoLines.length > 0) {
                lstMainRecords = this.lstRecvSendPoLines;
            }
            else if (this.lstRecvIutItems != null || this.lstRecvIutItems != undefined && this.lstRecvIutItems.length > 0) {
                lstMainRecords = this.lstRecvIutItems;
            }

            if (lstMainRecords != null || lstMainRecords.length > 0) {
                if (this.endIndex > lstMainRecords.length) {
                    this.endIndex = lstMainRecords.length;
                }
                for (let i = this.startIndex; i <= this.endIndex - 1; i++) {
                    lstRecords.push(lstMainRecords[i]);
                }
            }

            //This is the last item, would you like to continue from the first Item
            if (this.selecstedRow != null && lstRecords != null) {
                let index = lstRecords.indexOf(this.selecstedRow);
                if (index == lstRecords.length - 1) {
                    this.statusMsgs = [];
                    this.confirmationService.confirm({
                        message: 'This is the last item, would you like to continue from the first Item?',
                        accept: () => {
                            this.selecstedRow = lstRecords[0];
                            this.selectedINVITEMID = this.selecstedRow.INV_ITEM_ID;
                            this.poNonPo_RbtnChange(this.selecstedRow, true);
                        },
                        reject: () => {
                            return;
                        }
                    });
                }
                else {
                    this.selecstedRow = lstRecords[index + 1];
                    this.selectedINVITEMID = this.selecstedRow.INV_ITEM_ID;
                    this.poNonPo_RbtnChange(this.selecstedRow, true);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnTxtNextSerchItemId_Click");
        }
    }

    searchAutoCompleteItems(event) {
        let query = event.query;
        this.lstFilterItems = this.filterNames(query, this.lstRecvSendPoLines)
    }

    filterNames(query, itemNames: any[]): any[] {
        this.statusMsgs = [];
        if (itemNames != null) {
            let filtered : any[] = [];
            if (query == "%") {
                for (let i = 0; i < itemNames.length; i++) {
                    let itemNamesvalue = itemNames[i];
                    filtered.push(itemNamesvalue.INV_ITEM_ID);
                }
            }
            else {
                if (query.length >= 1) {
                    for (let i = 0; i < itemNames.length; i++) {
                        let itemValue = itemNames[i];
                        if (itemValue.INV_ITEM_ID.toString().toUpperCase().indexOf(query.toString().toUpperCase()) == 0) {
                            filtered.push(itemValue.INV_ITEM_ID);
                        }
                    }
                }
            }
            return filtered;
        }
    }

    async asnGrdRdbtnChanged(event) {
        try {
            //if (asnPoData != null) {asnPoData
            //    this.gStrReceiverId = asnPoData.RECEIVERID;
            //    this.selectedRecvId = asnPoData.RECEIVERID;
            //}
            if (event == null) {
                if (this.lstAsnDetails.length == 1) {
                    this.gStrReceiverId = this.lstAsnDetails[0].RECEIVERID;
                    this.selectedRecvId = this.lstAsnDetails[0].RECEIVERID;

                } else { return; }
                return;
            } else {
                this.gStrReceiverId = event;
                this.selectedRecvId = event;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "asnGrdRdbtnChanged");
        }
    }

    async btnAsnGet_Click() {
        try {
            this.statusMsgs = [];
            this.spnrService.start();
            let lstcheckedrcds = this.lstAsnDetails.filter(x => x.ASNRBFLAG == true);
            if (this.gStrReceiverId != null && this.gStrReceiverId != "") {
                this.gblnCancel = false;
                this.tbl = false;
                this.recvSearchPos = false;
                this.recvIUTSearch = false;
                await this.bindDataGrid();
                if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                    this.tbl = false;
                }
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Success, Click the Go Back button to show the items grid." });
            }
            else {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select a ReceiverID" });
            }
            this.spnrService.stop();
        }
        catch (ex) {
            this.spnrService.stop();
            this.clientErrorMsg(ex, "btnAsnGet_Click");
        }
    }

    async btnAsnCancel_Click() {
        try {
            this.statusMsgs = [];
            this.gblnCancel = true;
            this.gStrReceiverId = "";
            if (this.lstAsnDetails != null && this.lstAsnDetails.length > 0) {
                for (let i = 0; i < this.lstAsnDetails.length; i++) {
                    this.lstAsnDetails[i].ASNRBFLAG = false;
                }
            }
            this.selectedRecvId = "";
            this.lstRecvSendPoLines = [];
            this.tbl = false;
            this.selectedReceiverId = "";
            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Request Cancelled, Click the Go Back button." });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnAsnCancel_Click");
        }
    }

    async btnAsnGetBack_Click() {
        try {
            this.statusMsgs = [];
            this.presentScreen = "PO";
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.selectedReceiverId = "";
            this.purchase = false;
            this.page = true;
            if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                this.tbl = true;
            }
            this.lblReceiverId = this.selectedRecvId;
            this.recvSearchPos = false;
            this.recvIUTSearch = false;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnAsnGetBack_Click");
        }
    }

    async includeAllPoLinesChkChanged(event) {
        try {
            this.statusMsgs = [];
            if (event != null && event != undefined) {
                this.chkIncludeAllPOLines = event;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "includeAllPoLinesChkChanged");
        }
    }

    async getReceivePrerequisites(): Promise<number> {
        try {
            this.statusMsgs = [];
            await this.recvPoNonPoService.getReceivePrerequisites().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<Object>;
                    this.spnrService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstBunits = res.json().DataDictionary.ALLOCATED_BUNITS;
                            this.lstShipToIds = res.json().DataDictionary.ALLOCATED_SHIPTOIDS;
                            this.lstOrgParms = res.json().DataDictionary.ORG_PARAMETERS;
                            this.lstProfileApp = res.json().DataDictionary.PROFILE_PARAMETERS;
                            this.lstUserApp = res.json().DataDictionary.USER_PARAMETERS;
                            this.lstScreenApp = res.json().DataDictionary.SCREEN_DISPLAY;
                            this.lstInventoryBunits = res.json().DataDictionary.ALLOCATED_IUT_BUNITS;
                            this.shipToIdCount = res.json().DataDictionary.DELV_ALLOC_SHIPTOIDS;
                            this.statusCode = data.StatusCode;
                            this.receItemColumns = this.lstScreenApp.filter(x => x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == "RECEIVE ITEMS");
                            this.receItemColumns = asEnumerable(this.receItemColumns).OrderBy(x => x.COLUMN_ORDER).ToArray();
                            for (let x = 0; x < this.receItemColumns.length; x++) {
                                if (this.receItemColumns[x].FIELD_NAME == 'INV_ITEM_ID' ||
                                    this.receItemColumns[x].FIELD_NAME == 'DESCR' ||
                                    this.receItemColumns[x].FIELD_NAME == 'RECEIVED_QTY' ||
                                    this.receItemColumns[x].FIELD_NAME == 'INVENTORY_ITEM' ||
                                    this.receItemColumns[x].FIELD_NAME == 'LOCATION' ||
                                    this.receItemColumns[x].FIELD_NAME == 'SHIPTO_ID' ||
                                    this.receItemColumns[x].FIELD_NAME == 'LINE_NBR' ||
                                    this.receItemColumns[x].FIELD_NAME == 'UPC_ID' ||
                                    this.receItemColumns[x].FIELD_NAME == 'MFG_ITEM_ID' ||
                                    this.receItemColumns[x].FIELD_NAME == 'INSP_FLAG' ||
                                    this.receItemColumns[x].FIELD_NAME == 'CUST_ITEM_NO' ||
                                    this.receItemColumns[x].FIELD_NAME == 'GTIN' ||
                                    this.receItemColumns[x].FIELD_NAME == 'LOT_CONTROLLED' ||
                                    this.receItemColumns[x].FIELD_NAME == 'SERIAL_CONTROLLED' ||
                                    this.receItemColumns[x].FIELD_NAME == 'EXT_TRK_NO') {
                                    this.receItemColumns[x].ISFILTER = true;
                                } else {

                                    this.receItemColumns[x].ISFILTER = false;
                                }
                            }

                            this.receIutItemColumns = this.lstScreenApp.filter(x => x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == "IUT ITEMS");
                            this.receIutItemColumns = asEnumerable(this.receIutItemColumns).OrderBy(x => x.COLUMN_ORDER).ToArray();
                            for (let x = 0; x < this.receIutItemColumns.length; x++) {
                                if (this.receIutItemColumns[x].FIELD_NAME == 'ITEM_ID' ||
                                    this.receIutItemColumns[x].FIELD_NAME == 'CUSTOM_ITEM_NO' ||
                                    this.receIutItemColumns[x].FIELD_NAME == 'DESCRIPTION' ||
                                    this.receIutItemColumns[x].FIELD_NAME == 'LOT_CONTROLLED' ||
                                    this.receIutItemColumns[x].FIELD_NAME == 'SERIAL_CONTROLLED' ||
                                    this.receIutItemColumns[x].FIELD_NAME == 'UPC_ID' ||
                                    this.receIutItemColumns[x].FIELD_NAME == 'MFG_ITEM_ID' ||
                                    this.receIutItemColumns[x].FIELD_NAME == 'CUSTOM_ITEM_NO' ||
                                    this.receIutItemColumns[x].FIELD_NAME == 'VEND_ITEM_ID' ||
                                    this.receIutItemColumns[x].FIELD_NAME == 'STOR_LOC') {
                                    this.receIutItemColumns[x].ISFILTER = true;
                                } else {

                                    this.receIutItemColumns[x].ISFILTER = false;
                                }
                            }


                            this.receSchdlItemColumns = this.lstScreenApp.filter(x => x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == "RECEIVE BY SCHEDULE");
                            this.receSchdlItemColumns = asEnumerable(this.receSchdlItemColumns).OrderBy(x => x.COLUMN_ORDER).ToArray();
                            for (let x = 0; x < this.receSchdlItemColumns.length; x++) {
                                if (this.receSchdlItemColumns[x].FIELD_NAME == 'SCHED_NBR' ||
                                    this.receSchdlItemColumns[x].FIELD_NAME == 'QTY_PO' ||
                                    this.receSchdlItemColumns[x].FIELD_NAME == 'LOCATION' ||
                                    this.receSchdlItemColumns[x].FIELD_NAME == 'TRACKING_ID' ||
                                    this.receSchdlItemColumns[x].FIELD_NAME == 'EXT_TRK_NO' ||
                                    this.receSchdlItemColumns[x].FIELD_NAME == 'RECEIVED_QTY' ||
                                    this.receSchdlItemColumns[x].FIELD_NAME == 'SHIPTO_ID' ||
                                    this.receSchdlItemColumns[x].FIELD_NAME == 'QTY_RECV_TOL_PCT' ||
                                    this.receSchdlItemColumns[x].FIELD_NAME == 'LOC_DESCR') {
                                    this.receSchdlItemColumns[x].ISFILTER = true;
                                } else {

                                    this.receSchdlItemColumns[x].ISFILTER = false;
                                }
                            }



                            break;
                        }
                        case StatusType.Warn: {
                            this.statusCode = data.StatusCode;
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusCode = data.StatusCode;
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusCode = data.StatusCode;
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            let poplateFlg: boolean = await this.populateBusinessUnitDrpdwn(this.lstBunits);
            if (!poplateFlg) {
                return this.statusCode = -1;
            }
            await this.populateShipToIdsDrpdwn(this.lstShipToIds);
            if (this.lstScreenApp == null || this.lstScreenApp.length == 0) {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please provide HHT access to Web profile" });
                this.btnGetEnableDisable = true;
                this.btnPoSearchEnableDisable = true;
                this.btnIUTSearch = false;
                this.btnNonPo = false;
                this.statusCode = -1;
                return this.statusCode;
            }
            else {
                this.btnGetEnableDisable = false;
                this.btnPoSearchEnableDisable = false;
            }
            return this.statusCode;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getReceivePrerequisites");
            return this.statusCode;
        }
    }

    isShowColumn(screeFiled, dispFiled) {
        if (screeFiled == dispFiled) {
            return true;
        } else if (dispFiled == 'ALL') {
            if (this.recnonstaticFields.indexOf(screeFiled) == -1) {
                return true;
            } else {
                return false;
            }

        }
    }

    async bindDataGrid() {
        try {

            this.txtSerchItemId = "";
            this.selectedINVITEMID = "";
            this.selectedDdlCarrier = "Select Carrier";
            this.txtLading = "";
            this.txtPkgs = "";
            this.txtTrk = "";
            this.plus = true;
            this.minus = false;
            if (this.txtIUT != null && this.txtIUT != "") {
                // IUT Get
                await this.iutItemsBind();
            }
            else {
                // Receive Get
                await this.receivePoItemsBind();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindDataGrid");
        }

    }

    async deletePo() {
        try {
            this.statusMsgs = [];
            this.spnrService.start();
            if (this.lstRecvPoItems != null) {
                for (let i = 0; i < this.lstRecvPoItems.length; i++) {
                    this.lstRecvPoItems[i].TRANS_ID = this.gTransactionID;
                }
            }
            await this.recvPoNonPoService.deleteHeader(this.lstRecvPoItems).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<number>;
                    this.statusCode = data.StatusCode;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.spnrService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.spnrService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spnrService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.spnrService.stop();
                            break;
                        }
                    }
                });
            if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                this.clearData();
                this.hdnConfirmPoDelete = YesNo_Enum[YesNo_Enum.N].toString();
                this.hdnConfirmIUTDelete = YesNo_Enum[YesNo_Enum.N].toString();
                if (this.hdnPoSearch == YesNo_Enum[YesNo_Enum.Y].toString()) {
                    this.hdnPoSearch = YesNo_Enum[YesNo_Enum.N].toString();
                } else if (this.hdnIUTSearch == YesNo_Enum[YesNo_Enum.Y].toString()) {
                    this.hdnIUTSearch = YesNo_Enum[YesNo_Enum.N].toString();
                } else if (this.hdnConfirmNonPo == YesNo_Enum[YesNo_Enum.Y].toString()) {
                    this.hdnConfirmNonPo = YesNo_Enum[YesNo_Enum.N].toString();
                }
            }
            else {
                this.bindDataGrid();
                this.populateCarrierDropDown(this.selectedDdlCarrier);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "deletePo");
        }
    }

    async deleteIUTOrder() {
        try {
        }
        catch (ex) {
            this.clientErrorMsg(ex, "deleteIUTOrder");
        }
    }

    async populateCarrierDropDown(carrierId: string) {
        try {
            this.statusCode = -1;
            this.ddlCarrier = [];
            this.grdDdlCarrier = [];
            this.ddlNonPOCarrier = [];
            this.grdDdlCarrier.push({ label: "Select Carrier", value: "Select Carrier" });
            this.ddlCarrier.push({ label: "Select Carrier", value: "Select Carrier" });
            this.ddlNonPOCarrier.push({ label: "Select Carrier", value: "Select Carrier" });
            await this.commonService.getCarriersData().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_RECV_CARRIER>;
                    this.lstCarriersData = data.DataList;
                    this.statusCode = data.StatusCode;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.ddlCarrier = [];
                            this.grdDdlCarrier = [];
                            this.ddlNonPOCarrier = [];
                            if (this.lstCarriersData != null && this.lstCarriersData.length > 0) {
                                this.grdDdlCarrier.push({ label: "Select Carrier", value: "Select Carrier" });
                                this.ddlCarrier.push({ label: "Select Carrier", value: "Select Carrier" });
                                this.ddlNonPOCarrier.push({ label: "Select Carrier", value: "Select Carrier" });
                                if (this.lstCarriersData.length > 0) {
                                    for (var i = 0; i <= this.lstCarriersData.length - 1; i++) {
                                        this.ddlCarrier.push({ label: this.lstCarriersData[i].CARRIER_ID, value: this.lstCarriersData[i].CARRIER_ID });
                                        this.grdDdlCarrier.push({ label: this.lstCarriersData[i].CARRIER_ID, value: this.lstCarriersData[i].CARRIER_ID });
                                        this.ddlNonPOCarrier.push({ label: this.lstCarriersData[i].CARRIER_ID, value: this.lstCarriersData[i].CARRIER_ID });
                                    }
                                }
                            }
                            if (this.lstUserApp != null && this.lstUserApp.length > 0) {
                                this.strDefaultCarrierID = asEnumerable(this.lstUserApp).ToArray()[1].PARAMETER_VALUE;
                                if (this.strDefaultCarrierID != null && this.strDefaultCarrierID != "") {
                                    let lstdefCarriers = this.ddlCarrier.filter(x => x.value == this.strDefaultCarrierID.toUpperCase())
                                    if (lstdefCarriers != null && lstdefCarriers.length > 0) {
                                        this.selectedDdlCarrier = this.strDefaultCarrierID.toUpperCase();
                                        this.selectedSchdDdlCarrier = this.strDefaultCarrierID.toUpperCase();
                                    }
                                    else {
                                        this.grdDdlCarrier.push({ label: this.strDefaultCarrierID.toUpperCase(), value: this.strDefaultCarrierID.toUpperCase() });
                                        this.ddlCarrier.push({ label: this.strDefaultCarrierID.toUpperCase(), value: this.strDefaultCarrierID.toUpperCase() });
                                        this.selectedDdlCarrier = this.strDefaultCarrierID.toUpperCase();
                                        this.selectedSchdDdlCarrier = this.strDefaultCarrierID.toUpperCase();
                                    }
                                    let carrierLst = this.ddlNonPOCarrier.filter(x => x.value == this.strDefaultCarrierID.toUpperCase());
                                    if (carrierLst != null && carrierLst.length == 0) {
                                        this.ddlNonPOCarrier.push({ label: this.strDefaultCarrierID.toUpperCase(), value: this.strDefaultCarrierID.toUpperCase() });
                                    }

                                    if (this.poNewItem != null) {
                                        this.poNewItem.CARRIER_ID = this.strDefaultCarrierID.toUpperCase();
                                    }
                                    if (this.dtScheduleItems != null && this.dtScheduleItems.length > 0) {
                                        for (var i = 0; i < this.dtScheduleItems.length; i++) {
                                            this.dtScheduleItems[i].CARRIER_ID = this.strDefaultCarrierID.toUpperCase();
                                        }
                                    }
                                }
                                this.spnrService.stop();
                                break;
                            }
                        }
                        case StatusType.Warn: {
                            this.spnrService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spnrService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.spnrService.stop();
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateCarrierDropDown");
        }
    }

    async lotScheduleQty() {
        try {
            this.statusMsgs = [];
            this.statusCode = -1;
            if (this.gblnLotSerialFlg == true) {
                if (this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0) {
                    this.postbackGridBind(this.lstRecvIutItems, "IUT ITEMS");
                }
                else {
                    if (this.lstMainItemLotSerial != null) {//lstFinalLotSerial
                        for (let i = 0; i < this.lstRecvSendPoLines.length; i++) {
                            let strItemId: string = this.lstRecvSendPoLines[i].INV_ITEM_ID;
                            let strLineNbr: string = this.lstRecvSendPoLines[i].LINE_NBR.toString();
                            let drLotQty = asEnumerable(this.lstMainItemLotSerial).Where(x => x.ITEM_ID == strItemId).ToArray();
                            if (drLotQty.length > 0) {
                                let drLotEnableQty = asEnumerable(this.lstMainItemLotSerial).Where(x => x.ITEM_ID == strItemId && x.LINE_NBR == strLineNbr &&
                                    (x.SERIAL_ID != "" || x.LOT_ID != "") && x.DELETE_FLAG == YesNo_Enum[YesNo_Enum.N].toString()).ToArray();
                                if (drLotEnableQty.length > 0) {
                                    let intTolRecvQty: number = 0;
                                    for (let i = 0; i < drLotEnableQty.length; i++) {
                                        let strCon_Rate: string = (drLotEnableQty[i].CONVERSION_RATE == "" ? "1" : drLotEnableQty[i].CONVERSION_RATE);
                                        intTolRecvQty = intTolRecvQty + (parseInt(drLotEnableQty[i].QTY) * parseInt(strCon_Rate));
                                    }
                                    this.lstRecvSendPoLines[i].QTY = intTolRecvQty;
                                    //  this.lstRecvSendPoLines[i].LotSerial_Qty = intTolRecvQty;
                                    if (this.lstRecvSendPoLines[i].QTY != null) {
                                        this.lstRecvSendPoLines[i].RECEIVED_FLAG = YesNo_Enum[YesNo_Enum.Y].toString();
                                    }
                                }
                                else {
                                    this.lstRecvSendPoLines[i].QTY = null;
                                    // this.lstRecvSendPoLines[i].LotSerial_Qty = "";
                                    this.lstRecvSendPoLines[i].RECEIVED_FLAG = YesNo_Enum[YesNo_Enum.N].toString();
                                }
                            }
                        }
                    }
                    if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                        await this.postbackGridBind(this.lstRecvSendPoLines, "RECEIVE ITEMS");
                    }
                }
                this.gblnLotSerialFlg = false;
            }

            if (this.gblnScheduleFlg == true) {
                if (this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0) {
                    this.postbackGridBind(this.lstRecvIutItems, "IUT ITEMS");
                }
                else {
                    if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                        for (let i = 0; i < this.lstRecvSendPoLines.length; i++) {
                            let strItemId: string = this.lstRecvSendPoLines[i].INV_ITEM_ID;
                            let strLineNbr: string = this.lstRecvSendPoLines[i].LINE_NBR.toString();
                            let drSchd = asEnumerable(this.lstRecvSendPoLines).Where(x => x.INV_ITEM_ID == strItemId && x.LINE_NBR == parseInt(strLineNbr) &&
                                x.QTY != null && x.RECEIVED_FLAG == YesNo_Enum[YesNo_Enum.Y].toString()).ToArray();
                            if (drSchd.length > 0) {
                                let intTolRecvQty: number = 0;
                                let blnZeroRecQty: boolean = false;
                                for (let i = 0; i < drSchd.length; i++) {
                                    if (drSchd[i].QTY != null) {
                                        let strCon_Rate: number = (drSchd[i].CONVERSION_RATE == null ? 1 : drSchd[i].CONVERSION_RATE);
                                        intTolRecvQty = intTolRecvQty + ((drSchd[i].QTY) * (strCon_Rate));
                                    }
                                    if (drSchd[i].QTY == 0) {
                                        blnZeroRecQty = true;
                                    }
                                    this.lstRecvSendPoLines[i].CARRIER_ID = drSchd[i].CARRIER_ID;
                                }
                                if (blnZeroRecQty == false) {
                                    this.lstRecvSendPoLines[i].QTY = (intTolRecvQty == 0.0 ? null : intTolRecvQty);
                                    if (this.lstRecvSendPoLines[i].QTY != null) {
                                        this.lstRecvSendPoLines[i].RECEIVED_FLAG = YesNo_Enum[YesNo_Enum.Y].toString();
                                    }
                                }
                                else {
                                    this.lstRecvSendPoLines[i].QTY = intTolRecvQty;
                                    if (intTolRecvQty >= 0) {
                                        this.lstRecvSendPoLines[i].RECEIVED_FLAG = YesNo_Enum[YesNo_Enum.Y].toString();
                                    }
                                }
                            }
                            else {
                                this.lstRecvSendPoLines[i].QTY = null;
                            }
                        }

                        if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                            await this.postbackGridBind(this.lstRecvSendPoLines, "RECEIVE ITEMS");
                        }
                    }
                }
                this.gblnScheduleFlg = false;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "lotScheduleQty");
        }

    }

    async populateBusinessUnitDrpdwn(bUnitsLst: MT_ATPAR_ORG_GROUP_BUNITS[]): Promise<boolean> {
        try {
            this.statusMsgs = [];
            let populateBunits: boolean = false;
            this.ddlBusinessUnits = [];
            this.ddlBusinessUnits.push({ label: "Select BusinessUnit", value: "Select BusinessUnit" });

            if ((bUnitsLst != null)) {
                if (bUnitsLst.length > 0) {
                    for (let i = 0; i < bUnitsLst.length; i++) {
                        this.ddlBusinessUnits.push({ label: bUnitsLst[i], value: bUnitsLst[i] });//BUSINESS_UNIT
                    }
                }
                else {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Assigned Org Business Units" });
                    return populateBunits = false;
                }

                if (this.lstUserApp != null && this.lstUserApp.length > 0) {
                    let strDefaultBUnit = asEnumerable(this.lstUserApp).ToArray()[0].PARAMETER_VALUE;
                    if (strDefaultBUnit != "") {
                        this.selectedBUnits = strDefaultBUnit;
                    }
                }
            }
            return populateBunits = true;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateBusinessUnitDrpdwn");
        }
    }

    async populateShipToIdsDrpdwn(shipToIds: MT_RECV_SHIPTO_ID_ALLOCATION[]) {
        try {
            this.ddlShipToId = [];
            this.ddlShipToId.push({ label: "Select ShipToID", value: "Select ShipToID" });

            if (shipToIds != null) {
                if (shipToIds.length >= 1) {
                    for (let i = 0; i < shipToIds.length; i++) {
                        this.ddlShipToId.push({ label: shipToIds[i].SHIPTO_ID, value: shipToIds[i].SHIPTO_ID });
                    }
                }
                else {
                    this.blnShipToId = false;
                }
                let strDefaultShipToID = "";
                let nonPoStrDefaultShipToID = "";
                if (this.lstUserApp != null && this.lstUserApp.length > 0) {
                    strDefaultShipToID = asEnumerable(this.lstUserApp).ToArray()[0].PARAMETER_VALUE;
                    nonPoStrDefaultShipToID = asEnumerable(this.lstUserApp).ToArray()[3].PARAMETER_VALUE;
                    //Default Ship To Id value 
                    if (this.blnShipToId == true) {
                        let dr = asEnumerable(this.lstUserApp).Where(x => x.PARAMETER_ID == "DEFAULT_SHIPTO_ID").ToArray();
                        if (dr.length > 0) {
                            strDefaultShipToID = dr[0].PARAMETER_VALUE
                        }
                        if (strDefaultShipToID != "") {
                            this.selectedShipToId = strDefaultShipToID;
                        }
                        if (nonPoStrDefaultShipToID != "") {
                            if (this.poNewItem != null) {
                                this.poNewItem.SHIPTO_ID = nonPoStrDefaultShipToID;
                            }
                        }
                    }
                    else {
                        let dr = asEnumerable(this.lstUserApp).Where(x => x.PARAMETER_ID == "DEFAULT_SHIPTO_ID").ToArray();
                        if (dr.length > 0) {
                            strDefaultShipToID = dr[0].PARAMETER_VALUE;
                        }
                        if (strDefaultShipToID != "") {
                            this.blnShipToId = false;
                            this.txtShipId = strDefaultShipToID.toString();
                        }
                        if (nonPoStrDefaultShipToID != "") {
                            if (this.poNewItem != null) {
                                this.poNewItem.SHIPTO_ID = nonPoStrDefaultShipToID;
                            }
                        }
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateShipToIdsDrpdwn");
        }
    }

    async iutItemsBind() {
        try {
            this.statusMsgs = [];
            this.statusCode = -1;
            let strPrevInterUnitLineNo: string = "";
            let intLineNo: number = 0;
            this.lstRecvIutItems = [];
            //Inventory Business unit allocation checking for IUT
            let invBunits: number = 0;// MT_ATPAR_IBU_ALLOCATION[]
            if (this.lstInventoryBunits != null && this.lstInventoryBunits.length > 0) {
                invBunits = this.lstInventoryBunits.filter(x => x == this.selectedBUnits).length;
                //invBunits = asEnumerable(this.lstInventoryBunits).Where(x => x.BUSINESS_UNIT == this.selectedBUnits).ToArray();
            }

            if (invBunits == null || invBunits == 0) {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Business Unit is not allocated to the user" });
                return;
            }

            this.lstRecvIUTGetPo = new Array<VM_RECV_IUTGETPOS>();
            let recvIUTGetPosEntity: VM_RECV_IUTGETPOS;
            recvIUTGetPosEntity = new VM_RECV_IUTGETPOS();
            if (this.arrlstIUTSearch != null && this.arrlstIUTSearch.length > 0) {
                recvIUTGetPosEntity.CANCEL_TRANSID = "";
                recvIUTGetPosEntity.BUSINESS_UNIT = this.arrlstIUTSearch[0].DESTIN_BU;
                recvIUTGetPosEntity.IUT_ORDERNO = this.arrlstIUTSearch[0].INTERUNIT_ID;
                recvIUTGetPosEntity.PRODUCT = EnumApps.Receiving;
                this.txtIUT = this.arrlstIUTSearch[0].INTERUNIT_ID;
                this.txtPONumber = "";
                this.arrlstIUTSearch = null;
            }
            else {
                recvIUTGetPosEntity.CANCEL_TRANSID = "";
                recvIUTGetPosEntity.BUSINESS_UNIT = this.selectedBUnits == "Select BusinessUnit" ? "" : this.selectedBUnits;
                recvIUTGetPosEntity.IUT_ORDERNO = this.txtIUT.toUpperCase().replace("'", "''");
                recvIUTGetPosEntity.PRODUCT = EnumApps.Receiving;
            }
            this.lstRecvIUTGetPo.push(recvIUTGetPosEntity);

            this.spnrService.start();
            await this.recvPoNonPoService.getIUTDetails(this.lstRecvIUTGetPo).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_PTWY_HEADER>;
                    this.lstRecvIutPoItems = data.DataList;
                    this.statusCode = data.StatusCode;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.spnrService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.spnrService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spnrService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.spnrService.stop();
                            break;
                        }
                    }
                });

            if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                let drHeader = asEnumerable(this.lstScreenApp).Where(a => a.SCREEN_NAME == "IUT ITEMS").ToArray();//("SCREEN_NAME='IUT ITEMS'", "COLUMN_ORDER ASC");
                this.gIUTTransactionID = "";
                if (this.lstRecvIutPoItems != null && this.lstRecvIutPoItems.length > 0) {
                    this.gIUTTransactionID = this.lstRecvIutPoItems[0].TRANSACTION_ID;
                    let recvIutItemEntity: VM_RECV_IUT_ITEMS;

                    for (let i = 0; i < this.lstRecvIutPoItems.length; i++) {
                        let strInterUnitLineNo = this.lstRecvIutPoItems[i].INTERUNIT_LINE;
                        if (strInterUnitLineNo == strPrevInterUnitLineNo) {
                            intLineNo += 1;
                        }
                        else {
                            intLineNo = 1;
                        }
                        strPrevInterUnitLineNo = strInterUnitLineNo;
                        recvIutItemEntity = new VM_RECV_IUT_ITEMS();
                        recvIutItemEntity.TRANSACTION_ID = this.gIUTTransactionID;
                        recvIutItemEntity.DESTIN_BUSINESS_UNIT = this.lstRecvIutPoItems[i].DESTIN_BU;
                        this.hdnBunit = this.lstRecvIutPoItems[i].DESTIN_BU;
                        recvIutItemEntity.ORIG_BUSINESS_UNIT = this.lstRecvIutPoItems[i].ORIG_BU;
                        recvIutItemEntity.INTERUNIT_ID = this.lstRecvIutPoItems[i].INTERUNIT_ID;
                        this.hdnIUT = this.lstRecvIutPoItems[i].INTERUNIT_ID;

                        recvIutItemEntity.QTY_SHIPPED = this.lstRecvIutPoItems[i].QTY_SHIPPED;
                        recvIutItemEntity.LINE_NO = intLineNo.toString();
                        recvIutItemEntity.BILL_OF_LADING = "";
                        recvIutItemEntity.CARRIER_ID = "";
                        recvIutItemEntity.CUSTOM_ITEM_NO = "";
                        recvIutItemEntity.DESCRIPTION = this.lstRecvIutPoItems[i].DESCRIPTION;
                        recvIutItemEntity.GTIN = this.lstRecvIutPoItems[i].GTIN;
                        recvIutItemEntity.INTERUNIT_LINE = strInterUnitLineNo;
                        recvIutItemEntity.INV_LOT_ID = this.lstRecvIutPoItems[i].INV_LOT_ID;
                        recvIutItemEntity.ITEM_ID = this.lstRecvIutPoItems[i].INV_ITEM_ID;
                        recvIutItemEntity.LOT_CONTROLLED = this.lstRecvIutPoItems[i].LOT_FLAG;
                        recvIutItemEntity.MFG_ITEM_ID = this.lstRecvIutPoItems[i].MFG_ITEM_ID;
                        recvIutItemEntity.NO_OF_PKGS = "";
                        recvIutItemEntity.PACKAGING_STRING = this.lstRecvIutPoItems[i].PACKAGING_STRING;
                        recvIutItemEntity.PRICE = this.lstRecvIutPoItems[i].PRICE;
                        recvIutItemEntity.QTY = "";
                        recvIutItemEntity.QTY_RECEIVED = this.lstRecvIutPoItems[i].QTY_RECEIVED;
                        recvIutItemEntity.SERIAL_CONTROLLED = this.lstRecvIutPoItems[i].SERIAL_FLAG;
                        recvIutItemEntity.SERIAL_ID = this.lstRecvIutPoItems[i].SERIAL_ID;
                        recvIutItemEntity.STOR_LOC = this.lstRecvIutPoItems[i].DEST_SA + this.lstRecvIutPoItems[i].DEST_SL1 + this.lstRecvIutPoItems[i].DEST_SL2 +
                            this.lstRecvIutPoItems[i].DEST_SL3 + this.lstRecvIutPoItems[i].DEST_SL4;
                        recvIutItemEntity.UOM = this.lstRecvIutPoItems[i].UNIT_MEASURE_SHIP;
                        recvIutItemEntity.UPC_ID = this.lstRecvIutPoItems[i].UPC_ID;
                        recvIutItemEntity.VEND_ITEM_ID = this.lstRecvIutPoItems[i].VENDOR_ITEM_ID;
                        recvIutItemEntity.SCHDFLAG = false;
                        recvIutItemEntity.DDLUOMFLAG = false;
                        recvIutItemEntity.TXTQTYFLAG = false;
                        this.lstRecvIutItems.push(recvIutItemEntity);
                    }

                    if (this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0) {
                        await this.grdReceiveItems_RowDataBound(this.lstRecvIutItems);
                        await this.postbackGridBind(this.lstRecvIutItems, "IUT ITEMS");
                        this.blnGrdRecvPoItems = false;
                        this.blnGrdRecvIutItems = true;
                    }
                }

            }
            else if (this.statusCode == AtparStatusCodes.ATPAR_E_IUT_LOCKEDBYOTHERUSER) {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "This IUT order is locked by another user" });
                return;
            }
            else if (this.statusCode == AtparStatusCodes.E_NORECORDFOUND) {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Records were returned" });
                this.tbl = false;
                return;
            }
            else if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Internal Server Error" });
                return;
            }
            this.spnrService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "iutItemsBind");
        }
    }

    async receivePoItemsBind() {
        try {
            this.statusMsgs = [];
            this.statusCode = -1;
            let selectedInVoiceNo: string = "";
            let selectedPakSlipNo: string = "";
            this.lstRecvPoItems = new Array<VM_RECV_POHEADER>();
            this.spnrService.start();
            this.lstReCallInfo = [];
            if (this.txtInvoice != undefined && this.txtInvoice != null && this.txtInvoice != "") {
                this.txtInvoice = this.txtInvoice.trim().replace("'", "''");
            }

            if (this.gStrASNDownload == "Invoice No") {
                selectedInVoiceNo = this.txtInvoice;
            }
            else if (this.gStrASNDownload == "Pack Slip No") {
                selectedPakSlipNo = this.txtInvoice;
            }

            //Adding parameters to dataset
            let recvPoItemsEntity: VM_RECV_POHEADER;
            recvPoItemsEntity = new VM_RECV_POHEADER();

            if (this.arrlstPOSearch != null && this.arrlstPOSearch.length > 0) {
                recvPoItemsEntity.BUSINESS_UNIT = this.arrlstPOSearch[0].BUSINESS_UNIT.toString();
                recvPoItemsEntity.PO_NO = this.arrlstPOSearch[0].POID.toString();
                recvPoItemsEntity.PACKSLIP_SEL_INVOICE_NO = selectedInVoiceNo;
                recvPoItemsEntity.TOTAL_PO = "N";
                recvPoItemsEntity.SHIP_TO_ID = this.arrlstPOSearch[0].SHPTID.toString();
                recvPoItemsEntity.TRANS_ID = "";
                if (this.chkIncludeAllPOLines != null) {
                    recvPoItemsEntity.INCLUDE_ALL_PO_LINES = this.chkIncludeAllPOLines.toString();
                }

                recvPoItemsEntity.SELECTED_PAK_SLIP_NO = selectedPakSlipNo;
                recvPoItemsEntity.RECEIVER_ID = this.arrlstPOSearch[0].RECVID == "" ? "" : this.arrlstPOSearch[0].RECVID;

                this.txtPONumber = this.arrlstPOSearch[0].POID;
                this.txtIUT = "";
            }
            else {
                recvPoItemsEntity.BUSINESS_UNIT = this.selectedBUnits == "Select BusinessUnit" ? "" : this.selectedBUnits;
                if (this.txtPONumber != null && this.txtPONumber != "") {
                    recvPoItemsEntity.PO_NO = this.txtPONumber.trim().toUpperCase().replace("'", "''");
                }

                recvPoItemsEntity.PACKSLIP_SEL_INVOICE_NO = selectedInVoiceNo;
                recvPoItemsEntity.TOTAL_PO = "N";
                recvPoItemsEntity.SHIP_TO_ID = this.selectedShipToId == "Select ShipToID" ? "" : this.selectedShipToId.toString();
                recvPoItemsEntity.TRANS_ID = "";
                if (this.chkIncludeAllPOLines != null) {
                    recvPoItemsEntity.INCLUDE_ALL_PO_LINES = this.chkIncludeAllPOLines.toString();
                }

                recvPoItemsEntity.SELECTED_PAK_SLIP_NO = selectedPakSlipNo;
                recvPoItemsEntity.RECEIVER_ID = "";
            }
            this.lstRecvPoItems.push(recvPoItemsEntity);

            // this.spnrService.start();
            await this.recvPoNonPoService.getHeader(this.lstRecvPoItems).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_RECV_SENDPOHEADER>;
                    this.statusCode = data.StatusCode;
                    if (data.DataDictionary != null) {
                        if (data.DataDictionary['lstReceiverIds'] != null && data.DataDictionary['lstReceiverIds'].length > 0) {
                            this.lstAsnDetails = data.DataDictionary['lstReceiverIds'];
                        }
                    }
                    this.statusMsgs = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (data.DataDictionary != null) {
                                this.lstRecvSendPoHdrs = data.DataDictionary['listHeaders'];
                                this.lstGridRecvSendPoLines = data.DataDictionary['listLines'];
                                this.lstRecvAltUomData = data.DataDictionary['lstAltUOM'];
                                if (data.DataDictionary['lstReceiverIds'] != null && data.DataDictionary['lstReceiverIds'].length > 0) {
                                    this.lstAsnDetails = data.DataDictionary['lstReceiverIds'];
                                }
                                if (data.DataDictionary['lstRecallItems'] != null && data.DataDictionary['lstRecallItems'].length > 0) {
                                    this.lstReCallInfo = data.DataDictionary['lstRecallItems'];
                                }
                            }
                            this.spnrService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.spnrService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spnrService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.spnrService.stop();
                            break;
                        }
                    }
                });
            this.spnrService.stop();
            if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                if (this.statusCode == AtparStatusCodes.RECV_S_MULTIPLERECEIVERSEXISTS) {
                    if (this.gStrReceiverId == "" || this.gStrReceiverId == undefined) {
                        await this.asnPopupshow();
                        return;
                    }
                    if (this.gblnCancel) {
                        this.gblnCancel = false;
                        return;
                    }
                    else {
                        try {
                            //Updating values to Input Dataset
                            this.lstRecvPoItems[0].PACKSLIP_SEL_INVOICE_NO = selectedInVoiceNo;
                            this.lstRecvPoItems[0].SELECTED_PAK_SLIP_NO = selectedPakSlipNo;
                            this.lstRecvPoItems[0].RECEIVER_ID = this.gStrReceiverId;
                            // strReceiverId = "";
                            this.statusCode = AtparStatusCodes.ATPAR_OK;
                            // this.spnrService.start();
                            await this.recvPoNonPoService.getHeader(this.lstRecvPoItems).
                                catch(this.httpService.handleError).then((res: Response) => {
                                    let data = res.json() as AtParWebApiResponse<VM_RECV_SENDPOHEADER>;
                                    if (data.DataDictionary != null) {
                                        if (data.DataDictionary['lstReceiverIds'] != null && data.DataDictionary['lstReceiverIds'].length > 0) {
                                            this.lstAsnDetails = data.DataDictionary['lstReceiverIds'];
                                        }
                                    }
                                    this.statusCode = data.StatusCode;
                                    this.statusMsgs = [];
                                    switch (data.StatType) {
                                        case StatusType.Success: {
                                            if (data.DataDictionary != null) {
                                                this.lstRecvSendPoHdrs = data.DataDictionary['listHeaders'];
                                                this.lstGridRecvSendPoLines = data.DataDictionary['listLines'];
                                                this.lstRecvAltUomData = data.DataDictionary['lstAltUOM'];
                                                if (data.DataDictionary['lstReceiverIds'] != null && data.DataDictionary['lstReceiverIds'].length > 0) {
                                                    this.lstAsnDetails = data.DataDictionary['lstReceiverIds'];
                                                }
                                                if (data.DataDictionary['lstRecallItems'] != null && data.DataDictionary['lstRecallItems'].length > 0) {
                                                    this.lstReCallInfo = data.DataDictionary['lstRecallItems'];
                                                }
                                            }
                                            this.spnrService.stop();
                                            break;
                                        }
                                        case StatusType.Warn: {
                                            this.statusMsgs = [];
                                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            this.spnrService.stop();
                                            break;
                                        }
                                        case StatusType.Error: {
                                            this.statusMsgs = [];
                                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            this.spnrService.stop();
                                            break;
                                        }
                                        case StatusType.Custom: {
                                            this.statusMsgs = [];
                                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            this.spnrService.stop();
                                            break;
                                        }
                                    }
                                });
                            this.spnrService.stop();
                            this.gStrReceiverId = "";
                        }
                        catch (ex) {
                            this.clientErrorMsg(ex, "receivePoItemsBind");
                        }
                    }
                }
                else if (this.statusCode == AtparStatusCodes.RECV_E_LOCKEDBYOTHERUSER) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "This PO is locked by another user" });
                    this.spnrService.stop();
                    return;
                }
                else if (this.statusCode == AtparStatusCodes.RECV_S_RECEIPTNOTFOUND) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Receipt not found for given Invoice / Packing Slip" });
                    this.spnrService.stop();
                    return;
                }
                else if (this.statusCode == AtparStatusCodes.RECV_S_NO_POUOM_CONVERSIONRATE) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "The PO you are trying to get does not have conversion rate" });
                    this.spnrService.stop();
                    return;
                }
                else if (this.statusCode == AtparStatusCodes.RECV_S_INVALIDPOID) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({
                        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Multiple POs found for the given PO ID, please provide complete PO ID to download the PO"
                    });
                    this.spnrService.stop();
                    return;
                }
                else if (this.statusCode == AtparStatusCodes.E_NORECORDFOUND) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No records were returned" });
                    this.tbl = false;
                    this.spnrService.stop();
                    return;
                }
                else if (this.statusCode == AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Assigned Org Business Units" });
                    this.spnrService.stop();
                    return;
                }
                else if (this.statusCode == AtparStatusCodes.ATPAR_E_INVALIDTOKEN) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid Token, The login user token is expired, login again to get a valid token" });
                    this.spnrService.stop();
                    return;
                }
                else if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "General Server Error" });
                    this.spnrService.stop();
                    return;
                }
            }

            let drHeader = asEnumerable(this.lstScreenApp).Where(a => a.SCREEN_NAME == "RECEIVE ITEMS").ToArray();
            if (this.lstRecvSendPoHdrs != null) {

                for (let i = 0; i < this.lstRecvSendPoHdrs.length; i++) {
                    if (this.lstRecvSendPoHdrs[i].TRANSACTION_ID != null) {
                        this.gTransactionID = this.lstRecvSendPoHdrs[i].TRANSACTION_ID.toString();
                    }

                    if (this.lstRecvSendPoHdrs[i].COMMENTS != null) {
                        if (this.lstRecvSendPoHdrs[i].COMMENTS != "") {
                            //lblHdrComments.Visible = true;
                            this.lblHdrComments = this.lstRecvSendPoHdrs[i].COMMENTS;
                            if (this.lblHdrComments != null && this.lblHdrComments != "") {
                                if (this.lblHdrComments.length > 160) {
                                    this.lblHdrCommentsToolTip = this.lblHdrComments;
                                    this.lblHdrComments = this.lblHdrComments.slice(0, 160) + "..";

                                } else {
                                    this.lblHdrCommentsToolTip = "";
                                }
                            }

                            if (this.gDisplayComments == YesNo_Enum[YesNo_Enum.Y].toString()) {
                                // lblHdrComments.ForeColor = Drawing.Color.Red;
                            }
                            else {
                                // lblHdrComments.ForeColor = Drawing.Color.Black;
                            }
                        }
                        else {
                            //lblHdrComments.Visible = false;
                            this.lblHdrComments = "";
                        }
                    }
                    else {
                        //lblHdrComments.Visible = false;
                        this.lblHdrComments = "";
                    }

                    this.lblReceiverId = this.lstRecvSendPoHdrs[i].RECEIVER_ID;
                    if (this.lstRecvSendPoHdrs[i].RECEIVER_ID != null && this.lstRecvSendPoHdrs[i].RECEIVER_ID != "" && this.lblReceiverId != "X") {
                        this.gblnASNPO = true;
                    }

                    this.hdnPO = this.lstRecvSendPoHdrs[i].PO_ID;
                    this.hdnBunit = this.lstRecvSendPoHdrs[i].BUSINESS_UNIT_PO;
                    this.gInvoiceMthdCode = this.lstRecvSendPoHdrs[i].INV_MTHD_CODE;
                    this.gDropShipFlag = this.lstRecvSendPoHdrs[i].DROP_SHIP_FL;
                    this.lblBuyerId = this.lstRecvSendPoHdrs[i].BUYER_ID;
                    this.lblPhoneValue = this.lstRecvSendPoHdrs[i].PHONE;

                }
            }
            if (this.lstRecvSendPoHdrs != null) {
                if (this.lstGridRecvSendPoLines != null && this.lstGridRecvSendPoLines.length > 0) {
                    this.lstRecvSendPoLines = [];
                    let previtem: any = "";
                    let prevLine: any = "";
                    if (this.lstGridRecvSendPoLines != null && this.lstGridRecvSendPoLines.length > 0) {
                        for (let i = 0; i < this.lstGridRecvSendPoLines.length; i++) {
                            if (previtem == this.lstGridRecvSendPoLines[i].INV_ITEM_ID && prevLine == this.lstGridRecvSendPoLines[i].LINE_NBR) {
                                previtem = this.lstGridRecvSendPoLines[i].INV_ITEM_ID;
                                prevLine = this.lstGridRecvSendPoLines[i].LINE_NBR;

                            } else {
                                previtem = this.lstGridRecvSendPoLines[i].INV_ITEM_ID;
                                prevLine = this.lstGridRecvSendPoLines[i].LINE_NBR;
                                let recvLines = asEnumerable(this.lstGridRecvSendPoLines).Where(x => x.INV_ITEM_ID == this.lstGridRecvSendPoLines[i].INV_ITEM_ID && x.LINE_NBR == this.lstGridRecvSendPoLines[i].LINE_NBR).ToArray();
                                let dblLinePOQty: number = 0;
                                let intSchedCount: number = 1;
                                if (recvLines.length > 1) {
                                    for (let j = 0; j < recvLines.length; j++) {
                                        dblLinePOQty += recvLines[j].QTY_PO;
                                        intSchedCount += 1;
                                    }

                                    this.lstRecvSendPoLines.push({
                                        TRANSACTION_ID: recvLines[recvLines.length - 1].TRANSACTION_ID,
                                        BUSINESS_UNIT: recvLines[recvLines.length - 1].BUSINESS_UNIT,
                                        PO_ID: recvLines[recvLines.length - 1].PO_ID,
                                        STORAGE_LOCATION: recvLines[recvLines.length - 1].STORAGE_LOCATION,
                                        LINE_NBR: recvLines[recvLines.length - 1].LINE_NBR,
                                        SCHED_NBR: recvLines[recvLines.length - 1].SCHED_NBR,
                                        SCHED_COUNT: intSchedCount,
                                        INV_ITEM_ID: recvLines[recvLines.length - 1].INV_ITEM_ID,
                                        ITM_ID_VNDR: recvLines[recvLines.length - 1].ITM_ID_VNDR,
                                        MFG_ITEM_ID: recvLines[recvLines.length - 1].MFG_ITEM_ID,
                                        DESCR: recvLines[recvLines.length - 1].DESCR,
                                        INVENTORY_ITEM: recvLines[recvLines.length - 1].INVENTORY_ITEM,
                                        UPC_ID: recvLines[recvLines.length - 1].UPC_ID,
                                        COMMENTS: recvLines[recvLines.length - 1].COMMENTS,
                                        DUE_DT: recvLines[recvLines.length - 1].DUE_DT,
                                        QTY: recvLines[recvLines.length - 1].QTY,
                                        ASN_QTY: recvLines[recvLines.length - 1].ASN_QTY,
                                        QTY_PO: dblLinePOQty,
                                        LINE_QTY: recvLines[recvLines.length - 1].LINE_QTY,
                                        LINE_PO_QTY: recvLines[recvLines.length - 1].LINE_PO_QTY,
                                        RECEIVED_QTY: recvLines[recvLines.length - 1].RECEIVED_QTY,
                                        LOCATION: recvLines[recvLines.length - 1].LOCATION,
                                        SHIPTO_ID: recvLines[recvLines.length - 1].SHIPTO_ID,
                                        CARRIER_ID: recvLines[recvLines.length - 1].CARRIER_ID,
                                        UNIT_OF_MEASURE: recvLines[recvLines.length - 1].UNIT_OF_MEASURE,
                                        BILL_OF_LADING: recvLines[recvLines.length - 1].BILL_OF_LADING,
                                        ASN_BILL_OF_LADING: recvLines[recvLines.length - 1].ASN_BILL_OF_LADING,
                                        USER_ID: recvLines[recvLines.length - 1].USER_ID,
                                        DEVICE_DT_TIME: recvLines[recvLines.length - 1].DEVICE_DT_TIME,
                                        NO_OF_BOXES: recvLines[recvLines.length - 1].NO_OF_BOXES,
                                        INSP_FLAG: recvLines[recvLines.length - 1].INSP_FLAG,
                                        QTY_RECV_TOL_PCT: recvLines[recvLines.length - 1].QTY_RECV_TOL_PCT,
                                        DELIVER_TO: recvLines[recvLines.length - 1].DELIVER_TO,
                                        REQ_LOC_DESC: recvLines[recvLines.length - 1].REQ_LOC_DESC,
                                        TRACKING_ID: "",
                                        CUST_ITEM_NO: recvLines[recvLines.length - 1].CUST_ITEM_NO,
                                        RECEIVING_ROUTING_ID: recvLines[recvLines.length - 1].RECEIVING_ROUTING_ID,
                                        BIN_TRACK_FLAG: recvLines[recvLines.length - 1].BIN_TRACK_FLAG,
                                        ASSET_ITEM_FLAG: recvLines[recvLines.length - 1].ASSET_ITEM_FLAG,
                                        EXT_TRK_NO: recvLines[recvLines.length - 1].EXT_TRK_NO,
                                        QTY_UPDATE: recvLines[recvLines.length - 1].QTY_UPDATE,
                                        ISSUE_UOM: recvLines[recvLines.length - 1].ISSUE_UOM,
                                        CONVERSION_RATE: recvLines[recvLines.length - 1].CONVERSION_RATE,
                                        RECV_UOM: recvLines[recvLines.length - 1].RECV_UOM,
                                        RECV_CONVERSION_RATE: recvLines[recvLines.length - 1].RECV_CONVERSION_RATE,
                                        GTIN: recvLines[recvLines.length - 1].GTIN,
                                        LOT_CONTROLLED: recvLines[recvLines.length - 1].LOT_CONTROLLED,
                                        SERIAL_CONTROLLED: recvLines[recvLines.length - 1].SERIAL_CONTROLLED,
                                        RECAL_FLAG: recvLines[recvLines.length - 1].RECAL_FLAG,
                                        ADDRESS1: recvLines[recvLines.length - 1].ADDRESS1,
                                        ADDRESS2: recvLines[recvLines.length - 1].ADDRESS2,
                                        ADDRESS3: recvLines[recvLines.length - 1].ADDRESS3,
                                        PHONE: recvLines[recvLines.length - 1].PHONE,
                                        REQ_NUM: recvLines[recvLines.length - 1].REQ_NUM,
                                        PRICE: recvLines[recvLines.length - 1].PRICE,
                                        PACKAGING_STRING: recvLines[recvLines.length - 1].PACKAGING_STRING,
                                        BUILDING: recvLines[recvLines.length - 1].BUILDING,
                                        FLOOR: recvLines[recvLines.length - 1].FLOOR,
                                        SECTOR: recvLines[recvLines.length - 1].SECTOR,
                                        REQUISITION_NAME: recvLines[recvLines.length - 1].REQUISITION_NAME,
                                        BUYER_NAME: recvLines[recvLines.length - 1].BUYER_NAME,
                                        LOC_DESCR: recvLines[recvLines.length - 1].LOC_DESCR,
                                        ITEMID_DESC: recvLines[recvLines.length - 1].ITEMID_DESC,
                                        ALT_UOM: recvLines[recvLines.length - 1].ALT_UOM,
                                        OPENQTY: recvLines[recvLines.length - 1].OPENQTY,
                                        START_DT_TIME: recvLines[recvLines.length - 1].START_DT_TIME,
                                        END_DT_TIME: recvLines[recvLines.length - 1].END_DT_TIME,
                                        STATUS: recvLines[recvLines.length - 1].STATUS,
                                        RECEIVED_FLAG: recvLines[recvLines.length - 1].RECEIVED_FLAG,
                                        RBFlAG: false,
                                        DDLUOMS: null,
                                        SELECTEDUOM: "",
                                        LINE_ID: "",
                                        PRVCARRIER_ID: "",
                                        SCHDFLAG: true,
                                        DDLUOMFLAG: true,
                                        TXTQTYFLAG: true,
                                        DESCR_TOOLTIP: "",
                                        QTYDESABLEFLAG: false,
                                        LOTSERIALSCHDFLAG: false,
                                        SCHDQTYCHANGFLAG: false
                                    });
                                    this.blnScheduleItems = true;
                                } else {
                                    recvLines[recvLines.length - 1].TRACKING_ID = "";
                                    recvLines[recvLines.length - 1].RBFlAG = false;
                                    recvLines[recvLines.length - 1].SCHDFLAG = false;
                                    recvLines[recvLines.length - 1].DDLUOMFLAG = false;
                                    recvLines[recvLines.length - 1].TXTQTYFLAG = false;
                                    this.lstRecvSendPoLines.push(recvLines[recvLines.length - 1]);

                                }
                            }
                        }
                    }

                }
            }

            if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                this.lstRecvSendPoLines = asEnumerable(this.lstRecvSendPoLines).OrderBy(x => x.LINE_NBR).ToArray();
                this.spnrService.start();
                await this.grdReceiveItems_RowDataBound(this.lstRecvSendPoLines);
                await this.postbackGridBind(this.lstRecvSendPoLines, "RECEIVE ITEMS");
                this.blnGrdRecvIutItems = false;
                this.blnGrdRecvPoItems = true;
                this.plus = true;
                this.minus = false;
                this.spnrService.stop();
            }
        }
        catch (ex) {
            this.spnrService.stop();
            this.clientErrorMsg(ex, "receivePoItemsBind");
        }
    }

    async grdReceiveItems_RowDataBound(recvDetails) {
        try {
            this.statusMsgs = [];
            let intConverfactor: number = 0;
            let strUOM: string = "";
            await this.populateCarrierDropDown(this.selectedDdlCarrier);

            if (this.gStrDisplayReceivedQty == YesNo_Enum[YesNo_Enum.N].toString()) {
            }
            if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                if (recvDetails != null && recvDetails.length > 0) {
                    for (let i = 0; i < recvDetails.length; i++) {
                        let strLot: string = recvDetails[i].LOT_CONTROLLED;
                        let strSerial: string = recvDetails[i].SERIAL_CONTROLLED;
                        let schedNbr: number = recvDetails[i].SCHED_NBR;
                        let txtQty: number = recvDetails[i].QTY;
                        let txtLadg: string = recvDetails[i].BILL_OF_LADING;
                        let txttrkno: string = recvDetails[i].EXT_TRK_NO;
                        let txtnoofboxes: number = recvDetails[i].NO_OF_BOXES;
                        let lnkItemId = recvDetails[i].INV_ITEM_ID;

                        if (recvDetails[i].CONVERSION_RATE != null) {
                            intConverfactor = parseInt(recvDetails[i].CONVERSION_RATE.toString());
                        }
                        if (recvDetails[i].DESCR != null && recvDetails[i].DESCR.length > 30) {
                            recvDetails[i].DESCR_TOOLTIP = recvDetails[i].DESCR;
                            recvDetails[i].DESCR = recvDetails[i].DESCR.slice(0, 30) + "..";
                        }

                        strUOM = recvDetails[i].UNIT_OF_MEASURE;
                        await this.populateUOM(intConverfactor, strUOM, recvDetails[i].LINE_NBR.toString(), strSerial, strLot, recvDetails[i]);
                        if (recvDetails[i].CARRIER_ID != null && recvDetails[i].CARRIER_ID != "") {

                        }

                        let schedCount: string = recvDetails[i].SCHED_COUNT.toString();

                        if (schedCount == "1") {
                            this.blnlnkItemIdEnable = false;
                            this.blnlnkLineNbrEnable = false;
                            if ((strLot == YesNo_Enum[YesNo_Enum.Y].toString() || strSerial == YesNo_Enum[YesNo_Enum.Y].toString()) &&
                                this.gStrLotSerial == Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.MMIS].toString()) {
                                recvDetails[i].TXTQTYFLAG = true
                                recvDetails[i].DDLUOMFLAG = true
                                this.recvGrdCarrierEnable = true;
                            } else {
                                recvDetails[i].TXTQTYFLAG = false
                            }
                        } else {
                            if (parseInt(schedCount) > 1) {
                                if (this.gblnASNPO && (this.gblnScheduleFlg == false)) {
                                    recvDetails[i].QTY = "";
                                }
                            }
                        }

                        //Recall Checking
                        let strRecallFlag: string = recvDetails[i].RECAL_FLAG;
                        if (strRecallFlag == YesNo_Enum[YesNo_Enum.Y].toString()) {
                            let dtRecallInfo = this.lstReCallInfo;
                            if (dtRecallInfo != null && dtRecallInfo.length > 0) {
                                let dr = dtRecallInfo.filter(x => x.ITEM_ID == lnkItemId && (x.LOT_NO == "" || x.LOT_NO == null) && (x.SERIAL_NO == "" || x.SERIAL_NO == null));
                                if (dr != null && dr.length > 0) {
                                    recvDetails[i].TXTQTYFLAG = true;
                                }
                            }
                        }
                        if (this.strDefaultCarrierID != null && this.strDefaultCarrierID != "" && this.strDefaultCarrierID != undefined) {
                            if (recvDetails[i].SCHED_COUNT != null && recvDetails[i].SCHED_COUNT != undefined && recvDetails[i].SCHED_COUNT <= 1) {
                                recvDetails[i].CARRIER_ID = this.strDefaultCarrierID.toUpperCase();
                            }
                        }
                    }
                }
            }
            else if (this.lstRecvIutItems != null) {
                if (recvDetails != null && recvDetails.length > 0) {
                    let lnkItemId = recvDetails.ITEM_ID;
                    this.blnlnkItemIdEnable = false;
                    this.blnlnkLineNbrEnable = false;
                    let dtIUTDetails = this.lstRecvIutItems;
                    for (let i = 0; i < recvDetails.length; i++) {
                        let strSerialControlled: string = recvDetails[i].SERIAL_CONTROLLED;
                        if (strSerialControlled == YesNo_Enum[YesNo_Enum.Y].toString()) {
                            this.txtQty = "1";
                            recvDetails[i].TXTQTYFLAG = true;
                        } else {
                            recvDetails[i].TXTQTYFLAG = false;
                        }
                    }
                }
            } else if (this.dtScheduleItems != null && this.dtScheduleItems.length > 0 && this.dtScheduleItems != undefined) {
                if (recvDetails != null && recvDetails.length > 0) {
                    for (let i = 0; i < recvDetails.length; i++) {
                        let strLot: string = recvDetails[i].LOT_CONTROLLED;
                        let strSerial: string = recvDetails[i].SERIAL_CONTROLLED;
                        let schedNbr: number = recvDetails[i].SCHED_NBR;
                        let txtQty: number = recvDetails[i].QTY;
                        let txtLadg: string = recvDetails[i].BILL_OF_LADING;
                        let txttrkno: string = recvDetails[i].EXT_TRK_NO;
                        let txtnoofboxes: number = recvDetails[i].NO_OF_BOXES;
                        let lnkItemId = recvDetails[i].INV_ITEM_ID;

                        if (recvDetails[i].CONVERSION_RATE != null) {
                            intConverfactor = parseInt(recvDetails[i].CONVERSION_RATE.toString());
                        }
                        strUOM = recvDetails[i].UNIT_OF_MEASURE;
                        await this.populateUOM(intConverfactor, strUOM, recvDetails[i].LINE_NBR.toString(), strSerial, strLot, recvDetails[i]);

                        if (this.gStrDisplayReceivedQty == YesNo_Enum[YesNo_Enum.N].toString()) {
                            //if (recvDetails[i].QTY != null) {
                            //    recvDetails[i].QTY = null;
                            //}
                        }


                        if (this.gStrLotSerial != Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.None].toString()) {
                            if (this.gStrLotSerial == Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.MMIS].toString()) {

                                if ((strLot == YesNo_Enum[YesNo_Enum.Y].toString() || strSerial == YesNo_Enum[YesNo_Enum.Y].toString())) {
                                    recvDetails[i].TXTQTYFLAG = true
                                    recvDetails[i].DDLUOMFLAG = true
                                    this.recvGrdCarrierEnable = true;
                                    //txtQty.Enabled = False
                                    //ddlUOM.Enabled = False
                                } else {
                                    recvDetails[i].TXTQTYFLAG = false
                                }
                            } else if (this.gStrLotSerial == Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.AtPar].toString()) {
                                //let dr = this.dtScheduleItems.filter(x => (x.LOT_NO != "" || x.LOT_NO != null) && x.SCHED_NBR == schedNbr);

                            }
                        }

                        //let dr = this.dtScheduleItems.filter(x => x.QTY != null && x.ITEM_ID == lnkItemId && (x.LOT_NO == "" || x.LOT_NO == null) && (x.SERIAL_NO == "" || x.SERIAL_NO == null) && x.DELETE_FLAG == YesNo_Enum[YesNo_Enum.N].toString() && && x.SCHED_NBR == schedNbr);
                        //if (dr != null && dr.length > 0) {
                        //    let intTolRecvQty: number = 0;
                        //}

                        if (this.strDefaultCarrierID != null && this.strDefaultCarrierID != "" && this.strDefaultCarrierID != undefined) {

                            recvDetails[i].CARRIER_ID = this.strDefaultCarrierID.toUpperCase();
                        }
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "grdReceiveItems_RowDataBound");
        }
    }

    async postbackGridBind(recvDetails, strScreen: string) {
        try {
            this.tbl = true;
            if (strScreen == "IUT ITEMS") {
                this.btnPntrHeaderDisable = true;//Enabled=false
                this.btnPntrDetailsDisable = true;//Enabled=false
            } else {
                this.btnPntrHeaderDisable = false;//Enabled=false
                this.btnPntrDetailsDisable = true;
            }

            if (this.gStrLotSerial != "None" && strScreen != "IUT ITEMS") {
                this.btnPntrLotSerialVisible = true;
                this.btnLotSerialDisable = true;//Enabled = false;
            }
            else {
                this.btnPntrLotSerialVisible = false;
            }

            let mgfItem = this.lstScreenApp.filter(x => x.FIELD_NAME == 'MFG_ITEM_ID' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS');
            if (mgfItem != null && mgfItem.length > 0) { this.blnMgf = true; }
            else { this.blnMgf = false; }

            let noOfBoxes = this.lstScreenApp.filter(x => x.FIELD_NAME == 'NO_OF_BOXES' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS');
            if (noOfBoxes != null && noOfBoxes.length > 0) { this.blnNoofBoxes = true; }
            else { this.blnNoofBoxes = false; }

            let price = this.lstScreenApp.filter(x => x.FIELD_NAME == 'PRICE' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS');
            if (price != null && price.length > 0) { this.blnItemPrice = true; }
            else { this.blnItemPrice = false; }

            let packagingString = this.lstScreenApp.filter(x => x.FIELD_NAME == 'PACKAGING_STRING' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS');
            if (packagingString != null && packagingString.length > 0) { this.blnPackage = true; }
            else { this.blnPackage = false; }

            let serialCon = this.lstScreenApp.filter(x => x.FIELD_NAME == 'SERIAL_CONTROLLED' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS');
            if (serialCon != null && serialCon.length > 0) { this.blnSerial = true; }
            else { this.blnSerial = false; }

            let lotCon = this.lstScreenApp.filter(x => x.FIELD_NAME == 'LOT_CONTROLLED' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS');
            if (lotCon != null && lotCon.length > 0) { this.blnLot = true; }
            else { this.blnLot = false; }

            let extTrk = this.lstScreenApp.filter(x => x.FIELD_NAME == 'EXT_TRK_NO' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS');
            if (extTrk != null && extTrk.length > 0) { this.blnExtrkNo = true; }
            else { this.blnExtrkNo = false; }

            let recQty = this.lstScreenApp.filter(x => x.FIELD_NAME == 'RECEIVED_QTY' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS');
            if (recQty != null && recQty.length > 0) { this.blnRecQty = true; }
            else { this.blnRecQty = false; }

            let trackId = this.lstScreenApp.filter(x => x.FIELD_NAME == 'TRACKING_ID' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS');
            if (trackId != null && trackId.length > 0) { this.blnTrkNo = true; }
            else { this.blnTrkNo = false; }

            let GTIN = this.lstScreenApp.filter(x => x.FIELD_NAME == 'GTIN' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS');
            if (GTIN != null && GTIN.length > 0) { this.blnGTIN = true; }
            else { this.blnGTIN = false; }

            let UPC = this.lstScreenApp.filter(x => x.FIELD_NAME == 'UPC_ID' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS');
            if (UPC != null && UPC.length > 0) { this.blnUPC = true; }
            else { this.blnUPC = false; }

            let shipID = this.lstScreenApp.filter(x => x.FIELD_NAME == 'SHIPTO_ID' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS');
            if (shipID != null && shipID.length > 0) { this.blnShip = true; }
            else { this.blnShip = false; }

            this.hdnNonPo = YesNo_Enum[YesNo_Enum.Y].toString();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "postbackGridBind");
        }
    }

    public checkColumnExist(colname, screenName) {
        let count = this.lstScreenApp.filter(x => x.FIELD_NAME == colname && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == screenName)
        if (count != null && count.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    async populateUOM(intConverfactor, strUOM, lineNbr, strSerialControlled, strLot, recvDetails) {
        try {

            if (this.gStrUOMEditFlag == YesNo_Enum[YesNo_Enum.Y].toString()) {
                if (strSerialControlled == YesNo_Enum[YesNo_Enum.Y].toString() &&
                    this.gStrLotSerial != Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.None].toString()) {
                    recvDetails.DDLUOMFLAG = true;
                    this.ddlRecvUomEnable = true;
                } else {
                    this.ddlRecvUomEnable = false;
                    recvDetails.DDLUOMFLAG = false;
                }
                this.selectedRecvUom = "";
                this.ddlRecvUom = [];
                if (this.lstRecvAltUomData.length > 0) {
                    let drUOM = asEnumerable(this.lstRecvAltUomData).Where(x => x.LN_NBR == lineNbr).ToArray();
                    if (intConverfactor == 1) {
                        this.standardUOM = strUOM;
                        this.standardConversionRate = intConverfactor;
                    } else {
                        //Loop thru the alternateUOMs and Set values
                        for (let i = 0; i < drUOM.length; i++) {
                            if (drUOM[i].CONV_FACT == "1") {
                                this.standardUOM = drUOM[i].UOM;
                                this.standardConversionRate = drUOM[i].CONV_FACT;
                            }
                        }
                    }

                    for (let i = 0; i < drUOM.length; i++) {
                        let intAltConFact: number = parseInt(drUOM[i].CONV_FACT);
                        if (this.gStrAltUOMDisplay == this.gRecv_StandardUOM) {
                            intAltConFact = intAltConFact / parseInt(this.standardConversionRate);
                            this.ddlRecvUom.push({ label: drUOM[i].UOM + "(" + intAltConFact + " " + this.standardUOM + ")", value: drUOM[i].UOM + "(" + intAltConFact + " " + this.standardUOM + ")" });
                        }
                        else if (this.gStrAltUOMDisplay == this.gRecv_PoUOM) {
                            if ((intAltConFact % parseInt(intConverfactor)) == 0) {
                                if (intAltConFact == intConverfactor) {
                                    intAltConFact = 1;
                                    this.ddlRecvUom.push({ label: drUOM[i].UOM + "(" + intAltConFact + " " + strUOM + ")", value: drUOM[i].UOM + "(" + intAltConFact + " " + strUOM + ")" });
                                    this.gPOUOM = strUOM;
                                    this.gPOUOMConversionRate = intAltConFact.toString();
                                }
                                else if (intConverfactor == 1) {
                                    intAltConFact = intAltConFact;
                                    this.ddlRecvUom.push({ label: drUOM[i].UOM + "(" + intAltConFact + " " + strUOM + ")", value: drUOM[i].UOM + "(" + intAltConFact + " " + strUOM + ")" });
                                    this.gPOUOM = strUOM;
                                    this.gPOUOMConversionRate = intAltConFact.toString();
                                }
                                else {
                                    this.ddlRecvUom.push({ label: drUOM[i].UOM + "(" + intAltConFact + "/" + intConverfactor + " " + strUOM + ")", value: drUOM[i].UOM + "(" + intAltConFact + "/" + intConverfactor + " " + strUOM + ")" });
                                    this.gPOUOM = strUOM;
                                    this.gPOUOMConversionRate = intAltConFact.toString();
                                }
                            }
                            else {
                                this.ddlRecvUom.push({ label: drUOM[i].UOM + "(" + intAltConFact + "/" + intConverfactor + " " + strUOM + ")", value: drUOM[i].UOM + "(" + intAltConFact + "/" + intConverfactor + " " + strUOM + ")" });
                            }
                        }
                    }

                    if (strUOM != null) {
                        if (this.gStrUOMEditFlag == YesNo_Enum[YesNo_Enum.Y].toString()) {
                            if (this.gStrAltUOMDisplay == this.gRecv_StandardUOM) {
                                //Not String.IsNullOrEmpty(gItemId) And Then
                                if (intConverfactor != null) {
                                    this.ddlRecvUom.push({ label: strUOM + "(" + intConverfactor + " " + this.standardUOM + ")", value: strUOM + "(" + intConverfactor + " " + this.standardUOM + ")" });
                                } else {
                                    this.ddlRecvUom.push({ label: strUOM + "(" + this.standardUOM + ")", value: strUOM + "(" + this.standardUOM + ")" });
                                }
                            } else if (this.gStrAltUOMDisplay == this.gRecv_PoUOM) {
                                //Not String.IsNullOrEmpty(gItemId) And Then
                                if (intConverfactor != null) {
                                    this.ddlRecvUom.push({ label: strUOM + "(" + intConverfactor / intConverfactor + " " + strUOM + ")", value: strUOM + "(" + intConverfactor / intConverfactor + " " + strUOM + ")" });
                                    this.gPOUOM = strUOM;
                                    this.gPOUOMConversionRate = intConverfactor.toString();
                                } else {
                                    this.ddlRecvUom.push({ label: strUOM + "(" + strUOM + ")", value: strUOM + "(" + strUOM + ")" });
                                    this.gPOUOM = strUOM;
                                    this.gPOUOMConversionRate = "1";
                                }
                            }
                        } else {
                            //Not String.IsNullOrEmpty(gItemId) And Then
                            if (intConverfactor != null) {
                                this.ddlRecvUom.push({ label: strUOM + "(" + intConverfactor / intConverfactor + " " + strUOM + ")", value: strUOM + "(" + intConverfactor / intConverfactor + " " + strUOM + ")" });
                            } else {
                                this.ddlRecvUom.push({ label: strUOM + "(" + strUOM + ")", value: strUOM + "(" + strUOM + ")" });
                            }
                        }
                    } else {
                        this.ddlRecvUom = [];
                    }

                    // Loop the UOM dropdown and comparing with Receive UOM for UOM selection
                    let strListUom: string = null;
                    let arrListUom: string[] = [];
                    if (this.ddlRecvUom != null && this.ddlRecvUom.length > 0) {
                        for (let i = 0; i < this.ddlRecvUom.length; i++) {
                            strListUom = this.ddlRecvUom[i].label.toString();
                            if (strListUom != null && strListUom != undefined && strListUom != "") {
                                arrListUom = strListUom.split('(');
                            }

                            if (strUOM == arrListUom[0]) {
                                this.selectedRecvUom = strListUom;
                                recvDetails.SELECTEDUOM = strListUom;
                            }
                        }
                    }

                } else {
                    intConverfactor = (intConverfactor == 0 ? 1 : intConverfactor);
                    this.ddlRecvUom.push({ label: strUOM + "(" + intConverfactor / intConverfactor + " " + strUOM + ")", value: strUOM + "(" + intConverfactor / intConverfactor + " " + strUOM + ")" });
                }
            } else {
                recvDetails.DDLUOMFLAG = true;
                this.ddlRecvUomEnable = true;
                this.ddlRecvUom = [];
                intConverfactor = (intConverfactor == 0 ? 1 : intConverfactor);
                this.ddlRecvUom.push({ label: strUOM + "(" + intConverfactor / intConverfactor + " " + strUOM + ")", value: strUOM + "(" + intConverfactor / intConverfactor + " " + strUOM + ")" });
            }
            if (this.LotSerialentity != null) {

                this.LotSerialentity.DDLUOMS = this.ddlRecvUom;
                if (this.ddlRecvUom != null && this.ddlRecvUom.length > 0 &&
                    (recvDetails.SELECTEDUOM == null || recvDetails.SELECTEDUOM == "" || recvDetails.SELECTEDUOM == undefined)) {
                    recvDetails.SELECTEDUOM = this.ddlRecvUom[0].value;
                }
                this.LotSerialentity.SELECTED_UOM = recvDetails.SELECTEDUOM;
                this.strLotSerialUom = recvDetails.SELECTEDUOM;
            }
            recvDetails.DDLUOMS = this.ddlRecvUom;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateUOM");
        }
    }

    private async sendIUTOrderToServer(trnsId, recvData: VM_RECV_IUT_ITEMS[], startTime, endTime): Promise<number> {
        try {
            this.statusMsgs = [];

            let iutDetails: VM_RECV_IUT_ITEMS[] = [];
            let iutEntityDtls: VM_RECV_IUT_ITEMS = null;
            let drIUTCountedItem = asEnumerable(recvData).Where(x => x.QTY != "").ToArray();
            for (let i = 0; i < drIUTCountedItem.length; i++) {
                iutEntityDtls = new VM_RECV_IUT_ITEMS();
                iutEntityDtls.TRANSACTION_ID = drIUTCountedItem[i].TRANSACTION_ID;
                iutEntityDtls.DESTIN_BUSINESS_UNIT = drIUTCountedItem[i].DESTIN_BUSINESS_UNIT;
                iutEntityDtls.ORIG_BUSINESS_UNIT = drIUTCountedItem[i].ORIG_BUSINESS_UNIT;
                iutEntityDtls.INTERUNIT_ID = drIUTCountedItem[i].INTERUNIT_ID;

                let dateStr = new Date(new Date()).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                if (this.gSTime != "") {
                    this.gSTime = dateStr.replace(',', '');
                }
                iutEntityDtls.START_DT_TIME = this.gSTime;// Strings.Format(dtStTime, ATPAR_LONGDATETIME_24H);                
                iutEntityDtls.END_DT_TIME = dateStr.replace(',', '');// Strings.Format(dtStTime, ATPAR_LONGDATETIME_24H);                
                iutEntityDtls.USER_ID = this.deviceTokenEntry[TokenEntry_Enum.UserID].toString();
                iutEntityDtls.LINE_NO = drIUTCountedItem[i].LINE_NO
                iutEntityDtls.ITEM_ID = drIUTCountedItem[i].ITEM_ID;
                iutEntityDtls.DESCRIPTION = drIUTCountedItem[i].DESCRIPTION;
                iutEntityDtls.QTY = drIUTCountedItem[i].QTY;
                iutEntityDtls.QTY_SHIPPED = drIUTCountedItem[i].QTY_SHIPPED;
                iutEntityDtls.UOM = drIUTCountedItem[i].UOM;
                iutEntityDtls.CARRIER_ID = drIUTCountedItem[i].CARRIER_ID;
                iutEntityDtls.BILL_OF_LADING = drIUTCountedItem[i].BILL_OF_LADING;

                if ((drIUTCountedItem[i].NO_OF_PKGS != "")) {
                    iutEntityDtls.NO_OF_PKGS = drIUTCountedItem[i].NO_OF_PKGS;
                } else {
                    iutEntityDtls.NO_OF_PKGS = "1";
                }

                iutEntityDtls.INV_LOT_ID = drIUTCountedItem[i].INV_LOT_ID;
                iutEntityDtls.SERIAL_ID = drIUTCountedItem[i].SERIAL_ID;
                iutEntityDtls.INTERUNIT_LINE = drIUTCountedItem[i].INTERUNIT_LINE;
                iutDetails.push(iutEntityDtls);
            }


            if (recvData.length > 0) {
                //try {
                //heck once
                //_drIUTHeader = _dtIUTHeader.NewRow()
                //_drIUTHeader.Item(SendIUT_Header_Enum.PRODUCT_ID) = Integer.Parse(EnumApps.Receiving).ToString()
                //_dtIUTHeader.Rows.Add(_drIUTHeader)
                //_dsInputParameters.Tables.Add(_dtIUTHeader)
                let drIUTHeader: any = [];
                drIUTHeader.push({
                    PRODUCT_ID: EnumApps.Receiving.toString()
                });
                let drIUTTrans: any = [];
                drIUTTrans.push({
                    TRANSACTION_ID: trnsId
                });
                var dictDataItems = {
                    'HEADER': drIUTHeader, 'DETAILS': iutDetails, 'TRANSACTIONS': drIUTTrans
                };
                await this.recvPoNonPoService.sendIUTDetails(dictDataItems).
                    catch(this.httpService.handleError).then((res: Response) => {
                        let data = res.json() as AtParWebApiResponse<number>;
                        this.statusCode = data.StatusCode;
                        switch (data.StatType) {
                            case StatusType.Success: {
                                this.spnrService.stop();
                                break;
                            }
                            case StatusType.Warn: {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                this.spnrService.stop();
                                break;
                            }
                            case StatusType.Error: {
                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                this.spnrService.stop();
                                break;
                            }
                            case StatusType.Custom: {
                                this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                this.spnrService.stop();
                                break;
                            }
                        }

                    });


                if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                } else {
                    return this.statusCode;
                }
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, "sendIUTOrderToServer");
        }
        return this.statusCode;
    }

    private async sendToServer(trnsId, transCode, tempPoId, startTime, endTime): Promise<number> {
        try {
            this.statusMsgs = [];
            this.statusCode = -1;
            this.statusCode = await this.prepareShipment(trnsId, startTime, endTime);
            if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                return this.statusCode;
            }

            var dictDataItems = { 'HEADER': this.lstReceivePoHeaderData, 'DETAILS': this.lstReceiveDetailsData, 'SUBDETAILS': this.receive_itemSubdetails_dt }
            await this.recvPoNonPoService.sendDetails(dictDataItems).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<number>;
                    this.statusCode = data.StatusCode;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.spnrService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.spnrService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spnrService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.spnrService.stop();
                            break;
                        }
                    }
                });
            this.gStrInvoice = "";
            return this.statusCode;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "sendToServer");
        }
        return 0;
    }

    private async prepareShipment(pTransId: string, dtStTime: any = null, dtEndTime: any = null): Promise<number> {
        try {
            this.statusMsgs = [];
            this.statusCode = -1;
            let strTransCode: string = "";
            this.lstReceivePoHeaderData = [];
            this.lstReceiveDetailsData = [];
            let poHedrEntity: VM_RECV_SENDPOHEADER;

            if (this.lstRecvSendPoHdrs != null && this.lstRecvSendPoHdrs.length > 0) {
                poHedrEntity = new VM_RECV_SENDPOHEADER();
                poHedrEntity.BUSINESS_UNIT = this.selectedBUnits;
                poHedrEntity.PO_ID = this.lstRecvSendPoHdrs[0].PO_ID;
                poHedrEntity.VENDOR_ID = this.lstRecvSendPoHdrs[0].VENDOR_ID;
                poHedrEntity.BUSINESS_UNIT_PO = this.lstRecvSendPoHdrs[0].BUSINESS_UNIT;
                strTransCode = this.lstRecvSendPoHdrs[0].TRANSACTION_CODE;
                poHedrEntity.DROP_SHIP_FL = this.lstRecvSendPoHdrs[0].DROP_SHIP_FL;//.DROPSHIP_FL;

                if (strTransCode == "0103") {
                    poHedrEntity.TRANSACTION_CODE = "0104";
                } else {
                    poHedrEntity.TRANSACTION_CODE = strTransCode;
                }
                poHedrEntity.TRANSACTION_ID = this.lstRecvSendPoHdrs[0].TRANSACTION_ID;

                poHedrEntity.START_DT_TIME = dtStTime; //Strings.Format(dtStTime, ATPAR_LONGDATETIME_24H);              
                poHedrEntity.END_DT_TIME = dtEndTime;// Strings.Format(dtEndTime, ATPAR_LONGDATETIME_24H);

                //To Do validation for Carrier and Lading
                //Same as in HHT we are not sending Carrier id and Lading for Headers
                poHedrEntity.CARRIER_ID = "";
                poHedrEntity.BILL_OF_LADING = "";
                if (this.txtInvoice != null && this.txtInvoice != "") {
                    poHedrEntity.INVOICE_NO = this.txtInvoice;
                }

                poHedrEntity.STATUS = EnumApps[EnumApps.Receiving].toString();  // AppTransactionStatus.Receive;
                poHedrEntity.USER_ID = this.deviceTokenEntry[TokenEntry_Enum.UserID].toString();
                poHedrEntity.NON_STOCK_COUNT = this.nonStockCount.toString();
                poHedrEntity.STOCK_COUNT = this.stockCount.toString();
                poHedrEntity.RECEIVER_ID = this.lstRecvSendPoHdrs[0].RECEIVER_ID;
                poHedrEntity.HDR_CMTS = this.lstRecvSendPoHdrs[0].HDR_CMTS;

                if (this.lstRecvSendPoHdrs[0].PO_DT != null) {
                    poHedrEntity.PO_DT = this.lstRecvSendPoHdrs[0].PO_DT;//check Once
                }
                else {
                    poHedrEntity.PO_DT = "";
                }
            }
            // add the header row
            this.lstReceivePoHeaderData.push(poHedrEntity);
            if (strTransCode == "0103") {
                try {
                    let drQtyCounted = asEnumerable(this.lstRecvSendPoLines).Where(x => x.QTY != null && x.RECEIVED_FLAG == YesNo_Enum[YesNo_Enum.Y].toString()).ToArray();
                    for (let i = 0; i < drQtyCounted.length; i++) {
                        let recvLineHdrEntity = new VM_RECV_SENDLINEHEADER();

                        recvLineHdrEntity.LINE_NBR = drQtyCounted[i].LINE_NBR;
                        recvLineHdrEntity.SCHED_NBR = drQtyCounted[i].SCHED_NBR;

                        if (drQtyCounted[i].QTY != null) {
                            recvLineHdrEntity.QTY = drQtyCounted[i].QTY;
                        } else {
                            recvLineHdrEntity.QTY = 0;
                        }

                        recvLineHdrEntity.UNIT_OF_MEASURE = drQtyCounted[i].UNIT_OF_MEASURE;
                        if (drQtyCounted[i].CARRIER_ID != null && drQtyCounted[i].CARRIER_ID != "") {
                            recvLineHdrEntity.CARRIER_ID = drQtyCounted[i].CARRIER_ID;
                        } else {
                            recvLineHdrEntity.CARRIER_ID = " ";
                        }
                        if (drQtyCounted[i].BILL_OF_LADING != null) {
                            if (drQtyCounted[i].BILL_OF_LADING != null && drQtyCounted[i].BILL_OF_LADING != "") {
                                recvLineHdrEntity.BILL_OF_LADING = drQtyCounted[i].BILL_OF_LADING;
                            } else {
                                recvLineHdrEntity.BILL_OF_LADING = " ";
                            }
                        } else {
                            recvLineHdrEntity.BILL_OF_LADING = " ";
                        }

                        recvLineHdrEntity.SHIPTO_ID = drQtyCounted[i].SHIPTO_ID;
                        if (drQtyCounted[i].NO_OF_BOXES != null) {
                            recvLineHdrEntity.NO_OF_BOXES = drQtyCounted[i].NO_OF_BOXES;
                        } else {
                            recvLineHdrEntity.NO_OF_BOXES = 1;
                        }

                        recvLineHdrEntity.INV_ITEM_ID = drQtyCounted[i].INV_ITEM_ID == "" ? " " : drQtyCounted[i].INV_ITEM_ID;
                        recvLineHdrEntity.INVENTORY_ITEM = drQtyCounted[i].INVENTORY_ITEM;
                        recvLineHdrEntity.QTY_PO = drQtyCounted[i].LINE_PO_QTY;

                        if (drQtyCounted[i].TRACKING_ID != null) {
                            if (drQtyCounted[i].TRACKING_ID != "") {
                                recvLineHdrEntity.TRACKING_ID = drQtyCounted[i].TRACKING_ID;
                            } else {
                                recvLineHdrEntity.TRACKING_ID = " ";
                            }
                        } else {
                            recvLineHdrEntity.TRACKING_ID = " ";
                        }
                        //'Checking Concatination of POID to Tracking ID Parameter Checked ''
                        if (recvLineHdrEntity.INVENTORY_ITEM.toString() == YesNo_Enum[YesNo_Enum.N].toString() &&
                            drQtyCounted[i].TRACKING_ID != null) {
                            if (this.gStrNonStockStore == YesNo_Enum[YesNo_Enum.Y].toString()) {
                                if (this.concatinateTrkNoPoID != null) {
                                    if (this.concatinateTrkNoPoID == YesNo_Enum[YesNo_Enum.Y].toString()) {
                                        recvLineHdrEntity.TRACKING_ID = this.txtPONumber.toUpperCase() + "-" + drQtyCounted[i].TRACKING_ID.toString();
                                    }
                                }
                            }
                        }
                        if (drQtyCounted[i].EXT_TRK_NO != null) {
                            if (drQtyCounted[i].EXT_TRK_NO != "") {
                                recvLineHdrEntity.EXT_TRK_NO = drQtyCounted[i].EXT_TRK_NO;
                            } else {
                                recvLineHdrEntity.EXT_TRK_NO = "";
                            }
                        } else {
                            recvLineHdrEntity.EXT_TRK_NO = "";
                        }
                        recvLineHdrEntity.RECEIVING_ROUTING_ID = drQtyCounted[i].RECEIVING_ROUTING_ID;
                        recvLineHdrEntity.CUST_ITEM_NO = drQtyCounted[i].CUST_ITEM_NO;

                        if (drQtyCounted[i].LOCATION != null && drQtyCounted[i].LOCATION != "") {
                            recvLineHdrEntity.LOCATION = drQtyCounted[i].LOCATION;
                        } else {
                            recvLineHdrEntity.LOCATION = "";
                        }

                        recvLineHdrEntity.RECEIVED_QTY = drQtyCounted[i].RECEIVED_QTY;
                        recvLineHdrEntity.RECV_UOM = drQtyCounted[i].RECV_UOM;
                        recvLineHdrEntity.RECV_CONVERSION_RATE = drQtyCounted[i].RECV_CONVERSION_RATE;
                        recvLineHdrEntity.DESCR = drQtyCounted[i].DESCR; //DESCRIPTION
                        let dateStr = new Date(new Date()).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                        recvLineHdrEntity.DUE_DT = dateStr.replace(',', '');// "8/15/00 12:00:00 AM";                      
                        recvLineHdrEntity.STORAGE_LOCATION = drQtyCounted[i].STORAGE_LOCATION ? "" : drQtyCounted[i].STORAGE_LOCATION;
                        this.lstReceiveDetailsData.push(recvLineHdrEntity);
                    }
                }
                catch (ex) {
                    return AtparStatusCodes.E_SERVERERROR;
                }
                // If .Item("LOT_CONTROLLED").ToString = "Y" Or .Item("SERIAL_CONTROLLED").ToString = "Y" Then
                if (this.gStrLotSerial != "None") {
                    try {
                        this.receive_itemSubdetails_dt = [];
                        if (this.lstMainItemLotSerial != null && this.lstMainItemLotSerial.length > 0) {
                            let drSerialLotRows = this.lstMainItemLotSerial.filter(x => ((x.SERIAL_ID != "" && x.SERIAL_ID != null)
                                || (x.LOT_ID != "" && x.LOT_ID != null)) && x.QTY != '0' && x.DELETE_FLAG == 'N');

                            for (let drSerialLot in drSerialLotRows) {
                                this.receive_itemSubdetails_dt.push(drSerialLotRows[drSerialLot]);
                            }
                        }
                    }
                    catch (ex) {
                        this.clientErrorMsg(ex, "prepareShipment");
                    }
                }
                try {
                }
                catch (ex) {
                    return AtparStatusCodes.E_SERVERERROR;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "prepareShipment");
        }
        return AtparStatusCodes.ATPAR_OK;
    }

    private async showModalPopup(drowPrnterData: MT_ATPAR_SETUP_PRO_PRINTERES[]) {
        try {
            if (drowPrnterData != null && drowPrnterData.length > 0) {
                this.printtbl = true;
                this.bysch = false;
                this.tbl = false;
                this.page = false;
                this.nonPO = false;
                this.lstPrintersDetails = [];
                for (let i = 0; i < drowPrnterData.length; i++) {
                    let printerDetalsEntity = new MT_ATPAR_SETUP_PRO_PRINTERES();
                    printerDetalsEntity.APP_ID = drowPrnterData[i].APP_ID;
                    printerDetalsEntity.FRIENDLY_NAME = drowPrnterData[i].FRIENDLY_NAME;
                    printerDetalsEntity.FUNCTIONALITY = drowPrnterData[i].FUNCTIONALITY;
                    printerDetalsEntity.IP_ADDRESS = drowPrnterData[i].IP_ADDRESS;
                    printerDetalsEntity.LABEL_DESCRIPTION = drowPrnterData[i].LABEL_DESCRIPTION;
                    printerDetalsEntity.LABEL_FILE_NAME = drowPrnterData[i].LABEL_FILE_NAME;
                    printerDetalsEntity.LABEL_TYPE = drowPrnterData[i].LABEL_TYPE;
                    printerDetalsEntity.SEQ_NO = drowPrnterData[i].SEQ_NO;
                    printerDetalsEntity.PRINTER_CODE = drowPrnterData[i].PRINTER_CODE;
                    printerDetalsEntity.STATUS = drowPrnterData[i].STATUS;
                    printerDetalsEntity.PORT_NO = drowPrnterData[i].PORT_NO;
                    printerDetalsEntity.UPDATE_DATE = drowPrnterData[i].UPDATE_DATE;
                    printerDetalsEntity.NETWORK_TYPE = drowPrnterData[i].NETWORK_TYPE;
                    printerDetalsEntity.USER_ID = drowPrnterData[i].USER_ID;
                    printerDetalsEntity.LINKED_LABEL_TYPE = drowPrnterData[i].LINKED_LABEL_TYPE;
                    printerDetalsEntity.ActiveStatus = drowPrnterData[i].ActiveStatus;
                    printerDetalsEntity.RBPRINTER = drowPrnterData[i].RBPRINTER;
                    printerDetalsEntity.MODEL = drowPrnterData[i].MODEL;
                    this.lstPrintersDetails.push(printerDetalsEntity);
                }
                if (this.lstPrintersDetails != null && this.lstPrintersDetails.length == 1) {
                    this.selectedPrinterName = this.lstPrintersDetails[0].FRIENDLY_NAME;
                } else {
                    this.selectedPrinterName = "";
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "showModalPopup");
        }
    }

    private async print_NonStockLabel(noofLabels: number, printerDet: MT_ATPAR_SETUP_PRO_PRINTERES[], printerName: string): Promise<number> {
        try {
            this.statusMsgs = [];
            this.statusCode = -1;
            let pPrinterAddressOrName: string = "";
            let pPrinterPort: string = "";
            let pPrinterTye: string = "";
            let pNiceLabelName: string = "";
            let pNoOfPrints: string = "";
            let pErrMsg: string = "";
            let locArray: string[] = [];
            let locDesc: string = "";
            let locID: string = "";
            let intNoOfBoxses: number = 0
            let comments: string = "";
            let strTrackingId: string = "";
            let strFilter: string = "";
            let strCommentsFilter: string = "";
            let strPrevLoc: string = "-1"

            let lstPrintTbl: VM_RECV_PRINTER_HEADER[] = [];
            let drowPrnterDet = [];
            if (printerName == null && printerName == "") {
                drowPrnterDet = asEnumerable(printerDet).Where(x => x.LABEL_DESCRIPTION == "NonStock PO Header").ToArray();   //check once   LABEL_DESCRIPTION   
            } else {
                drowPrnterDet = asEnumerable(printerDet).Where(x => x.LABEL_DESCRIPTION == "NonStock PO Header" && x.FRIENDLY_NAME == printerName).ToArray();//check once LABEL_DESCRIPTION 
            }
            if (drowPrnterDet.length == 0) {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Configure Non Stock Label Printer" });
                return;
            }

            if (this.lstRecvSendPoHdrs.length > 0) {
                pPrinterAddressOrName = drowPrnterDet[0].IP_ADDRESS;
                pPrinterPort = drowPrnterDet[0].PORT_NO;

                if (drowPrnterDet[0].NETWORK_TYPE.toString() == "Mobile") {
                    pPrinterTye = "TcpIP";
                } else {
                    //TO DO
                }

                intNoOfBoxses = noofLabels;
                pNoOfPrints = "1";
                //LABEL_FILE_NAME
                pNiceLabelName = drowPrnterDet[0].LABEL_FILE_NAME;
                let prntResSet = asEnumerable(this.lstRecvSendPoLines).Where(x => x.INVENTORY_ITEM == YesNo_Enum[YesNo_Enum.N].toString()).ToArray();

                let querylst = asEnumerable(prntResSet).Where(x => x.QTY != null).GroupBy(y => y.LOCATION && y.TRACKING_ID && y.DELIVER_TO &&
                    y.ADDRESS1 && y.ADDRESS2 && y.ADDRESS3 && y.PHONE && y.REQ_NUM && y.BUILDING && y.FLOOR && y.SECTOR && y.REQUISITION_NAME && y.BUYER_NAME,
                    (key: VM_RECV_SENDLINEHEADER) => {
                        return key.LOCATION, key.TRACKING_ID, key.DELIVER_TO, key.ADDRESS1, key.ADDRESS2, key.ADDRESS3, key.PHONE,
                            key.REQ_NUM, key.BUILDING, key.FLOOR, key.SECTOR, key.REQUISITION_NAME, key.BUYER_NAME
                    }).ToArray(); //.Select()  check once

                for (let i = 0; i < querylst.length; i++) {
                    let drPrintRow = new VM_RECV_PRINTER_HEADER();
                    drPrintRow.BUSINESS_UNIT = this.lstRecvSendPoHdrs[0].BUSINESS_UNIT.toString();
                    if (asEnumerable(querylst)[i].DELIVER_TO == null) {
                        drPrintRow.DELIVER_TO_NAME = "";
                    } else {
                        drPrintRow.DELIVER_TO_NAME = asEnumerable(querylst)[i].DELIVER_TO;
                    }
                    drPrintRow.DROP_SHIP_FLAG = this.lstRecvSendPoHdrs[0].DROP_SHIP_FL.toString() == "Y" ? "D" : "";
                    drPrintRow.INSPECTION_FLAG = "";
                    drPrintRow.SHIPTO_ID = "";
                    drPrintRow.USER_ID = this.deviceTokenEntry[TokenEntry_Enum.UserID].toString();
                    drPrintRow.PO_ID = this.lstRecvSendPoHdrs[0].PO_ID;
                    drPrintRow.ADDRESS1 = asEnumerable(querylst)[i].ADDRESS1;
                    drPrintRow.ADDRESS2 = asEnumerable(querylst)[i].ADDRESS2;
                    drPrintRow.ADDRESS3 = asEnumerable(querylst)[i].ADDRESS3;
                    drPrintRow.PHONE = asEnumerable(querylst)[i].PHONE;
                    drPrintRow.REQ_NUM = asEnumerable(querylst)[i].REQ_NUM;
                    drPrintRow.BUILDING = asEnumerable(querylst)[i].BUILDING;
                    drPrintRow.FLOOR = asEnumerable(querylst)[i].FLOOR;
                    drPrintRow.SECTOR = asEnumerable(querylst)[i].SECTOR;

                    if (asEnumerable(querylst)[i].REQUISITION_NAME != null && asEnumerable(querylst)[i].REQUISITION_NAME != "") {
                        drPrintRow.REQUISITION_NAME = asEnumerable(querylst)[i].REQUISITION_NAME;
                    } else {
                        drPrintRow.REQUISITION_NAME = "";
                    }

                    if (asEnumerable(querylst)[i].BUYER_NAME && asEnumerable(querylst)[i].BUYER_NAME != null && asEnumerable(querylst)[i].BUYER_NAME != "") {
                        drPrintRow.BUYER_NAME = asEnumerable(querylst)[i].BUYER_NAME;
                    } else {
                        drPrintRow.BUYER_NAME = "";
                    }
                    if (this.lstRecvSendPoHdrs[0].HDR_CMTS != null && this.lstRecvSendPoHdrs[0].HDR_CMTS != "") {
                        comments = this.lstRecvSendPoHdrs[0].HDR_CMTS;
                        drPrintRow.COMMENTS = comments.toString().trim();
                    } else {
                        drPrintRow.COMMENTS = "";
                    }

                    if (this.gStrNonStockStore == YesNo_Enum[YesNo_Enum.Y].toString()) {
                        if (asEnumerable(querylst)[i].TRACKING_ID == "" || asEnumerable(querylst)[i].TRACKING_ID == null) {
                            if (asEnumerable(querylst)[i].LOCATION != strPrevLoc) {
                                this.updateTrackingNumber(strTrackingId, asEnumerable(querylst)[i].LOCATION);
                            }
                        } else {
                            strTrackingId = asEnumerable(querylst)[i].TRACKING_ID;
                        }

                        strPrevLoc = asEnumerable(querylst)[i].LOCATION;
                        if (this.gConcatinateTrkNoPoID != null) {
                            if (this.gConcatinateTrkNoPoID == YesNo_Enum[YesNo_Enum.Y].toString()) {
                                strTrackingId = this.lstRecvSendPoHdrs[0].PO_ID.toString() + "-" + strTrackingId;
                            }
                        }
                    }
                    drPrintRow.TRACKING_NO = strTrackingId;
                    if (asEnumerable(querylst)[i].LOCATION != null && asEnumerable(querylst)[i].LOCATION != "") {
                        locArray = asEnumerable(querylst)[i].LOCATION.toString().split(",");

                        for (let j = 0; j < locArray.length; j++) {
                            if (locArray[j].indexOf("£") > 0) {
                                let locData: string[] = locArray[j].split("£");
                                if (locData != null && locData.length >= 3) {
                                    locID = locData[0];
                                    locDesc = locData[2];
                                } else if (locData != null && locData.length >= 2) {
                                    locID = locData[0];
                                    locDesc = locData[1];
                                }
                            } else {
                                locID = locArray[j];
                                locDesc = "";
                            }

                            drPrintRow.LOCATION_ID = locID;
                            drPrintRow.LOCATION_DESCR = locDesc;

                            for (let k = 1; k <= intNoOfBoxses; k++) {
                                drPrintRow[k].NO_OF_BOXES = k + " of " + intNoOfBoxses;
                                lstPrintTbl.push(drPrintRow);
                                await this.recvPoNonPoService.printNiceLabel(pPrinterAddressOrName, pPrinterPort, pPrinterTye, pNiceLabelName, pNoOfPrints, pErrMsg, lstPrintTbl).
                                    catch(this.httpService.handleError).then((res: Response) => {
                                        let data = res.json() as AtParWebApiResponse<number>;
                                        this.statusCode = data.StatusCode;
                                        switch (data.StatType) {
                                            case StatusType.Success: {
                                                this.spnrService.stop();
                                                break;
                                            }
                                            case StatusType.Warn: {
                                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                this.spnrService.stop();
                                                break;
                                            }
                                            case StatusType.Error: {
                                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                this.spnrService.stop();
                                                break;
                                            }
                                            case StatusType.Custom: {
                                                this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                this.spnrService.stop();
                                                break;
                                            }
                                        }

                                    });
                                if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                                    this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to Print Non Stock Header Label" });
                                    return this.statusCode;
                                }
                                if (this.gStrPrintPoIDComments == YesNo_Enum[YesNo_Enum.Y].toString()) {
                                    if (comments != null && comments.trim() != "") {
                                        let drowPrnterCmts;
                                        if (printerName == null && printerName == "") {
                                            drowPrnterCmts = asEnumerable(this.lstSetUpProPrinters).Where(x => x.LABEL_DESCRIPTION == "Po Comments").ToArray();   //check once   LABEL_DESCRIPTION  
                                        } else {
                                            drowPrnterCmts = asEnumerable(this.lstSetUpProPrinters).Where(x => x.LABEL_DESCRIPTION == "Po Comments" && x.FRIENDLY_NAME == printerName).ToArray();//check once LABEL_DESCRIPTION  
                                        }
                                        if (drowPrnterCmts.length == 0) {
                                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Configure Non Stock Comments Label Printer" });

                                        } else {
                                            let pNiceLabelName1 = drowPrnterCmts[0].LABEL_FILE_NAME;
                                            try {
                                                await this.recvPoNonPoService.printNiceLabel(pPrinterAddressOrName, pPrinterPort, pPrinterTye, pNiceLabelName1, pNoOfPrints, pErrMsg, lstPrintTbl).
                                                    catch(this.httpService.handleError).then((res: Response) => {
                                                        let data = res.json() as AtParWebApiResponse<number>;
                                                        this.statusCode = data.StatusCode;
                                                        switch (data.StatType) {
                                                            case StatusType.Success: {
                                                                this.spnrService.stop();
                                                                break;
                                                            }
                                                            case StatusType.Warn: {
                                                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                                this.spnrService.stop();
                                                                break;
                                                            }
                                                            case StatusType.Error: {
                                                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                                this.spnrService.stop();
                                                                break;
                                                            }
                                                            case StatusType.Custom: {
                                                                this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                                this.spnrService.stop();
                                                                break;
                                                            }
                                                        }

                                                    });
                                                if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                                                    this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to Print Non Stock Coments Label" });
                                                    return this.statusCode;
                                                }
                                            } catch (ex) {
                                                this.clientErrorMsg(ex, "print_NonStockLabel");
                                                return AtparStatusCodes.E_SERVERERROR;
                                            }
                                        }
                                    }
                                }
                                lstPrintTbl = null;
                            }
                        }
                    } else {
                        drPrintRow.LOCATION_ID = "";
                        drPrintRow.LOCATION_DESCR = "";
                        for (let k = 1; k < intNoOfBoxses; k++) {
                            drPrintRow[k].NO_OF_BOXES = k + " of " + intNoOfBoxses;
                            lstPrintTbl.push(drPrintRow);
                            await this.recvPoNonPoService.printNiceLabel(pPrinterAddressOrName, pPrinterPort, pPrinterTye, pNiceLabelName, pNoOfPrints, pErrMsg, lstPrintTbl).
                                catch(this.httpService.handleError).then((res: Response) => {
                                    let data = res.json() as AtParWebApiResponse<number>;
                                    this.statusCode = data.StatusCode;
                                    switch (data.StatType) {
                                        case StatusType.Success: {
                                            this.spnrService.stop();
                                            break;
                                        }
                                        case StatusType.Warn: {
                                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            this.spnrService.stop();
                                            break;
                                        }
                                        case StatusType.Error: {
                                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            this.spnrService.stop();
                                            break;
                                        }
                                        case StatusType.Custom: {
                                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            this.spnrService.stop();
                                            break;
                                        }
                                    }
                                });

                            if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to Print Non Stock Header Label" });
                                return this.statusCode;
                            }

                            if (this.gStrPrintPoIDComments == YesNo_Enum[YesNo_Enum.Y].toString()) {
                                if (comments != null && comments.trim() != "") {
                                    let drowPrnterCmts;
                                    if (printerName == null && printerName == "") {
                                        drowPrnterCmts = asEnumerable(this.lstSetUpProPrinters).Where(x => x.LABEL_DESCRIPTION == "Po Comments").ToArray();   //check once   LABEL_DESCRIPTION  
                                    } else {
                                        drowPrnterCmts = asEnumerable(this.lstSetUpProPrinters).Where(x => x.LABEL_DESCRIPTION == "Po Comments" && x.FRIENDLY_NAME == printerName).ToArray();//check once LABEL_DESCRIPTION  
                                    }
                                    if (drowPrnterCmts.length == 0) {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Configure Non Stock Label Printer" });
                                    } else {
                                        let pNiceLabelName1 = drowPrnterCmts[0].LABEL_FILE_NAME.toString();
                                        try {
                                            await this.recvPoNonPoService.printNiceLabel(pPrinterAddressOrName, pPrinterPort, pPrinterTye, pNiceLabelName1, pNoOfPrints, pErrMsg, lstPrintTbl).
                                                catch(this.httpService.handleError).then((res: Response) => {
                                                    let data = res.json() as AtParWebApiResponse<number>;
                                                    this.statusCode = data.StatusCode;
                                                    switch (data.StatType) {
                                                        case StatusType.Success: {
                                                            this.spnrService.stop();
                                                            break;
                                                        }
                                                        case StatusType.Warn: {
                                                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                            this.spnrService.stop();
                                                            break;
                                                        }
                                                        case StatusType.Error: {
                                                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                            this.spnrService.stop();
                                                            break;
                                                        }
                                                        case StatusType.Custom: {
                                                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                            this.spnrService.stop();
                                                            break;
                                                        }
                                                    }

                                                });
                                            if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to Print Non Stock Coments Label" });
                                                return this.statusCode;
                                            }
                                        }
                                        catch (ex) {
                                            this.clientErrorMsg(ex, "print_NonStockLabel");
                                            return AtparStatusCodes.E_SERVERERROR;
                                        }
                                    }
                                }
                            }
                            lstPrintTbl = null;
                        }
                    }
                }
            }
            if (this.gPrintStockHeader != null) {
                if (this.gPrintStockHeader == YesNo_Enum[YesNo_Enum.Y].toString()) {
                    if (this.gStrSelPrinter == YesNo_Enum[YesNo_Enum.Y].toString()) {
                        drowPrnterDet == asEnumerable(this.lstSetUpProPrinters).Where(x => x.LABEL_DESCRIPTION == "Stock PO Header").ToArray();//LABEL_DESCRIPTION
                        let drowRecStockStatus = asEnumerable(this.lstRecvSendPoLines).Where(x => x.QTY != null && x.RECEIVED_FLAG == YesNo_Enum[YesNo_Enum.Y].toString() && x.INVENTORY_ITEM == YesNo_Enum[YesNo_Enum.Y].toString()).ToArray();
                        if ((drowRecStockStatus.length > 0)) {
                            this.showModalPopup(drowPrnterDet);
                        }
                    } else {
                        this.statusCode = await this.print_StockLabel(intNoOfBoxses, this.lstSetUpProPrinters, "");//intNoOfBoxses, poDS, pPrintDetailsDS.Tables(0), ""
                        if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to Print Stock Label" });
                        }
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "print_NonStockLabel");
            return AtparStatusCodes.E_SERVERERROR;
        }
        return AtparStatusCodes.ATPAR_OK;
    }

    private async print_StockLabel(noofLabels: number, printerDet: MT_ATPAR_SETUP_PRO_PRINTERES[], printerName: string): Promise<number> {
        try {
            this.statusMsgs = [];
            this.statusCode = -1;
            let pPrinterAddressOrName: string = "";
            let pPrinterPort: string = "";
            let pPrinterTye: string = "";
            let pNiceLabelName: string = "";
            let pNoOfPrints: string = "";
            let pErrMsg: string = "";
            let locArray: string[] = null;
            let locDesc: string = "";
            let locID: string = "";
            let intNoOfBoxses: number = 0;
            let Comments: string = "";
            let businessUnitIn: string = "";
            let strFilter: string = "";
            let strTrackingId: string = "";
            let strPrevLoc: string = "-1";
            let lstPrintTbl: VM_RECV_PRINTER_HEADER[] = [];
            let drowPrnterDet = [];
            if (printerName == null && printerName == "") {
                drowPrnterDet = asEnumerable(printerDet).Where(x => x.LABEL_DESCRIPTION == "Stock PO Header").ToArray();   //check once   LABEL_DESCRIPTION
            } else {
                drowPrnterDet = asEnumerable(printerDet).Where(x => x.LABEL_DESCRIPTION == "Stock PO Header" && x.FRIENDLY_NAME == printerName).ToArray();//check once LABEL_DESCRIPTION             
            }

            if (drowPrnterDet.length == 0) {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Configure Non Stock Label Printer" });
                return;
            }

            if (this.lstRecvSendPoHdrs.length > 0) {
                pPrinterAddressOrName = drowPrnterDet[0].IP_ADDRESS;
                pPrinterPort = drowPrnterDet[0].PORT_NO;

                if (drowPrnterDet[0].NETWORK_TYPE.toString() == "Mobile") {
                    pPrinterTye = "TcpIP";
                } else {
                    //TO Do for Remaining printer types
                }

                intNoOfBoxses = noofLabels;
                pNoOfPrints = "1";
                pNiceLabelName = drowPrnterDet[0].LABEL_FILE_NAME;
                let prntResSet = asEnumerable(this.lstRecvSendPoLines).Where(x => x.INVENTORY_ITEM == YesNo_Enum[YesNo_Enum.Y].toString()).ToArray();

                let querylst = asEnumerable(prntResSet).Where(x => x.QTY != null).GroupBy(y => y.STORAGE_LOCATION && y.TRACKING_ID && y.DELIVER_TO &&
                    y.ADDRESS1 && y.ADDRESS2 && y.ADDRESS3 && y.PHONE && y.REQ_NUM,
                    (key: VM_RECV_SENDLINEHEADER) => {
                        return key.STORAGE_LOCATION, key.TRACKING_ID, key.DELIVER_TO, key.ADDRESS1, key.ADDRESS2, key.ADDRESS3, key.PHONE,
                            key.REQ_NUM
                    }).ToArray(); //Select LOCATION = Key0, TRACKING_ID = Key1, DELIVER_TO = Key2, ADDRESS1 = Key3,

                if (querylst.length == 0) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Stock Items to Print" });
                    return AtparStatusCodes.ATPAR_OK;
                }

                for (let i = 0; i < querylst.length; i++) {
                    let drPrintRow = new VM_RECV_PRINTER_HEADER();
                    drPrintRow.BUSINESS_UNIT = this.lstRecvSendPoHdrs[0].BUSINESS_UNIT.toString();
                    if (asEnumerable(querylst)[i].DELIVER_TO == null) {
                        drPrintRow.DELIVER_TO_NAME = "";
                    } else {
                        drPrintRow.DELIVER_TO_NAME = asEnumerable(querylst)[i].DELIVER_TO;
                    }

                    drPrintRow.DROP_SHIP_FLAG = this.lstRecvSendPoHdrs[0].DROP_SHIP_FL.toString() == YesNo_Enum[YesNo_Enum.Y].toString() ? "D" : "";
                    drPrintRow.INSPECTION_FLAG = "";
                    drPrintRow.SHIPTO_ID = "";
                    drPrintRow.USER_ID = this.deviceTokenEntry[TokenEntry_Enum.UserID].toString();
                    drPrintRow.PO_ID = this.lstRecvSendPoHdrs[0].PO_ID.toString();
                    drPrintRow.REQ_NUM = asEnumerable(querylst)[i].REQ_NUM;

                    if (this.gStrNonStockStore == YesNo_Enum[YesNo_Enum.Y].toString()) {
                        if (asEnumerable(querylst)[i].TRACKING_ID == null || asEnumerable(querylst)[i].TRACKING_ID == "") {
                            if (asEnumerable(querylst)[i].LOCATION.toString() != strPrevLoc) {
                                await this.updateTrackingNumber(strTrackingId, asEnumerable(querylst)[i].LOCATION.toString());
                            }
                        } else {
                            strTrackingId = asEnumerable(querylst)[i].TRACKING_ID;
                        }
                    }
                    drPrintRow.TRACKING_NO = strTrackingId;

                    if (asEnumerable(querylst)[i].LOCATION == null || asEnumerable(querylst)[i].LOCATION == "") {
                        businessUnitIn = "";
                    } else {
                        businessUnitIn = asEnumerable(querylst)[i].LOCATION;
                    }

                    if (asEnumerable(querylst)[i].LOCATION != null && asEnumerable(querylst)[i].LOCATION != "") {
                        locArray = asEnumerable(querylst)[i].LOCATION.toString().split(",");

                        for (let j = 0; j < locArray.length; j++) {
                            if (locArray[j].indexOf("£") > 0) {
                                let locData: string[] = locArray[j].split("£");
                                if (locData != null && locData.length >= 3) {
                                    locID = locData[0];
                                    locDesc = locData[2];
                                } else if (locData != null && locData.length >= 2) {
                                    locID = locData[0];
                                    locDesc = locData[1];
                                }
                            } else {
                                locID = locArray[j];
                                locDesc = "";
                            }

                            drPrintRow.LOCATION_ID = locID;
                            drPrintRow.LOCATION_DESCR = locDesc;
                            for (let k = 1; k <= intNoOfBoxses; k++) {
                                drPrintRow[k].NO_OF_BOXES = k + " of " + intNoOfBoxses;
                                lstPrintTbl.push(drPrintRow);
                            }
                        }

                    } else {
                        drPrintRow.LOCATION_ID = "";
                        drPrintRow.LOCATION_DESCR = "";
                        try {
                            for (let k = 1; k <= intNoOfBoxses; k++) {
                                drPrintRow[k].NO_OF_BOXES = k + " of " + intNoOfBoxses;
                                lstPrintTbl.push(drPrintRow);
                            }

                        } catch (ex) {
                            this.clientErrorMsg(ex, "print_StockLabel");
                            return AtparStatusCodes.E_SERVERERROR;
                        }
                    }
                }
                if (lstPrintTbl.length > 0) {
                    await this.recvPoNonPoService.printNiceLabel(pPrinterAddressOrName, pPrinterPort, pPrinterTye, pNiceLabelName, pNoOfPrints, pErrMsg, lstPrintTbl).
                        catch(this.httpService.handleError).then((res: Response) => {
                            let data = res.json() as AtParWebApiResponse<number>;
                            this.statusCode = data.StatusCode;
                            switch (data.StatType) {
                                case StatusType.Success: {
                                    this.spnrService.stop();
                                    break;
                                }
                                case StatusType.Warn: {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    this.spnrService.stop();
                                    break;
                                }
                                case StatusType.Error: {
                                    this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    this.spnrService.stop();
                                    break;
                                }
                                case StatusType.Custom: {
                                    this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    this.spnrService.stop();
                                    break;
                                }
                            }

                        });

                    if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                        this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to Print Stock Header Label" });
                        return this.statusCode;
                    }
                }
            }
            return AtparStatusCodes.ATPAR_OK;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "print_StockLabel");
            return AtparStatusCodes.E_SERVERERROR;
        }
    }

    private async prepareStationaryPrinting(invItemType: string, blnPrinted: boolean): Promise<number> {
        try {
            this.statusMsgs = [];
            this.statusCode = -1;
            let functionReturnValue: number = 0;
            let trackingNbr: string = "";
            let strPrevLoc: string = "-1";

            let drowRecStatus = asEnumerable(this.lstRecvSendPoLines).Where(x => x.QTY != null).ToArray();//LINE_QTY
            if (drowRecStatus.length == 0) {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "PO in Downloaded status,please receive it to print" });
                return functionReturnValue;
            }

            this.statusCode = await this.getStationaryDelveryToDetails();
            let dtDeliverto = asEnumerable(this.lstRecvSendPoLines).Distinct(s => s.LOCATION && s.DELIVER_TO && s.TRACKING_ID).ToArray();
            if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                return functionReturnValue;
            }

            if (dtDeliverto != undefined && dtDeliverto != null && dtDeliverto.length > 0) {
                for (let i = 0; i < dtDeliverto.length; i++) {
                    if (dtDeliverto[i].TRACKING_ID == null || dtDeliverto[i].TRACKING_ID == "") {
                        var currentdate = new Date();
                        await this.recvPoNonPoService.generateTrackingNumber().catch(this.httpService.handleError).then((res: Response) => {
                            let data = res.json() as AtParWebApiResponse<string>;
                            let testdata = data;
                            trackingNbr = testdata.toString();
                        });
                        //  trackingNbr = (currentdate.getMonth() + 1) + this.AddZero(currentdate.getDate()) + currentdate.getFullYear() + currentdate.getHours() + currentdate.getMinutes() + currentdate.getSeconds();

                        if (dtDeliverto[i].LOCATION.toString() != strPrevLoc) {
                            await this.updateTrackingNumber(trackingNbr, dtDeliverto[i].LOCATION.toString());
                        }
                    } else {
                        trackingNbr = dtDeliverto[i].TRACKING_ID;
                    }

                    this.statusCode = await this.prepareStationaryInputDataset(dtDeliverto[i].LOCATION, dtDeliverto[i].DELIVER_TO, trackingNbr, invItemType);

                    if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                        return this.statusCode;
                    }
                    strPrevLoc = dtDeliverto[i].LOCATION;// asEnumerable(dtDeliverto).ToArray[i].LOCATION;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "prepareStationaryPrinting");
        }
        return this.statusCode;
    }

    private async printReceiveItemLabel(noofLabels: number, printerDet: MT_ATPAR_SETUP_PRO_PRINTERES[], printerName: string): Promise<number> {
        try {
            this.statusMsgs = [];
            this.statusCode = -1;
            let functionReturnValue: number = 0;
            let pPrinterAddressOrName: string = "";
            let pPrinterPort: string = "";
            let pPrinterTye: string = "";
            let pNiceLabelName: string = "";
            let pNoOfPrints: string = "";
            let pErrMsg: string = "";
            let intNoOfBoxses: number = 0;
            let locArray: string[] = [];
            let locDesc: string = "";
            let locID: string = "";
            let itemType: string = "";
            let strConvFact: string = "";
            let strFilter: string = "";
            let lstPrintTbl: VM_PRINTLABEL_RECEIVE_HEADER[] = [];

            let resTbl = asEnumerable(this.lstRecvSendPoLines).Where(x => x.INV_ITEM_ID == this.hdnInvItemId && x.LINE_NBR == this.hdnItmLineNo && x.SCHED_NBR == this.hdnItmSchedLineNo).ToArray()
            for (let i = 0; i < resTbl.length; i++) {
                if (resTbl[i].INVENTORY_ITEM.toString() == YesNo_Enum[YesNo_Enum.Y].toString()) {
                    itemType = "Stock Item";
                } else {
                    itemType = "NonStock Item";
                }
                let drowPrnterDet = null;
                if (printerName == "") {
                    drowPrnterDet = asEnumerable(printerDet).Where(x => x.LABEL_DESCRIPTION == itemType).ToArray();
                } else {
                    drowPrnterDet = asEnumerable(printerDet).Where(x => x.LABEL_DESCRIPTION == itemType && x.FRIENDLY_NAME == printerName).ToArray();
                }
                if (drowPrnterDet == null || drowPrnterDet.length == 0) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Configure " + itemType + " Label Printer" });
                    return functionReturnValue;
                }
                pPrinterAddressOrName = drowPrnterDet[0].IP_ADDRESS;
                pPrinterPort = drowPrnterDet[0].PORT_NO;

                if (drowPrnterDet[0].NETWORK_TYPE == "Mobile") {
                    pPrinterTye = "TcpIP";

                } else {
                }

                intNoOfBoxses = noofLabels;
                pNoOfPrints = "1";
                pNiceLabelName = drowPrnterDet[0].LABEL_FILE_NAME;

                let drPrintRow = new VM_PRINTLABEL_RECEIVE_HEADER();
                drPrintRow.BUSINESS_UNIT = this.lstRecvSendPoHdrs[0].BUSINESS_UNIT;
                drPrintRow.TRACKING_NO = this.txtTrk;
                drPrintRow.DELIVER_TO_NAME = resTbl[i].DELIVER_TO;
                drPrintRow.PO_ID = this.lstRecvSendPoHdrs[0].PO_ID;
                drPrintRow.SHIPTO_ID = resTbl[i].SHIPTO_ID;
                drPrintRow.ITEM_ID = resTbl[i].INV_ITEM_ID;
                drPrintRow.MANF_ITEM_ID = resTbl[i].MFG_ITEM_ID;
                drPrintRow.VENDOR_ITEM_ID = resTbl[i].ITM_ID_VNDR;
                drPrintRow.UPC_ID = resTbl[i].UPC_ID;
                if (resTbl[i].REQUISITION_NAME != null) {
                    drPrintRow.REQUISITION_NAME = resTbl[i].REQUISITION_NAME;
                } else {
                    drPrintRow.REQUISITION_NAME = " ";
                }
                if (resTbl[i].BUYER_NAME != null && resTbl[i].BUYER_NAME != null) {
                    drPrintRow.BUYER_NAME = resTbl[i].BUYER_NAME;
                } else {
                    drPrintRow.BUYER_NAME = "";
                }
                if (resTbl[i].BUILDING != null) {
                    drPrintRow.BUILDING = resTbl[i].BUILDING;
                } else {
                    drPrintRow.BUILDING = " ";
                }
                if (resTbl[i].FLOOR != null) {
                    drPrintRow.FLOOR = resTbl[i].FLOOR;
                } else {
                    drPrintRow.FLOOR = " ";
                }
                if (resTbl[i].SECTOR != null) {
                    drPrintRow.SECTOR = resTbl[i].SECTOR;
                } else {
                    drPrintRow.SECTOR = " ";
                }

                if (resTbl[i].LOCATION != null) {
                    locArray = resTbl[i].LOCATION.toString().split(",");

                    for (let j = 0; j < locArray.length; j++) {
                        if (locArray[j].indexOf("£") > 0) {
                            let locData: string[] = locArray[j].split("£");
                            if (locData != null && locData.length >= 3) {
                                locID = locData[0];
                                locDesc = locData[2];
                            } else if (locData != null && locData.length >= 2) {
                                locID = locData[0];
                                locDesc = locData[1];
                            }
                        } else {
                            locID = locArray[j];
                            locDesc = "";
                        }
                        drPrintRow.LOCATION_ID = locID;
                        drPrintRow.LOCATION_DESCR = locDesc;
                    }
                } else {
                    drPrintRow.LOCATION_ID = "";
                    drPrintRow.LOCATION_DESCR = "";
                }

                let strTrackingId: string = "";
                if (this.gStrNonStockStore == YesNo_Enum[YesNo_Enum.Y].toString()) {
                    if (resTbl[i].TRACKING_ID == "" || resTbl[i].TRACKING_ID == null) {
                        await this.updateItemTrackingNumber(strTrackingId, resTbl[i].INV_ITEM_ID.toString(), resTbl[i].LINE_NBR.toString());
                    } else {
                        strTrackingId = resTbl[i].TRACKING_ID.toString();
                    }
                }
                drPrintRow.TRACKING_NO = strTrackingId;

                if (resTbl[i].INVENTORY_ITEM == YesNo_Enum[YesNo_Enum.Y].toString()) {
                    drPrintRow.LOCATION_ID = resTbl[i].STORAGE_LOCATION;
                } else {
                    drPrintRow.LOCATION_ID = locID;
                }

                drPrintRow.CUST_ITEM_NO = resTbl[i].CUST_ITEM_NO;
                drPrintRow.GTIN = resTbl[i].GTIN;
                drPrintRow.ITEM_DESCR = resTbl[i].DESCR;
                drPrintRow.INSPECTION_FLAG = resTbl[i].INSP_FLAG;
                drPrintRow.DROP_SHIP_FLAG = this.lstRecvSendPoHdrs[0].DROP_SHIP_FL.toString() == YesNo_Enum[YesNo_Enum.Y].toString() ? "D" : "";
                drPrintRow.RECEIVED_QTY = resTbl[i].QTY.toString();
                drPrintRow.RECEIVE_UOM = resTbl[i].RECV_UOM;

                if (!(resTbl[i].ISSUE_UOM == null || resTbl[i].CONVERSION_RATE == null)) {
                    strConvFact = resTbl[i].CONVERSION_RATE.toString() + " " + resTbl[i].ISSUE_UOM.toString();
                } else {
                    strConvFact = "";
                }
                drPrintRow.CONVERSION_RATE = strConvFact;
                drPrintRow.ADDRESS1 = resTbl[i].ADDRESS1;
                drPrintRow.ADDRESS2 = resTbl[i].ADDRESS2;
                drPrintRow.ADDRESS3 = resTbl[i].ADDRESS3;
                drPrintRow.BUSINESS_UNIT_IN = locID;
                drPrintRow.REQ_NUM = resTbl[i].REQ_NUM;
                drPrintRow.COMMENTS = resTbl[i].COMMENTS;

                if (resTbl[i].PACKAGING_STRING != null) {
                    drPrintRow.PACKAGING_STRING = resTbl[i].PACKAGING_STRING;
                } else {
                    drPrintRow.PACKAGING_STRING = resTbl[i].PACKAGING_STRING;
                }
                drPrintRow.RECEIPT_DT = this.deviceTokenEntry[TokenEntry_Enum.DateTime].toString();
                drPrintRow.USER_ID = this.deviceTokenEntry[TokenEntry_Enum.UserID].toString();

                for (let k = 1; k <= intNoOfBoxses; k++) {

                    drPrintRow.NO_OF_BOXES = k + " of " + intNoOfBoxses;
                    lstPrintTbl.push(drPrintRow);
                }
            }
            try {
                if (lstPrintTbl.length > 0) {
                    await this.recvPoNonPoService.printNiceLabel(pPrinterAddressOrName, pPrinterPort, pPrinterTye, pNiceLabelName, pNoOfPrints, pErrMsg, lstPrintTbl).
                        catch(this.httpService.handleError).then((res: Response) => {
                            let data = res.json() as AtParWebApiResponse<number>;
                            this.statusCode = data.StatusCode;
                            switch (data.StatType) {
                                case StatusType.Success: {
                                    this.spnrService.stop();
                                    this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Label Printed Sucessfully " });
                                    break;
                                }
                                case StatusType.Warn: {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    this.spnrService.stop();
                                    break;
                                }
                                case StatusType.Error: {
                                    this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    this.spnrService.stop();
                                    break;
                                }
                                case StatusType.Custom: {
                                    this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    this.spnrService.stop();
                                    break;
                                }
                            }

                        });

                    //if (_StatusCode != ATPAR_OK) {
                    //    DisplayPrintMessages("Failed to Print " + ItemType + " Label  ", lblErrorCode, "ErrMessage");
                    //    return _StatusCode;
                    //} else {
                    //    DisplayPrintMessages("Label Printed Sucessfully ", lblErrorCode, "StatusMessage");
                    //}
                }
            } catch (ex) {
                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Internal Server Error " });
                return AtparStatusCodes.E_SERVERERROR;
            }
            return AtparStatusCodes.ATPAR_OK;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "printReceiveItemLabel");
        }
    }

    private async getStationaryDelveryToDetails(): Promise<number> {
        try {
            let resTbl = asEnumerable(this.lstRecvSendPoLines).Where(x => x.QTY != null).GroupBy(x => x.LOCATION && x.TRACKING_ID && x.DELIVER_TO).ToArray();
            //LINE_QTY
        } catch (ex) {
            this.clientErrorMsg(ex, "getStationaryDelveryToDetails");
        }
        return 0;
    }

    private async updateItemTrackingNumber(trackingNbr: string, itemId: string, lineNbr: string) {
        try {
            this.statusMsgs = [];
            this.statusCode = -1;
            for (let i = 0; i < this.lstRecvSendPoLines.length; i++) {
                if (this.lstRecvSendPoLines[i].INV_ITEM_ID == itemId && this.lstRecvSendPoLines[i].LINE_NBR == parseInt(lineNbr)) {
                    this.lstRecvSendPoLines[i].TRACKING_ID = trackingNbr;
                }
            }

            if (this.lstRecvSendPoLines != null) {
                if ((this.lstRecvSendPoLines != null) && this.lstRecvSendPoLines.length > 0) {
                    for (let i = 0; i < this.lstRecvSendPoLines.length; i++) {
                        if (this.lstRecvSendPoLines[i].INV_ITEM_ID == itemId && this.lstRecvSendPoLines[i].LINE_NBR == parseInt(lineNbr)) {
                            this.lstRecvSendPoLines[i].TRACKING_ID = trackingNbr;
                        }
                    }
                }
            }

            if (this.lstRecvSendPoLines != null) {
                for (let i = 0; i < this.lstRecvSendPoLines.length; i++) {
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "updateItemTrackingNumber");
        }
    }

    private async updateTrackingNumber(trackingNbr: string, location: string) {
        try {
            this.statusMsgs = [];
            this.statusCode = -1;
            for (let i = 0; i < this.lstRecvSendPoLines.length; i++) {
                if (this.lstRecvSendPoLines[i].LOCATION == location) {
                    this.lstRecvSendPoLines[i].TRACKING_ID = trackingNbr;
                }
            }

            if (this.lstRecvSendPoLines != null) {
                if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                    for (let i = 0; i < this.lstRecvSendPoLines.length; i++) {
                        if (this.lstRecvSendPoLines[i].LOCATION == location) {
                            this.lstRecvSendPoLines[i].TRACKING_ID = trackingNbr;
                        }
                    }
                }
            }

            if (this.lstRecvSendPoLines != null) {
                for (let i = 0; i < this.lstRecvSendPoLines.length; i++) {
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "updateTrackingNumber");
        }
    }

    private async prepareStationaryInputDataset(pLocation: string, pDeliverTo: string, pTrackingNbr: string, invItemType: string): Promise<number> {
        try {
            this.statusMsgs = [];
            this.statusCode = -1;

            let strFilter: string = "";
            let locArray: string[] = null;
            let locDesc: string = "";
            let locID: string = "";
            let intNoOfBoxses: number = 0;

            let dtHedTbl: VM_RECV_SENDPOHEADER[] = [];
            let dtItemSet: VM_RECV_SENDLINEHEADER[] = [];;
            let dtDetails: VM_RECV_SENDLINEHEADER[] = [];

            if (this.txtPkgs != null) {
                intNoOfBoxses = parseInt(this.txtPkgs);
            } else {
                intNoOfBoxses = 1;
            }

            let dateStr = new Date(new Date()).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
            //let eTime = new Date(dateStr);
            if (this.lstRecvSendPoHdrs.length > 0) {
                let drHedrow = new VM_RECV_SENDPOHEADER();
                drHedrow.END_DT_TIME = dateStr.replace(',', '');// Strings.Format(eTime, ATPAR_LONGDATETIME_24H);
                drHedrow.PO_ID = this.lstRecvSendPoHdrs[0].PO_ID;
                drHedrow.LOCATION = pLocation;
                drHedrow.DELIVER_TO = pDeliverTo;
                drHedrow.TRACKING_NBR = pTrackingNbr;
                drHedrow.HDR_CMTS = this.lstRecvSendPoHdrs[0].HDR_CMTS;

                dtHedTbl.push(drHedrow);

                if (pDeliverTo != null && pDeliverTo != "") {
                    dtItemSet = asEnumerable(this.lstRecvSendPoLines).Where(x => x.DELIVER_TO == pDeliverTo).ToArray();
                } else {
                    dtItemSet = asEnumerable(this.lstRecvSendPoLines).Where(x => x.DELIVER_TO == "" || x.DELIVER_TO == null).ToArray();
                }

                if (pLocation != null && pLocation != "") {
                    dtItemSet = asEnumerable(this.lstRecvSendPoLines).Where(x => x.DELIVER_TO == pDeliverTo && x.INVENTORY_ITEM == invItemType && x.LOCATION == pLocation && x.QTY != null && x.QTY.toString() != "").ToArray();//LINE_QTY //.replace("'", "''")
                } else {
                    dtItemSet = asEnumerable(this.lstRecvSendPoLines).Where(x => (x.DELIVER_TO == "" || x.DELIVER_TO == null) && x.INVENTORY_ITEM == invItemType && (x.LOCATION == "" || x.LOCATION == null) && x.QTY != null && x.QTY.toString() != "").ToArray();//LINE_QTY
                }

                if (dtItemSet != null && dtItemSet.length > 0) {
                    for (let i = 0; i < dtItemSet.length; i++) {
                        let drItemrow = new VM_RECV_SENDLINEHEADER();
                        if (dtItemSet[i].INV_ITEM_ID != null && dtItemSet[i].INV_ITEM_ID != "") {
                            if (dtItemSet[i].DESCR && dtItemSet[i].DESCR != "") {
                                drItemrow.ITEMID_DESC = dtItemSet[i].INV_ITEM_ID.toString() + "-" + dtItemSet[i].DESCR.toString();
                            } else {
                                drItemrow.ITEMID_DESC = dtItemSet[i].INV_ITEM_ID.toString();
                            }
                        } else {
                            if (dtItemSet[i].DESCR != null && dtItemSet[i].DESCR != "") {
                                drItemrow.ITEMID_DESC = dtItemSet[i].DESCR;
                            } else {
                                drItemrow.ITEMID_DESC = "";
                            }
                        }
                        drItemrow.UNIT_OF_MEASURE = dtItemSet[i].UNIT_OF_MEASURE;
                        drItemrow.RECV_UOM = dtItemSet[i].RECV_UOM;
                        drItemrow.QTY_PO = dtItemSet[i].QTY_PO;

                        if (dtItemSet[i].QTY != null) {//LINE_QTY
                            drItemrow.OPENQTY = (dtItemSet[i].QTY_PO) - ((dtItemSet[i].QTY) * (dtItemSet[i].RECV_CONVERSION_RATE));//LINE_QTY

                            drItemrow.QTY = dtItemSet[i].QTY;//.LINE_QTY;
                        } else {
                            drItemrow.OPENQTY = dtItemSet[i].QTY_PO;
                            drItemrow.QTY = null;
                        }
                        drItemrow.STORAGE_LOCATION = dtItemSet[i].STORAGE_LOCATION;
                        drItemrow.MFG_ITEM_ID = dtItemSet[i].MFG_ITEM_ID;
                        drItemrow.ITM_ID_VNDR = dtItemSet[i].ITM_ID_VNDR;
                        drItemrow.REQ_NUM = dtItemSet[i].REQ_NUM;
                        dtDetails.push(drItemrow);
                    }
                }
                if (dtDetails != null && dtDetails.length > 0) {
                    if (pLocation != null && pLocation != "") {
                        locArray = pLocation.split(",");
                        for (let j = 0; j < locArray.length; j++) {
                            if (locArray[j] != null && locArray[j].indexOf("£") > 0) {
                                let locData: string[] = locArray[j].split("£");
                                if (locData != null && locData.length >= 3) {
                                    locID = locData[0];
                                    locDesc = locData[2];
                                } else if (locData != null && locData.length >= 2) {
                                    locID = locData[0];
                                    locDesc = locData[1];
                                }
                            } else {
                                locID = locArray[j];
                                locDesc = "";
                            }
                            if (dtHedTbl.length > 0) {
                                dtHedTbl[0].LOCATION = locID;
                            }

                            var dictDataItems = { 'HEADER': dtHedTbl, 'DETAILS': dtDetails };
                            await this.recvPoNonPoService.printStaionaryReport(dictDataItems, 1).
                                catch(this.httpService.handleError).then((res: Response) => {
                                    let data = res.json() as AtParWebApiResponse<number>;
                                    this.statusCode = data.StatusCode;
                                    switch (data.StatType) {
                                        case StatusType.Success: {
                                            this.spnrService.stop();
                                            break;
                                        }
                                        case StatusType.Warn: {
                                            this.spnrService.stop();
                                            break;
                                        }
                                        case StatusType.Error: {
                                            this.spnrService.stop();
                                            break;
                                        }
                                        case StatusType.Custom: {
                                            this.spnrService.stop();
                                            break;
                                        }
                                    }
                                });
                            if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                                return this.statusCode;
                            }
                            this.blnPrinted = true;
                        }

                    } else {
                        var dictDataItems = { 'HEADER': dtHedTbl, 'DETAILS': dtDetails };
                        await this.recvPoNonPoService.printStaionaryReport(dictDataItems, 1).
                            catch(this.httpService.handleError).then((res: Response) => {
                                let data = res.json() as AtParWebApiResponse<number>;
                                this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case StatusType.Success: {
                                        this.spnrService.stop();
                                        break;
                                    }
                                    case StatusType.Warn: {
                                        this.spnrService.stop();
                                        break;
                                    }
                                    case StatusType.Error: {
                                        this.spnrService.stop();
                                        break;
                                    }
                                    case StatusType.Custom: {
                                        this.spnrService.stop();
                                        break;
                                    }
                                }
                            });
                        if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                            return this.statusCode;
                        }
                        this.blnPrinted = true;
                    }
                }
            }
            this.blnPrinted = true;
            return AtparStatusCodes.ATPAR_OK;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "prepareStationaryInputDataset");
        }
    }

    private async poNonPo_RbtnChange(recvDetails, blnSelectRdbtn: boolean) {
        try {
            //this.statusMsgs = [];
            this.statusCode = -1;
            let txtPkgs: string = "";
            let blnSchedsExist: boolean = false;
            this.blnFlag = false;
            let intScheduleCnt: number = 0;
            let strRecedQty: string = null;
            let strSerialControlled: string = null;
            let strLotControlled: string = null;
            let strPoQty: string = null;
            let txtNoOfBoxes: number;
            if (recvDetails.INV_ITEM_ID != null) {
                this.hdnItemId = recvDetails.INV_ITEM_ID;
            }

            let txtLadg: string = recvDetails.BILL_OF_LADING;
            let txtTrkNo: string = recvDetails.EXT_TRK_NO;
            let lnkLine: number = recvDetails.LINE_NBR;

            if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                txtNoOfBoxes = recvDetails.NO_OF_BOXES;
            } else if (this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0) {
                txtNoOfBoxes = recvDetails.NO_OF_PKGS;
            }
            this.txtPkgs = "1";
            if (!recvDetails.SCHDFLAG) {
                if (this.txtLading != null && this.txtLading != undefined && this.txtLading.length == 0) {
                    if (txtLadg == null || txtLadg == "") {

                        var currentdate = new Date();
                        txtLadg = this.deviceTokenEntry[TokenEntry_Enum.UserID].toString() + (currentdate.getMonth() + 1) + this.AddZero(currentdate.getDate()) + currentdate.getFullYear() + currentdate.getHours() + currentdate.getMinutes() + currentdate.getSeconds();
                        this.txtLading = txtLadg;
                        recvDetails.BILL_OF_LADING = txtLadg;
                    } else {
                        this.txtLading = txtLadg;
                    }
                } else if (txtLadg != null && txtLadg != "") {
                    this.txtLading = txtLadg;
                } else {
                    if (this.txtLading != null && this.txtLading != "") {
                        txtLadg = this.txtLading;
                        recvDetails.BILL_OF_LADING = txtLadg;
                    }
                }
            }
            let extTrkExist = await this.checkColumnExist("EXT_TRK_NO", "RECEIVE ITEMS");
            if (extTrkExist) {//(txtTrkNo != null)
                if (!this.txtExtTrkIsEditMode) {
                    if (this.txtTrk != null && this.txtTrk != undefined && this.txtTrk != "" && this.txtTrk.length == 0) {
                        if (txtTrkNo == null && txtTrkNo == "") {
                            txtTrkNo = "";
                        } else {
                            this.txtTrk = txtTrkNo.trim();
                            txtTrkNo = txtTrkNo.trim();
                        }
                    } else if (txtTrkNo != null && txtTrkNo != undefined && txtTrkNo != "") {
                        this.txtTrk = txtTrkNo.trim();
                        txtTrkNo = txtTrkNo.trim();
                    } else {
                        if (this.txtTrk != null && this.txtTrk != undefined && this.txtTrk != "") {
                            txtTrkNo = this.txtTrk;
                            recvDetails.EXT_TRK_NO = this.txtTrk;
                        }
                    }
                }
            }
            else {
                if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                    for (let i = 0; i < this.lstRecvSendPoLines.length; i++) {
                        if (this.lstRecvSendPoLines[i].LINE_NBR == lnkLine && recvDetails.LINE_NBR == lnkLine) {//&& recvDetails.RBFlAG) // this.grdRecvLinesRbBtnCheck) {//&& lnkLine.Enabled == false check once
                            if (this.lstRecvSendPoLines[i].EXT_TRK_NO != null && this.lstRecvSendPoLines[i].EXT_TRK_NO != "") {
                                if (this.lstRecvSendPoLines[i].EXT_TRK_NO.trim() != "") {
                                    this.txtTrk = this.lstRecvSendPoLines[i].EXT_TRK_NO;
                                }
                            }
                        }
                    }
                }
            }

            if (recvDetails.SCHED_COUNT <= 1) {
                if (recvDetails.CARRIER_ID != "Select Carrier" && recvDetails.CARRIER_ID != null) {
                    this.selectedDdlCarrier = recvDetails.CARRIER_ID;
                } else {
                    if (this.selectedDdlCarrier != "Select Carrier") {
                        recvDetails.CARRIER_ID = this.selectedDdlCarrier;
                    }
                }
            }

            if (txtNoOfBoxes == null) {
                txtNoOfBoxes = 1;
                recvDetails.NO_OF_BOXES = txtNoOfBoxes;
                txtPkgs = "1";
            }

            if (txtNoOfBoxes != null) {
                if (txtPkgs != null && txtPkgs != undefined && txtPkgs.trim().length == 0) {
                    if (txtNoOfBoxes == null) {
                        if (this.lstRecvSendPoLines != null) {
                            txtNoOfBoxes = 1;
                            recvDetails.NO_OF_BOXES = txtNoOfBoxes;
                            txtPkgs = "1";
                        }
                        else {
                            txtNoOfBoxes = 1;
                            recvDetails.NO_OF_BOXES = txtNoOfBoxes;
                            txtPkgs = "1";
                        }
                    }
                    else {
                        this.txtPkgs = txtNoOfBoxes.toString();
                    }
                }
                else if (txtNoOfBoxes != null) {//&& txtNoOfBoxes.Enabled check Once
                    this.txtPkgs = txtNoOfBoxes.toString();
                }
                else {

                    //if (true) {//txtNoOfBoxes.Enabled check once
                    if (this.txtPkgs != null && this.txtPkgs != undefined && this.txtPkgs.length > 0) {
                        txtNoOfBoxes = parseInt(this.txtPkgs);
                        recvDetails.NO_OF_BOXES = txtNoOfBoxes;
                    } else {
                        if (this.lstRecvSendPoLines != null) {
                            txtNoOfBoxes = 1;
                            recvDetails.NO_OF_BOXES = txtNoOfBoxes;
                            this.txtPkgs = "1";
                        } else {
                            txtNoOfBoxes = 1;
                            this.txtPkgs = "1";
                            recvDetails.NO_OF_BOXES = txtNoOfBoxes;
                        }
                    }
                    //}
                }
            } else {
                if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                    for (let i = 0; i < this.lstRecvSendPoLines.length; i++) {
                        if (this.lstRecvSendPoLines[i].LINE_NBR == lnkLine && this.grdRecvLinesRbBtnCheck) {//&& lnkLine.Enabled == false check once
                            if (this.lstRecvSendPoLines[i].NO_OF_BOXES != null) {
                                this.txtPkgs = this.lstRecvSendPoLines[i].NO_OF_BOXES.toString();
                            }
                        }
                    }
                }
                if (this.lstRecvIutItems != null) {
                    let lblinterLineNbr = recvDetails.INTERUNIT_LINE;
                    for (let i = 0; i < this.lstRecvIutItems.length; i++) {
                        if (recvDetails.INTERUNIT_LINE == lblinterLineNbr && this.grdRecvLinesRbBtnCheck) {
                            if (recvDetails.NO_OF_PKGS != null) {
                                this.txtPkgs = recvDetails.NO_OF_PKGS;
                            }
                        }
                    }
                }
            }

            if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {

                let dtReceiveDetails = this.lstRecvSendPoLines;
                let strLot: string = recvDetails.LOT_CONTROLLED;
                this.lotControl = recvDetails.LOT_CONTROLLED;
                let strSerial: string = recvDetails.SERIAL_CONTROLLED;
                this.serialControl = recvDetails.SERIAL_CONTROLLED;
                let lnkLineNbr: number = recvDetails.LINE_NBR;
                this.schedNbr = recvDetails.SCHED_NBR;
                let lbQtyPO = recvDetails.LINE_PO_QTY;
                let lnkItemId = recvDetails.INV_ITEM_ID;
                let txtQty = recvDetails.QTY;//.LINE_QTY;
                strRecedQty = recvDetails.RECEIVED_QTY;
                strPoQty = recvDetails.QTY_PO;//LINE_PO_QTY check once Qty
                intScheduleCnt = recvDetails.SCHED_COUNT;
                strSerialControlled = recvDetails.SERIAL_CONTROLLED;
                strLotControlled = recvDetails.LOT_CONTROLLED;
                let intConverfactor: number = parseInt(recvDetails.CONVERSION_RATE);
                this.lotSerialConverfactor = parseInt(recvDetails.CONVERSION_RATE);
                let strUOM: string = recvDetails.UNIT_OF_MEASURE;
                let schedCount: string = recvDetails.SCHED_COUNT;
                let strInvItem: string = recvDetails.INVENTORY_ITEM;
                this.hdnItemType = strInvItem;
                this.hdnInvItemId = lnkItemId;
                this.hdnItmLineNo = lnkLineNbr;
                this.hdnItmSchedLineNo = parseInt(this.schedNbr);

                this.strTotalQty = (parseInt(strPoQty) - parseInt(strRecedQty)).toString();

                //Recall Checking
                let strRecallFlag: string = recvDetails.RECAL_FLAG.toString();
                if (strRecallFlag == YesNo_Enum[YesNo_Enum.Y].toString()) {
                    let dtRecallInfo = this.lstReCallInfo;
                    if (dtRecallInfo != null && dtRecallInfo.length > 0) {
                        let dr = dtRecallInfo.filter(x => x.ITEM_ID == lnkItemId && (x.LOT_NO == "" || x.LOT_NO == null) && (x.SERIAL_NO == "" || x.SERIAL_NO == null));
                        if (dr != null && dr.length > 0) {
                            recvDetails.QTY = "";
                            recvDetails.TXTQTYFLAG = true;
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "This Item " + lnkItemId + " is on recall. The item cannot be received." });
                            return;
                        }
                    }
                }
                //Comments Checking
                if (this.gDisplayComments == YesNo_Enum[YesNo_Enum.Y].toString() &&
                    recvDetails.COMMENTS != null && recvDetails.COMMENTS != "") {
                    let strComments: string = recvDetails.COMMENTS;
                    if (strComments != "") {
                        strComments = "Comments: \\n \\n " + strComments;
                        if (this.gstrPrevComments != strComments) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: strComments.toString() });
                            this.gstrPrevComments = strComments;
                        }
                    }
                }

                if (schedCount == "1" && (recvDetails.CARRIER_ID == null || recvDetails.CARRIER_ID == "Select Carrier" || recvDetails.CARRIER_ID == "" || txtLadg == "")) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Carrier and Lading are mandatory" });
                    this.selecstedRow = null;
                    setTimeout(() => { this.selectedINVITEMID = ""; }, 1);

                    setTimeout(() => { recvDetails.RBFlAG = false; }, 2);
                    this.grdRecvLinesRbBtnCheck = false;
                    this.lstRecvSendPoLines.forEach(x => x.RBFlAG = false);
                    blnSelectRdbtn = true;
                    return;
                } else {
                    setTimeout(() => {
                        recvDetails.RBFlAG = true;
                        let itemtxtRecvQty = document.getElementById('txtRecvQty' + this.selectedINVITEMID)
                        if (itemtxtRecvQty != null) {
                            itemtxtRecvQty.focus();
                        }
                    }, 2);
                }

                this.txtSerchItemId = lnkItemId;
                this.hdnItemId = this.txtSerchItemId;
                this.gstrlnkitemid = recvDetails.INV_ITEM_ID;
                this.gstrlnklineNbr = lnkLineNbr.toString();

                if (this.gStrLotSerial != Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.None].toString()) {
                    if (this.gStrLotSerial == Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.MMIS].toString()) {
                        if (strLot == YesNo_Enum[YesNo_Enum.Y].toString() || strSerial == YesNo_Enum[YesNo_Enum.Y].toString()) {
                            this.btnLotSerialDisable = false;
                            recvDetails.TXTQTYFLAG = true;
                            recvDetails.DDLUOMFLAG = true;
                        } else {
                            this.btnLotSerialDisable = true;
                            recvDetails.TXTQTYFLAG = false;
                        }
                    }
                    else if (this.gStrLotSerial == Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.AtPar].toString()) {
                        this.btnLotSerialDisable = false;
                        recvDetails.TXTQTYFLAG = false;
                    }

                    if (parseInt(intScheduleCnt.toString()) > 1) {
                        this.btnLotSerialDisable = true;
                        recvDetails.TXTQTYFLAG = true;
                        recvDetails.DDLUOMFLAG = true;
                    }
                }

                if (schedCount == "1") {
                    this.blnlnkItemIdEnable = false;
                    this.blnlnkLineNbrEnable = false;
                    if ((strLot == YesNo_Enum[YesNo_Enum.Y].toString() || strSerial == YesNo_Enum[YesNo_Enum.Y].toString()) &&
                        this.gStrLotSerial == Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.MMIS].toString()) {
                        recvDetails.TXTQTYFLAG = true;
                        recvDetails.DDLUOMFLAG = true;
                    } else {
                        recvDetails.TXTQTYFLAG = false;
                    }
                    this.btnPntrDetailsDisable = false;
                } else {
                    this.btnPntrDetailsDisable = true;

                    //do this
                    this.blnlnkItemIdEnable = true;
                    this.blnlnkLineNbrEnable = true;
                }
                //if ((strLot == YesNo_Enum[YesNo_Enum.Y].toString() && strSerial == YesNo_Enum[YesNo_Enum.Y].toString()) &&
                //    this.gStrLotSerial == Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.MMIS].toString()) {
                //    this.btnPntrDetailsDisable = true;
                //    this.btnLotSerialDisable = true;
                //}
                if (lnkItemId != null) {
                    if (lnkItemId == "") {// && lnkLineNbr.Enabled == false check once
                        this.blnFlag = true;
                    }

                    //Do not default Lines which have schedules
                    if (strSerialControlled == null || strSerialControlled == "") {
                        strSerialControlled = YesNo_Enum[YesNo_Enum.N].toString();
                    }
                    if (strLotControlled == null && strLotControlled == "") {
                        strLotControlled = YesNo_Enum[YesNo_Enum.N].toString();
                    }
                    if (intScheduleCnt == 1 && (this.gStrLotSerial == Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.None].toString() ||
                        !(strSerialControlled == YesNo_Enum[YesNo_Enum.Y].toString() || strLotControlled == YesNo_Enum[YesNo_Enum.Y].toString()))) {
                        this.blnFlag = true;
                        //Recall Checking
                        if (strRecallFlag == YesNo_Enum[YesNo_Enum.Y].toString()) {
                            let dtRecallInfo = this.lstReCallInfo;
                            if (dtRecallInfo != null && dtRecallInfo.length > 0) {
                                let dr = dtRecallInfo.filter(x => x.ITEM_ID == lnkItemId && (x.LOT_NO == "" || x.LOT_NO == null) && (x.SERIAL_NO == "" || x.SERIAL_NO == null));
                                if (dr != null && dr.length > 0) {
                                    this.blnFlag = false;
                                }
                            }
                        }
                    } else if (intScheduleCnt > 1) {
                        recvDetails.SCHDFLAG = true;
                        this.blnSchedsExist = true;

                    } else if (strSerialControlled == YesNo_Enum[YesNo_Enum.Y].toString() || strLotControlled == YesNo_Enum[YesNo_Enum.Y].toString()) {
                        this.blnSchedsExist = true;
                        recvDetails.SCHDFLAG = true;
                    }
                    if (this.blnSchedsExist && this.blnReceiveall) {
                        this.blnReceiveall = false;
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Lines with schedules or lot serial have not been updated" });
                    }
                }
                recvDetails.NO_OF_BOXES = txtNoOfBoxes;
                if (this.blnFlag == true && (txtQty == null || txtQty == "")) {
                    if (this.gblnASNPO == false && this.gStrDefaultInput == YesNo_Enum[YesNo_Enum.Y].toString()) {
                        if (strRecedQty != null && strRecedQty != "") {
                            if (parseInt(strRecedQty) <= parseInt(strPoQty)) {
                                txtQty = parseInt(strPoQty) - parseInt(strRecedQty);
                                recvDetails.QTY = txtQty;
                            }
                        } else {
                            txtQty = strPoQty;
                            recvDetails.QTY = txtQty;
                        }
                    } else {
                        txtQty = recvDetails.ASN_QTY;
                        recvDetails.QTY = txtQty;
                    }
                }

            }
            else if (this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0) {
                if (recvDetails.CARRIER_ID != "Select Carrier" && recvDetails.CARRIER_ID != null && recvDetails.CARRIER_ID != "") {
                    this.selectedDdlCarrier = recvDetails.CARRIER_ID;
                } else {
                    if (this.selectedDdlCarrier != "Select Carrier") {
                        recvDetails.CARRIER_ID = this.selectedDdlCarrier;
                    }
                }
                let lnkItemId = recvDetails.ITEM_ID;
                let txtQty = recvDetails.QTY;
                let strShippedQty: string = recvDetails.QTY_SHIPPED;
                strSerialControlled = recvDetails.SERIAL_CONTROLLED;
                strRecedQty = recvDetails.QTY_RECEIVED;
                if (recvDetails.CARRIER_ID == null || recvDetails.CARRIER_ID == "Select Carrier" || recvDetails.CARRIER_ID == "" || txtLadg == "") {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Carrier and Lading are mandatory" });

                    this.selecstedRow = null;
                    setTimeout(() => { this.selectedINVITEMID = ""; }, 1);
                    this.grdRecvLinesRbBtnCheck = false;
                    setTimeout(() => { recvDetails.RBFlAG = false; }, 2);
                    blnSelectRdbtn = true;
                    this.lstRecvIutItems.forEach(x => x.RBFlAG = false);
                    return;
                } else {
                    setTimeout(() => {
                        recvDetails.RBFlAG = true;
                        let itemtxtRecvQty = document.getElementById('txtRecvQty' + this.selectedINVITEMID)
                        if (itemtxtRecvQty != null) {
                            itemtxtRecvQty.focus();
                        }
                    }, 2);
                }

                this.txtSerchItemId = lnkItemId;
                this.hdnItemId = this.txtSerchItemId;

                if (strRecedQty == null || strRecedQty == "") {
                    strRecedQty = "0";
                }
                if (txtQty == "" && this.gStrDefaultInput == YesNo_Enum[YesNo_Enum.Y].toString()) {
                    if (parseInt(strRecedQty) <= parseInt(strShippedQty)) {
                        if (strSerialControlled == YesNo_Enum[YesNo_Enum.Y].toString()) {
                            if ((parseInt(strShippedQty) - parseInt(strRecedQty)) != 0) {
                                txtQty = "1";
                                recvDetails.QTY = txtQty;
                            } else {
                                txtQty = (parseInt(strShippedQty) - parseInt(strRecedQty));
                                recvDetails.QTY = txtQty
                            }
                        } else {
                            txtQty.Text = (parseInt(strShippedQty) - parseInt(strRecedQty));
                            recvDetails.QTY = txtQty
                        }
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "poNonPo_RbtnChange");
        }
    }

    private async updateDs(growPage: string, recvData): Promise<boolean> {
        try {
            this.lstRecvSendData = [];
            this.statusCode = -1;

            if (growPage == "ASP.mt_recv_po_or_nonpo_receipts_aspx") {
                if (this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0) {
                    let dtIutItems = this.lstRecvIutItems.filter(x => x.ITEM_ID == recvData.ITEM_ID)[0];
                    let txtNoOfBoxes = recvData.NO_OF_PKGS;
                    let lnkItemId = recvData.ITEM_ID;
                    let lbInterUnit = recvData.INTERUNIT_LINE;
                    let txtQty = recvData.QTY;
                    let txtLadg = recvData.BILL_OF_LADING;
                    let strSerialControlled = dtIutItems.SERIAL_CONTROLLED;
                    let dblItemTolPer: number = 0;

                    let dblLineShippedQty: number = parseInt(dtIutItems.QTY_SHIPPED);
                    let dblLineRecdQty: number = 0;
                    if (dtIutItems.QTY_RECEIVED != null && dtIutItems.QTY_RECEIVED != "") {
                        dblLineRecdQty = parseInt(dtIutItems.QTY_RECEIVED);
                    }

                    if (txtQty != null && txtQty != "") {
                        if (strSerialControlled == YesNo_Enum[YesNo_Enum.Y].toString()) {
                            if (parseInt(txtQty) > 1) {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Qty cannot be greater than 1 for serial item" });
                                txtQty = "";
                                recvData.QTY = "";
                                setTimeout(() => {
                                    let itemtxtRecvQty = document.getElementById('txtRecvQty' + recvData.INV_ITEM_ID)
                                    if (itemtxtRecvQty != null) {
                                        itemtxtRecvQty.focus();
                                    }
                                }, 2);
                                return true;
                            }
                        }
                        if (parseInt(txtQty) > (dblLineShippedQty + (dblLineShippedQty * dblItemTolPer / 100) - dblLineRecdQty) &&
                            this.gStrAllowExcessQty == YesNo_Enum[YesNo_Enum.N].toString()) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Transfer qty should not be greater than Ordered Qty" });
                            txtQty = "";
                            recvData.QTY = "";
                            setTimeout(() => {

                                let itemtxtRecvQty = document.getElementById('txtRecvQty' + recvData.INV_ITEM_ID)
                                if (itemtxtRecvQty != null) {
                                    itemtxtRecvQty.focus();
                                }
                            }, 2);
                            return;
                        }
                    }

                    if (txtQty == "" && this.grdRecvLinesRbBtnCheck == true) {
                        if (strSerialControlled == YesNo_Enum[YesNo_Enum.Y].toString()) {
                            if ((dblLineShippedQty - dblLineRecdQty) != 0) {
                                txtQty = "1";
                            }
                        }
                    }

                    if (dtIutItems.ITEM_ID == lnkItemId && dtIutItems.INTERUNIT_LINE == lbInterUnit) {
                        if (dtIutItems.NO_OF_PKGS != null) {
                            if ((txtNoOfBoxes != null)) {
                                if (txtNoOfBoxes != null && txtNoOfBoxes != "") {
                                    dtIutItems.NO_OF_PKGS = txtNoOfBoxes;
                                } else {
                                    dtIutItems.NO_OF_PKGS = "";
                                }
                            } else {
                                if (dtIutItems.NO_OF_PKGS != null && dtIutItems.NO_OF_PKGS != "") {
                                    dtIutItems.NO_OF_PKGS = dtIutItems.NO_OF_PKGS;
                                } else {
                                    dtIutItems.NO_OF_PKGS = "";
                                }
                            }
                        }
                        dtIutItems.QTY = txtQty;
                        dtIutItems.BILL_OF_LADING = txtLadg;
                        if (recvData.CARRIER_ID != "Select Carrier") {
                            dtIutItems.CARRIER_ID = recvData.CARRIER_ID;
                        }
                    }
                }
                else {
                    let strUOMVal: string = "";
                    let arrSelectedConf: string[] = [];
                    let strSelectedUOMFact: string = "";
                    let arrUOM: string[] = [];
                    let arrConf: string[] = [];
                    let intRowSel: number = 0;
                    let lblPOQty = recvData.LINE_PO_QTY;
                    let txtNoOfBoxes = recvData.NO_OF_BOXES;
                    let lnkItemId = recvData.INV_ITEM_ID;
                    let txtQty = recvData.QTY;//.LINE_QTY;
                    let txtLadg = recvData.BILL_OF_LADING;
                    let lnkLineNbr = recvData.LINE_NBR;
                    let schdNbr = recvData.SCHED_NBR;
                    let txttrkno = recvData.EXT_TRK_NO;
                    strUOMVal = recvData.SELECTEDUOM;
                    if (strUOMVal != null && strUOMVal != undefined && strUOMVal != "") {
                        arrUOM = strUOMVal.split("(");
                    }

                    if (arrUOM != null && arrUOM.length > 1) {
                        arrConf = arrUOM[1].split(" ");
                    }

                    //When SelectedUOM conversion rate is in Fractions like 1/100 then splitting it with / 
                    if (arrConf.length > 1) {
                        if (arrConf[0] != null && arrConf[0].indexOf("/") == -1) {
                            //when selectedUOM conversion rate is like(BX( 1 EA)) 
                            strSelectedUOMFact = arrConf[0];
                        } else {
                            //when selectedUOM conversion rate is like(BX( 1/100 EA)) 
                            arrSelectedConf = arrConf[0].split("/");
                            strSelectedUOMFact = (parseInt(arrSelectedConf[0]) / parseInt(arrSelectedConf[1])).toString();
                        }
                    } else {
                        strSelectedUOMFact = arrConf[0];
                    }

                    if (this.dtScheduleItems != null && this.dtScheduleItems.length > 0) {
                        for (let i = 0; i < this.dtScheduleItems.length; i++) {
                            if (this.dtScheduleItems[i].SCHED_NBR == schdNbr) {
                                if (this.blnlnkItemIdEnable == false || this.blnlnkLineNbrEnable == false) {
                                    if (txtNoOfBoxes != null) {
                                        if (txtNoOfBoxes != "") {
                                            this.dtScheduleItems[i].NO_OF_BOXES = txtNoOfBoxes;
                                        } else {
                                            this.dtScheduleItems[i].NO_OF_BOXES = 1;
                                        }
                                    } else {
                                        if (this.grdRecvLinesRbBtnCheck) {
                                            if (this.dtScheduleItems[i].NO_OF_BOXES != null) {

                                            } else {
                                                this.dtScheduleItems[i].NO_OF_BOXES = parseInt(this.txtPkgs);
                                            }
                                        }
                                    }
                                    this.dtScheduleItems[i].LINE_QTY = txtQty;
                                    this.dtScheduleItems[i].BILL_OF_LADING = txtLadg;

                                    this.dtScheduleItems[i].RECV_UOM = arrUOM[0];
                                    this.dtScheduleItems[i].RECV_CONVERSION_RATE = parseInt(strSelectedUOMFact);
                                    this.dtScheduleItems[i].RECEIVED_FLAG = YesNo_Enum[YesNo_Enum.Y].toString();

                                    let extTrkExist = await this.checkColumnExist("EXT_TRK_NO", "RECEIVE BY SCHEDULE");
                                    if (extTrkExist) {//if ((txttrkno != null)) {
                                        if (this.grdRecvLinesRbBtnCheck) {
                                            if (txttrkno != null && txttrkno != "") {
                                                this.dtScheduleItems[i].EXT_TRK_NO = txttrkno.trim();
                                            } else {
                                                this.dtScheduleItems[i].EXT_TRK_NO = this.txtSchdExTrk;
                                            }
                                        } else {
                                            if (this.dtScheduleItems[i].EXT_TRK_NO != "") {
                                                this.dtScheduleItems[i].EXT_TRK_NO = this.dtScheduleItems[i].EXT_TRK_NO;
                                            } else {
                                                this.dtScheduleItems[i].EXT_TRK_NO = "";
                                            }
                                        }
                                    } else {
                                        if (this.grdRecvLinesRbBtnCheck) {
                                            if (this.dtScheduleItems[i].EXT_TRK_NO != "") {
                                                this.dtScheduleItems[i].EXT_TRK_NO = this.dtScheduleItems[i].EXT_TRK_NO;
                                            } else {
                                                this.dtScheduleItems[i].EXT_TRK_NO = this.txtSchdExTrk;
                                            }
                                        } else {
                                            if (this.dtScheduleItems[i].EXT_TRK_NO != "") {
                                                this.dtScheduleItems[i].EXT_TRK_NO = this.dtScheduleItems[i].EXT_TRK_NO;
                                            } else {
                                                this.dtScheduleItems[i].EXT_TRK_NO = "";
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        this.lstRecvSendData = recvData;
                    } else {
                        for (let i = 0; i < this.lstRecvSendPoLines.length; i++) {
                            if (this.lstRecvSendPoLines[i].LINE_NBR == lnkLineNbr) {
                                if (this.blnlnkItemIdEnable == false || this.blnlnkLineNbrEnable == false) {
                                    if (txtNoOfBoxes != null) {
                                        if (txtNoOfBoxes != "") {
                                            this.lstRecvSendPoLines[i].NO_OF_BOXES = txtNoOfBoxes;
                                        } else {
                                            this.lstRecvSendPoLines[i].NO_OF_BOXES = 1;
                                        }
                                    } else {
                                        if (this.grdRecvLinesRbBtnCheck) {
                                            if (this.lstRecvSendPoLines[i].NO_OF_BOXES != null) {

                                            } else {
                                                this.lstRecvSendPoLines[i].NO_OF_BOXES = parseInt(this.txtPkgs);
                                            }
                                        }
                                    }
                                    this.lstRecvSendPoLines[i].LINE_QTY = txtQty;
                                    // this.lstRecvSendPoLines[i].QTY = txtQty;
                                    this.lstRecvSendPoLines[i].BILL_OF_LADING = txtLadg;

                                    this.lstRecvSendPoLines[i].RECV_UOM = arrUOM[0];
                                    this.lstRecvSendPoLines[i].RECV_CONVERSION_RATE = parseInt(strSelectedUOMFact);
                                    this.lstRecvSendPoLines[i].RECEIVED_FLAG = YesNo_Enum[YesNo_Enum.Y].toString();

                                    let extTrkExist = await this.checkColumnExist("EXT_TRK_NO", "RECEIVE ITEMS");
                                    if (extTrkExist) {//if ((txttrkno != null)) {
                                        if (this.grdRecvLinesRbBtnCheck) {
                                            if (txttrkno != null && txttrkno != "") {
                                                this.lstRecvSendPoLines[i].EXT_TRK_NO = txttrkno.trim();
                                            } else {
                                                this.lstRecvSendPoLines[i].EXT_TRK_NO = this.txtTrk;
                                            }
                                        } else {
                                            if (this.lstRecvSendPoLines[i].EXT_TRK_NO != "") {
                                                this.lstRecvSendPoLines[i].EXT_TRK_NO = this.lstRecvSendPoLines[i].EXT_TRK_NO;
                                            } else {
                                                this.lstRecvSendPoLines[i].EXT_TRK_NO = "";
                                            }
                                        }
                                    } else {
                                        if (this.grdRecvLinesRbBtnCheck) {
                                            if (this.lstRecvSendPoLines[i].EXT_TRK_NO != "") {
                                                this.lstRecvSendPoLines[i].EXT_TRK_NO = this.lstRecvSendPoLines[i].EXT_TRK_NO;
                                            } else {
                                                this.lstRecvSendPoLines[i].EXT_TRK_NO = this.txtTrk;
                                            }
                                        } else {
                                            if (this.lstRecvSendPoLines[i].EXT_TRK_NO != "") {
                                                this.lstRecvSendPoLines[i].EXT_TRK_NO = this.lstRecvSendPoLines[i].EXT_TRK_NO;
                                            } else {
                                                this.lstRecvSendPoLines[i].EXT_TRK_NO = "";
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        this.lstRecvSendData = recvData;
                    }

                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "updateDs");
        }
    }

    private async changedata(ctrl: string, recvData) {
        try {
            this.statusMsgs = [];
            this.statusCode = -1;
            let strVendorItemId: string = "";
            let strUpcId: string = "";
            let strMfgItemId: string = "";
            let strGTIN: string = "";
            let lbVendorItemId: string = "";
            let lbCustItemId: string = "";
            let blnflg: boolean = false;
            let blnNoItem: boolean = false;
            if (recvData != null && recvData.length > 0) {

                for (let i = 0; i < recvData.length; i++) {
                    if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                        this.lnkItemId = recvData[i].INV_ITEM_ID;
                        this.txtNoOfBoxes = recvData[i].NO_OF_BOXES;
                        this.txtQty = recvData[i].QTY;//.LINE_QTY;
                        lbVendorItemId = recvData[i].ITM_ID_VNDR;
                        lbCustItemId = recvData[i].CUST_ITEM_NO;
                    } else if (this.lstRecvIutItems != null) {
                        this.lnkItemId = recvData[i].ITEM_ID;
                        this.txtNoOfBoxes = recvData[i].NO_OF_PKGS;
                        this.txtQty = recvData[i].QTY;
                        lbVendorItemId = recvData[i].VEND_ITEM_ID;
                        lbCustItemId = recvData[i].CUSTOM_ITEM_NO;
                    }
                    strUpcId = recvData[i].UPC_ID;
                    strMfgItemId = recvData[i].MFG_ITEM_ID;
                    strGTIN = recvData[i].GTIN;

                    if (ctrl == "NoOfBoxes") {
                        let lineNbr = recvData[i].LINE_NBR;
                        if (this.txtNoOfBoxes != "") {
                            if (this.txtPkgsIsReadonly == false && this.grdRecvLinesRbBtnCheck) {
                                for (let i = 0; i < this.lstRecvSendPoLines.length; i++) {
                                    if (this.lstRecvSendPoLines[i].LINE_NBR == recvData[i].LINE_NBR) {
                                        this.lstRecvSendPoLines[i].NO_OF_BOXES = parseInt(this.txtPkgs);
                                    }
                                }
                                if (this.txtPkgs.trim().length == 0) {
                                    this.txtNoOfBoxes = "1";
                                } else {
                                    this.txtNoOfBoxes = this.txtPkgs;
                                }
                            }
                        }
                        else if (this.txtNoOfBoxes != "") {
                            if (this.txtPkgsIsReadonly == false && this.grdRecvLinesRbBtnCheck) {
                                for (let i = 0; i < this.lstRecvIutItems.length; i++) {
                                    if (this.lstRecvIutItems[i].INTERUNIT_LINE == recvData[i].INTERUNIT_LINE &&
                                        this.lstRecvIutItems[i].ITEM_ID == this.lnkItemId) {
                                        this.lstRecvIutItems[i].NO_OF_PKGS = this.txtPkgs;
                                    }
                                }
                                if (this.txtPkgs.trim().length == 0) {
                                    this.txtNoOfBoxes = " ";
                                } else {
                                    this.txtNoOfBoxes = this.txtPkgs;
                                }
                            }
                        } else {
                            if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                                if (this.grdRecvLinesRbBtnCheck) {//LineNbr.Enabled == false && check once
                                    for (let i = 0; i < this.lstRecvSendPoLines.length; i++) {
                                        if (this.lstRecvSendPoLines[i].LINE_NBR == lineNbr) {
                                            this.lstRecvSendPoLines[i].NO_OF_BOXES = parseInt(this.txtPkgs);
                                        }

                                    }
                                }
                            }
                            if (this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0) {
                                let lblinterLineNbr = recvData[i].INTERUNIT_LINE;
                                if (this.grdRecvLinesRbBtnCheck) {
                                    for (let i = 0; i < this.lstRecvIutItems.length; i++) {
                                        if (this.lstRecvIutItems[i].INTERUNIT_LINE == lblinterLineNbr && this.lstRecvIutItems[i].ITEM_ID == this.lnkItemId) {
                                            this.lstRecvIutItems[i].NO_OF_PKGS = this.txtPkgs;
                                            if (this.txtNoOfBoxes != "") {
                                                this.txtNoOfBoxes = this.txtPkgs;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (ctrl == "Carrier") {
                        let selectedCarrier: string = this.selectedDdlCarrier;
                        if (this.selectedDdlCarrier != "" && this.recvGrdCarrierEnable && this.grdRecvLinesRbBtnCheck) {
                            recvData[i].CARRIER_ID = this.selectedDdlCarrier;
                        }
                    }
                    if (ctrl == "Lading") {
                        this.txtLadg = recvData[i].BILL_OF_LADING;
                        if (this.grdRecvLinesRbBtnCheck) {//txtLadg.Enabled &  check once
                            if (this.txtLading.length == 0) {
                                this.txtLadg = "";
                            } else {
                                this.txtLadg = this.txtLading;
                            }
                        }
                    }

                    if (ctrl == "ExtTrkno") {
                        let txttrkno = recvData[i].EXT_TRK_NO;//txttrkno                
                        let lineNbr = recvData[i].LINE_NBR;
                        if (txttrkno != null) {
                            if (this.grdRecvLinesRbBtnCheck) {
                                for (let i = 0; i < this.lstRecvSendPoLines.length; i++) {
                                    if (this.lstRecvSendPoLines[i].LINE_NBR == lineNbr) {
                                        this.lstRecvSendPoLines[i].EXT_TRK_NO = this.txtTrk;
                                    }
                                }
                                if (this.txtTrk.length == 0) {
                                    txttrkno = " ";
                                } else {
                                    txttrkno = this.txtTrk;
                                }
                            }
                        } else {
                            if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                                if (this.grdRecvLinesRbBtnCheck) {//LineNbr.Enabled == false && 
                                    for (let i = 0; i < this.lstRecvSendPoLines.length; i++) {
                                        if (this.lstRecvSendPoLines[i].LINE_NBR == lineNbr) {
                                            this.lstRecvSendPoLines[i].EXT_TRK_NO = this.txtTrk;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (ctrl == "Search") {
                        this.grdRecvLinesRbBtnCheck = false;
                        recvData[i].RBFlAG = false;
                        if (this.hdnItemId != "") {
                            this.txtSerchItemId = this.hdnItemId;
                        }
                        if (this.txtSerchItemId != "") {
                            if (this.lnkItemId == this.txtSerchItemId) {
                                blnflg = true;
                                blnNoItem = true;
                            } else if (strGTIN != null && strGTIN == this.txtSerchItemId) {
                                blnflg = true;
                                blnNoItem = true;
                            } else if (strMfgItemId != null && strMfgItemId == this.txtSerchItemId) {
                                blnflg = true;
                                blnNoItem = true;
                            } else if (lbCustItemId != null && lbCustItemId == this.txtSerchItemId) {
                                blnflg = true;
                                blnNoItem = true;
                            } else if (strUpcId != null && strUpcId == this.txtSerchItemId) {
                                blnflg = true;
                                blnNoItem = true;
                            } else if ((lbVendorItemId != null) && lbVendorItemId == this.txtSerchItemId) {
                                blnflg = true;
                                blnNoItem = true;
                            } else {
                                blnflg = false;
                            }
                            if (blnflg) {
                                recvData[i].RBFlAG = true;
                                this.hdnItemId = "";
                                let blnSelectRdbtn: boolean = false;
                                await this.poNonPo_RbtnChange(recvData[i], blnSelectRdbtn);
                            } else {
                                recvData[i].RBFlAG = false;
                            }
                        }
                    }
                }

                if (ctrl == "Search") {
                    if (blnNoItem == false) {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.txtSerchItemId + ": ItemId not found" });
                        this.hdnItemId = "";
                        this.txtSerchItemId = "";
                        return;
                    }
                }
                if (ctrl == "Lading") {
                    if (this.txtPkgs == "") {
                        this.txtPkgs = "";
                    } else {
                    }
                } else if (ctrl == "NoOfBoxes") {
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "changedata");
        }
    }

    private async chkItemQty(recvData): Promise<boolean> {
        try {
            this.statusMsgs = [];
            this.statusCode = -1;
            let strUOMVal: string = "";
            let arrSelectedConf: string[] = [];
            let strSelectedUOMFact: string = "";
            let arrUOM: string[] = [];
            let arrConf: string[] = [];
            let dblConvFact: number = 0;
            let dblFraction: number = 0;
            let txtGridLading: string = "";
            let lbQtyPO: string = "";
            let strUOM: string = "";
            let dblLineRecdQty: number = 0;
            let dblItemTolPer: number = 0;
            this.txtQty = recvData.QTY;
            let intQty: number = 0;
            let intPoQty: number = 0;
            let growPage = "";
            if (this.schPO == false) {
                growPage = "ASP.mt_recv_po_or_nonpo_receipts_aspx";
            }
            else { growPage = "ASP.mt_recv_Schedule.aspx"; }
            //IUT Qty checking 
            strUOM = recvData.UNIT_OF_MEASURE;
            lbQtyPO = recvData.QTY_PO;
            if (this.lstRecvIutItems != undefined && this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0) {
                this.ddlGridCarrier = recvData.CARRIER_ID;
                txtGridLading = recvData.BILL_OF_LADING;
                this.txtQty = recvData.QTY;
                if (this.txtQty != "" && (recvData.CARRIER_ID == "Select Carrier" || recvData.CARRIER_ID == "" || recvData.CARRIER_ID == null || txtGridLading == "")) {//txtQty.Enabled & 
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Carrier and Lading are mandatory" });
                    this.txtQty = "";
                    recvData.QTY = "";
                    recvData.RBFlAG = false;
                    return;
                }
                let chkUpdate = await this.updateDs(growPage, recvData);
                if (chkUpdate) {
                    return true;
                }
            } else {
                let intConverfactor: number = 0;
                let ddlUOM: string = recvData.UNIT_OF_MEASURE;
                txtGridLading = recvData.BILL_OF_LADING;
                let strUOM: string = "";
                let dblLineRecdQty: number = 0;
                let dblItemTolPer: number = 0;
                if (growPage == "ASP.mt_recv_po_or_nonpo_receipts_aspx") {
                    if (recvData.CONVERSION_RATE != null && recvData.CONVERSION_RATE != "") {
                        intConverfactor = parseInt(recvData.CONVERSION_RATE);
                    }
                    this.mStandardConversionRate = recvData.CONVERSION_RATE.toString();
                    if (recvData.RECEIVED_QTY != null && recvData.RECEIVED_QTY != "") {
                        dblLineRecdQty = parseInt(recvData.RECEIVED_QTY);
                    }
                    if (recvData.QTY_RECV_TOL_PCT != null && recvData.QTY_RECV_TOL_PCT != "") {
                        dblItemTolPer = parseInt(recvData.QTY_RECV_TOL_PCT);
                    }

                    this.txtQty = recvData.QTY;//.LINE_QTY;
                    let lnkItem = recvData.INV_ITEM_ID;
                    if (this.txtQty != "" && (recvData.CARRIER_ID == "" || recvData.CARRIER_ID == "Select Carrier" || recvData.CARRIER_ID == null || txtGridLading == ""))//&&                        this.gblnASNPO == false) 
                    {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Carrier and Lading are mandatory" });
                        this.txtQty = "";
                        recvData.QTY = "";
                        recvData.RBFlAG = false;
                        return;
                    }
                }
                else {
                    this.txtQty = recvData.QTY;
                    let lnkItem = recvData.INV_ITEM_ID;
                    var fact = this.lstRecvSendPoLines.filter(x => x.INV_ITEM_ID == recvData.INV_ITEM_ID && x.LINE_NBR == recvData.LINE_NBR);
                    if (fact != null && fact.length > 0) {
                        if (fact[0].CONVERSION_RATE !== null || fact[0].CONVERSION_RATE != undefined) {
                            intConverfactor = fact[0].CONVERSION_RATE;
                        }
                    }
                    var rQty = this.dtScheduleItems.filter(x => x.RECEIVED_QTY == recvData.RECEIVED_QTY);
                    if (rQty.length > 0) {
                        if (rQty[0].RECEIVED_QTY !== null || rQty[0].RECEIVED_QTY != undefined) {
                            dblLineRecdQty = rQty[0].RECEIVED_QTY;
                        }
                    }
                    var recvQty = this.dtScheduleItems.filter(x => x.QTY_RECV_TOL_PCT == recvData.QTY_RECV_TOL_PCT);
                    if (recvQty.length > 0) {
                        if (recvQty[0].QTY_RECV_TOL_PCT !== null || recvQty[0].QTY_RECV_TOL_PCT != undefined) {
                            dblLineRecdQty = recvQty[0].QTY_RECV_TOL_PCT;
                        }
                    }
                    if (fact != null && fact.length > 0 && fact[0].CONVERSION_RATE != null && fact[0].CONVERSION_RATE != undefined) {
                        this.mStandardConversionRate = fact[0].CONVERSION_RATE.toString();
                    }
                    this.strUOM = fact[0].UNIT_OF_MEASURE;
                    this.strLineId = fact[0].LINE_ID;
                    this.StrSerialControlled = fact[0].SERIAL_CONTROLLED;
                    this.StrLotControlled = fact[0].LOT_CONTROLLED;
                    this.strItemId = fact[0].INV_ITEM_ID;
                    if (fact != null && fact.length > 0 && fact[0].LINE_NBR != null && fact[0].LINE_NBR != undefined) {
                        this.strLineNbr = fact[0].LINE_NBR.toString();
                    }
                    this.lstRecvSendPoLines;
                    this.lstGridRecvSendPoLines;
                    strUOM = fact[0].UNIT_OF_MEASURE;
                    if (this.txtQty != "" && (recvData.CARRIER_ID == "" || recvData.CARRIER_ID == "Select Carrier" || recvData.CARRIER_ID == null || txtGridLading == ""))// &&                        this.gblnASNPO == false) 
                    {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Carrier and Lading are mandatory" });
                        this.txtQty = "";
                        recvData.QTY = "";
                        recvData.RBFlAG = false;
                        return;
                    }
                }

                if (this.txtQty != "" && this.gStrAllowExcessQty == YesNo_Enum[YesNo_Enum.N].toString()) {
                    let intQty: number = parseInt(this.txtQty);
                    let intPoQty: number = parseInt(lbQtyPO);
                    strUOMVal = recvData.SELECTEDUOM;//check once  recvData.DDLUOMS[0].value;
                    if (strUOMVal != null && strUOMVal != "") {
                        arrUOM = strUOMVal.split("(");
                    }

                    if (arrUOM.length > 1) {
                        arrConf = arrUOM[1].split(" ");
                    }

                    //When SelectedUOM conversion rate is in Fractions like 1/100 then splitting it with / 
                    if (arrConf.length > 1) {
                        if (arrConf[0] != null && arrConf[0].indexOf("/") == -1) {
                            strSelectedUOMFact = arrConf[0];
                        } else {
                            arrSelectedConf = arrConf[0].split("/");
                            strSelectedUOMFact = (parseInt(arrSelectedConf[0]) / parseInt(arrSelectedConf[1])).toString();
                        }
                    } else {
                        strSelectedUOMFact = arrConf[0];
                    }
                    if (arrUOM[0] != strUOM) {
                        dblConvFact = parseInt(strSelectedUOMFact);
                        if (this.gStrAltUOMDisplay == this.gRecv_StandardUOM) {
                            if (strUOM == arrUOM[0]) {
                                if (arrUOM[0] == this.standardUOM) {
                                    if (parseInt(this.txtQty) > (parseInt(lbQtyPO) + (parseInt(lbQtyPO) * dblItemTolPer / 100) - dblLineRecdQty)) {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Receive quantity cannot be greater than open quantity" });
                                        this.txtQty = "";
                                        recvData.QTY = "";
                                        setTimeout(() => {
                                            let itemtxtRecvQty = document.getElementById('txtRecvQty' + recvData.INV_ITEM_ID)
                                            if (itemtxtRecvQty != null) {
                                                itemtxtRecvQty.focus();
                                            }
                                        }, 1);
                                        return;
                                    }
                                } else {
                                    dblConvFact = parseInt(strSelectedUOMFact) / parseInt(this.mStandardConversionRate);
                                    dblFraction = parseInt(this.txtQty) * dblConvFact;
                                    if (parseInt(lbQtyPO) < dblFraction) {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Receive quantity cannot be greater than open quantity" });
                                        this.txtQty = "";
                                        recvData.QTY = "";
                                        setTimeout(() => {
                                            let itemtxtRecvQty = document.getElementById('txtRecvQty' + recvData.INV_ITEM_ID)
                                            if (itemtxtRecvQty != null) {
                                                itemtxtRecvQty.focus();
                                            }
                                        }, 1);
                                        return;
                                    }
                                }
                            } else {
                                dblConvFact = parseInt(strSelectedUOMFact) / parseInt(this.mStandardConversionRate);
                                dblFraction = (parseInt(this.txtQty) * dblConvFact);
                                if (parseInt(lbQtyPO) < dblFraction) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Receive quantity cannot be greater than open quantity" });
                                    this.txtQty = "";
                                    recvData.QTY = "";
                                    setTimeout(() => {
                                        let itemtxtRecvQty = document.getElementById('txtRecvQty' + recvData.INV_ITEM_ID)
                                        if (itemtxtRecvQty != null) {
                                            itemtxtRecvQty.focus();
                                        }
                                    }, 1);
                                    return;
                                }
                            }
                        } else if (this.gStrAltUOMDisplay == this.gRecv_PoUOM) {
                            if (arrUOM[0] == this.gPOUOM) {
                                if (parseInt(this.txtQty) > (parseInt(lbQtyPO) + (parseInt(lbQtyPO) * dblItemTolPer / 100) - dblLineRecdQty)) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Receive quantity cannot be greater than open quantity" });
                                    this.txtQty = "";
                                    recvData.QTY = "";
                                    setTimeout(() => {
                                        let itemtxtRecvQty = document.getElementById('txtRecvQty' + recvData.INV_ITEM_ID)
                                        if (itemtxtRecvQty != null) {
                                            itemtxtRecvQty.focus();
                                        }
                                    }, 1);
                                    return;
                                }
                            } else {
                                dblConvFact = parseInt(strSelectedUOMFact) / parseInt(this.gPOUOMConversionRate);
                                dblFraction = parseInt(this.txtQty) * dblConvFact;
                                if (parseInt(lbQtyPO) < dblFraction) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Receive quantity cannot be greater than open quantity" });
                                    this.txtQty = "";
                                    setTimeout(() => {
                                        let itemtxtRecvQty = document.getElementById('txtRecvQty' + recvData.INV_ITEM_ID)
                                        if (itemtxtRecvQty != null) {
                                            itemtxtRecvQty.focus();
                                        }
                                    }, 1);
                                    return;
                                }
                            }
                        }
                    } else {
                        if (parseInt(this.txtQty) > (parseInt(lbQtyPO) + (parseInt(lbQtyPO) * dblItemTolPer / 100) - dblLineRecdQty)) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Receive quantity cannot be greater than open quantity" });
                            this.txtQty = "";
                            recvData.QTY = "";
                            setTimeout(() => {
                                let itemtxtRecvQty = document.getElementById('txtRecvQty' + recvData.INV_ITEM_ID)
                                if (itemtxtRecvQty != null) {
                                    itemtxtRecvQty.focus();
                                }
                            }, 1);
                            return;
                        }
                    }
                } else {
                    this.txtQty = "";
                }
                await this.updateDs("ASP.mt_recv_po_or_nonpo_receipts_aspx", recvData);
                await this.updateTextBox(recvData, this.gstrlnkitemid, this.gstrlnklineNbr);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "chkItemQty");
        }
    }

    async updateTextBox(recvData, strselectitemid: string, strSelectedLineNbr: string) {
        try {
            this.statusMsgs = [];
            this.statusCode = -1;
            let strLot: string = "";
            let strSerial: string = "";
            let sch_count: string = "";
            let growPage = "ASP.mt_recv_po_or_nonpo_receipts_aspx";
            if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                if (growPage == "ASP.mt_recv_po_or_nonpo_receipts_aspx") {
                    strLot = recvData.LOT_CONTROLLED;
                    strSerial = recvData.SERIAL_CONTROLLED;
                    sch_count = recvData.SCHED_COUNT;
                    let lnkItemId = recvData.INV_ITEM_ID;
                    let lnkLineNbr = recvData.LINE_NBR;
                    let lbSchedNbr: string = recvData.SCHED_NBR;
                    let strUOM: string = recvData.UNIT_OF_MEASURE;
                    let TxtBxEnable: boolean = false;
                    if (TxtBxEnable == false) {//TxtBx.Enabled == false  check once
                        let drow = asEnumerable(this.lstRecvSendPoLines).Where(x => x.INVENTORY_ITEM == lnkItemId && x.LINE_NBR == lnkLineNbr && x.SCHED_NBR == parseInt(lbSchedNbr) && x.RECEIVED_FLAG == YesNo_Enum[YesNo_Enum.Y].toString()).ToArray();
                        if (drow.length > 0 && drow[0].QTY != null) {
                            this.txtQty = drow[0].QTY.toString();//.LINE_QTY.toString();//check once
                        } else {
                            if (this.gblnASNPO && sch_count == "1") {
                                let drAsn = asEnumerable(this.lstRecvSendPoLines).Where(x => x.INV_ITEM_ID == lnkItemId && x.LINE_NBR == lnkLineNbr && x.SCHED_NBR == parseInt(lbSchedNbr)).ToArray();
                                // dtReceiveDetails.Select("INV_ITEM_ID='" + lnkItemId.Text + "' AND LINE_NBR='" + lnkLineNbr.Text + "' AND SCHED_NBR='" + lbSchedNbr.ToString + "' ");
                                if (drAsn.length > 0) {
                                    if (drAsn[0].ASN_QTY != null && drAsn[0].ASN_QTY != undefined) {
                                        this.txtQty = drAsn[0].ASN_QTY.toString();
                                    } else {
                                        this.txtQty = "";
                                    }
                                }
                            } else {
                                this.txtQty = "";
                            }
                        }
                    }

                    if (this.gStrLotSerial == Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.AtPar].toString()) {
                        let drow = asEnumerable(this.lstRecvSendPoLines).Where(x => x.INV_ITEM_ID == lnkItemId && x.LINE_NBR == lnkLineNbr && x.SCHED_NBR == parseInt(lbSchedNbr) && x.RECEIVED_FLAG == YesNo_Enum[YesNo_Enum.Y].toString()).ToArray();
                        //check once   dtReceiveDetails.Select("LotSerial_Qty<>'' AND INV_ITEM_ID='" + lnkItemId.Text + "' AND LINE_NBR='" + lnkLineNbr.Text + "' AND SCHED_NBR='" + lbSchedNbr.ToString + "'AND RECEIVED_FLAG = 'Y'");
                        if (drow.length > 0 && drow[0].QTY != null) {
                            this.txtQty = drow[0].QTY.toString();
                            //for (let i = 0; i < recvData. in ddlUOM.Items) {
                            //    string[] strUOMarry = lstddlUOM.ToString.Split("(");
                            //    if (strUOM == strUOMarry(0)) {
                            //        ddlUOM.ClearSelection();
                            //        ddlUOM.Items.FindByText(lstddlUOM.ToString).Selected = true;
                            //    }
                            //}
                        } else {
                            if (this.gblnASNPO && sch_count == "1") {
                                let drAsn = asEnumerable(this.lstRecvSendPoLines).Where(x => x.INV_ITEM_ID == lnkItemId && x.LINE_NBR == lnkLineNbr && x.SCHED_NBR == parseInt(lbSchedNbr)).ToArray();
                                //dtReceiveDetails.Select("INV_ITEM_ID='" + lnkItemId.Text + "' AND LINE_NBR='" + lnkLineNbr.Text + "' AND SCHED_NBR='" + lbSchedNbr.ToString + "' ");
                                if (drAsn.length > 0 && drAsn[0].ASN_QTY != null) {
                                    this.txtQty = drAsn[0].ASN_QTY.toString();
                                }
                            } else {
                                if ((lnkItemId == strselectitemid || lnkLineNbr == strSelectedLineNbr)) {// && this.gblnlotser == true check once
                                    this.txtQty = "";
                                    //this.gblnlotser = false;
                                }
                            }
                        }
                    }

                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "updateTextBox");
        }
    }

    async confirmData(btn) {
        try {
            this.statusMsgs = [];
            this.confirmationService.confirm({
                message: "Do you want to delete the existing PO/IUT?",
                accept: async () => {
                    this.spnrService.start();
                    this.hdnConfirmPoDelete = YesNo_Enum[YesNo_Enum.Y].toString();
                    this.hdnConfirmIUTDelete = YesNo_Enum[YesNo_Enum.Y].toString();
                    if (btn == "posearch") {
                        this.recvSearchPos = false;
                        this.recvIUTSearch = false;
                        this.tbl = false;
                        this.lstRecvSendPoLines = [];
                        this.lstRecvIutItems = [];
                        await this.showPoSearchPopup();
                    }
                    else {
                        this.tbl = false;
                        this.recvSearchPos = false;
                        this.recvIUTSearch = false;
                        this.lstRecvSendPoLines = [];
                        await this.btnGet_Click();
                    }
                    this.spnrService.stop();
                },
                reject: () => {
                    this.hdnConfirmPoDelete = YesNo_Enum[YesNo_Enum.N].toString();
                    this.hdnConfirmIUTDelete = YesNo_Enum[YesNo_Enum.N].toString();
                    this.spnrService.stop();
                }
            });
            this.spnrService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "confirmData");
        }
    }

    async showPoSearchPopup() {
        try {

            let shiptoId: string = "";
            let searchType: string = "";

            if (this.selectedShipToId == "Select ShipToID" || this.selectedShipToId == "") {
                shiptoId = "";
            }
            else {
                shiptoId = this.selectedShipToId;
            }

            if (this.txtShipId != "") {
                shiptoId = this.txtShipId;
            }

            if (this.rbtnDueDate) {
                searchType = "Due Date";
            }
            else if (this.rbtnPODate) {
                searchType = "PO Date";
            }

            let includeASNPos = this.hdnIncludeASNPOs;
            await this.poSearchBindDataGrid(shiptoId, searchType, includeASNPos);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "showPoSearchPopup");
        }
    }

    async poSearchBindDataGrid(pShiptoId: string, pSearchType: string, pIncASNPOs: string) {
        try {
            this.statusMsgs = [];
            this.lstRecvSearchPO = [];
            this.lstSeachItems = [];
            let recvSearchPOEntity = new VM_RECV_SEARCHHEADER();
            recvSearchPOEntity.BUSINESS_UNIT = this.selectedBUnits;
            recvSearchPOEntity.ITEM_ID = this.txtItemId;
            recvSearchPOEntity.VNDRID = this.txtVendorId;
            recvSearchPOEntity.VENDOR_NAME = this.txtVendorName;
            recvSearchPOEntity.SHPTID = pShiptoId;
            recvSearchPOEntity.FROM_DATE = this.txtFrmDate;
            recvSearchPOEntity.TO_DATE = this.txtToDate;
            recvSearchPOEntity.SEARCH_TYPE = pSearchType;
            recvSearchPOEntity.INCLUDE_ASN_POS = pIncASNPOs;//"Y";
            this.lstRecvSearchPO.push(recvSearchPOEntity);
            this.spnrService.start();
            this.tbl = false;
            this.page = false;
            this.recvIUTSearch = false;
            this.recvSearchPos = true;
            this.grdRecvSearchPos = false;
            await this.recvPoNonPoService.searchHeader(this.lstRecvSearchPO).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_RECV_SEARCHHEADER>;
                    this.statusCode = data.StatusCode;
                    this.statusMsgs = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (data.DataList != null && data.DataList.length > 0) {
                                this.lstSeachItems = data.DataList;
                                for (let i = 0; i < this.lstSeachItems.length; i++) {
                                    this.lstSeachItems[i].RBFlAG = false;
                                }
                                this.grdRecvSearchPos = true;
                            }
                            this.spnrService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.spnrService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spnrService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.spnrService.stop();
                            break;
                        }
                    }
                });
            this.spnrService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "poSearchBindDataGrid");
        }
    }

    async confirmIUT(cntrl) {
        try {
            this.statusMsgs = [];
            this.confirmationService.confirm({
                message: "Do you want to delete the existing PO/IUT?",
                accept: () => {
                    this.spnrService.start();
                    this.hdnConfirmPoDelete = YesNo_Enum[YesNo_Enum.Y].toString();
                    this.hdnConfirmIUTDelete = YesNo_Enum[YesNo_Enum.Y].toString();
                    this.lstRecvIutItems = [];
                    this.recvSearchPos = false;
                    this.recvIUTSearch = false;
                    this.tbl = false;
                    this.btnGet_Click();
                    this.spnrService.stop();
                },
                reject: () => {
                    this.hdnConfirmPoDelete = YesNo_Enum[YesNo_Enum.N].toString();
                    this.hdnConfirmIUTDelete = YesNo_Enum[YesNo_Enum.N].toString();
                    this.spnrService.stop();
                }
            });
            this.spnrService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "confirmIUT");
        }
    }

    async showIUTSearchPopup() {
        try {
            this.statusMsgs = [];
            this.lstRecvIUTSearchPO = [];
            let recvIutSearchPOEntity = new VM_IUT_SENDHEADER();
            recvIutSearchPOEntity.BUSINESS_UNIT = this.selectedBUnits;
            recvIutSearchPOEntity.ITEM_ID = this.txtItemId;
            let dateStr = new Date(new Date()).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
            let date = new Date(dateStr);
            let dtfrm = new Date(this.txtFrmDate);
            let frmdt = (dtfrm.getMonth() + 1) + '/' + (dtfrm.getDay() + 1) + '/' + dtfrm.getFullYear();
            let dtto = new Date(this.txtToDate);
            let todt = (dtto.getMonth() + 1) + '/' + (dtto.getDay() + 1) + '/' + dtto.getFullYear();
            recvIutSearchPOEntity.FROM_DATE = frmdt;
            recvIutSearchPOEntity.TO_DATE = todt;
            recvIutSearchPOEntity.PRODUCT = EnumApps.Receiving;

            this.lstRecvIUTSearchPO.push(recvIutSearchPOEntity);

            await this.recvPoNonPoService.searchIUTHeader(this.lstRecvIUTSearchPO).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_IUT_SEARCHHEADER>;
                    this.statusCode = data.StatusCode;
                    this.statusMsgs = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (data.DataList != null && data.DataList.length > 0) {
                                this.lstRecvSearchIuts = data.DataList;
                                for (let i = 0; i < this.lstRecvSearchIuts.length; i++) {
                                    this.lstRecvSearchIuts[i].RBFlAG = false;
                                }
                                this.tbl = false;
                                this.page = false;
                                this.recvSearchPos = false;
                                this.recvIUTSearch = true;
                            }
                            this.spnrService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.spnrService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spnrService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.spnrService.stop();
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "showIUTSearchPopup");
        }
    }

    async asnPopupshow() {
        try {
            this.statusMsgs = [];
            if (this.txtPONumber != undefined && this.txtPONumber != "") {
                this.txtPONumber = this.txtPONumber.toUpperCase().replace("'", "''");
            }
            if (this.selectedBUnits == "Select BusinessUnit") {
                this.selectedBUnits = "";
            }
            this.breadCrumbMenu.SUB_MENU_NAME = ' Multiple receipts exists for this Purchase Order';
            this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.tbl = false;
            this.page = false;
            this.purchase = true;

        }
        catch (ex) {
            this.clientErrorMsg(ex, "asnPopupshow");
        }
    }

    async loadparameters(screenName: string) {
        try {	//Default Input
            let drInput = asEnumerable(this.lstProfileApp).Where(x => x.PARAMETER_ID == "DEFAULT_INPUT").ToArray();//.Select("PARAMETER_ID='DEFAULT_INPUT'");
            if (drInput.length > 0) {
                this.gStrDefaultInput = drInput[0].PARAMETER_VALUE.toString();// drInput(0)("PARAMETER_VALUE").ToString();
            }
            //Editable ShipTo ID field
            let drShipToId = asEnumerable(this.lstProfileApp).Where(x => x.PARAMETER_ID == "EDIT_SHIPTO_ID").ToArray();
            if (drShipToId.length > 0) {
                this.gStrEditShipToId = drShipToId[0].PARAMETER_VALUE.toString();
            }
            //Non PO Items Receive
            let drNonPo = asEnumerable(this.lstProfileApp).Where(x => x.PARAMETER_ID == "NON_PO_ITEMS_RECEIVE").ToArray();
            if (drNonPo.length > 0) {
                this.gStrNonPoItemsReceive = drNonPo[0].PARAMETER_VALUE.toString();
            }
            // Edit/Select Receiving UOM on the HHT
            let drUOM = asEnumerable(this.lstProfileApp).Where(x => x.PARAMETER_ID == "EDIT_UOM").ToArray();
            if (drUOM.length > 0) {
                this.gStrUOMEditFlag = drUOM[0].PARAMETER_VALUE.toString();
            }
            else {
                this.gStrUOMEditFlag = YesNo_Enum[YesNo_Enum.N].toString();
            }
            //ShipTo ID required for download
            let drReqShipToId = asEnumerable(this.lstProfileApp).Where(x => x.PARAMETER_ID == "REQD_SHIPTO_ID").ToArray();
            if (drReqShipToId.length > 0) {
                this.gStrReqdShipToId = drReqShipToId[0].PARAMETER_VALUE.toString();
            }
            if (drReqShipToId.length > 0 && this.hdnReqShiptoId != null) {
                this.hdnReqShiptoId = drReqShipToId[0].PARAMETER_VALUE.toString();
            }
            //Display order / received quantity value
            let drdisplayRecdQty = asEnumerable(this.lstProfileApp).Where(x => x.PARAMETER_ID == "DISPLAY_RECVD_QTY").ToArray();
            if (drdisplayRecdQty.length > 0) {
                this.gStrDisplayReceivedQty = drdisplayRecdQty[0].PARAMETER_VALUE.toString();
            }
            //HdnDisplyRecqty.Value = strDisplayReceivedQty.ToString
            //Purchasing/Inter Unit Receiving
            let drIUT = asEnumerable(this.lstProfileApp).Where(x => x.PARAMETER_ID == "PO_IUT_RECEIVING").ToArray();
            if (drIUT.length > 0) {
                if (drIUT[0].PARAMETER_VALUE.toString() != null) {
                    this.gStrAllowIUTAccess = drIUT[0].PARAMETER_VALUE.toString();
                }
                else {
                    this.gStrAllowIUTAccess = "";
                }
            }
            else {
                this.gStrAllowIUTAccess = "";
            }
            //ASN/ASR Receipt by InvoiceNo or PackSlipNo
            let drASNdwnd = asEnumerable(this.lstOrgParms).Where(x => x.PARAMETER_ID == "ASN_DOWNLOAD_BY").ToArray();
            if (drASNdwnd.length > 0) {
                this.gStrASNDownload = drASNdwnd[0].PARAMETER_VALUE;
            }
            else {
                this.gStrASNDownload = "";
            }
            //ASN Receipt status after EDI ASN/ASR loaded in ERP
            let drASNReceiptStatus = asEnumerable(this.lstOrgParms).Where(x => x.PARAMETER_ID == "ASN_RECEIPT_STATUS").ToArray();
            if (drASNReceiptStatus.length > 0) {
                this.gASNReceiptStatus = drASNReceiptStatus[0].PARAMETER_VALUE;
            } else {
                this.gASNReceiptStatus = "";
            }
            //Storage of Non Stock item Info for Delivery
            let drNonStock = asEnumerable(this.lstOrgParms).Where(x => x.PARAMETER_ID == "NON_STOCK_STORE").ToArray();
            if (drNonStock.length > 0) {
                this.gStrNonStockStore = drNonStock[0].PARAMETER_VALUE;
            }
            //Search POs by PO creation or Due date
            let drDueOrPo = asEnumerable(this.lstOrgParms).Where(x => x.PARAMETER_ID == "SEARCH_BY_DUE_OR_PO_DATE").ToArray();
            if (drDueOrPo.length > 0) {
                this.gStrSearchType = drDueOrPo[0].PARAMETER_VALUE;
            }
            //Enable Lot /Serial Tracking
            let drLotSerial = asEnumerable(this.lstOrgParms).Where(x => x.PARAMETER_ID == "LOT_SERIAL_ENABLED").ToArray();
            if (drLotSerial.length > 0) {
                this.gStrLotSerial = drLotSerial[0].PARAMETER_VALUE;
            }
            //Alternate UOM display in HHT
            let drAltUOM = asEnumerable(this.lstOrgParms).Where(x => x.PARAMETER_ID == "ALT_UOM_DISPLAY_OPT").ToArray();
            if (drAltUOM.length > 0) {
                this.gStrAltUOMDisplay = drAltUOM[0].PARAMETER_VALUE;
            }
            let drAllowExcessQty = asEnumerable(this.lstProfileApp).Where(x => x.PARAMETER_ID == "ALLOW_EXCESS_RECV_QTY").ToArray();
            if (drAllowExcessQty.length > 0) {
                this.gStrAllowExcessQty = drAllowExcessQty[0].PARAMETER_VALUE;
            }
            let drZeroRecWarn = asEnumerable(this.lstProfileApp).Where(x => x.PARAMETER_ID == "ZERO_RECEIPT_WARN").ToArray();
            if (drZeroRecWarn.length > 0) {
                this.gStrZeroReceiptWarn = drZeroRecWarn[0].PARAMETER_VALUE;
            }
            if (drZeroRecWarn != null && drZeroRecWarn.length > 0) {
                this.hdnCnfmZroQty = drZeroRecWarn[0].PARAMETER_VALUE;
            }
            let drSearchPOWithOutBU = asEnumerable(this.lstProfileApp).Where(x => x.PARAMETER_ID == "SEARCH_PO_WITHOUT_BU").ToArray();
            if (drSearchPOWithOutBU != null && drSearchPOWithOutBU.length > 0) {
                if ((drSearchPOWithOutBU[0].PARAMETER_VALUE != null || drSearchPOWithOutBU[0].PARAMETER_VALUE != "") && (this.hdnSearchWithOutBU != "")) {
                    this.hdnSearchWithOutBU = drSearchPOWithOutBU[0].PARAMETER_VALUE;
                }
            }

            let drDefaultDateRange = asEnumerable(this.lstProfileApp).Where(x => x.PARAMETER_ID == "DEFAULT_DATE_RANGE").ToArray();
            if (drDefaultDateRange.length > 0) {
                this.gDefaultDateRange = drDefaultDateRange[0].PARAMETER_VALUE;
            }
            let drDisplayComments = asEnumerable(this.lstProfileApp).Where(x => x.PARAMETER_ID == "DISPLAY_COMMENTS").ToArray();
            if (drDisplayComments.length > 0) {
                this.gDisplayComments = drDisplayComments[0].PARAMETER_VALUE;
            }
            let drIncludeASNPOs = asEnumerable(this.lstProfileApp).Where(x => x.PARAMETER_ID == "SEARCH_FOR_ASN_POS").ToArray();
            if (drIncludeASNPOs.length > 0 && (this.hdnIncludeASNPOs != null)) {
                if (drIncludeASNPOs[0].PARAMETER_VALUE != null && drIncludeASNPOs[0].PARAMETER_VALUE != "") {
                    this.hdnIncludeASNPOs = drIncludeASNPOs[0].PARAMETER_VALUE;
                }
                else {
                    this.hdnIncludeASNPOs = YesNo_Enum[YesNo_Enum.N].toString();
                }
            }

            //Default Label Printer
            let drDefPrinter = asEnumerable(this.lstProfileApp).Where(x => x.PARAMETER_ID == "DEFAULT_LABEL_PRINTER").ToArray();
            if (drDefPrinter.length > 0) {
                this.gStrDefPrinter = drDefPrinter[0].PARAMETER_VALUE;
            }

            //Alternate Printers
            let drSelPrinter = asEnumerable(this.lstProfileApp).Where(x => x.PARAMETER_ID == "LABEL_PRINTERS").ToArray();
            if (drSelPrinter.length > 0) {
                this.gStrSelPrinter = drSelPrinter[0].PARAMETER_VALUE;
            }

            //PO Comments Printing
            let drPoComments = asEnumerable(this.lstOrgParms).Where(x => x.PARAMETER_ID == "RECV_PRINT_POID_COMMENTS").ToArray();
            if (drPoComments.length > 0) {
                this.gStrPrintPoIDComments = drPoComments[0].PARAMETER_VALUE;
            }
            // Concatenate POID and Tracking Number
            let drPoIDConcacinate = asEnumerable(this.lstOrgParms).Where(x => x.PARAMETER_ID == "RECV_CONCATINATE_POID_TRKNO").ToArray();
            if (drPoIDConcacinate.length > 0) {
                this.gConcatinateTrkNoPoID = drPoIDConcacinate[0].PARAMETER_VALUE;
            }

            let drPrintingOption = asEnumerable(this.lstProfileApp).Where(x => x.PARAMETER_ID == "RECEIPT_DELIVER_PRINT_OPTIONS").ToArray();
            if (drPrintingOption.length > 0) {
                this.gStrRecDelprintoption = drPrintingOption[0].PARAMETER_VALUE;
            }
            else {
                this.gStrRecDelprintoption = Shiping_Label_PrinterType[Shiping_Label_PrinterType.None].toString();
            }

            let drdonotDefaulttrckno = asEnumerable(this.lstOrgParms).Where(x => x.PARAMETER_ID == "DONOT_DEFAULT_TRACKING_NUMBER").ToArray();
            if (drdonotDefaulttrckno.length > 0) {
                this.gdonotDefaulttrackingNumber = drdonotDefaulttrckno[0].PARAMETER_VALUE;
            }

            try {
                let intDelvShiptoIdsCnt: number = 0;
                if (this.shipToIdCount != null) {
                    intDelvShiptoIdsCnt = this.shipToIdCount;
                }
                if (intDelvShiptoIdsCnt > 0) {
                    this.gPrintStockHeader = "Y";
                } else {
                    this.gPrintStockHeader = "N";
                }
            }
            catch (ex) {
                this.clientErrorMsg(ex, "loadparameters");
            }

            if (screenName == "mt_recv_po_or_nonpo_receipts") {
                //Getting Nice Labels Printer Details
                try {
                    //Create an instance of ATPARSERVICE class
                    this.statusCode = -1;
                    this.spnrService.start();
                    await this.commonService.getNiceLabelsPrintersData(EnumApps.Receiving, "1", "").
                        catch(this.httpService.handleError).then((res: Response) => {
                            let data = res.json() as AtParWebApiResponse<MT_ATPAR_SETUP_PRO_PRINTERES>;
                            this.lstSetUpProPrinters = data.DataList;
                            this.statusCode = data.StatusCode;
                            switch (data.StatType) {
                                case StatusType.Success: {
                                    this.spnrService.stop();
                                    break;
                                }
                                case StatusType.Warn: {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    this.spnrService.stop();
                                    break;
                                }
                                case StatusType.Error: {
                                    this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    this.spnrService.stop();
                                    break;
                                }
                                case StatusType.Custom: {
                                    this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    this.spnrService.stop();
                                    break;
                                }
                            }
                        });
                    await this.enablePrintButtons();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "loadparameters");
                }

                if (this.gStrDefaultInput == YesNo_Enum[YesNo_Enum.Y].toString()) {
                    this.blnImgCountAll = true;
                    this.blnImgResetAll = true;
                }
                else {
                    this.blnImgCountAll = false;
                    this.blnImgResetAll = false;
                }
                if (this.gStrEditShipToId == YesNo_Enum[YesNo_Enum.Y].toString()) {
                    //this.blnShipToId = true;
                    //this.ddlShipToId = true;
                    this.blntxtShipIdDisable = false;
                }
                else {
                    //ddlShipToId.Enabled = false;
                    //txtShipId.Enabled = false;
                    this.blntxtShipIdDisable = true;
                }
                if (this.gStrNonPoItemsReceive == YesNo_Enum[YesNo_Enum.Y].toString()) {
                    this.btnNonPo = true;
                }
                else {
                    this.btnNonPo = false;
                }

                if (this.gStrAllowIUTAccess == "Purchasing") {
                    this.btnIUTSearch = false;
                    this.txtIutIsEditMode = true;
                }
                else {
                    if (this.gStrAllowIUTAccess == "Inter Unit") {
                        this.btnPoSearch = false;
                        this.btnIUTSearch = true;
                        this.txtIutIsEditMode = false;
                    }
                    else if (this.gStrAllowIUTAccess != "") {
                        this.btnIUTSearch = true;
                        this.txtIutIsEditMode = false;
                    }
                    else {
                        this.btnIUTSearch = false;
                        this.txtIutIsEditMode = true;
                    }
                }

                if (this.gStrSearchType == "DUE DATE") {
                    //rbtnDueDate.Checked = true;
                }
                else {
                    //rbtnPODate.Checked = true;
                }
                if (this.gStrNonStockStore == YesNo_Enum[YesNo_Enum.Y].toString()) {
                    this.blnTxtExtTrk = true;
                    this.blnLblExtTrk = true;
                }
                else {
                    this.blnTxtExtTrk = false;
                    this.blnLblExtTrk = false;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "loadparameters");
        }
    }

    async enablePrintButtons() {
        try {
            if (this.gStrRecDelprintoption == Shiping_Label_PrinterType[Shiping_Label_PrinterType.None].toString()) {

            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "enablePrintButtons");
        }
    }

    clearData() {
        try {
            this.lstRecvSendPoLines = [];
            this.lstRecvIutItems = [];
            this.lstMainItemLotSerial = [];

            // this.selectedBUnits = "Select BusinessUnit";
            this.selectedINVITEMID = "";
            this.hdnBunit = "";
            this.lblPhoneValue = "";
            this.txtSerchItemId = "";
            this.txtPkgs = "";
            this.hdnItemId = "";
            this.txtLading = "";
            this.txtTrk = "";
            this.gblnASNPO = false
            this.gSTime = "";
            this.gstrPrevComments = "";
            this.gInvoiceMthdCode = "";
            this.gDropShipFlag = "";
            this.gstrLoader = "";
            this.gstrlnkitemid = "";
            this.gstrlnklineNbr = "";
            this.selectedDdlCarrier = "Select Carrier";
            this.lblReceiverId = "";
            this.lblBuyerId = "";
            this.hdnNonPo = YesNo_Enum[YesNo_Enum.N].toString();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "clearData");
        }
    }

    clearSentDetails() {
        try {
            this.txtPONumber = "";
            this.txtIUT = "";
            this.txtInvoice = "";
            this.txtItemId = "";
            this.txtVendorId = "";
            this.txtVendorName = "";
            this.currentFromDate = new Date();
            this.txtToDate = new Date();

            if (this.gDefaultDateRange != null && this.gDefaultDateRange !== "") {
                this.currentFromDate.setDate(this.currentFromDate.getDate() - parseInt(this.gDefaultDateRange));
                this.txtFrmDate = (this.currentFromDate.getMonth() + 1) + '/' + (this.currentFromDate.getDate()) + '/' + this.currentFromDate.getFullYear();
                this.txtToDate = (this.currentDate.getMonth() + 1) + '/' + (this.currentDate.getDate()) + '/' + this.currentDate.getFullYear();
            } else {
                this.txtToDate = (this.currentDate.getMonth() + 1) + '/' + (this.currentDate.getDate()) + '/' + this.currentDate.getFullYear();
                this.txtFrmDate = (this.currentFromDate.getMonth() + 1) + '/' + (this.currentFromDate.getDate()) + '/' + this.currentFromDate.getFullYear();
            }
            this.chkIncludeAllPOLines = false;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "clearSentDetails");
        }
    }

    /**
    * 
    * LotSerial
    */
    async btnLotSerial_Click(event) {
        try {
            if (this.presentScreen == "PO") {
                this.breadCrumbMenu.SUB_MENU_NAME = 'Lot/Serial';
            } else if (this.presentScreen == "ScheduledPo") {
                this.breadCrumbMenu.SUB_MENU_NAME = 'Receive By Schedule - Lot/Serial';
            }

            this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.statusMsgs = [];
            this.LotSerialentity = new VM_RECV_LOTSERIAL();
            // this.lstItemLotSerial = [];
            this.lstFinalLotSerial = [];
            let dtLotSerial: VM_RECV_LOTSERIAL[] = [];
            this.bysch = false;
            this.tbl = false;
            this.page = false;
            this.lotserial = true;
            await this.loadparameters("mt_recv_LotSerial");

            if (this.lstMainItemLotSerial != null && this.lstMainItemLotSerial.length > 0) {
                this.lstFinalLotSerial = this.lstMainItemLotSerial.filter(x => x.ITEM_ID == this.txtSerchItemId && x.LINE_NBR == this.gstrlnklineNbr && x.SCHED_NBR == this.schedNbr && x.DELETE_FLAG == YesNo_Enum[YesNo_Enum.N].toString());
            }

            if (this.lstFinalLotSerial.length > 0) {
                this.lotserialGrid = true;
                this.intTolRecvQty = parseInt(this.selecstedRow.QTY);
            }
            else {
                this.lotserialGrid = false;
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Records Found" });
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnLotSerial_Click");
        }
    }

    private async buildColumns() {
        try {
            let dr = new VM_RECV_LOTSERIAL();
            dr.TRANSACTION_ID = "";
            dr.ITEM_ID = "";
            dr.LINE_NBR = "";
            dr.SCHED_NBR = "";
            dr.SERIAL_ID = "";
            dr.LOT_ID = "";
            dr.QTY = "";
            dr.EXPIRY_DATE = "";
            dr.UOM = "";
            dr.CONVERSION_RATE = "";
            dr.DELETE_FLAG = YesNo_Enum[YesNo_Enum.N].toString();
        } catch (ex) {
            this.clientErrorMsg(ex, "buildColumns");
        }
    }

    private async grdLotSerial_RowDataBound(lotSerialGrdData) {
        try {
            this.statusMsgs = [];
            if (lotSerialGrdData != null && lotSerialGrdData.length > 0) {
                for (let i = 0; i < lotSerialGrdData.length; i++) {
                    await this.populateUOM(this.lotSerialConverfactor, this.selecstedRow.UNIT_OF_MEASURE, this.selecstedRow.LINE_NBR.toString(), this.serialControl, YesNo_Enum[YesNo_Enum.N].toString(), lotSerialGrdData[i]);
                    if (this.strLotSerialUom != null && this.strLotSerialUom != "") {
                        lotSerialGrdData[i].SELECTED_UOM = this.strLotSerialUom;
                    }
                    if (lotSerialGrdData[i].UOM != null && lotSerialGrdData[i].UOM != "" && this.ddllotserialUomEnable) {
                        let strSelectedUOM: string = lotSerialGrdData[i].UOM;
                        if (this.selecstedRow.UNIT_OF_MEASURE != strSelectedUOM) {

                        }
                    }
                    if (this.gStrLotSerial == Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.MMIS].toString()) {
                        if (this.serialControl == YesNo_Enum[YesNo_Enum.Y].toString()) {
                            this.txtLotSerialQtyIsEditMode = true;
                        } else {
                            this.txtLotSerialQtyIsEditMode = false;
                        }
                        if (this.lotControl == YesNo_Enum[YesNo_Enum.Y].toString() && this.serialControl == YesNo_Enum[YesNo_Enum.N].toString()) {
                            this.txtSerialIDIsEditMode = true;
                            this.txtLotIdIsEditMode = false;
                            this.txtLotSerialQtyIsEditMode = false;
                            setTimeout(() => {
                                let lotItem = document.getElementById("txtLotserialLotId")
                                if (lotItem != null) {
                                    lotItem.focus();
                                }
                            }, 2);
                            return;
                            // txtLot.Focus();
                            //  document.getElementById('txtLotserialLotId').focus();
                        }
                        else if (this.lotControl == YesNo_Enum[YesNo_Enum.Y].toString() && this.serialControl == YesNo_Enum[YesNo_Enum.Y].toString()) {
                            this.txtSerialIDIsEditMode = false;
                            this.txtLotIdIsEditMode = false;
                            this.txtLotSerialQtyIsEditMode = true;
                            setTimeout(() => {
                                let serialItem = document.getElementById("txtLotserialSerialId")
                                if (serialItem != null) {
                                    serialItem.focus();
                                }
                            }, 2);
                            return;
                        }
                        else if (this.serialControl == YesNo_Enum[YesNo_Enum.Y].toString() && this.lotControl == YesNo_Enum[YesNo_Enum.N].toString()) {
                            this.txtSerialIDIsEditMode = false;
                            this.txtLotIdIsEditMode = true;
                            this.txtLotSerialQtyIsEditMode = true;
                            setTimeout(() => {
                                let lotItem = document.getElementById("txtLotserialSerialId")
                                if (lotItem != null) {
                                    lotItem.focus();
                                }
                            }, 2);
                        }
                    }
                    else {
                        if (this.serialControl == YesNo_Enum[YesNo_Enum.Y].toString()) {
                            this.txtLotSerialQtyIsEditMode = true;
                        }
                        else {
                            this.txtLotSerialQtyIsEditMode = false;
                        }
                        this.txtSerialIDIsEditMode = false;
                        this.txtLotIdIsEditMode = false;
                        setTimeout(() => {
                            let lotItem = document.getElementById("txtLotserialSerialId")
                            if (lotItem != null) {
                                lotItem.focus();
                            }
                        }, 2);
                    }

                    if (this.txtLotSerialQtyIsEditMode == true) {
                        lotSerialGrdData[i].QTY = lotSerialGrdData[i].QTY;
                    }
                    if (lotSerialGrdData[i].QTY == null || lotSerialGrdData[i].QTY == "") {
                        lotSerialGrdData[i].QTY = "1";
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "grdLotSerial_RowDataBound");
        }
    }

    async btnLotSerialAdd_Click() {
        try {

            if (this.presentScreen == "PO") {
                this.breadCrumbMenu.SUB_MENU_NAME = 'Lot/Serial - Add';
                this.breadCrumbMenu.IS_MESSAGE = true;
                this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            } else if (this.presentScreen == "ScheduledPo") {
                this.breadCrumbMenu.SUB_MENU_NAME = 'Receive By Schedule - Lot/Serial - Add';
                this.breadCrumbMenu.IS_MESSAGE = true;
                this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            }

            this.mode = "ADD";
            this.statusMsgs = [];
            if (this.lstMainItemLotSerial == null || this.lstMainItemLotSerial.length == 0) {
                this.LotSerialentity = new VM_RECV_LOTSERIAL();
                this.LotSerialentity.TRANSACTION_ID = this.gTransactionID.toString();
                this.LotSerialentity.ITEM_ID = this.txtSerchItemId;
                this.LotSerialentity.LINE_NBR = this.gstrlnklineNbr;
                this.LotSerialentity.SCHED_NBR = this.schedNbr;
                this.LotSerialentity.SERIAL_ID = "";
                this.LotSerialentity.LOT_ID = "";
                this.LotSerialentity.QTY = "";
                this.LotSerialentity.EXPIRY_DATE = null;
                this.LotSerialentity.UOM = "";
                this.LotSerialentity.CONVERSION_RATE = "";
                this.LotSerialentity.SELECTED_UOM = "";
                this.LotSerialentity.DELETE_FLAG = YesNo_Enum[YesNo_Enum.N].toString();
                if (this.lstFinalLotSerial != null && this.lstFinalLotSerial.length > 0) {
                    this.LotSerialentity.ROWINDEX = this.lstFinalLotSerial[this.lstFinalLotSerial.length - 1].ROWINDEX + 1;
                }
                else {
                    this.LotSerialentity.ROWINDEX = 0;
                }
                this.lstLotSerial.push(this.LotSerialentity);
                if (this.lstLotSerial.length > 0) {
                    await this.grdLotSerial_RowDataBound(this.lstLotSerial);
                }
            }
            else {
                this.lstLotSerial = this.lstMainItemLotSerial.filter(x => x.ITEM_ID == this.txtSerchItemId && x.LINE_NBR == this.gstrlnklineNbr && x.SCHED_NBR == this.schedNbr && x.DELETE_FLAG == YesNo_Enum[YesNo_Enum.N].toString());

                this.LotSerialentity = new VM_RECV_LOTSERIAL();
                this.LotSerialentity.TRANSACTION_ID = this.gTransactionID.toString();
                this.LotSerialentity.ITEM_ID = this.txtSerchItemId;
                this.LotSerialentity.LINE_NBR = this.gstrlnklineNbr;
                this.LotSerialentity.SCHED_NBR = this.schedNbr;
                this.LotSerialentity.SERIAL_ID = "";
                this.LotSerialentity.LOT_ID = "";
                this.LotSerialentity.QTY = "";
                this.LotSerialentity.EXPIRY_DATE = null;
                this.LotSerialentity.UOM = "";
                this.LotSerialentity.CONVERSION_RATE = "";
                this.LotSerialentity.SELECTED_UOM = "";
                this.LotSerialentity.DELETE_FLAG = YesNo_Enum[YesNo_Enum.N].toString();
                if (this.lstFinalLotSerial != null && this.lstFinalLotSerial.length > 0) {
                    this.LotSerialentity.ROWINDEX = this.lstFinalLotSerial[this.lstFinalLotSerial.length - 1].ROWINDEX + 1;
                }
                else {
                    this.LotSerialentity.ROWINDEX = 0;
                }
                this.lstLotSerial.push(this.LotSerialentity);
               
                if (this.lstLotSerial != null && this.lstLotSerial.length > 0) {
                    await this.grdLotSerial_RowDataBound(this.lstLotSerial);
                }
            }
            this.lotserial = false;
            this.LotSerialentity.QTY = "1";
            this.txtLotserialExpDate = "";
            this.editform = true;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnLotSerialAdd_Click");
        }
    }

    async btnLotSerialDelete_Click(lotserialDeletedData) {
        try {
            this.statusMsgs = [];
            await this.lotSerialDeleteConfirm(lotserialDeletedData);
        } catch (ex) {
            this.clientErrorMsg(ex, "btnLotSerialDelete_Click");
        }
    }

    async lotSerialDeleteConfirm(lotserialData: VM_RECV_LOTSERIAL) {
        try {
            this.statusMsgs = [];
            this.confirmationService.confirm({
                message: "Do you want to delete the existing LotSerial ID?",
                accept: async () => {
                    this.spnrService.start();
                    if (lotserialData != null) {

                        lotserialData.DELETE_FLAG = YesNo_Enum[YesNo_Enum.Y].toString();
                        if (lotserialData.QTY != null && lotserialData.QTY != "" && lotserialData.QTY != undefined) {
                            this.intTolRecvQty = this.intTolRecvQty - (parseInt(lotserialData.QTY));
                        }

                        this.lotSerialDeleteFlg = true;
                        if (this.lstMainItemLotSerial != null && this.lstMainItemLotSerial.length > 0) {
                            let lotserialitems = this.lstMainItemLotSerial.filter(x => x.ITEM_ID == lotserialData.ITEM_ID && x.LINE_NBR == lotserialData.LINE_NBR &&
                                x.SCHED_NBR == lotserialData.SCHED_NBR && x.LOT_ID == lotserialData.LOT_ID && x.SERIAL_ID == lotserialData.SERIAL_ID);
                            if (lotserialitems != null) {
                                for (let i = 0; i < lotserialitems.length; i++) {
                                    lotserialitems[i].DELETE_FLAG = YesNo_Enum[YesNo_Enum.Y].toString();
                                }
                            }
                        }

                    }
                    if (this.lstFinalLotSerial.length > 0) {
                        let deletedLst = asEnumerable(this.lstFinalLotSerial).Where(x => x.DELETE_FLAG == YesNo_Enum[YesNo_Enum.N].toString()).ToArray();
                        if (deletedLst.length > 0) {
                            this.lstFinalLotSerial = [];
                            for (let i = 0; i < deletedLst.length; i++) {
                                let LotserialEntity = new VM_RECV_LOTSERIAL();
                                LotserialEntity.TRANSACTION_ID = deletedLst[i].TRANSACTION_ID;
                                LotserialEntity.ITEM_ID = deletedLst[i].ITEM_ID;
                                LotserialEntity.LINE_NBR = deletedLst[i].LINE_NBR;
                                LotserialEntity.SCHED_NBR = deletedLst[i].SCHED_NBR;
                                LotserialEntity.SERIAL_ID = deletedLst[i].SERIAL_ID;
                                LotserialEntity.LOT_ID = deletedLst[i].LOT_ID;
                                LotserialEntity.QTY = deletedLst[i].QTY;
                                LotserialEntity.EXPIRY_DATE = deletedLst[i].EXPIRY_DATE;
                                LotserialEntity.UOM = deletedLst[i].UOM;
                                LotserialEntity.CONVERSION_RATE = deletedLst[i].CONVERSION_RATE;
                                LotserialEntity.DELETE_FLAG = deletedLst[i].DELETE_FLAG;
                                this.lstFinalLotSerial.push(LotserialEntity);
                            }
                        } else if (this.lstFinalLotSerial.length == 1) {
                            let LotserialEntity = new VM_RECV_LOTSERIAL();
                            LotserialEntity.TRANSACTION_ID = this.lstFinalLotSerial[0].TRANSACTION_ID;
                            LotserialEntity.ITEM_ID = this.lstFinalLotSerial[0].ITEM_ID;
                            LotserialEntity.LINE_NBR = this.lstFinalLotSerial[0].LINE_NBR;
                            LotserialEntity.SCHED_NBR = this.lstFinalLotSerial[0].SCHED_NBR;
                            LotserialEntity.SERIAL_ID = this.lstFinalLotSerial[0].SERIAL_ID;
                            LotserialEntity.LOT_ID = this.lstFinalLotSerial[0].LOT_ID;
                            LotserialEntity.QTY = this.lstFinalLotSerial[0].QTY;
                            LotserialEntity.EXPIRY_DATE = this.lstFinalLotSerial[0].EXPIRY_DATE;
                            LotserialEntity.UOM = this.lstFinalLotSerial[0].UOM;
                            LotserialEntity.CONVERSION_RATE = this.lstFinalLotSerial[0].CONVERSION_RATE;
                            LotserialEntity.DELETE_FLAG = this.lstFinalLotSerial[0].DELETE_FLAG;

                            if (this.lstFinalLotSerial[0].DELETE_FLAG == "Y") {
                                this.lstFinalLotSerial = [];
                                this.lotserialGrid = false;
                            } else {
                                this.lstFinalLotSerial = [];
                                this.lstFinalLotSerial.push(LotserialEntity);
                            }

                        }
                    }
                    if (this.lstFinalLotSerial != null && this.lstFinalLotSerial.length > 0) {
                        await this.grdLotSerial_RowDataBound(this.lstFinalLotSerial);
                        if (this.lstFinalLotSerial.length == 1 && this.lstFinalLotSerial[0].DELETE_FLAG == YesNo_Enum[YesNo_Enum.Y].toString()) {
                            this.lotserialGrid = false;
                        }
                    }
                    this.spnrService.stop();
                    let msg = AtParConstants.Deleted_Msg.replace("1%", "Lot Serial").replace("2%", lotserialData.SERIAL_ID);
                    this.statusMsgs.push({
                        severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg
                    });
                },
                reject: () => {

                }
            });
            this.spnrService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "lotSerialDeleteConfirm");
        }
    }

    async btnLotSerialSave_Click() {
        try {
            this.statusMsgs = [];
            this.cntLotSerialQty = 0;
            if (this.lstMainItemLotSerial != null && this.lstMainItemLotSerial.length > 0) {
                if (this.lstFinalLotSerial != null && this.lstFinalLotSerial.length == 1 && this.lstFinalLotSerial[0].DELETE_FLAG == YesNo_Enum[YesNo_Enum.Y]) {

                } else {
                    if (this.lstFinalLotSerial != null && this.lstFinalLotSerial.length > 0) {
                        for (let i = 0; i < this.lstFinalLotSerial.length; i++) {
                            let lotSerialDataLst = this.lstMainItemLotSerial.filter(x => x.ITEM_ID == this.lstFinalLotSerial[i].ITEM_ID &&
                                x.TRANSACTION_ID == this.lstFinalLotSerial[i].TRANSACTION_ID && x.LOT_ID == this.lstFinalLotSerial[i].LOT_ID &&
                                x.LINE_NBR == this.lstFinalLotSerial[i].LINE_NBR && x.SCHED_NBR == this.lstFinalLotSerial[i].SCHED_NBR &&
                                x.SERIAL_ID == this.lstFinalLotSerial[i].SERIAL_ID);
                            if (lotSerialDataLst == null || lotSerialDataLst.length == 0) {
                                this.lstMainItemLotSerial.push(this.lstFinalLotSerial[i]);
                            }
                        }
                    }
                }
            } else {
                this.lstMainItemLotSerial = this.lstFinalLotSerial;
            }

            for (var i = 0; i < this.lstFinalLotSerial.length; i++) {
                if (this.lstFinalLotSerial[i].ITEM_ID == this.txtSerchItemId && this.lstFinalLotSerial[i].LINE_NBR == this.gstrlnklineNbr &&
                    this.lstFinalLotSerial[i].DELETE_FLAG == YesNo_Enum[YesNo_Enum.N].toString()) {
                    if (this.lstFinalLotSerial[i].QTY != "" && this.lstFinalLotSerial[i].QTY != null && this.lstFinalLotSerial[i].QTY != undefined) {
                        this.cntLotSerialQty = this.cntLotSerialQty + parseInt(this.lstFinalLotSerial[i].QTY);
                    }
                }
            }
            if (this.cntLotSerialQty != 0) {
                this.selecstedRow.QTY = this.cntLotSerialQty;
                this.selecstedRow.QTYDESABLEFLAG = true;
            } else {
                this.selecstedRow.QTYDESABLEFLAG = false;
            }
            this.lotSerialDeleteFlg = false;
            this.selecstedRow.RBFlAG = true;
            this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Saved Successfully, Click the Go Back button to show the items grid." });

        } catch (ex) {
            this.clientErrorMsg(ex, "btnLotSerialSave_Click");
        }
    }

    async addNewRowToGrid() {
        try {
            this.statusMsgs = [];
            let strUOMVal: string = "";
            let arrSelectedConf: string[] = [];
            let strSelectedUOMFact: string = "";
            let strExpDate: Date = new Date();
            let dblFraction: number = 0;
            let arrUOM: string[] = [];
            let arrConf: string[] = [];

            strUOMVal = this.LotSerialentity.SELECTED_UOM;
            if (strUOMVal != null && strUOMVal != "") {
                arrUOM = strUOMVal.split("(");
            }
            if (arrUOM.length > 1) {
                arrConf = arrUOM[1].split(" ");
            }
            //When SelectedUOM conversion rate is in Fractions like 1/100 then splitting it with / 
            if (arrConf.length > 1) {
                if (arrConf[0].indexOf("/") == -1) {
                    //when selectedUOM conversion rate is like(BX( 1 EA)) 
                    strSelectedUOMFact = arrConf[0];
                }
                else {
                    //when selectedUOM conversion rate is like(BX( 1/100 EA)) 
                    arrSelectedConf = arrConf[0].split("/");
                    strSelectedUOMFact = (parseInt(arrSelectedConf[0]) / parseInt(arrSelectedConf[1])).toString();
                }
            }
            else {
                strSelectedUOMFact = arrConf[0];
            }
            //Recall Checking
            let strRecallFlag: string = this.lstRecvSendPoLines[0].RECAL_FLAG.toString();
            if (strRecallFlag == YesNo_Enum[YesNo_Enum.Y].toString()) {
                let dtRecallInfo = this.lstReCallInfo;
                if (dtRecallInfo.length > 0) {
                    let drrecall = asEnumerable(dtRecallInfo).Where(x => x.ITEM_ID == this.txtSerchItemId && x.LOT_NO == "" && x.SERIAL_NO == "").ToArray();
                    if (drrecall.length > 0) {
                        //This Item 1% (Lot 2%/Serial 3%) is on recall. The item cannot be received.
                        let strValue: string = "";
                        strValue = this.txtSerchItemId + "( LOT " + this.LotSerialentity.LOT_ID + " " + " /Serial " + this.LotSerialentity.SERIAL_ID + ")";
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "This Item " + strValue + " is on recall. The item cannot be received." });
                        this.LotSerialentity.QTY = "";
                        this.txtLotSerialQtyIsEditMode = true;
                        return;
                    }
                }
            }

            if (this.gStrLotSerial == Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.MMIS].toString()) {
                if (this.serialControl == YesNo_Enum[YesNo_Enum.Y].toString()) {
                    this.LotSerialentity.QTY = "1";
                    this.txtLotSerialQtyIsEditMode = true;
                }
                else {
                    this.txtLotSerialQtyIsEditMode = false;
                }
                if (this.lotControl == YesNo_Enum[YesNo_Enum.Y].toString() && this.serialControl == YesNo_Enum[YesNo_Enum.N].toString()) {
                    if (this.LotSerialentity.LOT_ID == "" || this.LotSerialentity.QTY == "") {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Enter Mandatory Fields" });
                        return;
                    }
                }
                else if (this.lotControl == YesNo_Enum[YesNo_Enum.Y].toString() && this.serialControl == YesNo_Enum[YesNo_Enum.Y].toString()) {
                    if (this.LotSerialentity.LOT_ID == "" || this.LotSerialentity.SERIAL_ID == "" || this.LotSerialentity.QTY == "") {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Enter Mandatory Fields" });
                        return;
                    }
                }
                else if (this.lotControl == YesNo_Enum[YesNo_Enum.N].toString() && this.serialControl == YesNo_Enum[YesNo_Enum.Y].toString()) {
                    if (this.LotSerialentity.SERIAL_ID == "" || this.LotSerialentity.QTY == "") {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Enter Mandatory Fields" });
                        return;
                    }
                }
            }
            else {
                if (this.serialControl == YesNo_Enum[YesNo_Enum.Y].toString()) {
                    this.LotSerialentity.QTY = "1";
                    this.txtLotSerialQtyIsEditMode = true;
                }
                else {
                    this.txtLotSerialQtyIsEditMode = false;
                }
                if ((this.LotSerialentity.LOT_ID == "" && this.LotSerialentity.SERIAL_ID == "") || this.LotSerialentity.QTY == "") {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Enter Mandatory Fields" });
                    return;
                }
                if (this.LotSerialentity.SERIAL_ID != "" && (parseInt(this.LotSerialentity.QTY) * parseInt(strSelectedUOMFact)) != 1) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Quantity should be 1" });
                    return;
                }
            }

            let dtTodaydate: Date = new Date();// Convert.ToDateTime(System.DateTime.Today).ToString("MM/dd/yyyy");             
            let strExpYear: string = "";
            if (this.txtLotserialExpDate != null && this.txtLotserialExpDate != "") {
                let dtExpdate: Date = this.txtLotserialExpDate;
                //date validating                   
                if (Date.parse(this.txtLotserialExpDate.getMonth() + '/' + this.txtLotserialExpDate.getDate() + '/' + this.txtLotserialExpDate.getFullYear()) < Date.parse(dtTodaydate.getMonth() + "/" + dtTodaydate.getDate() + "/" + dtTodaydate.getFullYear())) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Selected Lot/Serial is Expired." });
                    return;
                }
                else {
                    strExpDate = this.txtLotserialExpDate;
                }
            }
            else {
                strExpDate = null;
            }

            if (this.gStrUOMEditFlag == YesNo_Enum[YesNo_Enum.Y].toString()) {
                if (this.gStrAltUOMDisplay == this.gRecv_StandardUOM) {
                    dblFraction = parseInt(this.LotSerialentity.QTY) * (parseInt(strSelectedUOMFact) / this.lotSerialConverfactor);
                }
                else if (this.gStrAltUOMDisplay == this.gRecv_PoUOM) {
                    dblFraction = parseInt(this.LotSerialentity.QTY) * (parseInt(strSelectedUOMFact) / this.lotSerialConverfactor);
                }
            }
            else {
                dblFraction = parseInt(this.LotSerialentity.QTY);
            }

            if (this.lotControl == YesNo_Enum[YesNo_Enum.N].toString()) {
                if ((parseInt(this.strTotalQty) < dblFraction) && this.gStrAllowExcessQty == YesNo_Enum[YesNo_Enum.N].toString()) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Receive quantity cannot be greater than open quantity." });
                    this.LotSerialentity.QTY = "";
                    // txtQty.Focus();
                    return;
                }
            }

            if (this.LotSerialentity.SERIAL_ID != "" && this.LotSerialentity.SERIAL_ID != undefined) {
                this.LotSerialentity.SERIAL_ID = this.LotSerialentity.SERIAL_ID.toUpperCase();
            }
            else {
                this.LotSerialentity.SERIAL_ID = this.LotSerialentity.SERIAL_ID;
            }
            if (this.LotSerialentity.LOT_ID != "" && this.LotSerialentity.LOT_ID != undefined) {
                this.LotSerialentity.LOT_ID = this.LotSerialentity.LOT_ID.toUpperCase();
            }
            else {
                this.LotSerialentity.LOT_ID = this.LotSerialentity.LOT_ID;
            }

            this.LotSerialentity.CONVERSION_RATE = strSelectedUOMFact;
            this.LotSerialentity.UOM = arrUOM[0].toString();

            let intQtyPo: number = parseInt(this.selecstedRow.QTY_PO);
            let checklotserialitem: any
            if (this.mode != "ADD") {
                checklotserialitem = this.lstFinalLotSerial.filter(x => x.SERIAL_ID == this.LotSerialentity.SERIAL_ID
                    && x.LOT_ID == this.LotSerialentity.LOT_ID);
            }
            else {
                checklotserialitem = this.lstFinalLotSerial.filter(x => x.SERIAL_ID == this.LotSerialentity.SERIAL_ID
                    && x.LOT_ID == this.LotSerialentity.LOT_ID);
                if (checklotserialitem.length > 0) {
                    await this.btnLotSerialAdd_Click();
                    if (!this.txtLotSerialQtyIsEditMode) {
                        this.LotSerialentity.QTY = "";
                    }
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Item already added to the existing issue." });
                    return;
                }
            }
            if (this.LotSerialentity.QTY != null && this.LotSerialentity.QTY != "") {
                let strCon_Rate: string = this.LotSerialentity.CONVERSION_RATE == "" ? "1" : this.LotSerialentity.CONVERSION_RATE;
                if (this.mode == "ADD") {
                    this.intTolRecvQty = this.intTolRecvQty + (parseInt(this.LotSerialentity.QTY)) * parseInt(strCon_Rate);
                    if (this.gStrAllowExcessQty == YesNo_Enum[YesNo_Enum.N].toString()) {
                        if (this.intTolRecvQty > intQtyPo) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Receive quantity cannot be greater than open quantity." });
                            this.intTolRecvQty = this.intTolRecvQty - (parseInt(this.LotSerialentity.QTY)) * parseInt(strCon_Rate);
                            if (!this.txtLotSerialQtyIsEditMode) {
                                this.LotSerialentity.QTY = "";
                            }
                            return;

                            //if (!(this.serialControl == YesNo_Enum[YesNo_Enum.Y].toString())) {
                            //    }                     
                            // txtQty.Focus();
                            //setTimeout(() => {
                            //    let txtltserial=document.getElementById('txtLotserialQty');                              
                            //    if (txtltserial != null) {
                            //        txtltserial.focus();
                            //    }
                            //}, 1)

                        }
                    }
                }
            }
            this.LotSerialentity.DELETE_FLAG = YesNo_Enum[YesNo_Enum.N].toString();
            if (strExpDate != null) {
                this.LotSerialentity.EXPIRY_DATE = ((strExpDate.getMonth()) + 1 + '/' + (strExpDate.getDate()) + '/' + strExpDate.getFullYear() + ' 12:00:00 AM').toString();
            }
            else {
                this.LotSerialentity.EXPIRY_DATE = null;
            }
            this.LotSerialentity.TRANSACTION_ID = this.gTransactionID.toString();
            this.LotSerialentity.ITEM_ID = this.txtSerchItemId;
            this.LotSerialentity.LINE_NBR = this.gstrlnklineNbr;
            this.LotSerialentity.SCHED_NBR = this.schedNbr;
            if (this.mode == "ADD") {
                if (this.lotSerialSchdFlg) {
                    this.LotSerialentity.LOTSERIALSCHDFLG = true;
                }
                this.lstFinalLotSerial.push(this.LotSerialentity);
                await this.btnLotSerialAdd_Click();
                let msg = AtParConstants.Created_Msg.replace("1%", "Lot/Serial").replace("2%", "");
                this.statusMsgs.push({
                    severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg
                });
                return;
            }
            else {
                this.lstFinalLotSerial[this.LotSerialentity.ROWINDEX].LOT_ID = this.LotSerialentity.LOT_ID;
                this.lstFinalLotSerial[this.LotSerialentity.ROWINDEX].SERIAL_ID = this.LotSerialentity.SERIAL_ID;
                this.lstFinalLotSerial[this.LotSerialentity.ROWINDEX].QTY = this.LotSerialentity.QTY;
                this.lstFinalLotSerial[this.LotSerialentity.ROWINDEX].EXPIRY_DATE = this.LotSerialentity.EXPIRY_DATE;
                let msg = AtParConstants.Updated_Msg.replace("1%", "Lot/Serial").replace("2%", "");
                this.statusMsgs.push({
                    severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg
                });
                this.editform = false;
                this.lotserial = true;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "addNewRowToGrid");
        }
    }

    async btnLotSerialGrdEdit_Click(lotId, serialId, qty, expiryDate, selectedUom, rowIndex, rowData) {
        try {
            if (this.presentScreen == "PO") {
                this.breadCrumbMenu.SUB_MENU_NAME = 'Lot/Serial - Edit';
                this.breadCrumbMenu.IS_MESSAGE = true;
                this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            } else if (this.presentScreen == "ScheduledPo") {
                this.breadCrumbMenu.SUB_MENU_NAME = 'Receive By Schedule - Lot/Serial - Edit';
                this.breadCrumbMenu.IS_MESSAGE = true;
                this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            }

            this.mode = "EDIT";
            if (expiryDate != null && expiryDate != "") {
                this.txtLotserialExpDate = new Date(expiryDate);
            }
            if (rowData.EXPIRY_DATE == null || rowData.EXPIRY_DATE == "") {
                this.txtLotserialExpDate = "";
            }
            this.LotSerialentity.LOT_ID = lotId;
            this.LotSerialentity.SERIAL_ID = serialId;
            this.LotSerialentity.QTY = qty;
            this.LotSerialentity.EXPIRY_DATE = this.txtLotserialExpDate;
            this.LotSerialentity.SELECTED_UOM = selectedUom;
            this.LotSerialentity.ROWINDEX = rowIndex;

            if (this.lstFinalLotSerial.length > 0) {
                await this.grdLotSerial_RowDataBound(this.lstFinalLotSerial);
            }
            this.editform = !this.editform;
            this.lotserial = false;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnLotSerialGrdEdit_Click");
        }
    }

    async btnLotSerialEditSave_Click() {
        try {
            this.statusMsgs = [];
            await this.addNewRowToGrid();
            if (this.mode == "ADD") {

            } else {
                this.lotserial = false;
                this.editform = true;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnLotSerialEditSave_Click");
        }
    }

    async btnGoBackToLotSerial_Click() {
        try {
            this.statusMsgs = null;

            if (this.presentScreen == "PO") {
                this.breadCrumbMenu.SUB_MENU_NAME = 'Lot/Serial';
            } else if (this.presentScreen == "ScheduledPo") {
                this.breadCrumbMenu.SUB_MENU_NAME = 'Receive By Schedule - Lot/Serial';
            }

            this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.editform = false;
            this.lotserial = true;
            if (this.lstFinalLotSerial.length > 0) {
                this.lotserialGrid = true;
            }
            else {
                this.lotserialGrid = false;
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Records Found" });
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnGoBackToLotSerial_Click");
        }
    }

    async btnLotSerialGoBack_Click() {
        try {
            if (this.presentScreen == "PO") {
                this.bysch = false;
                this.lotserial = false;
                this.lotserialGrid = false;
                this.editform = false;
                this.tbl = true;
                this.page = true;
                this.breadCrumbMenu.SUB_MENU_NAME = '';
                this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            } else if (this.presentScreen == "ScheduledPo") {
                this.bysch = true;
                this.lotserial = false;
                this.lotserialGrid = false;
                this.editform = false;
                this.tbl = false;
                this.page = false;
                this.breadCrumbMenu.SUB_MENU_NAME = ' Receive By Schedule';
                this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            }

            if (this.lstFinalLotSerial.length == 1) {
                if (this.lstFinalLotSerial[0].ITEM_ID == this.txtSerchItemId && this.lstFinalLotSerial[0].LINE_NBR == this.gstrlnklineNbr &&
                    this.lstFinalLotSerial[0].DELETE_FLAG == YesNo_Enum[YesNo_Enum.Y].toString()) {
                    if (this.lotSerialDeleteFlg != true) {
                        this.selecstedRow.QTY = "";
                        this.selecstedRow.QTYDESABLEFLAG = false;
                    }
                }
            }

            if (this.cntLotSerialQty == 0) {
                this.selecstedRow.QTY = "";
            }
            this.intTolRecvQty = 0;

            if (this.lotSerialDeleteFlg == true) {
                if (this.lstMainItemLotSerial != null && this.lstMainItemLotSerial.length > 0) {
                    let lotserialitems = this.lstMainItemLotSerial.filter(x => x.ITEM_ID == this.txtSerchItemId && x.LINE_NBR == this.gstrlnklineNbr && x.SCHED_NBR == this.schedNbr);
                    if (lotserialitems != null) {
                        for (let i = 0; i < lotserialitems.length; i++) {
                            lotserialitems[i].DELETE_FLAG = YesNo_Enum[YesNo_Enum.N].toString();
                        }
                    }
                }
                this.lotSerialDeleteFlg = false;
            } else {
                let lotserialitems = this.lstMainItemLotSerial.filter(x => x.ITEM_ID == this.txtSerchItemId && x.LINE_NBR == this.gstrlnklineNbr && x.SCHED_NBR == this.schedNbr && x.DELETE_FLAG == YesNo_Enum[YesNo_Enum.Y].toString());

                for (let x = 0; x < lotserialitems.length; x++) {
                    let index: number = this.lstMainItemLotSerial.indexOf(lotserialitems[x]);
                    if (index !== -1) {
                        this.lstMainItemLotSerial.splice(index, 1);
                    }
                }

            }

            //var lstFiltered = this.lstRecvSendPoLines.filter(x => x.INV_ITEM_ID == this.txtSerchItemId && x.LINE_NBR == parseInt(this.gstrlnklineNbr));
            //if (lstFiltered != null && lstFiltered.length > 0) {
            //    lstFiltered[0].QTY = cntQty;
            //}
            //lstFiltered[0].RBFlAG = true;

        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnLotSerialGoBack_Click");
        }
    }

    async LotSerial_selectChanged(event) {
        this.statusMsgs = [];
        try {
            this.statusMsgs = [];
            this.LotSerialentity.SELECTED_UOM = event.label;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "LotSerial_selectChanged");
        }
    }

    convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
    }

    /**
    * 
    * End LotSerial
    */

    /**
    * Scheduled PO
    * @param ven
    */
    byschedule(poLineRowData) {
        try {
            this.presentScreen = "ScheduledPo";
            this.statusMsgs = [];
            if (poLineRowData.RBFlAG == true) {
                this.breadCrumbMenu.SUB_MENU_NAME = ' Receive By Schedule';

                this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                this.bysch = !this.bysch;
                this.tbl = false;
                this.page = false;
                this.txtLading = '';
                this.txtSchdExTrk = "";
                this.schPO = true;
                this.lotSerialSchdFlg = true;
                this.scheduledPOBind(poLineRowData);
                this.strItemId = poLineRowData.INV_ITEM_ID;
                this.strLineNbr = poLineRowData.LINE_NBR;

                var elmnt = this.document.getElementById('main-section');
                elmnt.scrollTop = 0;

            }
        } catch (ex) {
            this.clientErrorMsg(ex, "byschedule");
        }
    }

    async scheduledPOBind(ven) {
        try {
            this.statusMsgs = [];
            var fact = this.lstRecvSendPoLines.filter(x => x.INV_ITEM_ID == ven.INV_ITEM_ID && x.LINE_NBR == ven.LINE_NBR);
            if (fact != null && fact.length > 0) {
                if (fact[0].CONVERSION_RATE !== null || fact[0].CONVERSION_RATE != undefined) {
                    this.dblConvertionfactor = fact[0].CONVERSION_RATE;
                }
            }
            this.mStandardConversionRate = fact[0].CONVERSION_RATE.toString();
            this.strUOM = fact[0].UNIT_OF_MEASURE.toString();
            this.strLineId = fact[0].LINE_ID.toString();
            this.StrSerialControlled = fact[0].SERIAL_CONTROLLED.toString();
            this.StrLotControlled = fact[0].LOT_CONTROLLED.toString();
            this.strItemId = fact[0].INV_ITEM_ID.toString();
            this.strLineNbr = fact[0].LINE_NBR.toString();

            await this.buildSchdDetails();
            this.lstBunits;
            this.lstShipToIds;
            this.lstOrgParms;
            this.lstProfileApp;
            this.lstUserApp;
            this.lstScreenApp;
            this.lstInventoryBunits;
            this.shipToIdCount;
            this.grdReceiveItems_RowDataBound(this.dtScheduleItems);
            this.btnPntrLotSerialDisable = false;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "scheduledPOBind");
        }
    }

    async buildSchdDetails() {
        try {
            this.dtScheduleItems = [];
            var filteredList = this.lstGridRecvSendPoLines.filter(x => x.INV_ITEM_ID == this.strItemId && x.LINE_NBR == parseInt(this.strLineNbr));
            if (filteredList != null) {
                filteredList.forEach(x => {
                    x.QTY = x.ASN_QTY, x.QTY_PO = x.LINE_PO_QTY, x.CARRIER_ID = x.QTY == null ? "" : x.CARRIER_ID,
                        x.BILL_OF_LADING = x.QTY == null ? "" : x.BILL_OF_LADING, x.EXT_TRK_NO = x.QTY == null ? "" : x.EXT_TRK_NO,
                        x.NO_OF_BOXES = x.QTY == null ? null : x.NO_OF_BOXES, x.QTYDESABLEFLAG = x.LOTSERIALSCHDFLAG == true ? true : x.LOTSERIALSCHDFLAG,
                        x.SCHDQTYCHANGFLAG = x.SCHDQTYCHANGFLAG == true ? true : x.SCHDQTYCHANGFLAG
                });
            }
            if (this.lstMainItemLotSerial != null && this.lstMainItemLotSerial.length > 0) {
                this.lstMainItemLotSerial.forEach(x => { x.LOTSERIALSCHDFLG = false });
            }
            this.dtScheduleItems = filteredList;
            var filteredScreenList = this.lstScreenApp.filter(x => x.SCREEN_NAME == 'RECEIVE BY SCHEDULE');
        } catch (ex) {
            this.clientErrorMsg(ex, "buildSchdDetails");
        }
    }

    async txtCheckQty(ven, qty) {
        try {
            this.statusMsgs = [];
            let intConverfactor: number;
            let strUOM: string;
            let dblLineRecdQty: number;
            let dblItemTolPer: number;
            await this.chkItemQty(ven);
        } catch (ex) {
            this.clientErrorMsg(ex, "txtCheckQty");
        }
    }

    async btnSchedulePo_Save() {
        try {
            this.statusMsgs = [];
            await this.SaveScheduleItemsData('save');
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnSchedulePo_Save");
        }
    }

    async SaveScheduleItemsData(save) {
        try {
            this.statusMsgs = [];
            let blnQty: boolean = false;
            let strUOMVal: string;
            let arrUOM: string[] = [];
            let arrConf: string[] = [];
            let strSelectedUOMFact: string = "";
            let arrSelectedConf: string[] = [];
            let ShedLineNbr: string;
            let j: number = 0;
            for (var i = 0; i < this.lstGridRecvSendPoLines.length; i++) {
                if (this.lstGridRecvSendPoLines[i].LINE_NBR == parseInt(this.strLineNbr)) {
                    this.txtNoOfBoxes = this.dtScheduleItems[j].NO_OF_BOXES;
                    this.strItemId = this.strItemId;
                    this.strLineNbr = this.strLineNbr;
                    this.txtQty = this.dtScheduleItems[j].QTY;
                    this.ddlGridCarrier = this.dtScheduleItems[j].CARRIER_ID;
                    this.txtLadg = this.dtScheduleItems[j].BILL_OF_LADING;
                    this.txtSchdExTrk = this.dtScheduleItems[j].EXT_TRK_NO;//txtTrk
                    this.dtScheduleItems[j].ASN_QTY = this.dtScheduleItems[j].QTY;
                    if (this.txtQty != "" && this.txtQty != null) {
                        blnQty = true;
                    }

                    if ((this.txtQty != "" && this.txtQty != null && this.txtQty != undefined) && (this.txtLadg == "" || this.txtLadg == null || this.txtLadg == undefined || this.ddlGridCarrier == "Select Carrier" || this.ddlGridCarrier == "" || this.ddlGridCarrier == null)) {
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Carrier and Lading are mandatory" });
                        this.txtQty = "";
                        this.dtScheduleItems[j].RBFlAG = false;
                        this.dtScheduleItems[j].RBFlAG = false;
                        let txtlad = document.getElementById('txtBillOfLading' + this.dtScheduleItems[j].SCHED_NBR);
                        if (txtlad != null) {
                            txtlad.focus();
                        }
                    }
                    else {
                        strUOMVal = this.dtScheduleItems[j].DDLUOMS[0].value;//check once
                        arrUOM = strUOMVal.split("(");
                        if (arrUOM.length > 1) {
                            arrConf = arrUOM[1].split(" ");
                        }

                        if (arrConf.length > 1) {
                            if (arrConf[0].indexOf("/") == -1) {
                                //when selectedUOM conversion rate is like(BX( 1 EA)) 
                                strSelectedUOMFact = arrConf[0];
                            } else {
                                //when selectedUOM conversion rate is like(BX( 1/100 EA)) 
                                arrSelectedConf = arrConf[0].split("/");
                                strSelectedUOMFact = (parseInt(arrSelectedConf[0]) / parseInt(arrSelectedConf[1])).toString();
                            }

                        } else {
                            strSelectedUOMFact = arrConf[0];
                        }

                        if (this.txtNoOfBoxes != null || this.txtNoOfBoxes != "" || this.txtNoOfBoxes != undefined) {
                            this.lstGridRecvSendPoLines[i].NO_OF_BOXES = parseInt(this.txtNoOfBoxes);
                        }
                        else {
                            ShedLineNbr = this.dtScheduleItems[j].SCHED_NBR;
                            for (var k = 0; k < this.lstGridRecvSendPoLines.length; k++) {
                                if (this.lstGridRecvSendPoLines[k].LINE_NBR == parseInt(this.strLineNbr) && this.lstGridRecvSendPoLines[k].SCHED_NBR == parseInt(ShedLineNbr.toString())) {
                                    if (this.lstGridRecvSendPoLines[k].NO_OF_BOXES != null || this.lstGridRecvSendPoLines[k].NO_OF_BOXES != undefined) {
                                        this.lstGridRecvSendPoLines[k].NO_OF_BOXES = this.lstGridRecvSendPoLines[k].NO_OF_BOXES;
                                    } else {
                                        this.lstGridRecvSendPoLines[k].NO_OF_BOXES = 1;
                                    }
                                }
                            }
                        }

                        if (this.txtSchdExTrk != "" && this.txtSchdExTrk != null) {
                            this.lstGridRecvSendPoLines[i].EXT_TRK_NO = this.txtSchdExTrk;
                        }
                        else { this.lstGridRecvSendPoLines[i].EXT_TRK_NO = ""; }

                        this.lstGridRecvSendPoLines[i].LINE_QTY = parseInt(this.txtQty);
                        this.lstGridRecvSendPoLines[i].BILL_OF_LADING = this.txtLadg;

                        if (this.ddlGridCarrier != "Select Carrier") {
                            this.lstGridRecvSendPoLines[i].CARRIER_ID = this.ddlGridCarrier;
                        }

                        this.lstGridRecvSendPoLines[i].RECV_UOM = arrUOM[0];
                        this.lstGridRecvSendPoLines[i].RECV_CONVERSION_RATE = parseInt(strSelectedUOMFact);

                        if (this.txtQty != "") {
                            this.lstGridRecvSendPoLines[i].RECEIVED_FLAG = YesNo_Enum[YesNo_Enum.Y].toString();
                            this.dtScheduleItems[j].SCHDQTYCHANGFLAG = true;

                        }
                        j++;
                    }
                }
            }

            if (blnQty) {
                if (save == 'save') {
                    this.isScheduleSave = true;
                    let cntQty: number = 0;
                    for (var i = 0; i < this.dtScheduleItems.length; i++) {

                        if (this.dtScheduleItems[i].INV_ITEM_ID == this.strItemId && this.dtScheduleItems[i].LINE_NBR == this.strLineNbr) {
                            if (this.dtScheduleItems[i].QTY != "" && this.dtScheduleItems[i].QTY != null && this.dtScheduleItems[i].QTY != undefined &&
                                this.dtScheduleItems[i].CARRIER_ID != null && this.dtScheduleItems[i].CARRIER_ID != "Select Carrier" && this.dtScheduleItems[i].CARRIER_ID != "") {
                                cntQty = cntQty + parseInt(this.dtScheduleItems[i].QTY);
                            }
                        }
                    }
                    let lstFiltered = this.lstRecvSendPoLines.filter(x => x.INV_ITEM_ID == this.strItemId && x.LINE_NBR == parseInt(this.strLineNbr));
                    if (lstFiltered != null && lstFiltered.length > 0) {
                        if (cntQty > 0) {
                            lstFiltered[0].QTY = cntQty;
                            lstFiltered[0].RECEIVED_FLAG = YesNo_Enum[YesNo_Enum.Y].toString();
                            lstFiltered[0].LOTSERIALSCHDFLAG = true;
                        }
                    }
                    lstFiltered[0].RBFlAG = true;
                    if (this.statusMsgs != null && this.statusMsgs.length == 0) {
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Saved Successfully, Click Go Back to show the items grid." });
                    }
                }
                else if (save == 'Print') { }
            }
            else {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter Receive Quantity" });
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "SaveScheduleItemsData");
        }
    }

    async scheduleReceiveAll() {
        try {
            this.blnReceiveall = true;
            if ((this.selectedSchdDdlCarrier == 'Select Carrier' || this.selectedSchdDdlCarrier == '' || this.selectedSchdDdlCarrier == undefined) || (this.txtLading == '' || this.txtLading == null || this.txtLading == undefined)) {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Carrier and Lading are mandatory" });
            }

            this.lstCheckedBUnits = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.endIndex = + sessionStorage.getItem("RecordsEndindex");
            if (this.dtScheduleItems != null && this.dtScheduleItems.length > 0) {
                if (this.endIndex > this.dtScheduleItems.length) {
                    this.endIndex = this.dtScheduleItems.length;
                }
                for (let i = this.endIndex - 1; i >= this.startIndex; i--) {
                    this.lstCheckedBUnits.push(this.dtScheduleItems[i]);
                }
            }
            for (var i = 0; i < this.lstCheckedBUnits.length; i++) {
                await this.schedulePo_RbtnChange(this.lstCheckedBUnits[i], false);
            }

            if (this.blnSchedsExist) {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Lines with schedules or lot serial have not been updated" });
                //this.selectedSCHEDNBR = "";
                // setTimeout(() => { this.selectedSCHEDNBR = ""; }, 1);
                return;
            }
        }
        catch (ex) {
            this.spnrService.stop();
            this.clientErrorMsg(ex, "scheduleReceiveAll");
        }
    }

    async scheduleResetAll() {
        try {
            let intScheduleCnt: number = 0;
            let strRecedQty: string = null;
            let strSerialControlled: string = null;
            let strLotControlled: string = null;
            let strPoQty: string = null;
            let txtNoOfBoxes: number;
            let blnFlag: boolean = false;
            let dtReceiveDetails: any;
            let strLot: string;
            let strSerial: string;
            let lnkLineNbr: number;
            let lbQtyPO: any;
            let lnkItemId: any;
            let txtQty: any;

            if (this.gStrDefaultInput) {
                for (let i = 0; i < this.dtScheduleItems.length; i++) {
                    strLot = this.dtScheduleItems[i].LOT_CONTROLLED;
                    this.lotControl = this.dtScheduleItems[i].LOT_CONTROLLED;
                    strSerial = this.dtScheduleItems[i].SERIAL_CONTROLLED;
                    this.serialControl = this.dtScheduleItems[i].SERIAL_CONTROLLED;
                    lnkLineNbr = this.dtScheduleItems[i].LINE_NBR;
                    this.schedNbr = this.dtScheduleItems[i].SCHED_NBR + "";
                    lbQtyPO = this.dtScheduleItems[i].LINE_PO_QTY;
                    lnkItemId = this.dtScheduleItems[i].INV_ITEM_ID;
                    txtQty = this.dtScheduleItems[i].QTY;//.LINE_QTY;
                    strRecedQty = this.dtScheduleItems[i].RECEIVED_QTY + "";;
                    strPoQty = this.dtScheduleItems[i].QTY_PO + "";//LINE_PO_QTY check once Qty
                    intScheduleCnt = this.dtScheduleItems[i].SCHED_COUNT;
                    strSerialControlled = this.dtScheduleItems[i].SERIAL_CONTROLLED;
                    strLotControlled = this.dtScheduleItems[i].LOT_CONTROLLED;
                    if (lnkItemId != null) {
                        if (lnkItemId == "") {// && lnkLineNbr.Enabled == false check once
                            this.blnFlag = true;
                        }

                        //Do not default Lines which have schedules
                        if (strSerialControlled == null || strSerialControlled == "") {
                            strSerialControlled = YesNo_Enum[YesNo_Enum.N].toString();
                        }
                        if (strLotControlled == null && strLotControlled == "") {
                            strLotControlled = YesNo_Enum[YesNo_Enum.N].toString();
                        }

                        if (intScheduleCnt == 1 && (this.gStrLotSerial == Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.None].toString() ||
                            !(strSerialControlled == YesNo_Enum[YesNo_Enum.Y].toString() || strLotControlled == YesNo_Enum[YesNo_Enum.Y].toString()))) {
                            this.blnFlag = true;

                        } else if (intScheduleCnt > 1) {
                            this.lstRecvSendPoLines[i].SCHDFLAG = true;
                            this.blnSchedsExist = true;

                        } else if (strSerialControlled == YesNo_Enum[YesNo_Enum.Y].toString() || strLotControlled == YesNo_Enum[YesNo_Enum.Y].toString()) {
                            this.blnSchedsExist = true;
                            this.lstRecvSendPoLines[i].SCHDFLAG = true;
                        }

                    }

                    if (this.blnFlag) {
                        this.lstRecvSendPoLines[i].QTY = null;
                        this.lstRecvSendPoLines[i].RBFlAG = false;
                        if ((this.lstRecvSendPoLines[i].NO_OF_BOXES != null)) {
                            this.lstRecvSendPoLines[i].NO_OF_BOXES = null;
                            this.txtPkgs = "";
                        }
                        this.lstRecvSendPoLines[i].CARRIER_ID = "Select Carrier";
                        this.lstRecvSendPoLines[i].BILL_OF_LADING = "";
                        this.lstRecvSendPoLines[i].NO_OF_BOXES = null;
                        this.txtPkgs = "";
                        this.txtLading = "";
                    }
                }
            }
            if (this.blnSchedsExist) {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Lines with schedules or lot serial have not been updated" });
                // this.selectedSCHEDNBR = "";
                return;
            }
        }
        catch (ex) {
            this.spnrService.stop();
            this.clientErrorMsg(ex, "scheduleResetAll");
        }
    }

    async radioButtonChanged(event) {//parameterLst
        try {
            this.statusMsgs = [];
            this.statusCode = -1;
            if (this.dtScheduleItems != null && this.dtScheduleItems.length > 0) {
                if (event == null) {
                    if (this.dtScheduleItems.length == 1) {
                        this.selecstedRow = this.dtScheduleItems[0];
                    } else { return; }

                } else {
                    this.selecstedRow = this.dtScheduleItems.filter(x => x.SCHED_NBR == event)[0];
                }

            }

            this.txtPkgs = "1";
            let rbtn: string = "";
            if (this.schPO == false) {
                rbtn = "ASP.mt_recv_po_or_nonpo_receipts_aspx";
            }
            else { rbtn = "ASP.mt_recv_Schedule.aspx"; }
            this.spnrService.start();
            await this.schedulePo_RbtnChange(this.selecstedRow, false);
            this.spnrService.stop();
            this.spnrService.start();
            if (this.selecstedRow != null && this.selecstedRow != undefined) {
                await this.updateDs(rbtn, this.selecstedRow);
            }
            this.spnrService.stop();
        }
        catch (ex) {
            this.spnrService.stop();
            this.clientErrorMsg(ex, "radioButtonChanged");
        }
    }

    private async schedulePo_RbtnChange(recvDetails, blnSelectRdbtn: boolean) {
        try {
            this.statusMsgs = [];
            this.statusCode = -1;
            let txtPkgs: string = "";
            let blnSchedsExist: boolean = false;
            this.blnFlag = false;
            let intScheduleCnt: number = 0;
            let strRecedQty: string = null;
            let strSerialControlled: string = null;
            let strLotControlled: string = null;
            let strPoQty: string = null;
            let txtNoOfBoxes: number;
            if (recvDetails.INV_ITEM_ID != null) {
                this.hdnItemId = recvDetails.INV_ITEM_ID;
            }

            let txtLadg: string = recvDetails.BILL_OF_LADING;
            let txtTrkNo: string = recvDetails.EXT_TRK_NO;
            let lnkLine: number = recvDetails.LINE_NBR;
            let schdNBR: number = recvDetails.SCHED_NBR;

            if (this.dtScheduleItems != null && this.dtScheduleItems.length > 0) {
                txtNoOfBoxes = recvDetails.NO_OF_BOXES;
            }
            txtPkgs = "1";

            //if (!recvDetails.SCHDFLAG) {
            if (this.txtLading != null && this.txtLading != undefined && this.txtLading.length == 0) {
                if (txtLadg == null || txtLadg == "") {
                    var currentdate = new Date();
                    txtLadg = this.deviceTokenEntry[TokenEntry_Enum.UserID].toString() + (currentdate.getMonth() + 1) + this.AddZero(currentdate.getDate()) + currentdate.getFullYear() + currentdate.getHours() + currentdate.getMinutes() + currentdate.getSeconds();
                    this.txtLading = txtLadg;
                    recvDetails.BILL_OF_LADING = txtLadg;
                }
                else {
                    this.txtLading = txtLadg;
                }
            }
            else if (txtLadg != null && txtLadg != "") {
                this.txtLading = txtLadg;
            }
            else {
                if (this.txtLading != null && this.txtLading != "") {
                    txtLadg = this.txtLading;
                    recvDetails.BILL_OF_LADING = txtLadg;
                }
            }
            //}

            let extTrkExist = await this.checkColumnExist("EXT_TRK_NO", "RECEIVE BY SCHEDULE");
            if (extTrkExist) {//(txtTrkNo != null)
                if (!this.txtExtTrkIsEditMode) {
                    if (this.txtSchdExTrk != null && this.txtSchdExTrk != undefined && this.txtSchdExTrk != "" && this.txtSchdExTrk.length == 0) {
                        if (txtTrkNo == null && txtTrkNo == "") {
                            txtTrkNo = "";
                        }
                        else {
                            this.txtSchdExTrk = txtTrkNo.trim();
                            txtTrkNo = txtTrkNo.trim();
                        }
                    }
                    else if (txtTrkNo != null && txtTrkNo != "") {
                        this.txtSchdExTrk = txtTrkNo.trim();
                        txtTrkNo = txtTrkNo.trim();
                    }
                    else {
                        if (this.txtSchdExTrk != null && this.txtSchdExTrk != "") {
                            txtTrkNo = this.txtSchdExTrk;
                            recvDetails.EXT_TRK_NO = this.txtSchdExTrk;
                        }
                    }
                }
            }
            else {
                if (this.dtScheduleItems != null && this.dtScheduleItems.length > 0) {
                    for (let i = 0; i < this.dtScheduleItems.length; i++) {
                        if (this.dtScheduleItems[i].LINE_NBR == lnkLine && recvDetails.SCHED_NBR == schdNBR) { //&& recvDetails.RBFlAG  this.grdRecvLinesRbBtnCheck) {//&& lnkLine.Enabled == false check once
                            if (this.dtScheduleItems[i].EXT_TRK_NO != null && this.dtScheduleItems[i].EXT_TRK_NO != "") {
                                if (this.dtScheduleItems[i].EXT_TRK_NO.trim() != "") {
                                    this.txtSchdExTrk = this.dtScheduleItems[i].EXT_TRK_NO;
                                }
                            }
                        }
                    }
                }
            }

            if (recvDetails.SCHED_COUNT <= 1) {
                if (recvDetails.CARRIER_ID != "Select Carrier" && recvDetails.CARRIER_ID != null && recvDetails.CARRIER_ID != "") {
                    this.selectedSchdDdlCarrier = recvDetails.CARRIER_ID;
                }
                else {
                    if (this.selectedSchdDdlCarrier != "Select Carrier" && this.selectedSchdDdlCarrier != "") {
                        recvDetails.CARRIER_ID = this.selectedSchdDdlCarrier;
                    }
                }
            }

            if (txtNoOfBoxes == null) {
                txtNoOfBoxes = 1;
                recvDetails.NO_OF_BOXES = txtNoOfBoxes;
                txtPkgs = "1";
            }
            if (txtNoOfBoxes != null) {
                if (txtPkgs != null && txtPkgs != undefined && txtPkgs != "" && txtPkgs.trim().length == 0) {
                    if (txtNoOfBoxes == null) {
                        if (this.lstRecvSendPoLines != null) {
                            txtNoOfBoxes = 1;
                            recvDetails.NO_OF_BOXES = txtNoOfBoxes;
                            txtPkgs = "1";
                        }
                        else {
                            txtNoOfBoxes = 1;
                            recvDetails.NO_OF_BOXES = txtNoOfBoxes;
                            txtPkgs = "1";
                        }
                    }
                    else {
                        this.txtPkgs = txtNoOfBoxes.toString();
                    }
                }
                else if (txtNoOfBoxes != null && txtNoOfBoxes != undefined) {
                    this.txtPkgs = txtNoOfBoxes.toString();
                }
                else {
                    if (this.txtPkgs != null && this.txtPkgs != undefined && this.txtPkgs != "" && this.txtPkgs.length > 0) {
                        txtNoOfBoxes = parseInt(this.txtPkgs);
                        recvDetails.NO_OF_BOXES = txtNoOfBoxes;
                    } else {
                        if (this.dtScheduleItems != null) {
                            txtNoOfBoxes = 1;
                            recvDetails.NO_OF_BOXES = txtNoOfBoxes;
                            this.txtPkgs = "1";
                        } else {
                            txtNoOfBoxes = 1;
                            this.txtPkgs = "1";
                            recvDetails.NO_OF_BOXES = txtNoOfBoxes;
                        }
                    }
                }
            }
            else {
                if (this.dtScheduleItems != null && this.dtScheduleItems.length > 0) {
                    for (let i = 0; i < this.dtScheduleItems.length; i++) {
                        if (this.dtScheduleItems[i].LINE_NBR == lnkLine && this.grdRecvLinesRbBtnCheck) {//&& lnkLine.Enabled == false check once
                            if (this.dtScheduleItems[i].NO_OF_BOXES != null) {
                                this.txtPkgs = this.dtScheduleItems[i].NO_OF_BOXES.toString();
                            }
                        }
                    }
                }
            }

            if (this.dtScheduleItems != null && this.dtScheduleItems.length > 0) {
                let dtReceiveDetails = this.dtScheduleItems;
                let strLot: string = recvDetails.LOT_CONTROLLED;
                this.lotControl = recvDetails.LOT_CONTROLLED;
                let strSerial: string = recvDetails.SERIAL_CONTROLLED;
                this.serialControl = recvDetails.SERIAL_CONTROLLED;
                let lnkLineNbr: number = recvDetails.LINE_NBR;
                this.schedNbr = recvDetails.SCHED_NBR;
                let lbQtyPO = recvDetails.LINE_PO_QTY;
                let lnkItemId = recvDetails.INV_ITEM_ID;
                let txtQty = recvDetails.QTY;//.LINE_QTY;
                strRecedQty = recvDetails.RECEIVED_QTY;
                strPoQty = recvDetails.QTY_PO;//LINE_PO_QTY check once Qty
                intScheduleCnt = recvDetails.SCHED_COUNT;
                strSerialControlled = recvDetails.SERIAL_CONTROLLED;
                strLotControlled = recvDetails.LOT_CONTROLLED;
                let intConverfactor: number = parseInt(recvDetails.CONVERSION_RATE);
                this.lotSerialConverfactor = parseInt(recvDetails.CONVERSION_RATE);
                let strUOM: string = recvDetails.UNIT_OF_MEASURE;
                let schedCount: string = recvDetails.SCHED_COUNT;
                let strInvItem: string = recvDetails.INVENTORY_ITEM;
                this.hdnItemType = strInvItem;
                this.hdnInvItemId = lnkItemId;
                this.hdnItmLineNo = lnkLineNbr;
                this.hdnItmSchedLineNo = parseInt(this.schedNbr);

                this.strTotalQty = (parseInt(strPoQty) - parseInt(strRecedQty)).toString();

                //Recall Checking
                let strRecallFlag: string = recvDetails.RECAL_FLAG.toString();
                if (strRecallFlag == YesNo_Enum[YesNo_Enum.Y].toString()) {
                    recvDetails.QTY = "";
                    recvDetails.TXTQTYFLAG = true;
                    let dtRecallInfo = this.lstReCallInfo;
                    if (dtRecallInfo != null && dtRecallInfo.length > 0) {
                        let dr = dtRecallInfo.filter(x => x.ITEM_ID == lnkItemId && (x.LOT_NO == "" || x.LOT_NO == null) && (x.SERIAL_NO == "" || x.SERIAL_NO == null));
                        if (dr != null && dr.length > 0) {
                            recvDetails.QTY = "";
                            recvDetails.TXTQTYFLAG = true;
                        }
                    }
                }

                //Comments Checking
                if (this.gDisplayComments == YesNo_Enum[YesNo_Enum.Y].toString() &&
                    recvDetails.COMMENTS != null && recvDetails.COMMENTS != "") {
                    let strComments: string = recvDetails.COMMENTS;
                    if (strComments != "") {
                        strComments = "Comments: \\n \\n " + strComments;
                        if (this.gstrPrevComments != strComments) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: strComments.toString() });
                            this.gstrPrevComments = strComments;
                        }
                    }
                }

                if ((recvDetails.CARRIER_ID == null || recvDetails.CARRIER_ID == "" || recvDetails.CARRIER_ID == "Select Carrier" || txtLadg == "")) {//schedCount == "1" &&
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Carrier and Lading are mandatory" });
                    this.selecstedRow = null;
                    setTimeout(() => { this.selectedSCHEDNBR = ""; }, 1);
                    setTimeout(() => { recvDetails.RBFlAG = false; }, 2);
                    this.grdRecvLinesRbBtnCheck = false;
                    this.lstRecvSendPoLines.forEach(x => x.RBFlAG = false);
                    blnSelectRdbtn = true;
                    return;
                }
                else {
                    setTimeout(() => {
                        recvDetails.RBFlAG = true;
                        let itemtxtRecvQty = document.getElementById('txtRecvQty' + this.selectedSCHEDNBR);// recvDetails.SCHED_NBR)
                        if (itemtxtRecvQty != null) {
                            itemtxtRecvQty.focus();
                        }
                    }, 2);
                }
                this.txtSerchItemId = lnkItemId;
                this.hdnItemId = this.txtSerchItemId;
                this.gstrlnkitemid = recvDetails.INV_ITEM_ID;
                this.gstrlnklineNbr = lnkLineNbr.toString();
                if (this.gStrLotSerial != Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.None].toString()) {
                    if (this.gStrLotSerial == Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.MMIS].toString()) {
                        if (strLot == YesNo_Enum[YesNo_Enum.Y].toString() || strSerial == YesNo_Enum[YesNo_Enum.Y].toString()) {
                            this.btnLotSerialDisable = false;
                            recvDetails.TXTQTYFLAG = true;
                            recvDetails.DDLUOMFLAG = true;
                        }
                        else {
                            this.btnLotSerialDisable = true;
                            recvDetails.TXTQTYFLAG = false;
                        }
                    }
                    else if (this.gStrLotSerial == Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.AtPar].toString()) {
                        this.btnLotSerialDisable = false;
                        recvDetails.TXTQTYFLAG = false;
                        if (strSerial == YesNo_Enum[YesNo_Enum.Y].toString()) {
                            recvDetails.DDLUOMFLAG = true;
                        }
                    }

                    //if (parseInt(intScheduleCnt.toString()) > 1) {
                    //    this.btnLotSerialDisable = true;
                    //    recvDetails.TXTQTYFLAG = true;
                    //    recvDetails.DDLUOMFLAG = true;
                    //}
                } else {
                    this.btnLotSerialDisable = true;
                    recvDetails.TXTQTYFLAG = false;
                }
                if (strSerial == "" || strSerial == null || strSerial == undefined) {
                    strSerial = YesNo_Enum[YesNo_Enum.N].toString();
                }
                if (strLot == "" || strLot == null || strLot == undefined) {
                    strLot = YesNo_Enum[YesNo_Enum.N].toString();
                }

                if (schedCount == "1") {
                    this.blnlnkItemIdEnable = false;
                    this.blnlnkLineNbrEnable = false;
                    if ((strLot == YesNo_Enum[YesNo_Enum.Y].toString() || strSerial == YesNo_Enum[YesNo_Enum.Y].toString()) &&
                        this.gStrLotSerial == Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.MMIS].toString()) {
                        recvDetails.TXTQTYFLAG = true;
                        recvDetails.DDLUOMFLAG = true;
                    }
                    else {
                        recvDetails.TXTQTYFLAG = false;
                    }
                    this.btnPntrDetailsDisable = false;
                }
                else {
                    this.btnPntrDetailsDisable = true;
                    this.blnlnkItemIdEnable = true;
                    this.blnlnkLineNbrEnable = true;
                }

                if (lnkItemId != null) {
                    if (lnkItemId == "") {
                        this.blnFlag = true;
                    }

                    //Do not default Lines which have schedules
                    if (strSerialControlled == null || strSerialControlled == "") {
                        strSerialControlled = YesNo_Enum[YesNo_Enum.N].toString();
                    }
                    if (strLotControlled == null && strLotControlled == "") {
                        strLotControlled = YesNo_Enum[YesNo_Enum.N].toString();
                    }

                    if (intScheduleCnt == 1 && (this.gStrLotSerial == Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.None].toString() ||
                        !(strSerialControlled == YesNo_Enum[YesNo_Enum.Y].toString() || strLotControlled == YesNo_Enum[YesNo_Enum.Y].toString()))) {
                        this.blnFlag = true;
                    }
                    else if (intScheduleCnt > 1) {
                        //Recall Checking
                        if (strRecallFlag == YesNo_Enum[YesNo_Enum.Y].toString()) {
                            let dtRecallInfo = this.lstReCallInfo;
                            if (dtRecallInfo != null && dtRecallInfo.length > 0) {
                                let dr = dtRecallInfo.filter(x => x.ITEM_ID == lnkItemId && (x.LOT_NO == "" || x.LOT_NO == null) && (x.SERIAL_NO == "" || x.SERIAL_NO == null));
                                if (dr != null && dr.length > 0) {
                                    recvDetails.QTY = "";
                                    recvDetails.TXTQTYFLAG = true;
                                }
                            }
                        }
                    } else if (intScheduleCnt > 1) {
                        recvDetails.SCHDFLAG = true;
                        this.blnSchedsExist = true;
                    }
                    else if (strSerialControlled == YesNo_Enum[YesNo_Enum.Y].toString() || strLotControlled == YesNo_Enum[YesNo_Enum.Y].toString()) {
                        this.blnSchedsExist = true;
                        recvDetails.SCHDFLAG = true;
                    }

                }
                recvDetails.NO_OF_BOXES = txtNoOfBoxes;
                if (this.blnFlag == true && (txtQty == null || txtQty == "")) {
                    if (this.gblnASNPO == false && this.gStrDefaultInput == YesNo_Enum[YesNo_Enum.Y].toString()) {
                        if (strRecedQty != null && strRecedQty != "") {
                            if (parseInt(strRecedQty) <= parseInt(strPoQty)) {
                                txtQty = parseInt(strPoQty) - parseInt(strRecedQty);
                                recvDetails.QTY = txtQty;
                            }
                        }
                        else {
                            txtQty = strPoQty;
                            recvDetails.QTY = txtQty;
                        }
                    }
                    else {
                        txtQty = recvDetails.ASN_QTY;
                        recvDetails.QTY = txtQty;
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "schedulePo_RbtnChange");
        }
    }

    printSchedule() {
        try {
            this.statusMsgs = [];
            this.SaveScheduleItemsData('Print');
        }
        catch (ex) {
            this.clientErrorMsg(ex, "printSchedule");
        }
    }

    goPage() {
        try {
            this.statusMsgs = [];
            this.presentScreen = "PO";
            this.tbl = true;
            this.page = true;
            this.bysch = false;
            this.purchase = false;
            this.blnScheduleItems == false;
            this.selectedSCHEDNBR = "";
            this.selectedSchdDdlCarrier = "Select Carrier";
            this.breadCrumbMenu.SUB_MENU_NAME = '';

            if (this.isScheduleSave != true) {
                if (this.dtScheduleItems != null && this.dtScheduleItems.length > 0) {
                    this.dtScheduleItems.forEach(x => {
                        x.QTY = x.ASN_QTY, x.QTY_PO = x.LINE_PO_QTY, x.CARRIER_ID = x.SCHDQTYCHANGFLAG == true ? x.CARRIER_ID : "",
                            x.EXT_TRK_NO = "", x.NO_OF_BOXES = null, x.LOTSERIALSCHDFLAG = x.LOTSERIALSCHDFLAG == true ? true : x.LOTSERIALSCHDFLAG
                    });

                    for (let i = 0; i < this.dtScheduleItems.length; i++) {
                        let lotserialitems = this.lstMainItemLotSerial.filter(x => x.ITEM_ID == this.dtScheduleItems[i].INV_ITEM_ID && x.LINE_NBR.toString() == this.dtScheduleItems[i].LINE_NBR.toString() &&
                            x.SCHED_NBR.toString() == this.dtScheduleItems[i].SCHED_NBR.toString() && x.LOTSERIALSCHDFLG == true);
                        for (let x = 0; x < lotserialitems.length; x++) {
                            let index: number = this.lstMainItemLotSerial.indexOf(lotserialitems[x]);
                            if (index !== -1) {
                                this.lstMainItemLotSerial.splice(index, 1);
                            }
                        }
                    }
                }
            }
            this.txtTrk = "";
            this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.isScheduleSave = false;
            this.lotSerialSchdFlg = false;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "goPage");
        }
    }
    /**
    * 
    * End Scheduled PO
    */


    /**
     * 
     * NonPO
     */
    async btnNonPo_Click() {
        this.statusMsgs = [];
        try {
            if (this.hdnNonPo == YesNo_Enum[YesNo_Enum.Y].toString()) {
                this.confirmationService.confirm({
                    message: "Do you want to delete the existing PO/IUT?",
                    accept: async () => {
                        this.spnrService.start();
                        this.hdnConfirmPoDelete = YesNo_Enum[YesNo_Enum.N].toString();
                        this.hdnConfirmIUTDelete = YesNo_Enum[YesNo_Enum.N].toString();
                        this.hdnConfirmNonPo = YesNo_Enum[YesNo_Enum.N].toString();
                        this.recvSearchPos = false;
                        this.recvIUTSearch = false;
                        this.tbl = false;
                        this.plus = true;
                        this.minus = false;
                        this.lstRecvSendPoLines = [];
                        this.lstRecvIutItems = [];
                        this.spnrService.stop();
                    },
                    reject: () => {
                        this.hdnConfirmPoDelete = YesNo_Enum[YesNo_Enum.N].toString();
                        this.hdnConfirmIUTDelete = YesNo_Enum[YesNo_Enum.N].toString();
                        this.hdnConfirmNonPo = YesNo_Enum[YesNo_Enum.N].toString();
                        this.spnrService.stop();
                    }
                });
                this.spnrService.stop();
            }
            else {
                this.presentScreen = "NONPO";
                this.txtPONumber = "";
                this.breadCrumbMenu.SUB_MENU_NAME = 'Receiving NON PO Items';

                this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                this.nonPO = true;
                this.plus = true;
                this.minus = false;
                this.page = false;
                this.tbl = false;
                this.getinitialvalues();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnNonPo_Click");
        }
    }

    async getinitialvalues() {
        this.statusMsgs = [];
        try {
            this.presentScreen = "NONPO";
            this.poNewItem.NO_OF_PACKAGES = "1";
            this.poNewItem.CARRIER_ID = "";
            this.poNewItem.COMMENTS = "";
            this.poNewItem.DELIVER_TO = "";
            this.poNewItem.DEPT_ID = "";
            this.poNewItem.DESCR = "";
            this.poNewItem.END_DT_TIME = "";
            this.poNewItem.LINE_NBR = "";
            this.poNewItem.LOCATION = "";
            this.poNewItem.LOCDESCR = "";
            this.poNewItem.VENDOR_ID = "";
            this.poNewItem.PO_ID = "";
            this.poNewItem.TYPE_OF_PACKAGE = "";
            await this.generateTrackingId();
            await this.populateShipToIdsDrpdwn(this.lstShipToIds);
            await this.populateCarrierDropDown(this.poNewItem.CARRIER_ID);

            if (this.poNewItem.TRACKING_NBR != "" && this.poNewItem.TRACKING_NBR != null && this.poNewItem.TRACKING_NBR != undefined) {
                this.trackNoStatus = 0;
            }

            if (this.poNewItem.SHIPTO_ID != "" && this.poNewItem.SHIPTO_ID != null && this.poNewItem.SHIPTO_ID != undefined) {
                this.shipIDStatus = 0;
            }

            if ((this.shipIDStatus == 0) && (this.trackNoStatus == 0)) {
                this.nonPoDisable = false;
            }
            else {
                this.nonPoDisable = true;
            }

            if (this.blntxtShipIdDisable == true && (this.poNewItem.SHIPTO_ID == "" || this.poNewItem.SHIPTO_ID == null || this.poNewItem.SHIPTO_ID == undefined)) {
                this.nonPoDisable = false;
            }

        } catch (ex) {
            this.clientErrorMsg(ex, "getinitialvalues");
        }
    }

    async generateTrackingId() {
        this.statusMsgs = [];
        try {
            var currentdate = new Date();
            if (this.gdonotDefaulttrackingNumber != 'Y') {
                this.btnTrackingNumber = false;
                this.lblTrackingNumber = true;
                await this.generateTrack();

            }
            else {
                this.poNewItem.TRACKING_NBR = "";
                this.btnTrackingNumber = true;
                this.lblTrackingNumber = false;
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "generateTrackingId");
        }
    }

    async generateTrack() {
        this.statusMsgs = [];
        try {
            await this.recvPoNonPoService.generateTrackingNumber().catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<string>;
                let testdata = data;
                this.poNewItem.TRACKING_NBR = testdata.toString();
            });
        } catch (ex) {
            this.clientErrorMsg(ex, "generateTrack");
        }
    }

    async btnTrackingNumber_Click() {
        this.statusMsgs = [];
        try {
            this.generateTrack();
        } catch (ex) {
            this.clientErrorMsg(ex, "btnTrackingNumber_Click");
        }
    }

    AddZero(num) {
        this.statusMsgs = [];
        try {
            return (num >= 0 && num < 10) ? "0" + num : num + "";
        } catch (ex) {
            this.clientErrorMsg(ex, "AddZero");
        }
    }

    bindModelDataChange(event: any) {
        this.statusMsgs = [];
        try {
            if ("txtShipId" == event.TextBoxID.toString()) {
                this.shipIDStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtTrackNo" == event.TextBoxID.toString()) {
                this.trackNoStatus = event.validationrules.filter(x => x.status == false).length;
            }

            if (this.poNewItem.TRACKING_NBR != "" && this.poNewItem.TRACKING_NBR != null && this.poNewItem.TRACKING_NBR != undefined) {
                this.trackNoStatus = 0;
            }

            if (this.poNewItem.SHIPTO_ID != "" && this.poNewItem.SHIPTO_ID != null && this.poNewItem.SHIPTO_ID != undefined) {
                this.shipIDStatus = 0;
            }

            if ((this.shipIDStatus == 0) && (this.trackNoStatus == 0)) {
                this.nonPoDisable = false;
            }
            else {
                this.nonPoDisable = true;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindModelDataChange");
        }
    }

    shipNonPoToId_selectChanged(option, event) {
        this.statusMsgs = [];
        try {
            this.statusMsgs = [];
            if (this.poNewItem.SHIPTO_ID == "" || this.poNewItem.SHIPTO_ID == null || this.poNewItem.SHIPTO_ID == undefined || this.poNewItem.SHIPTO_ID == "Select ShipToID") {
                this.nonPoDisable = true;
            }
            else {
                if (this.poNewItem.TRACKING_NBR != "" && this.poNewItem.TRACKING_NBR != null && this.poNewItem.TRACKING_NBR != undefined) {
                    this.nonPoDisable = false;
                }
                else {
                    this.nonPoDisable = true;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "shipNonPoToId_selectChanged");
        }
    }

    async btnNonPoSend_Click() {
        this.statusMsgs = [];
        try {
            if (this.poNewItem.TRACKING_NBR == "" || this.poNewItem.TRACKING_NBR == null || this.poNewItem.TRACKING_NBR == undefined) {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Enter Tracking#' });
                return;
            }

            if (this.poNewItem.LOCATION == '' || this.poNewItem.LOCATION == null || this.poNewItem.LOCATION == undefined) {

            }
            else {
                if (this.poNewItem.LOCATION.length > 30) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Location value cannot be more than 30 chars' });
                    return;
                }
            }
            if ((this.poNewItem.SHIPTO_ID == null || this.poNewItem.SHIPTO_ID == undefined || this.poNewItem.SHIPTO_ID == "" || this.poNewItem.SHIPTO_ID == "Select ShipToID")) {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Enter ShipTo ID' });
                return;
            }
            if (this.poNewItem.CARRIER_ID == 'Select Carrier' || this.poNewItem.CARRIER_ID == "" || this.poNewItem.CARRIER_ID == undefined) {
                this.poNewItem.CARRIER_ID = "";
            }
            this.spnrService.start();
            await this.nonPoInsert('');
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnNonPoSend_Click");
        }
    }

    async btnSaveNext_Click(save) {
        this.statusMsgs = [];
        try {
            this.spnrService.start();
            this.SaveNonPo(save);
        } catch (ex) {
            this.clientErrorMsg(ex, "btnSaveNext_Click");
        }
    }

    async SaveNonPo(save): Promise<number> {
        this.statusCode = -1;
        this.statusMsgs = [];
        try {
            if (this.poNewItem.TRACKING_NBR == "" || this.poNewItem.TRACKING_NBR == null || this.poNewItem.TRACKING_NBR == undefined) {
                this.statusMsgs = [];
                this.spnrService.stop();
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Enter Tracking#' });
                return;
            }
            if (this.poNewItem.LOCATION == '' || this.poNewItem.LOCATION == null || this.poNewItem.LOCATION == undefined) {

            }
            else {
                if (this.poNewItem.LOCATION.length > 30) {
                    this.statusMsgs = [];
                    this.spnrService.stop();
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Location value cannot be more than 30 chars' });
                    return;
                }
            }
            if ((this.poNewItem.SHIPTO_ID == null || this.poNewItem.SHIPTO_ID == undefined || this.poNewItem.SHIPTO_ID == "" || this.poNewItem.SHIPTO_ID == "Select ShipToID")) {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Enter ShipTo ID' });
                this.spnrService.stop();
                return;
            }
            if (this.poNewItem.CARRIER_ID == 'Select Carrier' || this.poNewItem.CARRIER_ID == "" || this.poNewItem.CARRIER_ID == undefined) {
                this.poNewItem.CARRIER_ID = "";
            }
            this.statusCode = await this.nonPoInsert(save);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "SaveNonPo");
        }
    }

    changeDate(date) {
        this.statusMsgs = [];
        try {
            var time = date.toLocaleString();
            if (time != "") {
                var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
                var am_pm = date.getHours() >= 12 ? "PM" : "AM";
                hours = hours < 10 ? "0" + hours : hours;
                var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
                return hours + ":" + minutes + ":" + seconds + " " + am_pm;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "changeDate");
        }
    }

    async nonPoInsert(savenext): Promise<number> {
        this.statusMsgs = [];
        this.statusCode = -1;
        try {
            let dateStr = new Date(new Date()).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
            //let date = new Date(dateStr);
            this.lstNonPoItems = [];
            if (this.poNewItem.LINE_NBR == undefined || this.poNewItem.LINE_NBR == "" || this.poNewItem.LINE_NBR == null) {
                this.poNewItem.LINE_NBR = '0';
            }
            else { this.poNewItem.LINE_NBR = this.poNewItem.LINE_NBR; }
            this.lstNonPoItems.push({
                TRANSACTION_ID: null,
                TRACKING_NBR: this.poNewItem.TRACKING_NBR,
                LOCATION: this.poNewItem.LOCATION,
                CARRIER_ID: this.poNewItem.CARRIER_ID,
                DELIVER_TO: this.poNewItem.DELIVER_TO,
                STATUS: AppTransactionStatus.Receive.toString(),
                USER_ID: this.deviceTokenEntry[TokenEntry_Enum.UserID].toString(),
                DESCR: this.poNewItem.DESCR,
                VENDOR_NAME1: this.poNewItem.VENDOR_ID,
                DEPT_ID: this.poNewItem.DEPT_ID,
                PO_ID: this.poNewItem.PO_ID,
                LINE_NBR: this.poNewItem.LINE_NBR,
                SHIPTO_ID: this.poNewItem.SHIPTO_ID,
                NON_PO_ITEM: YesNo_Enum[YesNo_Enum.Y].toString(),
                TYPE_OF_PACKAGE: this.poNewItem.TYPE_OF_PACKAGE,
                END_DT_TIME: dateStr.replace(',', ''),// date.getMonth() + '/' + date.getDay() + '/' + date.getFullYear() + ' ' + this.changeDate(date),
                START_DT_TIME: dateStr.replace(',', ''),// date.getMonth() + '/' + date.getDay() + '/' + date.getFullYear() + ' ' + this.changeDate(date),
                COMMENTS: this.poNewItem.COMMENTS,
                LOCDESCR: this.poNewItem.LOCDESCR,
                PO_DT: '',
                VENDOR_ID: this.poNewItem.VENDOR_ID,
                NOTES_COMMENTS: '',
                NO_OF_PACKAGES: this.poNewItem.NO_OF_PACKAGES,
            })
            await this.recvPoNonPoService.sendNonPoDetails(this.lstNonPoItems).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<any>;
                this.spnrService.stop();
                this.statusMsgs = [];
                this.statusCode = data.StatusCode;
                if (data.StatusCode == AtparStatusCodes.RECV_S_TRACKINGALREADYEXISTS) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Tracking# Already Exists' });
                    return;
                }
                switch (data.StatType) {
                    case StatusType.Success: {
                        this.nonPoDisable = true;
                        if (savenext == null || savenext == '') {
                            this.clearControls();
                        }
                        else {
                            this.poNewItem.DESCR = '';
                            this.poNewItem.COMMENTS = '';
                            this.poNewItem.PO_ID = '';
                            this.poNewItem.VENDOR_ID = '';
                            this.poNewItem.LINE_NBR = '';
                            this.poNewItem.NO_OF_PACKAGES = "1";
                            this.poNewItem.TYPE_OF_PACKAGE = '';
                            this.generateTrackingId()
                            this.poNewItem.CARRIER_ID = this.poNewItem.CARRIER_ID;
                            this.populateShipToIdsDrpdwn(this.lstShipToIds);
                        }
                        if (this.blntxtShipIdDisable == true) {
                            this.nonPoDisable = false;
                        }
                        this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Sent Successfully.' });
                        break;
                    }
                    case StatusType.Warn: {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage })
                        break;
                    }
                    case StatusType.Error: {
                        this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
            });
            return this.statusCode;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "nonPoInsert");
        }
    }

    async btnPrint_Click() {
        this.statusMsgs = [];
        this.statusCode = -1;
        try {
            let blnstockhdr: boolean = false;
            let blnNonstkhdr: boolean = false;
            let blnNonStockHed: boolean = false;
            let blnStockHed: boolean = false;
            let blnmsgdisplayed: boolean = false;
            let intNoOfBoxses: number = 0;

            let drowRecStatus = asEnumerable(this.lstRecvSendPoLines).Where(x => x.QTY != null && x.RECEIVED_FLAG == YesNo_Enum[YesNo_Enum.Y].toString()).ToArray();
            let drowRecNonStockStatus = asEnumerable(this.lstRecvSendPoLines).Where(x => x.QTY != null && x.RECEIVED_FLAG == YesNo_Enum[YesNo_Enum.Y].toString() && x.INVENTORY_ITEM == YesNo_Enum[YesNo_Enum.N].toString()).ToArray();
            let drowRecStockStatus = asEnumerable(this.lstRecvSendPoLines).Where(x => x.QTY != null && x.RECEIVED_FLAG == YesNo_Enum[YesNo_Enum.Y].toString() && x.INVENTORY_ITEM == YesNo_Enum[YesNo_Enum.Y].toString()).ToArray();
            if (this.poNewItem.NO_OF_PACKAGES == "" || this.poNewItem.NO_OF_PACKAGES == undefined || this.poNewItem.NO_OF_PACKAGES == null) {//LINE_QTY
                this.intNoOfBoxses = 1;
            }
            else {
                this.intNoOfBoxses = parseInt(this.poNewItem.NO_OF_PACKAGES)
            }
            if (this.lstSetUpProPrinters.length > 0) {
                if (this.gStrSelPrinter == YesNo_Enum[YesNo_Enum.Y].toString()) {
                    let drowPrnterDet = asEnumerable(this.lstSetUpProPrinters).Where(x => x.LABEL_DESCRIPTION == "NonPO").ToArray();//LABEL_DESCRIPTION='NonStock PO Header'

                    if (drowPrnterDet != null && drowPrnterDet.length > 0) {
                        await this.showModalPopup(drowPrnterDet);
                    } else {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Printer Not Configured for the Functionality NonPO" });
                        blnmsgdisplayed = true;
                    }
                }
                else if (this.gStrDefPrinter != "") {
                    let drowPrnterDet = asEnumerable(this.lstSetUpProPrinters).Where(x => x.FRIENDLY_NAME == this.gStrDefPrinter).ToArray();
                    if (drowPrnterDet != null && drowPrnterDet.length > 0) {
                        if (drowPrnterDet[0].LABEL_DESCRIPTION == "NonPO") {//LABEL_DESCRIPTION Check Once
                            blnNonStockHed = true;
                            this.statusCode = await this.SaveNonPo('save');
                            this.statusCode = await this.printNonPONiceLabel(intNoOfBoxses, this.lstSetUpProPrinters, this.gStrDefPrinter)
                            if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to Print Non Po Label  " });
                                blnmsgdisplayed = true;
                            }
                        }
                        else {
                            blnmsgdisplayed = true;
                        }
                    }
                }
                else {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please setup printer settings " });
                    blnmsgdisplayed = true;
                }
            }
            else {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Configure Label Printers before Printing" });
                blnmsgdisplayed = true;
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "btnPrint_Click");
        }
    }

    async printNonPONiceLabel(noofLabels: number, printerDet: MT_ATPAR_SETUP_PRO_PRINTERES[], printerName: string): Promise<number> {
        try {
            this.statusMsgs = [];
            this.statusCode = 0;
            let strValue: string = "";
            let pPrinterAddressOrName: string = "";
            let pPrinterPort: string = "";
            let pPrinterTye: string = "";
            let pNiceLabelName: string = "";
            let pNoOfPrints: string = "";
            let pErrMsg: string = "";
            let lstPrintTbl: VM_RECV_NONPO_PRINTERDETAILS[] = [];
            let drowPrnterDet = [];
            let intNoOfBoxses: number = 0;
            let strFilter: string = "";// null;

            if (printerName == null && printerName == "") {
                drowPrnterDet = asEnumerable(printerDet).Where(x => x.LABEL_DESCRIPTION == "NonPO").ToArray();
            }
            else {
                drowPrnterDet = asEnumerable(printerDet).Where(x => x.LABEL_DESCRIPTION == "NonPO" && x.FRIENDLY_NAME == printerName).ToArray();//check once LABEL_DESCRIPTION 
            }
            if (drowPrnterDet.length == 0) {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Configure Non Stock Label Printer" });
                return;
            }
            pPrinterAddressOrName = drowPrnterDet[0].IP_ADDRESS;
            pPrinterPort = drowPrnterDet[0].PORT_NO;

            if (drowPrnterDet[0].NETWORK_TYPE.toString() == "Mobile") {
                pPrinterTye = "TcpIP";
            }
            else {
            }

            intNoOfBoxses = noofLabels;
            pNoOfPrints = "1";
            pNiceLabelName = drowPrnterDet[0].LABEL_FILE_NAME;
            let prntResSet = asEnumerable(this.lstRecvSendPoLines).Where(x => x.INVENTORY_ITEM == YesNo_Enum[YesNo_Enum.N].toString()).ToArray();
            let drPrintRow = new VM_RECV_NONPO_PRINTERDETAILS();

            drPrintRow.BUSINESS_UNIT = "";
            drPrintRow.CARRIER = this.poNewItem.CARRIER_ID;
            drPrintRow.DELIVER_TO_NAME = this.poNewItem.DELIVER_TO;
            drPrintRow.DEPT_ID = this.poNewItem.DEPT_ID;
            drPrintRow.ITEM_DESCR = this.poNewItem.DESCR;
            drPrintRow.LINE_NO = this.poNewItem.LINE_NBR;
            drPrintRow.LOCATION_DESCR = this.poNewItem.LOCDESCR;
            drPrintRow.LOCATION_ID = this.poNewItem.LOCATION;
            drPrintRow.PKG_TYPE = this.poNewItem.TYPE_OF_PACKAGE;
            drPrintRow.PO_ID = this.poNewItem.PO_ID;

            if (this.blnShipToId == false) {
                drPrintRow.SHIPTO_ID = this.poNewItem.SHIPTO_ID;
            }
            else {
                drPrintRow.SHIPTO_ID = this.poNewItem.SHIPTO_ID;
            }

            drPrintRow.TRACKING_NO = this.poNewItem.TRACKING_NBR;
            drPrintRow.USER_ID = this.deviceTokenEntry[TokenEntry_Enum.UserID].toString();
            drPrintRow.VENDOR = this.poNewItem.VENDOR_ID;

            for (let k = 1; k <= intNoOfBoxses; k++) {
                drPrintRow.NO_OF_BOXES = k + " of " + intNoOfBoxses;
                lstPrintTbl.push(drPrintRow);

                if (lstPrintTbl != null && lstPrintTbl.length > 0) {
                    await this.recvPoNonPoService.printNiceLabel(pPrinterAddressOrName, pPrinterPort, pPrinterTye, pNiceLabelName, pNoOfPrints, pErrMsg, lstPrintTbl).
                        catch(this.httpService.handleError).then((res: Response) => {
                            let data = res.json() as AtParWebApiResponse<number>;
                            this.statusCode = data.StatusCode;
                            switch (data.StatType) {
                                case StatusType.Success: {
                                    this.spnrService.stop();
                                    this.statusMsgs = [];
                                    this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Sent Sucessfully." });
                                    break;
                                }
                                case StatusType.Warn: {
                                    this.statusMsgs = [];
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    this.spnrService.stop();
                                    break;
                                }
                                case StatusType.Error: {
                                    this.statusMsgs = [];
                                    this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    this.spnrService.stop();
                                    break;
                                }
                                case StatusType.Custom: {
                                    this.statusMsgs = [];
                                    this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    this.spnrService.stop();
                                    break;
                                }
                            }
                        });
                    if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to Print Non Stock Header Label" });
                        return this.statusCode;
                    }
                }
            }
            return this.statusCode;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "printNonPONiceLabel");
        }
    }

    async clearControls() {

        try {
            this.poNewItem.TRACKING_NBR = "";
            this.poNewItem.LOCATION = "";
            this.poNewItem.LOCDESCR = "";
            this.poNewItem.NO_OF_PACKAGES = "1";
            this.poNewItem.VENDOR_ID = "";
            this.poNewItem.DESCR = "";
            this.poNewItem.SHIPTO_ID = "";
            this.poNewItem.DEPT_ID = "";
            this.poNewItem.PO_ID = "";
            this.poNewItem.LINE_NBR = "";
            this.poNewItem.CARRIER_ID = "";
            this.poNewItem.TYPE_OF_PACKAGE = "";
            this.poNewItem.COMMENTS = "";
            this.poNewItem.DELIVER_TO = "";
            this.generateTrackingId();
            await this.populateShipToIdsDrpdwn(this.lstShipToIds);
            await this.populateCarrierDropDown(this.poNewItem.CARRIER_ID);
        } catch (ex) {
            this.clientErrorMsg(ex, "clearControls");
        }

    }

    btnGoBack_Click() {
        this.statusMsgs = [];
        this.presentScreen = "PO";
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = '';

            this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.page = true;
            if ((this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) || (this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0)) {
                this.tbl = true;
            }
            this.nonPO = false;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnGoBack_Click");
        }
    }

    async btnRecipient_Click() {
        this.statusMsgs = [];
        try {
            this.lstRecipientsChck = [];
            if (this.poNewItem.DELIVER_TO == "" || this.poNewItem.DELIVER_TO == undefined || this.poNewItem.DELIVER_TO == null) {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Recipient is Mandatory" });
            }
            else {
                this.page = false;
                this.nonPO = false;
                this.nonPOReceipts = true;
                await this.getRecipients(this.poNewItem.DELIVER_TO);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnRecipient_Click");
        }
    }

    async getRecipients(recipient) {
        this.statusMsgs = [];
        try {
            await this.recvPoNonPoService.getRecipients(recipient).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<any>;
                this.blnRecipients = false;
                this.spnrService.stop();
                this.statusMsgs = [];
                switch (data.StatType) {
                    case StatusType.Success: {
                        this.lstRecipients = data.DataList;
                        if (this.lstRecipients.length > 0) {
                            this.blnRecipients = true;
                        }
                        if (this.lstRecipients.length <= 0) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Records were returned' })
                        }
                        break;
                    }
                    case StatusType.Warn: {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage })
                        break;
                    }
                    case StatusType.Error: {
                        this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getRecipients");
        }
    }

    btnGoBackRecipient_Click() {
        this.statusMsgs = [];
        try {
            this.page = false;
            this.nonPO = true;
            this.nonPOReceipts = false;
            this.lstRecipientsChck = [];
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnGoBackRecipient_Click");
        }
    }

    changeStatus(ven3) {
        this.statusMsgs = [];
        try {
            this.lstRecipientsChck = [];
            if (ven3 != null || ven3 != undefined) {
                let dd = ven3;
                this.lstRecipientsChck.push(ven3);
                return;
            }
            else {
                this.statusMsgs.push({
                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select the Recipient."
                });
                return;
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "changeStatus");
        }
    }

    async btnRecipientAdd_Click() {
        this.statusMsgs = [];
        try {

            if (this.lstRecipientsChck == undefined || this.lstRecipientsChck == null || this.lstRecipientsChck.length == 0) {
                this.statusMsgs.push({
                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select the Recipient."
                });
            }
            else {
                if (this.lstRecipientsChck != null && this.lstRecipientsChck.length > 0) {
                    this.lstCheckedRecipients = this.lstRecipientsChck;
                }
                if (this.lstCheckedRecipients != null && this.lstCheckedRecipients.length > 0) {
                    this.poNewItem.LOCATION = this.lstCheckedRecipients[0].LOCATION;
                    this.poNewItem.LOCDESCR = this.lstCheckedRecipients[0].LOC_DESCR;
                    this.poNewItem.DEPT_ID = this.lstCheckedRecipients[0].DEPT_ID;
                    this.poNewItem.DELIVER_TO = this.lstCheckedRecipients[0].RECIEPENTNAME;
                }
                this.lstCheckedRecipients = this.lstCheckedRecipients;
                this.statusMsgs.push({
                    severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Recipient Details Saved Successfully"
                });
                this.lstRecipientsChck = [];
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "btnRecipientAdd_Click");
        }
    }
    /**
    * 
    * End NonPO
    */

    clientErrorMsg(strExMsg, funName) {
        this.statusMsgs = [];
        this.atParConstant.catchClientError(this.statusMsgs, this.spnrService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.statusMsgs = null;
        this.lstShipToIds = null;
        this.lstOrgParms = null;
        this.lstProfileApp = null;
        this.lstUserApp = null;
        this.lstInventoryBunits = null;
        this.gblnASNPO = false;
        this.lstScreenApp = null;
        this.lstRecvIUTGetPo = null;
        this.arrlstIUTSearch = null;
        this.arrlstPOSearch = null;
        this.lstRecvPoItems = null;
        this.lstRecvSendPoHdrs = null;
        this.lstRecvIutPoItems = null;
        this.lstRecvSendPoLines = null;
        this.lstRecvIutItems = null;
        this.lstSetUpProPrinters = null;
        this.lstCarriersData = null;
        this.lstRecvAltUomData = null;
        this.lstReceivePoHeaderData = null;
        this.lstReceiveDetailsData = null;
        this.lstPrinterLabelRecvHeader = null;
        this.lstFinalLotSerial = null;
        this.lstRecvSendData = null;
        this.selecstedRow = null;
        this.lstRecvSearchPO = null;
        this.lstSeachItems = null;
        this.lstRecvIUTSearchPO = null;
        this.lstRecvSearchIuts = null;

        this.ddlBusinessUnits = null;
        this.ddlCarrier = null;
        this.grdDdlCarrier = null;
        this.ddlShipToId = null;
        this.ddlRecvUom = null;
        this.selectedBUnits = null;
        this.selectedDdlCarrier = null;
        this.selectedShipToId = null;
        this.selectedRecvUom = null;

        this.gstrLoader = null;
        this.hdnBunit = null;
        this.hdnPO = null;
        this.hdnIUT = null;
        this.hdnPoSearch = null;
        this.hdnIUTSearch = null;
        this.hdnConfirmNonPo = null;
        this.hdnConfirmPoDelete = null;
        this.hdnConfirmIUTDelete = null;
        this.txtShipId = null;
        this.txtPONumber = null;
        this.txtIUT = null;
        this.txtInvoice = null;
        this.txtPkgs = null;
        this.txtTrk = null;
        this.txtSchdExTrk = null;
        this.txtLading = null;
        this.lblReceiverId = null;
        this.lblBuyerId = null;
        this.lblPhoneValue = null;
        this.standardUOM = null;
        this.standardConversionRate = null;
        this.txtNoOfBoxes = null;
        this.lnkItemId = null;
        this.txtQty = null;
        this.ddlGridCarrier = null;
        this.txtLadg = null;
        this.lnkLineNbr = null;
        this.ERS_TYPE = null;
        this.concatinateTrkNoPoID = null;
        this.txtSerchItemId = null;
        this.txtItemId = null;
        this.txtVendorId = null;
        this.txtVendorName = null;
        this.hdnReqShiptoId = null;
        this.hdnIncludeASNPOs = null;

        this.gIUTTransactionID = null;
        this.gStrASNDownload = null;
        this.gStrReceiverId = null;
        this.gStrLotSerial = null;
        this.gTransactionID = null;
        this.gInvoiceMthdCode = null;
        this.gDropShipFlag = null;
        this.gStrDefaultInput = null;
        this.gStrEditShipToId = null;
        this.gStrNonPoItemsReceive = null;
        this.gStrUOMEditFlag = null;
        this.gStrReqdShipToId = null;
        this.gStrDisplayReceivedQty = null;
        this.gStrAllowIUTAccess = null;
        this.gASNReceiptStatus = null;
        this.gStrNonStockStore = null;
        this.gStrSearchType = null;
        this.gStrAltUOMDisplay = null;
        this.gStrAllowExcessQty = null;
        this.gStrZeroReceiptWarn = null;
        this.gDefaultDateRange = null;
        this.gDisplayComments = null;
        this.gStrDefPrinter = null;
        this.gStrSelPrinter = null;
        this.gStrPrintPoIDComments = null;
        this.gConcatinateTrkNoPoID = null;
        this.gStrRecDelprintoption = null;
        this.gdonotDefaulttrackingNumber = null;
        this.gPrintStockHeader = null;
        this.gRecv_StandardUOM = null;
        this.gRecv_PoUOM = null;
        this.gPOUOM = null;
        this.gPOUOMConversionRate = null;
        this.gSTime = null;
        this.gStrInvoice = null;
        this.gstrPrevComments = null;
        this.gstrlnkitemid = null;
        this.gstrlnklineNbr = null;
        this.lstBunits = null;
        this.gblnCancel = null;
        this.gblnLotSerialFlg = null;
        this.gblnScheduleFlg = null;

        this.nonStockCount = null;
        this.stockCount = null;
        this.recordsPerPageSize = null;
        this.intAppId = null;
        this.statusCode = null;
        this.statusType = null;
        this.shipToIdCount = null;

        this.blnShipToId = null;
        this.chkIncludeAllPOLines = null;
        this.btnPntrHeaderVisible = null;
        this.btnPntrDetailsVisible = null;
        this.btnPntrLotSerialVisible = null;
        this.txtIutIsEditMode = null;
        this.blnGrdRecvPoItems = null;
        this.blnGrdRecvIutItems = null;
        this.btnIUTSearch = null;
        this.btnNonPo = null;
        this.btnPoSearch = null;
        this.btnGetEnableDisable = null;
        this.btnPoSearchEnableDisable = null;
        this.btnIUTSearchEnableDisable = null;
        this.btnNonPoEnableDisable = null;
        this.recvGrdCarrierEnable = null;
        this.ddlRecvUomEnable = null;
        this.btnLotSerialDisable = null;
        this.btnPntrHeaderDisable = null;
        this.btnPntrDetailsDisable = null;
        this.blnTxtExtTrk = null;
        this.blnLblExtTrk = null;
        this.blnImgCountAll = null;
        this.blnImgResetAll = null;
        this.blnPrinted = null;
        this.txtLadingIsEditMode = null;
        this.txtExtTrkIsEditMode = null;
        this.grdRecvLinesRbBtnCheck = null;
        this.grdRecvIutItemsRbBtnCheck = null;
        this.txtPkgsIsReadonly = null;
        this.rbtnDueDate = null;
        this.rbtnPODate = null;

    }
}