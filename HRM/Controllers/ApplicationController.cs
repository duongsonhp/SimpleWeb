using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HRM.Models;
using Business;
using DataAccess;
using Business.MergedEntity;

namespace HRM.Controllers
{
    public class ApplicationController : ExtendController
    {
        // GET: Application
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Show()
        {
            return View();
        }

        public ActionResult Title()
        {
            var allTitleRecruits = _applicationService.GetAllTitleRecruits();
            return View(allTitleRecruits);
        }

        [HttpPost]
        public JsonResult SaveApplicant(NewEmployeeModel newEmployee)
        {
            var success = false;
            var added = new applicant();
            using (context)
            {
                added.last_name = newEmployee.last_name;
                added.first_name = newEmployee.first_name;
                switch (newEmployee.degree)
                {
                    case "Tốt nghiệp THCS":
                        {
                            added.degree_id = 1;
                            break;
                        }
                    case "Tốt nghiệp THPT":
                        {
                            added.degree_id = 2;
                            break;
                        }
                    case "Cử nhân":
                        {
                            added.degree_id = 3;
                            break;
                        }
                    case "Kĩ sư":
                        {
                            added.degree_id = 4;
                            break;
                        }
                    case "Tốt nghiệp trung cấp":
                        {
                            added.degree_id = 5;
                            break;
                        }
                    case "Tốt nghiệp cao đẳng":
                        {
                            added.degree_id = 6;
                            break;
                        }
                    case "Cử nhân thực hành":
                        {
                            added.degree_id = 7;
                            break;
                        }
                    case "Kĩ sư thực hành":
                        {
                            added.degree_id = 8;
                            break;
                        }
                    case "Tốt nghiệp trường nghề":
                        {
                            added.degree_id = 9;
                            break;
                        }
                    default:
                        {
                            added.degree_id = 10;
                            break;
                        }
                }
                added.college = newEmployee.college;
                added.department_id = _departmentService.GetDepartment(newEmployee.department).department_id;
                added.title_id = _titleService.GetTitle(newEmployee.title).title_id;
                added.phone = newEmployee.phone;
                added.email = newEmployee.email;
                added.require_wage = newEmployee.require_wage;
                added.status = 0; // status = 0 (Sơ tuyển), status = 1 (Vòng phòng vấn 1) (Pink), status = 2 (Vòng phỏng vấn 2) (Yellow), status = 3 (Đàm phán hợp đồng) (Blue), status = 4 (Kí kết hợp đồng) (Green), status = 5 (Loại) (Red)

                var existedId = _applicationService.GetApplications().Select(e => e.id);
                if (existedId != null)
                {
                    if (existedId.Count() != 0)
                    {
                        do
                        {
                            added.id = _toolGenId.GenerateId(8);
                        }
                        while (existedId.Any(e => e.Equals(added.id, StringComparison.OrdinalIgnoreCase)));
                    }
                    else
                    {
                        added.id = _toolGenId.GenerateId(8);
                    }
                }
                else
                {
                    added.id = _toolGenId.GenerateId(8);
                }

                success = _applicationService.CreateApplication(added);
            }

            return Json(new { success = success, new_id = added.id }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult RenderListApplications()
        {
            var apps = new List<applicant>();
            using (context)
            {
                apps = _applicationService.GetApplications();
            }

            if (apps.Count() != 0)
                return Json(apps, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetApplications()
        {
            var apps = new List<ApplicationDepartmentJobtitle>();
            using (context)
            {
                apps = _applicationService.GetMergedApplications();
            }

            if (apps.Count() != 0)
                return Json(apps, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Filter(List<string> depts, List<string> tits, RequireWageModel requireWage, string college, List<sbyte> degrees)
        {
            var apps = new List<ApplicationDepartmentJobtitle>();
            using (context)
            {
                if(requireWage == null)
                {
                    requireWage = new RequireWageModel
                    {
                        gte = 0,
                        lte = 0
                    };
                }
                apps = _applicationService.GetMergedApplications(depts, tits, requireWage.gte, requireWage.lte, college, degrees);
            }

            if (apps.Count() != 0)
                return Json(apps, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveStatus(sbyte status, DateTime date, string emp, string applicantId)
        {
            // var apps = new List<ApplicationDepartmentJobtitle>();
            var success = false;
            using (context)
            {
                var updated = _applicationService.GetApplicationById(applicantId.Trim());

                updated.status = status;
                updated.interview_date = date;
                updated.interviewer_id = emp.Split(' ')[0];
                success = _applicationService.UpdateApplication(updated);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveTitleRecruit(string _department, string _title, string _recruiter, int slot)
        {
            // var apps = new List<ApplicationDepartmentJobtitle>();
            var success = false;
            using (context)
            {
                var titleRecruit = new title_recruit();
                titleRecruit.title_id = _title;
                titleRecruit.department_id = _department;
                titleRecruit.recruiter = _recruiter;
                titleRecruit.slot = Convert.ToSByte(slot);

                success = _applicationService.CreateTitleRecruit(titleRecruit);
                //var updated = _applicationService.GetApplicationById(applicantId.Trim());

                //updated.status = status;
                //updated.interview_date = date;
                //updated.interviewer_id = emp.Split(' ')[0];
                //success = _applicationService.UpdateApplication(updated);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateTitleRecruit(string _department, string _title, string _recruiter, int slot)
        {
            // var apps = new List<ApplicationDepartmentJobtitle>();
            var success = false;
            using (context)
            {
                var titleRecruit = _applicationService.GetTitleRecruit(_title, _department);
                titleRecruit.recruiter = _recruiter;
                titleRecruit.slot = Convert.ToSByte(slot);

                success = _applicationService.UpdateTitleRecruit(titleRecruit);
                //var updated = _applicationService.GetApplicationById(applicantId.Trim());

                //updated.status = status;
                //updated.interview_date = date;
                //updated.interviewer_id = emp.Split(' ')[0];
                //success = _applicationService.UpdateApplication(updated);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult RemoveTitleRecruit(string deptId, string titleId)
        {
            var success = false;
            using (context)
            {
                var existed = _applicationService.GetTitleRecruit(titleId, deptId);

                success = _applicationService.RemoveTitleRecruit(existed);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }


    }
}