using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.POCOEntities
{
   public class Receive_Deviation_Header_Entity
    {
        private int m_Transaction_Id;
        private int m_Line_No;
        private string m_Business_Unit;
        private string m_PO_ID;
        private int m_PO_Line_No;
        private int m_PO_Sched_No;
        private string m_Inv_Item_Id;
        private string m_Description;
        private string m_Unit_Of_Measure;
        private double m_Qty_PO;
        private double m_Qty;
        private double m_ASN_Qty;
        private string m_Recv_Uom;
        private double m_Recv_Conversion_Rate;
        private string m_Inventory_Item;
        private int m_Deviation_Type;
        private string m_Vendor_Id;
        private string m_Carrier_Id;
        private string m_Custom_Item_No;
        private System.DateTime m_Due_Date;
        private System.DateTime m_Receipt_Date;
        private System.DateTime m_update_Date;
        private string m_Report_Data_1;
        private string m_Report_Data_2;
        private string m_Report_Data_3;
        private string m_Report_Data_4;
        private string m_Report_Data_5;
        private string m_Location;
        private string m_User_Id;

        /// <summary>
        /// Holds the value of Transction ID
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public int Transaction_Id
        {
            get { return m_Transaction_Id; }
            set { m_Transaction_Id = value; }
        }
        /// <summary>
        /// Holds the value of Line no
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public int Line_No
        {
            get { return m_Line_No; }
            set { m_Line_No = value; }
        }
        /// <summary>
        /// Holds the value of business unit
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public string Business_Unit
        {
            get { return m_Business_Unit; }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    m_Business_Unit = string.Empty;
                }
                else
                {
                    m_Business_Unit = value;
                }
            }
        }
        /// <summary>
        /// Holds the value of po id
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public string PO_ID
        {
            get { return m_PO_ID; }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    m_PO_ID = string.Empty;
                }
                else
                {
                    m_PO_ID = value;
                }
            }
        }
        /// <summary>
        /// Holds the value of line no
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public int PO_Line_No
        {
            get { return m_PO_Line_No; }
            set { m_PO_Line_No = value; }
        }
        /// <summary>
        /// Holds the value of scheduled no
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public int PO_Sched_No
        {
            get { return m_PO_Sched_No; }
            set { m_PO_Sched_No = value; }
        }
        /// <summary>
        /// Holds the value of item id
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public string Inv_Item_Id
        {
            get { return m_Inv_Item_Id; }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    m_Inv_Item_Id = string.Empty;
                }
                else
                {
                    m_Inv_Item_Id = value;
                }
            }
        }
        /// <summary>
        /// Holds the value of description
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public string Description
        {
            get { return m_Description; }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    m_Description = string.Empty;
                }
                else
                {
                    m_Description = value;
                }
            }
        }
        /// <summary>
        /// Holds the value of unit of measure
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public string Unit_Of_Measure
        {
            get { return m_Unit_Of_Measure; }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    m_Unit_Of_Measure = string.Empty;
                }
                else
                {
                    m_Unit_Of_Measure = value;
                }
            }
        }
        /// <summary>
        /// Holds the value of po qty 
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public double Qty_PO
        {
            get { return m_Qty_PO; }
            set { m_Qty_PO = value; }
        }
        /// <summary>
        /// Holds the value of qty
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public double Qty
        {
            get { return m_Qty; }
            set { m_Qty = value; }
        }
        /// <summary>
        /// Holds the value of Asn qty
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public double ASN_Qty
        {
            get { return m_ASN_Qty; }
            set { m_ASN_Qty = value; }
        }
        /// <summary>
        /// Holds the value of Uom
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>

        public string Recv_Uom
        {
            get { return m_Recv_Uom; }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    m_Recv_Uom = string.Empty;
                }
                else
                {
                    m_Recv_Uom = value;
                }
            }
        }
        /// <summary>
        /// Holds the value of conversion rate
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public double Recv_Conversion_Rate
        {
            get { return m_Recv_Conversion_Rate; }
            set { m_Recv_Conversion_Rate = value; }
        }
        /// <summary>
        /// Holds the value of Inventory item
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public string Inventory_Item
        {
            get { return m_Inventory_Item; }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    m_Inventory_Item = string.Empty;
                }
                else
                {
                    m_Inventory_Item = value;
                }
            }
        }
        /// <summary>
        /// Holds the value of deviation Type
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public int Deviation_Type
        {
            get { return m_Deviation_Type; }
            set { m_Deviation_Type = value; }
        }
        /// <summary>
        /// Holds the value of vendor id
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public string Vendor_Id
        {
            get { return m_Vendor_Id; }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    m_Vendor_Id = string.Empty;
                }
                else
                {
                    m_Vendor_Id = value;
                }
            }
        }
        /// <summary>
        /// Holds the value of  carrier id
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public string Carrier_Id
        {
            get { return m_Carrier_Id; }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    m_Carrier_Id = string.Empty;
                }
                else
                {
                    m_Carrier_Id = value;
                }
            }
        }
        /// <summary>
        /// Holds the value of customer item no
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public string Custom_Item_No
        {
            get { return m_Custom_Item_No; }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    m_Custom_Item_No = string.Empty;
                }
                else
                {
                    m_Custom_Item_No = value;
                }
            }
        }
        /// <summary>
        /// Holds the value of due date
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public System.DateTime Due_Date
        {
            get { return m_Due_Date; }
            set { m_Due_Date = value; }
        }
        /// <summary>
        /// Holds the value of receipt date
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public System.DateTime Receipt_Date
        {
            get { return m_Receipt_Date; }
            set { m_Receipt_Date = value; }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public System.DateTime update_Date
        {
            get { return m_update_Date; }
            set { m_update_Date = value; }
        }
        /// <summary>
        /// Holds the value of report data
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public string Report_Data_1
        {
            get { return m_Report_Data_1; }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    m_Report_Data_1 = string.Empty;
                }
                else
                {
                    m_Report_Data_1 = value;
                }
            }
        }
        /// <summary>
        /// Holds the value of report data
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public string Report_Data_2
        {
            get { return m_Report_Data_2; }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    m_Report_Data_2 = string.Empty;
                }
                else
                {
                    m_Report_Data_2 = value;
                }
            }
        }
        /// <summary>
        /// Holds the value of report data
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public string Report_Data_3
        {
            get { return m_Report_Data_3; }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    m_Report_Data_3 = string.Empty;
                }
                else
                {
                    m_Report_Data_3 = value;
                }
            }
        }
        /// <summary>
        /// Holds the value of report data
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public string Report_Data_4
        {
            get { return m_Report_Data_4; }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    m_Report_Data_4 = string.Empty;
                }
                else
                {
                    m_Report_Data_4 = value;
                }
            }
        }
        /// <summary>
        /// Holds the value of report data
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public string Report_Data_5
        {
            get { return m_Report_Data_5; }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    m_Report_Data_5 = string.Empty;
                }
                else
                {
                    m_Report_Data_5 = value;
                }
            }
        }
        /// <summary>
        /// Holds the value of location
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public string Location
        {
            get { return m_Location; }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    m_Location = string.Empty;
                }
                else
                {
                    m_Location = value;
                }
            }
        }
        /// <summary>
        /// Holds the value of user id
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public string User_Id
        {
            get { return m_User_Id; }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    m_User_Id = string.Empty;
                }
                else
                {
                    m_User_Id = value;
                }
            }
        }


    }
}
