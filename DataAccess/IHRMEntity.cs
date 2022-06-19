using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;

namespace DataAccess
{
    public interface IHRMEntity<T> where T : class
    {
        IList<T> Get();

        IList<T> Get(Expression<Func<T, bool>> condition, Expression<Func<T, object>> sortField, int? page, int? pageSize, string sortMode);

        T Get<T2>(T2 id) where T2 : class;

        //List<T> Gets(string propertyName, object propertyValue);

        void Insert(T item);

        void Insert(List<T> items);

        void Update(T item);

        void Update(List<T> item);

        void Remove(T item);

        void Remove(List<T> items);
    }
}