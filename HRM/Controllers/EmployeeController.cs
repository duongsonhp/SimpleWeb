using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HRM.Models;
using DataAccess;
using Business;
using Business.MergedEntity;

namespace HRM.Controllers
{
    public class EmployeeController : ExtendController
    {
        public EmployeeController() : base()
        {

        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ExtraTime(string id)
        {
            if (String.IsNullOrWhiteSpace(id) == true)
                return RedirectToAction("ExtraTime", new { id = "BK00231" });
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Payroll()
        {
            // ViewBag.Message = "Your contact page.";
            var emps = _employeeService.GetEmployees();

            return View(emps);
        }

        public ActionResult ProductPerMonth()
        {
            return View();
        }

        [HttpPost]
        public JsonResult SaveExtraWorkTime(ExtraWorkTimeModel extraTime)
        {
            var success = false;
            var added = new n_extra_work_time();
            using (context)
            {
                added.work_date = extraTime.work_date;
                added.employee_id = extraTime.employee_id;
                added.from = extraTime.from;
                added.to = extraTime.to;

                success = _extraWorkTimeService.CreateExtraTime(added);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveEmployee(NewEmployeeModel newEmployee)
        {
            var success = false;
            var added = new employee();
            using (context)
            {
                added.last_name = newEmployee.last_name;
                added.first_name = newEmployee.first_name;
                switch (newEmployee.material_status)
                {
                    case "Độc thân":
                        {
                            added.martial_status_id = 1;
                            break;
                        }
                    case "Đã kết hôn":
                        {
                            added.martial_status_id = 2;
                            break;
                        }
                    default:
                        {
                            added.martial_status_id = 1;
                            break;
                        }
                }
                added.number_of_children = Convert.ToSByte(newEmployee.number_of_children);
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
                added.major = newEmployee.major;
                added.college = newEmployee.college;
                added.bank_account = newEmployee.bank_account;
                added.department_id = _departmentService.GetDepartment(newEmployee.department).department_id;
                added.title_id = _titleService.GetTitle(newEmployee.title).title_id;
                try
                {
                    added.manager_id = newEmployee.manager.Split(' ')[0];
                }
                catch (Exception e)
                {
                    added.manager_id = null;
                }
                try
                {
                    added.timeoff_manager_id = newEmployee.time_manager.Split(' ')[0];
                }
                catch (Exception e)
                {
                    added.timeoff_manager_id = null;
                }
                try
                {
                    added.expense_manager_id = newEmployee.expense_manager.Split(' ')[0];
                }
                catch (Exception e)
                {
                    added.expense_manager_id = null;
                }
                added.distance_from_home = newEmployee.distance_from_home;
                switch (newEmployee.gender)
                {
                    case "Nam":
                        {
                            added.gender = true;
                            break;
                        }
                    case "Nữ":
                        {
                            added.gender = false;
                            break;
                        }
                    default:
                        {
                            added.gender = true;
                            break;
                        }
                }
                added.birthday = newEmployee.birthday;
                added.born_place = newEmployee.born_place;
                added.phone = newEmployee.phone;
                added.emergency_phone = newEmployee.emergency_phone;
                added.emergency_contact_man = newEmployee.emergency_contact_man;
                added.address = newEmployee.address;
                added.email = newEmployee.email;
                added.identity_citizen_id = newEmployee.identity_citizen_id;

                var existedId = _employeeService.GetEmployees().Select(e => e.id);
                if (existedId != null)
                {
                    if (existedId.Count() != 0)
                    {
                        do
                        {
                            added.id = _toolGenId.GenEmployeeId();
                        }
                        while (existedId.Any(e => e.Equals(added.id, StringComparison.OrdinalIgnoreCase)));
                    }
                    else
                    {
                        added.id = _toolGenId.GenEmployeeId();
                    }
                }
                else
                {
                    added.id = _toolGenId.GenEmployeeId();
                }

                success = _employeeService.CreateEmployee(added);

                var standardWorkTimesForEmployee = new List<standard_work_time_for_employee>();
                var newStandardWorkTimesForEmployeeIds = new List<string>();

                foreach (var item in newEmployee.standard_work_time)
                {
                    var parts = item.standard_work_time.Trim().Split(' ');

                    var amountTime = Convert.ToInt32(parts[0]);
                    var _parts = parts[1].Split('/');
                    var unit = _parts[0];
                    var period = _parts[1];

                    var standardWorkTimeId = _workTimeService.Get(amountTime, unit, period).id;

                    var standardWorkTimeForEmployee = new standard_work_time_for_employee
                    {
                        // id = _toolGenId.GenWorkTimeForEmpId(),
                        standard_work_time_id = standardWorkTimeId,
                        employee_id = added.id,
                        month = item.month
                    };

                    var existedWorkTimeForEmpId = _workTimeService.GetWorkTimesForEmployee().Select(e => e.id).ToList();
                    existedWorkTimeForEmpId.AddRange(newStandardWorkTimesForEmployeeIds);

                    if (existedWorkTimeForEmpId != null)
                    {
                        if (existedWorkTimeForEmpId.Count() != 0)
                        {
                            do
                            {
                                standardWorkTimeForEmployee.id = _toolGenId.GenWorkTimeForEmpId();
                            }
                            while (existedWorkTimeForEmpId.Any(e => e.Equals(standardWorkTimeForEmployee.id, StringComparison.OrdinalIgnoreCase)));
                        }
                        else
                        {
                            standardWorkTimeForEmployee.id = _toolGenId.GenWorkTimeForEmpId();
                        }
                    }
                    else
                    {
                        standardWorkTimeForEmployee.id = _toolGenId.GenWorkTimeForEmpId();
                    }
                    newStandardWorkTimesForEmployeeIds.Add(standardWorkTimeForEmployee.id);

                    standardWorkTimesForEmployee.Add(standardWorkTimeForEmployee);
                }
                _workTimeService.CreateStandardWorkTimeForEmployee(standardWorkTimesForEmployee);
            }
            
            return Json(new { success = success, new_id = added.id}, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateStandardWorkTimeForEmployee(NewEmployeeModel newEmployee)
        {
            var success = false;
            var updates = new List<standard_work_time_for_employee>();
            using (context)
            {
                var standardWorkTimesForEmployee = new List<standard_work_time_for_employee>();
                var newStandardWorkTimesForEmployeeIds = new List<string>();

                foreach (var item in newEmployee.standard_work_time)
                {
                    var parts = item.standard_work_time.Trim().Split(' ');

                    var amountTime = Convert.ToInt32(parts[0]);
                    var _parts = parts[1].Split('/');
                    var unit = _parts[0];
                    var period = _parts[1];

                    var standardWorkTimeWithMonthAndEmp = _workTimeService.GetWorkTimesForEmployee(newEmployee.id, item.month);

                    var newStandardWorkTimeWithMonthAndEmp = _workTimeService.Get(amountTime, unit, period);
                    standardWorkTimeWithMonthAndEmp.standard_work_time_id = newStandardWorkTimeWithMonthAndEmp.id;
                    updates.Add(standardWorkTimeWithMonthAndEmp);
                }
                // _workTimeService.CreateStandardWorkTimeForEmployee(standardWorkTimesForEmployee);
                success = _workTimeService.UpdateStandardWorkTimeForEmployee(updates);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateContract(List<ContractEmployeeModel> contracts)
        {
            var success = false;
            var updates = new List<contract>();
            var creates = new List<contract>();
            var completedUpdateProducts = new List<n_restrict_product>();
            var completedCreatedProducts = new List<n_restrict_product>();
            var updateModels = contracts.Where(c => c.id != "0").ToList();
            var createModels = contracts.Where(c => c.id == "0").ToList();
            using (context)
            {
                //var standardWorkTimesForEmployee = new List<standard_work_time_for_employee>();
                //var newStandardWorkTimesForEmployeeIds = new List<string>();

                //foreach (var item in newEmployee.standard_work_time)
                //{
                //    var parts = item.standard_work_time.Trim().Split(' ');

                //    var amountTime = Convert.ToInt32(parts[0]);
                //    var _parts = parts[1].Split('/');
                //    var unit = _parts[0];
                //    var period = _parts[1];

                //    var standardWorkTimeWithMonthAndEmp = _workTimeService.GetWorkTimesForEmployee(newEmployee.id, item.month);

                //    var newStandardWorkTimeWithMonthAndEmp = _workTimeService.Get(amountTime, unit, period);
                //    standardWorkTimeWithMonthAndEmp.standard_work_time_id = newStandardWorkTimeWithMonthAndEmp.id;
                //    updates.Add(standardWorkTimeWithMonthAndEmp);
                //}
                //// _workTimeService.CreateStandardWorkTimeForEmployee(standardWorkTimesForEmployee);
                //success = _workTimeService.UpdateStandardWorkTimeForEmployee(updates);

                foreach(var item in updateModels)
                {
                    var updateContract = _contractService.GetContract(item.id);
                    var updateCompletedProducts = _contractService.GetRestrictProduct(item.id);

                    updateContract.start_date = item.start_date;
                    updateContract.end_date = item.end_date;
                    updateContract.wage = item.wage;
                    updateContract.unit = item.unit;
                    updateContract.restrict_product_number = item.restrict_product_number;
                    updateContract.require_educate = item.require_educate;
                    updateContract.period_type = item.period_type;
                    updateContract.payroll_type = item.payroll_type;
                    updateContract.status = item.status;
                    updates.Add(updateContract);

                    if(item.number_product != null)
                    {
                        if (updateCompletedProducts != null)
                        {
                            updateCompletedProducts.number_product = item.number_product;
                            completedUpdateProducts.Add(updateCompletedProducts);
                        }
                        else
                        {
                            completedCreatedProducts.Add(new n_restrict_product
                            {
                                contract_id = item.id,
                                employee_id = item.employee_id,
                                number_product = item.number_product
                            });
                        }
                    }
                }

                var newContractIds = new List<string>();
                foreach (var item in createModels)
                {
                    var newContract = new contract
                    {
                        employee_id = item.employee_id,
                        start_date = item.start_date,
                        end_date = item.end_date,
                        wage = item.wage,
                        unit = item.unit,
                        status = item.status,
                        restrict_product_number = item.restrict_product_number,
                        require_educate = item.require_educate,
                        period_type = item.period_type,
                        payroll_type = item.payroll_type
                    };

                    var existedContracts = _contractService.GetContracts().Select(e => e.id).ToList();
                    existedContracts.AddRange(newContractIds);

                    if (existedContracts != null)
                    {
                        if (existedContracts.Count() != 0)
                        {
                            do
                            {
                                newContract.id = _toolGenId.GenerateId(6);
                            }
                            while (existedContracts.Any(e => e.Equals(newContract.id, StringComparison.OrdinalIgnoreCase)));
                        }
                        else
                        {
                            newContract.id = _toolGenId.GenerateId(6);
                        }
                    }
                    else
                    {
                        newContract.id = _toolGenId.GenerateId(6);
                    }
                    newContractIds.Add(newContract.id);

                    if(item.number_product != null)
                    {
                        completedCreatedProducts.Add(new n_restrict_product
                        {
                            contract_id = newContract.id,
                            employee_id = item.employee_id,
                            number_product = item.number_product
                        });
                    }
                    creates.Add(newContract);
                }
                success = _contractService.CreateContract(creates);
                success = _contractService.UpdateContract(updates);
                success = _contractService.UpdateCompletedProduct(completedUpdateProducts);
                success = _contractService.CreateCompletedProduct(completedCreatedProducts);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateEmployee(NewEmployeeModel newEmployee)
        {
            var success = false;
            using (context)
            {
                // var updated = new employee();
                var updated = _employeeService.GetEmployeeById(newEmployee.id);
                updated.last_name = newEmployee.last_name;
                updated.first_name = newEmployee.first_name;
                switch (newEmployee.material_status)
                {
                    case "Độc thân":
                        {
                            updated.martial_status_id = 1;
                            break;
                        }
                    case "Đã kết hôn":
                        {
                            updated.martial_status_id = 2;
                            break;
                        }
                    default:
                        {
                            updated.martial_status_id = 1;
                            break;
                        }
                }
                updated.number_of_children = Convert.ToSByte(newEmployee.number_of_children);
                switch (newEmployee.degree)
                {
                    case "Tốt nghiệp THCS":
                        {
                            updated.degree_id = 1;
                            break;
                        }
                    case "Tốt nghiệp THPT":
                        {
                            updated.degree_id = 2;
                            break;
                        }
                    case "Cử nhân":
                        {
                            updated.degree_id = 3;
                            break;
                        }
                    case "Kĩ sư":
                        {
                            updated.degree_id = 4;
                            break;
                        }
                    case "Tốt nghiệp trung cấp":
                        {
                            updated.degree_id = 5;
                            break;
                        }
                    case "Tốt nghiệp cao đẳng":
                        {
                            updated.degree_id = 6;
                            break;
                        }
                    case "Cử nhân thực hành":
                        {
                            updated.degree_id = 7;
                            break;
                        }
                    case "Kĩ sư thực hành":
                        {
                            updated.degree_id = 8;
                            break;
                        }
                    case "Tốt nghiệp trường nghề":
                        {
                            updated.degree_id = 9;
                            break;
                        }
                    default:
                        {
                            updated.degree_id = 10;
                            break;
                        }
                }
                updated.major = newEmployee.major;
                updated.college = newEmployee.college;
                updated.bank_account = newEmployee.bank_account;
                updated.department_id = _departmentService.GetDepartment(newEmployee.department).department_id;
                updated.title_id = _titleService.GetTitle(newEmployee.title).title_id;
                try
                {
                    updated.manager_id = newEmployee.manager.Split(' ')[0];
                }
                catch (Exception e)
                {
                    updated.manager_id = null;
                }
                try
                {
                    updated.timeoff_manager_id = newEmployee.time_manager.Split(' ')[0];
                }
                catch (Exception e)
                {
                    updated.timeoff_manager_id = null;
                }
                try
                {
                    updated.expense_manager_id = newEmployee.expense_manager.Split(' ')[0];
                }
                catch (Exception e)
                {
                    updated.expense_manager_id = null;
                }
                updated.distance_from_home = newEmployee.distance_from_home;
                switch (newEmployee.gender)
                {
                    case "Nam":
                        {
                            updated.gender = true;
                            break;
                        }
                    case "Nữ":
                        {
                            updated.gender = false;
                            break;
                        }
                    default:
                        {
                            updated.gender = true;
                            break;
                        }
                }
                updated.birthday = newEmployee.birthday;
                updated.born_place = newEmployee.born_place;
                updated.phone = newEmployee.phone;
                updated.emergency_phone = newEmployee.emergency_phone;
                updated.emergency_contact_man = newEmployee.emergency_contact_man;
                updated.address = newEmployee.address;
                updated.email = newEmployee.email;
                updated.identity_citizen_id = newEmployee.identity_citizen_id;

                //var existedId = _employeeService.GetEmployees().Select(e => e.id);
                //if (existedId != null)
                //{
                //    if (existedId.Count() != 0)
                //    {
                //        do
                //        {
                //            updated.id = _toolGenId.GenEmployeeId();
                //        }
                //        while (existedId.Any(e => e.Equals(updated.id, StringComparison.OrdinalIgnoreCase)));
                //    }
                //    else
                //    {
                //        updated.id = _toolGenId.GenEmployeeId();
                //    }
                //}
                //else
                //{
                //    updated.id = _toolGenId.GenEmployeeId();
                //}

                success = _employeeService.UpdateEmployee(updated);
            }
            
            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateExtraWorkTime(ExtraWorkTimeModel extraTime)
        {
            var success = false;
            using (context)
            {
                // var updated = new employee();
                var updated = _extraWorkTimeService.GetExtraWorkTimes(extraTime.employee_id, extraTime.work_date);
                updated.from = extraTime.from;
                updated.to = extraTime.to;

                success = _extraWorkTimeService.UpdateExtraWorkTime(updated);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdatePlanForEmployee(string empId, List<string> added, List<string> removed)
        {
            var success = false;
            var removes = new List<plan_for_employee>();
            var adds = new List<plan_for_employee>();
            using (context)
            {
                if(removed != null)
                {
                    foreach (var remove in removed)
                    {
                        var existed = _planService.GetPlanForEmployee(remove, empId);
                        removes.Add(existed);
                    }
                }    

                if(added != null)
                {
                    foreach (var add in added)
                    {
                        var newItem = new plan_for_employee
                        {
                            employee_id = empId,
                            plan_id = add
                        };
                        adds.Add(newItem);
                    }
                }

                success = _planService.RemovePlanForEmployee(removes);
                success = _planService.CreatePlanForEmployee(adds);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateProductPerMonth(List<ProductPerMonthModel> creates, List<ProductPerMonthModel> updates)
        {
            var success = false;
            var exists = new List<n_number_product>();
            var adds = new List<n_number_product>();
            using (context)
            {
                if (updates != null)
                {
                    foreach (var item in updates)
                    {
                        var existed = _employeeService.GetProductPerMonths(item.employee_id, item.start_date, item.end_date, item.product_id);
                        existed.number_product = item.number_product;
                        exists.Add(existed);
                    }
                }

                if (creates != null)
                {
                    foreach (var add in creates)
                    {
                        var newItem = new n_number_product
                        {
                            employee_id = add.employee_id,
                            start_date = add.start_date,
                            end_date = add.end_date,
                            number_product = add.number_product,
                            product_id = add.product_id
                        };
                        adds.Add(newItem);
                    }
                }

                success = _employeeService.UpdateProductPerMonth(exists);
                success = _employeeService.CreateProductPerMonth(adds);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult RemoveEmployee(string empId)
        {
            var success = false;

            using (context)
            {
                success = _employeeService.RemoveEmployee(empId);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult RemoveProductPerMonth(string empId, DateTime startDate, DateTime endDate, string productId)
        {
            var success = false;

            var existed = _employeeService.GetProductPerMonths(empId, startDate, endDate, productId);

            using (context)
            {
                success = _employeeService.RemoveProductPerMonth(existed);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult RemoveExtraWorkTime(string empId, DateTime date)
        {
            var success = false;
            using (context)
            {
                success = _extraWorkTimeService.RemoveExtraTime(empId, date);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult RenderListDepartments()
        {
            var depts = new List<department>();
            using (context)
            {
                depts = _departmentService.GetDepartments();
            }
            
            if(depts.Count() != 0)
                return Json(depts, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult RenderListTitles()
        {
            var titles = new List<title>();
            using (context)
            {
                titles = _titleService.GetTitles();
            }
            
            if(titles.Count() != 0)
                return Json(titles, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult RenderListEmployees()
        {
            var emps = new List<employee>();
            using (context)
            {
                emps = _employeeService.GetEmployees();
            }

            if(emps.Count() != 0)
                return Json(emps, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult RenderStandardWorkTime(string empId)
        {
            var times = new List<StandardWorkTimeEmployee>();
            using (context)
            {
                times = _workTimeService.GetWorkTimesForEmployee(empId);
            }

            if (times.Count() != 0)
                return Json(times, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult RenderContracts(string empId)
        {
            var contr = new List<Contract>();
            var result = new List<StringDateContractModel>();
            using (context)
            {
                contr = _contractService.GetFullContractsByEmployee(empId);
            }

            foreach(var item in contr)
            {
                result.Add(new StringDateContractModel
                {
                    id = item.id,
                    employee_id = item.employee_id,
                    start_date = item.start_date.ToShortDateString(),
                    end_date = item.end_date.ToShortDateString(),
                    wage = item.wage.Value,
                    unit = item.unit,
                    status = item.status.Value,
                    restrict_product_number = item.restrict_product_number,
                    period_type = item.period_type,
                    payroll_type = item.payroll_type,
                    require_educate = item.require_educate,
                    number_product = item.number_product
                });
            }

            if (contr.Count() != 0)
                return Json(result, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult RenderProductPerMonth(string empId)
        {
            // var contr = new List<contract>();
            var result = new List<ProductPerMonth>();
            using (context)
            {
                result = _employeeService.GetProductPerMonth(empId);
            }

            //foreach (var item in contr)
            //{
            //    result.Add(new StringDateContractModel
            //    {
            //        id = item.id,
            //        employee_id = item.employee_id,
            //        start_date = item.start_date.ToShortDateString(),
            //        end_date = item.end_date.ToShortDateString(),
            //        wage = item.wage.Value,
            //        unit = item.unit,
            //        status = item.status.Value,
            //        restrict_product_number = item.restrict_product_number,
            //        period_type = item.period_type,
            //        payroll_type = item.payroll_type,
            //        require_educate = item.require_educate
            //    });
            //}

            if (result.Count() != 0)
                return Json(result, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult RenderExtraWorkTime(string empId, sbyte month, int year)
        {
            var result = new List<n_extra_work_time>();
            // var result = new List<StringDateContractModel>();
            using (context)
            {
                result = _extraWorkTimeService.GetExtraWorkTimes(empId, month, year);
            }

            var _returns = new List<ExtraWorkTimeStringDateModel>();
            result.ForEach(delegate (n_extra_work_time ex)
            {
                _returns.Add(new ExtraWorkTimeStringDateModel
                {
                    employee_id = ex.employee_id,
                    work_date = ex.work_date.ToShortDateString(),
                    from = ex.from.ToString(),
                    to = ex.to.ToString()
                });
            });

            if (_returns.Count() != 0)
                return Json(_returns, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetEmployees(int offset = 0, int amount = 9, string departmentId = "")
        {
            var emps = new List<EmployeeDepartTitltePosition>();
            using (context)
            {
                emps = _employeeService.GetEmployees(offset, amount, departmentId);
            }

            if(emps.Count() != 0)
                return Json(emps, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetProducts()
        {
            var prods = new List<n_product>();
            using (context)
            {
                prods = _employeeService.GetProducts();
            }

            if (prods.Count() != 0)
                return Json(prods, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetPayrollInformation(string employeeId, DateTime? payrollPeriod, DateTime? prePayrollPeriod)
        {
            var payroll = new Payroll();
            using (context)
            {
                // prods = _employeeService.GetProducts();
                payroll = _payrollService.GetPayrollInformation(employeeId, payrollPeriod, prePayrollPeriod);
            }

            if (payroll != null)
                return Json(payroll, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }
    }
}