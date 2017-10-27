using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Reflection.Emit;
using System.ComponentModel;
using log4net;

namespace AtPar.Common
{
    public static class Utils
    {
        public static T CustomCast<T>(this Object myobj)
        {
            Type objectType = myobj.GetType();
            Type target = typeof(T);
            var x = Activator.CreateInstance(target, false);
            var z = from source in objectType.GetMembers().ToList()
                    where source.MemberType == MemberTypes.Property
                    select source;
            var d = from source in target.GetMembers().ToList()
                    where source.MemberType == MemberTypes.Property
                    select source;
            List<MemberInfo> members = d.Where(memberInfo => d.Select(c => c.Name)
               .ToList().Contains(memberInfo.Name)).ToList();
            PropertyInfo propertyInfo;
            object value;
            foreach (var memberInfo in members)
            {
                propertyInfo = typeof(T).GetProperty(memberInfo.Name);
                value = myobj.GetType().GetProperty(memberInfo.Name).GetValue(myobj, null);

                propertyInfo.SetValue(x, value, null);
            }
            return (T)x;
        }


        public static IList<Object> ExecuteSProc<Object>(this DbContext ctx, string schema, string sproc, params SqlParameter[] para)
        {
            return ctx.Database.SqlQuery<Object>("Execute " + schema + "." + sproc, para).ToList();
        }
        public static IList<Object> ExecuteSProc<Object>(this DbContext ctx, string schema, string query)
        {
            return ctx.Database.SqlQuery<Object>(schema + "." + query).ToList();
        }
        public static T ExecuteSProcSingle<T>(this DbContext ctx, string schema, string sproc, params SqlParameter[] para)
        {
            return ctx.Database.SqlQuery<T>("Execute " + schema + "." + sproc, para).SingleOrDefault();
        }

        public static int ExecuteSProc(this DbContext ctx, string schema, string sproc, params SqlParameter[] para)
        {
            return ctx.Database.ExecuteSqlCommand("Execute " + schema + "." + sproc, para);
        }
        public static IEnumerable<T> DynamicSqlQuery<T>(this Database database, string[] fields, string sql, params object[] parameters) where T : new()
        {
            //Example for Query.
            // var fields = new[] { "PersonID", "LastName", "FirstName" };
            //var sql = string.Format("SELECT {0}  From Person", string.Join(", ", fields));
            //var person1 = db.Database.DynamicSqlQuery<StudentGrade>(fields, sql).ToList();


            //Eample Procedure Calling
            //var fields = new[] { "CourseID", "StudentID", "EnrollmentID" };
            //var sql = string.Format("exec GetStudentGrades", string.Join(", ", fields));
            //SqlParameter param1 = new SqlParameter("@StudentID", 2);
            //SqlParameter[] paramara = new SqlParameter[] { };
            // var person1 = db.Database.DynamicSqlQuery<StudentGrade>(fields, sql, paramara).ToList();
            var type = typeof(T);

            var builder = CreateTypeBuilder("AtparDynamicAssembly", "AtparDynamicModule", "AtparDynamicType");

            foreach (var field in fields)
            {
                var prop = type.GetProperty(field);
                var propertyType = prop.PropertyType;
                CreateAutoImplementedProperty(builder, field, propertyType);
            }

            var resultType = builder.CreateType();

            var items = database.SqlQuery(resultType, sql, parameters);
            foreach (object item in items)
            {
                var obj = new T();
                var itemType = item.GetType();
                foreach (var prop in itemType.GetProperties(BindingFlags.Instance | BindingFlags.Public))
                {
                    var name = prop.Name;
                    var value = prop.GetValue(item, null);
                    type.GetProperty(name).SetValue(obj, value);
                }
                yield return obj;
            }
        }

        private static TypeBuilder CreateTypeBuilder(string assemblyName, string moduleName, string typeName)
        {
            TypeBuilder typeBuilder = AppDomain
                .CurrentDomain
                .DefineDynamicAssembly(new AssemblyName(assemblyName), AssemblyBuilderAccess.Run)
                .DefineDynamicModule(moduleName)
                .DefineType(typeName, TypeAttributes.Public);
            typeBuilder.DefineDefaultConstructor(MethodAttributes.Public);
            return typeBuilder;
        }

