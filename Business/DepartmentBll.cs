using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess;

namespace Business
{
    public class DepartmentBll : Bll
    {
        public HRMEntity<department> _departmentRepo;

        public List<department> GetDepartments()
        {
            var result = new List<department>();

            result = _departmentRepo.Get().ToList();

            return result;
        }

        public department GetDepartment(string name)
        {
            return _departmentRepo.Get("department_name", name);
        }

        public department GetDepartmentById(string id)
        {
            return _departmentRepo.Get("department_id", id);
        }

        public bool UpdateDepartment(department dept)
        {
            try
            {
                _departmentRepo.Update(dept);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool RemoveDepartment(department dept)
        {
            // var deleted = _.Get("id", workTimeId);
            try
            {
                _departmentRepo.Remove(dept);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool CreateDepartment(department dept)
        {
            try
            {
                _departmentRepo.Insert(dept);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
