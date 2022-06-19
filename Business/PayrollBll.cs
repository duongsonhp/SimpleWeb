using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business.MergedEntity;
using DataAccess;

namespace Business
{
    public class PayrollBll : Bll
    {
        public HRMEntity<contract> _contractRepo;
        public HRMEntity<n_restrict_product> _restrictProductsRepo;
        public HRMEntity<n_absence> _absenceRepo;
        public HRMEntity<n_extra_work_time> _extraWorkTimeRepo;
        public HRMEntity<n_holiday> _holidayRepo;
        public HRMEntity<n_number_product> _numberProductRepo;
        public HRMEntity<n_product> _productRepo;
        public HRMEntity<employee> _employeeRepo;
        public HRMEntity<standard_work_time> _standardWorkTimeRepo;
        public HRMEntity<standard_work_time_for_employee> _standardWorkTimeForEmpRepo;

        public List<n_extra_work_time> GetExtraWorkTimes(string employeeId, sbyte month, int year)
        {
            var result = new List<n_extra_work_time>();

            result = _extraWorkTimeRepo.Get(e => e.employee_id == employeeId && e.work_date.Month == month && e.work_date.Year == year, e => e.work_date).ToList();

            return result;
        }

        public List<n_extra_work_time> GetExtraWorkTimes(string employeeId, sbyte start_month, int start_year, sbyte end_month, int end_year)
        {
            var result = new List<n_extra_work_time>();

            result = _extraWorkTimeRepo.Get(e => e.employee_id == employeeId && e.work_date.Month >= start_month && e.work_date.Month <= end_month && e.work_date.Year >= start_year && e.work_date.Year <= end_year, e => e.work_date).ToList();

            return result;
        }