        private static void CreateAutoImplementedProperty(TypeBuilder builder, string propertyName, Type propertyType)
        {
            const string privateFieldPrefix = "m_";
            const string getterPrefix = "get_";
            const string setterPrefix = "set_";

            // Generate the field.
            FieldBuilder fieldBuilder = builder.DefineField(
                string.Concat(privateFieldPrefix, propertyName),
                              propertyType, FieldAttributes.Private);

            // Generate the property
            PropertyBuilder propertyBuilder = builder.DefineProperty(
                propertyName, System.Reflection.PropertyAttributes.HasDefault, propertyType, null);

            // Property getter and setter attributes.
            MethodAttributes propertyMethodAttributes =
                MethodAttributes.Public | MethodAttributes.SpecialName |
                MethodAttributes.HideBySig;

            // Define the getter method.
            MethodBuilder getterMethod = builder.DefineMethod(
                string.Concat(getterPrefix, propertyName),
                propertyMethodAttributes, propertyType, Type.EmptyTypes);

            // Emit the IL code.
            // ldarg.0
            // ldfld,_field
            // ret
            ILGenerator getterILCode = getterMethod.GetILGenerator();
            getterILCode.Emit(OpCodes.Ldarg_0);
            getterILCode.Emit(OpCodes.Ldfld, fieldBuilder);
            getterILCode.Emit(OpCodes.Ret);

            // Define the setter method.
            MethodBuilder setterMethod = builder.DefineMethod(
                string.Concat(setterPrefix, propertyName),
                propertyMethodAttributes, null, new Type[] { propertyType });

            // Emit the IL code.
            // ldarg.0
            // ldarg.1
            // stfld,_field
            // ret
            ILGenerator setterILCode = setterMethod.GetILGenerator();
            setterILCode.Emit(OpCodes.Ldarg_0);
            setterILCode.Emit(OpCodes.Ldarg_1);
            setterILCode.Emit(OpCodes.Stfld, fieldBuilder);
            setterILCode.Emit(OpCodes.Ret);

            propertyBuilder.SetGetMethod(getterMethod);
            propertyBuilder.SetSetMethod(setterMethod);
        }

        public static MethodInfo CreateERPObjectInstance(string erpObjectName, string className, string methodName, out object _reflectObject)
        {
            if (string.IsNullOrEmpty(erpObjectName))
            {
                throw new Exception("Input parameter erpObjectName " + erpObjectName + " : has not been provided");
            }

            Type classType = null;
            Assembly erpObjectAssembly = null;

            try
            {
                // to do need to use this
                //Assembly erpObjectAssembly = Assembly.LoadFrom(AppDomain.CurrentDomain.BaseDirectory + erpObjectName + ".dll");

                //Debuging ERP 
                //erpObjectAssembly = Assembly.LoadFrom(@"E:\3.0\Lawson\bin\Debug\StockIssue_Lawson.dll");
                //erpObjectAssembly = Assembly.LoadFrom(@"C:\AtPar\bin\" + erpObjectName + ".dll");

                string strpath = AppDomain.CurrentDomain.BaseDirectory.ToCharArray()[0].ToString() + @":\AtPar\bin\";
                erpObjectAssembly = Assembly.LoadFrom(strpath + erpObjectName + ".dll");

                className = erpObjectName + "." + className;
                classType = erpObjectAssembly.GetType(className);
                _reflectObject = Activator.CreateInstance(classType);
                MethodInfo callingMethodInfo = classType.GetMethod(methodName);

                object reflectObject = Activator.CreateInstance(classType);

                return callingMethodInfo;

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                classType = null;
                erpObjectAssembly = null;
            }

        }
        // Converting DataTable To List 
        public static List<T> ToList<T>(this DataTable table) where T : class, new()
        {
            try
            {
                List<T> list = new List<T>();

                foreach (var row in table.AsEnumerable())
                {
                    T obj = new T();

                    foreach (var prop in obj.GetType().GetProperties())
                    {
                        try
                        {
                            PropertyInfo propertyInfo = obj.GetType().GetProperty(prop.Name);
                            propertyInfo.SetValue(obj, Convert.ChangeType(row[prop.Name], propertyInfo.PropertyType), null);
                        }
                        catch
                        {
                            continue;
                        }
                    }
                    list.Add(obj);
                }
                return list;
            }
            catch
            {
                return null;
            }
        }

        //List To DataTable

        public static DataTable ToDataTable<T>(this IList<T> data)
        {
            PropertyDescriptorCollection props =
                TypeDescriptor.GetProperties(typeof(T));
            DataTable table = new DataTable();
            for (int i = 0; i < props.Count; i++)
            {
                PropertyDescriptor prop = props[i];
                //table.Columns.Add(prop.Name, prop.PropertyType);
                table.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
            }
            object[] values = new object[props.Count];
            foreach (T item in data)
            {
                for (int i = 0; i < values.Length; i++)
                {
                    values[i] = props[i].GetValue(item);
                }
                table.Rows.Add(values);
            }
            return table;
        }

        public static void SetProductLog(AtParWebEnums.EnumApps productEnum)
        {
            log4net.ThreadContext.Properties[AtParWebEnums.LOGPROPERTIES.PRODUCTNAME.ToString()] = productEnum;
        }

        public static void SetUserLog(string userID)
        {
            log4net.ThreadContext.Properties[AtParWebEnums.LOGPROPERTIES.USERNAME.ToString()] = userID;
        }

        public static void SetSystemLog(string systemID)
        {
            log4net.ThreadContext.Properties[AtParWebEnums.LOGPROPERTIES.SYSTEMID.ToString()] = systemID;
        }

        public static void SetLoggerType(this ILog log, Type type)
        {
            LogManager.GetLogger(type);
        }
    }
}
