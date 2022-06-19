using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business.MergedEntity;
using DataAccess;

namespace Business
{
    public class ContractBll : Bll
    {
        public HRMEntity<contract> _contractRepo;
        public HRMEntity<n_restrict_product> _restrictProductsRepo;

        public List<contract> GetContractsByEmployee(string empId)
        {
            var result = new List<contract>();

            result = _contractRepo.Get(c => c.employee_id == empId, c => c.start_date).ToList();

            return result;
        }

        public List<Contract> GetFullContractsByEmployee(string empId)
        {
            var allContracts = _contractRepo.Get(c => c.employee_id == empId, c => c.start_date).ToList();
            var allCompletedProducts = _restrictProductsRepo.Get(r => r.employee_id == empId, r => r.number_product).ToList();

            var result = (from contr in allContracts
                          join pro in allCompletedProducts on contr.id equals pro.contract_id into re
                          from _re in re.DefaultIfEmpty()
                          select new Contract
                          {
                              id = contr.id,
                              employee_id = contr.employee_id,
                              start_date = contr.start_date,
                              end_date = contr.end_date,
                              standard_work_time_for_employee_id = contr.standard_work_time_for_employee_id,
                              wage = contr.wage,
                              unit = contr.unit,
                              status = contr.status,
                              restrict_product_number = contr.restrict_product_number,
                              require_educate = contr.require_educate,
                              period_type = contr.period_type,
                              payroll_type = contr.payroll_type,
                              number_product = (_re != null)? _re.number_product : null
                          }).ToList();

            return result;
        }

        public List<contract> GetContracts()
        {
            var result = new List<contract>();

            result = _contractRepo.Get().ToList();

            return result;
        }

        public contract GetContract(string id)
        {
            var result = new contract();

            result = _contractRepo.Get(c => c.id == id, c => c.start_date).FirstOrDefault();

            return result;
        }

        public n_restrict_product GetRestrictProduct(string id)
        {
            var result = new n_restrict_product();

            result = _restrictProductsRepo.Get(c => c.contract_id == id, c => c.employee_id).FirstOrDefault();

            return result;
        }

        public bool CreateContract(List<contract> contracts)
        {
            try
            {
                _contractRepo.Insert(contracts);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool CreateCompletedProduct(List<n_restrict_product> prods)
        {
            try
            {
                _restrictProductsRepo.Insert(prods);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool UpdateContract(List<contract> contracts)
        {
            try
            {
                _contractRepo.Update(contracts);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool UpdateCompletedProduct(List<n_restrict_product> prods)
        {
            try
            {
                _restrictProductsRepo.Update(prods);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
