using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess;
using Business.MergedEntity;

namespace Business
{
    public class StandardWorkTimeBll : Bll
    {
        public HRMEntity<standard_work_time> _workTimeRepo;

        public HRMEntity<standard_work_time_for_employee> _workTimeForEmployeeRepo;

        public List<standard_work_time> GetWorkTimes()
        {
            var result = new List<standard_work_time>();

            result = _workTimeRepo.Get().ToList();

            return result;
        }

        public List<standard_work_time_for_employee> GetWorkTimesForEmployee()
        {
            var result = new List<standard_work_time_for_employee>();

            result = _workTimeForEmployeeRepo.Get().ToList();

            return result;
        }

        public standard_work_time_for_employee GetWorkTimesForEmployee(string empId, sbyte month)
        {
            var result = new standard_work_time_for_employee();

            result = _workTimeForEmployeeRepo.Get(w => w.employee_id == empId && w.month == month, w => w.month).FirstOrDefault();

            return result;
        }

        public List<StandardWorkTimeEmployee> GetWorkTimesForEmployee(string empId)
        {
            var result = new List<StandardWorkTimeEmployee>();

            var standardWorksByEmp = _workTimeForEmployeeRepo.Get(w => w.employee_id == empId, w => w.month).ToList();
            var standardWorks = _workTimeRepo.Get();

            result = (from w1 in standardWorksByEmp
                      join w2 in standardWorks on w1.standard_work_time_id equals w2.id
                      select new StandardWorkTimeEmployee
                      {
                          id = w1.id,
                          standard_work_time_id = w1.standard_work_time_id,
                          employee_id = empId,
                          month = w1.month,
                          amount_time = Convert.ToInt32(w2.amount_time),
                          unit = w2.unit,
                          period = w2.period
                      }).ToList();

            return result;
        }

        public standard_work_time Get(string id)
        {
            return _workTimeRepo.Get("id", id);
        }

        public standard_work_time Get(int amount, string unit, string period)
        {
            return _workTimeRepo.Get(w => w.amount_time == amount && w.unit.Trim() == unit.Trim() && w.period.Trim() == period.Trim(), w => w.id).FirstOrDefault();
        }

        public bool CreateStandardWorkTime(standard_work_time workTime)
        {
            try
            {
                _workTimeRepo.Insert(workTime);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool CreateStandardWorkTimeForEmployee(List<standard_work_time_for_employee> workTimesForEmp)
        {
            try
            {
                _workTimeForEmployeeRepo.Insert(workTimesForEmp);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool UpdateStandardWorkTime(standard_work_time workTime)
        {
            try
            {
                _workTimeRepo.Update(workTime);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool UpdateStandardWorkTimeForEmployee(List<standard_work_time_for_employee> workTimesForEmployee)
        {
            try
            {
                _workTimeForEmployeeRepo.Update(workTimesForEmployee);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool RemoveStandardWorkTime(string workTimeId)
        {
            var deleted = _workTimeRepo.Get("id", workTimeId);
            try
            {
                _workTimeRepo.Remove(deleted);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
