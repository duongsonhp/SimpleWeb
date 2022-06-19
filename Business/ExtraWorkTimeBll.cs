using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess;

namespace Business
{
    public class ExtraWorkTimeBll : Bll
    {
        public HRMEntity<n_extra_work_time> _extraTimeRepo;

        public bool CreateExtraTime(n_extra_work_time time)
        {
            try
            {
                _extraTimeRepo.Insert(time);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool RemoveExtraTime(string empId, DateTime date)
        {
            var deleted = _extraTimeRepo.Get(e => e.employee_id == empId && e.work_date == date, e => e.from).FirstOrDefault();
            try
            {
                _extraTimeRepo.Remove(deleted);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public List<n_extra_work_time> GetExtraWorkTimes(string employeeId, sbyte month, int year)
        {
            var result = new List<n_extra_work_time>();

            result = _extraTimeRepo.Get(e => e.employee_id == employeeId && e.work_date.Month == month && e.work_date.Year == year, e => e.work_date).ToList();

            return result;
        }

        public n_extra_work_time GetExtraWorkTimes(string employeeId, DateTime date)
        {
            var result = new n_extra_work_time();

            result = _extraTimeRepo.Get(e => e.employee_id == employeeId && e.work_date == date, e => e.work_date).FirstOrDefault();

            return result;
        }

        public bool UpdateExtraWorkTime(n_extra_work_time updated)
        {
            try
            {
                _extraTimeRepo.Update(updated);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
