"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var datatableservice_1 = require("./../components/datatable/datatableservice");
var employee_1 = require("../components/datatable/employee");
var PAR_MNGT_VENDOR_1 = require("../../app/Entities/PAR_MNGT_VENDOR");
var linq_es5_1 = require("linq-es5");
var AtParEnums_1 = require("../Shared/AtParEnums");
var HttpService_1 = require("../Shared/HttpService");
var AtParConstants_1 = require("../Shared/AtParConstants");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var datatable_1 = require("../components/datatable/datatable");
var api_1 = require("../components/common/api");
var recv_po_nonpo_receipts_service_1 = require("./recv-po-nonpo-receipts.service");
var vm_recv_iutgetpos_1 = require("../entities/vm_recv_iutgetpos");
var vm_recv_poheader_1 = require("../entities/vm_recv_poheader");
var vm_recv_sendpoheader_1 = require("../entities/vm_recv_sendpoheader");
var vm_recv_sendlineheader_1 = require("../entities/vm_recv_sendlineheader");
var vm_recv_iut_items_1 = require("../entities/vm_recv_iut_items");
var mt_atpar_setup_pro_printeres_1 = require("../entities/mt_atpar_setup_pro_printeres");
var vm_printlabel_receive_header_1 = require("../entities/vm_printlabel_receive_header");
var vm_recv_printer_header_1 = require("../entities/vm_recv_printer_header");
var vm_recv_searchheader_1 = require("../entities/vm_recv_searchheader");
var VM_IUT_SENDHEADER_1 = require("../Entities/VM_IUT_SENDHEADER");
var VM_IUT_SEARCHHEADER_1 = require("../Entities/VM_IUT_SEARCHHEADER");
var MT_RECV_NONPO_1 = require("../Entities/MT_RECV_NONPO");
var VM_RECV_LOTSERIAL_1 = require("../Entities/VM_RECV_LOTSERIAL");
var vm_recv_nonpo_printerdetails_1 = require("../entities/vm_recv_nonpo_printerdetails");
var routepath_1 = require("../AtPar/Menus/routepath");
var platform_browser_1 = require("@angular/platform-browser");
var PoNonPoReceiptsComponent = (function () {
    function PoNonPoReceiptsComponent(dataservice, spnrService, httpService, atParConstant, commonService, document, recvPoNonPoService, confirmationService) {
        this.dataservice = dataservice;
        this.spnrService = spnrService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.commonService = commonService;
        this.document = document;
        this.recvPoNonPoService = recvPoNonPoService;
        this.confirmationService = confirmationService;
        this.pop = false;
        this.page = true;
        this.purchase = false;
        this.printtbl = false;
        this.tbl = false;
        this.plus = true;
        this.minus = false;
        this.bysch = false;
        this.recvSearchPos = false;
        this.recvIUTSearch = false;
        this.editform = false;
        this.lotserial = false;
        this.blnFlag = false;
        this.loading = true;
        this.blnSchedsExist = false;
        this.blnReceiveall = false;
        this.lotserialGrid = false;
        this.minDateValue1 = new Date();
        this.btnTrackingNumber = false;
        this.lblTrackingNumber = false;
        this.btnPntrLotSerialDisable = false;
        this.newItem = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
        this.poNewItem = new MT_RECV_NONPO_1.VM_RECV_SENDNONPOHEADER();
        this.deviceTokenEntry = [];
        this.statusMsgs = [];
        this.receive_itemSubdetails_dt = [];
        this.lstMainItemLotSerial = [];
        this.lstFinalLotSerial = [];
        this.lstAsnDetails = [];
        this.receItemColumns = [];
        this.receIutItemColumns = [];
        this.receSchdlItemColumns = [];
        this.lstFilterItems = [];
        this.ddlRecvUom = [];
        this.lstLotSerial = [];
        this.selectedlotserialUOM = "";
        this.txtFrmDate = new Date();
        this.txtToDate = new Date();
        this.currentDate = new Date();
        this.currentFromDate = new Date();
        this.selectedBUnits = "Select BusinessUnit";
        this.selectedDdlCarrier = "Select Carrier";
        this.selectedSchdDdlCarrier = "Select Carrier";
        this.selectedShipToId = "Select ShipToID";
        this.selectedRecvUom = "";
        this.hdnBunit = "";
        this.hdnPO = "";
        this.hdnIUT = "";
        this.hdnPoSearch = "";
        this.hdnIUTSearch = "";
        this.hdnConfirmNonPo = "";
        this.hdnConfirmPoDelete = "";
        this.hdnConfirmIUTDelete = "";
        this.hdnItemId = "";
        this.hdnItemType = "";
        this.hdnInvItemId = "";
        this.hdnSearchWithOutBU = "";
        this.hdnNonPo = "";
        this.hdnCnfmZroQty = "";
        this.txtShipId = "";
        this.txtPONumber = "";
        this.txtIUT = "";
        this.txtInvoice = "";
        this.txtPkgs = "";
        this.txtTrk = "";
        this.txtSchdExTrk = "";
        this.txtLading = "";
        this.lblReceiverId = "";
        this.lblBuyerId = "";
        this.lblPhoneValue = "";
        this.standardUOM = "";
        this.strDefaultCarrierID = "";
        this.standardConversionRate = "";
        this.txtNoOfBoxes = "";
        this.lnkItemId = "";
        this.txtQty = "";
        this.ddlGridCarrier = "";
        this.txtLadg = "";
        this.lnkLineNbr = "";
        this.ERS_TYPE = "INR";
        this.concatinateTrkNoPoID = "";
        this.txtSerchItemId = "";
        this.txtItemId = "";
        this.txtVendorId = "";
        this.txtVendorName = "";
        this.schedNbr = "";
        this.lotSerialConverfactor = 0;
        this.serialControl = "";
        this.lotControl = "";
        this.strTotalQty = "";
        this.txtLotserialExpDate = new Date();
        this.strLotSerialUom = "";
        this.lblHdrComments = "";
        this.lblHdrCommentsToolTip = "";
        this.selectedINVITEMID = "";
        this.selectedSCHEDNBR = "";
        this.selectedReceiverId = "";
        this.presentScreen = "PO";
        this.hdnReqShiptoId = "";
        this.hdnIncludeASNPOs = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
        this.selectedRecvId = "";
        this.recnonstaticFields = "INV_ITEM_ID,LINE_QTY,UNIT_OF_MEASURE,CARRIER_ID,BILL_OF_LADING,LINE_NBR,NO_OF_BOXES,EXT_TRK_NO,NO_OF_BOXES,DESCR";
        this.gStrASNDownload = "";
        this.gStrReceiverId = "";
        this.gStrLotSerial = "";
        this.gTransactionID = "";
        this.gInvoiceMthdCode = "";
        this.gDropShipFlag = "";
        this.gStrDefaultInput = "";
        this.gStrEditShipToId = "";
        this.gStrNonPoItemsReceive = "";
        this.gStrUOMEditFlag = "";
        this.gStrReqdShipToId = "";
        this.gStrDisplayReceivedQty = "";
        this.gStrAllowIUTAccess = "";
        this.gASNReceiptStatus = "";
        this.gStrNonStockStore = "";
        this.gStrSearchType = "";
        this.gStrAltUOMDisplay = "";
        this.gStrAllowExcessQty = "";
        this.gStrZeroReceiptWarn = "";
        this.gDefaultDateRange = "";
        this.gDisplayComments = "";
        this.gStrDefPrinter = "";
        this.gStrSelPrinter = "";
        this.gStrPrintPoIDComments = "";
        this.gConcatinateTrkNoPoID = "";
        this.gStrRecDelprintoption = "";
        this.gdonotDefaulttrackingNumber = "";
        this.gPrintStockHeader = "";
        this.gRecv_StandardUOM = "STANDARDUOM";
        this.gRecv_PoUOM = "PO UOM";
        this.gPOUOM = "";
        this.gPOUOMConversionRate = "";
        this.gSTime = "";
        this.gStrInvoice = "";
        this.gstrPrevComments = "";
        this.gstrlnkitemid = "";
        this.gstrlnklineNbr = "";
        this.gblnCancel = false;
        this.gblnASNPO = false;
        this.gblnLotSerialFlg = false;
        this.gblnScheduleFlg = false;
        this.statusCode = -1;
        this.statusType = -1;
        this.shipToIdCount = 0;
        this.cntLotSerialQty = 0;
        this.intTolRecvQty = 0;
        this.blnShipToId = true;
        this.chkIncludeAllPOLines = false;
        this.btnPntrHeaderVisible = true;
        this.btnPntrDetailsVisible = true;
        this.btnPntrLotSerialVisible = false;
        this.txtIutIsEditMode = true; // false;
        this.blnGrdRecvPoItems = false;
        this.blnGrdRecvIutItems = false;
        this.btnIUTSearch = true;
        this.btnNonPo = true;
        this.btnPoSearch = true;
        this.btnGetEnableDisable = false;
        this.btnPoSearchEnableDisable = false;
        this.btnIUTSearchEnableDisable = false;
        this.btnNonPoEnableDisable = false;
        this.recvGrdCarrierEnable = false;
        this.ddlRecvUomEnable = false;
        this.btnLotSerialDisable = false;
        this.btnPntrHeaderDisable = false;
        this.btnPntrDetailsDisable = false;
        this.blnTxtExtTrk = true;
        this.blnLblExtTrk = true;
        this.blnImgCountAll = true;
        this.blnImgResetAll = true;
        this.txtLadingIsEditMode = false;
        this.txtExtTrkIsEditMode = false;
        this.grdRecvLinesRbBtnCheck = false;
        this.grdRecvIutItemsRbBtnCheck = false;
        this.grdRecvSearchPos = false;
        this.txtPkgsIsReadonly = false;
        this.rbtnDueDate = false;
        this.rbtnPODate = false;
        this.blnlnkItemIdEnable = false;
        this.blnlnkLineNbrEnable = false;
        this.ddllotserialUomEnable = false;
        this.txtLotSerialQtyIsEditMode = false;
        this.txtSerialIDIsEditMode = false;
        this.txtLotIdIsEditMode = false;
        this.txtLotserialExpDateIsEditMode = false;
        this.blnShowPopUp = false;
        this.blnScheduleItems = false;
        this.blntxtShipIdDisable = true; // false;
        this.lotSerialDeleteFlg = false;
        /*Non PO*/
        this.nonPO = false;
        this.nonPoDisable = true;
        this.nonPOReceipts = false;
        this.blnRecipients = false;
        this.dtScheduleItems = [];
        this.schPO = false;
        this.isScheduleSave = false;
        this.lotSerialSchdFlg = false;
        this.blnMgf = false;
        this.blnLot = false;
        this.blnSerial = false;
        this.blnPackage = false;
        this.blnItemPrice = false;
        this.blnNoofBoxes = false;
        this.blnTrkNo = false;
        this.blnExtrkNo = false;
        this.blnRecQty = false;
        this.blnGTIN = false;
        this.blnUPC = false;
        this.blnShip = false;
        this.lstCheckedBUnits = [];
        this.selectedPrinterName = "";
        this.breadCrumbMenu = new routepath_1.Menus();
        this.ven = new employee_1.Employee();
        this.poNewItem = new MT_RECV_NONPO_1.VM_RECV_SENDNONPOHEADER(); // VM_MT_RECV_NONPO();
        //this.addUserData.City = [];
    }
    // Grid visibility events start
    PoNonPoReceiptsComponent.prototype.go = function () {
        this.pop = !this.pop;
    };
    PoNonPoReceiptsComponent.prototype.plusShow = function () {
        var _this = this;
        this.statusMsgs = [];
        this.minus = true;
        this.plus = false;
        setTimeout(function () { _this.rbtnPODate = true; }, 1);
    };
    PoNonPoReceiptsComponent.prototype.minusShow = function () {
        var _this = this;
        this.statusMsgs = [];
        this.plus = true;
        this.minus = false;
        setTimeout(function () { _this.rbtnPODate = true; }, 1);
    };
    PoNonPoReceiptsComponent.prototype.poBack = function () {
        this.statusMsgs = [];
        this.tbl = false;
        this.page = true;
        this.recvSearchPos = false;
        this.recvIUTSearch = false;
    };
    PoNonPoReceiptsComponent.prototype.lot = function () {
        this.statusMsgs = [];
        this.bysch = false;
        this.lotserial = !this.lotserial;
    };
    PoNonPoReceiptsComponent.prototype.print = function () {
        this.statusMsgs = [];
        this.printtbl = true;
        this.bysch = false;
    };
    PoNonPoReceiptsComponent.prototype.printback = function () {
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
    };
    PoNonPoReceiptsComponent.prototype.get2 = function () {
        this.statusMsgs = [];
        this.purchase = !this.purchase;
        this.tbl = false;
        this.page = false;
        this.recvSearchPos = false;
        this.recvIUTSearch = false;
    };
    PoNonPoReceiptsComponent.prototype.getBack = function () {
        this.statusMsgs = [];
        this.purchase = false;
        this.tbl = false;
        this.page = true;
        this.recvSearchPos = false;
        this.recvIUTSearch = false;
    };
    PoNonPoReceiptsComponent.prototype.close = function () {
        this.statusMsgs = [];
        this.page = true;
        this.pop = true;
    };
    PoNonPoReceiptsComponent.prototype.onfocusToCalendar = function (e) {
        this.statusMsgs = [];
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        }
        else {
            this.minDateValue2 = this.date1;
        }
    };
    PoNonPoReceiptsComponent.prototype.onfocusFromCalendar = function (e) {
        this.statusMsgs = [];
        localStorage.removeItem("FromDate");
        this.date1 = null;
    };
    // Grid visibility events end
    // Page Initialization.
    PoNonPoReceiptsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        this.statusMsgs = [];
                        this.statusCode = -1;
                        this.spnrService.start();
                        this.intAppId = parseInt(this.appId);
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        _a = this;
                        return [4 /*yield*/, this.getReceivePrerequisites()];
                    case 1:
                        _a.statusCode = _b.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.loadparameters("mt_recv_po_or_nonpo_receipts")];
                    case 2:
                        _b.sent();
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
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _b.sent();
                        this.clientErrorMsg(ex_1, "ngOnInit");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Page Load Event.
    PoNonPoReceiptsComponent.prototype.page_Load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var strDefaultCarrierID, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        this.spnrService.start();
                        //this.RegisterScripts();
                        this.statusMsgs = [];
                        this.statusCode = -1;
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
                        this.clearData();
                        this.gStrReceiverId = "";
                        if (this.hdnConfirmPoDelete == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                            //Delte PO 
                            this.deletePo();
                            return [2 /*return*/];
                        }
                        else if (this.hdnConfirmIUTDelete == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                            //Delete IUT
                            this.deleteIUTOrder();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bindDataGrid()];
                    case 1:
                        _a.sent();
                        if (this.selectedDdlCarrier == "Select Carrier") {
                            this.populateCarrierDropDown(this.selectedDdlCarrier);
                        }
                        else {
                            if (this.lstUserApp != null && this.lstUserApp.length > 0) {
                                strDefaultCarrierID = linq_es5_1.asEnumerable(this.lstUserApp).ToArray()[1].PARAMETER_VALUE;
                                if (strDefaultCarrierID != null && strDefaultCarrierID != "") {
                                    if (this.selectedDdlCarrier.toUpperCase() == strDefaultCarrierID.toUpperCase()) {
                                        this.selectedDdlCarrier = strDefaultCarrierID.toUpperCase();
                                    }
                                    else {
                                        this.ddlCarrier.push({ label: strDefaultCarrierID, value: strDefaultCarrierID });
                                        this.selectedDdlCarrier = strDefaultCarrierID.toUpperCase();
                                    }
                                }
                                else {
                                    this.selectedDdlCarrier = "Select Carrier";
                                }
                            }
                        }
                        if (this.gstrLoader != undefined && this.gstrLoader != "") {
                            this.gstrLoader = "Loader";
                        }
                        return [4 /*yield*/, this.lotScheduleQty()];
                    case 2:
                        _a.sent();
                        if (!(this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0 && this.txtIUT != null && this.txtIUT != "")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.postbackGridBind(this.lstRecvIutItems, "IUT ITEMS")];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        if (!(this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.postbackGridBind(this.lstRecvSendPoLines, "RECEIVE ITEMS")];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "page_Load");
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.bUnit_selectChanged = function (option, event) {
        try {
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bUnit_selectChanged");
        }
    };
    PoNonPoReceiptsComponent.prototype.ddlCarrier_selectChanged = function (option, event) {
        return __awaiter(this, void 0, void 0, function () {
            var ddlCarriertxtDDSearch1;
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = [];
                    if (this.selecstedRow != null) {
                        if (this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0) {
                            this.selecstedRow.CARRIER_ID = this.selectedDdlCarrier;
                            this.selecstedRow.PRVCARRIER_ID = this.selecstedRow.CARRIER_ID;
                        }
                        else if (this.selecstedRow.SCHED_COUNT <= 1) {
                            this.selecstedRow.CARRIER_ID = this.selectedDdlCarrier;
                            this.selecstedRow.PRVCARRIER_ID = this.selecstedRow.CARRIER_ID;
                        }
                        ddlCarriertxtDDSearch1 = document.getElementById("txtddlCarrier");
                        if (ddlCarriertxtDDSearch1 != null) {
                            ddlCarriertxtDDSearch1.focus();
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "ddlCarrier_selectChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.ddlSchdCarrier_selectChanged = function (option, event) {
        try {
            this.statusMsgs = [];
            if (this.selecstedRow != null) {
                this.selecstedRow.CARRIER_ID = this.selectedSchdDdlCarrier;
                this.selecstedRow.PRVCARRIER_ID = this.selecstedRow.CARRIER_ID;
                var ddlCarriertxtDDSearch1 = document.getElementById("txtddlCarrier");
                if (ddlCarriertxtDDSearch1 != null) {
                    ddlCarriertxtDDSearch1.focus();
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlCarrier_selectChanged");
        }
    };
    PoNonPoReceiptsComponent.prototype.txtPkgs_TextChanged = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = [];
                    setTimeout(function () {
                        if (_this.selecstedRow != null && _this.selecstedRow.SCHED_COUNT <= 1) {
                            _this.selecstedRow.NO_OF_BOXES = _this.txtPkgs;
                        }
                    }, 10);
                    // await this.changedata("NoOfBoxes", null);//this.selecstedRow
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "txtPkgs_TextChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.txtSchdPkgs_TextChanged = function (event) {
        var _this = this;
        try {
            this.statusMsgs = [];
            setTimeout(function () {
                if (_this.selecstedRow != null && _this.selecstedRow.SCHED_COUNT <= 1) {
                    _this.selecstedRow.NO_OF_BOXES = _this.txtPkgs;
                }
            }, 10);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "txtSchdPkgs_TextChanged");
        }
    };
    PoNonPoReceiptsComponent.prototype.txtTrk_TextChanged = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = [];
                    this.statusMsgs = [];
                    setTimeout(function () {
                        if (_this.selecstedRow != null && _this.selecstedRow.SCHED_COUNT <= 1) {
                            _this.selecstedRow.EXT_TRK_NO = _this.txtTrk;
                        }
                    }, 10);
                    // await this.changedata("ExtTrkno", null);//this.selecstedRow
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "txtTrk_TextChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.txtSchdTrk_TextChanged = function (event) {
        var _this = this;
        try {
            this.statusMsgs = [];
            this.statusMsgs = [];
            setTimeout(function () {
                if (_this.selecstedRow != null) {
                    _this.selecstedRow.EXT_TRK_NO = _this.txtSchdExTrk;
                }
            }, 10);
            // await this.changedata("ExtTrkno", null);//this.selecstedRow
        }
        catch (ex) {
            this.clientErrorMsg(ex, "txtSchdTrk_TextChanged");
        }
    };
    PoNonPoReceiptsComponent.prototype.txtRecvQty_TextChanged = function (event, recvData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var dateStr, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        if (recvData.QTY != null && recvData.QTY != "") {
                            if (parseInt(recvData.QTY) > 0) {
                                recvData.RECEIVED_FLAG = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString();
                                recvData.LINE_QTY = recvData.QTY;
                            }
                        }
                        if (recvData != null && recvData.INV_ITEM_ID == this.selectedINVITEMID) {
                            this.txtPkgs = recvData.NO_OF_BOXES;
                        }
                        if (recvData.QTY != "" && parseInt(recvData.QTY) == 0 && this.hdnCnfmZroQty == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                            this.confirmationService.confirm({
                                message: "Zero Receipt Quantity entered, continue?",
                                accept: function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        this.spnrService.stop();
                                        return [2 /*return*/];
                                    });
                                }); },
                                reject: function () {
                                    setTimeout(function () {
                                        var itemtxtRecvQty = document.getElementById('txtRecvQty' + recvData.INV_ITEM_ID);
                                        if (itemtxtRecvQty != null) {
                                            itemtxtRecvQty.focus();
                                        }
                                    }, 1);
                                    recvData.QTY = "";
                                    _this.spnrService.stop();
                                    return;
                                }
                            });
                            this.spnrService.stop();
                        }
                        dateStr = new Date(new Date()).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                        if (this.gSTime != "") {
                            this.gSTime = dateStr.replace(',', '');
                        }
                        return [4 /*yield*/, this.chkItemQty(recvData)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "txtRecvQty_TextChanged");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.txtNoOfBoxUnFocus = function (recvData) {
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
    };
    PoNonPoReceiptsComponent.prototype.txtSchdNoOfBoxUnFocus = function (recvData) {
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
    };
    PoNonPoReceiptsComponent.prototype.txtExtTrackNoUnFocus = function (recvData) {
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
    };
    PoNonPoReceiptsComponent.prototype.txtSchExtTrackNoUnFocus = function (recvData) {
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
    };
    PoNonPoReceiptsComponent.prototype.txtSchdRecvQty_TextChanged = function (event, recvData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = [];
                    if (recvData.QTY != null && recvData.QTY != "") {
                        if (parseInt(recvData.QTY) > 0) {
                            recvData.RECEIVED_FLAG = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString();
                            recvData.QTY = recvData.QTY;
                            recvData.SCHDQTYCHANGFLAG = true;
                        }
                    }
                    if (recvData.QTY != "" && parseInt(recvData.QTY) == 0 && this.hdnCnfmZroQty == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                        this.confirmationService.confirm({
                            message: "Zero Receipt Quantity entered, continue?",
                            accept: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    this.spnrService.stop();
                                    return [2 /*return*/];
                                });
                            }); },
                            reject: function () {
                                setTimeout(function () {
                                    var itemtxtRecvQty = document.getElementById('txtRecvQty' + recvData.SCHED_NBR);
                                    if (itemtxtRecvQty != null) {
                                        itemtxtRecvQty.focus();
                                    }
                                }, 1);
                                recvData.QTY = "";
                                _this.spnrService.stop();
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
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.shipToId_selectChanged = function (option, event) {
    };
    PoNonPoReceiptsComponent.prototype.receiveAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var intScheduleCnt, strRecedQty, strSerialControlled, strLotControlled, i_1, i_2, _loop_1, this_1, i, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.statusMsgs = [];
                        intScheduleCnt = 0;
                        strRecedQty = null;
                        strSerialControlled = null;
                        strLotControlled = null;
                        this.blnReceiveall = true;
                        if ((this.selectedDdlCarrier == 'Select Carrier' || this.selectedDdlCarrier == '' || this.selectedDdlCarrier == undefined) || (this.txtLading == '' || this.txtLading == null || this.txtLading == undefined)) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Carrier and Lading are mandatory" });
                            return [2 /*return*/];
                        }
                        this.lstCheckedBUnits = [];
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.endIndex = +sessionStorage.getItem("RecordsEndindex");
                        if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                            if (this.endIndex > this.lstRecvSendPoLines.length) {
                                this.endIndex = this.lstRecvSendPoLines.length;
                            }
                            for (i_1 = this.endIndex - 1; i_1 >= this.startIndex; i_1--) {
                                this.lstCheckedBUnits.push(this.lstRecvSendPoLines[i_1]);
                            }
                        }
                        else if (this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0) {
                            if (this.endIndex > this.lstRecvIutItems.length) {
                                this.endIndex = this.lstRecvIutItems.length;
                            }
                            for (i_2 = this.endIndex - 1; i_2 >= this.startIndex; i_2--) {
                                this.lstCheckedBUnits.push(this.lstRecvIutItems[i_2]);
                            }
                        }
                        _loop_1 = function () {
                            var lnkItemId_1, strRecallFlag, dtRecallInfo, dr;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this_1.poNonPo_RbtnChange(this_1.lstCheckedBUnits[i], false)];
                                    case 1:
                                        _a.sent();
                                        this_1.txtSerchItemId = "";
                                        this_1.txtPkgs = "";
                                        this_1.blnSchedsExist = false;
                                        //}
                                        if (this_1.lstRecvIutItems == null || this_1.lstRecvIutItems == undefined) {
                                            lnkItemId_1 = this_1.lstCheckedBUnits[i].INV_ITEM_ID;
                                            intScheduleCnt = this_1.lstCheckedBUnits[i].SCHED_COUNT;
                                            strSerialControlled = this_1.lstCheckedBUnits[i].SERIAL_CONTROLLED;
                                            strLotControlled = this_1.lstCheckedBUnits[i].LOT_CONTROLLED;
                                            strRecallFlag = this_1.lstCheckedBUnits[i].RECAL_FLAG.toString();
                                            if (intScheduleCnt == 1 && (this_1.gStrLotSerial == AtParEnums_1.Enable_Lot_Serial_Tracking[AtParEnums_1.Enable_Lot_Serial_Tracking.None].toString() ||
                                                !(strSerialControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || strLotControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()))) {
                                                this_1.blnFlag = true;
                                                //Recall Checking
                                                if (strRecallFlag == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                                    dtRecallInfo = this_1.lstReCallInfo;
                                                    if (dtRecallInfo != null && dtRecallInfo.length > 0) {
                                                        dr = dtRecallInfo.filter(function (x) { return x.ITEM_ID == lnkItemId_1 && (x.LOT_NO == "" || x.LOT_NO == null) && (x.SERIAL_NO == "" || x.SERIAL_NO == null); });
                                                        if (dr != null && dr.length > 0) {
                                                            this_1.blnFlag = false;
                                                        }
                                                    }
                                                }
                                            }
                                            else if (intScheduleCnt > 1) {
                                                this_1.lstCheckedBUnits[i].SCHDFLAG = true;
                                                this_1.blnSchedsExist = true;
                                            }
                                            else if (strSerialControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || strLotControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                                this_1.blnSchedsExist = true;
                                                this_1.lstCheckedBUnits[i].SCHDFLAG = true;
                                            }
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.lstCheckedBUnits.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (this.blnSchedsExist) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Lines with schedules or lot serial have not been updated" });
                            //   this.selectedINVITEMID = "";
                        }
                        setTimeout(function () {
                            var serchItemId = document.getElementById('txtSerchItemId');
                            if (serchItemId != null) {
                                serchItemId.focus();
                            }
                        }, 1);
                        return [2 /*return*/];
                    case 5:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "ReceiveAll");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.resetAll = function () {
        try {
            this.statusMsgs = [];
            if (this.lstCheckedBUnits != null && this.lstCheckedBUnits.length > 0) {
                if (this.gStrDefaultInput) {
                }
            }
            var intScheduleCnt = 0;
            var strRecedQty = null;
            var strSerialControlled = null;
            var strLotControlled = null;
            var strPoQty = null;
            var txtNoOfBoxes = void 0;
            var blnFlag = false;
            var dtReceiveDetails = void 0;
            var strLot = void 0;
            var strSerial = void 0;
            var lnkLineNbr = void 0;
            var lbQtyPO = void 0;
            var lnkItemId = void 0;
            var txtQty = void 0; //.LINE_QTY;
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
                            txtQty = this.lstRecvSendPoLines[i].QTY; //.LINE_QTY;
                            strRecedQty = this.lstRecvSendPoLines[i].RECEIVED_QTY + "";
                            ;
                            strPoQty = this.lstRecvSendPoLines[i].QTY_PO + ""; //LINE_PO_QTY check once Qty
                            intScheduleCnt = this.lstRecvSendPoLines[i].SCHED_COUNT;
                            strSerialControlled = this.lstRecvSendPoLines[i].SERIAL_CONTROLLED;
                            strLotControlled = this.lstRecvSendPoLines[i].LOT_CONTROLLED;
                            if (lnkItemId != null) {
                                if (lnkItemId == "") {
                                    this.blnFlag = true;
                                }
                                //Do not default Lines which have schedules
                                if (strSerialControlled == null || strSerialControlled == "") {
                                    strSerialControlled = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                                }
                                if (strLotControlled == null && strLotControlled == "") {
                                    strLotControlled = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                                }
                                if (intScheduleCnt == 1 && (this.gStrLotSerial == AtParEnums_1.Enable_Lot_Serial_Tracking[AtParEnums_1.Enable_Lot_Serial_Tracking.None].toString() ||
                                    !(strSerialControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || strLotControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()))) {
                                    this.blnFlag = true;
                                }
                                else if (intScheduleCnt > 1) {
                                    this.lstRecvSendPoLines[i].SCHDFLAG = true;
                                    this.blnSchedsExist = true;
                                }
                                else if (strSerialControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || strLotControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
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
                            var lbInterUnit = this.lstRecvIutItems[i].INTERUNIT_LINE;
                            txtNoOfBoxes = parseInt(this.lstRecvIutItems[i].NO_OF_PKGS);
                            lnkItemId = this.lstRecvIutItems[i].ITEM_ID;
                            txtQty = parseInt(this.lstRecvIutItems[i].QTY);
                            if (this.lstRecvIutItems[i].ITEM_ID == lnkItemId && this.lstRecvIutItems[i].INTERUNIT_LINE == lbInterUnit) {
                                this.lstRecvIutItems[i].NO_OF_PKGS = "";
                                this.lstRecvIutItems[i].BILL_OF_LADING = "";
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
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Lines with schedules or lot serial have not been updated" });
                //this.selectedINVITEMID = "";
                return;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ResetAll");
        }
    };
    PoNonPoReceiptsComponent.prototype.btnGet_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 12, , 13]);
                        // this.selectedINVITEMID = "";
                        this.presentScreen = "PO";
                        this.page = true;
                        this.purchase = false;
                        this.plus = true;
                        this.minus = false;
                        this.statusMsgs = [];
                        this.selectedRecvId = "";
                        if ((this.selectedBUnits == "Select BusinessUnit" || this.selectedBUnits == "")) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        if ((this.selectedBUnits == "Select BusinessUnit" || this.selectedBUnits == "") && this.hdnSearchWithOutBU == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString()) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        if (this.txtPONumber.trim() == "" && this.txtIUT.trim() == "") {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter PO or IUT Number" });
                            this.tbl = false;
                            this.lstRecvIutItems = [];
                            this.lstRecvSendPoLines = [];
                            return [2 /*return*/];
                        }
                        else if (this.txtPONumber != "" && this.txtIUT != "") {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter any one PO or IUT Number" });
                            return [2 /*return*/];
                        }
                        if (this.hdnReqShiptoId == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && this.txtPONumber.trim() != "") {
                            if (this.ddlShipToId != undefined && this.ddlShipToId != null && this.blnShipToId == true) {
                                if (this.selectedShipToId == "Select ShipToID" || this.selectedShipToId == "") {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ShipTo ID is mandatory to download the PO" });
                                    return [2 /*return*/];
                                }
                            }
                            if (this.txtShipId != null && this.blnShipToId == false) {
                                if (this.txtShipId == "") {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ShipTo ID is mandatory to download the PO" });
                                    return [2 /*return*/];
                                }
                            }
                        }
                        if (!(this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0)) return [3 /*break*/, 4];
                        this.btnPntrHeaderDisable = false;
                        this.btnPntrDetailsDisable = true;
                        if (!(this.hdnBunit == this.selectedBUnits && this.txtPONumber != "" && this.hdnPO == this.txtPONumber.toUpperCase())) return [3 /*break*/, 1];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "This PO is in Download status" });
                        return [2 /*return*/];
                    case 1:
                        this.selectedINVITEMID = "";
                        return [4 /*yield*/, this.confirmData("Get")];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 11];
                    case 4:
                        if (!(this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0)) return [3 /*break*/, 8];
                        this.btnPntrHeaderDisable = true;
                        this.btnPntrDetailsDisable = true;
                        if (!(this.hdnBunit == this.selectedBUnits && this.txtIUT != "" && this.hdnIUT == this.txtIUT.toUpperCase())) return [3 /*break*/, 5];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "This IUT is in Download status" });
                        return [2 /*return*/];
                    case 5:
                        this.selectedINVITEMID = "";
                        return [4 /*yield*/, this.confirmIUT("Get")];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [3 /*break*/, 11];
                    case 8:
                        this.txtTrk = "";
                        this.selectedINVITEMID = "";
                        return [4 /*yield*/, this.bindDataGrid()];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.populateCarrierDropDown(this.selectedDdlCarrier)];
                    case 10:
                        _a.sent();
                        this.spnrService.stop();
                        _a.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "btnGet_Click");
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnSend_Click = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _loop_2, this_2, i, state_1, drIUTCount, sTime, eTime, transactionId, strIUT, _a, drowlotitem, i, drSerialLotRows, i_3, drNonStockCount, drStockCount, transactionId, transCode, tempPoId, sTime, dateStr, _b, ex_6;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 9, , 10]);
                        this.statusMsgs = [];
                        this.statusCode = -1;
                        if (!(this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0)) return [3 /*break*/, 6];
                        _loop_2 = function (i) {
                            var checkQtyValue;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this_2.txtNoOfBoxes = this_2.lstRecvIutItems[i].NO_OF_PKGS;
                                        this_2.lnkItemId = this_2.lstRecvIutItems[i].ITEM_ID;
                                        this_2.txtQty = this_2.lstRecvIutItems[i].QTY;
                                        if (!(this_2.txtQty != null && this_2.txtQty != "" && this_2.txtQty != undefined)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this_2.chkItemQty(this_2.lstRecvIutItems[i])];
                                    case 1:
                                        checkQtyValue = _a.sent();
                                        if (checkQtyValue) {
                                            setTimeout(function () {
                                                var itemtxtRecvQty = document.getElementById('txtRecvQty' + _this.lstRecvIutItems[i].ITEM_ID);
                                                if (itemtxtRecvQty != null) {
                                                    itemtxtRecvQty.focus();
                                                }
                                            }, 2);
                                            return [2 /*return*/, { value: void 0 }];
                                        }
                                        _a.label = 2;
                                    case 2:
                                        if (this_2.lstRecvIutItems[i].CARRIER_ID != null && this_2.lstRecvIutItems[i].CARRIER_ID != "Select Carrier" &&
                                            this_2.lstRecvIutItems[i].CARRIER_ID != "" && this_2.lstRecvIutItems[i].CARRIER_ID != undefined) {
                                            this_2.ddlGridCarrier = this_2.lstRecvIutItems[i].CARRIER_ID;
                                        }
                                        if (this_2.lstRecvIutItems[i].BILL_OF_LADING != null &&
                                            this_2.lstRecvIutItems[i].BILL_OF_LADING != "" && this_2.lstRecvIutItems[i].BILL_OF_LADING != undefined) {
                                            this_2.txtLadg = this_2.lstRecvIutItems[i].BILL_OF_LADING;
                                        }
                                        if (this_2.txtQty != "" && (this_2.txtLadg == "" || this_2.ddlGridCarrier == "" || this_2.ddlGridCarrier == "Select Carrier")) {
                                            this_2.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Carrier and Lading are mandatory" });
                                            setTimeout(function () {
                                                var itemtxtRecvQty = document.getElementById('txtLading');
                                                if (itemtxtRecvQty != null) {
                                                    itemtxtRecvQty.focus();
                                                }
                                            }, 1);
                                            return [2 /*return*/, { value: void 0 }];
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_2 = this;
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < this.lstRecvIutItems.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_2(i)];
                    case 2:
                        state_1 = _c.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        _c.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        drIUTCount = linq_es5_1.asEnumerable(this.lstRecvIutItems).Where(function (x) { return x.QTY != ""; }).ToArray();
                        if (drIUTCount.length == 0) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter Receive quantity" });
                            return [2 /*return*/];
                        }
                        sTime = new Date();
                        sTime = new Date(this.gSTime);
                        eTime = new Date();
                        transactionId = this.gIUTTransactionID;
                        strIUT = this.lstRecvIutItems[0].INTERUNIT_ID;
                        _a = this;
                        return [4 /*yield*/, this.sendIUTOrderToServer(transactionId, this.lstRecvIutItems, sTime, eTime)];
                    case 5:
                        _a.statusCode = _c.sent();
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "IUT: " + strIUT + " received successfully." });
                            this.clearData();
                            this.clearSentDetails();
                            this.minus = false;
                            this.plus = true;
                            this.tbl = false;
                            this.blnGrdRecvIutItems = false;
                        }
                        else if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to receive the IUT:" + strIUT });
                        }
                        return [3 /*break*/, 8];
                    case 6:
                        if (!(this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0)) return [3 /*break*/, 8];
                        drowlotitem = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.QTY != null && (x.LOT_CONTROLLED == "Y" || x.SERIAL_CONTROLLED == "Y"); }).ToArray();
                        for (i = 0; i < this.lstRecvSendPoLines.length; i++) {
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
                            if (this.gStrLotSerial == AtParEnums_1.Enable_Lot_Serial_Tracking[AtParEnums_1.Enable_Lot_Serial_Tracking.MMIS].toString() &&
                                (drowlotitem.length > 0)) {
                                if (this.lstMainItemLotSerial != null && this.lstMainItemLotSerial.length > 0) {
                                    drSerialLotRows = linq_es5_1.asEnumerable(this.lstMainItemLotSerial).Where(function (x) { return ((x.SERIAL_ID != null && x.SERIAL_ID != "") || (x.LOT_ID != null && x.LOT_ID != "")) && ((x.QTY != null) && parseInt(x.QTY) > 0) && x.DELETE_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString(); }).ToArray();
                                    if (drSerialLotRows.length == 0) {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please capture Lot and/or Serial information before sending to Server" });
                                        return [2 /*return*/];
                                    }
                                }
                                else {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please capture Lot and/or Serial information before sending to Server" });
                                    return [2 /*return*/];
                                }
                            }
                            if (this.txtQty != "" && (this.txtLadg == "" || this.ddlGridCarrier == "" || this.ddlGridCarrier == "Select Carrier") &&
                                (!(this.lstRecvSendPoLines[i].SCHED_COUNT != null && this.lstRecvSendPoLines[i].SCHED_COUNT >= 1))) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Carrier and Lading are mandatory" });
                                setTimeout(function () {
                                    var itemtxtRecvQty = document.getElementById('txtLading');
                                    if (itemtxtRecvQty != null) {
                                        itemtxtRecvQty.focus();
                                    }
                                }, 1);
                                return [2 /*return*/];
                            }
                            else if (this.gInvoiceMthdCode == this.ERS_TYPE && this.txtInvoice == "") {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter the Invoice#" });
                                setTimeout(function () {
                                    var itemtxtRecvQty = document.getElementById('txtInvoice');
                                    if (itemtxtRecvQty != null) {
                                        itemtxtRecvQty.focus();
                                    }
                                }, 1);
                                return [2 /*return*/];
                            }
                            else {
                                for (i_3 = 0; i_3 < this.lstRecvSendPoLines.length; i_3++) {
                                    if (this.lstRecvSendPoLines[i_3].LINE_NBR == parseInt(this.lnkLineNbr)) {
                                        if (this.lstRecvSendPoLines[i_3].SCHED_COUNT != null && this.lstRecvSendPoLines[i_3].SCHED_COUNT == 1) {
                                            if (this.txtNoOfBoxes != null && this.txtNoOfBoxes != "") {
                                                this.lstRecvSendPoLines[i_3].NO_OF_BOXES = parseInt(this.txtNoOfBoxes);
                                            }
                                            else {
                                                if (this.lstRecvSendPoLines[i_3].NO_OF_BOXES != null) {
                                                }
                                                else {
                                                    this.lstRecvSendPoLines[i_3].NO_OF_BOXES = 1;
                                                }
                                            }
                                            this.lstRecvSendPoLines[i_3].BILL_OF_LADING = this.txtLadg;
                                            if (this.lstRecvSendPoLines[i_3].QTY == null) {
                                                this.lstRecvSendPoLines[i_3].RECEIVED_FLAG = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString();
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        drNonStockCount = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.QTY != null && x.RECEIVED_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && x.INVENTORY_ITEM == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString(); }).ToArray();
                        this.nonStockCount = drNonStockCount.length;
                        drStockCount = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.QTY != null && x.RECEIVED_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && x.INVENTORY_ITEM == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString(); }).ToArray();
                        this.stockCount = drStockCount.length;
                        if (this.nonStockCount == 0 && this.stockCount == 0) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter Receive quantity" });
                            return [2 /*return*/];
                        }
                        transactionId = this.lstRecvSendPoHdrs[0].TRANSACTION_ID;
                        transCode = this.lstRecvSendPoHdrs[0].TRANSACTION_CODE;
                        tempPoId = this.lstRecvSendPoHdrs[0].PO_ID;
                        sTime = new Date();
                        dateStr = new Date(new Date()).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                        if (this.gSTime != "") {
                            this.gSTime = dateStr.replace(',', '');
                        }
                        // PO Qty Recv End Time
                        this.spnrService.start();
                        _b = this;
                        return [4 /*yield*/, this.sendToServer(transactionId, transCode, tempPoId, this.gSTime, dateStr.replace(',', ''))];
                    case 7:
                        _b.statusCode = _c.sent();
                        this.spnrService.stop();
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "PO: " + tempPoId + " received successfully." });
                            this.clearData();
                            this.clearSentDetails();
                            this.plus = true;
                            this.minus = false;
                            this.tbl = false;
                            this.blnGrdRecvPoItems = false;
                        }
                        _c.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        ex_6 = _c.sent();
                        this.clientErrorMsg(ex_6, "btnSend_Click");
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnPrntHed_Click = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var blnstockhdr, blnNonstkhdr, blnNonStockHed, blnStockHed, blnmsgdisplayed, intNoOfBoxses, drowRecStatus, drowRecNonStockStatus, drowRecStockStatus, drowPrnterDet, drowPrnterDet, _a, _b, _c, _d, ex_7;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 28, , 29]);
                        this.statusMsgs = [];
                        blnstockhdr = false;
                        blnNonstkhdr = false;
                        blnNonStockHed = false;
                        blnStockHed = false;
                        blnmsgdisplayed = false;
                        intNoOfBoxses = 0;
                        drowRecStatus = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.QTY != null && x.RECEIVED_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString(); }).ToArray();
                        drowRecNonStockStatus = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.QTY != null && x.RECEIVED_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && x.INVENTORY_ITEM == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString(); }).ToArray();
                        drowRecStockStatus = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.QTY != null && x.RECEIVED_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && x.INVENTORY_ITEM == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString(); }).ToArray();
                        if (!(this.gStrRecDelprintoption == AtParEnums_1.Shiping_Label_PrinterType.Both_MobilePrinter_StationaryPrinter.toString() ||
                            this.gStrRecDelprintoption == AtParEnums_1.Shiping_Label_PrinterType.HeaderLbl_MobilePrinter.toString())) return [3 /*break*/, 20];
                        if (drowRecStatus.length == 0) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "PO is in download status, please receive it to print the labels." });
                            return [2 /*return*/];
                        }
                        //if (poDS.Tables.Count > 0) {
                        if (this.txtPkgs != "") {
                            intNoOfBoxses = parseInt(this.txtPkgs);
                        }
                        else {
                            intNoOfBoxses = 1;
                        }
                        if (!(this.lstSetUpProPrinters != null && this.lstSetUpProPrinters.length > 0)) return [3 /*break*/, 19];
                        if (!(this.lstSetUpProPrinters.length > 0)) return [3 /*break*/, 18];
                        if (!(this.gStrSelPrinter == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString())) return [3 /*break*/, 8];
                        drowPrnterDet = linq_es5_1.asEnumerable(this.lstSetUpProPrinters).Where(function (x) { return x.LABEL_DESCRIPTION == "NonStock PO Header"; }).ToArray();
                        if (!(drowRecNonStockStatus != null && drowRecNonStockStatus.length > 0)) return [3 /*break*/, 4];
                        if (!(drowPrnterDet != null && drowPrnterDet.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.showModalPopup(drowPrnterDet)];
                    case 1:
                        _e.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Printer Not Configured for the Functionality NonStock PO Header" });
                        blnmsgdisplayed = true;
                        _e.label = 3;
                    case 3: return [3 /*break*/, 7];
                    case 4:
                        if (!(drowRecStockStatus != null && drowRecStockStatus.length > 0)) return [3 /*break*/, 7];
                        if (!(this.gPrintStockHeader != null)) return [3 /*break*/, 7];
                        if (!(this.gPrintStockHeader == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString())) return [3 /*break*/, 7];
                        drowPrnterDet = linq_es5_1.asEnumerable(this.lstSetUpProPrinters).Where(function (x) { return x.LABEL_DESCRIPTION == "Stock PO Header"; }).ToArray(); //LABEL_DESCRIPTION='Stock PO Header'
                        if (!(drowPrnterDet != null && drowPrnterDet.length > 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.showModalPopup(drowPrnterDet)];
                    case 5:
                        _e.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Printer Not Configured for the Functionality Stock PO Header" });
                        blnmsgdisplayed = true;
                        _e.label = 7;
                    case 7: return [3 /*break*/, 17];
                    case 8:
                        if (!(this.gStrDefPrinter != "")) return [3 /*break*/, 16];
                        drowPrnterDet = linq_es5_1.asEnumerable(this.lstSetUpProPrinters).Where(function (x) { return x.FRIENDLY_NAME == _this.gStrDefPrinter; }).ToArray();
                        if (!(drowPrnterDet.length > 0)) return [3 /*break*/, 15];
                        if (!(drowRecNonStockStatus != null && drowRecNonStockStatus.length > 0)) return [3 /*break*/, 11];
                        if (!(drowPrnterDet[0].LABEL_DESCRIPTION == "NonStock PO Header")) return [3 /*break*/, 10];
                        blnNonStockHed = true;
                        _a = this;
                        return [4 /*yield*/, this.print_NonStockLabel(intNoOfBoxses, this.lstSetUpProPrinters, this.gStrDefPrinter)];
                    case 9:
                        _a.statusCode = _e.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to Print Non Stock Label " });
                            blnmsgdisplayed = true;
                        }
                        return [3 /*break*/, 11];
                    case 10:
                        blnmsgdisplayed = true;
                        _e.label = 11;
                    case 11:
                        if (!(drowRecStockStatus != null && drowRecStockStatus.length > 0)) return [3 /*break*/, 15];
                        if (!(drowPrnterDet[0].LABEL_DESCRIPTION == "Stock PO Header")) return [3 /*break*/, 14];
                        blnStockHed = true;
                        if (!(this.gPrintStockHeader != null)) return [3 /*break*/, 13];
                        if (!(this.gPrintStockHeader == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString())) return [3 /*break*/, 13];
                        _b = this;
                        return [4 /*yield*/, this.print_StockLabel(intNoOfBoxses, this.lstSetUpProPrinters, this.gStrDefPrinter)];
                    case 12:
                        _b.statusCode = _e.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to Print Stock Label " });
                            blnmsgdisplayed = true;
                        }
                        _e.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        blnmsgdisplayed = true;
                        _e.label = 15;
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        blnmsgdisplayed = true;
                        _e.label = 17;
                    case 17: return [3 /*break*/, 19];
                    case 18:
                        blnmsgdisplayed = true;
                        _e.label = 19;
                    case 19:
                        if (drowRecNonStockStatus.length == 0) {
                            if (!(blnmsgdisplayed)) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No NonStock Items to Print" });
                            }
                        }
                        else if (drowRecStockStatus.length == 0) {
                            if (!(blnmsgdisplayed)) {
                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Stock Items to Print" });
                            }
                        }
                        else {
                            // lblErrorCode.Text = string.Empty;
                        }
                        _e.label = 20;
                    case 20:
                        if (!(this.gStrRecDelprintoption == AtParEnums_1.Shiping_Label_PrinterType.DeliveryTic_StationaryPrinter.toString() ||
                            this.gStrRecDelprintoption == AtParEnums_1.Shiping_Label_PrinterType.Both_MobilePrinter_StationaryPrinter.toString())) return [3 /*break*/, 27];
                        _c = this;
                        return [4 /*yield*/, this.prepareStationaryPrinting(AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString(), blnNonstkhdr)];
                    case 21:
                        _c.statusCode = _e.sent();
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_NOPRINTADDRESS) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please provide printer address for stationary printer" });
                            return [2 /*return*/];
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_NOTVALIDPRINTER) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please provide printer address for stationary printerPlease provide valid printer address for stationary printer" });
                            return [2 /*return*/];
                        }
                        else if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Failed to Print Non Stock Stationary Print" });
                            return [2 /*return*/];
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            blnNonstkhdr = this.blnPrinted;
                        }
                        if (!(this.gPrintStockHeader != null)) return [3 /*break*/, 25];
                        if (!(this.gPrintStockHeader == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString())) return [3 /*break*/, 23];
                        _d = this;
                        return [4 /*yield*/, this.prepareStationaryPrinting(AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString(), blnstockhdr)];
                    case 22:
                        _d.statusCode = _e.sent();
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_NOPRINTADDRESS) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please provide printer address for stationary printer" });
                            return [2 /*return*/];
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_NOTVALIDPRINTER) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please provide valid printer address for stationary printer" });
                            return [2 /*return*/];
                        }
                        else if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to Print Stock Stationary Print" });
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 24];
                    case 23:
                        blnstockhdr = true;
                        _e.label = 24;
                    case 24: return [3 /*break*/, 26];
                    case 25:
                        blnstockhdr = true;
                        _e.label = 26;
                    case 26:
                        if (blnstockhdr == false && blnNonstkhdr == false) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "PO in Downloaded status,please receive it to print" });
                            return [2 /*return*/];
                        }
                        if (blnNonstkhdr == false) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No NonStock Items to Print" });
                            return [2 /*return*/];
                        }
                        else if (this.gPrintStockHeader == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && blnstockhdr == false) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Stock Items to Print" });
                            return [2 /*return*/];
                        }
                        else {
                            // lblErrorCode.Text = string.Empty;
                        }
                        _e.label = 27;
                    case 27: return [3 /*break*/, 29];
                    case 28:
                        ex_7 = _e.sent();
                        this.clientErrorMsg(ex_7, "btnPrntHed_Click");
                        return [3 /*break*/, 29];
                    case 29: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnPrntDet_Click = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var intNoOfBoxses, itemType_1, blnlblPrinted, drowPrnterDet, drowPrnterDet, _a, ex_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 16, , 17]);
                        this.statusMsgs = [];
                        this.statusCode = -1;
                        intNoOfBoxses = 1;
                        itemType_1 = null;
                        blnlblPrinted = false;
                        if (!(this.lstSetUpProPrinters != null)) return [3 /*break*/, 14];
                        if (!(this.lstSetUpProPrinters.length > 0)) return [3 /*break*/, 12];
                        if (!(this.lstRecvSendPoLines.length > 0)) return [3 /*break*/, 10];
                        if (this.txtPkgs != "") {
                            intNoOfBoxses = parseInt(this.txtPkgs);
                        }
                        else {
                            intNoOfBoxses = 1;
                        }
                        if (this.hdnItemType == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                            itemType_1 = "Stock Item";
                        }
                        else {
                            itemType_1 = "NonStock Item";
                        }
                        if (!(this.gStrSelPrinter == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString())) return [3 /*break*/, 4];
                        drowPrnterDet = linq_es5_1.asEnumerable(this.lstSetUpProPrinters).Where(function (x) { return x.LABEL_DESCRIPTION == itemType_1; }).ToArray();
                        if (!(drowPrnterDet.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.showModalPopup(drowPrnterDet)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                    case 2:
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Printer Not Configured for the Functionality " + itemType_1 });
                        _b.label = 3;
                    case 3: return [3 /*break*/, 9];
                    case 4:
                        if (!(this.gStrDefPrinter != "")) return [3 /*break*/, 8];
                        drowPrnterDet = linq_es5_1.asEnumerable(this.lstSetUpProPrinters).Where(function (x) { return x.FRIENDLY_NAME == _this.gStrDefPrinter; }).ToArray();
                        if (!(drowPrnterDet.length > 0)) return [3 /*break*/, 7];
                        if (!(drowPrnterDet[0].LABEL_DESCRIPTION == itemType_1)) return [3 /*break*/, 6];
                        blnlblPrinted = true;
                        _a = this;
                        return [4 /*yield*/, this.printReceiveItemLabel(intNoOfBoxses, this.lstSetUpProPrinters, this.gStrDefPrinter)];
                    case 5:
                        _a.statusCode = _b.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.statusMsgs.push({
                                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Failed to Print Non Stock Label  "
                            });
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Printer Not Configured for the Functionality " + itemType_1 });
                        _b.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please setup Default Printer settings for the labels." });
                        _b.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Items data to Print" });
                        _b.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Configure Label Printers before Printing" });
                        _b.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Configure Label Printers before Printing  " });
                        _b.label = 15;
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        ex_8 = _b.sent();
                        this.clientErrorMsg(ex_8, "btnPrntDet_Click");
                        return [3 /*break*/, 17];
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnDetailPrint_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var printerName, labeldesc, statusCode, intNoOfBoxses, i, _a, _b, _c, _d, ex_9;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 12, , 13]);
                        this.statusMsgs = [];
                        this.spnrService.start();
                        printerName = "";
                        labeldesc = "";
                        statusCode = "";
                        intNoOfBoxses = 0;
                        if (this.txtPkgs != "" && this.txtPkgs != undefined) {
                            intNoOfBoxses = parseInt(this.txtPkgs);
                        }
                        else {
                            intNoOfBoxses = 1;
                        }
                        i = 0;
                        _e.label = 1;
                    case 1:
                        if (!(i < this.lstPrintersDetails.length)) return [3 /*break*/, 11];
                        printerName = this.lstPrintersDetails[i].FRIENDLY_NAME;
                        labeldesc = this.lstPrintersDetails[i].LABEL_DESCRIPTION;
                        if (!(labeldesc == "NonStock PO Header")) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, this.print_NonStockLabel(intNoOfBoxses, this.lstPrintersDetails, this.gStrDefPrinter)];
                    case 2:
                        _a.statusCode = _e.sent();
                        return [3 /*break*/, 10];
                    case 3:
                        if (!(labeldesc == "Stock PO Header")) return [3 /*break*/, 5];
                        _b = this;
                        return [4 /*yield*/, this.print_StockLabel(intNoOfBoxses, this.lstPrintersDetails, printerName)];
                    case 4:
                        _b.statusCode = _e.sent();
                        return [3 /*break*/, 10];
                    case 5:
                        if (!(labeldesc == "Stock Item" || labeldesc == "NonStock Item")) return [3 /*break*/, 7];
                        _c = this;
                        return [4 /*yield*/, this.printReceiveItemLabel(intNoOfBoxses, this.lstPrintersDetails, printerName)];
                    case 6:
                        _c.statusCode = _e.sent();
                        return [3 /*break*/, 10];
                    case 7:
                        if (!(labeldesc == "NonPO")) return [3 /*break*/, 10];
                        _d = this;
                        return [4 /*yield*/, this.printNonPONiceLabel(intNoOfBoxses, this.lstPrintersDetails, printerName)];
                    case 8:
                        _d.statusCode = _e.sent();
                        if (!(this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK)) return [3 /*break*/, 10];
                        this.printtbl = false;
                        if (!(this.presentScreen == "NONPO")) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.getinitialvalues()];
                    case 9:
                        _e.sent();
                        this.nonPO = true;
                        _e.label = 10;
                    case 10:
                        i++;
                        return [3 /*break*/, 1];
                    case 11:
                        this.spnrService.stop();
                        return [3 /*break*/, 13];
                    case 12:
                        ex_9 = _e.sent();
                        this.clientErrorMsg(ex_9, "btnDetailPrint_Click");
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.grdRbPrinterChanged = function (printerRowData, event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "grdRbPrinterChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.grdRdbtnChanged = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var selectRow, rbtn, ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.statusMsgs = [];
                        this.statusCode = -1;
                        //  let parameterLst = this.lstRecvSendPoLines[0];
                        if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                            if (event == null) {
                                if (this.lstRecvSendPoLines.length == 1) {
                                    this.selecstedRow = this.lstRecvSendPoLines[0];
                                }
                                else {
                                    return [2 /*return*/];
                                }
                            }
                            else {
                                this.selecstedRow = this.lstRecvSendPoLines.filter(function (x) { return x.INV_ITEM_ID == event; })[0];
                            }
                        }
                        else if (this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0) {
                            if (event == null) {
                                if (this.lstRecvIutItems.length == 1) {
                                    this.selecstedRow = this.lstRecvIutItems[0];
                                }
                                else {
                                    return [2 /*return*/];
                                }
                            }
                            else {
                                selectRow = this.lstRecvIutItems.filter(function (x) { return x.ITEM_ID == event; });
                                if (selectRow != null && selectRow.length > 0) {
                                    this.selecstedRow = selectRow[0];
                                }
                            }
                        }
                        this.txtPkgs = "1";
                        rbtn = "";
                        if (this.schPO == false) {
                            rbtn = "ASP.mt_recv_po_or_nonpo_receipts_aspx";
                        }
                        else {
                            rbtn = "ASP.mt_recv_Schedule.aspx";
                        }
                        this.spnrService.start();
                        return [4 /*yield*/, this.poNonPo_RbtnChange(this.selecstedRow, false)];
                    case 1:
                        _a.sent();
                        this.spnrService.stop();
                        this.spnrService.start();
                        if (!(this.selecstedRow != null && this.selecstedRow != undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.updateDs(rbtn, this.selecstedRow)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        this.spnrService.stop();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_10 = _a.sent();
                        this.spnrService.stop();
                        this.clientErrorMsg(ex_10, "grdRdbtnChanged");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.grdDdlCarrier_Changed = function (nonporec, event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = [];
                    if (nonporec.RBFlAG) {
                        if (nonporec.CARRIER_ID == 'Select Carrier' || nonporec.CARRIER_ID == "") {
                            if (nonporec.PRVCARRIER_ID != null && nonporec.PRVCARRIER_ID != "") {
                                setTimeout(function () {
                                    nonporec.CARRIER_ID = nonporec.PRVCARRIER_ID;
                                    var itemtxtRecvQty = document.getElementById('txtRecvQty' + nonporec.INV_ITEM_ID);
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
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.iutGrdDdlCarrier_Changed = function (nonporec, event) {
        try {
            this.statusMsgs = [];
            if (nonporec.RBFlAG) {
                if (nonporec.CARRIER_ID == 'Select Carrier' || nonporec.CARRIER_ID == "") {
                    if (nonporec.PRVCARRIER_ID != null && nonporec.PRVCARRIER_ID != "") {
                        setTimeout(function () {
                            nonporec.CARRIER_ID = nonporec.PRVCARRIER_ID;
                            var itemtxtRecvQty = document.getElementById('txtRecvQty' + nonporec.ITEM_ID);
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
    };
    PoNonPoReceiptsComponent.prototype.schdGrdDdlCarrier_Changed = function (nonporec, event) {
        try {
            this.statusMsgs = [];
            if (nonporec.RBFlAG) {
                if (nonporec.CARRIER_ID == 'Select Carrier' || nonporec.CARRIER_ID == "") {
                    if (nonporec.PRVCARRIER_ID != null && nonporec.PRVCARRIER_ID != "") {
                        setTimeout(function () {
                            nonporec.CARRIER_ID = nonporec.PRVCARRIER_ID;
                            var itemtxtRecvQty = document.getElementById('txtRecvQty' + nonporec.INV_ITEM_ID);
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
    };
    PoNonPoReceiptsComponent.prototype.grdddlUOM_Changed = function (nonporec, event) {
        return __awaiter(this, void 0, void 0, function () {
            var uom;
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = [];
                    uom = "";
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
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnPoSearch_Click = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var bunit, reqShipToId, ship, frmDate, toDate, ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        this.breadCrumbMenu.SUB_MENU_NAME = 'PO Search';
                        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.statusMsgs = [];
                        bunit = "";
                        reqShipToId = this.hdnReqShiptoId;
                        ship = this.selectedShipToId;
                        if (this.selectedBUnits == "Select BusinessUnit" || this.selectedBUnits == "") {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        else {
                            bunit = this.selectedBUnits;
                        }
                        if (reqShipToId == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                            if (ship != null) {
                                if (this.selectedShipToId == "Select ShipToID") {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ShipTo ID is mandatory to download the PO" });
                                    return [2 /*return*/];
                                }
                            }
                            if (this.txtShipId != null && this.txtShipId != undefined) {
                                if (this.txtShipId == "") {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ShipTo ID is mandatory to download the PO" });
                                    return [2 /*return*/];
                                }
                            }
                        }
                        bunit = this.selectedBUnits;
                        frmDate = this.txtFrmDate;
                        toDate = this.txtToDate;
                        if (frmDate == "" || frmDate == null || frmDate == undefined) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select From date" });
                            return [2 /*return*/];
                        }
                        if (toDate == "" || toDate == null || toDate == undefined) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select To date" });
                            return [2 /*return*/];
                        }
                        if (!(this.hdnBunit == bunit && this.hdnPO == this.txtPONumber)) return [3 /*break*/, 1];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "This PO/IUT is in Download status" });
                        return [2 /*return*/];
                    case 1:
                        if (!(this.hdnBunit != "")) return [3 /*break*/, 3];
                        this.hdnPoSearch = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString();
                        return [4 /*yield*/, this.confirmData("posearch")];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.showPoSearchPopup()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11, "btnPoSearch_Click");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnIutSearch_Click = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var bunit, frmDate, toDate, ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        this.breadCrumbMenu.SUB_MENU_NAME = 'IUT Search';
                        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.statusMsgs = [];
                        bunit = "";
                        if (this.selectedBUnits == "Select BusinessUnit" || this.selectedBUnits == "") {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        else {
                            bunit = this.selectedBUnits;
                        }
                        bunit = this.selectedBUnits;
                        frmDate = this.txtFrmDate;
                        toDate = this.txtToDate;
                        if (frmDate == "" || frmDate == null || frmDate == undefined) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select From date" });
                            return [2 /*return*/];
                        }
                        if (toDate == "" || toDate == null || toDate == undefined) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select To date" });
                            return [2 /*return*/];
                        }
                        if (!(this.hdnBunit == bunit && this.hdnIUT == this.txtIUT)) return [3 /*break*/, 1];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "This PO/IUT is in Download status" });
                        return [2 /*return*/];
                    case 1:
                        if (!(this.hdnBunit != "")) return [3 /*break*/, 3];
                        this.hdnPoSearch = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString();
                        return [4 /*yield*/, this.confirmIUT("IUTsearch")];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.showIUTSearchPopup()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12, "btnIutSearch_Click");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.grdPoSearchRdbtnChanged = function (paramLst, event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
                    this.clientErrorMsg(ex, "grdPoSearchRdbtnChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnSearchPosGet_Click = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var searchLst, i, arrlstPOSearchEntity;
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = [];
                    this.arrlstPOSearch = [];
                    this.txtIUT = "";
                    searchLst = linq_es5_1.asEnumerable(this.lstSeachItems).Where(function (x) { return x.RBFlAG.toString() == "true"; }).ToArray();
                    if (searchLst != null && searchLst.length > 0) {
                        for (i = 0; i < searchLst.length; i++) {
                            arrlstPOSearchEntity = new vm_recv_searchheader_1.VM_RECV_SEARCHHEADER();
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
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Click the Go Back button to show the items grid." });
                        this.page = false;
                        this.tbl = false;
                        this.purchase = false;
                    }
                    else {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select the PO ID." });
                        return [2 /*return*/];
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "btnSearchPosGet_Click");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.searchPoBack = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.statusMsgs = [];
                        this.presentScreen = "PO";
                        this.breadCrumbMenu.SUB_MENU_NAME = '';
                        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        if (!(this.arrlstPOSearch != null && this.arrlstPOSearch.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.page_Load()];
                    case 1:
                        _a.sent();
                        this.recvSearchPos = false;
                        this.recvIUTSearch = false;
                        this.purchase = false;
                        this.page = true;
                        this.tbl = true;
                        this.blnGrdRecvPoItems = true;
                        this.blnGrdRecvIutItems = false;
                        this.grdRecvSearchPos = false;
                        return [3 /*break*/, 3];
                    case 2:
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
                        _a.label = 3;
                    case 3:
                        this.plus = true;
                        this.minus = false;
                        return [3 /*break*/, 5];
                    case 4:
                        ex_13 = _a.sent();
                        this.clientErrorMsg(ex_13, "searchPoBack");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.grdrecvIUTDataRdbtnChanged = function (paramLst, event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnSearchIUTGet_Click = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var searchLst, i, arrlstIUTSearchEntity;
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = [];
                    this.arrlstIUTSearch = [];
                    this.txtPONumber = "";
                    searchLst = linq_es5_1.asEnumerable(this.lstRecvSearchIuts).Where(function (x) { return x.RBFlAG.toString() == "true"; }).ToArray();
                    if (searchLst != null && searchLst.length > 0) {
                        for (i = 0; i < searchLst.length; i++) {
                            arrlstIUTSearchEntity = new VM_IUT_SEARCHHEADER_1.VM_IUT_SEARCHHEADER();
                            this.txtIUT = searchLst[i].INTERUNIT_ID;
                            arrlstIUTSearchEntity.DESTIN_BU = searchLst[i].DESTIN_BU;
                            arrlstIUTSearchEntity.INTERUNIT_ID = searchLst[i].INTERUNIT_ID;
                            arrlstIUTSearchEntity.ORIG_BU = searchLst[i].ORIG_BU;
                            arrlstIUTSearchEntity.SHIP_DTTM = searchLst[i].SHIP_DTTM;
                            arrlstIUTSearchEntity.RBFlAG = searchLst[i].RBFlAG;
                            this.arrlstIUTSearch.push(arrlstIUTSearchEntity);
                        }
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Close the popup to show the items grid." });
                        this.recvSearchPos = false;
                        this.page = false;
                        this.tbl = false;
                        this.purchase = false;
                    }
                    else {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select the PO ID." });
                        return [2 /*return*/];
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "btnSearchIUTGet_Click");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.iutSearchPoBack = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.statusMsgs = [];
                        this.presentScreen = "PO";
                        this.breadCrumbMenu.SUB_MENU_NAME = '';
                        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        if (!(this.arrlstIUTSearch != null && this.arrlstIUTSearch.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.page_Load()];
                    case 1:
                        _a.sent();
                        this.recvSearchPos = false;
                        this.recvIUTSearch = false;
                        this.purchase = false;
                        this.blnGrdRecvPoItems = false;
                        this.page = true;
                        this.tbl = true;
                        this.blnGrdRecvIutItems = true;
                        return [3 /*break*/, 3];
                    case 2:
                        this.recvSearchPos = false;
                        this.recvIUTSearch = false;
                        this.purchase = false;
                        this.page = true;
                        if (this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0) {
                            this.blnGrdRecvPoItems = false;
                            this.blnGrdRecvIutItems = true;
                            this.tbl = true;
                        }
                        _a.label = 3;
                    case 3:
                        this.plus = true;
                        this.minus = false;
                        return [3 /*break*/, 5];
                    case 4:
                        ex_14 = _a.sent();
                        this.clientErrorMsg(ex_14, "iutSearchPoBack");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnTxtSerchItemId_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var lstRecords, lstMainRecords, i, filterItem;
            return __generator(this, function (_a) {
                try {
                    lstRecords = [];
                    this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                    this.endIndex = +sessionStorage.getItem("RecordsEndindex");
                    lstMainRecords = [];
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
                        for (i = this.startIndex; i <= this.endIndex - 1; i++) {
                            lstRecords.push(lstMainRecords[i]);
                        }
                    }
                    if (this.txtSerchItemId != "" && lstRecords != null && lstRecords.length > 0) {
                        filterItem = lstRecords.filter(function (x) { return x.INV_ITEM_ID == _this.txtSerchItemId; });
                        if (filterItem != null && filterItem.length > 0) {
                            this.selecstedRow = filterItem[0];
                            this.selectedINVITEMID = this.selecstedRow.INV_ITEM_ID;
                            this.poNonPo_RbtnChange(this.selecstedRow, true);
                        }
                        else {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.txtSerchItemId + ": ItemId not found" });
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "btnTxtSerchItemId_Click");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnTxtPreSerchItemId_Click = function () {
        var _this = this;
        try {
            var lstRecords_1 = [];
            this.statusMsgs = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.endIndex = +sessionStorage.getItem("RecordsEndindex");
            var lstMainRecords = [];
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
                for (var i = this.startIndex; i <= this.endIndex - 1; i++) {
                    lstRecords_1.push(lstMainRecords[i]);
                }
            }
            if (this.selecstedRow != null && lstRecords_1 != null) {
                var index = lstRecords_1.indexOf(this.selecstedRow);
                if (index <= 0) {
                    this.confirmationService.confirm({
                        message: 'This is the first item, would you like to continue from the last item?',
                        accept: function () {
                            _this.selecstedRow = lstRecords_1[lstRecords_1.length - 1];
                            _this.selectedINVITEMID = _this.selecstedRow.INV_ITEM_ID;
                            _this.poNonPo_RbtnChange(_this.selecstedRow, true);
                        },
                        reject: function () {
                            return;
                        }
                    });
                }
                else {
                    this.selecstedRow = lstRecords_1[index - 1];
                    this.selectedINVITEMID = this.selecstedRow.INV_ITEM_ID;
                    this.poNonPo_RbtnChange(this.selecstedRow, true);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnTxtPreSerchItemId_Click");
        }
    };
    PoNonPoReceiptsComponent.prototype.btnTxtNextSerchItemId_Click = function () {
        var _this = this;
        try {
            var lstRecords_2 = [];
            this.statusMsgs = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.endIndex = +sessionStorage.getItem("RecordsEndindex");
            var lstMainRecords = [];
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
                for (var i = this.startIndex; i <= this.endIndex - 1; i++) {
                    lstRecords_2.push(lstMainRecords[i]);
                }
            }
            //This is the last item, would you like to continue from the first Item
            if (this.selecstedRow != null && lstRecords_2 != null) {
                var index = lstRecords_2.indexOf(this.selecstedRow);
                if (index == lstRecords_2.length - 1) {
                    this.statusMsgs = [];
                    this.confirmationService.confirm({
                        message: 'This is the last item, would you like to continue from the first Item?',
                        accept: function () {
                            _this.selecstedRow = lstRecords_2[0];
                            _this.selectedINVITEMID = _this.selecstedRow.INV_ITEM_ID;
                            _this.poNonPo_RbtnChange(_this.selecstedRow, true);
                        },
                        reject: function () {
                            return;
                        }
                    });
                }
                else {
                    this.selecstedRow = lstRecords_2[index + 1];
                    this.selectedINVITEMID = this.selecstedRow.INV_ITEM_ID;
                    this.poNonPo_RbtnChange(this.selecstedRow, true);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnTxtNextSerchItemId_Click");
        }
    };
    PoNonPoReceiptsComponent.prototype.searchAutoCompleteItems = function (event) {
        var query = event.query;
        this.lstFilterItems = this.filterNames(query, this.lstRecvSendPoLines);
    };
    PoNonPoReceiptsComponent.prototype.filterNames = function (query, itemNames) {
        this.statusMsgs = [];
        if (itemNames != null) {
            var filtered = [];
            if (query == "%") {
                for (var i = 0; i < itemNames.length; i++) {
                    var itemNamesvalue = itemNames[i];
                    filtered.push(itemNamesvalue.INV_ITEM_ID);
                }
            }
            else {
                if (query.length >= 1) {
                    for (var i = 0; i < itemNames.length; i++) {
                        var itemValue = itemNames[i];
                        if (itemValue.INV_ITEM_ID.toString().toUpperCase().indexOf(query.toString().toUpperCase()) == 0) {
                            filtered.push(itemValue.INV_ITEM_ID);
                        }
                    }
                }
            }
            return filtered;
        }
    };
    PoNonPoReceiptsComponent.prototype.asnGrdRdbtnChanged = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    //if (asnPoData != null) {asnPoData
                    //    this.gStrReceiverId = asnPoData.RECEIVERID;
                    //    this.selectedRecvId = asnPoData.RECEIVERID;
                    //}
                    if (event == null) {
                        if (this.lstAsnDetails.length == 1) {
                            this.gStrReceiverId = this.lstAsnDetails[0].RECEIVERID;
                            this.selectedRecvId = this.lstAsnDetails[0].RECEIVERID;
                        }
                        else {
                            return [2 /*return*/];
                        }
                        return [2 /*return*/];
                    }
                    else {
                        this.gStrReceiverId = event;
                        this.selectedRecvId = event;
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "asnGrdRdbtnChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnAsnGet_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lstcheckedrcds, ex_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.statusMsgs = [];
                        this.spnrService.start();
                        lstcheckedrcds = this.lstAsnDetails.filter(function (x) { return x.ASNRBFLAG == true; });
                        if (!(this.gStrReceiverId != null && this.gStrReceiverId != "")) return [3 /*break*/, 2];
                        this.gblnCancel = false;
                        this.tbl = false;
                        this.recvSearchPos = false;
                        this.recvIUTSearch = false;
                        return [4 /*yield*/, this.bindDataGrid()];
                    case 1:
                        _a.sent();
                        if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                            this.tbl = false;
                        }
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Success, Click the Go Back button to show the items grid." });
                        return [3 /*break*/, 3];
                    case 2:
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select a ReceiverID" });
                        _a.label = 3;
                    case 3:
                        this.spnrService.stop();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_15 = _a.sent();
                        this.spnrService.stop();
                        this.clientErrorMsg(ex_15, "btnAsnGet_Click");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnAsnCancel_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = [];
                    this.gblnCancel = true;
                    this.gStrReceiverId = "";
                    if (this.lstAsnDetails != null && this.lstAsnDetails.length > 0) {
                        for (i = 0; i < this.lstAsnDetails.length; i++) {
                            this.lstAsnDetails[i].ASNRBFLAG = false;
                        }
                    }
                    this.selectedRecvId = "";
                    this.lstRecvSendPoLines = [];
                    this.tbl = false;
                    this.selectedReceiverId = "";
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Request Cancelled, Click the Go Back button." });
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "btnAsnCancel_Click");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnAsnGetBack_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.includeAllPoLinesChkChanged = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = [];
                    if (event != null && event != undefined) {
                        this.chkIncludeAllPOLines = event;
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "includeAllPoLinesChkChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.getReceivePrerequisites = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var poplateFlg, ex_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.statusMsgs = [];
                        return [4 /*yield*/, this.recvPoNonPoService.getReceivePrerequisites().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spnrService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstBunits = res.json().DataDictionary.ALLOCATED_BUNITS;
                                        _this.lstShipToIds = res.json().DataDictionary.ALLOCATED_SHIPTOIDS;
                                        _this.lstOrgParms = res.json().DataDictionary.ORG_PARAMETERS;
                                        _this.lstProfileApp = res.json().DataDictionary.PROFILE_PARAMETERS;
                                        _this.lstUserApp = res.json().DataDictionary.USER_PARAMETERS;
                                        _this.lstScreenApp = res.json().DataDictionary.SCREEN_DISPLAY;
                                        _this.lstInventoryBunits = res.json().DataDictionary.ALLOCATED_IUT_BUNITS;
                                        _this.shipToIdCount = res.json().DataDictionary.DELV_ALLOC_SHIPTOIDS;
                                        _this.statusCode = data.StatusCode;
                                        _this.receItemColumns = _this.lstScreenApp.filter(function (x) { return x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == "RECEIVE ITEMS"; });
                                        _this.receItemColumns = linq_es5_1.asEnumerable(_this.receItemColumns).OrderBy(function (x) { return x.COLUMN_ORDER; }).ToArray();
                                        for (var x = 0; x < _this.receItemColumns.length; x++) {
                                            if (_this.receItemColumns[x].FIELD_NAME == 'INV_ITEM_ID' ||
                                                _this.receItemColumns[x].FIELD_NAME == 'DESCR' ||
                                                _this.receItemColumns[x].FIELD_NAME == 'RECEIVED_QTY' ||
                                                _this.receItemColumns[x].FIELD_NAME == 'INVENTORY_ITEM' ||
                                                _this.receItemColumns[x].FIELD_NAME == 'LOCATION' ||
                                                _this.receItemColumns[x].FIELD_NAME == 'SHIPTO_ID' ||
                                                _this.receItemColumns[x].FIELD_NAME == 'LINE_NBR' ||
                                                _this.receItemColumns[x].FIELD_NAME == 'UPC_ID' ||
                                                _this.receItemColumns[x].FIELD_NAME == 'MFG_ITEM_ID' ||
                                                _this.receItemColumns[x].FIELD_NAME == 'INSP_FLAG' ||
                                                _this.receItemColumns[x].FIELD_NAME == 'CUST_ITEM_NO' ||
                                                _this.receItemColumns[x].FIELD_NAME == 'GTIN' ||
                                                _this.receItemColumns[x].FIELD_NAME == 'LOT_CONTROLLED' ||
                                                _this.receItemColumns[x].FIELD_NAME == 'SERIAL_CONTROLLED' ||
                                                _this.receItemColumns[x].FIELD_NAME == 'EXT_TRK_NO') {
                                                _this.receItemColumns[x].ISFILTER = true;
                                            }
                                            else {
                                                _this.receItemColumns[x].ISFILTER = false;
                                            }
                                        }
                                        _this.receIutItemColumns = _this.lstScreenApp.filter(function (x) { return x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == "IUT ITEMS"; });
                                        _this.receIutItemColumns = linq_es5_1.asEnumerable(_this.receIutItemColumns).OrderBy(function (x) { return x.COLUMN_ORDER; }).ToArray();
                                        for (var x = 0; x < _this.receIutItemColumns.length; x++) {
                                            if (_this.receIutItemColumns[x].FIELD_NAME == 'ITEM_ID' ||
                                                _this.receIutItemColumns[x].FIELD_NAME == 'CUSTOM_ITEM_NO' ||
                                                _this.receIutItemColumns[x].FIELD_NAME == 'DESCRIPTION' ||
                                                _this.receIutItemColumns[x].FIELD_NAME == 'LOT_CONTROLLED' ||
                                                _this.receIutItemColumns[x].FIELD_NAME == 'SERIAL_CONTROLLED' ||
                                                _this.receIutItemColumns[x].FIELD_NAME == 'UPC_ID' ||
                                                _this.receIutItemColumns[x].FIELD_NAME == 'MFG_ITEM_ID' ||
                                                _this.receIutItemColumns[x].FIELD_NAME == 'CUSTOM_ITEM_NO' ||
                                                _this.receIutItemColumns[x].FIELD_NAME == 'VEND_ITEM_ID' ||
                                                _this.receIutItemColumns[x].FIELD_NAME == 'STOR_LOC') {
                                                _this.receIutItemColumns[x].ISFILTER = true;
                                            }
                                            else {
                                                _this.receIutItemColumns[x].ISFILTER = false;
                                            }
                                        }
                                        _this.receSchdlItemColumns = _this.lstScreenApp.filter(function (x) { return x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == "RECEIVE BY SCHEDULE"; });
                                        _this.receSchdlItemColumns = linq_es5_1.asEnumerable(_this.receSchdlItemColumns).OrderBy(function (x) { return x.COLUMN_ORDER; }).ToArray();
                                        for (var x = 0; x < _this.receSchdlItemColumns.length; x++) {
                                            if (_this.receSchdlItemColumns[x].FIELD_NAME == 'SCHED_NBR' ||
                                                _this.receSchdlItemColumns[x].FIELD_NAME == 'QTY_PO' ||
                                                _this.receSchdlItemColumns[x].FIELD_NAME == 'LOCATION' ||
                                                _this.receSchdlItemColumns[x].FIELD_NAME == 'TRACKING_ID' ||
                                                _this.receSchdlItemColumns[x].FIELD_NAME == 'EXT_TRK_NO' ||
                                                _this.receSchdlItemColumns[x].FIELD_NAME == 'RECEIVED_QTY' ||
                                                _this.receSchdlItemColumns[x].FIELD_NAME == 'SHIPTO_ID' ||
                                                _this.receSchdlItemColumns[x].FIELD_NAME == 'QTY_RECV_TOL_PCT' ||
                                                _this.receSchdlItemColumns[x].FIELD_NAME == 'LOC_DESCR') {
                                                _this.receSchdlItemColumns[x].ISFILTER = true;
                                            }
                                            else {
                                                _this.receSchdlItemColumns[x].ISFILTER = false;
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusCode = data.StatusCode;
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusCode = data.StatusCode;
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusCode = data.StatusCode;
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.populateBusinessUnitDrpdwn(this.lstBunits)];
                    case 2:
                        poplateFlg = _a.sent();
                        if (!poplateFlg) {
                            return [2 /*return*/, this.statusCode = -1];
                        }
                        return [4 /*yield*/, this.populateShipToIdsDrpdwn(this.lstShipToIds)];
                    case 3:
                        _a.sent();
                        if (this.lstScreenApp == null || this.lstScreenApp.length == 0) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please provide HHT access to Web profile" });
                            this.btnGetEnableDisable = true;
                            this.btnPoSearchEnableDisable = true;
                            this.btnIUTSearch = false;
                            this.btnNonPo = false;
                            this.statusCode = -1;
                            return [2 /*return*/, this.statusCode];
                        }
                        else {
                            this.btnGetEnableDisable = false;
                            this.btnPoSearchEnableDisable = false;
                        }
                        return [2 /*return*/, this.statusCode];
                    case 4:
                        ex_16 = _a.sent();
                        this.clientErrorMsg(ex_16, "getReceivePrerequisites");
                        return [2 /*return*/, this.statusCode];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.isShowColumn = function (screeFiled, dispFiled) {
        if (screeFiled == dispFiled) {
            return true;
        }
        else if (dispFiled == 'ALL') {
            if (this.recnonstaticFields.indexOf(screeFiled) == -1) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    PoNonPoReceiptsComponent.prototype.bindDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.txtSerchItemId = "";
                        this.selectedINVITEMID = "";
                        this.selectedDdlCarrier = "Select Carrier";
                        this.txtLading = "";
                        this.txtPkgs = "";
                        this.txtTrk = "";
                        this.plus = true;
                        this.minus = false;
                        if (!(this.txtIUT != null && this.txtIUT != "")) return [3 /*break*/, 2];
                        // IUT Get
                        return [4 /*yield*/, this.iutItemsBind()];
                    case 1:
                        // IUT Get
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: 
                    // Receive Get
                    return [4 /*yield*/, this.receivePoItemsBind()];
                    case 3:
                        // Receive Get
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_17 = _a.sent();
                        this.clientErrorMsg(ex_17, "bindDataGrid");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.deletePo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, ex_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        this.spnrService.start();
                        if (this.lstRecvPoItems != null) {
                            for (i = 0; i < this.lstRecvPoItems.length; i++) {
                                this.lstRecvPoItems[i].TRANS_ID = this.gTransactionID;
                            }
                        }
                        return [4 /*yield*/, this.recvPoNonPoService.deleteHeader(this.lstRecvPoItems).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.clearData();
                            this.hdnConfirmPoDelete = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                            this.hdnConfirmIUTDelete = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                            if (this.hdnPoSearch == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                this.hdnPoSearch = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                            }
                            else if (this.hdnIUTSearch == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                this.hdnIUTSearch = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                            }
                            else if (this.hdnConfirmNonPo == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                this.hdnConfirmNonPo = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                            }
                        }
                        else {
                            this.bindDataGrid();
                            this.populateCarrierDropDown(this.selectedDdlCarrier);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_18 = _a.sent();
                        this.clientErrorMsg(ex_18, "deletePo");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.deleteIUTOrder = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "deleteIUTOrder");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.populateCarrierDropDown = function (carrierId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusCode = -1;
                        this.ddlCarrier = [];
                        this.grdDdlCarrier = [];
                        this.ddlNonPOCarrier = [];
                        this.grdDdlCarrier.push({ label: "Select Carrier", value: "Select Carrier" });
                        this.ddlCarrier.push({ label: "Select Carrier", value: "Select Carrier" });
                        this.ddlNonPOCarrier.push({ label: "Select Carrier", value: "Select Carrier" });
                        return [4 /*yield*/, this.commonService.getCarriersData().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.lstCarriersData = data.DataList;
                                _this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.ddlCarrier = [];
                                        _this.grdDdlCarrier = [];
                                        _this.ddlNonPOCarrier = [];
                                        if (_this.lstCarriersData != null && _this.lstCarriersData.length > 0) {
                                            _this.grdDdlCarrier.push({ label: "Select Carrier", value: "Select Carrier" });
                                            _this.ddlCarrier.push({ label: "Select Carrier", value: "Select Carrier" });
                                            _this.ddlNonPOCarrier.push({ label: "Select Carrier", value: "Select Carrier" });
                                            if (_this.lstCarriersData.length > 0) {
                                                for (var i = 0; i <= _this.lstCarriersData.length - 1; i++) {
                                                    _this.ddlCarrier.push({ label: _this.lstCarriersData[i].CARRIER_ID, value: _this.lstCarriersData[i].CARRIER_ID });
                                                    _this.grdDdlCarrier.push({ label: _this.lstCarriersData[i].CARRIER_ID, value: _this.lstCarriersData[i].CARRIER_ID });
                                                    _this.ddlNonPOCarrier.push({ label: _this.lstCarriersData[i].CARRIER_ID, value: _this.lstCarriersData[i].CARRIER_ID });
                                                }
                                            }
                                        }
                                        if (_this.lstUserApp != null && _this.lstUserApp.length > 0) {
                                            _this.strDefaultCarrierID = linq_es5_1.asEnumerable(_this.lstUserApp).ToArray()[1].PARAMETER_VALUE;
                                            if (_this.strDefaultCarrierID != null && _this.strDefaultCarrierID != "") {
                                                var lstdefCarriers = _this.ddlCarrier.filter(function (x) { return x.value == _this.strDefaultCarrierID.toUpperCase(); });
                                                if (lstdefCarriers != null && lstdefCarriers.length > 0) {
                                                    _this.selectedDdlCarrier = _this.strDefaultCarrierID.toUpperCase();
                                                    _this.selectedSchdDdlCarrier = _this.strDefaultCarrierID.toUpperCase();
                                                }
                                                else {
                                                    _this.grdDdlCarrier.push({ label: _this.strDefaultCarrierID.toUpperCase(), value: _this.strDefaultCarrierID.toUpperCase() });
                                                    _this.ddlCarrier.push({ label: _this.strDefaultCarrierID.toUpperCase(), value: _this.strDefaultCarrierID.toUpperCase() });
                                                    _this.selectedDdlCarrier = _this.strDefaultCarrierID.toUpperCase();
                                                    _this.selectedSchdDdlCarrier = _this.strDefaultCarrierID.toUpperCase();
                                                }
                                                var carrierLst = _this.ddlNonPOCarrier.filter(function (x) { return x.value == _this.strDefaultCarrierID.toUpperCase(); });
                                                if (carrierLst != null && carrierLst.length == 0) {
                                                    _this.ddlNonPOCarrier.push({ label: _this.strDefaultCarrierID.toUpperCase(), value: _this.strDefaultCarrierID.toUpperCase() });
                                                }
                                                if (_this.poNewItem != null) {
                                                    _this.poNewItem.CARRIER_ID = _this.strDefaultCarrierID.toUpperCase();
                                                }
                                                if (_this.dtScheduleItems != null && _this.dtScheduleItems.length > 0) {
                                                    for (var i = 0; i < _this.dtScheduleItems.length; i++) {
                                                        _this.dtScheduleItems[i].CARRIER_ID = _this.strDefaultCarrierID.toUpperCase();
                                                    }
                                                }
                                            }
                                            _this.spnrService.stop();
                                            break;
                                        }
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_19 = _a.sent();
                        this.clientErrorMsg(ex_19, "populateCarrierDropDown");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.lotScheduleQty = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _loop_3, this_3, i, _loop_4, this_4, i, ex_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        this.statusMsgs = [];
                        this.statusCode = -1;
                        if (!(this.gblnLotSerialFlg == true)) return [3 /*break*/, 4];
                        if (!(this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0)) return [3 /*break*/, 1];
                        this.postbackGridBind(this.lstRecvIutItems, "IUT ITEMS");
                        return [3 /*break*/, 3];
                    case 1:
                        if (this.lstMainItemLotSerial != null) {
                            _loop_3 = function (i) {
                                var strItemId = this_3.lstRecvSendPoLines[i].INV_ITEM_ID;
                                var strLineNbr = this_3.lstRecvSendPoLines[i].LINE_NBR.toString();
                                var drLotQty = linq_es5_1.asEnumerable(this_3.lstMainItemLotSerial).Where(function (x) { return x.ITEM_ID == strItemId; }).ToArray();
                                if (drLotQty.length > 0) {
                                    var drLotEnableQty = linq_es5_1.asEnumerable(this_3.lstMainItemLotSerial).Where(function (x) { return x.ITEM_ID == strItemId && x.LINE_NBR == strLineNbr &&
                                        (x.SERIAL_ID != "" || x.LOT_ID != "") && x.DELETE_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString(); }).ToArray();
                                    if (drLotEnableQty.length > 0) {
                                        var intTolRecvQty = 0;
                                        for (var i_4 = 0; i_4 < drLotEnableQty.length; i_4++) {
                                            var strCon_Rate = (drLotEnableQty[i_4].CONVERSION_RATE == "" ? "1" : drLotEnableQty[i_4].CONVERSION_RATE);
                                            intTolRecvQty = intTolRecvQty + (parseInt(drLotEnableQty[i_4].QTY) * parseInt(strCon_Rate));
                                        }
                                        this_3.lstRecvSendPoLines[i].QTY = intTolRecvQty;
                                        //  this.lstRecvSendPoLines[i].LotSerial_Qty = intTolRecvQty;
                                        if (this_3.lstRecvSendPoLines[i].QTY != null) {
                                            this_3.lstRecvSendPoLines[i].RECEIVED_FLAG = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString();
                                        }
                                    }
                                    else {
                                        this_3.lstRecvSendPoLines[i].QTY = null;
                                        // this.lstRecvSendPoLines[i].LotSerial_Qty = "";
                                        this_3.lstRecvSendPoLines[i].RECEIVED_FLAG = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                                    }
                                }
                            };
                            this_3 = this;
                            for (i = 0; i < this.lstRecvSendPoLines.length; i++) {
                                _loop_3(i);
                            }
                        }
                        if (!(this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.postbackGridBind(this.lstRecvSendPoLines, "RECEIVE ITEMS")];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        this.gblnLotSerialFlg = false;
                        _a.label = 4;
                    case 4:
                        if (!(this.gblnScheduleFlg == true)) return [3 /*break*/, 8];
                        if (!(this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0)) return [3 /*break*/, 5];
                        this.postbackGridBind(this.lstRecvIutItems, "IUT ITEMS");
                        return [3 /*break*/, 7];
                    case 5:
                        if (!(this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0)) return [3 /*break*/, 7];
                        _loop_4 = function (i) {
                            var strItemId = this_4.lstRecvSendPoLines[i].INV_ITEM_ID;
                            var strLineNbr = this_4.lstRecvSendPoLines[i].LINE_NBR.toString();
                            var drSchd = linq_es5_1.asEnumerable(this_4.lstRecvSendPoLines).Where(function (x) { return x.INV_ITEM_ID == strItemId && x.LINE_NBR == parseInt(strLineNbr) &&
                                x.QTY != null && x.RECEIVED_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString(); }).ToArray();
                            if (drSchd.length > 0) {
                                var intTolRecvQty = 0;
                                var blnZeroRecQty = false;
                                for (var i_5 = 0; i_5 < drSchd.length; i_5++) {
                                    if (drSchd[i_5].QTY != null) {
                                        var strCon_Rate = (drSchd[i_5].CONVERSION_RATE == null ? 1 : drSchd[i_5].CONVERSION_RATE);
                                        intTolRecvQty = intTolRecvQty + ((drSchd[i_5].QTY) * (strCon_Rate));
                                    }
                                    if (drSchd[i_5].QTY == 0) {
                                        blnZeroRecQty = true;
                                    }
                                    this_4.lstRecvSendPoLines[i_5].CARRIER_ID = drSchd[i_5].CARRIER_ID;
                                }
                                if (blnZeroRecQty == false) {
                                    this_4.lstRecvSendPoLines[i].QTY = (intTolRecvQty == 0.0 ? null : intTolRecvQty);
                                    if (this_4.lstRecvSendPoLines[i].QTY != null) {
                                        this_4.lstRecvSendPoLines[i].RECEIVED_FLAG = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString();
                                    }
                                }
                                else {
                                    this_4.lstRecvSendPoLines[i].QTY = intTolRecvQty;
                                    if (intTolRecvQty >= 0) {
                                        this_4.lstRecvSendPoLines[i].RECEIVED_FLAG = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString();
                                    }
                                }
                            }
                            else {
                                this_4.lstRecvSendPoLines[i].QTY = null;
                            }
                        };
                        this_4 = this;
                        for (i = 0; i < this.lstRecvSendPoLines.length; i++) {
                            _loop_4(i);
                        }
                        if (!(this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.postbackGridBind(this.lstRecvSendPoLines, "RECEIVE ITEMS")];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        this.gblnScheduleFlg = false;
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        ex_20 = _a.sent();
                        this.clientErrorMsg(ex_20, "lotScheduleQty");
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.populateBusinessUnitDrpdwn = function (bUnitsLst) {
        return __awaiter(this, void 0, void 0, function () {
            var populateBunits, i, strDefaultBUnit;
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = [];
                    populateBunits = false;
                    this.ddlBusinessUnits = [];
                    this.ddlBusinessUnits.push({ label: "Select BusinessUnit", value: "Select BusinessUnit" });
                    if ((bUnitsLst != null)) {
                        if (bUnitsLst.length > 0) {
                            for (i = 0; i < bUnitsLst.length; i++) {
                                this.ddlBusinessUnits.push({ label: bUnitsLst[i], value: bUnitsLst[i] }); //BUSINESS_UNIT
                            }
                        }
                        else {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Assigned Org Business Units" });
                            return [2 /*return*/, populateBunits = false];
                        }
                        if (this.lstUserApp != null && this.lstUserApp.length > 0) {
                            strDefaultBUnit = linq_es5_1.asEnumerable(this.lstUserApp).ToArray()[0].PARAMETER_VALUE;
                            if (strDefaultBUnit != "") {
                                this.selectedBUnits = strDefaultBUnit;
                            }
                        }
                    }
                    return [2 /*return*/, populateBunits = true];
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "populateBusinessUnitDrpdwn");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.populateShipToIdsDrpdwn = function (shipToIds) {
        return __awaiter(this, void 0, void 0, function () {
            var i, strDefaultShipToID, nonPoStrDefaultShipToID, dr, dr;
            return __generator(this, function (_a) {
                try {
                    this.ddlShipToId = [];
                    this.ddlShipToId.push({ label: "Select ShipToID", value: "Select ShipToID" });
                    if (shipToIds != null) {
                        if (shipToIds.length >= 1) {
                            for (i = 0; i < shipToIds.length; i++) {
                                this.ddlShipToId.push({ label: shipToIds[i].SHIPTO_ID, value: shipToIds[i].SHIPTO_ID });
                            }
                        }
                        else {
                            this.blnShipToId = false;
                        }
                        strDefaultShipToID = "";
                        nonPoStrDefaultShipToID = "";
                        if (this.lstUserApp != null && this.lstUserApp.length > 0) {
                            strDefaultShipToID = linq_es5_1.asEnumerable(this.lstUserApp).ToArray()[0].PARAMETER_VALUE;
                            nonPoStrDefaultShipToID = linq_es5_1.asEnumerable(this.lstUserApp).ToArray()[3].PARAMETER_VALUE;
                            //Default Ship To Id value 
                            if (this.blnShipToId == true) {
                                dr = linq_es5_1.asEnumerable(this.lstUserApp).Where(function (x) { return x.PARAMETER_ID == "DEFAULT_SHIPTO_ID"; }).ToArray();
                                if (dr.length > 0) {
                                    strDefaultShipToID = dr[0].PARAMETER_VALUE;
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
                                dr = linq_es5_1.asEnumerable(this.lstUserApp).Where(function (x) { return x.PARAMETER_ID == "DEFAULT_SHIPTO_ID"; }).ToArray();
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
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.iutItemsBind = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var strPrevInterUnitLineNo, intLineNo, invBunits, recvIUTGetPosEntity, drHeader, recvIutItemEntity, i, strInterUnitLineNo, ex_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        this.statusMsgs = [];
                        this.statusCode = -1;
                        strPrevInterUnitLineNo = "";
                        intLineNo = 0;
                        this.lstRecvIutItems = [];
                        invBunits = 0;
                        if (this.lstInventoryBunits != null && this.lstInventoryBunits.length > 0) {
                            invBunits = this.lstInventoryBunits.filter(function (x) { return x == _this.selectedBUnits; }).length;
                            //invBunits = asEnumerable(this.lstInventoryBunits).Where(x => x.BUSINESS_UNIT == this.selectedBUnits).ToArray();
                        }
                        if (invBunits == null || invBunits == 0) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Business Unit is not allocated to the user" });
                            return [2 /*return*/];
                        }
                        this.lstRecvIUTGetPo = new Array();
                        recvIUTGetPosEntity = void 0;
                        recvIUTGetPosEntity = new vm_recv_iutgetpos_1.VM_RECV_IUTGETPOS();
                        if (this.arrlstIUTSearch != null && this.arrlstIUTSearch.length > 0) {
                            recvIUTGetPosEntity.CANCEL_TRANSID = "";
                            recvIUTGetPosEntity.BUSINESS_UNIT = this.arrlstIUTSearch[0].DESTIN_BU;
                            recvIUTGetPosEntity.IUT_ORDERNO = this.arrlstIUTSearch[0].INTERUNIT_ID;
                            recvIUTGetPosEntity.PRODUCT = AtParEnums_1.EnumApps.Receiving;
                            this.txtIUT = this.arrlstIUTSearch[0].INTERUNIT_ID;
                            this.txtPONumber = "";
                            this.arrlstIUTSearch = null;
                        }
                        else {
                            recvIUTGetPosEntity.CANCEL_TRANSID = "";
                            recvIUTGetPosEntity.BUSINESS_UNIT = this.selectedBUnits == "Select BusinessUnit" ? "" : this.selectedBUnits;
                            recvIUTGetPosEntity.IUT_ORDERNO = this.txtIUT.toUpperCase().replace("'", "''");
                            recvIUTGetPosEntity.PRODUCT = AtParEnums_1.EnumApps.Receiving;
                        }
                        this.lstRecvIUTGetPo.push(recvIUTGetPosEntity);
                        this.spnrService.start();
                        return [4 /*yield*/, this.recvPoNonPoService.getIUTDetails(this.lstRecvIUTGetPo).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.lstRecvIutPoItems = data.DataList;
                                _this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        if (!(this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK)) return [3 /*break*/, 5];
                        drHeader = linq_es5_1.asEnumerable(this.lstScreenApp).Where(function (a) { return a.SCREEN_NAME == "IUT ITEMS"; }).ToArray();
                        this.gIUTTransactionID = "";
                        if (!(this.lstRecvIutPoItems != null && this.lstRecvIutPoItems.length > 0)) return [3 /*break*/, 4];
                        this.gIUTTransactionID = this.lstRecvIutPoItems[0].TRANSACTION_ID;
                        recvIutItemEntity = void 0;
                        for (i = 0; i < this.lstRecvIutPoItems.length; i++) {
                            strInterUnitLineNo = this.lstRecvIutPoItems[i].INTERUNIT_LINE;
                            if (strInterUnitLineNo == strPrevInterUnitLineNo) {
                                intLineNo += 1;
                            }
                            else {
                                intLineNo = 1;
                            }
                            strPrevInterUnitLineNo = strInterUnitLineNo;
                            recvIutItemEntity = new vm_recv_iut_items_1.VM_RECV_IUT_ITEMS();
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
                        if (!(this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.grdReceiveItems_RowDataBound(this.lstRecvIutItems)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.postbackGridBind(this.lstRecvIutItems, "IUT ITEMS")];
                    case 3:
                        _a.sent();
                        this.blnGrdRecvPoItems = false;
                        this.blnGrdRecvIutItems = true;
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_IUT_LOCKEDBYOTHERUSER) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "This IUT order is locked by another user" });
                            return [2 /*return*/];
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Records were returned" });
                            this.tbl = false;
                            return [2 /*return*/];
                        }
                        else if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Internal Server Error" });
                            return [2 /*return*/];
                        }
                        _a.label = 6;
                    case 6:
                        this.spnrService.stop();
                        return [3 /*break*/, 8];
                    case 7:
                        ex_21 = _a.sent();
                        this.clientErrorMsg(ex_21, "iutItemsBind");
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.receivePoItemsBind = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var selectedInVoiceNo, selectedPakSlipNo, recvPoItemsEntity, ex_22, drHeader, i, previtem, prevLine, _loop_5, this_5, i, ex_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 13, , 14]);
                        this.statusMsgs = [];
                        this.statusCode = -1;
                        selectedInVoiceNo = "";
                        selectedPakSlipNo = "";
                        this.lstRecvPoItems = new Array();
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
                        recvPoItemsEntity = void 0;
                        recvPoItemsEntity = new vm_recv_poheader_1.VM_RECV_POHEADER();
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
                        return [4 /*yield*/, this.recvPoNonPoService.getHeader(this.lstRecvPoItems).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                if (data.DataDictionary != null) {
                                    if (data.DataDictionary['lstReceiverIds'] != null && data.DataDictionary['lstReceiverIds'].length > 0) {
                                        _this.lstAsnDetails = data.DataDictionary['lstReceiverIds'];
                                    }
                                }
                                _this.statusMsgs = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataDictionary != null) {
                                            _this.lstRecvSendPoHdrs = data.DataDictionary['listHeaders'];
                                            _this.lstGridRecvSendPoLines = data.DataDictionary['listLines'];
                                            _this.lstRecvAltUomData = data.DataDictionary['lstAltUOM'];
                                            if (data.DataDictionary['lstReceiverIds'] != null && data.DataDictionary['lstReceiverIds'].length > 0) {
                                                _this.lstAsnDetails = data.DataDictionary['lstReceiverIds'];
                                            }
                                            if (data.DataDictionary['lstRecallItems'] != null && data.DataDictionary['lstRecallItems'].length > 0) {
                                                _this.lstReCallInfo = data.DataDictionary['lstRecallItems'];
                                            }
                                        }
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        // this.spnrService.start();
                        _a.sent();
                        this.spnrService.stop();
                        if (!(this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK)) return [3 /*break*/, 9];
                        if (!(this.statusCode == AtParStatusCodes_1.AtparStatusCodes.RECV_S_MULTIPLERECEIVERSEXISTS)) return [3 /*break*/, 8];
                        if (!(this.gStrReceiverId == "" || this.gStrReceiverId == undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.asnPopupshow()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        if (!this.gblnCancel) return [3 /*break*/, 4];
                        this.gblnCancel = false;
                        return [2 /*return*/];
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        //Updating values to Input Dataset
                        this.lstRecvPoItems[0].PACKSLIP_SEL_INVOICE_NO = selectedInVoiceNo;
                        this.lstRecvPoItems[0].SELECTED_PAK_SLIP_NO = selectedPakSlipNo;
                        this.lstRecvPoItems[0].RECEIVER_ID = this.gStrReceiverId;
                        // strReceiverId = "";
                        this.statusCode = AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK;
                        // this.spnrService.start();
                        return [4 /*yield*/, this.recvPoNonPoService.getHeader(this.lstRecvPoItems).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                if (data.DataDictionary != null) {
                                    if (data.DataDictionary['lstReceiverIds'] != null && data.DataDictionary['lstReceiverIds'].length > 0) {
                                        _this.lstAsnDetails = data.DataDictionary['lstReceiverIds'];
                                    }
                                }
                                _this.statusCode = data.StatusCode;
                                _this.statusMsgs = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataDictionary != null) {
                                            _this.lstRecvSendPoHdrs = data.DataDictionary['listHeaders'];
                                            _this.lstGridRecvSendPoLines = data.DataDictionary['listLines'];
                                            _this.lstRecvAltUomData = data.DataDictionary['lstAltUOM'];
                                            if (data.DataDictionary['lstReceiverIds'] != null && data.DataDictionary['lstReceiverIds'].length > 0) {
                                                _this.lstAsnDetails = data.DataDictionary['lstReceiverIds'];
                                            }
                                            if (data.DataDictionary['lstRecallItems'] != null && data.DataDictionary['lstRecallItems'].length > 0) {
                                                _this.lstReCallInfo = data.DataDictionary['lstRecallItems'];
                                            }
                                        }
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 5:
                        // this.spnrService.start();
                        _a.sent();
                        this.spnrService.stop();
                        this.gStrReceiverId = "";
                        return [3 /*break*/, 7];
                    case 6:
                        ex_22 = _a.sent();
                        this.clientErrorMsg(ex_22, "receivePoItemsBind");
                        return [3 /*break*/, 7];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.RECV_E_LOCKEDBYOTHERUSER) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "This PO is locked by another user" });
                            this.spnrService.stop();
                            return [2 /*return*/];
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.RECV_S_RECEIPTNOTFOUND) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Receipt not found for given Invoice / Packing Slip" });
                            this.spnrService.stop();
                            return [2 /*return*/];
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.RECV_S_NO_POUOM_CONVERSIONRATE) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "The PO you are trying to get does not have conversion rate" });
                            this.spnrService.stop();
                            return [2 /*return*/];
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.RECV_S_INVALIDPOID) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({
                                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Multiple POs found for the given PO ID, please provide complete PO ID to download the PO"
                            });
                            this.spnrService.stop();
                            return [2 /*return*/];
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No records were returned" });
                            this.tbl = false;
                            this.spnrService.stop();
                            return [2 /*return*/];
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Assigned Org Business Units" });
                            this.spnrService.stop();
                            return [2 /*return*/];
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_INVALIDTOKEN) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Invalid Token, The login user token is expired, login again to get a valid token" });
                            this.spnrService.stop();
                            return [2 /*return*/];
                        }
                        else if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "General Server Error" });
                            this.spnrService.stop();
                            return [2 /*return*/];
                        }
                        _a.label = 9;
                    case 9:
                        drHeader = linq_es5_1.asEnumerable(this.lstScreenApp).Where(function (a) { return a.SCREEN_NAME == "RECEIVE ITEMS"; }).ToArray();
                        if (this.lstRecvSendPoHdrs != null) {
                            for (i = 0; i < this.lstRecvSendPoHdrs.length; i++) {
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
                                            }
                                            else {
                                                this.lblHdrCommentsToolTip = "";
                                            }
                                        }
                                        if (this.gDisplayComments == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
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
                                previtem = "";
                                prevLine = "";
                                if (this.lstGridRecvSendPoLines != null && this.lstGridRecvSendPoLines.length > 0) {
                                    _loop_5 = function (i) {
                                        if (previtem == this_5.lstGridRecvSendPoLines[i].INV_ITEM_ID && prevLine == this_5.lstGridRecvSendPoLines[i].LINE_NBR) {
                                            previtem = this_5.lstGridRecvSendPoLines[i].INV_ITEM_ID;
                                            prevLine = this_5.lstGridRecvSendPoLines[i].LINE_NBR;
                                        }
                                        else {
                                            previtem = this_5.lstGridRecvSendPoLines[i].INV_ITEM_ID;
                                            prevLine = this_5.lstGridRecvSendPoLines[i].LINE_NBR;
                                            var recvLines = linq_es5_1.asEnumerable(this_5.lstGridRecvSendPoLines).Where(function (x) { return x.INV_ITEM_ID == _this.lstGridRecvSendPoLines[i].INV_ITEM_ID && x.LINE_NBR == _this.lstGridRecvSendPoLines[i].LINE_NBR; }).ToArray();
                                            var dblLinePOQty = 0;
                                            var intSchedCount = 1;
                                            if (recvLines.length > 1) {
                                                for (var j = 0; j < recvLines.length; j++) {
                                                    dblLinePOQty += recvLines[j].QTY_PO;
                                                    intSchedCount += 1;
                                                }
                                                this_5.lstRecvSendPoLines.push({
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
                                                this_5.blnScheduleItems = true;
                                            }
                                            else {
                                                recvLines[recvLines.length - 1].TRACKING_ID = "";
                                                recvLines[recvLines.length - 1].RBFlAG = false;
                                                recvLines[recvLines.length - 1].SCHDFLAG = false;
                                                recvLines[recvLines.length - 1].DDLUOMFLAG = false;
                                                recvLines[recvLines.length - 1].TXTQTYFLAG = false;
                                                this_5.lstRecvSendPoLines.push(recvLines[recvLines.length - 1]);
                                            }
                                        }
                                    };
                                    this_5 = this;
                                    for (i = 0; i < this.lstGridRecvSendPoLines.length; i++) {
                                        _loop_5(i);
                                    }
                                }
                            }
                        }
                        if (!(this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0)) return [3 /*break*/, 12];
                        this.lstRecvSendPoLines = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).OrderBy(function (x) { return x.LINE_NBR; }).ToArray();
                        this.spnrService.start();
                        return [4 /*yield*/, this.grdReceiveItems_RowDataBound(this.lstRecvSendPoLines)];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, this.postbackGridBind(this.lstRecvSendPoLines, "RECEIVE ITEMS")];
                    case 11:
                        _a.sent();
                        this.blnGrdRecvIutItems = false;
                        this.blnGrdRecvPoItems = true;
                        this.plus = true;
                        this.minus = false;
                        this.spnrService.stop();
                        _a.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        ex_23 = _a.sent();
                        this.spnrService.stop();
                        this.clientErrorMsg(ex_23, "receivePoItemsBind");
                        return [3 /*break*/, 14];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.grdReceiveItems_RowDataBound = function (recvDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var intConverfactor, strUOM, _loop_6, this_6, i, lnkItemId, dtIUTDetails, i, strSerialControlled, i, strLot, strSerial, schedNbr, txtQty, txtLadg, txttrkno, txtnoofboxes, lnkItemId, ex_24;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 12, , 13]);
                        this.statusMsgs = [];
                        intConverfactor = 0;
                        strUOM = "";
                        return [4 /*yield*/, this.populateCarrierDropDown(this.selectedDdlCarrier)];
                    case 1:
                        _a.sent();
                        if (this.gStrDisplayReceivedQty == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString()) {
                        }
                        if (!(this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0)) return [3 /*break*/, 6];
                        if (!(recvDetails != null && recvDetails.length > 0)) return [3 /*break*/, 5];
                        _loop_6 = function (i) {
                            var strLot, strSerial, schedNbr, txtQty, txtLadg, txttrkno, txtnoofboxes, lnkItemId, schedCount, strRecallFlag, dtRecallInfo, dr;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        strLot = recvDetails[i].LOT_CONTROLLED;
                                        strSerial = recvDetails[i].SERIAL_CONTROLLED;
                                        schedNbr = recvDetails[i].SCHED_NBR;
                                        txtQty = recvDetails[i].QTY;
                                        txtLadg = recvDetails[i].BILL_OF_LADING;
                                        txttrkno = recvDetails[i].EXT_TRK_NO;
                                        txtnoofboxes = recvDetails[i].NO_OF_BOXES;
                                        lnkItemId = recvDetails[i].INV_ITEM_ID;
                                        if (recvDetails[i].CONVERSION_RATE != null) {
                                            intConverfactor = parseInt(recvDetails[i].CONVERSION_RATE.toString());
                                        }
                                        if (recvDetails[i].DESCR != null && recvDetails[i].DESCR.length > 30) {
                                            recvDetails[i].DESCR_TOOLTIP = recvDetails[i].DESCR;
                                            recvDetails[i].DESCR = recvDetails[i].DESCR.slice(0, 30) + "..";
                                        }
                                        strUOM = recvDetails[i].UNIT_OF_MEASURE;
                                        return [4 /*yield*/, this_6.populateUOM(intConverfactor, strUOM, recvDetails[i].LINE_NBR.toString(), strSerial, strLot, recvDetails[i])];
                                    case 1:
                                        _a.sent();
                                        if (recvDetails[i].CARRIER_ID != null && recvDetails[i].CARRIER_ID != "") {
                                        }
                                        schedCount = recvDetails[i].SCHED_COUNT.toString();
                                        if (schedCount == "1") {
                                            this_6.blnlnkItemIdEnable = false;
                                            this_6.blnlnkLineNbrEnable = false;
                                            if ((strLot == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || strSerial == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) &&
                                                this_6.gStrLotSerial == AtParEnums_1.Enable_Lot_Serial_Tracking[AtParEnums_1.Enable_Lot_Serial_Tracking.MMIS].toString()) {
                                                recvDetails[i].TXTQTYFLAG = true;
                                                recvDetails[i].DDLUOMFLAG = true;
                                                this_6.recvGrdCarrierEnable = true;
                                            }
                                            else {
                                                recvDetails[i].TXTQTYFLAG = false;
                                            }
                                        }
                                        else {
                                            if (parseInt(schedCount) > 1) {
                                                if (this_6.gblnASNPO && (this_6.gblnScheduleFlg == false)) {
                                                    recvDetails[i].QTY = "";
                                                }
                                            }
                                        }
                                        strRecallFlag = recvDetails[i].RECAL_FLAG;
                                        if (strRecallFlag == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                            dtRecallInfo = this_6.lstReCallInfo;
                                            if (dtRecallInfo != null && dtRecallInfo.length > 0) {
                                                dr = dtRecallInfo.filter(function (x) { return x.ITEM_ID == lnkItemId && (x.LOT_NO == "" || x.LOT_NO == null) && (x.SERIAL_NO == "" || x.SERIAL_NO == null); });
                                                if (dr != null && dr.length > 0) {
                                                    recvDetails[i].TXTQTYFLAG = true;
                                                }
                                            }
                                        }
                                        if (this_6.strDefaultCarrierID != null && this_6.strDefaultCarrierID != "" && this_6.strDefaultCarrierID != undefined) {
                                            if (recvDetails[i].SCHED_COUNT != null && recvDetails[i].SCHED_COUNT != undefined && recvDetails[i].SCHED_COUNT <= 1) {
                                                recvDetails[i].CARRIER_ID = this_6.strDefaultCarrierID.toUpperCase();
                                            }
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_6 = this;
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < recvDetails.length)) return [3 /*break*/, 5];
                        return [5 /*yield**/, _loop_6(i)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 11];
                    case 6:
                        if (!(this.lstRecvIutItems != null)) return [3 /*break*/, 7];
                        if (recvDetails != null && recvDetails.length > 0) {
                            lnkItemId = recvDetails.ITEM_ID;
                            this.blnlnkItemIdEnable = false;
                            this.blnlnkLineNbrEnable = false;
                            dtIUTDetails = this.lstRecvIutItems;
                            for (i = 0; i < recvDetails.length; i++) {
                                strSerialControlled = recvDetails[i].SERIAL_CONTROLLED;
                                if (strSerialControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                    this.txtQty = "1";
                                    recvDetails[i].TXTQTYFLAG = true;
                                }
                                else {
                                    recvDetails[i].TXTQTYFLAG = false;
                                }
                            }
                        }
                        return [3 /*break*/, 11];
                    case 7:
                        if (!(this.dtScheduleItems != null && this.dtScheduleItems.length > 0 && this.dtScheduleItems != undefined)) return [3 /*break*/, 11];
                        if (!(recvDetails != null && recvDetails.length > 0)) return [3 /*break*/, 11];
                        i = 0;
                        _a.label = 8;
                    case 8:
                        if (!(i < recvDetails.length)) return [3 /*break*/, 11];
                        strLot = recvDetails[i].LOT_CONTROLLED;
                        strSerial = recvDetails[i].SERIAL_CONTROLLED;
                        schedNbr = recvDetails[i].SCHED_NBR;
                        txtQty = recvDetails[i].QTY;
                        txtLadg = recvDetails[i].BILL_OF_LADING;
                        txttrkno = recvDetails[i].EXT_TRK_NO;
                        txtnoofboxes = recvDetails[i].NO_OF_BOXES;
                        lnkItemId = recvDetails[i].INV_ITEM_ID;
                        if (recvDetails[i].CONVERSION_RATE != null) {
                            intConverfactor = parseInt(recvDetails[i].CONVERSION_RATE.toString());
                        }
                        strUOM = recvDetails[i].UNIT_OF_MEASURE;
                        return [4 /*yield*/, this.populateUOM(intConverfactor, strUOM, recvDetails[i].LINE_NBR.toString(), strSerial, strLot, recvDetails[i])];
                    case 9:
                        _a.sent();
                        if (this.gStrDisplayReceivedQty == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString()) {
                            //if (recvDetails[i].QTY != null) {
                            //    recvDetails[i].QTY = null;
                            //}
                        }
                        if (this.gStrLotSerial != AtParEnums_1.Enable_Lot_Serial_Tracking[AtParEnums_1.Enable_Lot_Serial_Tracking.None].toString()) {
                            if (this.gStrLotSerial == AtParEnums_1.Enable_Lot_Serial_Tracking[AtParEnums_1.Enable_Lot_Serial_Tracking.MMIS].toString()) {
                                if ((strLot == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || strSerial == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString())) {
                                    recvDetails[i].TXTQTYFLAG = true;
                                    recvDetails[i].DDLUOMFLAG = true;
                                    this.recvGrdCarrierEnable = true;
                                    //txtQty.Enabled = False
                                    //ddlUOM.Enabled = False
                                }
                                else {
                                    recvDetails[i].TXTQTYFLAG = false;
                                }
                            }
                            else if (this.gStrLotSerial == AtParEnums_1.Enable_Lot_Serial_Tracking[AtParEnums_1.Enable_Lot_Serial_Tracking.AtPar].toString()) {
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
                        _a.label = 10;
                    case 10:
                        i++;
                        return [3 /*break*/, 8];
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        ex_24 = _a.sent();
                        this.clientErrorMsg(ex_24, "grdReceiveItems_RowDataBound");
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.postbackGridBind = function (recvDetails, strScreen) {
        return __awaiter(this, void 0, void 0, function () {
            var mgfItem, noOfBoxes, price, packagingString, serialCon, lotCon, extTrk, recQty, trackId, GTIN, UPC, shipID;
            return __generator(this, function (_a) {
                try {
                    this.tbl = true;
                    if (strScreen == "IUT ITEMS") {
                        this.btnPntrHeaderDisable = true; //Enabled=false
                        this.btnPntrDetailsDisable = true; //Enabled=false
                    }
                    else {
                        this.btnPntrHeaderDisable = false; //Enabled=false
                        this.btnPntrDetailsDisable = true;
                    }
                    if (this.gStrLotSerial != "None" && strScreen != "IUT ITEMS") {
                        this.btnPntrLotSerialVisible = true;
                        this.btnLotSerialDisable = true; //Enabled = false;
                    }
                    else {
                        this.btnPntrLotSerialVisible = false;
                    }
                    mgfItem = this.lstScreenApp.filter(function (x) { return x.FIELD_NAME == 'MFG_ITEM_ID' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS'; });
                    if (mgfItem != null && mgfItem.length > 0) {
                        this.blnMgf = true;
                    }
                    else {
                        this.blnMgf = false;
                    }
                    noOfBoxes = this.lstScreenApp.filter(function (x) { return x.FIELD_NAME == 'NO_OF_BOXES' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS'; });
                    if (noOfBoxes != null && noOfBoxes.length > 0) {
                        this.blnNoofBoxes = true;
                    }
                    else {
                        this.blnNoofBoxes = false;
                    }
                    price = this.lstScreenApp.filter(function (x) { return x.FIELD_NAME == 'PRICE' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS'; });
                    if (price != null && price.length > 0) {
                        this.blnItemPrice = true;
                    }
                    else {
                        this.blnItemPrice = false;
                    }
                    packagingString = this.lstScreenApp.filter(function (x) { return x.FIELD_NAME == 'PACKAGING_STRING' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS'; });
                    if (packagingString != null && packagingString.length > 0) {
                        this.blnPackage = true;
                    }
                    else {
                        this.blnPackage = false;
                    }
                    serialCon = this.lstScreenApp.filter(function (x) { return x.FIELD_NAME == 'SERIAL_CONTROLLED' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS'; });
                    if (serialCon != null && serialCon.length > 0) {
                        this.blnSerial = true;
                    }
                    else {
                        this.blnSerial = false;
                    }
                    lotCon = this.lstScreenApp.filter(function (x) { return x.FIELD_NAME == 'LOT_CONTROLLED' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS'; });
                    if (lotCon != null && lotCon.length > 0) {
                        this.blnLot = true;
                    }
                    else {
                        this.blnLot = false;
                    }
                    extTrk = this.lstScreenApp.filter(function (x) { return x.FIELD_NAME == 'EXT_TRK_NO' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS'; });
                    if (extTrk != null && extTrk.length > 0) {
                        this.blnExtrkNo = true;
                    }
                    else {
                        this.blnExtrkNo = false;
                    }
                    recQty = this.lstScreenApp.filter(function (x) { return x.FIELD_NAME == 'RECEIVED_QTY' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS'; });
                    if (recQty != null && recQty.length > 0) {
                        this.blnRecQty = true;
                    }
                    else {
                        this.blnRecQty = false;
                    }
                    trackId = this.lstScreenApp.filter(function (x) { return x.FIELD_NAME == 'TRACKING_ID' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS'; });
                    if (trackId != null && trackId.length > 0) {
                        this.blnTrkNo = true;
                    }
                    else {
                        this.blnTrkNo = false;
                    }
                    GTIN = this.lstScreenApp.filter(function (x) { return x.FIELD_NAME == 'GTIN' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS'; });
                    if (GTIN != null && GTIN.length > 0) {
                        this.blnGTIN = true;
                    }
                    else {
                        this.blnGTIN = false;
                    }
                    UPC = this.lstScreenApp.filter(function (x) { return x.FIELD_NAME == 'UPC_ID' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS'; });
                    if (UPC != null && UPC.length > 0) {
                        this.blnUPC = true;
                    }
                    else {
                        this.blnUPC = false;
                    }
                    shipID = this.lstScreenApp.filter(function (x) { return x.FIELD_NAME == 'SHIPTO_ID' && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == 'RECEIVE ITEMS'; });
                    if (shipID != null && shipID.length > 0) {
                        this.blnShip = true;
                    }
                    else {
                        this.blnShip = false;
                    }
                    this.hdnNonPo = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "postbackGridBind");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.checkColumnExist = function (colname, screenName) {
        var count = this.lstScreenApp.filter(function (x) { return x.FIELD_NAME == colname && x.DISPLAY_FIELD == 'Y' && x.SCREEN_NAME == screenName; });
        if (count != null && count.length > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    PoNonPoReceiptsComponent.prototype.populateUOM = function (intConverfactor, strUOM, lineNbr, strSerialControlled, strLot, recvDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var drUOM, i, i, intAltConFact, strListUom, arrListUom, i;
            return __generator(this, function (_a) {
                try {
                    if (this.gStrUOMEditFlag == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                        if (strSerialControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() &&
                            this.gStrLotSerial != AtParEnums_1.Enable_Lot_Serial_Tracking[AtParEnums_1.Enable_Lot_Serial_Tracking.None].toString()) {
                            recvDetails.DDLUOMFLAG = true;
                            this.ddlRecvUomEnable = true;
                        }
                        else {
                            this.ddlRecvUomEnable = false;
                            recvDetails.DDLUOMFLAG = false;
                        }
                        this.selectedRecvUom = "";
                        this.ddlRecvUom = [];
                        if (this.lstRecvAltUomData.length > 0) {
                            drUOM = linq_es5_1.asEnumerable(this.lstRecvAltUomData).Where(function (x) { return x.LN_NBR == lineNbr; }).ToArray();
                            if (intConverfactor == 1) {
                                this.standardUOM = strUOM;
                                this.standardConversionRate = intConverfactor;
                            }
                            else {
                                //Loop thru the alternateUOMs and Set values
                                for (i = 0; i < drUOM.length; i++) {
                                    if (drUOM[i].CONV_FACT == "1") {
                                        this.standardUOM = drUOM[i].UOM;
                                        this.standardConversionRate = drUOM[i].CONV_FACT;
                                    }
                                }
                            }
                            for (i = 0; i < drUOM.length; i++) {
                                intAltConFact = parseInt(drUOM[i].CONV_FACT);
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
                                if (this.gStrUOMEditFlag == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                    if (this.gStrAltUOMDisplay == this.gRecv_StandardUOM) {
                                        //Not String.IsNullOrEmpty(gItemId) And Then
                                        if (intConverfactor != null) {
                                            this.ddlRecvUom.push({ label: strUOM + "(" + intConverfactor + " " + this.standardUOM + ")", value: strUOM + "(" + intConverfactor + " " + this.standardUOM + ")" });
                                        }
                                        else {
                                            this.ddlRecvUom.push({ label: strUOM + "(" + this.standardUOM + ")", value: strUOM + "(" + this.standardUOM + ")" });
                                        }
                                    }
                                    else if (this.gStrAltUOMDisplay == this.gRecv_PoUOM) {
                                        //Not String.IsNullOrEmpty(gItemId) And Then
                                        if (intConverfactor != null) {
                                            this.ddlRecvUom.push({ label: strUOM + "(" + intConverfactor / intConverfactor + " " + strUOM + ")", value: strUOM + "(" + intConverfactor / intConverfactor + " " + strUOM + ")" });
                                            this.gPOUOM = strUOM;
                                            this.gPOUOMConversionRate = intConverfactor.toString();
                                        }
                                        else {
                                            this.ddlRecvUom.push({ label: strUOM + "(" + strUOM + ")", value: strUOM + "(" + strUOM + ")" });
                                            this.gPOUOM = strUOM;
                                            this.gPOUOMConversionRate = "1";
                                        }
                                    }
                                }
                                else {
                                    //Not String.IsNullOrEmpty(gItemId) And Then
                                    if (intConverfactor != null) {
                                        this.ddlRecvUom.push({ label: strUOM + "(" + intConverfactor / intConverfactor + " " + strUOM + ")", value: strUOM + "(" + intConverfactor / intConverfactor + " " + strUOM + ")" });
                                    }
                                    else {
                                        this.ddlRecvUom.push({ label: strUOM + "(" + strUOM + ")", value: strUOM + "(" + strUOM + ")" });
                                    }
                                }
                            }
                            else {
                                this.ddlRecvUom = [];
                            }
                            strListUom = null;
                            arrListUom = [];
                            if (this.ddlRecvUom != null && this.ddlRecvUom.length > 0) {
                                for (i = 0; i < this.ddlRecvUom.length; i++) {
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
                        }
                        else {
                            intConverfactor = (intConverfactor == 0 ? 1 : intConverfactor);
                            this.ddlRecvUom.push({ label: strUOM + "(" + intConverfactor / intConverfactor + " " + strUOM + ")", value: strUOM + "(" + intConverfactor / intConverfactor + " " + strUOM + ")" });
                        }
                    }
                    else {
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
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.sendIUTOrderToServer = function (trnsId, recvData, startTime, endTime) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var iutDetails, iutEntityDtls, drIUTCountedItem, i, dateStr, drIUTHeader, drIUTTrans, dictDataItems, ex_25;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.statusMsgs = [];
                        iutDetails = [];
                        iutEntityDtls = null;
                        drIUTCountedItem = linq_es5_1.asEnumerable(recvData).Where(function (x) { return x.QTY != ""; }).ToArray();
                        for (i = 0; i < drIUTCountedItem.length; i++) {
                            iutEntityDtls = new vm_recv_iut_items_1.VM_RECV_IUT_ITEMS();
                            iutEntityDtls.TRANSACTION_ID = drIUTCountedItem[i].TRANSACTION_ID;
                            iutEntityDtls.DESTIN_BUSINESS_UNIT = drIUTCountedItem[i].DESTIN_BUSINESS_UNIT;
                            iutEntityDtls.ORIG_BUSINESS_UNIT = drIUTCountedItem[i].ORIG_BUSINESS_UNIT;
                            iutEntityDtls.INTERUNIT_ID = drIUTCountedItem[i].INTERUNIT_ID;
                            dateStr = new Date(new Date()).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                            if (this.gSTime != "") {
                                this.gSTime = dateStr.replace(',', '');
                            }
                            iutEntityDtls.START_DT_TIME = this.gSTime; // Strings.Format(dtStTime, ATPAR_LONGDATETIME_24H);                
                            iutEntityDtls.END_DT_TIME = dateStr.replace(',', ''); // Strings.Format(dtStTime, ATPAR_LONGDATETIME_24H);                
                            iutEntityDtls.USER_ID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID].toString();
                            iutEntityDtls.LINE_NO = drIUTCountedItem[i].LINE_NO;
                            iutEntityDtls.ITEM_ID = drIUTCountedItem[i].ITEM_ID;
                            iutEntityDtls.DESCRIPTION = drIUTCountedItem[i].DESCRIPTION;
                            iutEntityDtls.QTY = drIUTCountedItem[i].QTY;
                            iutEntityDtls.QTY_SHIPPED = drIUTCountedItem[i].QTY_SHIPPED;
                            iutEntityDtls.UOM = drIUTCountedItem[i].UOM;
                            iutEntityDtls.CARRIER_ID = drIUTCountedItem[i].CARRIER_ID;
                            iutEntityDtls.BILL_OF_LADING = drIUTCountedItem[i].BILL_OF_LADING;
                            if ((drIUTCountedItem[i].NO_OF_PKGS != "")) {
                                iutEntityDtls.NO_OF_PKGS = drIUTCountedItem[i].NO_OF_PKGS;
                            }
                            else {
                                iutEntityDtls.NO_OF_PKGS = "1";
                            }
                            iutEntityDtls.INV_LOT_ID = drIUTCountedItem[i].INV_LOT_ID;
                            iutEntityDtls.SERIAL_ID = drIUTCountedItem[i].SERIAL_ID;
                            iutEntityDtls.INTERUNIT_LINE = drIUTCountedItem[i].INTERUNIT_LINE;
                            iutDetails.push(iutEntityDtls);
                        }
                        if (!(recvData.length > 0)) return [3 /*break*/, 2];
                        drIUTHeader = [];
                        drIUTHeader.push({
                            PRODUCT_ID: AtParEnums_1.EnumApps.Receiving.toString()
                        });
                        drIUTTrans = [];
                        drIUTTrans.push({
                            TRANSACTION_ID: trnsId
                        });
                        dictDataItems = {
                            'HEADER': drIUTHeader, 'DETAILS': iutDetails, 'TRANSACTIONS': drIUTTrans
                        };
                        return [4 /*yield*/, this.recvPoNonPoService.sendIUTDetails(dictDataItems).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                        }
                        else {
                            return [2 /*return*/, this.statusCode];
                        }
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        ex_25 = _a.sent();
                        this.clientErrorMsg(ex_25, "sendIUTOrderToServer");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, this.statusCode];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.sendToServer = function (trnsId, transCode, tempPoId, startTime, endTime) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, dictDataItems, ex_26;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        this.statusMsgs = [];
                        this.statusCode = -1;
                        _a = this;
                        return [4 /*yield*/, this.prepareShipment(trnsId, startTime, endTime)];
                    case 1:
                        _a.statusCode = _b.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, this.statusCode];
                        }
                        dictDataItems = { 'HEADER': this.lstReceivePoHeaderData, 'DETAILS': this.lstReceiveDetailsData, 'SUBDETAILS': this.receive_itemSubdetails_dt };
                        return [4 /*yield*/, this.recvPoNonPoService.sendDetails(dictDataItems).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _b.sent();
                        this.gStrInvoice = "";
                        return [2 /*return*/, this.statusCode];
                    case 3:
                        ex_26 = _b.sent();
                        this.clientErrorMsg(ex_26, "sendToServer");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, 0];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.prepareShipment = function (pTransId, dtStTime, dtEndTime) {
        if (dtStTime === void 0) { dtStTime = null; }
        if (dtEndTime === void 0) { dtEndTime = null; }
        return __awaiter(this, void 0, void 0, function () {
            var strTransCode, poHedrEntity, drQtyCounted, i, recvLineHdrEntity, dateStr, drSerialLotRows, drSerialLot;
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = [];
                    this.statusCode = -1;
                    strTransCode = "";
                    this.lstReceivePoHeaderData = [];
                    this.lstReceiveDetailsData = [];
                    poHedrEntity = void 0;
                    if (this.lstRecvSendPoHdrs != null && this.lstRecvSendPoHdrs.length > 0) {
                        poHedrEntity = new vm_recv_sendpoheader_1.VM_RECV_SENDPOHEADER();
                        poHedrEntity.BUSINESS_UNIT = this.selectedBUnits;
                        poHedrEntity.PO_ID = this.lstRecvSendPoHdrs[0].PO_ID;
                        poHedrEntity.VENDOR_ID = this.lstRecvSendPoHdrs[0].VENDOR_ID;
                        poHedrEntity.BUSINESS_UNIT_PO = this.lstRecvSendPoHdrs[0].BUSINESS_UNIT;
                        strTransCode = this.lstRecvSendPoHdrs[0].TRANSACTION_CODE;
                        poHedrEntity.DROP_SHIP_FL = this.lstRecvSendPoHdrs[0].DROP_SHIP_FL; //.DROPSHIP_FL;
                        if (strTransCode == "0103") {
                            poHedrEntity.TRANSACTION_CODE = "0104";
                        }
                        else {
                            poHedrEntity.TRANSACTION_CODE = strTransCode;
                        }
                        poHedrEntity.TRANSACTION_ID = this.lstRecvSendPoHdrs[0].TRANSACTION_ID;
                        poHedrEntity.START_DT_TIME = dtStTime; //Strings.Format(dtStTime, ATPAR_LONGDATETIME_24H);              
                        poHedrEntity.END_DT_TIME = dtEndTime; // Strings.Format(dtEndTime, ATPAR_LONGDATETIME_24H);
                        //To Do validation for Carrier and Lading
                        //Same as in HHT we are not sending Carrier id and Lading for Headers
                        poHedrEntity.CARRIER_ID = "";
                        poHedrEntity.BILL_OF_LADING = "";
                        if (this.txtInvoice != null && this.txtInvoice != "") {
                            poHedrEntity.INVOICE_NO = this.txtInvoice;
                        }
                        poHedrEntity.STATUS = AtParEnums_1.EnumApps[AtParEnums_1.EnumApps.Receiving].toString(); // AppTransactionStatus.Receive;
                        poHedrEntity.USER_ID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID].toString();
                        poHedrEntity.NON_STOCK_COUNT = this.nonStockCount.toString();
                        poHedrEntity.STOCK_COUNT = this.stockCount.toString();
                        poHedrEntity.RECEIVER_ID = this.lstRecvSendPoHdrs[0].RECEIVER_ID;
                        poHedrEntity.HDR_CMTS = this.lstRecvSendPoHdrs[0].HDR_CMTS;
                        if (this.lstRecvSendPoHdrs[0].PO_DT != null) {
                            poHedrEntity.PO_DT = this.lstRecvSendPoHdrs[0].PO_DT; //check Once
                        }
                        else {
                            poHedrEntity.PO_DT = "";
                        }
                    }
                    // add the header row
                    this.lstReceivePoHeaderData.push(poHedrEntity);
                    if (strTransCode == "0103") {
                        try {
                            drQtyCounted = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.QTY != null && x.RECEIVED_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString(); }).ToArray();
                            for (i = 0; i < drQtyCounted.length; i++) {
                                recvLineHdrEntity = new vm_recv_sendlineheader_1.VM_RECV_SENDLINEHEADER();
                                recvLineHdrEntity.LINE_NBR = drQtyCounted[i].LINE_NBR;
                                recvLineHdrEntity.SCHED_NBR = drQtyCounted[i].SCHED_NBR;
                                if (drQtyCounted[i].QTY != null) {
                                    recvLineHdrEntity.QTY = drQtyCounted[i].QTY;
                                }
                                else {
                                    recvLineHdrEntity.QTY = 0;
                                }
                                recvLineHdrEntity.UNIT_OF_MEASURE = drQtyCounted[i].UNIT_OF_MEASURE;
                                if (drQtyCounted[i].CARRIER_ID != null && drQtyCounted[i].CARRIER_ID != "") {
                                    recvLineHdrEntity.CARRIER_ID = drQtyCounted[i].CARRIER_ID;
                                }
                                else {
                                    recvLineHdrEntity.CARRIER_ID = " ";
                                }
                                if (drQtyCounted[i].BILL_OF_LADING != null) {
                                    if (drQtyCounted[i].BILL_OF_LADING != null && drQtyCounted[i].BILL_OF_LADING != "") {
                                        recvLineHdrEntity.BILL_OF_LADING = drQtyCounted[i].BILL_OF_LADING;
                                    }
                                    else {
                                        recvLineHdrEntity.BILL_OF_LADING = " ";
                                    }
                                }
                                else {
                                    recvLineHdrEntity.BILL_OF_LADING = " ";
                                }
                                recvLineHdrEntity.SHIPTO_ID = drQtyCounted[i].SHIPTO_ID;
                                if (drQtyCounted[i].NO_OF_BOXES != null) {
                                    recvLineHdrEntity.NO_OF_BOXES = drQtyCounted[i].NO_OF_BOXES;
                                }
                                else {
                                    recvLineHdrEntity.NO_OF_BOXES = 1;
                                }
                                recvLineHdrEntity.INV_ITEM_ID = drQtyCounted[i].INV_ITEM_ID == "" ? " " : drQtyCounted[i].INV_ITEM_ID;
                                recvLineHdrEntity.INVENTORY_ITEM = drQtyCounted[i].INVENTORY_ITEM;
                                recvLineHdrEntity.QTY_PO = drQtyCounted[i].LINE_PO_QTY;
                                if (drQtyCounted[i].TRACKING_ID != null) {
                                    if (drQtyCounted[i].TRACKING_ID != "") {
                                        recvLineHdrEntity.TRACKING_ID = drQtyCounted[i].TRACKING_ID;
                                    }
                                    else {
                                        recvLineHdrEntity.TRACKING_ID = " ";
                                    }
                                }
                                else {
                                    recvLineHdrEntity.TRACKING_ID = " ";
                                }
                                //'Checking Concatination of POID to Tracking ID Parameter Checked ''
                                if (recvLineHdrEntity.INVENTORY_ITEM.toString() == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString() &&
                                    drQtyCounted[i].TRACKING_ID != null) {
                                    if (this.gStrNonStockStore == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                        if (this.concatinateTrkNoPoID != null) {
                                            if (this.concatinateTrkNoPoID == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                                recvLineHdrEntity.TRACKING_ID = this.txtPONumber.toUpperCase() + "-" + drQtyCounted[i].TRACKING_ID.toString();
                                            }
                                        }
                                    }
                                }
                                if (drQtyCounted[i].EXT_TRK_NO != null) {
                                    if (drQtyCounted[i].EXT_TRK_NO != "") {
                                        recvLineHdrEntity.EXT_TRK_NO = drQtyCounted[i].EXT_TRK_NO;
                                    }
                                    else {
                                        recvLineHdrEntity.EXT_TRK_NO = "";
                                    }
                                }
                                else {
                                    recvLineHdrEntity.EXT_TRK_NO = "";
                                }
                                recvLineHdrEntity.RECEIVING_ROUTING_ID = drQtyCounted[i].RECEIVING_ROUTING_ID;
                                recvLineHdrEntity.CUST_ITEM_NO = drQtyCounted[i].CUST_ITEM_NO;
                                if (drQtyCounted[i].LOCATION != null && drQtyCounted[i].LOCATION != "") {
                                    recvLineHdrEntity.LOCATION = drQtyCounted[i].LOCATION;
                                }
                                else {
                                    recvLineHdrEntity.LOCATION = "";
                                }
                                recvLineHdrEntity.RECEIVED_QTY = drQtyCounted[i].RECEIVED_QTY;
                                recvLineHdrEntity.RECV_UOM = drQtyCounted[i].RECV_UOM;
                                recvLineHdrEntity.RECV_CONVERSION_RATE = drQtyCounted[i].RECV_CONVERSION_RATE;
                                recvLineHdrEntity.DESCR = drQtyCounted[i].DESCR; //DESCRIPTION
                                dateStr = new Date(new Date()).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                recvLineHdrEntity.DUE_DT = dateStr.replace(',', ''); // "8/15/00 12:00:00 AM";                      
                                recvLineHdrEntity.STORAGE_LOCATION = drQtyCounted[i].STORAGE_LOCATION ? "" : drQtyCounted[i].STORAGE_LOCATION;
                                this.lstReceiveDetailsData.push(recvLineHdrEntity);
                            }
                        }
                        catch (ex) {
                            return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                        }
                        // If .Item("LOT_CONTROLLED").ToString = "Y" Or .Item("SERIAL_CONTROLLED").ToString = "Y" Then
                        if (this.gStrLotSerial != "None") {
                            try {
                                this.receive_itemSubdetails_dt = [];
                                if (this.lstMainItemLotSerial != null && this.lstMainItemLotSerial.length > 0) {
                                    drSerialLotRows = this.lstMainItemLotSerial.filter(function (x) { return ((x.SERIAL_ID != "" && x.SERIAL_ID != null)
                                        || (x.LOT_ID != "" && x.LOT_ID != null)) && x.QTY != '0' && x.DELETE_FLAG == 'N'; });
                                    for (drSerialLot in drSerialLotRows) {
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
                            return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "prepareShipment");
                }
                return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.showModalPopup = function (drowPrnterData) {
        return __awaiter(this, void 0, void 0, function () {
            var i, printerDetalsEntity;
            return __generator(this, function (_a) {
                try {
                    if (drowPrnterData != null && drowPrnterData.length > 0) {
                        this.printtbl = true;
                        this.bysch = false;
                        this.tbl = false;
                        this.page = false;
                        this.nonPO = false;
                        this.lstPrintersDetails = [];
                        for (i = 0; i < drowPrnterData.length; i++) {
                            printerDetalsEntity = new mt_atpar_setup_pro_printeres_1.MT_ATPAR_SETUP_PRO_PRINTERES();
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
                        }
                        else {
                            this.selectedPrinterName = "";
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "showModalPopup");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.print_NonStockLabel = function (noofLabels, printerDet, printerName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var pPrinterAddressOrName, pPrinterPort, pPrinterTye, pNiceLabelName, pNoOfPrints, pErrMsg, locArray, locDesc, locID, intNoOfBoxses, comments, strTrackingId, strFilter, strCommentsFilter, strPrevLoc, lstPrintTbl, drowPrnterDet, prntResSet, querylst, i, drPrintRow, j, locData, k, drowPrnterCmts, pNiceLabelName1, ex_27, k, drowPrnterCmts, pNiceLabelName1, ex_28, drowRecStockStatus, _a, ex_29;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 27, , 28]);
                        this.statusMsgs = [];
                        this.statusCode = -1;
                        pPrinterAddressOrName = "";
                        pPrinterPort = "";
                        pPrinterTye = "";
                        pNiceLabelName = "";
                        pNoOfPrints = "";
                        pErrMsg = "";
                        locArray = [];
                        locDesc = "";
                        locID = "";
                        intNoOfBoxses = 0;
                        comments = "";
                        strTrackingId = "";
                        strFilter = "";
                        strCommentsFilter = "";
                        strPrevLoc = "-1";
                        lstPrintTbl = [];
                        drowPrnterDet = [];
                        if (printerName == null && printerName == "") {
                            drowPrnterDet = linq_es5_1.asEnumerable(printerDet).Where(function (x) { return x.LABEL_DESCRIPTION == "NonStock PO Header"; }).ToArray(); //check once   LABEL_DESCRIPTION   
                        }
                        else {
                            drowPrnterDet = linq_es5_1.asEnumerable(printerDet).Where(function (x) { return x.LABEL_DESCRIPTION == "NonStock PO Header" && x.FRIENDLY_NAME == printerName; }).ToArray(); //check once LABEL_DESCRIPTION 
                        }
                        if (drowPrnterDet.length == 0) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Configure Non Stock Label Printer" });
                            return [2 /*return*/];
                        }
                        if (!(this.lstRecvSendPoHdrs.length > 0)) return [3 /*break*/, 23];
                        pPrinterAddressOrName = drowPrnterDet[0].IP_ADDRESS;
                        pPrinterPort = drowPrnterDet[0].PORT_NO;
                        if (drowPrnterDet[0].NETWORK_TYPE.toString() == "Mobile") {
                            pPrinterTye = "TcpIP";
                        }
                        else {
                            //TO DO
                        }
                        intNoOfBoxses = noofLabels;
                        pNoOfPrints = "1";
                        //LABEL_FILE_NAME
                        pNiceLabelName = drowPrnterDet[0].LABEL_FILE_NAME;
                        prntResSet = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.INVENTORY_ITEM == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString(); }).ToArray();
                        querylst = linq_es5_1.asEnumerable(prntResSet).Where(function (x) { return x.QTY != null; }).GroupBy(function (y) { return y.LOCATION && y.TRACKING_ID && y.DELIVER_TO &&
                            y.ADDRESS1 && y.ADDRESS2 && y.ADDRESS3 && y.PHONE && y.REQ_NUM && y.BUILDING && y.FLOOR && y.SECTOR && y.REQUISITION_NAME && y.BUYER_NAME; }, function (key) {
                            return key.LOCATION, key.TRACKING_ID, key.DELIVER_TO, key.ADDRESS1, key.ADDRESS2, key.ADDRESS3, key.PHONE,
                                key.REQ_NUM, key.BUILDING, key.FLOOR, key.SECTOR, key.REQUISITION_NAME, key.BUYER_NAME;
                        }).ToArray();
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < querylst.length)) return [3 /*break*/, 23];
                        drPrintRow = new vm_recv_printer_header_1.VM_RECV_PRINTER_HEADER();
                        drPrintRow.BUSINESS_UNIT = this.lstRecvSendPoHdrs[0].BUSINESS_UNIT.toString();
                        if (linq_es5_1.asEnumerable(querylst)[i].DELIVER_TO == null) {
                            drPrintRow.DELIVER_TO_NAME = "";
                        }
                        else {
                            drPrintRow.DELIVER_TO_NAME = linq_es5_1.asEnumerable(querylst)[i].DELIVER_TO;
                        }
                        drPrintRow.DROP_SHIP_FLAG = this.lstRecvSendPoHdrs[0].DROP_SHIP_FL.toString() == "Y" ? "D" : "";
                        drPrintRow.INSPECTION_FLAG = "";
                        drPrintRow.SHIPTO_ID = "";
                        drPrintRow.USER_ID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID].toString();
                        drPrintRow.PO_ID = this.lstRecvSendPoHdrs[0].PO_ID;
                        drPrintRow.ADDRESS1 = linq_es5_1.asEnumerable(querylst)[i].ADDRESS1;
                        drPrintRow.ADDRESS2 = linq_es5_1.asEnumerable(querylst)[i].ADDRESS2;
                        drPrintRow.ADDRESS3 = linq_es5_1.asEnumerable(querylst)[i].ADDRESS3;
                        drPrintRow.PHONE = linq_es5_1.asEnumerable(querylst)[i].PHONE;
                        drPrintRow.REQ_NUM = linq_es5_1.asEnumerable(querylst)[i].REQ_NUM;
                        drPrintRow.BUILDING = linq_es5_1.asEnumerable(querylst)[i].BUILDING;
                        drPrintRow.FLOOR = linq_es5_1.asEnumerable(querylst)[i].FLOOR;
                        drPrintRow.SECTOR = linq_es5_1.asEnumerable(querylst)[i].SECTOR;
                        if (linq_es5_1.asEnumerable(querylst)[i].REQUISITION_NAME != null && linq_es5_1.asEnumerable(querylst)[i].REQUISITION_NAME != "") {
                            drPrintRow.REQUISITION_NAME = linq_es5_1.asEnumerable(querylst)[i].REQUISITION_NAME;
                        }
                        else {
                            drPrintRow.REQUISITION_NAME = "";
                        }
                        if (linq_es5_1.asEnumerable(querylst)[i].BUYER_NAME && linq_es5_1.asEnumerable(querylst)[i].BUYER_NAME != null && linq_es5_1.asEnumerable(querylst)[i].BUYER_NAME != "") {
                            drPrintRow.BUYER_NAME = linq_es5_1.asEnumerable(querylst)[i].BUYER_NAME;
                        }
                        else {
                            drPrintRow.BUYER_NAME = "";
                        }
                        if (this.lstRecvSendPoHdrs[0].HDR_CMTS != null && this.lstRecvSendPoHdrs[0].HDR_CMTS != "") {
                            comments = this.lstRecvSendPoHdrs[0].HDR_CMTS;
                            drPrintRow.COMMENTS = comments.toString().trim();
                        }
                        else {
                            drPrintRow.COMMENTS = "";
                        }
                        if (this.gStrNonStockStore == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                            if (linq_es5_1.asEnumerable(querylst)[i].TRACKING_ID == "" || linq_es5_1.asEnumerable(querylst)[i].TRACKING_ID == null) {
                                if (linq_es5_1.asEnumerable(querylst)[i].LOCATION != strPrevLoc) {
                                    this.updateTrackingNumber(strTrackingId, linq_es5_1.asEnumerable(querylst)[i].LOCATION);
                                }
                            }
                            else {
                                strTrackingId = linq_es5_1.asEnumerable(querylst)[i].TRACKING_ID;
                            }
                            strPrevLoc = linq_es5_1.asEnumerable(querylst)[i].LOCATION;
                            if (this.gConcatinateTrkNoPoID != null) {
                                if (this.gConcatinateTrkNoPoID == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                    strTrackingId = this.lstRecvSendPoHdrs[0].PO_ID.toString() + "-" + strTrackingId;
                                }
                            }
                        }
                        drPrintRow.TRACKING_NO = strTrackingId;
                        if (!(linq_es5_1.asEnumerable(querylst)[i].LOCATION != null && linq_es5_1.asEnumerable(querylst)[i].LOCATION != "")) return [3 /*break*/, 13];
                        locArray = linq_es5_1.asEnumerable(querylst)[i].LOCATION.toString().split(",");
                        j = 0;
                        _b.label = 2;
                    case 2:
                        if (!(j < locArray.length)) return [3 /*break*/, 12];
                        if (locArray[j].indexOf("£") > 0) {
                            locData = locArray[j].split("£");
                            if (locData != null && locData.length >= 3) {
                                locID = locData[0];
                                locDesc = locData[2];
                            }
                            else if (locData != null && locData.length >= 2) {
                                locID = locData[0];
                                locDesc = locData[1];
                            }
                        }
                        else {
                            locID = locArray[j];
                            locDesc = "";
                        }
                        drPrintRow.LOCATION_ID = locID;
                        drPrintRow.LOCATION_DESCR = locDesc;
                        k = 1;
                        _b.label = 3;
                    case 3:
                        if (!(k <= intNoOfBoxses)) return [3 /*break*/, 11];
                        drPrintRow[k].NO_OF_BOXES = k + " of " + intNoOfBoxses;
                        lstPrintTbl.push(drPrintRow);
                        return [4 /*yield*/, this.recvPoNonPoService.printNiceLabel(pPrinterAddressOrName, pPrinterPort, pPrinterTye, pNiceLabelName, pNoOfPrints, pErrMsg, lstPrintTbl).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 4:
                        _b.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to Print Non Stock Header Label" });
                            return [2 /*return*/, this.statusCode];
                        }
                        if (!(this.gStrPrintPoIDComments == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString())) return [3 /*break*/, 9];
                        if (!(comments != null && comments.trim() != "")) return [3 /*break*/, 9];
                        drowPrnterCmts = void 0;
                        if (printerName == null && printerName == "") {
                            drowPrnterCmts = linq_es5_1.asEnumerable(this.lstSetUpProPrinters).Where(function (x) { return x.LABEL_DESCRIPTION == "Po Comments"; }).ToArray(); //check once   LABEL_DESCRIPTION  
                        }
                        else {
                            drowPrnterCmts = linq_es5_1.asEnumerable(this.lstSetUpProPrinters).Where(function (x) { return x.LABEL_DESCRIPTION == "Po Comments" && x.FRIENDLY_NAME == printerName; }).ToArray(); //check once LABEL_DESCRIPTION  
                        }
                        if (!(drowPrnterCmts.length == 0)) return [3 /*break*/, 5];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Configure Non Stock Comments Label Printer" });
                        return [3 /*break*/, 9];
                    case 5:
                        pNiceLabelName1 = drowPrnterCmts[0].LABEL_FILE_NAME;
                        _b.label = 6;
                    case 6:
                        _b.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.recvPoNonPoService.printNiceLabel(pPrinterAddressOrName, pPrinterPort, pPrinterTye, pNiceLabelName1, pNoOfPrints, pErrMsg, lstPrintTbl).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 7:
                        _b.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to Print Non Stock Coments Label" });
                            return [2 /*return*/, this.statusCode];
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        ex_27 = _b.sent();
                        this.clientErrorMsg(ex_27, "print_NonStockLabel");
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 9:
                        lstPrintTbl = null;
                        _b.label = 10;
                    case 10:
                        k++;
                        return [3 /*break*/, 3];
                    case 11:
                        j++;
                        return [3 /*break*/, 2];
                    case 12: return [3 /*break*/, 22];
                    case 13:
                        drPrintRow.LOCATION_ID = "";
                        drPrintRow.LOCATION_DESCR = "";
                        k = 1;
                        _b.label = 14;
                    case 14:
                        if (!(k < intNoOfBoxses)) return [3 /*break*/, 22];
                        drPrintRow[k].NO_OF_BOXES = k + " of " + intNoOfBoxses;
                        lstPrintTbl.push(drPrintRow);
                        return [4 /*yield*/, this.recvPoNonPoService.printNiceLabel(pPrinterAddressOrName, pPrinterPort, pPrinterTye, pNiceLabelName, pNoOfPrints, pErrMsg, lstPrintTbl).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 15:
                        _b.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to Print Non Stock Header Label" });
                            return [2 /*return*/, this.statusCode];
                        }
                        if (!(this.gStrPrintPoIDComments == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString())) return [3 /*break*/, 20];
                        if (!(comments != null && comments.trim() != "")) return [3 /*break*/, 20];
                        drowPrnterCmts = void 0;
                        if (printerName == null && printerName == "") {
                            drowPrnterCmts = linq_es5_1.asEnumerable(this.lstSetUpProPrinters).Where(function (x) { return x.LABEL_DESCRIPTION == "Po Comments"; }).ToArray(); //check once   LABEL_DESCRIPTION  
                        }
                        else {
                            drowPrnterCmts = linq_es5_1.asEnumerable(this.lstSetUpProPrinters).Where(function (x) { return x.LABEL_DESCRIPTION == "Po Comments" && x.FRIENDLY_NAME == printerName; }).ToArray(); //check once LABEL_DESCRIPTION  
                        }
                        if (!(drowPrnterCmts.length == 0)) return [3 /*break*/, 16];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Configure Non Stock Label Printer" });
                        return [3 /*break*/, 20];
                    case 16:
                        pNiceLabelName1 = drowPrnterCmts[0].LABEL_FILE_NAME.toString();
                        _b.label = 17;
                    case 17:
                        _b.trys.push([17, 19, , 20]);
                        return [4 /*yield*/, this.recvPoNonPoService.printNiceLabel(pPrinterAddressOrName, pPrinterPort, pPrinterTye, pNiceLabelName1, pNoOfPrints, pErrMsg, lstPrintTbl).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 18:
                        _b.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to Print Non Stock Coments Label" });
                            return [2 /*return*/, this.statusCode];
                        }
                        return [3 /*break*/, 20];
                    case 19:
                        ex_28 = _b.sent();
                        this.clientErrorMsg(ex_28, "print_NonStockLabel");
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 20:
                        lstPrintTbl = null;
                        _b.label = 21;
                    case 21:
                        k++;
                        return [3 /*break*/, 14];
                    case 22:
                        i++;
                        return [3 /*break*/, 1];
                    case 23:
                        if (!(this.gPrintStockHeader != null)) return [3 /*break*/, 26];
                        if (!(this.gPrintStockHeader == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString())) return [3 /*break*/, 26];
                        if (!(this.gStrSelPrinter == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString())) return [3 /*break*/, 24];
                        drowPrnterDet == linq_es5_1.asEnumerable(this.lstSetUpProPrinters).Where(function (x) { return x.LABEL_DESCRIPTION == "Stock PO Header"; }).ToArray(); //LABEL_DESCRIPTION
                        drowRecStockStatus = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.QTY != null && x.RECEIVED_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && x.INVENTORY_ITEM == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString(); }).ToArray();
                        if ((drowRecStockStatus.length > 0)) {
                            this.showModalPopup(drowPrnterDet);
                        }
                        return [3 /*break*/, 26];
                    case 24:
                        _a = this;
                        return [4 /*yield*/, this.print_StockLabel(intNoOfBoxses, this.lstSetUpProPrinters, "")];
                    case 25:
                        _a.statusCode = _b.sent(); //intNoOfBoxses, poDS, pPrintDetailsDS.Tables(0), ""
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to Print Stock Label" });
                        }
                        _b.label = 26;
                    case 26: return [3 /*break*/, 28];
                    case 27:
                        ex_29 = _b.sent();
                        this.clientErrorMsg(ex_29, "print_NonStockLabel");
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 28: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.print_StockLabel = function (noofLabels, printerDet, printerName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var pPrinterAddressOrName, pPrinterPort, pPrinterTye, pNiceLabelName, pNoOfPrints, pErrMsg, locArray, locDesc, locID, intNoOfBoxses, Comments, businessUnitIn, strFilter, strTrackingId, strPrevLoc, lstPrintTbl, drowPrnterDet, prntResSet, querylst, i, drPrintRow, j, locData, k, k, ex_30;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        this.statusMsgs = [];
                        this.statusCode = -1;
                        pPrinterAddressOrName = "";
                        pPrinterPort = "";
                        pPrinterTye = "";
                        pNiceLabelName = "";
                        pNoOfPrints = "";
                        pErrMsg = "";
                        locArray = null;
                        locDesc = "";
                        locID = "";
                        intNoOfBoxses = 0;
                        Comments = "";
                        businessUnitIn = "";
                        strFilter = "";
                        strTrackingId = "";
                        strPrevLoc = "-1";
                        lstPrintTbl = [];
                        drowPrnterDet = [];
                        if (printerName == null && printerName == "") {
                            drowPrnterDet = linq_es5_1.asEnumerable(printerDet).Where(function (x) { return x.LABEL_DESCRIPTION == "Stock PO Header"; }).ToArray(); //check once   LABEL_DESCRIPTION
                        }
                        else {
                            drowPrnterDet = linq_es5_1.asEnumerable(printerDet).Where(function (x) { return x.LABEL_DESCRIPTION == "Stock PO Header" && x.FRIENDLY_NAME == printerName; }).ToArray(); //check once LABEL_DESCRIPTION             
                        }
                        if (drowPrnterDet.length == 0) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Configure Non Stock Label Printer" });
                            return [2 /*return*/];
                        }
                        if (!(this.lstRecvSendPoHdrs.length > 0)) return [3 /*break*/, 9];
                        pPrinterAddressOrName = drowPrnterDet[0].IP_ADDRESS;
                        pPrinterPort = drowPrnterDet[0].PORT_NO;
                        if (drowPrnterDet[0].NETWORK_TYPE.toString() == "Mobile") {
                            pPrinterTye = "TcpIP";
                        }
                        else {
                            //TO Do for Remaining printer types
                        }
                        intNoOfBoxses = noofLabels;
                        pNoOfPrints = "1";
                        pNiceLabelName = drowPrnterDet[0].LABEL_FILE_NAME;
                        prntResSet = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.INVENTORY_ITEM == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString(); }).ToArray();
                        querylst = linq_es5_1.asEnumerable(prntResSet).Where(function (x) { return x.QTY != null; }).GroupBy(function (y) { return y.STORAGE_LOCATION && y.TRACKING_ID && y.DELIVER_TO &&
                            y.ADDRESS1 && y.ADDRESS2 && y.ADDRESS3 && y.PHONE && y.REQ_NUM; }, function (key) {
                            return key.STORAGE_LOCATION, key.TRACKING_ID, key.DELIVER_TO, key.ADDRESS1, key.ADDRESS2, key.ADDRESS3, key.PHONE,
                                key.REQ_NUM;
                        }).ToArray();
                        if (querylst.length == 0) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Stock Items to Print" });
                            return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                        }
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < querylst.length)) return [3 /*break*/, 7];
                        drPrintRow = new vm_recv_printer_header_1.VM_RECV_PRINTER_HEADER();
                        drPrintRow.BUSINESS_UNIT = this.lstRecvSendPoHdrs[0].BUSINESS_UNIT.toString();
                        if (linq_es5_1.asEnumerable(querylst)[i].DELIVER_TO == null) {
                            drPrintRow.DELIVER_TO_NAME = "";
                        }
                        else {
                            drPrintRow.DELIVER_TO_NAME = linq_es5_1.asEnumerable(querylst)[i].DELIVER_TO;
                        }
                        drPrintRow.DROP_SHIP_FLAG = this.lstRecvSendPoHdrs[0].DROP_SHIP_FL.toString() == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() ? "D" : "";
                        drPrintRow.INSPECTION_FLAG = "";
                        drPrintRow.SHIPTO_ID = "";
                        drPrintRow.USER_ID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID].toString();
                        drPrintRow.PO_ID = this.lstRecvSendPoHdrs[0].PO_ID.toString();
                        drPrintRow.REQ_NUM = linq_es5_1.asEnumerable(querylst)[i].REQ_NUM;
                        if (!(this.gStrNonStockStore == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString())) return [3 /*break*/, 5];
                        if (!(linq_es5_1.asEnumerable(querylst)[i].TRACKING_ID == null || linq_es5_1.asEnumerable(querylst)[i].TRACKING_ID == "")) return [3 /*break*/, 4];
                        if (!(linq_es5_1.asEnumerable(querylst)[i].LOCATION.toString() != strPrevLoc)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.updateTrackingNumber(strTrackingId, linq_es5_1.asEnumerable(querylst)[i].LOCATION.toString())];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        strTrackingId = linq_es5_1.asEnumerable(querylst)[i].TRACKING_ID;
                        _a.label = 5;
                    case 5:
                        drPrintRow.TRACKING_NO = strTrackingId;
                        if (linq_es5_1.asEnumerable(querylst)[i].LOCATION == null || linq_es5_1.asEnumerable(querylst)[i].LOCATION == "") {
                            businessUnitIn = "";
                        }
                        else {
                            businessUnitIn = linq_es5_1.asEnumerable(querylst)[i].LOCATION;
                        }
                        if (linq_es5_1.asEnumerable(querylst)[i].LOCATION != null && linq_es5_1.asEnumerable(querylst)[i].LOCATION != "") {
                            locArray = linq_es5_1.asEnumerable(querylst)[i].LOCATION.toString().split(",");
                            for (j = 0; j < locArray.length; j++) {
                                if (locArray[j].indexOf("£") > 0) {
                                    locData = locArray[j].split("£");
                                    if (locData != null && locData.length >= 3) {
                                        locID = locData[0];
                                        locDesc = locData[2];
                                    }
                                    else if (locData != null && locData.length >= 2) {
                                        locID = locData[0];
                                        locDesc = locData[1];
                                    }
                                }
                                else {
                                    locID = locArray[j];
                                    locDesc = "";
                                }
                                drPrintRow.LOCATION_ID = locID;
                                drPrintRow.LOCATION_DESCR = locDesc;
                                for (k = 1; k <= intNoOfBoxses; k++) {
                                    drPrintRow[k].NO_OF_BOXES = k + " of " + intNoOfBoxses;
                                    lstPrintTbl.push(drPrintRow);
                                }
                            }
                        }
                        else {
                            drPrintRow.LOCATION_ID = "";
                            drPrintRow.LOCATION_DESCR = "";
                            try {
                                for (k = 1; k <= intNoOfBoxses; k++) {
                                    drPrintRow[k].NO_OF_BOXES = k + " of " + intNoOfBoxses;
                                    lstPrintTbl.push(drPrintRow);
                                }
                            }
                            catch (ex) {
                                this.clientErrorMsg(ex, "print_StockLabel");
                                return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                            }
                        }
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 1];
                    case 7:
                        if (!(lstPrintTbl.length > 0)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.recvPoNonPoService.printNiceLabel(pPrinterAddressOrName, pPrinterPort, pPrinterTye, pNiceLabelName, pNoOfPrints, pErrMsg, lstPrintTbl).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 8:
                        _a.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to Print Stock Header Label" });
                            return [2 /*return*/, this.statusCode];
                        }
                        _a.label = 9;
                    case 9: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                    case 10:
                        ex_30 = _a.sent();
                        this.clientErrorMsg(ex_30, "print_StockLabel");
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.prepareStationaryPrinting = function (invItemType, blnPrinted) {
        return __awaiter(this, void 0, void 0, function () {
            var functionReturnValue, trackingNbr_1, strPrevLoc, drowRecStatus, _a, dtDeliverto, i, currentdate, _b, ex_31;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 11, , 12]);
                        this.statusMsgs = [];
                        this.statusCode = -1;
                        functionReturnValue = 0;
                        trackingNbr_1 = "";
                        strPrevLoc = "-1";
                        drowRecStatus = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.QTY != null; }).ToArray();
                        if (drowRecStatus.length == 0) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "PO in Downloaded status,please receive it to print" });
                            return [2 /*return*/, functionReturnValue];
                        }
                        _a = this;
                        return [4 /*yield*/, this.getStationaryDelveryToDetails()];
                    case 1:
                        _a.statusCode = _c.sent();
                        dtDeliverto = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Distinct(function (s) { return s.LOCATION && s.DELIVER_TO && s.TRACKING_ID; }).ToArray();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, functionReturnValue];
                        }
                        if (!(dtDeliverto != undefined && dtDeliverto != null && dtDeliverto.length > 0)) return [3 /*break*/, 10];
                        i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(i < dtDeliverto.length)) return [3 /*break*/, 10];
                        if (!(dtDeliverto[i].TRACKING_ID == null || dtDeliverto[i].TRACKING_ID == "")) return [3 /*break*/, 6];
                        currentdate = new Date();
                        return [4 /*yield*/, this.recvPoNonPoService.generateTrackingNumber().catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                var testdata = data;
                                trackingNbr_1 = testdata.toString();
                            })];
                    case 3:
                        _c.sent();
                        if (!(dtDeliverto[i].LOCATION.toString() != strPrevLoc)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.updateTrackingNumber(trackingNbr_1, dtDeliverto[i].LOCATION.toString())];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        trackingNbr_1 = dtDeliverto[i].TRACKING_ID;
                        _c.label = 7;
                    case 7:
                        _b = this;
                        return [4 /*yield*/, this.prepareStationaryInputDataset(dtDeliverto[i].LOCATION, dtDeliverto[i].DELIVER_TO, trackingNbr_1, invItemType)];
                    case 8:
                        _b.statusCode = _c.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, this.statusCode];
                        }
                        strPrevLoc = dtDeliverto[i].LOCATION; // asEnumerable(dtDeliverto).ToArray[i].LOCATION;
                        _c.label = 9;
                    case 9:
                        i++;
                        return [3 /*break*/, 2];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        ex_31 = _c.sent();
                        this.clientErrorMsg(ex_31, "prepareStationaryPrinting");
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/, this.statusCode];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.printReceiveItemLabel = function (noofLabels, printerDet, printerName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var functionReturnValue, pPrinterAddressOrName, pPrinterPort, pPrinterTye, pNiceLabelName, pNoOfPrints, pErrMsg, intNoOfBoxses, locArray, locDesc, locID, itemType_2, strConvFact, strFilter, lstPrintTbl, resTbl, i, drowPrnterDet, drPrintRow, j, locData, strTrackingId, k, ex_32, ex_33;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        this.statusMsgs = [];
                        this.statusCode = -1;
                        functionReturnValue = 0;
                        pPrinterAddressOrName = "";
                        pPrinterPort = "";
                        pPrinterTye = "";
                        pNiceLabelName = "";
                        pNoOfPrints = "";
                        pErrMsg = "";
                        intNoOfBoxses = 0;
                        locArray = [];
                        locDesc = "";
                        locID = "";
                        itemType_2 = "";
                        strConvFact = "";
                        strFilter = "";
                        lstPrintTbl = [];
                        resTbl = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.INV_ITEM_ID == _this.hdnInvItemId && x.LINE_NBR == _this.hdnItmLineNo && x.SCHED_NBR == _this.hdnItmSchedLineNo; }).ToArray();
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < resTbl.length)) return [3 /*break*/, 6];
                        if (resTbl[i].INVENTORY_ITEM.toString() == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                            itemType_2 = "Stock Item";
                        }
                        else {
                            itemType_2 = "NonStock Item";
                        }
                        drowPrnterDet = null;
                        if (printerName == "") {
                            drowPrnterDet = linq_es5_1.asEnumerable(printerDet).Where(function (x) { return x.LABEL_DESCRIPTION == itemType_2; }).ToArray();
                        }
                        else {
                            drowPrnterDet = linq_es5_1.asEnumerable(printerDet).Where(function (x) { return x.LABEL_DESCRIPTION == itemType_2 && x.FRIENDLY_NAME == printerName; }).ToArray();
                        }
                        if (drowPrnterDet == null || drowPrnterDet.length == 0) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Configure " + itemType_2 + " Label Printer" });
                            return [2 /*return*/, functionReturnValue];
                        }
                        pPrinterAddressOrName = drowPrnterDet[0].IP_ADDRESS;
                        pPrinterPort = drowPrnterDet[0].PORT_NO;
                        if (drowPrnterDet[0].NETWORK_TYPE == "Mobile") {
                            pPrinterTye = "TcpIP";
                        }
                        else {
                        }
                        intNoOfBoxses = noofLabels;
                        pNoOfPrints = "1";
                        pNiceLabelName = drowPrnterDet[0].LABEL_FILE_NAME;
                        drPrintRow = new vm_printlabel_receive_header_1.VM_PRINTLABEL_RECEIVE_HEADER();
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
                        }
                        else {
                            drPrintRow.REQUISITION_NAME = " ";
                        }
                        if (resTbl[i].BUYER_NAME != null && resTbl[i].BUYER_NAME != null) {
                            drPrintRow.BUYER_NAME = resTbl[i].BUYER_NAME;
                        }
                        else {
                            drPrintRow.BUYER_NAME = "";
                        }
                        if (resTbl[i].BUILDING != null) {
                            drPrintRow.BUILDING = resTbl[i].BUILDING;
                        }
                        else {
                            drPrintRow.BUILDING = " ";
                        }
                        if (resTbl[i].FLOOR != null) {
                            drPrintRow.FLOOR = resTbl[i].FLOOR;
                        }
                        else {
                            drPrintRow.FLOOR = " ";
                        }
                        if (resTbl[i].SECTOR != null) {
                            drPrintRow.SECTOR = resTbl[i].SECTOR;
                        }
                        else {
                            drPrintRow.SECTOR = " ";
                        }
                        if (resTbl[i].LOCATION != null) {
                            locArray = resTbl[i].LOCATION.toString().split(",");
                            for (j = 0; j < locArray.length; j++) {
                                if (locArray[j].indexOf("£") > 0) {
                                    locData = locArray[j].split("£");
                                    if (locData != null && locData.length >= 3) {
                                        locID = locData[0];
                                        locDesc = locData[2];
                                    }
                                    else if (locData != null && locData.length >= 2) {
                                        locID = locData[0];
                                        locDesc = locData[1];
                                    }
                                }
                                else {
                                    locID = locArray[j];
                                    locDesc = "";
                                }
                                drPrintRow.LOCATION_ID = locID;
                                drPrintRow.LOCATION_DESCR = locDesc;
                            }
                        }
                        else {
                            drPrintRow.LOCATION_ID = "";
                            drPrintRow.LOCATION_DESCR = "";
                        }
                        strTrackingId = "";
                        if (!(this.gStrNonStockStore == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString())) return [3 /*break*/, 4];
                        if (!(resTbl[i].TRACKING_ID == "" || resTbl[i].TRACKING_ID == null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.updateItemTrackingNumber(strTrackingId, resTbl[i].INV_ITEM_ID.toString(), resTbl[i].LINE_NBR.toString())];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        strTrackingId = resTbl[i].TRACKING_ID.toString();
                        _a.label = 4;
                    case 4:
                        drPrintRow.TRACKING_NO = strTrackingId;
                        if (resTbl[i].INVENTORY_ITEM == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                            drPrintRow.LOCATION_ID = resTbl[i].STORAGE_LOCATION;
                        }
                        else {
                            drPrintRow.LOCATION_ID = locID;
                        }
                        drPrintRow.CUST_ITEM_NO = resTbl[i].CUST_ITEM_NO;
                        drPrintRow.GTIN = resTbl[i].GTIN;
                        drPrintRow.ITEM_DESCR = resTbl[i].DESCR;
                        drPrintRow.INSPECTION_FLAG = resTbl[i].INSP_FLAG;
                        drPrintRow.DROP_SHIP_FLAG = this.lstRecvSendPoHdrs[0].DROP_SHIP_FL.toString() == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() ? "D" : "";
                        drPrintRow.RECEIVED_QTY = resTbl[i].QTY.toString();
                        drPrintRow.RECEIVE_UOM = resTbl[i].RECV_UOM;
                        if (!(resTbl[i].ISSUE_UOM == null || resTbl[i].CONVERSION_RATE == null)) {
                            strConvFact = resTbl[i].CONVERSION_RATE.toString() + " " + resTbl[i].ISSUE_UOM.toString();
                        }
                        else {
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
                        }
                        else {
                            drPrintRow.PACKAGING_STRING = resTbl[i].PACKAGING_STRING;
                        }
                        drPrintRow.RECEIPT_DT = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.DateTime].toString();
                        drPrintRow.USER_ID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID].toString();
                        for (k = 1; k <= intNoOfBoxses; k++) {
                            drPrintRow.NO_OF_BOXES = k + " of " + intNoOfBoxses;
                            lstPrintTbl.push(drPrintRow);
                        }
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 1];
                    case 6:
                        _a.trys.push([6, 9, , 10]);
                        if (!(lstPrintTbl.length > 0)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.recvPoNonPoService.printNiceLabel(pPrinterAddressOrName, pPrinterPort, pPrinterTye, pNiceLabelName, pNoOfPrints, pErrMsg, lstPrintTbl).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spnrService.stop();
                                        _this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Label Printed Sucessfully " });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        ex_32 = _a.sent();
                        this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Internal Server Error " });
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 10: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                    case 11:
                        ex_33 = _a.sent();
                        this.clientErrorMsg(ex_33, "printReceiveItemLabel");
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.getStationaryDelveryToDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resTbl;
            return __generator(this, function (_a) {
                try {
                    resTbl = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.QTY != null; }).GroupBy(function (x) { return x.LOCATION && x.TRACKING_ID && x.DELIVER_TO; }).ToArray();
                    //LINE_QTY
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "getStationaryDelveryToDetails");
                }
                return [2 /*return*/, 0];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.updateItemTrackingNumber = function (trackingNbr, itemId, lineNbr) {
        return __awaiter(this, void 0, void 0, function () {
            var i, i, i;
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = [];
                    this.statusCode = -1;
                    for (i = 0; i < this.lstRecvSendPoLines.length; i++) {
                        if (this.lstRecvSendPoLines[i].INV_ITEM_ID == itemId && this.lstRecvSendPoLines[i].LINE_NBR == parseInt(lineNbr)) {
                            this.lstRecvSendPoLines[i].TRACKING_ID = trackingNbr;
                        }
                    }
                    if (this.lstRecvSendPoLines != null) {
                        if ((this.lstRecvSendPoLines != null) && this.lstRecvSendPoLines.length > 0) {
                            for (i = 0; i < this.lstRecvSendPoLines.length; i++) {
                                if (this.lstRecvSendPoLines[i].INV_ITEM_ID == itemId && this.lstRecvSendPoLines[i].LINE_NBR == parseInt(lineNbr)) {
                                    this.lstRecvSendPoLines[i].TRACKING_ID = trackingNbr;
                                }
                            }
                        }
                    }
                    if (this.lstRecvSendPoLines != null) {
                        for (i = 0; i < this.lstRecvSendPoLines.length; i++) {
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "updateItemTrackingNumber");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.updateTrackingNumber = function (trackingNbr, location) {
        return __awaiter(this, void 0, void 0, function () {
            var i, i, i;
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = [];
                    this.statusCode = -1;
                    for (i = 0; i < this.lstRecvSendPoLines.length; i++) {
                        if (this.lstRecvSendPoLines[i].LOCATION == location) {
                            this.lstRecvSendPoLines[i].TRACKING_ID = trackingNbr;
                        }
                    }
                    if (this.lstRecvSendPoLines != null) {
                        if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                            for (i = 0; i < this.lstRecvSendPoLines.length; i++) {
                                if (this.lstRecvSendPoLines[i].LOCATION == location) {
                                    this.lstRecvSendPoLines[i].TRACKING_ID = trackingNbr;
                                }
                            }
                        }
                    }
                    if (this.lstRecvSendPoLines != null) {
                        for (i = 0; i < this.lstRecvSendPoLines.length; i++) {
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "updateTrackingNumber");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.prepareStationaryInputDataset = function (pLocation, pDeliverTo, pTrackingNbr, invItemType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var strFilter, locArray, locDesc, locID, intNoOfBoxses, dtHedTbl, dtItemSet, dtDetails, dateStr, drHedrow, i, drItemrow, j, locData, dictDataItems, dictDataItems, ex_34;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        this.statusMsgs = [];
                        this.statusCode = -1;
                        strFilter = "";
                        locArray = null;
                        locDesc = "";
                        locID = "";
                        intNoOfBoxses = 0;
                        dtHedTbl = [];
                        dtItemSet = [];
                        ;
                        dtDetails = [];
                        if (this.txtPkgs != null) {
                            intNoOfBoxses = parseInt(this.txtPkgs);
                        }
                        else {
                            intNoOfBoxses = 1;
                        }
                        dateStr = new Date(new Date()).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                        if (!(this.lstRecvSendPoHdrs.length > 0)) return [3 /*break*/, 7];
                        drHedrow = new vm_recv_sendpoheader_1.VM_RECV_SENDPOHEADER();
                        drHedrow.END_DT_TIME = dateStr.replace(',', ''); // Strings.Format(eTime, ATPAR_LONGDATETIME_24H);
                        drHedrow.PO_ID = this.lstRecvSendPoHdrs[0].PO_ID;
                        drHedrow.LOCATION = pLocation;
                        drHedrow.DELIVER_TO = pDeliverTo;
                        drHedrow.TRACKING_NBR = pTrackingNbr;
                        drHedrow.HDR_CMTS = this.lstRecvSendPoHdrs[0].HDR_CMTS;
                        dtHedTbl.push(drHedrow);
                        if (pDeliverTo != null && pDeliverTo != "") {
                            dtItemSet = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.DELIVER_TO == pDeliverTo; }).ToArray();
                        }
                        else {
                            dtItemSet = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.DELIVER_TO == "" || x.DELIVER_TO == null; }).ToArray();
                        }
                        if (pLocation != null && pLocation != "") {
                            dtItemSet = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.DELIVER_TO == pDeliverTo && x.INVENTORY_ITEM == invItemType && x.LOCATION == pLocation && x.QTY != null && x.QTY.toString() != ""; }).ToArray(); //LINE_QTY //.replace("'", "''")
                        }
                        else {
                            dtItemSet = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return (x.DELIVER_TO == "" || x.DELIVER_TO == null) && x.INVENTORY_ITEM == invItemType && (x.LOCATION == "" || x.LOCATION == null) && x.QTY != null && x.QTY.toString() != ""; }).ToArray(); //LINE_QTY
                        }
                        if (dtItemSet != null && dtItemSet.length > 0) {
                            for (i = 0; i < dtItemSet.length; i++) {
                                drItemrow = new vm_recv_sendlineheader_1.VM_RECV_SENDLINEHEADER();
                                if (dtItemSet[i].INV_ITEM_ID != null && dtItemSet[i].INV_ITEM_ID != "") {
                                    if (dtItemSet[i].DESCR && dtItemSet[i].DESCR != "") {
                                        drItemrow.ITEMID_DESC = dtItemSet[i].INV_ITEM_ID.toString() + "-" + dtItemSet[i].DESCR.toString();
                                    }
                                    else {
                                        drItemrow.ITEMID_DESC = dtItemSet[i].INV_ITEM_ID.toString();
                                    }
                                }
                                else {
                                    if (dtItemSet[i].DESCR != null && dtItemSet[i].DESCR != "") {
                                        drItemrow.ITEMID_DESC = dtItemSet[i].DESCR;
                                    }
                                    else {
                                        drItemrow.ITEMID_DESC = "";
                                    }
                                }
                                drItemrow.UNIT_OF_MEASURE = dtItemSet[i].UNIT_OF_MEASURE;
                                drItemrow.RECV_UOM = dtItemSet[i].RECV_UOM;
                                drItemrow.QTY_PO = dtItemSet[i].QTY_PO;
                                if (dtItemSet[i].QTY != null) {
                                    drItemrow.OPENQTY = (dtItemSet[i].QTY_PO) - ((dtItemSet[i].QTY) * (dtItemSet[i].RECV_CONVERSION_RATE)); //LINE_QTY
                                    drItemrow.QTY = dtItemSet[i].QTY; //.LINE_QTY;
                                }
                                else {
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
                        if (!(dtDetails != null && dtDetails.length > 0)) return [3 /*break*/, 7];
                        if (!(pLocation != null && pLocation != "")) return [3 /*break*/, 5];
                        locArray = pLocation.split(",");
                        j = 0;
                        _a.label = 1;
                    case 1:
                        if (!(j < locArray.length)) return [3 /*break*/, 4];
                        if (locArray[j] != null && locArray[j].indexOf("£") > 0) {
                            locData = locArray[j].split("£");
                            if (locData != null && locData.length >= 3) {
                                locID = locData[0];
                                locDesc = locData[2];
                            }
                            else if (locData != null && locData.length >= 2) {
                                locID = locData[0];
                                locDesc = locData[1];
                            }
                        }
                        else {
                            locID = locArray[j];
                            locDesc = "";
                        }
                        if (dtHedTbl.length > 0) {
                            dtHedTbl[0].LOCATION = locID;
                        }
                        dictDataItems = { 'HEADER': dtHedTbl, 'DETAILS': dtDetails };
                        return [4 /*yield*/, this.recvPoNonPoService.printStaionaryReport(dictDataItems, 1).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spnrService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, this.statusCode];
                        }
                        this.blnPrinted = true;
                        _a.label = 3;
                    case 3:
                        j++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        dictDataItems = { 'HEADER': dtHedTbl, 'DETAILS': dtDetails };
                        return [4 /*yield*/, this.recvPoNonPoService.printStaionaryReport(dictDataItems, 1).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spnrService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 6:
                        _a.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, this.statusCode];
                        }
                        this.blnPrinted = true;
                        _a.label = 7;
                    case 7:
                        this.blnPrinted = true;
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                    case 8:
                        ex_34 = _a.sent();
                        this.clientErrorMsg(ex_34, "prepareStationaryInputDataset");
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.poNonPo_RbtnChange = function (recvDetails, blnSelectRdbtn) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var txtPkgs, blnSchedsExist, intScheduleCnt, strRecedQty, strSerialControlled, strLotControlled, strPoQty, txtNoOfBoxes, txtLadg, txtTrkNo, lnkLine, currentdate, extTrkExist, i, i, lblinterLineNbr, i, dtReceiveDetails, strLot, strSerial, lnkLineNbr, lbQtyPO, lnkItemId_2, txtQty, intConverfactor, strUOM, schedCount, strInvItem, strRecallFlag, dtRecallInfo, dr, strComments, dtRecallInfo, dr, lnkItemId, txtQty, strShippedQty, ex_35;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        //this.statusMsgs = [];
                        this.statusCode = -1;
                        txtPkgs = "";
                        blnSchedsExist = false;
                        this.blnFlag = false;
                        intScheduleCnt = 0;
                        strRecedQty = null;
                        strSerialControlled = null;
                        strLotControlled = null;
                        strPoQty = null;
                        txtNoOfBoxes = void 0;
                        if (recvDetails.INV_ITEM_ID != null) {
                            this.hdnItemId = recvDetails.INV_ITEM_ID;
                        }
                        txtLadg = recvDetails.BILL_OF_LADING;
                        txtTrkNo = recvDetails.EXT_TRK_NO;
                        lnkLine = recvDetails.LINE_NBR;
                        if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                            txtNoOfBoxes = recvDetails.NO_OF_BOXES;
                        }
                        else if (this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0) {
                            txtNoOfBoxes = recvDetails.NO_OF_PKGS;
                        }
                        this.txtPkgs = "1";
                        if (!recvDetails.SCHDFLAG) {
                            if (this.txtLading != null && this.txtLading != undefined && this.txtLading.length == 0) {
                                if (txtLadg == null || txtLadg == "") {
                                    currentdate = new Date();
                                    txtLadg = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID].toString() + (currentdate.getMonth() + 1) + this.AddZero(currentdate.getDate()) + currentdate.getFullYear() + currentdate.getHours() + currentdate.getMinutes() + currentdate.getSeconds();
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
                        }
                        return [4 /*yield*/, this.checkColumnExist("EXT_TRK_NO", "RECEIVE ITEMS")];
                    case 1:
                        extTrkExist = _a.sent();
                        if (extTrkExist) {
                            if (!this.txtExtTrkIsEditMode) {
                                if (this.txtTrk != null && this.txtTrk != undefined && this.txtTrk != "" && this.txtTrk.length == 0) {
                                    if (txtTrkNo == null && txtTrkNo == "") {
                                        txtTrkNo = "";
                                    }
                                    else {
                                        this.txtTrk = txtTrkNo.trim();
                                        txtTrkNo = txtTrkNo.trim();
                                    }
                                }
                                else if (txtTrkNo != null && txtTrkNo != undefined && txtTrkNo != "") {
                                    this.txtTrk = txtTrkNo.trim();
                                    txtTrkNo = txtTrkNo.trim();
                                }
                                else {
                                    if (this.txtTrk != null && this.txtTrk != undefined && this.txtTrk != "") {
                                        txtTrkNo = this.txtTrk;
                                        recvDetails.EXT_TRK_NO = this.txtTrk;
                                    }
                                }
                            }
                        }
                        else {
                            if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                                for (i = 0; i < this.lstRecvSendPoLines.length; i++) {
                                    if (this.lstRecvSendPoLines[i].LINE_NBR == lnkLine && recvDetails.LINE_NBR == lnkLine) {
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
                            }
                            else {
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
                            else if (txtNoOfBoxes != null) {
                                this.txtPkgs = txtNoOfBoxes.toString();
                            }
                            else {
                                //if (true) {//txtNoOfBoxes.Enabled check once
                                if (this.txtPkgs != null && this.txtPkgs != undefined && this.txtPkgs.length > 0) {
                                    txtNoOfBoxes = parseInt(this.txtPkgs);
                                    recvDetails.NO_OF_BOXES = txtNoOfBoxes;
                                }
                                else {
                                    if (this.lstRecvSendPoLines != null) {
                                        txtNoOfBoxes = 1;
                                        recvDetails.NO_OF_BOXES = txtNoOfBoxes;
                                        this.txtPkgs = "1";
                                    }
                                    else {
                                        txtNoOfBoxes = 1;
                                        this.txtPkgs = "1";
                                        recvDetails.NO_OF_BOXES = txtNoOfBoxes;
                                    }
                                }
                                //}
                            }
                        }
                        else {
                            if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                                for (i = 0; i < this.lstRecvSendPoLines.length; i++) {
                                    if (this.lstRecvSendPoLines[i].LINE_NBR == lnkLine && this.grdRecvLinesRbBtnCheck) {
                                        if (this.lstRecvSendPoLines[i].NO_OF_BOXES != null) {
                                            this.txtPkgs = this.lstRecvSendPoLines[i].NO_OF_BOXES.toString();
                                        }
                                    }
                                }
                            }
                            if (this.lstRecvIutItems != null) {
                                lblinterLineNbr = recvDetails.INTERUNIT_LINE;
                                for (i = 0; i < this.lstRecvIutItems.length; i++) {
                                    if (recvDetails.INTERUNIT_LINE == lblinterLineNbr && this.grdRecvLinesRbBtnCheck) {
                                        if (recvDetails.NO_OF_PKGS != null) {
                                            this.txtPkgs = recvDetails.NO_OF_PKGS;
                                        }
                                    }
                                }
                            }
                        }
                        if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                            dtReceiveDetails = this.lstRecvSendPoLines;
                            strLot = recvDetails.LOT_CONTROLLED;
                            this.lotControl = recvDetails.LOT_CONTROLLED;
                            strSerial = recvDetails.SERIAL_CONTROLLED;
                            this.serialControl = recvDetails.SERIAL_CONTROLLED;
                            lnkLineNbr = recvDetails.LINE_NBR;
                            this.schedNbr = recvDetails.SCHED_NBR;
                            lbQtyPO = recvDetails.LINE_PO_QTY;
                            lnkItemId_2 = recvDetails.INV_ITEM_ID;
                            txtQty = recvDetails.QTY;
                            strRecedQty = recvDetails.RECEIVED_QTY;
                            strPoQty = recvDetails.QTY_PO; //LINE_PO_QTY check once Qty
                            intScheduleCnt = recvDetails.SCHED_COUNT;
                            strSerialControlled = recvDetails.SERIAL_CONTROLLED;
                            strLotControlled = recvDetails.LOT_CONTROLLED;
                            intConverfactor = parseInt(recvDetails.CONVERSION_RATE);
                            this.lotSerialConverfactor = parseInt(recvDetails.CONVERSION_RATE);
                            strUOM = recvDetails.UNIT_OF_MEASURE;
                            schedCount = recvDetails.SCHED_COUNT;
                            strInvItem = recvDetails.INVENTORY_ITEM;
                            this.hdnItemType = strInvItem;
                            this.hdnInvItemId = lnkItemId_2;
                            this.hdnItmLineNo = lnkLineNbr;
                            this.hdnItmSchedLineNo = parseInt(this.schedNbr);
                            this.strTotalQty = (parseInt(strPoQty) - parseInt(strRecedQty)).toString();
                            strRecallFlag = recvDetails.RECAL_FLAG.toString();
                            if (strRecallFlag == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                dtRecallInfo = this.lstReCallInfo;
                                if (dtRecallInfo != null && dtRecallInfo.length > 0) {
                                    dr = dtRecallInfo.filter(function (x) { return x.ITEM_ID == lnkItemId_2 && (x.LOT_NO == "" || x.LOT_NO == null) && (x.SERIAL_NO == "" || x.SERIAL_NO == null); });
                                    if (dr != null && dr.length > 0) {
                                        recvDetails.QTY = "";
                                        recvDetails.TXTQTYFLAG = true;
                                        this.statusMsgs = [];
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "This Item " + lnkItemId_2 + " is on recall. The item cannot be received." });
                                        return [2 /*return*/];
                                    }
                                }
                            }
                            //Comments Checking
                            if (this.gDisplayComments == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() &&
                                recvDetails.COMMENTS != null && recvDetails.COMMENTS != "") {
                                strComments = recvDetails.COMMENTS;
                                if (strComments != "") {
                                    strComments = "Comments: \\n \\n " + strComments;
                                    if (this.gstrPrevComments != strComments) {
                                        this.statusMsgs = [];
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: strComments.toString() });
                                        this.gstrPrevComments = strComments;
                                    }
                                }
                            }
                            if (schedCount == "1" && (recvDetails.CARRIER_ID == null || recvDetails.CARRIER_ID == "Select Carrier" || recvDetails.CARRIER_ID == "" || txtLadg == "")) {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Carrier and Lading are mandatory" });
                                this.selecstedRow = null;
                                setTimeout(function () { _this.selectedINVITEMID = ""; }, 1);
                                setTimeout(function () { recvDetails.RBFlAG = false; }, 2);
                                this.grdRecvLinesRbBtnCheck = false;
                                this.lstRecvSendPoLines.forEach(function (x) { return x.RBFlAG = false; });
                                blnSelectRdbtn = true;
                                return [2 /*return*/];
                            }
                            else {
                                setTimeout(function () {
                                    recvDetails.RBFlAG = true;
                                    var itemtxtRecvQty = document.getElementById('txtRecvQty' + _this.selectedINVITEMID);
                                    if (itemtxtRecvQty != null) {
                                        itemtxtRecvQty.focus();
                                    }
                                }, 2);
                            }
                            this.txtSerchItemId = lnkItemId_2;
                            this.hdnItemId = this.txtSerchItemId;
                            this.gstrlnkitemid = recvDetails.INV_ITEM_ID;
                            this.gstrlnklineNbr = lnkLineNbr.toString();
                            if (this.gStrLotSerial != AtParEnums_1.Enable_Lot_Serial_Tracking[AtParEnums_1.Enable_Lot_Serial_Tracking.None].toString()) {
                                if (this.gStrLotSerial == AtParEnums_1.Enable_Lot_Serial_Tracking[AtParEnums_1.Enable_Lot_Serial_Tracking.MMIS].toString()) {
                                    if (strLot == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || strSerial == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                        this.btnLotSerialDisable = false;
                                        recvDetails.TXTQTYFLAG = true;
                                        recvDetails.DDLUOMFLAG = true;
                                    }
                                    else {
                                        this.btnLotSerialDisable = true;
                                        recvDetails.TXTQTYFLAG = false;
                                    }
                                }
                                else if (this.gStrLotSerial == AtParEnums_1.Enable_Lot_Serial_Tracking[AtParEnums_1.Enable_Lot_Serial_Tracking.AtPar].toString()) {
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
                                if ((strLot == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || strSerial == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) &&
                                    this.gStrLotSerial == AtParEnums_1.Enable_Lot_Serial_Tracking[AtParEnums_1.Enable_Lot_Serial_Tracking.MMIS].toString()) {
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
                                //do this
                                this.blnlnkItemIdEnable = true;
                                this.blnlnkLineNbrEnable = true;
                            }
                            //if ((strLot == YesNo_Enum[YesNo_Enum.Y].toString() && strSerial == YesNo_Enum[YesNo_Enum.Y].toString()) &&
                            //    this.gStrLotSerial == Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking.MMIS].toString()) {
                            //    this.btnPntrDetailsDisable = true;
                            //    this.btnLotSerialDisable = true;
                            //}
                            if (lnkItemId_2 != null) {
                                if (lnkItemId_2 == "") {
                                    this.blnFlag = true;
                                }
                                //Do not default Lines which have schedules
                                if (strSerialControlled == null || strSerialControlled == "") {
                                    strSerialControlled = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                                }
                                if (strLotControlled == null && strLotControlled == "") {
                                    strLotControlled = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                                }
                                if (intScheduleCnt == 1 && (this.gStrLotSerial == AtParEnums_1.Enable_Lot_Serial_Tracking[AtParEnums_1.Enable_Lot_Serial_Tracking.None].toString() ||
                                    !(strSerialControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || strLotControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()))) {
                                    this.blnFlag = true;
                                    //Recall Checking
                                    if (strRecallFlag == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                        dtRecallInfo = this.lstReCallInfo;
                                        if (dtRecallInfo != null && dtRecallInfo.length > 0) {
                                            dr = dtRecallInfo.filter(function (x) { return x.ITEM_ID == lnkItemId_2 && (x.LOT_NO == "" || x.LOT_NO == null) && (x.SERIAL_NO == "" || x.SERIAL_NO == null); });
                                            if (dr != null && dr.length > 0) {
                                                this.blnFlag = false;
                                            }
                                        }
                                    }
                                }
                                else if (intScheduleCnt > 1) {
                                    recvDetails.SCHDFLAG = true;
                                    this.blnSchedsExist = true;
                                }
                                else if (strSerialControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || strLotControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                    this.blnSchedsExist = true;
                                    recvDetails.SCHDFLAG = true;
                                }
                                if (this.blnSchedsExist && this.blnReceiveall) {
                                    this.blnReceiveall = false;
                                    this.statusMsgs = [];
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Lines with schedules or lot serial have not been updated" });
                                }
                            }
                            recvDetails.NO_OF_BOXES = txtNoOfBoxes;
                            if (this.blnFlag == true && (txtQty == null || txtQty == "")) {
                                if (this.gblnASNPO == false && this.gStrDefaultInput == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
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
                        else if (this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0) {
                            if (recvDetails.CARRIER_ID != "Select Carrier" && recvDetails.CARRIER_ID != null && recvDetails.CARRIER_ID != "") {
                                this.selectedDdlCarrier = recvDetails.CARRIER_ID;
                            }
                            else {
                                if (this.selectedDdlCarrier != "Select Carrier") {
                                    recvDetails.CARRIER_ID = this.selectedDdlCarrier;
                                }
                            }
                            lnkItemId = recvDetails.ITEM_ID;
                            txtQty = recvDetails.QTY;
                            strShippedQty = recvDetails.QTY_SHIPPED;
                            strSerialControlled = recvDetails.SERIAL_CONTROLLED;
                            strRecedQty = recvDetails.QTY_RECEIVED;
                            if (recvDetails.CARRIER_ID == null || recvDetails.CARRIER_ID == "Select Carrier" || recvDetails.CARRIER_ID == "" || txtLadg == "") {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Carrier and Lading are mandatory" });
                                this.selecstedRow = null;
                                setTimeout(function () { _this.selectedINVITEMID = ""; }, 1);
                                this.grdRecvLinesRbBtnCheck = false;
                                setTimeout(function () { recvDetails.RBFlAG = false; }, 2);
                                blnSelectRdbtn = true;
                                this.lstRecvIutItems.forEach(function (x) { return x.RBFlAG = false; });
                                return [2 /*return*/];
                            }
                            else {
                                setTimeout(function () {
                                    recvDetails.RBFlAG = true;
                                    var itemtxtRecvQty = document.getElementById('txtRecvQty' + _this.selectedINVITEMID);
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
                            if (txtQty == "" && this.gStrDefaultInput == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                if (parseInt(strRecedQty) <= parseInt(strShippedQty)) {
                                    if (strSerialControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                        if ((parseInt(strShippedQty) - parseInt(strRecedQty)) != 0) {
                                            txtQty = "1";
                                            recvDetails.QTY = txtQty;
                                        }
                                        else {
                                            txtQty = (parseInt(strShippedQty) - parseInt(strRecedQty));
                                            recvDetails.QTY = txtQty;
                                        }
                                    }
                                    else {
                                        txtQty.Text = (parseInt(strShippedQty) - parseInt(strRecedQty));
                                        recvDetails.QTY = txtQty;
                                    }
                                }
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_35 = _a.sent();
                        this.clientErrorMsg(ex_35, "poNonPo_RbtnChange");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.updateDs = function (growPage, recvData) {
        return __awaiter(this, void 0, void 0, function () {
            var dtIutItems, txtNoOfBoxes, lnkItemId, lbInterUnit, txtQty, txtLadg, strSerialControlled, dblItemTolPer, dblLineShippedQty, dblLineRecdQty, strUOMVal, arrSelectedConf, strSelectedUOMFact, arrUOM, arrConf, intRowSel, lblPOQty, txtNoOfBoxes, lnkItemId, txtQty, txtLadg, lnkLineNbr, schdNbr, txttrkno, i, extTrkExist, i, extTrkExist, ex_36;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 12, , 13]);
                        this.lstRecvSendData = [];
                        this.statusCode = -1;
                        if (!(growPage == "ASP.mt_recv_po_or_nonpo_receipts_aspx")) return [3 /*break*/, 11];
                        if (!(this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0)) return [3 /*break*/, 1];
                        dtIutItems = this.lstRecvIutItems.filter(function (x) { return x.ITEM_ID == recvData.ITEM_ID; })[0];
                        txtNoOfBoxes = recvData.NO_OF_PKGS;
                        lnkItemId = recvData.ITEM_ID;
                        lbInterUnit = recvData.INTERUNIT_LINE;
                        txtQty = recvData.QTY;
                        txtLadg = recvData.BILL_OF_LADING;
                        strSerialControlled = dtIutItems.SERIAL_CONTROLLED;
                        dblItemTolPer = 0;
                        dblLineShippedQty = parseInt(dtIutItems.QTY_SHIPPED);
                        dblLineRecdQty = 0;
                        if (dtIutItems.QTY_RECEIVED != null && dtIutItems.QTY_RECEIVED != "") {
                            dblLineRecdQty = parseInt(dtIutItems.QTY_RECEIVED);
                        }
                        if (txtQty != null && txtQty != "") {
                            if (strSerialControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                if (parseInt(txtQty) > 1) {
                                    this.statusMsgs = [];
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Qty cannot be greater than 1 for serial item" });
                                    txtQty = "";
                                    recvData.QTY = "";
                                    setTimeout(function () {
                                        var itemtxtRecvQty = document.getElementById('txtRecvQty' + recvData.INV_ITEM_ID);
                                        if (itemtxtRecvQty != null) {
                                            itemtxtRecvQty.focus();
                                        }
                                    }, 2);
                                    return [2 /*return*/, true];
                                }
                            }
                            if (parseInt(txtQty) > (dblLineShippedQty + (dblLineShippedQty * dblItemTolPer / 100) - dblLineRecdQty) &&
                                this.gStrAllowExcessQty == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString()) {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Transfer qty should not be greater than Ordered Qty" });
                                txtQty = "";
                                recvData.QTY = "";
                                setTimeout(function () {
                                    var itemtxtRecvQty = document.getElementById('txtRecvQty' + recvData.INV_ITEM_ID);
                                    if (itemtxtRecvQty != null) {
                                        itemtxtRecvQty.focus();
                                    }
                                }, 2);
                                return [2 /*return*/];
                            }
                        }
                        if (txtQty == "" && this.grdRecvLinesRbBtnCheck == true) {
                            if (strSerialControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
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
                                    }
                                    else {
                                        dtIutItems.NO_OF_PKGS = "";
                                    }
                                }
                                else {
                                    if (dtIutItems.NO_OF_PKGS != null && dtIutItems.NO_OF_PKGS != "") {
                                        dtIutItems.NO_OF_PKGS = dtIutItems.NO_OF_PKGS;
                                    }
                                    else {
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
                        return [3 /*break*/, 11];
                    case 1:
                        strUOMVal = "";
                        arrSelectedConf = [];
                        strSelectedUOMFact = "";
                        arrUOM = [];
                        arrConf = [];
                        intRowSel = 0;
                        lblPOQty = recvData.LINE_PO_QTY;
                        txtNoOfBoxes = recvData.NO_OF_BOXES;
                        lnkItemId = recvData.INV_ITEM_ID;
                        txtQty = recvData.QTY;
                        txtLadg = recvData.BILL_OF_LADING;
                        lnkLineNbr = recvData.LINE_NBR;
                        schdNbr = recvData.SCHED_NBR;
                        txttrkno = recvData.EXT_TRK_NO;
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
                        if (!(this.dtScheduleItems != null && this.dtScheduleItems.length > 0)) return [3 /*break*/, 6];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < this.dtScheduleItems.length)) return [3 /*break*/, 5];
                        if (!(this.dtScheduleItems[i].SCHED_NBR == schdNbr)) return [3 /*break*/, 4];
                        if (!(this.blnlnkItemIdEnable == false || this.blnlnkLineNbrEnable == false)) return [3 /*break*/, 4];
                        if (txtNoOfBoxes != null) {
                            if (txtNoOfBoxes != "") {
                                this.dtScheduleItems[i].NO_OF_BOXES = txtNoOfBoxes;
                            }
                            else {
                                this.dtScheduleItems[i].NO_OF_BOXES = 1;
                            }
                        }
                        else {
                            if (this.grdRecvLinesRbBtnCheck) {
                                if (this.dtScheduleItems[i].NO_OF_BOXES != null) {
                                }
                                else {
                                    this.dtScheduleItems[i].NO_OF_BOXES = parseInt(this.txtPkgs);
                                }
                            }
                        }
                        this.dtScheduleItems[i].LINE_QTY = txtQty;
                        this.dtScheduleItems[i].BILL_OF_LADING = txtLadg;
                        this.dtScheduleItems[i].RECV_UOM = arrUOM[0];
                        this.dtScheduleItems[i].RECV_CONVERSION_RATE = parseInt(strSelectedUOMFact);
                        this.dtScheduleItems[i].RECEIVED_FLAG = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString();
                        return [4 /*yield*/, this.checkColumnExist("EXT_TRK_NO", "RECEIVE BY SCHEDULE")];
                    case 3:
                        extTrkExist = _a.sent();
                        if (extTrkExist) {
                            if (this.grdRecvLinesRbBtnCheck) {
                                if (txttrkno != null && txttrkno != "") {
                                    this.dtScheduleItems[i].EXT_TRK_NO = txttrkno.trim();
                                }
                                else {
                                    this.dtScheduleItems[i].EXT_TRK_NO = this.txtSchdExTrk;
                                }
                            }
                            else {
                                if (this.dtScheduleItems[i].EXT_TRK_NO != "") {
                                    this.dtScheduleItems[i].EXT_TRK_NO = this.dtScheduleItems[i].EXT_TRK_NO;
                                }
                                else {
                                    this.dtScheduleItems[i].EXT_TRK_NO = "";
                                }
                            }
                        }
                        else {
                            if (this.grdRecvLinesRbBtnCheck) {
                                if (this.dtScheduleItems[i].EXT_TRK_NO != "") {
                                    this.dtScheduleItems[i].EXT_TRK_NO = this.dtScheduleItems[i].EXT_TRK_NO;
                                }
                                else {
                                    this.dtScheduleItems[i].EXT_TRK_NO = this.txtSchdExTrk;
                                }
                            }
                            else {
                                if (this.dtScheduleItems[i].EXT_TRK_NO != "") {
                                    this.dtScheduleItems[i].EXT_TRK_NO = this.dtScheduleItems[i].EXT_TRK_NO;
                                }
                                else {
                                    this.dtScheduleItems[i].EXT_TRK_NO = "";
                                }
                            }
                        }
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        this.lstRecvSendData = recvData;
                        return [3 /*break*/, 11];
                    case 6:
                        i = 0;
                        _a.label = 7;
                    case 7:
                        if (!(i < this.lstRecvSendPoLines.length)) return [3 /*break*/, 10];
                        if (!(this.lstRecvSendPoLines[i].LINE_NBR == lnkLineNbr)) return [3 /*break*/, 9];
                        if (!(this.blnlnkItemIdEnable == false || this.blnlnkLineNbrEnable == false)) return [3 /*break*/, 9];
                        if (txtNoOfBoxes != null) {
                            if (txtNoOfBoxes != "") {
                                this.lstRecvSendPoLines[i].NO_OF_BOXES = txtNoOfBoxes;
                            }
                            else {
                                this.lstRecvSendPoLines[i].NO_OF_BOXES = 1;
                            }
                        }
                        else {
                            if (this.grdRecvLinesRbBtnCheck) {
                                if (this.lstRecvSendPoLines[i].NO_OF_BOXES != null) {
                                }
                                else {
                                    this.lstRecvSendPoLines[i].NO_OF_BOXES = parseInt(this.txtPkgs);
                                }
                            }
                        }
                        this.lstRecvSendPoLines[i].LINE_QTY = txtQty;
                        // this.lstRecvSendPoLines[i].QTY = txtQty;
                        this.lstRecvSendPoLines[i].BILL_OF_LADING = txtLadg;
                        this.lstRecvSendPoLines[i].RECV_UOM = arrUOM[0];
                        this.lstRecvSendPoLines[i].RECV_CONVERSION_RATE = parseInt(strSelectedUOMFact);
                        this.lstRecvSendPoLines[i].RECEIVED_FLAG = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString();
                        return [4 /*yield*/, this.checkColumnExist("EXT_TRK_NO", "RECEIVE ITEMS")];
                    case 8:
                        extTrkExist = _a.sent();
                        if (extTrkExist) {
                            if (this.grdRecvLinesRbBtnCheck) {
                                if (txttrkno != null && txttrkno != "") {
                                    this.lstRecvSendPoLines[i].EXT_TRK_NO = txttrkno.trim();
                                }
                                else {
                                    this.lstRecvSendPoLines[i].EXT_TRK_NO = this.txtTrk;
                                }
                            }
                            else {
                                if (this.lstRecvSendPoLines[i].EXT_TRK_NO != "") {
                                    this.lstRecvSendPoLines[i].EXT_TRK_NO = this.lstRecvSendPoLines[i].EXT_TRK_NO;
                                }
                                else {
                                    this.lstRecvSendPoLines[i].EXT_TRK_NO = "";
                                }
                            }
                        }
                        else {
                            if (this.grdRecvLinesRbBtnCheck) {
                                if (this.lstRecvSendPoLines[i].EXT_TRK_NO != "") {
                                    this.lstRecvSendPoLines[i].EXT_TRK_NO = this.lstRecvSendPoLines[i].EXT_TRK_NO;
                                }
                                else {
                                    this.lstRecvSendPoLines[i].EXT_TRK_NO = this.txtTrk;
                                }
                            }
                            else {
                                if (this.lstRecvSendPoLines[i].EXT_TRK_NO != "") {
                                    this.lstRecvSendPoLines[i].EXT_TRK_NO = this.lstRecvSendPoLines[i].EXT_TRK_NO;
                                }
                                else {
                                    this.lstRecvSendPoLines[i].EXT_TRK_NO = "";
                                }
                            }
                        }
                        _a.label = 9;
                    case 9:
                        i++;
                        return [3 /*break*/, 7];
                    case 10:
                        this.lstRecvSendData = recvData;
                        _a.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        ex_36 = _a.sent();
                        this.clientErrorMsg(ex_36, "updateDs");
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.changedata = function (ctrl, recvData) {
        return __awaiter(this, void 0, void 0, function () {
            var strVendorItemId, strUpcId, strMfgItemId, strGTIN, lbVendorItemId, lbCustItemId, blnflg, blnNoItem, i, lineNbr, i_6, i_7, i_8, lblinterLineNbr, i_9, selectedCarrier, txttrkno, lineNbr, i_10, i_11, blnSelectRdbtn, ex_37;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        this.statusMsgs = [];
                        this.statusCode = -1;
                        strVendorItemId = "";
                        strUpcId = "";
                        strMfgItemId = "";
                        strGTIN = "";
                        lbVendorItemId = "";
                        lbCustItemId = "";
                        blnflg = false;
                        blnNoItem = false;
                        if (!(recvData != null && recvData.length > 0)) return [3 /*break*/, 6];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < recvData.length)) return [3 /*break*/, 5];
                        if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                            this.lnkItemId = recvData[i].INV_ITEM_ID;
                            this.txtNoOfBoxes = recvData[i].NO_OF_BOXES;
                            this.txtQty = recvData[i].QTY; //.LINE_QTY;
                            lbVendorItemId = recvData[i].ITM_ID_VNDR;
                            lbCustItemId = recvData[i].CUST_ITEM_NO;
                        }
                        else if (this.lstRecvIutItems != null) {
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
                            lineNbr = recvData[i].LINE_NBR;
                            if (this.txtNoOfBoxes != "") {
                                if (this.txtPkgsIsReadonly == false && this.grdRecvLinesRbBtnCheck) {
                                    for (i_6 = 0; i_6 < this.lstRecvSendPoLines.length; i_6++) {
                                        if (this.lstRecvSendPoLines[i_6].LINE_NBR == recvData[i_6].LINE_NBR) {
                                            this.lstRecvSendPoLines[i_6].NO_OF_BOXES = parseInt(this.txtPkgs);
                                        }
                                    }
                                    if (this.txtPkgs.trim().length == 0) {
                                        this.txtNoOfBoxes = "1";
                                    }
                                    else {
                                        this.txtNoOfBoxes = this.txtPkgs;
                                    }
                                }
                            }
                            else if (this.txtNoOfBoxes != "") {
                                if (this.txtPkgsIsReadonly == false && this.grdRecvLinesRbBtnCheck) {
                                    for (i_7 = 0; i_7 < this.lstRecvIutItems.length; i_7++) {
                                        if (this.lstRecvIutItems[i_7].INTERUNIT_LINE == recvData[i_7].INTERUNIT_LINE &&
                                            this.lstRecvIutItems[i_7].ITEM_ID == this.lnkItemId) {
                                            this.lstRecvIutItems[i_7].NO_OF_PKGS = this.txtPkgs;
                                        }
                                    }
                                    if (this.txtPkgs.trim().length == 0) {
                                        this.txtNoOfBoxes = " ";
                                    }
                                    else {
                                        this.txtNoOfBoxes = this.txtPkgs;
                                    }
                                }
                            }
                            else {
                                if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                                    if (this.grdRecvLinesRbBtnCheck) {
                                        for (i_8 = 0; i_8 < this.lstRecvSendPoLines.length; i_8++) {
                                            if (this.lstRecvSendPoLines[i_8].LINE_NBR == lineNbr) {
                                                this.lstRecvSendPoLines[i_8].NO_OF_BOXES = parseInt(this.txtPkgs);
                                            }
                                        }
                                    }
                                }
                                if (this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0) {
                                    lblinterLineNbr = recvData[i].INTERUNIT_LINE;
                                    if (this.grdRecvLinesRbBtnCheck) {
                                        for (i_9 = 0; i_9 < this.lstRecvIutItems.length; i_9++) {
                                            if (this.lstRecvIutItems[i_9].INTERUNIT_LINE == lblinterLineNbr && this.lstRecvIutItems[i_9].ITEM_ID == this.lnkItemId) {
                                                this.lstRecvIutItems[i_9].NO_OF_PKGS = this.txtPkgs;
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
                            selectedCarrier = this.selectedDdlCarrier;
                            if (this.selectedDdlCarrier != "" && this.recvGrdCarrierEnable && this.grdRecvLinesRbBtnCheck) {
                                recvData[i].CARRIER_ID = this.selectedDdlCarrier;
                            }
                        }
                        if (ctrl == "Lading") {
                            this.txtLadg = recvData[i].BILL_OF_LADING;
                            if (this.grdRecvLinesRbBtnCheck) {
                                if (this.txtLading.length == 0) {
                                    this.txtLadg = "";
                                }
                                else {
                                    this.txtLadg = this.txtLading;
                                }
                            }
                        }
                        if (ctrl == "ExtTrkno") {
                            txttrkno = recvData[i].EXT_TRK_NO;
                            lineNbr = recvData[i].LINE_NBR;
                            if (txttrkno != null) {
                                if (this.grdRecvLinesRbBtnCheck) {
                                    for (i_10 = 0; i_10 < this.lstRecvSendPoLines.length; i_10++) {
                                        if (this.lstRecvSendPoLines[i_10].LINE_NBR == lineNbr) {
                                            this.lstRecvSendPoLines[i_10].EXT_TRK_NO = this.txtTrk;
                                        }
                                    }
                                    if (this.txtTrk.length == 0) {
                                        txttrkno = " ";
                                    }
                                    else {
                                        txttrkno = this.txtTrk;
                                    }
                                }
                            }
                            else {
                                if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                                    if (this.grdRecvLinesRbBtnCheck) {
                                        for (i_11 = 0; i_11 < this.lstRecvSendPoLines.length; i_11++) {
                                            if (this.lstRecvSendPoLines[i_11].LINE_NBR == lineNbr) {
                                                this.lstRecvSendPoLines[i_11].EXT_TRK_NO = this.txtTrk;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (!(ctrl == "Search")) return [3 /*break*/, 4];
                        this.grdRecvLinesRbBtnCheck = false;
                        recvData[i].RBFlAG = false;
                        if (this.hdnItemId != "") {
                            this.txtSerchItemId = this.hdnItemId;
                        }
                        if (!(this.txtSerchItemId != "")) return [3 /*break*/, 4];
                        if (this.lnkItemId == this.txtSerchItemId) {
                            blnflg = true;
                            blnNoItem = true;
                        }
                        else if (strGTIN != null && strGTIN == this.txtSerchItemId) {
                            blnflg = true;
                            blnNoItem = true;
                        }
                        else if (strMfgItemId != null && strMfgItemId == this.txtSerchItemId) {
                            blnflg = true;
                            blnNoItem = true;
                        }
                        else if (lbCustItemId != null && lbCustItemId == this.txtSerchItemId) {
                            blnflg = true;
                            blnNoItem = true;
                        }
                        else if (strUpcId != null && strUpcId == this.txtSerchItemId) {
                            blnflg = true;
                            blnNoItem = true;
                        }
                        else if ((lbVendorItemId != null) && lbVendorItemId == this.txtSerchItemId) {
                            blnflg = true;
                            blnNoItem = true;
                        }
                        else {
                            blnflg = false;
                        }
                        if (!blnflg) return [3 /*break*/, 3];
                        recvData[i].RBFlAG = true;
                        this.hdnItemId = "";
                        blnSelectRdbtn = false;
                        return [4 /*yield*/, this.poNonPo_RbtnChange(recvData[i], blnSelectRdbtn)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        recvData[i].RBFlAG = false;
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5:
                        if (ctrl == "Search") {
                            if (blnNoItem == false) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.txtSerchItemId + ": ItemId not found" });
                                this.hdnItemId = "";
                                this.txtSerchItemId = "";
                                return [2 /*return*/];
                            }
                        }
                        if (ctrl == "Lading") {
                            if (this.txtPkgs == "") {
                                this.txtPkgs = "";
                            }
                            else {
                            }
                        }
                        else if (ctrl == "NoOfBoxes") {
                        }
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        ex_37 = _a.sent();
                        this.clientErrorMsg(ex_37, "changedata");
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.chkItemQty = function (recvData) {
        return __awaiter(this, void 0, void 0, function () {
            var strUOMVal, arrSelectedConf, strSelectedUOMFact, arrUOM, arrConf, dblConvFact, dblFraction, txtGridLading, lbQtyPO, strUOM, dblLineRecdQty, dblItemTolPer, intQty, intPoQty, growPage, chkUpdate, intConverfactor, ddlUOM, strUOM_1, dblLineRecdQty_1, dblItemTolPer_1, lnkItem, lnkItem, fact, rQty, recvQty, intQty_1, intPoQty_1, ex_38;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        this.statusMsgs = [];
                        this.statusCode = -1;
                        strUOMVal = "";
                        arrSelectedConf = [];
                        strSelectedUOMFact = "";
                        arrUOM = [];
                        arrConf = [];
                        dblConvFact = 0;
                        dblFraction = 0;
                        txtGridLading = "";
                        lbQtyPO = "";
                        strUOM = "";
                        dblLineRecdQty = 0;
                        dblItemTolPer = 0;
                        this.txtQty = recvData.QTY;
                        intQty = 0;
                        intPoQty = 0;
                        growPage = "";
                        if (this.schPO == false) {
                            growPage = "ASP.mt_recv_po_or_nonpo_receipts_aspx";
                        }
                        else {
                            growPage = "ASP.mt_recv_Schedule.aspx";
                        }
                        //IUT Qty checking 
                        strUOM = recvData.UNIT_OF_MEASURE;
                        lbQtyPO = recvData.QTY_PO;
                        if (!(this.lstRecvIutItems != undefined && this.lstRecvIutItems != null && this.lstRecvIutItems.length > 0)) return [3 /*break*/, 2];
                        this.ddlGridCarrier = recvData.CARRIER_ID;
                        txtGridLading = recvData.BILL_OF_LADING;
                        this.txtQty = recvData.QTY;
                        if (this.txtQty != "" && (recvData.CARRIER_ID == "Select Carrier" || recvData.CARRIER_ID == "" || recvData.CARRIER_ID == null || txtGridLading == "")) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Carrier and Lading are mandatory" });
                            this.txtQty = "";
                            recvData.QTY = "";
                            recvData.RBFlAG = false;
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.updateDs(growPage, recvData)];
                    case 1:
                        chkUpdate = _a.sent();
                        if (chkUpdate) {
                            return [2 /*return*/, true];
                        }
                        return [3 /*break*/, 5];
                    case 2:
                        intConverfactor = 0;
                        ddlUOM = recvData.UNIT_OF_MEASURE;
                        txtGridLading = recvData.BILL_OF_LADING;
                        strUOM_1 = "";
                        dblLineRecdQty_1 = 0;
                        dblItemTolPer_1 = 0;
                        if (growPage == "ASP.mt_recv_po_or_nonpo_receipts_aspx") {
                            if (recvData.CONVERSION_RATE != null && recvData.CONVERSION_RATE != "") {
                                intConverfactor = parseInt(recvData.CONVERSION_RATE);
                            }
                            this.mStandardConversionRate = recvData.CONVERSION_RATE.toString();
                            if (recvData.RECEIVED_QTY != null && recvData.RECEIVED_QTY != "") {
                                dblLineRecdQty_1 = parseInt(recvData.RECEIVED_QTY);
                            }
                            if (recvData.QTY_RECV_TOL_PCT != null && recvData.QTY_RECV_TOL_PCT != "") {
                                dblItemTolPer_1 = parseInt(recvData.QTY_RECV_TOL_PCT);
                            }
                            this.txtQty = recvData.QTY; //.LINE_QTY;
                            lnkItem = recvData.INV_ITEM_ID;
                            if (this.txtQty != "" && (recvData.CARRIER_ID == "" || recvData.CARRIER_ID == "Select Carrier" || recvData.CARRIER_ID == null || txtGridLading == "")) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Carrier and Lading are mandatory" });
                                this.txtQty = "";
                                recvData.QTY = "";
                                recvData.RBFlAG = false;
                                return [2 /*return*/];
                            }
                        }
                        else {
                            this.txtQty = recvData.QTY;
                            lnkItem = recvData.INV_ITEM_ID;
                            fact = this.lstRecvSendPoLines.filter(function (x) { return x.INV_ITEM_ID == recvData.INV_ITEM_ID && x.LINE_NBR == recvData.LINE_NBR; });
                            if (fact != null && fact.length > 0) {
                                if (fact[0].CONVERSION_RATE !== null || fact[0].CONVERSION_RATE != undefined) {
                                    intConverfactor = fact[0].CONVERSION_RATE;
                                }
                            }
                            rQty = this.dtScheduleItems.filter(function (x) { return x.RECEIVED_QTY == recvData.RECEIVED_QTY; });
                            if (rQty.length > 0) {
                                if (rQty[0].RECEIVED_QTY !== null || rQty[0].RECEIVED_QTY != undefined) {
                                    dblLineRecdQty_1 = rQty[0].RECEIVED_QTY;
                                }
                            }
                            recvQty = this.dtScheduleItems.filter(function (x) { return x.QTY_RECV_TOL_PCT == recvData.QTY_RECV_TOL_PCT; });
                            if (recvQty.length > 0) {
                                if (recvQty[0].QTY_RECV_TOL_PCT !== null || recvQty[0].QTY_RECV_TOL_PCT != undefined) {
                                    dblLineRecdQty_1 = recvQty[0].QTY_RECV_TOL_PCT;
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
                            strUOM_1 = fact[0].UNIT_OF_MEASURE;
                            if (this.txtQty != "" && (recvData.CARRIER_ID == "" || recvData.CARRIER_ID == "Select Carrier" || recvData.CARRIER_ID == null || txtGridLading == "")) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Carrier and Lading are mandatory" });
                                this.txtQty = "";
                                recvData.QTY = "";
                                recvData.RBFlAG = false;
                                return [2 /*return*/];
                            }
                        }
                        if (this.txtQty != "" && this.gStrAllowExcessQty == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString()) {
                            intQty_1 = parseInt(this.txtQty);
                            intPoQty_1 = parseInt(lbQtyPO);
                            strUOMVal = recvData.SELECTEDUOM; //check once  recvData.DDLUOMS[0].value;
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
                                }
                                else {
                                    arrSelectedConf = arrConf[0].split("/");
                                    strSelectedUOMFact = (parseInt(arrSelectedConf[0]) / parseInt(arrSelectedConf[1])).toString();
                                }
                            }
                            else {
                                strSelectedUOMFact = arrConf[0];
                            }
                            if (arrUOM[0] != strUOM_1) {
                                dblConvFact = parseInt(strSelectedUOMFact);
                                if (this.gStrAltUOMDisplay == this.gRecv_StandardUOM) {
                                    if (strUOM_1 == arrUOM[0]) {
                                        if (arrUOM[0] == this.standardUOM) {
                                            if (parseInt(this.txtQty) > (parseInt(lbQtyPO) + (parseInt(lbQtyPO) * dblItemTolPer_1 / 100) - dblLineRecdQty_1)) {
                                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Receive quantity cannot be greater than open quantity" });
                                                this.txtQty = "";
                                                recvData.QTY = "";
                                                setTimeout(function () {
                                                    var itemtxtRecvQty = document.getElementById('txtRecvQty' + recvData.INV_ITEM_ID);
                                                    if (itemtxtRecvQty != null) {
                                                        itemtxtRecvQty.focus();
                                                    }
                                                }, 1);
                                                return [2 /*return*/];
                                            }
                                        }
                                        else {
                                            dblConvFact = parseInt(strSelectedUOMFact) / parseInt(this.mStandardConversionRate);
                                            dblFraction = parseInt(this.txtQty) * dblConvFact;
                                            if (parseInt(lbQtyPO) < dblFraction) {
                                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Receive quantity cannot be greater than open quantity" });
                                                this.txtQty = "";
                                                recvData.QTY = "";
                                                setTimeout(function () {
                                                    var itemtxtRecvQty = document.getElementById('txtRecvQty' + recvData.INV_ITEM_ID);
                                                    if (itemtxtRecvQty != null) {
                                                        itemtxtRecvQty.focus();
                                                    }
                                                }, 1);
                                                return [2 /*return*/];
                                            }
                                        }
                                    }
                                    else {
                                        dblConvFact = parseInt(strSelectedUOMFact) / parseInt(this.mStandardConversionRate);
                                        dblFraction = (parseInt(this.txtQty) * dblConvFact);
                                        if (parseInt(lbQtyPO) < dblFraction) {
                                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Receive quantity cannot be greater than open quantity" });
                                            this.txtQty = "";
                                            recvData.QTY = "";
                                            setTimeout(function () {
                                                var itemtxtRecvQty = document.getElementById('txtRecvQty' + recvData.INV_ITEM_ID);
                                                if (itemtxtRecvQty != null) {
                                                    itemtxtRecvQty.focus();
                                                }
                                            }, 1);
                                            return [2 /*return*/];
                                        }
                                    }
                                }
                                else if (this.gStrAltUOMDisplay == this.gRecv_PoUOM) {
                                    if (arrUOM[0] == this.gPOUOM) {
                                        if (parseInt(this.txtQty) > (parseInt(lbQtyPO) + (parseInt(lbQtyPO) * dblItemTolPer_1 / 100) - dblLineRecdQty_1)) {
                                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Receive quantity cannot be greater than open quantity" });
                                            this.txtQty = "";
                                            recvData.QTY = "";
                                            setTimeout(function () {
                                                var itemtxtRecvQty = document.getElementById('txtRecvQty' + recvData.INV_ITEM_ID);
                                                if (itemtxtRecvQty != null) {
                                                    itemtxtRecvQty.focus();
                                                }
                                            }, 1);
                                            return [2 /*return*/];
                                        }
                                    }
                                    else {
                                        dblConvFact = parseInt(strSelectedUOMFact) / parseInt(this.gPOUOMConversionRate);
                                        dblFraction = parseInt(this.txtQty) * dblConvFact;
                                        if (parseInt(lbQtyPO) < dblFraction) {
                                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Receive quantity cannot be greater than open quantity" });
                                            this.txtQty = "";
                                            setTimeout(function () {
                                                var itemtxtRecvQty = document.getElementById('txtRecvQty' + recvData.INV_ITEM_ID);
                                                if (itemtxtRecvQty != null) {
                                                    itemtxtRecvQty.focus();
                                                }
                                            }, 1);
                                            return [2 /*return*/];
                                        }
                                    }
                                }
                            }
                            else {
                                if (parseInt(this.txtQty) > (parseInt(lbQtyPO) + (parseInt(lbQtyPO) * dblItemTolPer_1 / 100) - dblLineRecdQty_1)) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Receive quantity cannot be greater than open quantity" });
                                    this.txtQty = "";
                                    recvData.QTY = "";
                                    setTimeout(function () {
                                        var itemtxtRecvQty = document.getElementById('txtRecvQty' + recvData.INV_ITEM_ID);
                                        if (itemtxtRecvQty != null) {
                                            itemtxtRecvQty.focus();
                                        }
                                    }, 1);
                                    return [2 /*return*/];
                                }
                            }
                        }
                        else {
                            this.txtQty = "";
                        }
                        return [4 /*yield*/, this.updateDs("ASP.mt_recv_po_or_nonpo_receipts_aspx", recvData)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.updateTextBox(recvData, this.gstrlnkitemid, this.gstrlnklineNbr)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        ex_38 = _a.sent();
                        this.clientErrorMsg(ex_38, "chkItemQty");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.updateTextBox = function (recvData, strselectitemid, strSelectedLineNbr) {
        return __awaiter(this, void 0, void 0, function () {
            var strLot, strSerial, sch_count, growPage, lnkItemId_3, lnkLineNbr_1, lbSchedNbr_1, strUOM, TxtBxEnable, drow, drAsn, drow, drAsn;
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = [];
                    this.statusCode = -1;
                    strLot = "";
                    strSerial = "";
                    sch_count = "";
                    growPage = "ASP.mt_recv_po_or_nonpo_receipts_aspx";
                    if (this.lstRecvSendPoLines != null && this.lstRecvSendPoLines.length > 0) {
                        if (growPage == "ASP.mt_recv_po_or_nonpo_receipts_aspx") {
                            strLot = recvData.LOT_CONTROLLED;
                            strSerial = recvData.SERIAL_CONTROLLED;
                            sch_count = recvData.SCHED_COUNT;
                            lnkItemId_3 = recvData.INV_ITEM_ID;
                            lnkLineNbr_1 = recvData.LINE_NBR;
                            lbSchedNbr_1 = recvData.SCHED_NBR;
                            strUOM = recvData.UNIT_OF_MEASURE;
                            TxtBxEnable = false;
                            if (TxtBxEnable == false) {
                                drow = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.INVENTORY_ITEM == lnkItemId_3 && x.LINE_NBR == lnkLineNbr_1 && x.SCHED_NBR == parseInt(lbSchedNbr_1) && x.RECEIVED_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString(); }).ToArray();
                                if (drow.length > 0 && drow[0].QTY != null) {
                                    this.txtQty = drow[0].QTY.toString(); //.LINE_QTY.toString();//check once
                                }
                                else {
                                    if (this.gblnASNPO && sch_count == "1") {
                                        drAsn = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.INV_ITEM_ID == lnkItemId_3 && x.LINE_NBR == lnkLineNbr_1 && x.SCHED_NBR == parseInt(lbSchedNbr_1); }).ToArray();
                                        // dtReceiveDetails.Select("INV_ITEM_ID='" + lnkItemId.Text + "' AND LINE_NBR='" + lnkLineNbr.Text + "' AND SCHED_NBR='" + lbSchedNbr.ToString + "' ");
                                        if (drAsn.length > 0) {
                                            if (drAsn[0].ASN_QTY != null && drAsn[0].ASN_QTY != undefined) {
                                                this.txtQty = drAsn[0].ASN_QTY.toString();
                                            }
                                            else {
                                                this.txtQty = "";
                                            }
                                        }
                                    }
                                    else {
                                        this.txtQty = "";
                                    }
                                }
                            }
                            if (this.gStrLotSerial == AtParEnums_1.Enable_Lot_Serial_Tracking[AtParEnums_1.Enable_Lot_Serial_Tracking.AtPar].toString()) {
                                drow = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.INV_ITEM_ID == lnkItemId_3 && x.LINE_NBR == lnkLineNbr_1 && x.SCHED_NBR == parseInt(lbSchedNbr_1) && x.RECEIVED_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString(); }).ToArray();
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
                                }
                                else {
                                    if (this.gblnASNPO && sch_count == "1") {
                                        drAsn = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.INV_ITEM_ID == lnkItemId_3 && x.LINE_NBR == lnkLineNbr_1 && x.SCHED_NBR == parseInt(lbSchedNbr_1); }).ToArray();
                                        //dtReceiveDetails.Select("INV_ITEM_ID='" + lnkItemId.Text + "' AND LINE_NBR='" + lnkLineNbr.Text + "' AND SCHED_NBR='" + lbSchedNbr.ToString + "' ");
                                        if (drAsn.length > 0 && drAsn[0].ASN_QTY != null) {
                                            this.txtQty = drAsn[0].ASN_QTY.toString();
                                        }
                                    }
                                    else {
                                        if ((lnkItemId_3 == strselectitemid || lnkLineNbr_1 == strSelectedLineNbr)) {
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
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.confirmData = function (btn) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = [];
                    this.confirmationService.confirm({
                        message: "Do you want to delete the existing PO/IUT?",
                        accept: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.spnrService.start();
                                        this.hdnConfirmPoDelete = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString();
                                        this.hdnConfirmIUTDelete = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString();
                                        if (!(btn == "posearch")) return [3 /*break*/, 2];
                                        this.recvSearchPos = false;
                                        this.recvIUTSearch = false;
                                        this.tbl = false;
                                        this.lstRecvSendPoLines = [];
                                        this.lstRecvIutItems = [];
                                        return [4 /*yield*/, this.showPoSearchPopup()];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 2:
                                        this.tbl = false;
                                        this.recvSearchPos = false;
                                        this.recvIUTSearch = false;
                                        this.lstRecvSendPoLines = [];
                                        return [4 /*yield*/, this.btnGet_Click()];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4:
                                        this.spnrService.stop();
                                        return [2 /*return*/];
                                }
                            });
                        }); },
                        reject: function () {
                            _this.hdnConfirmPoDelete = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                            _this.hdnConfirmIUTDelete = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                            _this.spnrService.stop();
                        }
                    });
                    this.spnrService.stop();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "confirmData");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.showPoSearchPopup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var shiptoId, searchType, includeASNPos, ex_39;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        shiptoId = "";
                        searchType = "";
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
                        includeASNPos = this.hdnIncludeASNPOs;
                        return [4 /*yield*/, this.poSearchBindDataGrid(shiptoId, searchType, includeASNPos)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_39 = _a.sent();
                        this.clientErrorMsg(ex_39, "showPoSearchPopup");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.poSearchBindDataGrid = function (pShiptoId, pSearchType, pIncASNPOs) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var recvSearchPOEntity, ex_40;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        this.lstRecvSearchPO = [];
                        this.lstSeachItems = [];
                        recvSearchPOEntity = new vm_recv_searchheader_1.VM_RECV_SEARCHHEADER();
                        recvSearchPOEntity.BUSINESS_UNIT = this.selectedBUnits;
                        recvSearchPOEntity.ITEM_ID = this.txtItemId;
                        recvSearchPOEntity.VNDRID = this.txtVendorId;
                        recvSearchPOEntity.VENDOR_NAME = this.txtVendorName;
                        recvSearchPOEntity.SHPTID = pShiptoId;
                        recvSearchPOEntity.FROM_DATE = this.txtFrmDate;
                        recvSearchPOEntity.TO_DATE = this.txtToDate;
                        recvSearchPOEntity.SEARCH_TYPE = pSearchType;
                        recvSearchPOEntity.INCLUDE_ASN_POS = pIncASNPOs; //"Y";
                        this.lstRecvSearchPO.push(recvSearchPOEntity);
                        this.spnrService.start();
                        this.tbl = false;
                        this.page = false;
                        this.recvIUTSearch = false;
                        this.recvSearchPos = true;
                        this.grdRecvSearchPos = false;
                        return [4 /*yield*/, this.recvPoNonPoService.searchHeader(this.lstRecvSearchPO).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                _this.statusMsgs = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataList != null && data.DataList.length > 0) {
                                            _this.lstSeachItems = data.DataList;
                                            for (var i = 0; i < _this.lstSeachItems.length; i++) {
                                                _this.lstSeachItems[i].RBFlAG = false;
                                            }
                                            _this.grdRecvSearchPos = true;
                                        }
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.spnrService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_40 = _a.sent();
                        this.clientErrorMsg(ex_40, "poSearchBindDataGrid");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.confirmIUT = function (cntrl) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = [];
                    this.confirmationService.confirm({
                        message: "Do you want to delete the existing PO/IUT?",
                        accept: function () {
                            _this.spnrService.start();
                            _this.hdnConfirmPoDelete = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString();
                            _this.hdnConfirmIUTDelete = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString();
                            _this.lstRecvIutItems = [];
                            _this.recvSearchPos = false;
                            _this.recvIUTSearch = false;
                            _this.tbl = false;
                            _this.btnGet_Click();
                            _this.spnrService.stop();
                        },
                        reject: function () {
                            _this.hdnConfirmPoDelete = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                            _this.hdnConfirmIUTDelete = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                            _this.spnrService.stop();
                        }
                    });
                    this.spnrService.stop();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "confirmIUT");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.showIUTSearchPopup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var recvIutSearchPOEntity, dateStr, date, dtfrm, frmdt, dtto, todt, ex_41;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        this.lstRecvIUTSearchPO = [];
                        recvIutSearchPOEntity = new VM_IUT_SENDHEADER_1.VM_IUT_SENDHEADER();
                        recvIutSearchPOEntity.BUSINESS_UNIT = this.selectedBUnits;
                        recvIutSearchPOEntity.ITEM_ID = this.txtItemId;
                        dateStr = new Date(new Date()).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                        date = new Date(dateStr);
                        dtfrm = new Date(this.txtFrmDate);
                        frmdt = (dtfrm.getMonth() + 1) + '/' + (dtfrm.getDay() + 1) + '/' + dtfrm.getFullYear();
                        dtto = new Date(this.txtToDate);
                        todt = (dtto.getMonth() + 1) + '/' + (dtto.getDay() + 1) + '/' + dtto.getFullYear();
                        recvIutSearchPOEntity.FROM_DATE = frmdt;
                        recvIutSearchPOEntity.TO_DATE = todt;
                        recvIutSearchPOEntity.PRODUCT = AtParEnums_1.EnumApps.Receiving;
                        this.lstRecvIUTSearchPO.push(recvIutSearchPOEntity);
                        return [4 /*yield*/, this.recvPoNonPoService.searchIUTHeader(this.lstRecvIUTSearchPO).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                _this.statusMsgs = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataList != null && data.DataList.length > 0) {
                                            _this.lstRecvSearchIuts = data.DataList;
                                            for (var i = 0; i < _this.lstRecvSearchIuts.length; i++) {
                                                _this.lstRecvSearchIuts[i].RBFlAG = false;
                                            }
                                            _this.tbl = false;
                                            _this.page = false;
                                            _this.recvSearchPos = false;
                                            _this.recvIUTSearch = true;
                                        }
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_41 = _a.sent();
                        this.clientErrorMsg(ex_41, "showIUTSearchPopup");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.asnPopupshow = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.loadparameters = function (screenName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var drInput, drShipToId, drNonPo, drUOM, drReqShipToId, drdisplayRecdQty, drIUT, drASNdwnd, drASNReceiptStatus, drNonStock, drDueOrPo, drLotSerial, drAltUOM, drAllowExcessQty, drZeroRecWarn, drSearchPOWithOutBU, drDefaultDateRange, drDisplayComments, drIncludeASNPOs, drDefPrinter, drSelPrinter, drPoComments, drPoIDConcacinate, drPrintingOption, drdonotDefaulttrckno, intDelvShiptoIdsCnt, ex_42, ex_43;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        drInput = linq_es5_1.asEnumerable(this.lstProfileApp).Where(function (x) { return x.PARAMETER_ID == "DEFAULT_INPUT"; }).ToArray();
                        if (drInput.length > 0) {
                            this.gStrDefaultInput = drInput[0].PARAMETER_VALUE.toString(); // drInput(0)("PARAMETER_VALUE").ToString();
                        }
                        drShipToId = linq_es5_1.asEnumerable(this.lstProfileApp).Where(function (x) { return x.PARAMETER_ID == "EDIT_SHIPTO_ID"; }).ToArray();
                        if (drShipToId.length > 0) {
                            this.gStrEditShipToId = drShipToId[0].PARAMETER_VALUE.toString();
                        }
                        drNonPo = linq_es5_1.asEnumerable(this.lstProfileApp).Where(function (x) { return x.PARAMETER_ID == "NON_PO_ITEMS_RECEIVE"; }).ToArray();
                        if (drNonPo.length > 0) {
                            this.gStrNonPoItemsReceive = drNonPo[0].PARAMETER_VALUE.toString();
                        }
                        drUOM = linq_es5_1.asEnumerable(this.lstProfileApp).Where(function (x) { return x.PARAMETER_ID == "EDIT_UOM"; }).ToArray();
                        if (drUOM.length > 0) {
                            this.gStrUOMEditFlag = drUOM[0].PARAMETER_VALUE.toString();
                        }
                        else {
                            this.gStrUOMEditFlag = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                        }
                        drReqShipToId = linq_es5_1.asEnumerable(this.lstProfileApp).Where(function (x) { return x.PARAMETER_ID == "REQD_SHIPTO_ID"; }).ToArray();
                        if (drReqShipToId.length > 0) {
                            this.gStrReqdShipToId = drReqShipToId[0].PARAMETER_VALUE.toString();
                        }
                        if (drReqShipToId.length > 0 && this.hdnReqShiptoId != null) {
                            this.hdnReqShiptoId = drReqShipToId[0].PARAMETER_VALUE.toString();
                        }
                        drdisplayRecdQty = linq_es5_1.asEnumerable(this.lstProfileApp).Where(function (x) { return x.PARAMETER_ID == "DISPLAY_RECVD_QTY"; }).ToArray();
                        if (drdisplayRecdQty.length > 0) {
                            this.gStrDisplayReceivedQty = drdisplayRecdQty[0].PARAMETER_VALUE.toString();
                        }
                        drIUT = linq_es5_1.asEnumerable(this.lstProfileApp).Where(function (x) { return x.PARAMETER_ID == "PO_IUT_RECEIVING"; }).ToArray();
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
                        drASNdwnd = linq_es5_1.asEnumerable(this.lstOrgParms).Where(function (x) { return x.PARAMETER_ID == "ASN_DOWNLOAD_BY"; }).ToArray();
                        if (drASNdwnd.length > 0) {
                            this.gStrASNDownload = drASNdwnd[0].PARAMETER_VALUE;
                        }
                        else {
                            this.gStrASNDownload = "";
                        }
                        drASNReceiptStatus = linq_es5_1.asEnumerable(this.lstOrgParms).Where(function (x) { return x.PARAMETER_ID == "ASN_RECEIPT_STATUS"; }).ToArray();
                        if (drASNReceiptStatus.length > 0) {
                            this.gASNReceiptStatus = drASNReceiptStatus[0].PARAMETER_VALUE;
                        }
                        else {
                            this.gASNReceiptStatus = "";
                        }
                        drNonStock = linq_es5_1.asEnumerable(this.lstOrgParms).Where(function (x) { return x.PARAMETER_ID == "NON_STOCK_STORE"; }).ToArray();
                        if (drNonStock.length > 0) {
                            this.gStrNonStockStore = drNonStock[0].PARAMETER_VALUE;
                        }
                        drDueOrPo = linq_es5_1.asEnumerable(this.lstOrgParms).Where(function (x) { return x.PARAMETER_ID == "SEARCH_BY_DUE_OR_PO_DATE"; }).ToArray();
                        if (drDueOrPo.length > 0) {
                            this.gStrSearchType = drDueOrPo[0].PARAMETER_VALUE;
                        }
                        drLotSerial = linq_es5_1.asEnumerable(this.lstOrgParms).Where(function (x) { return x.PARAMETER_ID == "LOT_SERIAL_ENABLED"; }).ToArray();
                        if (drLotSerial.length > 0) {
                            this.gStrLotSerial = drLotSerial[0].PARAMETER_VALUE;
                        }
                        drAltUOM = linq_es5_1.asEnumerable(this.lstOrgParms).Where(function (x) { return x.PARAMETER_ID == "ALT_UOM_DISPLAY_OPT"; }).ToArray();
                        if (drAltUOM.length > 0) {
                            this.gStrAltUOMDisplay = drAltUOM[0].PARAMETER_VALUE;
                        }
                        drAllowExcessQty = linq_es5_1.asEnumerable(this.lstProfileApp).Where(function (x) { return x.PARAMETER_ID == "ALLOW_EXCESS_RECV_QTY"; }).ToArray();
                        if (drAllowExcessQty.length > 0) {
                            this.gStrAllowExcessQty = drAllowExcessQty[0].PARAMETER_VALUE;
                        }
                        drZeroRecWarn = linq_es5_1.asEnumerable(this.lstProfileApp).Where(function (x) { return x.PARAMETER_ID == "ZERO_RECEIPT_WARN"; }).ToArray();
                        if (drZeroRecWarn.length > 0) {
                            this.gStrZeroReceiptWarn = drZeroRecWarn[0].PARAMETER_VALUE;
                        }
                        if (drZeroRecWarn != null && drZeroRecWarn.length > 0) {
                            this.hdnCnfmZroQty = drZeroRecWarn[0].PARAMETER_VALUE;
                        }
                        drSearchPOWithOutBU = linq_es5_1.asEnumerable(this.lstProfileApp).Where(function (x) { return x.PARAMETER_ID == "SEARCH_PO_WITHOUT_BU"; }).ToArray();
                        if (drSearchPOWithOutBU != null && drSearchPOWithOutBU.length > 0) {
                            if ((drSearchPOWithOutBU[0].PARAMETER_VALUE != null || drSearchPOWithOutBU[0].PARAMETER_VALUE != "") && (this.hdnSearchWithOutBU != "")) {
                                this.hdnSearchWithOutBU = drSearchPOWithOutBU[0].PARAMETER_VALUE;
                            }
                        }
                        drDefaultDateRange = linq_es5_1.asEnumerable(this.lstProfileApp).Where(function (x) { return x.PARAMETER_ID == "DEFAULT_DATE_RANGE"; }).ToArray();
                        if (drDefaultDateRange.length > 0) {
                            this.gDefaultDateRange = drDefaultDateRange[0].PARAMETER_VALUE;
                        }
                        drDisplayComments = linq_es5_1.asEnumerable(this.lstProfileApp).Where(function (x) { return x.PARAMETER_ID == "DISPLAY_COMMENTS"; }).ToArray();
                        if (drDisplayComments.length > 0) {
                            this.gDisplayComments = drDisplayComments[0].PARAMETER_VALUE;
                        }
                        drIncludeASNPOs = linq_es5_1.asEnumerable(this.lstProfileApp).Where(function (x) { return x.PARAMETER_ID == "SEARCH_FOR_ASN_POS"; }).ToArray();
                        if (drIncludeASNPOs.length > 0 && (this.hdnIncludeASNPOs != null)) {
                            if (drIncludeASNPOs[0].PARAMETER_VALUE != null && drIncludeASNPOs[0].PARAMETER_VALUE != "") {
                                this.hdnIncludeASNPOs = drIncludeASNPOs[0].PARAMETER_VALUE;
                            }
                            else {
                                this.hdnIncludeASNPOs = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                            }
                        }
                        drDefPrinter = linq_es5_1.asEnumerable(this.lstProfileApp).Where(function (x) { return x.PARAMETER_ID == "DEFAULT_LABEL_PRINTER"; }).ToArray();
                        if (drDefPrinter.length > 0) {
                            this.gStrDefPrinter = drDefPrinter[0].PARAMETER_VALUE;
                        }
                        drSelPrinter = linq_es5_1.asEnumerable(this.lstProfileApp).Where(function (x) { return x.PARAMETER_ID == "LABEL_PRINTERS"; }).ToArray();
                        if (drSelPrinter.length > 0) {
                            this.gStrSelPrinter = drSelPrinter[0].PARAMETER_VALUE;
                        }
                        drPoComments = linq_es5_1.asEnumerable(this.lstOrgParms).Where(function (x) { return x.PARAMETER_ID == "RECV_PRINT_POID_COMMENTS"; }).ToArray();
                        if (drPoComments.length > 0) {
                            this.gStrPrintPoIDComments = drPoComments[0].PARAMETER_VALUE;
                        }
                        drPoIDConcacinate = linq_es5_1.asEnumerable(this.lstOrgParms).Where(function (x) { return x.PARAMETER_ID == "RECV_CONCATINATE_POID_TRKNO"; }).ToArray();
                        if (drPoIDConcacinate.length > 0) {
                            this.gConcatinateTrkNoPoID = drPoIDConcacinate[0].PARAMETER_VALUE;
                        }
                        drPrintingOption = linq_es5_1.asEnumerable(this.lstProfileApp).Where(function (x) { return x.PARAMETER_ID == "RECEIPT_DELIVER_PRINT_OPTIONS"; }).ToArray();
                        if (drPrintingOption.length > 0) {
                            this.gStrRecDelprintoption = drPrintingOption[0].PARAMETER_VALUE;
                        }
                        else {
                            this.gStrRecDelprintoption = AtParEnums_1.Shiping_Label_PrinterType[AtParEnums_1.Shiping_Label_PrinterType.None].toString();
                        }
                        drdonotDefaulttrckno = linq_es5_1.asEnumerable(this.lstOrgParms).Where(function (x) { return x.PARAMETER_ID == "DONOT_DEFAULT_TRACKING_NUMBER"; }).ToArray();
                        if (drdonotDefaulttrckno.length > 0) {
                            this.gdonotDefaulttrackingNumber = drdonotDefaulttrckno[0].PARAMETER_VALUE;
                        }
                        try {
                            intDelvShiptoIdsCnt = 0;
                            if (this.shipToIdCount != null) {
                                intDelvShiptoIdsCnt = this.shipToIdCount;
                            }
                            if (intDelvShiptoIdsCnt > 0) {
                                this.gPrintStockHeader = "Y";
                            }
                            else {
                                this.gPrintStockHeader = "N";
                            }
                        }
                        catch (ex) {
                            this.clientErrorMsg(ex, "loadparameters");
                        }
                        if (!(screenName == "mt_recv_po_or_nonpo_receipts")) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        //Create an instance of ATPARSERVICE class
                        this.statusCode = -1;
                        this.spnrService.start();
                        return [4 /*yield*/, this.commonService.getNiceLabelsPrintersData(AtParEnums_1.EnumApps.Receiving, "1", "").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.lstSetUpProPrinters = data.DataList;
                                _this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.enablePrintButtons()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_42 = _a.sent();
                        this.clientErrorMsg(ex_42, "loadparameters");
                        return [3 /*break*/, 5];
                    case 5:
                        if (this.gStrDefaultInput == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                            this.blnImgCountAll = true;
                            this.blnImgResetAll = true;
                        }
                        else {
                            this.blnImgCountAll = false;
                            this.blnImgResetAll = false;
                        }
                        if (this.gStrEditShipToId == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                            //this.blnShipToId = true;
                            //this.ddlShipToId = true;
                            this.blntxtShipIdDisable = false;
                        }
                        else {
                            //ddlShipToId.Enabled = false;
                            //txtShipId.Enabled = false;
                            this.blntxtShipIdDisable = true;
                        }
                        if (this.gStrNonPoItemsReceive == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
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
                        if (this.gStrNonStockStore == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                            this.blnTxtExtTrk = true;
                            this.blnLblExtTrk = true;
                        }
                        else {
                            this.blnTxtExtTrk = false;
                            this.blnLblExtTrk = false;
                        }
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        ex_43 = _a.sent();
                        this.clientErrorMsg(ex_43, "loadparameters");
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.enablePrintButtons = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    if (this.gStrRecDelprintoption == AtParEnums_1.Shiping_Label_PrinterType[AtParEnums_1.Shiping_Label_PrinterType.None].toString()) {
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "enablePrintButtons");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.clearData = function () {
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
            this.gblnASNPO = false;
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
            this.hdnNonPo = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "clearData");
        }
    };
    PoNonPoReceiptsComponent.prototype.clearSentDetails = function () {
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
            }
            else {
                this.txtToDate = (this.currentDate.getMonth() + 1) + '/' + (this.currentDate.getDate()) + '/' + this.currentDate.getFullYear();
                this.txtFrmDate = (this.currentFromDate.getMonth() + 1) + '/' + (this.currentFromDate.getDate()) + '/' + this.currentFromDate.getFullYear();
            }
            this.chkIncludeAllPOLines = false;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "clearSentDetails");
        }
    };
    /**
    *
    * LotSerial
    */
    PoNonPoReceiptsComponent.prototype.btnLotSerial_Click = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var dtLotSerial, ex_44;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.presentScreen == "PO") {
                            this.breadCrumbMenu.SUB_MENU_NAME = 'Lot/Serial';
                        }
                        else if (this.presentScreen == "ScheduledPo") {
                            this.breadCrumbMenu.SUB_MENU_NAME = 'Receive By Schedule - Lot/Serial';
                        }
                        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.statusMsgs = [];
                        this.LotSerialentity = new VM_RECV_LOTSERIAL_1.VM_RECV_LOTSERIAL();
                        // this.lstItemLotSerial = [];
                        this.lstFinalLotSerial = [];
                        dtLotSerial = [];
                        this.bysch = false;
                        this.tbl = false;
                        this.page = false;
                        this.lotserial = true;
                        return [4 /*yield*/, this.loadparameters("mt_recv_LotSerial")];
                    case 1:
                        _a.sent();
                        if (this.lstMainItemLotSerial != null && this.lstMainItemLotSerial.length > 0) {
                            this.lstFinalLotSerial = this.lstMainItemLotSerial.filter(function (x) { return x.ITEM_ID == _this.txtSerchItemId && x.LINE_NBR == _this.gstrlnklineNbr && x.SCHED_NBR == _this.schedNbr && x.DELETE_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString(); });
                        }
                        if (this.lstFinalLotSerial.length > 0) {
                            this.lotserialGrid = true;
                            this.intTolRecvQty = parseInt(this.selecstedRow.QTY);
                        }
                        else {
                            this.lotserialGrid = false;
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Records Found" });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_44 = _a.sent();
                        this.clientErrorMsg(ex_44, "btnLotSerial_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.buildColumns = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dr;
            return __generator(this, function (_a) {
                try {
                    dr = new VM_RECV_LOTSERIAL_1.VM_RECV_LOTSERIAL();
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
                    dr.DELETE_FLAG = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "buildColumns");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.grdLotSerial_RowDataBound = function (lotSerialGrdData) {
        return __awaiter(this, void 0, void 0, function () {
            var i, strSelectedUOM, ex_45;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.statusMsgs = [];
                        if (!(lotSerialGrdData != null && lotSerialGrdData.length > 0)) return [3 /*break*/, 4];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < lotSerialGrdData.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.populateUOM(this.lotSerialConverfactor, this.selecstedRow.UNIT_OF_MEASURE, this.selecstedRow.LINE_NBR.toString(), this.serialControl, AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString(), lotSerialGrdData[i])];
                    case 2:
                        _a.sent();
                        if (this.strLotSerialUom != null && this.strLotSerialUom != "") {
                            lotSerialGrdData[i].SELECTED_UOM = this.strLotSerialUom;
                        }
                        if (lotSerialGrdData[i].UOM != null && lotSerialGrdData[i].UOM != "" && this.ddllotserialUomEnable) {
                            strSelectedUOM = lotSerialGrdData[i].UOM;
                            if (this.selecstedRow.UNIT_OF_MEASURE != strSelectedUOM) {
                            }
                        }
                        if (this.gStrLotSerial == AtParEnums_1.Enable_Lot_Serial_Tracking[AtParEnums_1.Enable_Lot_Serial_Tracking.MMIS].toString()) {
                            if (this.serialControl == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                this.txtLotSerialQtyIsEditMode = true;
                            }
                            else {
                                this.txtLotSerialQtyIsEditMode = false;
                            }
                            if (this.lotControl == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && this.serialControl == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString()) {
                                this.txtSerialIDIsEditMode = true;
                                this.txtLotIdIsEditMode = false;
                                this.txtLotSerialQtyIsEditMode = false;
                                setTimeout(function () {
                                    var lotItem = document.getElementById("txtLotserialLotId");
                                    if (lotItem != null) {
                                        lotItem.focus();
                                    }
                                }, 2);
                                return [2 /*return*/];
                                // txtLot.Focus();
                                //  document.getElementById('txtLotserialLotId').focus();
                            }
                            else if (this.lotControl == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && this.serialControl == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                this.txtSerialIDIsEditMode = false;
                                this.txtLotIdIsEditMode = false;
                                this.txtLotSerialQtyIsEditMode = true;
                                setTimeout(function () {
                                    var serialItem = document.getElementById("txtLotserialSerialId");
                                    if (serialItem != null) {
                                        serialItem.focus();
                                    }
                                }, 2);
                                return [2 /*return*/];
                            }
                            else if (this.serialControl == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && this.lotControl == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString()) {
                                this.txtSerialIDIsEditMode = false;
                                this.txtLotIdIsEditMode = true;
                                this.txtLotSerialQtyIsEditMode = true;
                                setTimeout(function () {
                                    var lotItem = document.getElementById("txtLotserialSerialId");
                                    if (lotItem != null) {
                                        lotItem.focus();
                                    }
                                }, 2);
                            }
                        }
                        else {
                            if (this.serialControl == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                this.txtLotSerialQtyIsEditMode = true;
                            }
                            else {
                                this.txtLotSerialQtyIsEditMode = false;
                            }
                            this.txtSerialIDIsEditMode = false;
                            this.txtLotIdIsEditMode = false;
                            setTimeout(function () {
                                var lotItem = document.getElementById("txtLotserialSerialId");
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
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_45 = _a.sent();
                        this.clientErrorMsg(ex_45, "grdLotSerial_RowDataBound");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnLotSerialAdd_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_46;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (this.presentScreen == "PO") {
                            this.breadCrumbMenu.SUB_MENU_NAME = 'Lot/Serial - Add';
                            this.breadCrumbMenu.IS_MESSAGE = true;
                            this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        }
                        else if (this.presentScreen == "ScheduledPo") {
                            this.breadCrumbMenu.SUB_MENU_NAME = 'Receive By Schedule - Lot/Serial - Add';
                            this.breadCrumbMenu.IS_MESSAGE = true;
                            this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        }
                        this.mode = "ADD";
                        this.statusMsgs = [];
                        if (!(this.lstMainItemLotSerial == null || this.lstMainItemLotSerial.length == 0)) return [3 /*break*/, 3];
                        this.LotSerialentity = new VM_RECV_LOTSERIAL_1.VM_RECV_LOTSERIAL();
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
                        this.LotSerialentity.DELETE_FLAG = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                        if (this.lstFinalLotSerial != null && this.lstFinalLotSerial.length > 0) {
                            this.LotSerialentity.ROWINDEX = this.lstFinalLotSerial[this.lstFinalLotSerial.length - 1].ROWINDEX + 1;
                        }
                        else {
                            this.LotSerialentity.ROWINDEX = 0;
                        }
                        this.lstLotSerial.push(this.LotSerialentity);
                        if (!(this.lstLotSerial.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.grdLotSerial_RowDataBound(this.lstLotSerial)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 5];
                    case 3:
                        this.lstLotSerial = this.lstMainItemLotSerial.filter(function (x) { return x.ITEM_ID == _this.txtSerchItemId && x.LINE_NBR == _this.gstrlnklineNbr && x.SCHED_NBR == _this.schedNbr && x.DELETE_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString(); });
                        this.LotSerialentity = new VM_RECV_LOTSERIAL_1.VM_RECV_LOTSERIAL();
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
                        this.LotSerialentity.DELETE_FLAG = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                        if (this.lstFinalLotSerial != null && this.lstFinalLotSerial.length > 0) {
                            this.LotSerialentity.ROWINDEX = this.lstFinalLotSerial[this.lstFinalLotSerial.length - 1].ROWINDEX + 1;
                        }
                        else {
                            this.LotSerialentity.ROWINDEX = 0;
                        }
                        this.lstLotSerial.push(this.LotSerialentity);
                        if (!(this.lstLotSerial != null && this.lstLotSerial.length > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.grdLotSerial_RowDataBound(this.lstLotSerial)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        this.lotserial = false;
                        this.LotSerialentity.QTY = "1";
                        this.txtLotserialExpDate = "";
                        this.editform = true;
                        return [3 /*break*/, 7];
                    case 6:
                        ex_46 = _a.sent();
                        this.clientErrorMsg(ex_46, "btnLotSerialAdd_Click");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnLotSerialDelete_Click = function (lotserialDeletedData) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_47;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        return [4 /*yield*/, this.lotSerialDeleteConfirm(lotserialDeletedData)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_47 = _a.sent();
                        this.clientErrorMsg(ex_47, "btnLotSerialDelete_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.lotSerialDeleteConfirm = function (lotserialData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = [];
                    this.confirmationService.confirm({
                        message: "Do you want to delete the existing LotSerial ID?",
                        accept: function () { return __awaiter(_this, void 0, void 0, function () {
                            var lotserialitems, i, deletedLst, i, LotserialEntity, LotserialEntity, msg;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.spnrService.start();
                                        if (lotserialData != null) {
                                            lotserialData.DELETE_FLAG = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString();
                                            if (lotserialData.QTY != null && lotserialData.QTY != "" && lotserialData.QTY != undefined) {
                                                this.intTolRecvQty = this.intTolRecvQty - (parseInt(lotserialData.QTY));
                                            }
                                            this.lotSerialDeleteFlg = true;
                                            if (this.lstMainItemLotSerial != null && this.lstMainItemLotSerial.length > 0) {
                                                lotserialitems = this.lstMainItemLotSerial.filter(function (x) { return x.ITEM_ID == lotserialData.ITEM_ID && x.LINE_NBR == lotserialData.LINE_NBR &&
                                                    x.SCHED_NBR == lotserialData.SCHED_NBR && x.LOT_ID == lotserialData.LOT_ID && x.SERIAL_ID == lotserialData.SERIAL_ID; });
                                                if (lotserialitems != null) {
                                                    for (i = 0; i < lotserialitems.length; i++) {
                                                        lotserialitems[i].DELETE_FLAG = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString();
                                                    }
                                                }
                                            }
                                        }
                                        if (this.lstFinalLotSerial.length > 0) {
                                            deletedLst = linq_es5_1.asEnumerable(this.lstFinalLotSerial).Where(function (x) { return x.DELETE_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString(); }).ToArray();
                                            if (deletedLst.length > 0) {
                                                this.lstFinalLotSerial = [];
                                                for (i = 0; i < deletedLst.length; i++) {
                                                    LotserialEntity = new VM_RECV_LOTSERIAL_1.VM_RECV_LOTSERIAL();
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
                                            }
                                            else if (this.lstFinalLotSerial.length == 1) {
                                                LotserialEntity = new VM_RECV_LOTSERIAL_1.VM_RECV_LOTSERIAL();
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
                                                }
                                                else {
                                                    this.lstFinalLotSerial = [];
                                                    this.lstFinalLotSerial.push(LotserialEntity);
                                                }
                                            }
                                        }
                                        if (!(this.lstFinalLotSerial != null && this.lstFinalLotSerial.length > 0)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.grdLotSerial_RowDataBound(this.lstFinalLotSerial)];
                                    case 1:
                                        _a.sent();
                                        if (this.lstFinalLotSerial.length == 1 && this.lstFinalLotSerial[0].DELETE_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                            this.lotserialGrid = false;
                                        }
                                        _a.label = 2;
                                    case 2:
                                        this.spnrService.stop();
                                        msg = AtParConstants_1.AtParConstants.Deleted_Msg.replace("1%", "Lot Serial").replace("2%", lotserialData.SERIAL_ID);
                                        this.statusMsgs.push({
                                            severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        }); },
                        reject: function () {
                        }
                    });
                    this.spnrService.stop();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "lotSerialDeleteConfirm");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnLotSerialSave_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _loop_7, this_7, i_12, i;
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = [];
                    this.cntLotSerialQty = 0;
                    if (this.lstMainItemLotSerial != null && this.lstMainItemLotSerial.length > 0) {
                        if (this.lstFinalLotSerial != null && this.lstFinalLotSerial.length == 1 && this.lstFinalLotSerial[0].DELETE_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y]) {
                        }
                        else {
                            if (this.lstFinalLotSerial != null && this.lstFinalLotSerial.length > 0) {
                                _loop_7 = function (i_12) {
                                    var lotSerialDataLst = this_7.lstMainItemLotSerial.filter(function (x) { return x.ITEM_ID == _this.lstFinalLotSerial[i_12].ITEM_ID &&
                                        x.TRANSACTION_ID == _this.lstFinalLotSerial[i_12].TRANSACTION_ID && x.LOT_ID == _this.lstFinalLotSerial[i_12].LOT_ID &&
                                        x.LINE_NBR == _this.lstFinalLotSerial[i_12].LINE_NBR && x.SCHED_NBR == _this.lstFinalLotSerial[i_12].SCHED_NBR &&
                                        x.SERIAL_ID == _this.lstFinalLotSerial[i_12].SERIAL_ID; });
                                    if (lotSerialDataLst == null || lotSerialDataLst.length == 0) {
                                        this_7.lstMainItemLotSerial.push(this_7.lstFinalLotSerial[i_12]);
                                    }
                                };
                                this_7 = this;
                                for (i_12 = 0; i_12 < this.lstFinalLotSerial.length; i_12++) {
                                    _loop_7(i_12);
                                }
                            }
                        }
                    }
                    else {
                        this.lstMainItemLotSerial = this.lstFinalLotSerial;
                    }
                    for (i = 0; i < this.lstFinalLotSerial.length; i++) {
                        if (this.lstFinalLotSerial[i].ITEM_ID == this.txtSerchItemId && this.lstFinalLotSerial[i].LINE_NBR == this.gstrlnklineNbr &&
                            this.lstFinalLotSerial[i].DELETE_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString()) {
                            if (this.lstFinalLotSerial[i].QTY != "" && this.lstFinalLotSerial[i].QTY != null && this.lstFinalLotSerial[i].QTY != undefined) {
                                this.cntLotSerialQty = this.cntLotSerialQty + parseInt(this.lstFinalLotSerial[i].QTY);
                            }
                        }
                    }
                    if (this.cntLotSerialQty != 0) {
                        this.selecstedRow.QTY = this.cntLotSerialQty;
                        this.selecstedRow.QTYDESABLEFLAG = true;
                    }
                    else {
                        this.selecstedRow.QTYDESABLEFLAG = false;
                    }
                    this.lotSerialDeleteFlg = false;
                    this.selecstedRow.RBFlAG = true;
                    this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Saved Successfully, Click the Go Back button to show the items grid." });
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "btnLotSerialSave_Click");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.addNewRowToGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var strUOMVal, arrSelectedConf, strSelectedUOMFact, strExpDate, dblFraction, arrUOM, arrConf, strRecallFlag, dtRecallInfo, drrecall, strValue, dtTodaydate, strExpYear, dtExpdate, intQtyPo, checklotserialitem, strCon_Rate, msg, msg, ex_48;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        this.statusMsgs = [];
                        strUOMVal = "";
                        arrSelectedConf = [];
                        strSelectedUOMFact = "";
                        strExpDate = new Date();
                        dblFraction = 0;
                        arrUOM = [];
                        arrConf = [];
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
                        strRecallFlag = this.lstRecvSendPoLines[0].RECAL_FLAG.toString();
                        if (strRecallFlag == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                            dtRecallInfo = this.lstReCallInfo;
                            if (dtRecallInfo.length > 0) {
                                drrecall = linq_es5_1.asEnumerable(dtRecallInfo).Where(function (x) { return x.ITEM_ID == _this.txtSerchItemId && x.LOT_NO == "" && x.SERIAL_NO == ""; }).ToArray();
                                if (drrecall.length > 0) {
                                    strValue = "";
                                    strValue = this.txtSerchItemId + "( LOT " + this.LotSerialentity.LOT_ID + " " + " /Serial " + this.LotSerialentity.SERIAL_ID + ")";
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "This Item " + strValue + " is on recall. The item cannot be received." });
                                    this.LotSerialentity.QTY = "";
                                    this.txtLotSerialQtyIsEditMode = true;
                                    return [2 /*return*/];
                                }
                            }
                        }
                        if (this.gStrLotSerial == AtParEnums_1.Enable_Lot_Serial_Tracking[AtParEnums_1.Enable_Lot_Serial_Tracking.MMIS].toString()) {
                            if (this.serialControl == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                this.LotSerialentity.QTY = "1";
                                this.txtLotSerialQtyIsEditMode = true;
                            }
                            else {
                                this.txtLotSerialQtyIsEditMode = false;
                            }
                            if (this.lotControl == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && this.serialControl == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString()) {
                                if (this.LotSerialentity.LOT_ID == "" || this.LotSerialentity.QTY == "") {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter Mandatory Fields" });
                                    return [2 /*return*/];
                                }
                            }
                            else if (this.lotControl == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && this.serialControl == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                if (this.LotSerialentity.LOT_ID == "" || this.LotSerialentity.SERIAL_ID == "" || this.LotSerialentity.QTY == "") {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter Mandatory Fields" });
                                    return [2 /*return*/];
                                }
                            }
                            else if (this.lotControl == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString() && this.serialControl == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                if (this.LotSerialentity.SERIAL_ID == "" || this.LotSerialentity.QTY == "") {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter Mandatory Fields" });
                                    return [2 /*return*/];
                                }
                            }
                        }
                        else {
                            if (this.serialControl == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                this.LotSerialentity.QTY = "1";
                                this.txtLotSerialQtyIsEditMode = true;
                            }
                            else {
                                this.txtLotSerialQtyIsEditMode = false;
                            }
                            if ((this.LotSerialentity.LOT_ID == "" && this.LotSerialentity.SERIAL_ID == "") || this.LotSerialentity.QTY == "") {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter Mandatory Fields" });
                                return [2 /*return*/];
                            }
                            if (this.LotSerialentity.SERIAL_ID != "" && (parseInt(this.LotSerialentity.QTY) * parseInt(strSelectedUOMFact)) != 1) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Quantity should be 1" });
                                return [2 /*return*/];
                            }
                        }
                        dtTodaydate = new Date();
                        strExpYear = "";
                        if (this.txtLotserialExpDate != null && this.txtLotserialExpDate != "") {
                            dtExpdate = this.txtLotserialExpDate;
                            //date validating                   
                            if (Date.parse(this.txtLotserialExpDate.getMonth() + '/' + this.txtLotserialExpDate.getDate() + '/' + this.txtLotserialExpDate.getFullYear()) < Date.parse(dtTodaydate.getMonth() + "/" + dtTodaydate.getDate() + "/" + dtTodaydate.getFullYear())) {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Selected Lot/Serial is Expired." });
                                return [2 /*return*/];
                            }
                            else {
                                strExpDate = this.txtLotserialExpDate;
                            }
                        }
                        else {
                            strExpDate = null;
                        }
                        if (this.gStrUOMEditFlag == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
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
                        if (this.lotControl == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString()) {
                            if ((parseInt(this.strTotalQty) < dblFraction) && this.gStrAllowExcessQty == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString()) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Receive quantity cannot be greater than open quantity." });
                                this.LotSerialentity.QTY = "";
                                // txtQty.Focus();
                                return [2 /*return*/];
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
                        intQtyPo = parseInt(this.selecstedRow.QTY_PO);
                        checklotserialitem = void 0;
                        if (!(this.mode != "ADD")) return [3 /*break*/, 1];
                        checklotserialitem = this.lstFinalLotSerial.filter(function (x) { return x.SERIAL_ID == _this.LotSerialentity.SERIAL_ID
                            && x.LOT_ID == _this.LotSerialentity.LOT_ID; });
                        return [3 /*break*/, 3];
                    case 1:
                        checklotserialitem = this.lstFinalLotSerial.filter(function (x) { return x.SERIAL_ID == _this.LotSerialentity.SERIAL_ID
                            && x.LOT_ID == _this.LotSerialentity.LOT_ID; });
                        if (!(checklotserialitem.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.btnLotSerialAdd_Click()];
                    case 2:
                        _a.sent();
                        if (!this.txtLotSerialQtyIsEditMode) {
                            this.LotSerialentity.QTY = "";
                        }
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Item already added to the existing issue." });
                        return [2 /*return*/];
                    case 3:
                        if (this.LotSerialentity.QTY != null && this.LotSerialentity.QTY != "") {
                            strCon_Rate = this.LotSerialentity.CONVERSION_RATE == "" ? "1" : this.LotSerialentity.CONVERSION_RATE;
                            if (this.mode == "ADD") {
                                this.intTolRecvQty = this.intTolRecvQty + (parseInt(this.LotSerialentity.QTY)) * parseInt(strCon_Rate);
                                if (this.gStrAllowExcessQty == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString()) {
                                    if (this.intTolRecvQty > intQtyPo) {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Receive quantity cannot be greater than open quantity." });
                                        this.intTolRecvQty = this.intTolRecvQty - (parseInt(this.LotSerialentity.QTY)) * parseInt(strCon_Rate);
                                        if (!this.txtLotSerialQtyIsEditMode) {
                                            this.LotSerialentity.QTY = "";
                                        }
                                        return [2 /*return*/];
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
                        this.LotSerialentity.DELETE_FLAG = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
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
                        if (!(this.mode == "ADD")) return [3 /*break*/, 5];
                        if (this.lotSerialSchdFlg) {
                            this.LotSerialentity.LOTSERIALSCHDFLG = true;
                        }
                        this.lstFinalLotSerial.push(this.LotSerialentity);
                        return [4 /*yield*/, this.btnLotSerialAdd_Click()];
                    case 4:
                        _a.sent();
                        msg = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Lot/Serial").replace("2%", "");
                        this.statusMsgs.push({
                            severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg
                        });
                        return [2 /*return*/];
                    case 5:
                        this.lstFinalLotSerial[this.LotSerialentity.ROWINDEX].LOT_ID = this.LotSerialentity.LOT_ID;
                        this.lstFinalLotSerial[this.LotSerialentity.ROWINDEX].SERIAL_ID = this.LotSerialentity.SERIAL_ID;
                        this.lstFinalLotSerial[this.LotSerialentity.ROWINDEX].QTY = this.LotSerialentity.QTY;
                        this.lstFinalLotSerial[this.LotSerialentity.ROWINDEX].EXPIRY_DATE = this.LotSerialentity.EXPIRY_DATE;
                        msg = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Lot/Serial").replace("2%", "");
                        this.statusMsgs.push({
                            severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg
                        });
                        this.editform = false;
                        this.lotserial = true;
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        ex_48 = _a.sent();
                        this.clientErrorMsg(ex_48, "addNewRowToGrid");
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnLotSerialGrdEdit_Click = function (lotId, serialId, qty, expiryDate, selectedUom, rowIndex, rowData) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_49;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (this.presentScreen == "PO") {
                            this.breadCrumbMenu.SUB_MENU_NAME = 'Lot/Serial - Edit';
                            this.breadCrumbMenu.IS_MESSAGE = true;
                            this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        }
                        else if (this.presentScreen == "ScheduledPo") {
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
                        if (!(this.lstFinalLotSerial.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.grdLotSerial_RowDataBound(this.lstFinalLotSerial)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.editform = !this.editform;
                        this.lotserial = false;
                        return [3 /*break*/, 4];
                    case 3:
                        ex_49 = _a.sent();
                        this.clientErrorMsg(ex_49, "btnLotSerialGrdEdit_Click");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnLotSerialEditSave_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_50;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        return [4 /*yield*/, this.addNewRowToGrid()];
                    case 1:
                        _a.sent();
                        if (this.mode == "ADD") {
                        }
                        else {
                            this.lotserial = false;
                            this.editform = true;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_50 = _a.sent();
                        this.clientErrorMsg(ex_50, "btnLotSerialEditSave_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnGoBackToLotSerial_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = null;
                    if (this.presentScreen == "PO") {
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Lot/Serial';
                    }
                    else if (this.presentScreen == "ScheduledPo") {
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
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Records Found" });
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "btnGoBackToLotSerial_Click");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnLotSerialGoBack_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var lotserialitems, i, lotserialitems, x, index;
            return __generator(this, function (_a) {
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
                    }
                    else if (this.presentScreen == "ScheduledPo") {
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
                            this.lstFinalLotSerial[0].DELETE_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
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
                            lotserialitems = this.lstMainItemLotSerial.filter(function (x) { return x.ITEM_ID == _this.txtSerchItemId && x.LINE_NBR == _this.gstrlnklineNbr && x.SCHED_NBR == _this.schedNbr; });
                            if (lotserialitems != null) {
                                for (i = 0; i < lotserialitems.length; i++) {
                                    lotserialitems[i].DELETE_FLAG = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                                }
                            }
                        }
                        this.lotSerialDeleteFlg = false;
                    }
                    else {
                        lotserialitems = this.lstMainItemLotSerial.filter(function (x) { return x.ITEM_ID == _this.txtSerchItemId && x.LINE_NBR == _this.gstrlnklineNbr && x.SCHED_NBR == _this.schedNbr && x.DELETE_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString(); });
                        for (x = 0; x < lotserialitems.length; x++) {
                            index = this.lstMainItemLotSerial.indexOf(lotserialitems[x]);
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
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.LotSerial_selectChanged = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.statusMsgs = [];
                try {
                    this.statusMsgs = [];
                    this.LotSerialentity.SELECTED_UOM = event.label;
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "LotSerial_selectChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.convert = function (str) {
        var date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    /**
    *
    * End LotSerial
    */
    /**
    * Scheduled PO
    * @param ven
    */
    PoNonPoReceiptsComponent.prototype.byschedule = function (poLineRowData) {
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
        }
        catch (ex) {
            this.clientErrorMsg(ex, "byschedule");
        }
    };
    PoNonPoReceiptsComponent.prototype.scheduledPOBind = function (ven) {
        return __awaiter(this, void 0, void 0, function () {
            var fact, ex_51;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        fact = this.lstRecvSendPoLines.filter(function (x) { return x.INV_ITEM_ID == ven.INV_ITEM_ID && x.LINE_NBR == ven.LINE_NBR; });
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
                        return [4 /*yield*/, this.buildSchdDetails()];
                    case 1:
                        _a.sent();
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
                        return [3 /*break*/, 3];
                    case 2:
                        ex_51 = _a.sent();
                        this.clientErrorMsg(ex_51, "scheduledPOBind");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.buildSchdDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var filteredList, filteredScreenList;
            return __generator(this, function (_a) {
                try {
                    this.dtScheduleItems = [];
                    filteredList = this.lstGridRecvSendPoLines.filter(function (x) { return x.INV_ITEM_ID == _this.strItemId && x.LINE_NBR == parseInt(_this.strLineNbr); });
                    if (filteredList != null) {
                        filteredList.forEach(function (x) {
                            x.QTY = x.ASN_QTY, x.QTY_PO = x.LINE_PO_QTY, x.CARRIER_ID = x.QTY == null ? "" : x.CARRIER_ID,
                                x.BILL_OF_LADING = x.QTY == null ? "" : x.BILL_OF_LADING, x.EXT_TRK_NO = x.QTY == null ? "" : x.EXT_TRK_NO,
                                x.NO_OF_BOXES = x.QTY == null ? null : x.NO_OF_BOXES, x.QTYDESABLEFLAG = x.LOTSERIALSCHDFLAG == true ? true : x.LOTSERIALSCHDFLAG,
                                x.SCHDQTYCHANGFLAG = x.SCHDQTYCHANGFLAG == true ? true : x.SCHDQTYCHANGFLAG;
                        });
                    }
                    if (this.lstMainItemLotSerial != null && this.lstMainItemLotSerial.length > 0) {
                        this.lstMainItemLotSerial.forEach(function (x) { x.LOTSERIALSCHDFLG = false; });
                    }
                    this.dtScheduleItems = filteredList;
                    filteredScreenList = this.lstScreenApp.filter(function (x) { return x.SCREEN_NAME == 'RECEIVE BY SCHEDULE'; });
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "buildSchdDetails");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.txtCheckQty = function (ven, qty) {
        return __awaiter(this, void 0, void 0, function () {
            var intConverfactor, strUOM, dblLineRecdQty, dblItemTolPer, ex_52;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        intConverfactor = void 0;
                        strUOM = void 0;
                        dblLineRecdQty = void 0;
                        dblItemTolPer = void 0;
                        return [4 /*yield*/, this.chkItemQty(ven)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_52 = _a.sent();
                        this.clientErrorMsg(ex_52, "txtCheckQty");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnSchedulePo_Save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_53;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        return [4 /*yield*/, this.SaveScheduleItemsData('save')];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_53 = _a.sent();
                        this.clientErrorMsg(ex_53, "btnSchedulePo_Save");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.SaveScheduleItemsData = function (save) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var blnQty, strUOMVal, arrUOM, arrConf, strSelectedUOMFact, arrSelectedConf, ShedLineNbr, j, i, txtlad, k, cntQty, i, lstFiltered;
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = [];
                    blnQty = false;
                    strUOMVal = void 0;
                    arrUOM = [];
                    arrConf = [];
                    strSelectedUOMFact = "";
                    arrSelectedConf = [];
                    ShedLineNbr = void 0;
                    j = 0;
                    for (i = 0; i < this.lstGridRecvSendPoLines.length; i++) {
                        if (this.lstGridRecvSendPoLines[i].LINE_NBR == parseInt(this.strLineNbr)) {
                            this.txtNoOfBoxes = this.dtScheduleItems[j].NO_OF_BOXES;
                            this.strItemId = this.strItemId;
                            this.strLineNbr = this.strLineNbr;
                            this.txtQty = this.dtScheduleItems[j].QTY;
                            this.ddlGridCarrier = this.dtScheduleItems[j].CARRIER_ID;
                            this.txtLadg = this.dtScheduleItems[j].BILL_OF_LADING;
                            this.txtSchdExTrk = this.dtScheduleItems[j].EXT_TRK_NO; //txtTrk
                            this.dtScheduleItems[j].ASN_QTY = this.dtScheduleItems[j].QTY;
                            if (this.txtQty != "" && this.txtQty != null) {
                                blnQty = true;
                            }
                            if ((this.txtQty != "" && this.txtQty != null && this.txtQty != undefined) && (this.txtLadg == "" || this.txtLadg == null || this.txtLadg == undefined || this.ddlGridCarrier == "Select Carrier" || this.ddlGridCarrier == "" || this.ddlGridCarrier == null)) {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Carrier and Lading are mandatory" });
                                this.txtQty = "";
                                this.dtScheduleItems[j].RBFlAG = false;
                                this.dtScheduleItems[j].RBFlAG = false;
                                txtlad = document.getElementById('txtBillOfLading' + this.dtScheduleItems[j].SCHED_NBR);
                                if (txtlad != null) {
                                    txtlad.focus();
                                }
                            }
                            else {
                                strUOMVal = this.dtScheduleItems[j].DDLUOMS[0].value; //check once
                                arrUOM = strUOMVal.split("(");
                                if (arrUOM.length > 1) {
                                    arrConf = arrUOM[1].split(" ");
                                }
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
                                if (this.txtNoOfBoxes != null || this.txtNoOfBoxes != "" || this.txtNoOfBoxes != undefined) {
                                    this.lstGridRecvSendPoLines[i].NO_OF_BOXES = parseInt(this.txtNoOfBoxes);
                                }
                                else {
                                    ShedLineNbr = this.dtScheduleItems[j].SCHED_NBR;
                                    for (k = 0; k < this.lstGridRecvSendPoLines.length; k++) {
                                        if (this.lstGridRecvSendPoLines[k].LINE_NBR == parseInt(this.strLineNbr) && this.lstGridRecvSendPoLines[k].SCHED_NBR == parseInt(ShedLineNbr.toString())) {
                                            if (this.lstGridRecvSendPoLines[k].NO_OF_BOXES != null || this.lstGridRecvSendPoLines[k].NO_OF_BOXES != undefined) {
                                                this.lstGridRecvSendPoLines[k].NO_OF_BOXES = this.lstGridRecvSendPoLines[k].NO_OF_BOXES;
                                            }
                                            else {
                                                this.lstGridRecvSendPoLines[k].NO_OF_BOXES = 1;
                                            }
                                        }
                                    }
                                }
                                if (this.txtSchdExTrk != "" && this.txtSchdExTrk != null) {
                                    this.lstGridRecvSendPoLines[i].EXT_TRK_NO = this.txtSchdExTrk;
                                }
                                else {
                                    this.lstGridRecvSendPoLines[i].EXT_TRK_NO = "";
                                }
                                this.lstGridRecvSendPoLines[i].LINE_QTY = parseInt(this.txtQty);
                                this.lstGridRecvSendPoLines[i].BILL_OF_LADING = this.txtLadg;
                                if (this.ddlGridCarrier != "Select Carrier") {
                                    this.lstGridRecvSendPoLines[i].CARRIER_ID = this.ddlGridCarrier;
                                }
                                this.lstGridRecvSendPoLines[i].RECV_UOM = arrUOM[0];
                                this.lstGridRecvSendPoLines[i].RECV_CONVERSION_RATE = parseInt(strSelectedUOMFact);
                                if (this.txtQty != "") {
                                    this.lstGridRecvSendPoLines[i].RECEIVED_FLAG = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString();
                                    this.dtScheduleItems[j].SCHDQTYCHANGFLAG = true;
                                }
                                j++;
                            }
                        }
                    }
                    if (blnQty) {
                        if (save == 'save') {
                            this.isScheduleSave = true;
                            cntQty = 0;
                            for (i = 0; i < this.dtScheduleItems.length; i++) {
                                if (this.dtScheduleItems[i].INV_ITEM_ID == this.strItemId && this.dtScheduleItems[i].LINE_NBR == this.strLineNbr) {
                                    if (this.dtScheduleItems[i].QTY != "" && this.dtScheduleItems[i].QTY != null && this.dtScheduleItems[i].QTY != undefined &&
                                        this.dtScheduleItems[i].CARRIER_ID != null && this.dtScheduleItems[i].CARRIER_ID != "Select Carrier" && this.dtScheduleItems[i].CARRIER_ID != "") {
                                        cntQty = cntQty + parseInt(this.dtScheduleItems[i].QTY);
                                    }
                                }
                            }
                            lstFiltered = this.lstRecvSendPoLines.filter(function (x) { return x.INV_ITEM_ID == _this.strItemId && x.LINE_NBR == parseInt(_this.strLineNbr); });
                            if (lstFiltered != null && lstFiltered.length > 0) {
                                if (cntQty > 0) {
                                    lstFiltered[0].QTY = cntQty;
                                    lstFiltered[0].RECEIVED_FLAG = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString();
                                    lstFiltered[0].LOTSERIALSCHDFLAG = true;
                                }
                            }
                            lstFiltered[0].RBFlAG = true;
                            if (this.statusMsgs != null && this.statusMsgs.length == 0) {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Saved Successfully, Click Go Back to show the items grid." });
                            }
                        }
                        else if (save == 'Print') { }
                    }
                    else {
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter Receive Quantity" });
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "SaveScheduleItemsData");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.scheduleReceiveAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i_13, i, ex_54;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.blnReceiveall = true;
                        if ((this.selectedSchdDdlCarrier == 'Select Carrier' || this.selectedSchdDdlCarrier == '' || this.selectedSchdDdlCarrier == undefined) || (this.txtLading == '' || this.txtLading == null || this.txtLading == undefined)) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Carrier and Lading are mandatory" });
                        }
                        this.lstCheckedBUnits = [];
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.endIndex = +sessionStorage.getItem("RecordsEndindex");
                        if (this.dtScheduleItems != null && this.dtScheduleItems.length > 0) {
                            if (this.endIndex > this.dtScheduleItems.length) {
                                this.endIndex = this.dtScheduleItems.length;
                            }
                            for (i_13 = this.endIndex - 1; i_13 >= this.startIndex; i_13--) {
                                this.lstCheckedBUnits.push(this.dtScheduleItems[i_13]);
                            }
                        }
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.lstCheckedBUnits.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.schedulePo_RbtnChange(this.lstCheckedBUnits[i], false)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (this.blnSchedsExist) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Lines with schedules or lot serial have not been updated" });
                            //this.selectedSCHEDNBR = "";
                            // setTimeout(() => { this.selectedSCHEDNBR = ""; }, 1);
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        ex_54 = _a.sent();
                        this.spnrService.stop();
                        this.clientErrorMsg(ex_54, "scheduleReceiveAll");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.scheduleResetAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var intScheduleCnt, strRecedQty, strSerialControlled, strLotControlled, strPoQty, txtNoOfBoxes, blnFlag, dtReceiveDetails, strLot, strSerial, lnkLineNbr, lbQtyPO, lnkItemId, txtQty, i;
            return __generator(this, function (_a) {
                try {
                    intScheduleCnt = 0;
                    strRecedQty = null;
                    strSerialControlled = null;
                    strLotControlled = null;
                    strPoQty = null;
                    txtNoOfBoxes = void 0;
                    blnFlag = false;
                    dtReceiveDetails = void 0;
                    strLot = void 0;
                    strSerial = void 0;
                    lnkLineNbr = void 0;
                    lbQtyPO = void 0;
                    lnkItemId = void 0;
                    txtQty = void 0;
                    if (this.gStrDefaultInput) {
                        for (i = 0; i < this.dtScheduleItems.length; i++) {
                            strLot = this.dtScheduleItems[i].LOT_CONTROLLED;
                            this.lotControl = this.dtScheduleItems[i].LOT_CONTROLLED;
                            strSerial = this.dtScheduleItems[i].SERIAL_CONTROLLED;
                            this.serialControl = this.dtScheduleItems[i].SERIAL_CONTROLLED;
                            lnkLineNbr = this.dtScheduleItems[i].LINE_NBR;
                            this.schedNbr = this.dtScheduleItems[i].SCHED_NBR + "";
                            lbQtyPO = this.dtScheduleItems[i].LINE_PO_QTY;
                            lnkItemId = this.dtScheduleItems[i].INV_ITEM_ID;
                            txtQty = this.dtScheduleItems[i].QTY; //.LINE_QTY;
                            strRecedQty = this.dtScheduleItems[i].RECEIVED_QTY + "";
                            ;
                            strPoQty = this.dtScheduleItems[i].QTY_PO + ""; //LINE_PO_QTY check once Qty
                            intScheduleCnt = this.dtScheduleItems[i].SCHED_COUNT;
                            strSerialControlled = this.dtScheduleItems[i].SERIAL_CONTROLLED;
                            strLotControlled = this.dtScheduleItems[i].LOT_CONTROLLED;
                            if (lnkItemId != null) {
                                if (lnkItemId == "") {
                                    this.blnFlag = true;
                                }
                                //Do not default Lines which have schedules
                                if (strSerialControlled == null || strSerialControlled == "") {
                                    strSerialControlled = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                                }
                                if (strLotControlled == null && strLotControlled == "") {
                                    strLotControlled = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                                }
                                if (intScheduleCnt == 1 && (this.gStrLotSerial == AtParEnums_1.Enable_Lot_Serial_Tracking[AtParEnums_1.Enable_Lot_Serial_Tracking.None].toString() ||
                                    !(strSerialControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || strLotControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()))) {
                                    this.blnFlag = true;
                                }
                                else if (intScheduleCnt > 1) {
                                    this.lstRecvSendPoLines[i].SCHDFLAG = true;
                                    this.blnSchedsExist = true;
                                }
                                else if (strSerialControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || strLotControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
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
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Lines with schedules or lot serial have not been updated" });
                        // this.selectedSCHEDNBR = "";
                        return [2 /*return*/];
                    }
                }
                catch (ex) {
                    this.spnrService.stop();
                    this.clientErrorMsg(ex, "scheduleResetAll");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.radioButtonChanged = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var rbtn, ex_55;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.statusMsgs = [];
                        this.statusCode = -1;
                        if (this.dtScheduleItems != null && this.dtScheduleItems.length > 0) {
                            if (event == null) {
                                if (this.dtScheduleItems.length == 1) {
                                    this.selecstedRow = this.dtScheduleItems[0];
                                }
                                else {
                                    return [2 /*return*/];
                                }
                            }
                            else {
                                this.selecstedRow = this.dtScheduleItems.filter(function (x) { return x.SCHED_NBR == event; })[0];
                            }
                        }
                        this.txtPkgs = "1";
                        rbtn = "";
                        if (this.schPO == false) {
                            rbtn = "ASP.mt_recv_po_or_nonpo_receipts_aspx";
                        }
                        else {
                            rbtn = "ASP.mt_recv_Schedule.aspx";
                        }
                        this.spnrService.start();
                        return [4 /*yield*/, this.schedulePo_RbtnChange(this.selecstedRow, false)];
                    case 1:
                        _a.sent();
                        this.spnrService.stop();
                        this.spnrService.start();
                        if (!(this.selecstedRow != null && this.selecstedRow != undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.updateDs(rbtn, this.selecstedRow)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        this.spnrService.stop();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_55 = _a.sent();
                        this.spnrService.stop();
                        this.clientErrorMsg(ex_55, "radioButtonChanged");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.schedulePo_RbtnChange = function (recvDetails, blnSelectRdbtn) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var txtPkgs, blnSchedsExist, intScheduleCnt, strRecedQty, strSerialControlled, strLotControlled, strPoQty, txtNoOfBoxes, txtLadg, txtTrkNo, lnkLine, schdNBR, currentdate, extTrkExist, i, i, dtReceiveDetails, strLot, strSerial, lnkLineNbr, lbQtyPO, lnkItemId_4, txtQty, intConverfactor, strUOM, schedCount, strInvItem, strRecallFlag, dtRecallInfo, dr, strComments, dtRecallInfo, dr, ex_56;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        this.statusCode = -1;
                        txtPkgs = "";
                        blnSchedsExist = false;
                        this.blnFlag = false;
                        intScheduleCnt = 0;
                        strRecedQty = null;
                        strSerialControlled = null;
                        strLotControlled = null;
                        strPoQty = null;
                        txtNoOfBoxes = void 0;
                        if (recvDetails.INV_ITEM_ID != null) {
                            this.hdnItemId = recvDetails.INV_ITEM_ID;
                        }
                        txtLadg = recvDetails.BILL_OF_LADING;
                        txtTrkNo = recvDetails.EXT_TRK_NO;
                        lnkLine = recvDetails.LINE_NBR;
                        schdNBR = recvDetails.SCHED_NBR;
                        if (this.dtScheduleItems != null && this.dtScheduleItems.length > 0) {
                            txtNoOfBoxes = recvDetails.NO_OF_BOXES;
                        }
                        txtPkgs = "1";
                        //if (!recvDetails.SCHDFLAG) {
                        if (this.txtLading != null && this.txtLading != undefined && this.txtLading.length == 0) {
                            if (txtLadg == null || txtLadg == "") {
                                currentdate = new Date();
                                txtLadg = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID].toString() + (currentdate.getMonth() + 1) + this.AddZero(currentdate.getDate()) + currentdate.getFullYear() + currentdate.getHours() + currentdate.getMinutes() + currentdate.getSeconds();
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
                        return [4 /*yield*/, this.checkColumnExist("EXT_TRK_NO", "RECEIVE BY SCHEDULE")];
                    case 1:
                        extTrkExist = _a.sent();
                        if (extTrkExist) {
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
                                for (i = 0; i < this.dtScheduleItems.length; i++) {
                                    if (this.dtScheduleItems[i].LINE_NBR == lnkLine && recvDetails.SCHED_NBR == schdNBR) {
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
                                }
                                else {
                                    if (this.dtScheduleItems != null) {
                                        txtNoOfBoxes = 1;
                                        recvDetails.NO_OF_BOXES = txtNoOfBoxes;
                                        this.txtPkgs = "1";
                                    }
                                    else {
                                        txtNoOfBoxes = 1;
                                        this.txtPkgs = "1";
                                        recvDetails.NO_OF_BOXES = txtNoOfBoxes;
                                    }
                                }
                            }
                        }
                        else {
                            if (this.dtScheduleItems != null && this.dtScheduleItems.length > 0) {
                                for (i = 0; i < this.dtScheduleItems.length; i++) {
                                    if (this.dtScheduleItems[i].LINE_NBR == lnkLine && this.grdRecvLinesRbBtnCheck) {
                                        if (this.dtScheduleItems[i].NO_OF_BOXES != null) {
                                            this.txtPkgs = this.dtScheduleItems[i].NO_OF_BOXES.toString();
                                        }
                                    }
                                }
                            }
                        }
                        if (this.dtScheduleItems != null && this.dtScheduleItems.length > 0) {
                            dtReceiveDetails = this.dtScheduleItems;
                            strLot = recvDetails.LOT_CONTROLLED;
                            this.lotControl = recvDetails.LOT_CONTROLLED;
                            strSerial = recvDetails.SERIAL_CONTROLLED;
                            this.serialControl = recvDetails.SERIAL_CONTROLLED;
                            lnkLineNbr = recvDetails.LINE_NBR;
                            this.schedNbr = recvDetails.SCHED_NBR;
                            lbQtyPO = recvDetails.LINE_PO_QTY;
                            lnkItemId_4 = recvDetails.INV_ITEM_ID;
                            txtQty = recvDetails.QTY;
                            strRecedQty = recvDetails.RECEIVED_QTY;
                            strPoQty = recvDetails.QTY_PO; //LINE_PO_QTY check once Qty
                            intScheduleCnt = recvDetails.SCHED_COUNT;
                            strSerialControlled = recvDetails.SERIAL_CONTROLLED;
                            strLotControlled = recvDetails.LOT_CONTROLLED;
                            intConverfactor = parseInt(recvDetails.CONVERSION_RATE);
                            this.lotSerialConverfactor = parseInt(recvDetails.CONVERSION_RATE);
                            strUOM = recvDetails.UNIT_OF_MEASURE;
                            schedCount = recvDetails.SCHED_COUNT;
                            strInvItem = recvDetails.INVENTORY_ITEM;
                            this.hdnItemType = strInvItem;
                            this.hdnInvItemId = lnkItemId_4;
                            this.hdnItmLineNo = lnkLineNbr;
                            this.hdnItmSchedLineNo = parseInt(this.schedNbr);
                            this.strTotalQty = (parseInt(strPoQty) - parseInt(strRecedQty)).toString();
                            strRecallFlag = recvDetails.RECAL_FLAG.toString();
                            if (strRecallFlag == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                recvDetails.QTY = "";
                                recvDetails.TXTQTYFLAG = true;
                                dtRecallInfo = this.lstReCallInfo;
                                if (dtRecallInfo != null && dtRecallInfo.length > 0) {
                                    dr = dtRecallInfo.filter(function (x) { return x.ITEM_ID == lnkItemId_4 && (x.LOT_NO == "" || x.LOT_NO == null) && (x.SERIAL_NO == "" || x.SERIAL_NO == null); });
                                    if (dr != null && dr.length > 0) {
                                        recvDetails.QTY = "";
                                        recvDetails.TXTQTYFLAG = true;
                                    }
                                }
                            }
                            //Comments Checking
                            if (this.gDisplayComments == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() &&
                                recvDetails.COMMENTS != null && recvDetails.COMMENTS != "") {
                                strComments = recvDetails.COMMENTS;
                                if (strComments != "") {
                                    strComments = "Comments: \\n \\n " + strComments;
                                    if (this.gstrPrevComments != strComments) {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: strComments.toString() });
                                        this.gstrPrevComments = strComments;
                                    }
                                }
                            }
                            if ((recvDetails.CARRIER_ID == null || recvDetails.CARRIER_ID == "" || recvDetails.CARRIER_ID == "Select Carrier" || txtLadg == "")) {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Carrier and Lading are mandatory" });
                                this.selecstedRow = null;
                                setTimeout(function () { _this.selectedSCHEDNBR = ""; }, 1);
                                setTimeout(function () { recvDetails.RBFlAG = false; }, 2);
                                this.grdRecvLinesRbBtnCheck = false;
                                this.lstRecvSendPoLines.forEach(function (x) { return x.RBFlAG = false; });
                                blnSelectRdbtn = true;
                                return [2 /*return*/];
                            }
                            else {
                                setTimeout(function () {
                                    recvDetails.RBFlAG = true;
                                    var itemtxtRecvQty = document.getElementById('txtRecvQty' + _this.selectedSCHEDNBR); // recvDetails.SCHED_NBR)
                                    if (itemtxtRecvQty != null) {
                                        itemtxtRecvQty.focus();
                                    }
                                }, 2);
                            }
                            this.txtSerchItemId = lnkItemId_4;
                            this.hdnItemId = this.txtSerchItemId;
                            this.gstrlnkitemid = recvDetails.INV_ITEM_ID;
                            this.gstrlnklineNbr = lnkLineNbr.toString();
                            if (this.gStrLotSerial != AtParEnums_1.Enable_Lot_Serial_Tracking[AtParEnums_1.Enable_Lot_Serial_Tracking.None].toString()) {
                                if (this.gStrLotSerial == AtParEnums_1.Enable_Lot_Serial_Tracking[AtParEnums_1.Enable_Lot_Serial_Tracking.MMIS].toString()) {
                                    if (strLot == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || strSerial == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                        this.btnLotSerialDisable = false;
                                        recvDetails.TXTQTYFLAG = true;
                                        recvDetails.DDLUOMFLAG = true;
                                    }
                                    else {
                                        this.btnLotSerialDisable = true;
                                        recvDetails.TXTQTYFLAG = false;
                                    }
                                }
                                else if (this.gStrLotSerial == AtParEnums_1.Enable_Lot_Serial_Tracking[AtParEnums_1.Enable_Lot_Serial_Tracking.AtPar].toString()) {
                                    this.btnLotSerialDisable = false;
                                    recvDetails.TXTQTYFLAG = false;
                                    if (strSerial == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                        recvDetails.DDLUOMFLAG = true;
                                    }
                                }
                                //if (parseInt(intScheduleCnt.toString()) > 1) {
                                //    this.btnLotSerialDisable = true;
                                //    recvDetails.TXTQTYFLAG = true;
                                //    recvDetails.DDLUOMFLAG = true;
                                //}
                            }
                            else {
                                this.btnLotSerialDisable = true;
                                recvDetails.TXTQTYFLAG = false;
                            }
                            if (strSerial == "" || strSerial == null || strSerial == undefined) {
                                strSerial = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                            }
                            if (strLot == "" || strLot == null || strLot == undefined) {
                                strLot = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                            }
                            if (schedCount == "1") {
                                this.blnlnkItemIdEnable = false;
                                this.blnlnkLineNbrEnable = false;
                                if ((strLot == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || strSerial == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) &&
                                    this.gStrLotSerial == AtParEnums_1.Enable_Lot_Serial_Tracking[AtParEnums_1.Enable_Lot_Serial_Tracking.MMIS].toString()) {
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
                            if (lnkItemId_4 != null) {
                                if (lnkItemId_4 == "") {
                                    this.blnFlag = true;
                                }
                                //Do not default Lines which have schedules
                                if (strSerialControlled == null || strSerialControlled == "") {
                                    strSerialControlled = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                                }
                                if (strLotControlled == null && strLotControlled == "") {
                                    strLotControlled = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                                }
                                if (intScheduleCnt == 1 && (this.gStrLotSerial == AtParEnums_1.Enable_Lot_Serial_Tracking[AtParEnums_1.Enable_Lot_Serial_Tracking.None].toString() ||
                                    !(strSerialControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || strLotControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()))) {
                                    this.blnFlag = true;
                                }
                                else if (intScheduleCnt > 1) {
                                    //Recall Checking
                                    if (strRecallFlag == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                        dtRecallInfo = this.lstReCallInfo;
                                        if (dtRecallInfo != null && dtRecallInfo.length > 0) {
                                            dr = dtRecallInfo.filter(function (x) { return x.ITEM_ID == lnkItemId_4 && (x.LOT_NO == "" || x.LOT_NO == null) && (x.SERIAL_NO == "" || x.SERIAL_NO == null); });
                                            if (dr != null && dr.length > 0) {
                                                recvDetails.QTY = "";
                                                recvDetails.TXTQTYFLAG = true;
                                            }
                                        }
                                    }
                                }
                                else if (intScheduleCnt > 1) {
                                    recvDetails.SCHDFLAG = true;
                                    this.blnSchedsExist = true;
                                }
                                else if (strSerialControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || strLotControlled == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                    this.blnSchedsExist = true;
                                    recvDetails.SCHDFLAG = true;
                                }
                            }
                            recvDetails.NO_OF_BOXES = txtNoOfBoxes;
                            if (this.blnFlag == true && (txtQty == null || txtQty == "")) {
                                if (this.gblnASNPO == false && this.gStrDefaultInput == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
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
                        return [3 /*break*/, 3];
                    case 2:
                        ex_56 = _a.sent();
                        this.clientErrorMsg(ex_56, "schedulePo_RbtnChange");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.printSchedule = function () {
        try {
            this.statusMsgs = [];
            this.SaveScheduleItemsData('Print');
        }
        catch (ex) {
            this.clientErrorMsg(ex, "printSchedule");
        }
    };
    PoNonPoReceiptsComponent.prototype.goPage = function () {
        var _this = this;
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
                    this.dtScheduleItems.forEach(function (x) {
                        x.QTY = x.ASN_QTY, x.QTY_PO = x.LINE_PO_QTY, x.CARRIER_ID = x.SCHDQTYCHANGFLAG == true ? x.CARRIER_ID : "",
                            x.EXT_TRK_NO = "", x.NO_OF_BOXES = null, x.LOTSERIALSCHDFLAG = x.LOTSERIALSCHDFLAG == true ? true : x.LOTSERIALSCHDFLAG;
                    });
                    var _loop_8 = function (i) {
                        var lotserialitems = this_8.lstMainItemLotSerial.filter(function (x) { return x.ITEM_ID == _this.dtScheduleItems[i].INV_ITEM_ID && x.LINE_NBR.toString() == _this.dtScheduleItems[i].LINE_NBR.toString() &&
                            x.SCHED_NBR.toString() == _this.dtScheduleItems[i].SCHED_NBR.toString() && x.LOTSERIALSCHDFLG == true; });
                        for (var x = 0; x < lotserialitems.length; x++) {
                            var index = this_8.lstMainItemLotSerial.indexOf(lotserialitems[x]);
                            if (index !== -1) {
                                this_8.lstMainItemLotSerial.splice(index, 1);
                            }
                        }
                    };
                    var this_8 = this;
                    for (var i = 0; i < this.dtScheduleItems.length; i++) {
                        _loop_8(i);
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
    };
    /**
    *
    * End Scheduled PO
    */
    /**
     *
     * NonPO
     */
    PoNonPoReceiptsComponent.prototype.btnNonPo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.statusMsgs = [];
                try {
                    if (this.hdnNonPo == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                        this.confirmationService.confirm({
                            message: "Do you want to delete the existing PO/IUT?",
                            accept: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    this.spnrService.start();
                                    this.hdnConfirmPoDelete = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                                    this.hdnConfirmIUTDelete = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                                    this.hdnConfirmNonPo = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                                    this.recvSearchPos = false;
                                    this.recvIUTSearch = false;
                                    this.tbl = false;
                                    this.plus = true;
                                    this.minus = false;
                                    this.lstRecvSendPoLines = [];
                                    this.lstRecvIutItems = [];
                                    this.spnrService.stop();
                                    return [2 /*return*/];
                                });
                            }); },
                            reject: function () {
                                _this.hdnConfirmPoDelete = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                                _this.hdnConfirmIUTDelete = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                                _this.hdnConfirmNonPo = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                                _this.spnrService.stop();
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
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.getinitialvalues = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_57;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.statusMsgs = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
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
                        return [4 /*yield*/, this.generateTrackingId()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.populateShipToIdsDrpdwn(this.lstShipToIds)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.populateCarrierDropDown(this.poNewItem.CARRIER_ID)];
                    case 4:
                        _a.sent();
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
                        return [3 /*break*/, 6];
                    case 5:
                        ex_57 = _a.sent();
                        this.clientErrorMsg(ex_57, "getinitialvalues");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.generateTrackingId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentdate, ex_58;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.statusMsgs = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        currentdate = new Date();
                        if (!(this.gdonotDefaulttrackingNumber != 'Y')) return [3 /*break*/, 3];
                        this.btnTrackingNumber = false;
                        this.lblTrackingNumber = true;
                        return [4 /*yield*/, this.generateTrack()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.poNewItem.TRACKING_NBR = "";
                        this.btnTrackingNumber = true;
                        this.lblTrackingNumber = false;
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_58 = _a.sent();
                        this.clientErrorMsg(ex_58, "generateTrackingId");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.generateTrack = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_59;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.statusMsgs = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.recvPoNonPoService.generateTrackingNumber().catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                var testdata = data;
                                _this.poNewItem.TRACKING_NBR = testdata.toString();
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_59 = _a.sent();
                        this.clientErrorMsg(ex_59, "generateTrack");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnTrackingNumber_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.statusMsgs = [];
                try {
                    this.generateTrack();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "btnTrackingNumber_Click");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.AddZero = function (num) {
        this.statusMsgs = [];
        try {
            return (num >= 0 && num < 10) ? "0" + num : num + "";
        }
        catch (ex) {
            this.clientErrorMsg(ex, "AddZero");
        }
    };
    PoNonPoReceiptsComponent.prototype.bindModelDataChange = function (event) {
        this.statusMsgs = [];
        try {
            if ("txtShipId" == event.TextBoxID.toString()) {
                this.shipIDStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtTrackNo" == event.TextBoxID.toString()) {
                this.trackNoStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
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
    };
    PoNonPoReceiptsComponent.prototype.shipNonPoToId_selectChanged = function (option, event) {
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
    };
    PoNonPoReceiptsComponent.prototype.btnNonPoSend_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_60;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.statusMsgs = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.poNewItem.TRACKING_NBR == "" || this.poNewItem.TRACKING_NBR == null || this.poNewItem.TRACKING_NBR == undefined) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Enter Tracking#' });
                            return [2 /*return*/];
                        }
                        if (this.poNewItem.LOCATION == '' || this.poNewItem.LOCATION == null || this.poNewItem.LOCATION == undefined) {
                        }
                        else {
                            if (this.poNewItem.LOCATION.length > 30) {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Location value cannot be more than 30 chars' });
                                return [2 /*return*/];
                            }
                        }
                        if ((this.poNewItem.SHIPTO_ID == null || this.poNewItem.SHIPTO_ID == undefined || this.poNewItem.SHIPTO_ID == "" || this.poNewItem.SHIPTO_ID == "Select ShipToID")) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Enter ShipTo ID' });
                            return [2 /*return*/];
                        }
                        if (this.poNewItem.CARRIER_ID == 'Select Carrier' || this.poNewItem.CARRIER_ID == "" || this.poNewItem.CARRIER_ID == undefined) {
                            this.poNewItem.CARRIER_ID = "";
                        }
                        this.spnrService.start();
                        return [4 /*yield*/, this.nonPoInsert('')];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_60 = _a.sent();
                        this.clientErrorMsg(ex_60, "btnNonPoSend_Click");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnSaveNext_Click = function (save) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.statusMsgs = [];
                try {
                    this.spnrService.start();
                    this.SaveNonPo(save);
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "btnSaveNext_Click");
                }
                return [2 /*return*/];
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.SaveNonPo = function (save) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ex_61;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.statusCode = -1;
                        this.statusMsgs = [];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        if (this.poNewItem.TRACKING_NBR == "" || this.poNewItem.TRACKING_NBR == null || this.poNewItem.TRACKING_NBR == undefined) {
                            this.statusMsgs = [];
                            this.spnrService.stop();
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Enter Tracking#' });
                            return [2 /*return*/];
                        }
                        if (this.poNewItem.LOCATION == '' || this.poNewItem.LOCATION == null || this.poNewItem.LOCATION == undefined) {
                        }
                        else {
                            if (this.poNewItem.LOCATION.length > 30) {
                                this.statusMsgs = [];
                                this.spnrService.stop();
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Location value cannot be more than 30 chars' });
                                return [2 /*return*/];
                            }
                        }
                        if ((this.poNewItem.SHIPTO_ID == null || this.poNewItem.SHIPTO_ID == undefined || this.poNewItem.SHIPTO_ID == "" || this.poNewItem.SHIPTO_ID == "Select ShipToID")) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Enter ShipTo ID' });
                            this.spnrService.stop();
                            return [2 /*return*/];
                        }
                        if (this.poNewItem.CARRIER_ID == 'Select Carrier' || this.poNewItem.CARRIER_ID == "" || this.poNewItem.CARRIER_ID == undefined) {
                            this.poNewItem.CARRIER_ID = "";
                        }
                        _a = this;
                        return [4 /*yield*/, this.nonPoInsert(save)];
                    case 2:
                        _a.statusCode = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_61 = _b.sent();
                        this.clientErrorMsg(ex_61, "SaveNonPo");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.changeDate = function (date) {
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
    };
    PoNonPoReceiptsComponent.prototype.nonPoInsert = function (savenext) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var dateStr, ex_62;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.statusMsgs = [];
                        this.statusCode = -1;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        dateStr = new Date(new Date()).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                        //let date = new Date(dateStr);
                        this.lstNonPoItems = [];
                        if (this.poNewItem.LINE_NBR == undefined || this.poNewItem.LINE_NBR == "" || this.poNewItem.LINE_NBR == null) {
                            this.poNewItem.LINE_NBR = '0';
                        }
                        else {
                            this.poNewItem.LINE_NBR = this.poNewItem.LINE_NBR;
                        }
                        this.lstNonPoItems.push({
                            TRANSACTION_ID: null,
                            TRACKING_NBR: this.poNewItem.TRACKING_NBR,
                            LOCATION: this.poNewItem.LOCATION,
                            CARRIER_ID: this.poNewItem.CARRIER_ID,
                            DELIVER_TO: this.poNewItem.DELIVER_TO,
                            STATUS: AtParEnums_1.AppTransactionStatus.Receive.toString(),
                            USER_ID: this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID].toString(),
                            DESCR: this.poNewItem.DESCR,
                            VENDOR_NAME1: this.poNewItem.VENDOR_ID,
                            DEPT_ID: this.poNewItem.DEPT_ID,
                            PO_ID: this.poNewItem.PO_ID,
                            LINE_NBR: this.poNewItem.LINE_NBR,
                            SHIPTO_ID: this.poNewItem.SHIPTO_ID,
                            NON_PO_ITEM: AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString(),
                            TYPE_OF_PACKAGE: this.poNewItem.TYPE_OF_PACKAGE,
                            END_DT_TIME: dateStr.replace(',', ''),
                            START_DT_TIME: dateStr.replace(',', ''),
                            COMMENTS: this.poNewItem.COMMENTS,
                            LOCDESCR: this.poNewItem.LOCDESCR,
                            PO_DT: '',
                            VENDOR_ID: this.poNewItem.VENDOR_ID,
                            NOTES_COMMENTS: '',
                            NO_OF_PACKAGES: this.poNewItem.NO_OF_PACKAGES,
                        });
                        return [4 /*yield*/, this.recvPoNonPoService.sendNonPoDetails(this.lstNonPoItems).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spnrService.stop();
                                _this.statusMsgs = [];
                                _this.statusCode = data.StatusCode;
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.RECV_S_TRACKINGALREADYEXISTS) {
                                    _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Tracking# Already Exists' });
                                    return;
                                }
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.nonPoDisable = true;
                                        if (savenext == null || savenext == '') {
                                            _this.clearControls();
                                        }
                                        else {
                                            _this.poNewItem.DESCR = '';
                                            _this.poNewItem.COMMENTS = '';
                                            _this.poNewItem.PO_ID = '';
                                            _this.poNewItem.VENDOR_ID = '';
                                            _this.poNewItem.LINE_NBR = '';
                                            _this.poNewItem.NO_OF_PACKAGES = "1";
                                            _this.poNewItem.TYPE_OF_PACKAGE = '';
                                            _this.generateTrackingId();
                                            _this.poNewItem.CARRIER_ID = _this.poNewItem.CARRIER_ID;
                                            _this.populateShipToIdsDrpdwn(_this.lstShipToIds);
                                        }
                                        if (_this.blntxtShipIdDisable == true) {
                                            _this.nonPoDisable = false;
                                        }
                                        _this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Sent Successfully.' });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.statusCode];
                    case 3:
                        ex_62 = _a.sent();
                        this.clientErrorMsg(ex_62, "nonPoInsert");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnPrint_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var blnstockhdr, blnNonstkhdr, blnNonStockHed, blnStockHed, blnmsgdisplayed, intNoOfBoxses, drowRecStatus, drowRecNonStockStatus, drowRecStockStatus, drowPrnterDet, drowPrnterDet, _a, _b, ex_63;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.statusMsgs = [];
                        this.statusCode = -1;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 14, , 15]);
                        blnstockhdr = false;
                        blnNonstkhdr = false;
                        blnNonStockHed = false;
                        blnStockHed = false;
                        blnmsgdisplayed = false;
                        intNoOfBoxses = 0;
                        drowRecStatus = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.QTY != null && x.RECEIVED_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString(); }).ToArray();
                        drowRecNonStockStatus = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.QTY != null && x.RECEIVED_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && x.INVENTORY_ITEM == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString(); }).ToArray();
                        drowRecStockStatus = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.QTY != null && x.RECEIVED_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && x.INVENTORY_ITEM == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString(); }).ToArray();
                        if (this.poNewItem.NO_OF_PACKAGES == "" || this.poNewItem.NO_OF_PACKAGES == undefined || this.poNewItem.NO_OF_PACKAGES == null) {
                            this.intNoOfBoxses = 1;
                        }
                        else {
                            this.intNoOfBoxses = parseInt(this.poNewItem.NO_OF_PACKAGES);
                        }
                        if (!(this.lstSetUpProPrinters.length > 0)) return [3 /*break*/, 12];
                        if (!(this.gStrSelPrinter == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString())) return [3 /*break*/, 5];
                        drowPrnterDet = linq_es5_1.asEnumerable(this.lstSetUpProPrinters).Where(function (x) { return x.LABEL_DESCRIPTION == "NonPO"; }).ToArray();
                        if (!(drowPrnterDet != null && drowPrnterDet.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.showModalPopup(drowPrnterDet)];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Printer Not Configured for the Functionality NonPO" });
                        blnmsgdisplayed = true;
                        _c.label = 4;
                    case 4: return [3 /*break*/, 11];
                    case 5:
                        if (!(this.gStrDefPrinter != "")) return [3 /*break*/, 10];
                        drowPrnterDet = linq_es5_1.asEnumerable(this.lstSetUpProPrinters).Where(function (x) { return x.FRIENDLY_NAME == _this.gStrDefPrinter; }).ToArray();
                        if (!(drowPrnterDet != null && drowPrnterDet.length > 0)) return [3 /*break*/, 9];
                        if (!(drowPrnterDet[0].LABEL_DESCRIPTION == "NonPO")) return [3 /*break*/, 8];
                        blnNonStockHed = true;
                        _a = this;
                        return [4 /*yield*/, this.SaveNonPo('save')];
                    case 6:
                        _a.statusCode = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.printNonPONiceLabel(intNoOfBoxses, this.lstSetUpProPrinters, this.gStrDefPrinter)];
                    case 7:
                        _b.statusCode = _c.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to Print Non Po Label  " });
                            blnmsgdisplayed = true;
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        blnmsgdisplayed = true;
                        _c.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please setup printer settings " });
                        blnmsgdisplayed = true;
                        _c.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Configure Label Printers before Printing" });
                        blnmsgdisplayed = true;
                        _c.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        ex_63 = _c.sent();
                        this.clientErrorMsg(ex_63, "btnPrint_Click");
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.printNonPONiceLabel = function (noofLabels, printerDet, printerName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var strValue, pPrinterAddressOrName, pPrinterPort, pPrinterTye, pNiceLabelName, pNoOfPrints, pErrMsg, lstPrintTbl, drowPrnterDet, intNoOfBoxses, strFilter, prntResSet, drPrintRow, k, ex_64;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.statusMsgs = [];
                        this.statusCode = 0;
                        strValue = "";
                        pPrinterAddressOrName = "";
                        pPrinterPort = "";
                        pPrinterTye = "";
                        pNiceLabelName = "";
                        pNoOfPrints = "";
                        pErrMsg = "";
                        lstPrintTbl = [];
                        drowPrnterDet = [];
                        intNoOfBoxses = 0;
                        strFilter = "";
                        if (printerName == null && printerName == "") {
                            drowPrnterDet = linq_es5_1.asEnumerable(printerDet).Where(function (x) { return x.LABEL_DESCRIPTION == "NonPO"; }).ToArray();
                        }
                        else {
                            drowPrnterDet = linq_es5_1.asEnumerable(printerDet).Where(function (x) { return x.LABEL_DESCRIPTION == "NonPO" && x.FRIENDLY_NAME == printerName; }).ToArray(); //check once LABEL_DESCRIPTION 
                        }
                        if (drowPrnterDet.length == 0) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Configure Non Stock Label Printer" });
                            return [2 /*return*/];
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
                        prntResSet = linq_es5_1.asEnumerable(this.lstRecvSendPoLines).Where(function (x) { return x.INVENTORY_ITEM == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString(); }).ToArray();
                        drPrintRow = new vm_recv_nonpo_printerdetails_1.VM_RECV_NONPO_PRINTERDETAILS();
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
                        drPrintRow.USER_ID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID].toString();
                        drPrintRow.VENDOR = this.poNewItem.VENDOR_ID;
                        k = 1;
                        _a.label = 1;
                    case 1:
                        if (!(k <= intNoOfBoxses)) return [3 /*break*/, 4];
                        drPrintRow.NO_OF_BOXES = k + " of " + intNoOfBoxses;
                        lstPrintTbl.push(drPrintRow);
                        if (!(lstPrintTbl != null && lstPrintTbl.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.recvPoNonPoService.printNiceLabel(pPrinterAddressOrName, pPrinterPort, pPrinterTye, pNiceLabelName, pNoOfPrints, pErrMsg, lstPrintTbl).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spnrService.stop();
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Sent Sucessfully." });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to Print Non Stock Header Label" });
                            return [2 /*return*/, this.statusCode];
                        }
                        _a.label = 3;
                    case 3:
                        k++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, this.statusCode];
                    case 5:
                        ex_64 = _a.sent();
                        this.clientErrorMsg(ex_64, "printNonPONiceLabel");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.clearControls = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_65;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
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
                        return [4 /*yield*/, this.populateShipToIdsDrpdwn(this.lstShipToIds)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.populateCarrierDropDown(this.poNewItem.CARRIER_ID)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_65 = _a.sent();
                        this.clientErrorMsg(ex_65, "clearControls");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnGoBack_Click = function () {
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
    };
    PoNonPoReceiptsComponent.prototype.btnRecipient_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_66;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.statusMsgs = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        this.lstRecipientsChck = [];
                        if (!(this.poNewItem.DELIVER_TO == "" || this.poNewItem.DELIVER_TO == undefined || this.poNewItem.DELIVER_TO == null)) return [3 /*break*/, 2];
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Recipient is Mandatory" });
                        return [3 /*break*/, 4];
                    case 2:
                        this.page = false;
                        this.nonPO = false;
                        this.nonPOReceipts = true;
                        return [4 /*yield*/, this.getRecipients(this.poNewItem.DELIVER_TO)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_66 = _a.sent();
                        this.clientErrorMsg(ex_66, "btnRecipient_Click");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.getRecipients = function (recipient) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_67;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.statusMsgs = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.recvPoNonPoService.getRecipients(recipient).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.blnRecipients = false;
                                _this.spnrService.stop();
                                _this.statusMsgs = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstRecipients = data.DataList;
                                        if (_this.lstRecipients.length > 0) {
                                            _this.blnRecipients = true;
                                        }
                                        if (_this.lstRecipients.length <= 0) {
                                            _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Records were returned' });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_67 = _a.sent();
                        this.clientErrorMsg(ex_67, "getRecipients");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PoNonPoReceiptsComponent.prototype.btnGoBackRecipient_Click = function () {
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
    };
    PoNonPoReceiptsComponent.prototype.changeStatus = function (ven3) {
        this.statusMsgs = [];
        try {
            this.lstRecipientsChck = [];
            if (ven3 != null || ven3 != undefined) {
                var dd = ven3;
                this.lstRecipientsChck.push(ven3);
                return;
            }
            else {
                this.statusMsgs.push({
                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select the Recipient."
                });
                return;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "changeStatus");
        }
    };
    PoNonPoReceiptsComponent.prototype.btnRecipientAdd_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.statusMsgs = [];
                try {
                    if (this.lstRecipientsChck == undefined || this.lstRecipientsChck == null || this.lstRecipientsChck.length == 0) {
                        this.statusMsgs.push({
                            severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select the Recipient."
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
                            severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Recipient Details Saved Successfully"
                        });
                        this.lstRecipientsChck = [];
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "btnRecipientAdd_Click");
                }
                return [2 /*return*/];
            });
        });
    };
    /**
    *
    * End NonPO
    */
    PoNonPoReceiptsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.statusMsgs = [];
        this.atParConstant.catchClientError(this.statusMsgs, this.spnrService, strExMsg.toString(), funName, this.constructor.name);
    };
    PoNonPoReceiptsComponent.prototype.ngOnDestroy = function () {
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
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PoNonPoReceiptsComponent.prototype, "appId", void 0);
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], PoNonPoReceiptsComponent.prototype, "dataTableComponent", void 0);
    PoNonPoReceiptsComponent = __decorate([
        core_1.Component({
            templateUrl: 'recv-po-nonpo-receipts.component.html',
            providers: [datatableservice_1.datatableservice, atpar_common_service_1.AtParCommonService, recv_po_nonpo_receipts_service_1.RecvPoNonPoReceiptsService, api_1.ConfirmationService]
        }),
        __param(5, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice, event_spinner_service_1.SpinnerService,
            HttpService_1.HttpService,
            AtParConstants_1.AtParConstants,
            atpar_common_service_1.AtParCommonService, Object, recv_po_nonpo_receipts_service_1.RecvPoNonPoReceiptsService,
            api_1.ConfirmationService])
    ], PoNonPoReceiptsComponent);
    return PoNonPoReceiptsComponent;
}());
exports.PoNonPoReceiptsComponent = PoNonPoReceiptsComponent;
//# sourceMappingURL=recv-po-nonpo-receipts.component.js.map