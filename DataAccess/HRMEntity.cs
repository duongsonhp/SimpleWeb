using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Data.Entity.Infrastructure;
using System.Data.Entity;
using Tools;
//using System.Data.SqlClient;
using System.Data;
using MySql.Data.MySqlClient;
using MySql.Data;
using System.Dynamic;
using System.ComponentModel.DataAnnotations;
using System.Configuration;
// using ReadWriteTextFile;

namespace DataAccess
{
    public class HRMEntity<T> : IHRMEntity<T> where T : class
    {
        public static string configPath = @"D:\Users\duong\source\repos\SimpleWeb\DataAccess\Config.txt";
        public static string connectionString = (string)ConfigurationManager.AppSettings["cnnstr"];
        /// <summary> Sơn 22/11/2020
        /// Lấy toàn bộ bản ghi
        /// </summary>
        /// <returns></returns>
        public IList<T> Get()
        {
            var result = new List<T>();
            //var config = new GetConfig(configPath, "connectionString");
            //var connectionString = config.Get();
            using (var connection = new MySqlConnection(connectionString))
            {
                var query = $"select * from {typeof(T).Name};";
                var command = new MySqlCommand(query, connection);
                command.CommandType = CommandType.Text;
                using (var adapter = new MySqlDataAdapter(command))
                {
                    using (var dataTable = new DataTable())
                    {
                        adapter.Fill(dataTable);

                        if (dataTable != null && dataTable.Rows.Count > 0)
                        {
                            var columns = dataTable.Columns.Cast<DataColumn>().ToList();
                            var rows = dataTable.Rows.Cast<DataRow>().ToList();
                            var headerNames = columns.Select(col => col.ColumnName).ToList();

                            //// Find properties name or columns name
                            //if (isFirstRowColumnsHeader)
                            //{
                            //for (var i = 0; i < headerNames.Count; i++)
                            //{
                            //    if (rows[0][i] != DBNull.Value && !string.IsNullOrEmpty(rows[0][i].ToString()))
                            //        headerNames[i] = rows[0][i].ToString();
                            //}

                            //
                            // remove first row because that is header
                            // rows.RemoveAt(0);
                            //}

                            // Create dynamic or anonymous object for `T type
                            if (typeof(T) == typeof(System.Dynamic.ExpandoObject) ||
                                typeof(T) == typeof(System.Dynamic.DynamicObject) ||
                                typeof(T) == typeof(System.Object))
                            {
                                var dynamicDt = new List<dynamic>();
                                foreach (var row in rows)
                                {
                                    dynamic dyn = new ExpandoObject();
                                    dynamicDt.Add(dyn);
                                    for (var i = 0; i < columns.Count; i++)
                                    {
                                        var dic = (IDictionary<string, object>)dyn;
                                        dic[headerNames[i]] = row[columns[i]];
                                    }
                                }
                                return (dynamic)dynamicDt;
                            }
                            else // other types of `T
                            {
                                var properties = typeof(T).GetProperties();
                                if (columns.Any() && properties.Any())
                                {
                                    foreach (var row in rows)
                                    {
                                        // var entity = new T();
                                        var entity = (T)Activator.CreateInstance(typeof(T));
                                        for (var i = 0; i < columns.Count; i++)
                                        {
                                            if (!row.IsNull(columns[i]))
                                            {
                                                typeof(T).GetProperty(headerNames[i])? // ? -> maybe the property by name `headerNames[i]` is not exist in entity then get null!
                                                    .SetValue(entity, row[columns[i]] == DBNull.Value ? null : row[columns[i]]);
                                            }
                                        }
                                        result.Add(entity);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return result;
        }

        /// <summary> Sơn 22/11/2020
        /// Lấy danh sách bản ghi theo một điều kiện nhất định, có phân trang và sắp xếp
        /// </summary>
        /// <param name="page">Trang</param>
        /// <param name="pageSize">Số phần tử trong 1 trang</param>
        /// <param name="condition">Điều kiện</param>
        /// <param name="sortField">Trường sắp xếp</param>
        /// <returns></returns>
        public IList<T> Get(string condition, List<KeyValuePair<string, bool>> sortFields, int? page = 0, int? pageSize = 0)
        {

            var modeSort = new Dictionary<bool, string>();
            modeSort[true] = "ASC";
            modeSort[false] = "DESC";
            var sorts = sortFields.Select(s => $"{s.Key} {modeSort[s.Value]}").ToList();

            var result = new List<T>();
            //var config = new GetConfig(configPath, "connectionString");
            //var connectionString = config.Get();
            using (var connection = new MySqlConnection(connectionString))
            {
                string query = "";
                if(page == 0 || pageSize == 0)
                {
                    query = $"select * from {typeof(T).Name} where {condition} order by {String.Join(", ", sorts)};";
                }
                else
                {
                    query = $"select * from {typeof(T).Name} where {condition} order by {String.Join(", ", sorts)} offset {(page.Value - 1) * pageSize.Value} rows fetch next {pageSize.Value} rows only;";
                }
                var command = new MySqlCommand(query, connection);
                command.CommandType = CommandType.Text;
                using (var adapter = new MySqlDataAdapter(command))
                {
                    using (var dataTable = new DataTable())
                    {
                        adapter.Fill(dataTable);

                        if (dataTable != null && dataTable.Rows.Count > 0)
                        {
                            var columns = dataTable.Columns.Cast<DataColumn>().ToList();
                            var rows = dataTable.Rows.Cast<DataRow>().ToList();
                            var headerNames = columns.Select(col => col.ColumnName).ToList();

                            // Create dynamic or anonymous object for `T type
                            if (typeof(T) == typeof(System.Dynamic.ExpandoObject) ||
                                typeof(T) == typeof(System.Dynamic.DynamicObject) ||
                                typeof(T) == typeof(System.Object))
                            {
                                var dynamicDt = new List<dynamic>();
                                foreach (var row in rows)
                                {
                                    dynamic dyn = new ExpandoObject();
                                    dynamicDt.Add(dyn);
                                    for (var i = 0; i < columns.Count; i++)
                                    {
                                        var dic = (IDictionary<string, object>)dyn;
                                        dic[headerNames[i]] = row[columns[i]];
                                    }
                                }
                                return (dynamic)dynamicDt;
                            }
                            else // other types of `T
                            {
                                var properties = typeof(T).GetProperties();
                                if (columns.Any() && properties.Any())
                                {
                                    foreach (var row in rows)
                                    {
                                        // var entity = new T();
                                        var entity = (T)Activator.CreateInstance(typeof(T));
                                        for (var i = 0; i < columns.Count; i++)
                                        {
                                            if (!row.IsNull(columns[i]))
                                            {
                                                typeof(T).GetProperty(headerNames[i])? // ? -> maybe the property by name `headerNames[i]` is not exist in entity then get null!
                                                    .SetValue(entity, row[columns[i]] == DBNull.Value ? null : row[columns[i]]);
                                            }
                                        }
                                        result.Add(entity);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return result;
        }

        public T Get(string propertyName, object propertyValue)
        {

            //var result = new List<T>();
            //var config = new GetConfig(configPath, "connectionString");
            //var connectionString = config.Get();
            using (var connection = new MySqlConnection(connectionString))
            {
                var query =
                    $"select * from {typeof(T).Name} where {propertyName} = {propertyValue};";
                var command = new MySqlCommand(query, connection);
                command.CommandType = CommandType.Text;
                using (var adapter = new MySqlDataAdapter(command))
                {
                    using (var dataTable = new DataTable())
                    {
                        adapter.Fill(dataTable);

                        if (dataTable != null && dataTable.Rows.Count > 0)
                        {
                            var columns = dataTable.Columns.Cast<DataColumn>().ToList();
                            var rows = dataTable.Rows.Cast<DataRow>().ToList();
                            var headerNames = columns.Select(col => col.ColumnName).ToList();

                            // Create dynamic or anonymous object for `T type
                            if (typeof(T) == typeof(System.Dynamic.ExpandoObject) ||
                                typeof(T) == typeof(System.Dynamic.DynamicObject) ||
                                typeof(T) == typeof(System.Object))
                            {
                                var dynamicDt = new List<dynamic>();
                                foreach (var row in rows)
                                {
                                    dynamic dyn = new ExpandoObject();
                                    dynamicDt.Add(dyn);
                                    for (var i = 0; i < columns.Count; i++)
                                    {
                                        var dic = (IDictionary<string, object>)dyn;
                                        dic[headerNames[i]] = row[columns[i]];
                                    }
                                }
                                return (dynamic)dynamicDt;
                            }
                            else // other types of `T
                            {
                                var properties = typeof(T).GetProperties();
                                if (columns.Any() && properties.Any())
                                {
                                    var entity = (T)Activator.CreateInstance(typeof(T));
                                    foreach (var row in rows)
                                    {
                                        // var entity = new T();
                                        // var entity = (T)Activator.CreateInstance(typeof(T));
                                        for (var i = 0; i < columns.Count; i++)
                                        {
                                            if (!row.IsNull(columns[i]))
                                            {
                                                typeof(T).GetProperty(headerNames[i])? // ? -> maybe the property by name `headerNames[i]` is not exist in entity then get null!
                                                    .SetValue(entity, row[columns[i]] == DBNull.Value ? null : row[columns[i]]);
                                            }
                                        }
                                        // result.Add(entity);
                                    }
                                    return entity;
                                }
                            }
                        }
                    }
                }
            }
            return (T)Activator.CreateInstance(typeof(T));
        }

        /// <summary> Sơn 22/11/2020
        /// Lấy bản ghi có giá trị khóa PK = id
        /// (Chỉ áp dụng cho thực thể có 1 khóa)
        /// </summary>
        /// <typeparam name="T2">Kiểu của khóa</typeparam>
        /// <param name="id">Giá trị của khóa</param>
        /// <returns></returns>
        public T Get<T2>(T2 id) where T2 : class
        {

            // Kiểm tra thực thể có mấy key
            var instance = (T)Activator.CreateInstance(typeof(T));
            var _properties = (typeof(T)).GetProperties().ToList();
            var keys = _properties.Where(p => Attribute.IsDefined(p, typeof(KeyAttribute))).ToList();
            if (keys.Count() == 1)
            {
                //var config = new GetConfig(configPath, "connectionString");
                //var connectionString = config.Get();
                using (var connection = new MySqlConnection(connectionString))
                {
                    //var val = $"{id}";
                    //var val2 = $"'{id}'";
                    var typeKey = keys[0].GetType();
                    var val = keys[0].PropertyType.Name == "string" ? $"'{id}'" : $"{id}";

                    var query =
                        $"select * from {typeof(T).Name} where {keys[0].Name} = {val};";
                    var command = new MySqlCommand(query, connection);
                    command.CommandType = CommandType.Text;
                    using (var adapter = new MySqlDataAdapter(command))
                    {
                        using (var dataTable = new DataTable())
                        {
                            adapter.Fill(dataTable);

                            if (dataTable != null && dataTable.Rows.Count > 0)
                            {
                                var columns = dataTable.Columns.Cast<DataColumn>().ToList();
                                var rows = dataTable.Rows.Cast<DataRow>().ToList();
                                var headerNames = columns.Select(col => col.ColumnName).ToList();
                                // Create dynamic or anonymous object for `T type
                                if (typeof(T) == typeof(System.Dynamic.ExpandoObject) ||
                                    typeof(T) == typeof(System.Dynamic.DynamicObject) ||
                                    typeof(T) == typeof(System.Object))
                                {
                                    var dynamicDt = new List<dynamic>();
                                    foreach (var row in rows)
                                    {
                                        dynamic dyn = new ExpandoObject();
                                        dynamicDt.Add(dyn);
                                        for (var i = 0; i < columns.Count; i++)
                                        {
                                            var dic = (IDictionary<string, object>)dyn;
                                            dic[headerNames[i]] = row[columns[i]];
                                        }
                                    }
                                    return (dynamic)dynamicDt;
                                }
                                else // other types of `T
                                {
                                    var properties = typeof(T).GetProperties();
                                    if (columns.Any() && properties.Any())
                                    {
                                        var entity = (T)Activator.CreateInstance(typeof(T));
                                        foreach (var row in rows)
                                        {
                                            // var entity = new T();
                                            // var entity = (T)Activator.CreateInstance(typeof(T));
                                            for (var i = 0; i < columns.Count; i++)
                                            {
                                                if (!row.IsNull(columns[i]))
                                                {
                                                    typeof(T).GetProperty(headerNames[i])? // ? -> maybe the property by name `headerNames[i]` is not exist in entity then get null!
                                                        .SetValue(entity, row[columns[i]] == DBNull.Value ? null : row[columns[i]]);
                                                }
                                            }
                                            // result.Add(entity);
                                        }
                                        return entity;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            return (T)Activator.CreateInstance(typeof(T));
        }

        public IList<T> Get(string query)
        {

            var result = new List<T>();
            //var config = new GetConfig(configPath, "connectionString");
            //var connectionString = config.Get();
            using (var connection = new MySqlConnection(connectionString))
            {
                //var query =
                //    $"select * from {typeof(T).Name} where {condition} sort by {String.Join(", ", sorts)} offset {(page.Value - 1) * pageSize.Value} rows fetch next {pageSize.Value} rows only;";
                var command = new MySqlCommand(query, connection);
                command.CommandType = CommandType.Text;
                using (var adapter = new MySqlDataAdapter(command))
                {
                    using (var dataTable = new DataTable())
                    {
                        adapter.Fill(dataTable);

                        if (dataTable != null && dataTable.Rows.Count > 0)
                        {
                            var columns = dataTable.Columns.Cast<DataColumn>().ToList();
                            var rows = dataTable.Rows.Cast<DataRow>().ToList();
                            var headerNames = columns.Select(col => col.ColumnName).ToList();

                            // Create dynamic or anonymous object for `T type
                            if (typeof(T) == typeof(System.Dynamic.ExpandoObject) ||
                                typeof(T) == typeof(System.Dynamic.DynamicObject) ||
                                typeof(T) == typeof(System.Object))
                            {
                                var dynamicDt = new List<dynamic>();
                                foreach (var row in rows)
                                {
                                    dynamic dyn = new ExpandoObject();
                                    dynamicDt.Add(dyn);
                                    for (var i = 0; i < columns.Count; i++)
                                    {
                                        var dic = (IDictionary<string, object>)dyn;
                                        dic[headerNames[i]] = row[columns[i]];
                                    }
                                }
                                return (dynamic)dynamicDt;
                            }
                            else // other types of `T
                            {
                                var properties = typeof(T).GetProperties();
                                if (columns.Any() && properties.Any())
                                {
                                    foreach (var row in rows)
                                    {
                                        // var entity = new T();
                                        var entity = (T)Activator.CreateInstance(typeof(T));
                                        for (var i = 0; i < columns.Count; i++)
                                        {
                                            if (!row.IsNull(columns[i]))
                                            {
                                                typeof(T).GetProperty(headerNames[i])? // ? -> maybe the property by name `headerNames[i]` is not exist in entity then get null!
                                                    .SetValue(entity, row[columns[i]] == DBNull.Value ? null : row[columns[i]]);
                                            }
                                        }
                                        result.Add(entity);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return result;
        }

        /// <summary> Sơn 22/11/2020
        /// Thêm bản ghi vào bảng
        /// </summary>
        /// <param name="item"></param>
        public void Insert(T item)
        {

            var values = new List<string>();

            var _properties = item.GetType().GetProperties().ToList();
            // var keys = _properties.Where(p => Attribute.IsDefined(p, typeof(KeyAttribute))).ToList();

            _properties.ForEach(delegate (System.Reflection.PropertyInfo p)
            {
                // var propertyName = p.Name;
                var propertyValue = p.GetValue(item);
                if (p.PropertyType.Name == "String")
                    values.Add($"'{propertyValue}'");
                else
                    values.Add($"{propertyValue}");
            });

            var _values = $"({String.Join(", ", values)})";

            //var config = new GetConfig(configPath, "connectionString");
            //var connectionString = config.Get();
            using (var connection = new MySqlConnection(connectionString))
            {
                var query =
                    $"insert into {typeof(T).Name} values{_values};";
                var command = new MySqlCommand(query, connection);
                command.CommandType = CommandType.Text;

                command.Connection.Open();
                command.ExecuteNonQuery();
            }
        }

        public void InsertAutoIncrement(T item)
        {

            var values = new List<string>();
            var columns = new List<string>();

            var _properties = item.GetType().GetProperties().ToList();
            _properties = _properties.Where(p => Attribute.IsDefined(p, typeof(KeyAttribute)) == false).ToList();
            // var keys = _properties.Where(p => Attribute.IsDefined(p, typeof(KeyAttribute))).ToList();

            _properties.ForEach(delegate (System.Reflection.PropertyInfo p)
            {

                columns.Add(p.Name);
                // var propertyName = p.Name;
                var propertyValue = p.GetValue(item);
                if (p.PropertyType.Name == "String")
                {
                    values.Add($"'{propertyValue}'");
                }
                else
                {
                    if (p.PropertyType.Name != "DateTime")
                    {
                        values.Add($"{propertyValue}");
                    }
                    else
                    {
                        var _propertyValue = (DateTime)propertyValue;
                        values.Add($"'{_propertyValue.Year}-{_propertyValue.Month}-{_propertyValue.Day} {_propertyValue.Hour}:{_propertyValue.Minute}:{_propertyValue.Second}'");
                    }
                    // .Add($"{propertyValue}");
                }
                    
            });

            var _values = $"({String.Join(", ", values)})";
            var _columns = $"({String.Join(", ", columns)})";

            //var config = new GetConfig(configPath, "connectionString");
            //var connectionString = config.Get();
            using (var connection = new MySqlConnection(connectionString))
            {
                var query =
                    $"insert into {typeof(T).Name} {_columns} values{_values};";
                var command = new MySqlCommand(query, connection);
                command.CommandType = CommandType.Text;

                command.Connection.Open();
                command.ExecuteNonQuery();
            }
        }

        /// <summary> Sơn 22/11/2020
        /// Cập nhật bản ghi
        /// </summary>
        /// <param name="item"></param>
        public void Update(T item)
        {
            var values = new List<string>();
            var conditions = new List<string>();

            var instance = (T)Activator.CreateInstance(typeof(T));
            var _properties = (typeof(T)).GetProperties().ToList();
            var keys = _properties.Where(p => Attribute.IsDefined(p, typeof(KeyAttribute)) == true).ToList();
            var notKeys = _properties.Where(p => Attribute.IsDefined(p, typeof(KeyAttribute)) == false).ToList();

            notKeys.ForEach(delegate (System.Reflection.PropertyInfo p)
            {
                var propertyName = p.Name;
                var propertyValue = p.GetValue(item);
                if (p.PropertyType.Name == "String")
                {
                    if(propertyValue != null && String.IsNullOrWhiteSpace((string)propertyValue) == false)
                        values.Add($"{propertyName} = '{propertyValue}'");
                }
                else
                {
                    if (propertyValue != null)
                    {
                        if(p.PropertyType.Name != "DateTime")
                        {
                            values.Add($"{propertyName} = {propertyValue}");
                        }
                        else
                        {
                            var _propertyValue = (DateTime)propertyValue;
                            values.Add($"{propertyName} = '{_propertyValue.Year}-{_propertyValue.Month}-{_propertyValue.Day} {_propertyValue.Hour}:{_propertyValue.Minute}:{_propertyValue.Second}'");
                        }
                    }    
                }
            });

            keys.ForEach(delegate (System.Reflection.PropertyInfo p)
            {
                var propertyName = p.Name;
                var propertyValue = p.GetValue(item);
                if (p.PropertyType.Name == "String")
                    conditions.Add($"{propertyName} = '{propertyValue}'");
                else
                    conditions.Add($"{propertyName} = {propertyValue}");
            });

            var _values = $"{String.Join(", ", values)}";
            var _conditions = $"{String.Join(" and ", conditions)}";

            //var config = new GetConfig(configPath, "connectionString");
            //var connectionString = config.Get();
            using (var connection = new MySqlConnection(connectionString))
            {
                var query =
                    $"update {typeof(T).Name} set {_values} where {_conditions};";
                var command = new MySqlCommand(query, connection);
                command.CommandType = CommandType.Text;

                command.Connection.Open();
                command.ExecuteNonQuery();
            }
        }

        /// <summary> Sơn 22/11/2020
        /// Cập nhật bản ghi
        /// </summary>
        /// <param name="item"></param>
        public void Update(T item, string condition)
        {
            var values = new List<string>();
            var conditions = new List<string>();

            var instance = (T)Activator.CreateInstance(typeof(T));
            var _properties = (typeof(T)).GetProperties().ToList();
            var keys = _properties.Where(p => Attribute.IsDefined(p, typeof(KeyAttribute)) == true).ToList();
            var notKeys = _properties.Where(p => Attribute.IsDefined(p, typeof(KeyAttribute)) == false).ToList();

            notKeys.ForEach(delegate (System.Reflection.PropertyInfo p)
            {
                var propertyName = p.Name;
                var propertyValue = p.GetValue(item);
                if (p.PropertyType.Name == "string")
                    values.Add($"{propertyName} = '{propertyValue}'");
                else
                    values.Add($"{propertyName} = {propertyValue}");
            });

            var _values = $"{String.Join(", ", values)}";
            // var _conditions = $"{String.Join(" and ", conditions)}";

            //var config = new GetConfig(configPath, "connectionString");
            //var connectionString = config.Get();
            using (var connection = new MySqlConnection(connectionString))
            {
                var query =
                    $"update {typeof(T).Name} set {_values} where {condition};";
                var command = new MySqlCommand(query, connection);
                command.CommandType = CommandType.Text;

                command.Connection.Open();
                command.ExecuteNonQuery();
            }
        }

        /// <summary> Sơn 22/11/2020
        /// Xóa bản ghi
        /// </summary>
        /// <param name="item"></param>
        public void Remove(T item)
        {
            var conditions = new List<string>();

            var instance = (T)Activator.CreateInstance(typeof(T));
            var _properties = (typeof(T)).GetProperties().ToList();
            var keys = _properties.Where(p => Attribute.IsDefined(p, typeof(KeyAttribute)) == true).ToList();
            var notKeys = _properties.Where(p => Attribute.IsDefined(p, typeof(KeyAttribute)) == false).ToList();

            keys.ForEach(delegate (System.Reflection.PropertyInfo p)
            {
                var propertyName = p.Name;
                var propertyValue = p.GetValue(item);
                if (p.PropertyType.Name == "string")
                    conditions.Add($"{propertyName} = '{propertyValue}'");
                else
                    conditions.Add($"{propertyName} = {propertyValue}");
            });

            // var _values = $"{String.Join(", ", values)}";
            var _conditions = $"{String.Join(" and ", conditions)}";

            //var config = new GetConfig(configPath, "connectionString");
            //var connectionString = config.Get();
            using (var connection = new MySqlConnection(connectionString))
            {
                var query =
                    $"delete from {typeof(T).Name} where {_conditions};";
                var command = new MySqlCommand(query, connection);
                command.CommandType = CommandType.Text;

                command.Connection.Open();
                command.ExecuteNonQuery();
            }
        }

        public void Remove(string condition)
        {
            //var config = new GetConfig(configPath, "connectionString");
            //var connectionString = config.Get();
            using (var connection = new MySqlConnection(connectionString))
            {
                var query =
                    $"delete from {typeof(T).Name} where {condition};";
                var command = new MySqlCommand(query, connection);
                command.CommandType = CommandType.Text;

                command.Connection.Open();
                command.ExecuteNonQuery();
            }
        }
    }
}
