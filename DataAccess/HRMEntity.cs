using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Data.Entity.Infrastructure;
using System.Data.Entity;
// using ReadWriteTextFile;

namespace DataAccess
{
    public class HRMEntity<T> : IHRMEntity<T> where T : class
    {
        private readonly DbContext _context;
        private DbSet<T> _entities;

        public HRMEntity(DbContext context)
        {
            _context = context;
            _entities = _context.Set<T>();
        }

        /// <summary> Sơn 22/11/2020
        /// Lấy toàn bộ bản ghi
        /// </summary>
        /// <returns></returns>
        public IList<T> Get()
        {
            //using (var context = new hrmEntities())
            //{
            // var listLogContent = new List<string>() { $"{DateTime.Now.ToString()}: type of T is {typeof(T).Name}" };
            // var log = new ReadWrite($@"F:\NeedSaving\NeedSaving\do-an-ii\Code\FashionBrand\Logs\Log_{DateTime.Now.Day}.{DateTime.Now.Month}.{DateTime.Now.Year}.txt", true, listLogContent);
            // log.WriteFile();
            // return context.Set<T>().ToList();
            //using (_context)
            //{
                return _entities.ToList();
            //}
            //}
        }

        /// <summary> Sơn 22/11/2020
        /// Lấy danh sách bản ghi theo một điều kiện nhất định, có phân trang và sắp xếp
        /// </summary>
        /// <param name="page">Trang</param>
        /// <param name="pageSize">Số phần tử trong 1 trang</param>
        /// <param name="condition">Điều kiện</param>
        /// <param name="sortField">Trường sắp xếp</param>
        /// <returns></returns>
        public IList<T> Get(Expression<Func<T, bool>> condition, Expression<Func<T, object>> sortField, int? page = 0, int? pageSize = 0, string sortMode = "asc")
        {
            var result = this.Get().AsQueryable();
            if (condition != null)
            {
                result = result.Where(condition);
            }

            if (sortField != null)
            {
                if (sortMode.ToLower() == "asc")
                    result = result.OrderBy(sortField);
                else
                    result = result.OrderByDescending(sortField);
            }

            if (page.HasValue == true && pageSize.HasValue == true && page != 0 && pageSize != 0)
            {
                result = result.Skip((page.Value - 1) * pageSize.Value).Take(pageSize.Value);
            }
            return result.ToList();
        }

        public T Get(string propertyName, /*Type propertyType, */object propertyValue)
        {
            var result = this.Get().AsQueryable();
            //using (var context = new hrmEntities())
            //{
            //using (_context)
            //{
                var entity = Expression.Parameter(typeof(T), "tupple");
                var property = Expression.Property(entity, propertyName);
                var value = Expression.Constant(propertyValue);
                var expression = Expression.Equal(property, value);
                var lambdaExpression = Expression.Lambda<Func<T, bool>>(expression, entity);
                return result.Where(lambdaExpression).FirstOrDefault();
            //}
            //}
        }

        //public List<T> Gets(string propertyName, /*Type propertyType, */object propertyValue)
        //{
        //    var result = this.Get().AsQueryable();
        //    //using (var context = new hrmEntities())
        //    //{
        //    //using (_context)
        //    //{
        //    var entity = Expression.Parameter(typeof(T), "tupple");
        //    var property = Expression.Property(entity, propertyName);
        //    var value = Expression.Constant(propertyValue);
        //    var expression = Expression.Equal(property, value);
        //    var lambdaExpression = Expression.Lambda<Func<T, bool>>(expression, entity);
        //    return result.Where(lambdaExpression).ToList();
        //    //}
        //    //}
        //}

        /// <summary> Sơn 22/11/2020
        /// Lấy bản ghi có giá trị khóa PK = id
        /// (Chỉ áp dụng cho thực thể có 1 khóa)
        /// </summary>
        /// <typeparam name="T2">Kiểu của khóa</typeparam>
        /// <param name="id">Giá trị của khóa</param>
        /// <returns></returns>
        public T Get<T2>(T2 id) where T2 : class
        {
            var keyName = "";
            //using (var context = new hrmEntities())
            //{
            //using (_context)
            //{
                var _context2 = ((IObjectContextAdapter)_context).ObjectContext;
                var _dbSet = _context2.CreateObjectSet<T>();
                keyName = _dbSet.EntitySet.ElementType.KeyMembers.Select(k => k.Name).FirstOrDefault();
            //}
            // }
            return Get(keyName/*, typeof(T2)*/, id);
        }

        /// <summary> Sơn 22/11/2020
        /// Thêm bản ghi vào bảng
        /// </summary>
        /// <param name="item"></param>
        public void Insert(T item)
        {
            //using (var context = new hrmEntities())
            //{
            // context.Set<T>().Add(item);
            //using (_context)
            //{
                _entities.Add(item);
                _context.SaveChanges();
            //}
            //}
        }

        /// <summary> Sơn 22/11/2020
        /// Thêm bản ghi vào bảng
        /// </summary>
        /// <param name="item"></param>
        public void Insert(List<T> items)
        {
            //using (var context = new hrmEntities())
            //{
            // context.Set<T>().Add(item);
            //using (_context)
            //{

            foreach(var item in items)
            {
                _entities.Add(item);
            }
            _context.SaveChanges();
            //}
            //}
        }

        /// <summary> Sơn 22/11/2020
        /// Cập nhật bản ghi
        /// </summary>
        /// <param name="item"></param>
        public void Update(T item)
        {
            //using (var context = new hrmEntities())
            //{
            // context.Set<T>().Attach(item);
            //using (_context)
            //{
                _context.SaveChanges();
            //}
            //}
        }

        /// <summary> Sơn 22/11/2020
        /// Cập nhật bản ghi
        /// </summary>
        /// <param name="item"></param>
        public void Update(List<T> item)
        {
            _context.SaveChanges();
        }

        /// <summary> Sơn 22/11/2020
        /// Xóa bản ghi
        /// </summary>
        /// <param name="item"></param>
        public void Remove(T item)
        {
            //using (var context = new hrmEntities())
            //{
            //context.Set<T>().Remove(item);
            //using (_context)
            //{
                _entities.Remove(item);
                _context.SaveChanges();
            //}
            //}
        }

        /// <summary> Sơn 22/11/2020
        /// Xóa bản ghi
        /// </summary>
        /// <param name="item"></param>
        public void Remove(List<T> items)
        {
            //using (var context = new hrmEntities())
            //{
            //context.Set<T>().Remove(item);
            //using (_context)
            //{

            foreach (var item in items)
            {
                _entities.Remove(item);
            }
            _context.SaveChanges();
            //}
            //}
        }
    }
}
