namespace AtPar.ViewModel
{
    public class VM_MT_ATPAR_DYNAMIC_REPORT
    {
        public short APP_ID { get; set; }
        public string OBJECT_ID { get; set; }
        public int LINE_NO { get; set; }
        public string FIELD_NAME { get; set; }
        public string FIELD_TYPE { get; set; }
        public string TEXT_VALUE { get; set; }
        public string FIELD_GROUP { get; set; }
        public short ROW_POSITION { get; set; }
        public short COLUMN_POSITION { get; set; }
        public string DISPLAY_NAME { get; set; }
        public bool VISIBLE { get; set; }
        public int FIELD_SIZE { get; set; }
        public string ALIGNMENT { get; set; }
        public string HEADERFONT { get; set; }
        public string VALUEFONT { get; set; }
        public string SECTION { get; set; }
    }
}
