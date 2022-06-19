using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Business;
using DataAccess;
using Business.MergedEntity;
using HRM.Models;
using System.Dynamic;
using System.Data.SqlClient;
using System.Data;
using MySql.Data.MySqlClient;
using Newtonsoft;

namespace HRM.Controllers
{
    public class ExpenseController : ExtendController
    {
        // GET: Expense
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Product()
        {
            return View();
        }

        public ActionResult ConfigExpense()
        {
            return View();
        }

        public ActionResult Report()
        {
            dynamic mymodel = new ExpandoObject();
            mymodel.emps = _employeeService.GetEmployees();
            mymodel.exps = _expenseService.GetFullExpenses();
            return View(mymodel);
        }

        public ActionResult Analysis()
        {
            dynamic mymodel = new ExpandoObject();
            mymodel.emps = _employeeService.GetEmployees();
            mymodel.depts = _departmentService.GetDepartments();
            return View(mymodel);
        }

        [HttpGet]
        public JsonResult RenderProducts()
        {
            var pros = new List<product>();
            using (context)
            {
                pros = _expenseService.GetProducts();
            }

            if (pros.Count() != 0)
                return Json(pros, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult RenderExpenses()
        {
            var exps = new List<Expense>();
            using (context)
            {
                exps = _expenseService.GetFullExpenses();
            }

            if (exps.Count() != 0)
                return Json(exps, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult RenderReports()
        {
            var reports = new List<Report>();
            using (context)
            {
                reports = _expenseService.GetFullReports();
            }

            if (reports.Count() != 0)
                return Json(reports, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveProduct(NewProductModel newProduct)
        {
            var success = false;
            var added = new product();
            using (context)
            {
                added.product_name = newProduct.product_name;
                added.prefix_code = newProduct.prefix_code;
                switch (newProduct.unit_1)
                {
                    case "Triệu đồng":
                        {
                            added.unit_1 = "Triệu đồng";
                            break;
                        }
                    case "Nghìn đồng":
                        {
                            added.unit_1 = "Nghìn đồng";
                            break;
                        }
                    default:
                        {
                            added.unit_1 = "Triệu đồng";
                            break;
                        }
                }
                switch (newProduct.unit_2)
                {
                    case "Triệu đồng":
                        {
                            added.unit_2 = "Triệu đồng";
                            break;
                        }
                    case "Nghìn đồng":
                        {
                            added.unit_2 = "Nghìn đồng";
                            break;
                        }
                    default:
                        {
                            added.unit_2 = "Triệu đồng";
                            break;
                        }
                }
                added.proposed_price = newProduct.proposed_price;
                added.sale_price = newProduct.sale_price;
                added.vendor_tax = newProduct.vendor_tax;
                added.customer_tax = newProduct.customer_tax;


                var existedId = _expenseService.GetProducts().Select(e => e.id);
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

                success = _expenseService.CreateProduct(added);
            }

            return Json(new { success = success, new_id = added.id }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateProduct(NewProductModel newProduct)
        {
            var success = false;
            using (context)
            {
                var updated = _expenseService.GetProductById(newProduct.id);
                updated.prefix_code = newProduct.prefix_code;
                updated.proposed_price = newProduct.proposed_price;
                updated.sale_price = newProduct.sale_price;
                updated.unit_1 = newProduct.unit_1;
                updated.unit_2 = newProduct.unit_2;
                updated.vendor_tax = newProduct.vendor_tax;
                updated.customer_tax = newProduct.customer_tax;
                success = _expenseService.UpdateProduct(updated);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult RemoveProduct(string proId)
        {
            var success = false;
            using (context)
            {
                success = _expenseService.RemoveProduct(proId);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult RemoveExpense(string id)
        {
            var success = false;
            using (context)
            {
                success = _expenseService.RemoveExpense(id);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult RemoveReport(string id)
        {
            var success = false;
            using (context)
            {
                success = _expenseService.RemoveReport(id);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveExpense(ExpenseModel created)
        {
            var success = false;
            var added = new expense();
            using (context)
            {
                var correspondingExpense = _expenseService.GetProductByName(created.product);
                added.product_id = correspondingExpense.id;
                added.price_per_item = (correspondingExpense.unit_2 == "Nghìn đồng")? correspondingExpense.sale_price * 1000 : correspondingExpense.sale_price * 1000000;
                added.unit = created.unit;
                added.quantity = created.quantity;
                added.total_value = added.quantity * added.price_per_item;
                added.employee_id = (Session["CurrentEmployeeId"] == null) ? "BK00231" : (string)Session["CurrentEmployeeId"];
                added.expense_date = created.expense_date;

                var existedId = _expenseService.GetExpenses().Select(e => e.id);
                if (existedId != null)
                {
                    if (existedId.Count() != 0)
                    {
                        do
                        {
                            added.id = _toolGenId.GenerateId(6);
                        }
                        while (existedId.Any(e => e.Equals(added.id, StringComparison.OrdinalIgnoreCase)));
                    }
                    else
                    {
                        added.id = _toolGenId.GenerateId(6);
                    }
                }
                else
                {
                    added.id = _toolGenId.GenerateId(6);
                }

                success = _expenseService.CreateExpense(added);
            }

            return Json(new { success = success, new_id = added.id }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveReport(ReportModel newReport)
        {
            var success = false;
            var added = new expense_report();
            using (context)
            {
                added.report_name = newReport.report_name;
                added.approve_man_id = newReport.approve_man_id;
                added.pay_man_id = newReport.pay_man_id;
                added.status = 0;
                added.employee_id = (Session["CurrentEmployeeId"] == null) ? "BK00231" : (string)Session["CurrentEmployeeId"];
                var existedId = _expenseService.GetReports().Select(e => e.report_id);
                if (existedId != null)
                {
                    if (existedId.Count() != 0)
                    {
                        do
                        {
                            added.report_id = _toolGenId.GenerateId(6);
                        }
                        while (existedId.Any(e => e.Equals(added.report_id, StringComparison.OrdinalIgnoreCase)));
                    }
                    else
                    {
                        added.report_id = _toolGenId.GenerateId(6);
                    }
                }
                else
                {
                    added.report_id = _toolGenId.GenerateId(6);
                }

                success = _expenseService.CreateReport(added);

                var expenses = new List<expenses_in_report>();
                // var newExpenseInReportIds = new List<string>();

                foreach (var item in newReport.expenses)
                {
                    //var parts = item.standard_work_time.Trim().Split(' ');

                    //var amountTime = Convert.ToInt32(parts[0]);
                    //var _parts = parts[1].Split('/');
                    //var unit = _parts[0];
                    //var period = _parts[1];

                    //var standardWorkTimeId = _workTimeService.Get(amountTime, unit, period).id;

                    var exp = new expenses_in_report
                    {
                        // id = _toolGenId.GenWorkTimeForEmpId(),
                        expense_id = item,
                        report_id = added.report_id
                    };
                    expenses.Add(exp);
                }
                _expenseService.CreateExpenseInReport(expenses);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateExpense(ExpenseModel updated, string id)
        {
            var success = false;
            using (context)
            {
                // var updated = new employee();
                var existed = _expenseService.GetExpenseById(id);
                // var correspondingExpense = _expenseService.GetProductByName(updated.product);
                //existed.product_id = correspondingExpense.id;
                // existed.price_per_item = (correspondingExpense.unit_2 == "Nghìn đồng") ? correspondingExpense.sale_price * 1000 : correspondingExpense.sale_price * 1000000;
                existed.unit = updated.unit;
                existed.quantity = updated.quantity;
                existed.total_value = existed.quantity * existed.price_per_item;
                // existed.employee_id = (Session["CurrentEmployeeId"] == null) ? "BK00231" : (string)Session["CurrentEmployeeId"];
                existed.expense_date = updated.expense_date;

                success = _expenseService.UpdateExpense(existed);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateReport(ReportModel updated)
        {
            var success = false;
            using (context)
            {
                // var updated = new employee();
                var existed = _expenseService.GetReportById(updated.report_id);
                // var correspondingExpense = _expenseService.GetProductByName(updated.product);
                //existed.product_id = correspondingExpense.id;
                // existed.price_per_item = (correspondingExpense.unit_2 == "Nghìn đồng") ? correspondingExpense.sale_price * 1000 : correspondingExpense.sale_price * 1000000;
                existed.approve_man_id = updated.approve_man_id;
                existed.pay_man_id = updated.pay_man_id;
                success = _expenseService.UpdateReport(existed);

                var existedExpenseInReport = _expenseService.GetExpensesInReport(updated.report_id);
                // var remain = existedExpenseInReport.Where(e => updated.expenses.Contains(e.expense_id)).ToList();
                var delete = existedExpenseInReport.Where(e => updated.expenses.Contains(e.expense_id) == false).ToList();
                var add = updated.expenses.Where(u => existedExpenseInReport.Select(e => e.expense_id).Contains(u) == false).ToList();
                var addNew = new List<expenses_in_report>();
                foreach(var item in add)
                {
                    addNew.Add(new expenses_in_report
                    {
                        report_id = updated.report_id,
                        expense_id = item
                    });
                }
                success = _expenseService.CreateExpenseInReport(addNew);
                success = _expenseService.RemoveExpenseInReport(delete);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateReportStatus(string id, sbyte status)
        {
            var success = false;
            using (context)
            {
                // var updated = new employee();
                var existed = _expenseService.GetReportById(id);
                // var correspondingExpense = _expenseService.GetProductByName(updated.product);
                //existed.product_id = correspondingExpense.id;
                // existed.price_per_item = (correspondingExpense.unit_2 == "Nghìn đồng") ? correspondingExpense.sale_price * 1000 : correspondingExpense.sale_price * 1000000;
                existed.status = status;
                
                success = _expenseService.UpdateReport(existed);
                // success = _expenseService.RemoveExpenseInReport(delete);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AnalysisExpense(string col, List<string> rows, List<FilterModel> filters)
        {
            var query = "";
            var groupBy = "";
            var select = "";
            var from = "expense_report t1, employee t2, department t3, expense t4, expenses_in_report t5";
            var where = "";
            if(filters != null)
            {
                if(filters.Count() != 0)
                {
                    where = $@"t1.employee_id = t2.id
                        and t2.department_id = t3.department_id
                        and t1.report_id = t5.report_id
                        and t4.id = t5.expense_id and {string.Join(" and ", filters.Select(f => f.condition))}";
                }
                else
                {
                    where = $@"t1.employee_id = t2.id
                        and t2.department_id = t3.department_id
                        and t1.report_id = t5.report_id
                        and t4.id = t5.expense_id";
                }
            }
            else
            {
                where = $@"t1.employee_id = t2.id
                        and t2.department_id = t3.department_id
                        and t1.report_id = t5.report_id
                        and t4.id = t5.expense_id";
            }

            if(col == "Ngày")
            {
                groupBy = "t4.expense_date";
                select = "t4.expense_date as 'expense_date'";
            }    
            else if(col == "Tháng")
            {
                groupBy = "ConvertDateToMonth(t4.expense_date)";
                select = "ConvertDateToMonth(t4.expense_date) as 'expense_month'";
            }
            else if(col == "Năm")
            {
                groupBy = "ConvertDateToYear(t4.expense_date)";
                select = "ConvertDateToYear(t4.expense_date) as 'expense_year'";
            }
            else if(col == "Nhân viên")
            {
                groupBy = "concat(t2.id, ' - ', t2.last_name, ' ', t2.first_name)";
                select = "concat(t2.id, ' - ', t2.last_name, ' ', t2.first_name) as 'account'";
            }
            else if (col == "Phòng ban")
            {
                groupBy = "t3.department_name";
                select = "t3.department_name as 'department_name'";
            }
            else if (col == "Trạng thái")
            {
                groupBy = "t1.status";
                select = "t1.status as 'status'";
            }

            for(var i = 0; i < rows.Count(); ++i)
            {
                select = $"{select}, SUM(t4.total_value) as 'total_value'";
            }

            query = $"select {select} from {from} where {where} group by {groupBy}";

            List<dynamic> result = new List<dynamic>();
            var connectionString = "server=localhost;user id=root;password=1234567a@;database=hrm";
            using (var connection = new MySqlConnection(connectionString))
            {
                var command = new MySqlCommand(query, connection);
                command.CommandType = CommandType.Text;
                using (var adapter = new MySqlDataAdapter(command))
                {
                    using (var dataTable = new DataTable())
                    {
                        adapter.Fill(dataTable);
                        foreach (DataRow row in dataTable.Rows)
                        {
                            //create a new ExpandoObject() at each row
                            var expandoDictRow = new ExpandoObject() as IDictionary<String, Object>;
                            foreach (DataColumn _col in dataTable.Columns)
                            {
                                //put every column of this row into the new dictionary
                                expandoDictRow.Add(_col.ToString(), row[_col.ColumnName].ToString());
                            }

                            //add this "row" to the list
                            result.Add(Newtonsoft.Json.JsonConvert.SerializeObject(expandoDictRow));

                            


                            ////create a new ExpandoObject() at each row
                            //dynamic expandoDictRow = new ExpandoObject();
                            //foreach (DataColumn _col in dataTable.Columns)
                            //{
                            //    //put every column of this row into the new dictionary
                            //    // expandoDictRow.Add(_col.ToString(), row[_col.ColumnName].ToString());
                            //    expandoDictRow[_col.ToString()] = row[_col.ColumnName].ToString();
                            //}

                            ////add this "row" to the list
                            //result.Add(expandoDictRow);
                        }
                    }
                }
            }

            if (result.Count() != 0)
                return Json(result, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }
    }
}