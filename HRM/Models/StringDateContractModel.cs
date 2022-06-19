using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM.Models
{
    public class StringDateContractModel
    {
        public string id { get; set; }

        public string employee_id { get; set; }

        public string start_date { get; set; }

        public string end_date { get; set; }

        public double wage { get; set; }
        public string unit { get; set; }
        public sbyte status { get; set; }

        public Nullable<int> restrict_product_number { get; set; }
        public Nullable<bool> require_educate { get; set; }
        public Nullable<sbyte> period_type { get; set; }
        public Nullable<sbyte> payroll_type { get; set; }
        public Nullable<int> number_product { get; set; }
    }
}