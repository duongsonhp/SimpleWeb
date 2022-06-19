using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess;
using Business.MergedEntity;

namespace Business
{
    public class EmployeeDll : Bll
    {
        public HRMEntity<employee> _employeeRepo;
        public HRMEntity<department> _departmentRepo;
        public HRMEntity<title> _titleRepo;
        public HRMEntity<n_product> _productRepo;
        public HRMEntity<n_number_product> _numberProductRepo;

        public List<employee> GetEmployees()
        {
            var result = new List<employee>();

            result = _employeeRepo.Get().ToList();

            return result;
        }

        public List<n_product> GetProducts()
        {
            var result = new List<n_product>();

            result = _productRepo.Get().ToList();

            return result;
        }

        public n_number_product GetProductPerMonths(string empId, DateTime start, DateTime end, string productId)
        {
            var result = new n_number_product();

            result = _numberProductRepo.Get(p => p.employee_id == empId && p.start_date == start
            && p.end_date == end && p.product_id == productId, p => p.product_id).FirstOrDefault();

            return result;
        }

        public List<EmployeeDepartTitltePosition> GetEmployees(int offset = 0, int amount = 9, string departmentId = "")
        {
            var result = new List<EmployeeDepartTitltePosition>();
            //var emps = new List<employee>();
            //emps = _employeeRepo.Get(e => (string.IsNullOrWhiteSpace(departmentId)? true : e.department_id == departmentId), e => e.first_name, offset + 1, amount, "asc").ToList();
            //result = emps.Join(department, dpt => dpt.department_id, dpt2 => dpt2.)
            var allEmps = _employeeRepo.Get(e => (string.IsNullOrWhiteSpace(departmentId))? true : (e.department_id == departmentId), e => e.id);
            var allDepts = new List<department>();
            if(string.IsNullOrWhiteSpace(departmentId))
            {
                allDepts = _departmentRepo.Get().ToList();
            }   
            else
            {
                allDepts = new List<department>() { _departmentRepo.Get("department_id", departmentId) };
            }    
            var allTitles = _titleRepo.Get();


            result = (from emp in allEmps
                     join dept in allDepts on emp.department_id equals dept.department_id
                     join tit in allTitles on emp.title_id equals tit.title_id
                     join emp2 in allEmps on emp.manager_id equals emp2.id into mng
                     from _emp2 in mng.DefaultIfEmpty()
                     join emp3 in allEmps on emp.timeoff_manager_id equals emp3.id into t_mng
                     from _emp3 in t_mng.DefaultIfEmpty()
                     join emp4 in allEmps on emp.expense_manager_id equals emp4.id into e_mng
                     from _emp4 in e_mng.DefaultIfEmpty()
                     select new EmployeeDepartTitltePosition
                     {
                         id = emp.id,
                         last_name = emp.last_name,
                         first_name = emp.first_name,
                         material_status = _toolGetByCode.GetMaterialStatus(Convert.ToInt32(emp.martial_status_id)),
                         number_of_children = Convert.ToInt32(emp.number_of_children),
                         degree = _toolGetByCode.GetDegree(Convert.ToInt32(emp.degree_id)),
                         major = emp.major,
                         college = emp.college,
                         bank_account = emp.bank_account,
                         department = dept.department_name,
                         title = tit.title_name,
                         manager_id = emp.manager_id,
                         manager = (_emp2 != null)? $"{_emp2.last_name} {_emp2.first_name}" : "",
                         time_manager_id = emp.timeoff_manager_id,
                         time_manager = (_emp3 != null)? $"{_emp3.last_name} {_emp3.first_name}" : "",
                         expense_manager_id = emp.expense_manager_id,
                         expense_manager = (_emp4 != null)? $"{_emp4.last_name} {_emp4.first_name}" : "",
                         distance_from_home = (double) emp.distance_from_home,
                         unit = "m",
                         gender = (emp.gender == true)? "Nam" : "Nữ",
                         birthday = emp.birthday.Value.ToShortDateString(),
                         born_place = emp.born_place,
                         phone = emp.phone,
                         emergency_phone = emp.emergency_phone,
                         emergency_contact_man = emp.emergency_contact_man,
                         address = emp.address,
                         email = emp.email,
                         identity_citizen_id = emp.identity_citizen_id
                     }).ToList();
            return result;
        }

