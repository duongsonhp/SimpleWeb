using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM.Models
{
    public class ProductPerMonthModel
    {
        public DateTime start_date { get; set; }
        public DateTime end_date { get; set; }
        public Nullable<int> number_product { get; set; }
        public string product_id { get; set; }
        public string product_name { get; set; }
        public string employee_id { get; set; }
        public string employee_name { get; set; }
    }
}