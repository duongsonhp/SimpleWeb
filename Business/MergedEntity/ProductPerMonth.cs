using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.MergedEntity
{
    public class ProductPerMonth
    {
        public string start_date { get; set; }
        public string end_date { get; set; }
        public Nullable<int> number_product { get; set; }
        public string product_id { get; set; }
        public string product_name { get; set; }
        public string employee_id { get; set; }
        public string employee_name { get; set; }
        public double price { get; set; }
    }
}
