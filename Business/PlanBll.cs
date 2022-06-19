using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess;
using Business.MergedEntity;

namespace Business
{
    public class PlanBll : Bll
    {
        public HRMEntity<plan> _planRepo;

        public HRMEntity<plan_activities> _planActivitiesRepo;

        public HRMEntity<plan_for_employee> _planForEmployeeRepo;

        public List<plan> GetPlans()
        {
            var result = new List<plan>();

            result = _planRepo.Get().ToList();

            return result;
        }

        public List<PlanEmployee> GetPlans(string empId)
        {
            var result = new List<PlanEmployee>();
            //var emps = new List<employee>();
            //emps = _employeeRepo.Get(e => (string.IsNullOrWhiteSpace(departmentId)? true : e.department_id == departmentId), e => e.first_name, offset + 1, amount, "asc").ToList();
            //result = emps.Join(department, dpt => dpt.department_id, dpt2 => dpt2.)
            var allPlans = _planRepo.Get().ToList();
            var allPlanForEmployees = _planForEmployeeRepo.Get(p => p.employee_id == empId, p => p.plan_id).ToList();
            // var allPlanActivities = _planActivitiesRepo.Get();

            result = (from pl in allPlans
                      join pe in allPlanForEmployees on pl.id equals pe.plan_id into pfe
                      from _pe in pfe.DefaultIfEmpty()
                      select new PlanEmployee
                      {
                          id = pl.id,
                          plan_name = pl.plan_name,
                          employee_id = (_pe != null)? _pe.employee_id : "",
                      }).ToList();
            return result;
        }

        public plan GetPlan(string id)
        {
            var result = new plan();

            result = _planRepo.Get("id", id);

            return result;
        }

        public List<plan_activities> GetPlanActivities(string planId)
        {
            var result = new List<plan_activities>();

            result = _planActivitiesRepo.Get(c => c.plan_id == planId, c => c.deadline).ToList();

            return result;
        }

        public plan_activities GetPlanActivities(string planId, string job)
        {
            var result = new plan_activities();

            result = _planActivitiesRepo.Get(c => c.plan_id == planId && c.job_name == job, c => c.deadline).FirstOrDefault();

            return result;
        }

        public plan_for_employee GetPlanForEmployee(string planId, string empId)
        {
            var result = new plan_for_employee();

            result = _planForEmployeeRepo.Get(c => c.plan_id == planId && c.employee_id == empId, c => c.plan_id).FirstOrDefault();

            return result;
        }

        public bool CreateActivities(List<plan_activities> acitvities)
        {
            try
            {
                _planActivitiesRepo.Insert(acitvities);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool CreatePlanForEmployee(List<plan_for_employee> pfe)
        {
            try
            {
                _planForEmployeeRepo.Insert(pfe);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool CreatePlan(plan newPlan)
        {
            try
            {
                _planRepo.Insert(newPlan);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool UpdateActivities(List<plan_activities> acitvities)
        {
            try
            {
                _planActivitiesRepo.Update(acitvities);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool RemoveActivity(plan_activities activity)
        {
            // var deleted = _.Get("id", workTimeId);
            try
            {
                _planActivitiesRepo.Remove(activity);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool RemovePlanForEmployee(List<plan_for_employee> pfe)
        {
            // var deleted = _.Get("id", workTimeId);
            try
            {
                _planForEmployeeRepo.Remove(pfe);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool RemovePlan(plan item)
        {
            // var deleted = _.Get("id", workTimeId);
            try
            {
                _planRepo.Remove(item);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
