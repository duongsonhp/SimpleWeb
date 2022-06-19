using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.MergedEntity
{
    public class Contract
    {
        public string id { get; set; }
        public string employee_id { get; set; }
        public System.DateTime start_date { get; set; }
        public System.DateTime end_date { get; set; }
        public string standard_work_time_for_employee_id { get; set; }
        public Nullable<double> wage { get; set; }
        public string unit { get; set; }
        public Nullable<sbyte> status { get; set; }
        public Nullable<int> restrict_product_number { get; set; }
        public Nullable<bool> require_educate { get; set; }
        public Nullable<sbyte> period_type { get; set; }
        public Nullable<sbyte> payroll_type { get; set; }
        public Nullable<int> number_product { get; set; }
    }
}
