using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess;

namespace Business
{
    public class ContractProductBll
    {
        public HRMEntity<n_product> _contractProductRepo;

        public bool CreateProduct(n_product time)
        {
            try
            {
                _contractProductRepo.Insert(time);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool RemoveProduct(n_product prod)
        {
            // var deleted = _contractProductRepo.Get(e => e.id == id, e => e.name).FirstOrDefault();
            try
            {
                _contractProductRepo.Remove(prod);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public List<n_product> GetProducts()
        {
            var result = new List<n_product>();

            result = _contractProductRepo.Get().ToList();

            return result;
        }

        public n_product GetProduct(string id)
        {
            var result = new n_product();

            result = _contractProductRepo.Get("id", id);

            return result;
        }

        public bool UpdateProduct(n_product updated)
        {
            try
            {
                _contractProductRepo.Update(updated);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
