using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business.MergedEntity;
using DataAccess;

namespace Business
{
    public class ExpenseBll : Bll
    {
        public HRMEntity<product> _productRepo;
        public HRMEntity<expense> _expenseRepo;
        public HRMEntity<expense_report> _reportRepo;
        public HRMEntity<expenses_in_report> _expenseInReportRepo;

        public List<product> GetProducts()
        {
            var result = new List<product>();

            result = _productRepo.Get().ToList();

            return result;
        }

        public List<expense> GetExpenses()
        {
            var result = new List<expense>();

            result = _expenseRepo.Get().ToList();

            return result;
        }

        public List<expense_report> GetReports()
        {
            var result = new List<expense_report>();

            result = _reportRepo.Get().ToList();

            return result;
        }

        public List<expenses_in_report> GetExpensesInReport(string reportId)
        {
            var result = new List<expenses_in_report>();

            result = _expenseInReportRepo.Get(e => e.report_id == reportId, e => e.expense_id).ToList();

            return result;
        }

        public product GetProductById(string id)
        {
            return _productRepo.Get("id", id);
        }

        public expense GetExpenseById(string id)
        {
            return _expenseRepo.Get("id", id);
        }

        public expense_report GetReportById(string id)
        {
            return _reportRepo.Get("report_id", id);
        }

        public product GetProductByName(string name)
        {
            return _productRepo.Get("product_name", name);
        }

        public List<Expense> GetFullExpenses()
        {
            var result = new List<Expense>();

            var _expenses = _expenseRepo.Get().ToList();
            var _products = _productRepo.Get().ToList();

            result = (from ex in _expenses
                      join pr in _products on ex.product_id equals pr.id
                      select new Expense
                      {
                          product_id = ex.product_id,
                          product_name = pr.product_name,
                          price_per_item = ex.price_per_item,
                          unit = ex.unit,
                          quantity = ex.quantity,
                          total_value = ex.total_value,
                          expense_date = ex.expense_date.ToShortDateString(),
                          employee_id = ex.employee_id,
                          id = ex.id
                      }).ToList();

            return result;
        }

        public List<Report> GetFullReports()
        {
            var result = new List<Report>();

            var reports = _reportRepo.Get().ToList();

            for(var i = 0; i < reports.Count(); ++i)
            {
                var report = new Report
                {
                    report_id = reports[i].report_id,
                    report_name = reports[i].report_name,
                    approve_man_id = reports[i].approve_man_id,
                    pay_man_id = reports[i].pay_man_id,
                    status = reports[i].status,
                    employee_id = reports[i].employee_id
                };
                report.expenses = _expenseInReportRepo.Get(e => e.report_id == reports[i].report_id, e => e.expense_id).Select(e => e.expense_id).ToList();
                result.Add(report);
            }

            return result;
        }

        public bool CreateProduct(product pro)
        {
            try
            {
                _productRepo.Insert(pro);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool CreateExpense(expense exp)
        {
            try
            {
                _expenseRepo.Insert(exp);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool CreateReport(expense_report report)
        {
            try
            {
                _reportRepo.Insert(report);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool CreateExpenseInReport(List<expenses_in_report> added)
        {
            try
            {
                _expenseInReportRepo.Insert(added);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool RemoveExpenseInReport(List<expenses_in_report> deleted)
        {
            try
            {
                _expenseInReportRepo.Remove(deleted);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool UpdateProduct(product newProduct)
        {
            try
            {
                _productRepo.Update(newProduct);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool UpdateExpense(expense updated)
        {
            try
            {
                _expenseRepo.Update(updated);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool UpdateReport(expense_report updated)
        {
            try
            {
                _reportRepo.Update(updated);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool RemoveProduct(string id)
        {
            var deleted = _productRepo.Get("id", id);
            try
            {
                _productRepo.Remove(deleted);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool RemoveReport(string id)
        {
            var deleted1 = _reportRepo.Get("report_id", id);
            var deleted2 = _expenseInReportRepo.Get(e => e.report_id == id, e => e.expense_id).ToList();
            try
            {
                _reportRepo.Remove(deleted1);
                _expenseInReportRepo.Remove(deleted2);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool RemoveExpense(string id)
        {
            var deleted = _expenseRepo.Get("id", id);
            try
            {
                _expenseRepo.Remove(deleted);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