        public Contract GetActivatingContractsByEmployee(string empId)
        {
            var allContracts = _contractRepo.Get(c => c.employee_id == empId && c.status == 1, c => c.start_date).ToList();
            var allCompletedProducts = _restrictProductsRepo.Get(r => r.employee_id == empId, r => r.number_product).ToList();

            var result = (from contr in allContracts
                          join pro in allCompletedProducts on contr.id equals pro.contract_id into re
                          from _re in re.DefaultIfEmpty()
                          select new Contract
                          {
                              id = contr.id,
                              employee_id = contr.employee_id,
                              start_date = contr.start_date,
                              end_date = contr.end_date,
                              standard_work_time_for_employee_id = contr.standard_work_time_for_employee_id,
                              wage = contr.wage,
                              unit = contr.unit,
                              status = contr.status,
                              restrict_product_number = contr.restrict_product_number,
                              require_educate = contr.require_educate,
                              period_type = contr.period_type,
                              payroll_type = contr.payroll_type,
                              number_product = (_re != null) ? _re.number_product : null
                          }).FirstOrDefault();

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

        public List<n_holiday> GetHoliday(DateTime start, DateTime end)
        {
            var result = new List<n_holiday>();

            result = _holidayRepo.Get(h => DateTime.Compare(h.day, start) >= 0 && DateTime.Compare(h.day, end) <= 0, h => h.holiday_name).ToList();

            return result;
        }

        public Payroll GetPayrollInformation(string employeeId, DateTime? payrollPeriod, DateTime? prevPeriod )
        {
            var result = new Payroll();

            if (payrollPeriod == null)
                payrollPeriod = DateTime.Now;
            if (prevPeriod == null)
                prevPeriod = DateTime.Now;

            var contractInfo = _contractRepo.Get(c => c.employee_id == employeeId && c.status == 1, c => c.start_date).FirstOrDefault();
            var empInfo = _employeeRepo.Get("id", employeeId);
            var standardWorkTimes = _standardWorkTimeRepo.Get().ToList();
            var standardWorkTimeForEmp = _standardWorkTimeForEmpRepo.Get(s => s.employee_id == employeeId && s.month == payrollPeriod.Value.Month, s => s.standard_work_time_id).ToList();
            var standardWorkTime = (from st1 in standardWorkTimes
                                    join st2 in standardWorkTimeForEmp on st1.id equals st2.standard_work_time_id
                                    select new StandardWorkTimeEmployee
                                    {
                                        id = st2.id,
                                        standard_work_time_id = st2.standard_work_time_id,
                                        employee_id = employeeId,
                                        month = st2.month,
                                        amount_time = Convert.ToInt32(st1.amount_time),
                                        unit = st1.unit,
                                        period = st1.period
                                    }).FirstOrDefault();

            double payroll = 0;

            result = new Payroll
            {
                id = contractInfo.employee_id,
                name = $"{empInfo.last_name} {empInfo.first_name}",
                payroll_type = Convert.ToSByte(contractInfo.payroll_type),
                period_type = Convert.ToSByte(contractInfo.period_type),
                require_educate = Convert.ToBoolean(contractInfo.require_educate),
                require_wage = (contractInfo.unit == "Triệu đồng") ? Convert.ToDouble(contractInfo.wage * 1000000) : Convert.ToDouble(contractInfo.wage * 1000),
                payroll_period = payrollPeriod.Value,
                restrict_product = Convert.ToInt32(contractInfo.restrict_product_number),
                standard_work_time = standardWorkTime.amount_time,
                holidayExtraHours = 0,
                weekendExtraHours = 0,
                normalExtraHours = 0
            };



            if(contractInfo.payroll_type == 1) // Trả lương theo thời gian
            {
                var extra = 0;
                if (result.require_educate == true)
                {
                    extra = 309400; // Phụ cấp cho người làm công việc yêu cầu đã qua đào tạo nghề

                }
                if (contractInfo.period_type == 1) // Sau mỗi nửa tháng
                {
                    // var daysAbsent = _absenceRepo.Get(a => (payrollPeriod - a.absent_date).TotalDays < 15 && a.employee_id == employeeId && a.is_allowed == false && a.special_reason == false, a => a.is_allowed).Count();
                    var daysAbsent = _absenceRepo.Get(a => DateTime.Compare(prevPeriod.Value, a.absent_date) <= 0 && DateTime.Compare(payrollPeriod.Value, a.absent_date) > 0 && a.employee_id == employeeId && a.is_allowed == false && a.special_reason == false, a => a.is_allowed).Count();
                    result.real_work_day = result.standard_work_time - daysAbsent;
                    result.absences = daysAbsent;
                }
                else if(contractInfo.period_type == 2) // Sau mỗi tháng
                {
                    //var daysAbsent = _absenceRepo.Get(a => (payrollPeriod - a.absent_date).TotalDays < 30 && a.employee_id == employeeId && a.is_allowed == false && a.special_reason == false, a => a.is_allowed).Count();
                    var daysAbsent = _absenceRepo.Get(a => DateTime.Compare(prevPeriod.Value, a.absent_date) <= 0 && DateTime.Compare(payrollPeriod.Value, a.absent_date) > 0 && a.employee_id == employeeId && a.is_allowed == false && a.special_reason == false, a => a.is_allowed).Count();

                    var test_1 = _absenceRepo.Get();
                    var test_2 = _absenceRepo.Get(a => a.employee_id == employeeId && a.is_allowed == false && a.special_reason == false, a => a.is_allowed);
                    result.real_work_day = result.standard_work_time - daysAbsent;
                    result.absences = daysAbsent;
                }
                else if(contractInfo.period_type == 3) // Sau mỗi tuần
                {
                    // var daysAbsent = _absenceRepo.Get(a => (payrollPeriod - a.absent_date).TotalDays < 7 && a.employee_id == employeeId && a.is_allowed == false && a.special_reason == false, a => a.is_allowed).Count();
                    var daysAbsent = _absenceRepo.Get(a => DateTime.Compare(prevPeriod.Value, a.absent_date) <= 0 && DateTime.Compare(payrollPeriod.Value, a.absent_date) > 0 && a.employee_id == employeeId && a.is_allowed == false && a.special_reason == false, a => a.is_allowed).Count();
                    result.real_work_day = result.standard_work_time - daysAbsent;
                    result.absences = daysAbsent;
                }
                else if(contractInfo.period_type == 4) // Sau mỗi ngày
                {
                    //var daysAbsent = _absenceRepo.Get(a => (payrollPeriod - a.absent_date).TotalDays < 15 && a.employee_id == employeeId && a.is_allowed == false && a.special_reason == false, a => a.is_allowed).Count();
                    //result.real_work_day = result.standard_work_time - daysAbsent;
                }
                payroll = ((result.require_wage + extra) / result.standard_work_time) * result.real_work_day;

                var extraTimes = GetExtraWorkTimes(employeeId, Convert.ToSByte(prevPeriod.Value.Month), prevPeriod.Value.Year, Convert.ToSByte(payrollPeriod.Value.Month), payrollPeriod.Value.Year).ToList();
                var holidays = GetHoliday(prevPeriod.Value, payrollPeriod.Value);
                var hourPay = result.require_wage / (8 * result.standard_work_time);
                extraTimes.ForEach(delegate (n_extra_work_time ne)
                {
                    var rate = 1.5;
                    if (holidays.Any(h => DateTime.Compare(h.day, ne.work_date) == 0) == true)
                    {
                        rate = 3;
                        // result.holidayExtraHours += ne.work_date.Hour + ne.work_date.Minute / 60;
                        result.holidayExtraHours += (ne.to.Value - ne.from.Value).Hours + (ne.to.Value - ne.from.Value).Minutes / 60;
                        payroll += result.holidayExtraHours * rate * hourPay;
                    }
                    else if (ne.work_date.DayOfWeek == DayOfWeek.Saturday || ne.work_date.DayOfWeek == DayOfWeek.Sunday)
                    {
                        rate = 2;
                        // result.weekendExtraHours += ne.work_date.Hour + ne.work_date.Minute / 60;
                        result.weekendExtraHours += (ne.to.Value - ne.from.Value).Hours + (ne.to.Value - ne.from.Value).Minutes / 60;
                        payroll += result.weekendExtraHours * rate * hourPay;
                    }
                    else
                    {
                        rate = 1.5;
                        // result.normalExtraHours += ne.work_date.Hour + ne.work_date.Minute / 60;
                        result.normalExtraHours += (ne.to.Value - ne.from.Value).Hours + (ne.to.Value - ne.from.Value).Minutes / 60;
                        payroll += result.normalExtraHours * rate * hourPay;
                    }
                    // payroll += (ne.work_date.Hour + ne.work_date.Minute / 60) * rate * hourPay;
                });
            }
            else if(contractInfo.payroll_type == 2) // Trả lương theo sản phẩm
            {
                var extra = 0;
                if (result.require_educate == true)
                {
                    extra = 309400; // Phụ cấp cho người làm công việc yêu cầu đã qua đào tạo nghề

                }
                var products = GetProductPerMonth(employeeId, prevPeriod.Value, payrollPeriod.Value).ToList();
                result.listProducts = new List<Product>();
                products.ForEach(delegate (ProductPerMonth pr)
                {
                    result.listProducts.Add(new Product { 
                        id = pr.product_id,
                        name = pr.product_name,
                        value = pr.price,
                        quantity = Convert.ToInt32(pr.number_product)
                    });
                    payroll += Convert.ToDouble(pr.price * pr.number_product);
                });
                payroll += extra;
            }
            else if(contractInfo.payroll_type == 3) // Trả lương theo khoán
            {
                var extra = 0;
                if (result.require_educate == true)
                {
                    extra = 309400; // Phụ cấp cho người làm công việc yêu cầu đã qua đào tạo nghề

                }
                var _contract = GetActivatingContractsByEmployee(employeeId);
                payroll = Convert.ToDouble(result.require_wage * (((double)_contract.number_product) / result.restrict_product));
                result.completed_restrict_product = Convert.ToInt32(_contract.number_product);
                payroll += extra;
            }

            result.total = payroll;
            return result;
        }
    }
}
