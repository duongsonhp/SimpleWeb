using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM.Models
{
    public class ContractProductModel
    {
        public string id { get; set; }
        public string name { get; set; }
        public Nullable<double> value { get; set; }
    }
}