        public employee GetEmployee(string name)
        {
            return _employeeRepo.Get("title_name", name);
        }

        public employee GetEmployeeById(string id)
        {
            return _employeeRepo.Get("id", id);
        }

        public List<ProductPerMonth> GetProductPerMonth(string empId) {
            var result = new List<ProductPerMonth>();
            //var emps = new List<employee>();
            //emps = _employeeRepo.Get(e => (string.IsNullOrWhiteSpace(departmentId)? true : e.department_id == departmentId), e => e.first_name, offset + 1, amount, "asc").ToList();
            //result = emps.Join(department, dpt => dpt.department_id, dpt2 => dpt2.)
            var allEmps = _employeeRepo.Get(e => e.id == empId, e => e.id);
            var allProducts = new List<n_product>();
            allProducts = _productRepo.Get().ToList();
            var allNumberProducts = _numberProductRepo.Get();


            result = (from emp in allEmps
                      join num in allNumberProducts on emp.id equals num.employee_id into m1
                      from _num in m1.DefaultIfEmpty()
                      join prod in allProducts on _num.product_id equals prod.id into p1
                      from _prod in p1.DefaultIfEmpty()
                      select new ProductPerMonth
                      {
                          start_date = (_num != null)? _num.start_date.ToShortDateString() : null,
                          end_date = (_num != null) ? _num.end_date.ToShortDateString() : null,
                          number_product = (_num != null) ? _num.number_product : null,
                          product_id = (_prod != null)? _prod.id : null,
                          product_name = (_prod != null) ? _prod.name : null,
                          employee_id = emp.id,
                          employee_name = $"${emp.last_name} {emp.first_name}",
                          price = (_prod != null) ? _prod.value.Value : 0
                      }).ToList();
            return result;
        }

        public List<ProductPerMonth> GetProductPerMonth(string empId, DateTime start, DateTime end)
        {
            var result = new List<ProductPerMonth>();
            //var emps = new List<employee>();
            //emps = _employeeRepo.Get(e => (string.IsNullOrWhiteSpace(departmentId)? true : e.department_id == departmentId), e => e.first_name, offset + 1, amount, "asc").ToList();
            //result = emps.Join(department, dpt => dpt.department_id, dpt2 => dpt2.)
            var allEmps = _employeeRepo.Get(e => e.id == empId, e => e.id);
            var allProducts = new List<n_product>();
            allProducts = _productRepo.Get().ToList();
            var allNumberProducts = _numberProductRepo.Get(n => n.start_date == start && n.end_date == end, n => n.number_product);

            result = (from emp in allEmps
                      join num in allNumberProducts on emp.id equals num.employee_id into m1
                      from _num in m1.DefaultIfEmpty()
                      join prod in allProducts on _num.product_id equals prod.id into p1
                      from _prod in p1.DefaultIfEmpty()
                      select new ProductPerMonth
                      {
                          start_date = (_num != null) ? _num.start_date.ToShortDateString() : null,
                          end_date = (_num != null) ? _num.end_date.ToShortDateString() : null,
                          number_product = (_num != null) ? _num.number_product : null,
                          product_id = (_prod != null) ? _prod.id : null,
                          product_name = (_prod != null) ? _prod.name : null,
                          employee_id = emp.id,
                          employee_name = $"${emp.last_name} {emp.first_name}",
                          price = (_prod != null) ? _prod.value.Value : 0
                      }).ToList();
            return result;
        }

        public bool CreateEmployee(employee newEmployee)
        {
            try
            {
                _employeeRepo.Insert(newEmployee);
                return true;
            }
            catch(Exception e)
            {
                return false;
            }
        }

        public bool CreateProductPerMonth(List<n_number_product> prods)
        {
            try
            {
                _numberProductRepo.Insert(prods);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool UpdateEmployee(employee newEmployee)
        {
            try
            {
                _employeeRepo.Update(newEmployee);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool UpdateProductPerMonth(List<n_number_product> prods)
        {
            try
            {
                _numberProductRepo.Update(prods);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool RemoveEmployee(string id)
        {
            var deleted = _employeeRepo.Get("id", id);
            try
            {
                _employeeRepo.Remove(deleted);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool RemoveProductPerMonth(n_number_product num)
        {
            try
            {
                _numberProductRepo.Remove(num);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
