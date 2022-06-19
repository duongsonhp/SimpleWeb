using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.MergedEntity
{
    public class StandardWorkTimeEmployee
    {
        public string id { get; set; }

        public string standard_work_time_id { get; set; }

        public string employee_id { get; set; }

        public sbyte month { get; set; }

        public int amount_time { get; set; }

        public string unit { get; set; }

        public string period { get; set; }
    }
}
