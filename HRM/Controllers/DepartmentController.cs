using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Business;
using Business.MergedEntity;
using DataAccess;
using HRM.Models;

namespace HRM.Controllers
{
    public class DepartmentController : ExtendController
    {
        // GET: Department
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult RenderDepartments()
        {
            var departments = new List<department>();
            using (context)
            {
                departments = _departmentService.GetDepartments();
            }

            if (departments.Count() != 0)
                return Json(departments, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateDepartment(DepartmentModel updated)
        {
            var success = false;
            using (context)
            {
                // var updated = new employee();
                var update = _departmentService.GetDepartmentById(updated.department_id);
                update.department_name = updated.department_name;
                update.manager_id = updated.manager_id;
                update.parent_id = updated.parent_id;

                success = _departmentService.UpdateDepartment(update);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveDepartment(DepartmentModel added)
        {
            var success = false;
            var add = new department();
            using (context)
            {
                add.department_name = added.department_name;
                add.parent_id = added.parent_id;
                add.manager_id = added.manager_id;

                var existedId = _departmentService.GetDepartments().Select(e => e.department_id);
                if (existedId != null)
                {
                    if (existedId.Count() != 0)
                    {
                        do
                        {
                            add.department_id = Guid.NewGuid().ToString();
                        }
                        while (existedId.Any(e => e.Equals(add.department_id, StringComparison.OrdinalIgnoreCase)));
                    }
                    else
                    {
                        add.department_id = Guid.NewGuid().ToString();
                    }
                }
                else
                {
                    add.department_id = Guid.NewGuid().ToString();
                }

                success = _departmentService.CreateDepartment(add);
            }

            return Json(new { success = success, new_id = add.department_id }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult RemoveDepartment(string deptId)
        {
            var success = false;
            using (context)
            {
                var existed = _departmentService.GetDepartmentById(deptId);

                success = _departmentService.RemoveDepartment(existed);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }
    }
}