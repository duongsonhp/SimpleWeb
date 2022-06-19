using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.MergedEntity
{
    public class Report
    {
        public string report_id { get; set; }
        public string report_name { get; set; }
        public string approve_man_id { get; set; }
        public string pay_man_id { get; set; }
        public Nullable<sbyte> status { get; set; }
        public string employee_id { get; set; }
        public List<string> expenses { get; set; }
    }
}
