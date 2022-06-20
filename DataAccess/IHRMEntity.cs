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

        IList<T> Get(string condition, List<KeyValuePair<string, bool>> sortFields, int? page, int? pageSize);

        T Get<T2>(T2 id) where T2 : class;

        IList<T> Get(string query);

        void Insert(T item);

        void InsertAutoIncrement(T item);

        void Update(T item);

        void Remove(T item);
    }
}