using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.MergedEntity
{
    public class Expense
    {
        public string product_id { get; set; }

        public string product_name { get; set; }

        public Nullable<double> price_per_item { get; set; }
        public string unit { get; set; }
        public Nullable<int> quantity { get; set; }
        public Nullable<double> total_value { get; set; }

        public string expense_date { get; set; }

        public string employee_id { get; set; }
        public string id { get; set; }
    }
}
