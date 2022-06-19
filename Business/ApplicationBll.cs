using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess;
using Business.MergedEntity;
using System.Linq.Expressions;

namespace Business
{
    public class ApplicationBll:Bll
    {
        public HRMEntity<applicant> _applicationRepo;
        public HRMEntity<department> _departmentRepo;
        public HRMEntity<title> _titleRepo;
        public HRMEntity<title_recruit> _titleRecruitRepo;
        public HRMEntity<employee> _employeeRepo;

        public List<applicant> GetApplications()
        {
            var result = new List<applicant>();

            result = _applicationRepo.Get().ToList();

            return result;
        }

        public applicant GetApplicationById(string id)
        {
            return _applicationRepo.Get("id", id);
        }

        public bool CreateApplication(applicant app)
        {
            try
            {
                _applicationRepo.Insert(app);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool CreateTitleRecruit(title_recruit tit)
        {
            try
            {
                _titleRecruitRepo.Insert(tit);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public List<ApplicationDepartmentJobtitle> GetMergedApplications()
        {
            var result = new List<ApplicationDepartmentJobtitle>();
            //var emps = new List<employee>();
            //emps = _employeeRepo.Get(e => (string.IsNullOrWhiteSpace(departmentId)? true : e.department_id == departmentId), e => e.first_name, offset + 1, amount, "asc").ToList();
            //result = emps.Join(department, dpt => dpt.department_id, dpt2 => dpt2.)
            var allApps = _applicationRepo.Get().ToList();
            // var allDepts = new List<department>();
            var allDepts = _departmentRepo.Get().ToList();
            var allTitles = _titleRepo.Get().ToList();


            result = (from app in allApps
                      join dept in allDepts on app.department_id equals dept.department_id
                      join tit in allTitles on app.title_id equals tit.title_id
                      select new ApplicationDepartmentJobtitle
                      {
                          id = app.id,
                          last_name = app.last_name,
                          first_name = app.first_name,
                          department = dept.department_name,
                          title = tit.title_name,
                          email = app.email,
                          phone = app.phone,
                          degree = _toolGetByCode.GetDegree(Convert.ToInt32(app.degree_id)),
                          college = app.college,
                          require_wage = app.require_wage,
                          interview_date = (app.interview_date != null)? app.interview_date.Value.ToShortDateString() : "",
                          interviewer_id = app.interviewer_id,
                          status = app.status,
                          ultimate_wage = app.ultimate_wage
                      }).ToList();
            return result;
        }

        public List<TitleRecruit> GetAllTitleRecruits()
        {
            var result = new List<TitleRecruit>();
            var allEmps = _employeeRepo.Get().ToList();
            var allDepts = _departmentRepo.Get().ToList();
            var allTitles = _titleRepo.Get().ToList();
            var allTitleRecruits = _titleRecruitRepo.Get().ToList();


            result = (from titRecruit in allTitleRecruits
                      join dept in allDepts on titRecruit.department_id equals dept.department_id
                      join tit in allTitles on titRecruit.title_id equals tit.title_id
                      join emp in allEmps on titRecruit.recruiter equals emp.id
                      select new TitleRecruit
                      {
                          department_id = titRecruit.department_id,
                          department = dept.department_name,
                          title_id = titRecruit.title_id,
                          title = tit.title_name,
                          recruiter_id = titRecruit.recruiter,
                          recruiter_name = $"{emp.last_name} {emp.first_name}",
                          slot = Convert.ToInt32(titRecruit.slot)
                      }).ToList();
            return result;
        }

        public title_recruit GetTitleRecruit(string title_id, string department_id)
        {
            var result = _titleRecruitRepo.Get(t => t.title_id == title_id && t.department_id == department_id, t => t.recruiter).FirstOrDefault();
            return result;
        }

        public bool UpdateTitleRecruit(title_recruit tit)
        {
            try
            {
                _titleRecruitRepo.Update(tit);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public List<ApplicationDepartmentJobtitle> GetMergedApplications(List<string> depts, List<string> tits, double gteRequireWage, double lteRequireWage, string college, List<sbyte> degrees)
        {
            var result = new List<ApplicationDepartmentJobtitle>();
            //var emps = new List<employee>();
            //emps = _employeeRepo.Get(e => (string.IsNullOrWhiteSpace(departmentId)? true : e.department_id == departmentId), e => e.first_name, offset + 1, amount, "asc").ToList();
            //result = emps.Join(department, dpt => dpt.department_id, dpt2 => dpt2.)
            var allApps = _applicationRepo.Get().ToList();
            // var allDepts = new List<department>();
            var allDepts = _departmentRepo.Get().ToList();
            var allTitles = _titleRepo.Get().ToList();

            result = (from app in allApps
                      join dept in allDepts on app.department_id equals dept.department_id
                      join tit in allTitles on app.title_id equals tit.title_id
                      select new ApplicationDepartmentJobtitle
                      {
                          id = app.id,
                          last_name = app.last_name,
                          first_name = app.first_name,
                          department = dept.department_name,
                          department_id = dept.department_id,
                          title = tit.title_name,
                          title_id = tit.title_id,
                          email = app.email,
                          phone = app.phone,
                          degree = _toolGetByCode.GetDegree(Convert.ToInt32(app.degree_id)),
                          college = app.college,
                          require_wage = app.require_wage,
                          interview_date = (app.interview_date != null) ? app.interview_date.Value.ToShortDateString() : "",
                          interviewer_id = app.interviewer_id,
                          status = app.status,
                          ultimate_wage = app.ultimate_wage
                      }).ToList();

            if(depts != null)
            {
                if (depts.Count() != 0)
                    result = result.Where(r => depts.Contains(r.department_id)).ToList();
            }

            if (tits != null)
            {
                if (tits.Count() != 0)
                    result = result.Where(r => tits.Contains(r.title_id)).ToList();
            }

            if (gteRequireWage != 0 && lteRequireWage != 0)
            {
                result = result.Where(r => r.require_wage >= gteRequireWage && r.require_wage <= lteRequireWage).ToList();
            }

            if(string.IsNullOrWhiteSpace(college) == false)
            {
                result = result.Where(r => r.college.ToLower().Trim().Equals(college.ToLower().Trim())).ToList();
            }

            if(degrees != null)
            {
                if(degrees.Count() != 0)
                {
                    result = result.Where(r => degrees.Select(d => _toolGetByCode.GetDegree(Convert.ToInt32(d))).Contains(r.degree)).ToList();
                }
            }
            return result;
        }

        public bool UpdateApplication(applicant app)
        {
            try
            {
                _applicationRepo.Update(app);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool RemoveTitleRecruit(title_recruit tit)
        {
            // var deleted = _.Get("id", workTimeId);
            try
            {
                _titleRecruitRepo.Remove(tit);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
