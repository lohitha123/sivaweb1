export class VM_POU_GETCASEREVIEW_RPT_CASE_ITEM_INFO {
        public ITEM :string
        public ITEM_DESCRIPTION :string
        public ITEM_COST :any
        public PICKED :any
        public ISSUED_DURING_PROCEDURE :any
        public RETURNED :any
        public WASTED :any
        public CONSUMED :any
        public CONSUMED_COST: any
        public ITEMDETAILS: any[] = [];

        public CHILDPICKEDTOTAL: any=0;
        public CHILDISSUEDTOTAL: any=0;
        public CHILDRETURNEDTOTAL: any=0;
        public CHILDWASTEDTOTAL: any=0;
        public CHILDCONSUMEDTOTAL: any=0;

    }