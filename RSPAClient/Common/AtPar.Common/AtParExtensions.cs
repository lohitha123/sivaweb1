using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Reflection.Emit;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AtPar.Common
{
    public static class AtParExtensions
    {
        public static string ReplaceString(this string sourceValue)
        {
            if (string.IsNullOrEmpty(sourceValue) == false)
            {
                return sourceValue.Replace("'", "''");
            }
            else
            {
                return sourceValue;
            }
           
        }

        public static string HandleNull(this string sourceValue)
        {
            if (string.IsNullOrEmpty(sourceValue))
            {
                return string.Empty;
            }
            else
            {
                return sourceValue;
            }
            
        }

        public static string ReplaceAmpersand(this string sourceValue)
        {
            return sourceValue.Replace("&amp;", "&");
        }

        public static string CleanString(this string sourceValue)
        {
            // Clean up the string with out any single/double quotations.
            sourceValue.Replace("<", "$@PARLT@PAR$");
            sourceValue.Replace(">", "$@PARLT@PAR$");
            sourceValue.Replace("\'", string.Empty);
            return sourceValue;

        }

        public static string substituteString(this string sourceValue)
        {
           
            sourceValue.Replace("&", "&amp;");
            sourceValue.Replace("$@PARLT@PAR$", "&lt;");
            sourceValue.Replace("$@PARGT@PAR$", "&gt;");
            return sourceValue;

        }
        public static void ReplaceProperty<T>(this T obj, Expression<Func<T, object>> property)
        {
            MemberExpression body = (MemberExpression)property.Body;
            if (obj.GetType().GetProperty(body.Member.Name).GetValue(obj, null) != null)
            {
                if (!string.IsNullOrEmpty(obj.GetType().GetProperty(body.Member.Name).GetValue(obj, null).ToString()))
                {
                    var s = obj.GetType().GetProperty(body.Member.Name).GetValue(obj, null).ToString().Replace("'", "''");
                    obj.GetType().GetProperty(body.Member.Name).SetValue(obj, s);
                }                
            }
            
        }

        /// <summary>
        /// checks whether string is null or not
        /// if null returns as empty string else returns same
        /// </summary>
        /// <param name="sourceValue"></param>
        /// <returns></returns>
        public static string ReplaceNullwithEmpty(this string sourceValue)
        {
            return sourceValue == null ? string.Empty : sourceValue;
        }

        /// <summary>
        /// converting list to dataset
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="list"></param>
        /// <returns></returns>
        public static DataSet ToDataSet<T>(this IList<T> list)
        {
            Type elementType = typeof(T);
            DataSet ds = new DataSet();
            DataTable t = new DataTable();
            ds.Tables.Add(t);

            //add a column to table for each public property on T
            foreach (var propInfo in elementType.GetProperties())
            {
                t.Columns.Add(propInfo.Name);
            }

            //go through each property on T and add each value to the table
            foreach (T item in list)
            {
                DataRow row = t.NewRow();
                foreach (var propInfo in elementType.GetProperties())
                {
                    row[propInfo.Name] = propInfo.GetValue(item, null);

                }

                t.Rows.Add(row);
            }

            return ds;
        }

        /// <summary>
        /// Replaces duoble quotes with empty string
        /// </summary>
        /// <param name="sourceValue"></param>
        /// <returns></returns>
        public static string ReplaceQuotesWithEmpty(this string sourceValue)
        {
            return sourceValue.Replace("\"", string.Empty);
        }        
            /// <summary>
            ///  Convert a database data table to a runtime dynamic definied type collection (dynamic class' name as table name).
            /// </summary>
            /// <param name="dt"></param>
            /// <param name="className"></param>
            /// <returns></returns>
            public static List<dynamic> ToDynamicList(this DataTable dt, string className)
            {
                return ToDynamicList(ToDictionary(dt), getNewObject(dt.Columns, className));
            }

            private static List<Dictionary<string, object>> ToDictionary(DataTable dt)
            {
                var columns = dt.Columns.Cast<DataColumn>();
                var Temp = dt.AsEnumerable().Select(dataRow => columns.Select(column =>
                                     new { Column = column.ColumnName, Value = dataRow[column] })
                                 .ToDictionary(data => data.Column, data => data.Value)).ToList();
                return Temp.ToList();
            }

            private static List<dynamic> ToDynamicList(List<Dictionary<string, object>> list, Type TypeObj)
            {
                dynamic temp = new List<dynamic>();
                foreach (Dictionary<string, object> step in list)
                {
                    object Obj = Activator.CreateInstance(TypeObj);

                    PropertyInfo[] properties = Obj.GetType().GetProperties();

                    Dictionary<string, object> DictList = (Dictionary<string, object>)step;

                    foreach (KeyValuePair<string, object> keyValuePair in DictList)
                    {
                        foreach (PropertyInfo property in properties)
                        {
                            if (property.Name == keyValuePair.Key)
                            {
                                if (keyValuePair.Value != null && keyValuePair.Value.GetType() != typeof(System.DBNull))
                                {
                                    if (keyValuePair.Value.GetType() == typeof(System.Guid))
                                    {
                                        property.SetValue(Obj, keyValuePair.Value, null);
                                    }
                                    else
                                    {
                                        property.SetValue(Obj, keyValuePair.Value, null);
                                    }
                                }
                                break;
                            }
                        }
                    }
                    temp.Add(Obj);
                }
                return temp;
            }

            private static Type getNewObject(DataColumnCollection columns, string className)
            {
                AssemblyName assemblyName = new AssemblyName();
                assemblyName.Name = "YourAssembly";
                System.Reflection.Emit.AssemblyBuilder assemblyBuilder = Thread.GetDomain().DefineDynamicAssembly(assemblyName, AssemblyBuilderAccess.Run);
                ModuleBuilder module = assemblyBuilder.DefineDynamicModule("YourDynamicModule");
                TypeBuilder typeBuilder = module.DefineType(className, TypeAttributes.Public);

                foreach (DataColumn column in columns)
                {
                    string propertyName = column.ColumnName;
                    FieldBuilder field = typeBuilder.DefineField(propertyName, column.DataType, FieldAttributes.Public);
                    PropertyBuilder property = typeBuilder.DefineProperty(propertyName, System.Reflection.PropertyAttributes.None, column.DataType, new Type[] { column.DataType });
                    MethodAttributes GetSetAttr = MethodAttributes.Public | MethodAttributes.HideBySig;
                    MethodBuilder currGetPropMthdBldr = typeBuilder.DefineMethod("get_value", GetSetAttr, column.DataType, new Type[] { column.DataType }); // Type.EmptyTypes);
                    ILGenerator currGetIL = currGetPropMthdBldr.GetILGenerator();
                    currGetIL.Emit(OpCodes.Ldarg_0);
                    currGetIL.Emit(OpCodes.Ldfld, field);
                    currGetIL.Emit(OpCodes.Ret);
                    MethodBuilder currSetPropMthdBldr = typeBuilder.DefineMethod("set_value", GetSetAttr, null, new Type[] { column.DataType });
                    ILGenerator currSetIL = currSetPropMthdBldr.GetILGenerator();
                    currSetIL.Emit(OpCodes.Ldarg_0);
                    currSetIL.Emit(OpCodes.Ldarg_1);
                    currSetIL.Emit(OpCodes.Stfld, field);
                    currSetIL.Emit(OpCodes.Ret);
                    property.SetGetMethod(currGetPropMthdBldr);
                    property.SetSetMethod(currSetPropMthdBldr);
                }
                Type obj = typeBuilder.CreateType();
                return obj;
            }        
    }
}
