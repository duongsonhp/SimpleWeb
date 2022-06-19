using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Business;
using DataAccess;
using HRM.Tools;

namespace HRM
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            //#region Khai báo các biến toàn cục dùng xuyên suốt quá trình
            //var _departmentService = new DepartmentBll
            //{
            //    _departmentRepo = new HRMEntity<department>()
            //};
            //#endregion
        }
    }

    public class ExtendController : Controller
    {
        public GenId _toolGenId = new GenId();

        public DbContext context;
        
        public ExtendController()
        {
            context = new hrmEntities1();
            _departmentService = new DepartmentBll
            {
                _departmentRepo = new HRMEntity<department>(context)
            };

            _titleService = new TitleDll
            {
                _titleRepo = new HRMEntity<title>(context)
            };

            _employeeService = new EmployeeDll
            {
                _employeeRepo = new HRMEntity<employee>(context),
                _departmentRepo = new HRMEntity<department>(context),
                _titleRepo = new HRMEntity<title>(context),
                _productRepo = new HRMEntity<n_product>(context),
                _numberProductRepo = new HRMEntity<n_number_product>(context)
            };

            _workTimeService = new StandardWorkTimeBll
            {
                _workTimeRepo = new HRMEntity<standard_work_time>(context),
                _workTimeForEmployeeRepo = new HRMEntity<standard_work_time_for_employee>(context)
            };

            _contractService = new ContractBll
            {
                _contractRepo = new HRMEntity<contract>(context),
                _restrictProductsRepo = new HRMEntity<n_restrict_product>(context)
            };

            _planService = new PlanBll
            {
                _planRepo = new HRMEntity<plan>(context),
                _planActivitiesRepo = new HRMEntity<plan_activities>(context),
                _planForEmployeeRepo = new HRMEntity<plan_for_employee>(context)
            };

            _applicationService = new ApplicationBll
            {
                _applicationRepo = new HRMEntity<applicant>(context),
                _departmentRepo = new HRMEntity<department>(context),
                _titleRepo = new HRMEntity<title>(context),
                _titleRecruitRepo = new HRMEntity<title_recruit>(context),
                _employeeRepo = new HRMEntity<employee>(context)
            };


            _expenseService = new ExpenseBll
            {
                _productRepo = new HRMEntity<product>(context),
                _expenseRepo = new HRMEntity<expense>(context),
                _reportRepo = new HRMEntity<expense_report>(context),
                _expenseInReportRepo = new HRMEntity<expenses_in_report>(context)
            };

            _extraWorkTimeService = new ExtraWorkTimeBll
            {
                _extraTimeRepo = new HRMEntity<n_extra_work_time>(context)
            };

            _contractProductService = new ContractProductBll
            {
                _contractProductRepo = new HRMEntity<n_product>(context),
            };

            _payrollService = new PayrollBll
            {
                _contractRepo = new HRMEntity<contract>(context),
                _restrictProductsRepo = new HRMEntity<n_restrict_product>(context),
                _absenceRepo = new HRMEntity<n_absence>(context),
                _extraWorkTimeRepo = new HRMEntity<n_extra_work_time>(context),
                _holidayRepo = new HRMEntity<n_holiday>(context),
                _numberProductRepo = new HRMEntity<n_number_product>(context),
                _productRepo = new HRMEntity<n_product>(context),
                _employeeRepo = new HRMEntity<employee>(context),
                _standardWorkTimeRepo = new HRMEntity<standard_work_time>(context),
                _standardWorkTimeForEmpRepo = new HRMEntity<standard_work_time_for_employee>(context)
            };
        }

        public DepartmentBll _departmentService;

        public TitleDll _titleService;

        public EmployeeDll _employeeService;

        public StandardWorkTimeBll _workTimeService;

        public ContractBll _contractService;

        public PlanBll _planService;

        public ApplicationBll _applicationService;

        public ExpenseBll _expenseService;

        public ExtraWorkTimeBll _extraWorkTimeService;

        public ContractProductBll _contractProductService;

        public PayrollBll _payrollService;
    }
}
