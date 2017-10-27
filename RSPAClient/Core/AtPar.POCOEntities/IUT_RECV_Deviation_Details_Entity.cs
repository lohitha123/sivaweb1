using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.POCOEntities
{
    public class IUT_RECV_Deviation_Details_Entity
    {
        #region "Member Variables"
        private int m_Transaction_Id;
        private int m_Line_No;
        private int m_Sched_No;
        private string m_Serial_Id;
        private string m_Lot_Id;
        private string m_Recv_Uom;
        private double m_Recv_Conversion_Rate;
        private double m_Qty;
        #endregion
        private System.DateTime m_Expiry_date;

        #region "Properties"

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
        /// Holds the value of Line No
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
        /// Holds the value of Scheduled No
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public int Sched_No
        {
            get { return m_Sched_No; }
            set { m_Sched_No = value; }
        }
        /// <summary>
        /// Holds the value of serial id
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public string Serial_Id
        {
            get { return m_Serial_Id; }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    m_Serial_Id = string.Empty;
                }
                else
                {
                    m_Serial_Id = value;
                }
            }
        }
        /// <summary>
        /// Holds the value of lot id
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public string Lot_Id
        {
            get { return m_Lot_Id; }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    m_Lot_Id = string.Empty;
                }
                else
                {
                    m_Lot_Id = value;
                }
            }
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
        /// Holds the value of Quantity
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public double QTY
        {
            get { return m_Qty; }
            set { m_Qty = value; }
        }
        /// <summary>
        /// Holds the value of Expiry date
        /// </summary>
        /// <value></value>
        /// <returns></returns>
        /// <remarks></remarks>
        public System.DateTime Expiry_date
        {
            get { return m_Expiry_date; }
            set { m_Expiry_date = value; }
        }

        #endregion

    }
}
