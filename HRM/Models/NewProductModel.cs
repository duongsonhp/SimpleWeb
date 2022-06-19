using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM.Models
{
    public class NewProductModel
    {
        public string id { get; set; }
        public string product_name { get; set; }
        public double proposed_price { get; set; }
        public string unit_1 { get; set; }
        public double sale_price { get; set; }
        public string unit_2 { get; set; }
        public string prefix_code { get; set; }
        public sbyte vendor_tax { get; set; }
        public sbyte customer_tax { get; set; }
    }
}