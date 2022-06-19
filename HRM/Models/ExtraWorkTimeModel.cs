using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM.Models
{
    public class ExtraWorkTimeModel
    {
        public string employee_id { get; set; }
        public System.DateTime work_date { get; set; }
        public Nullable<System.TimeSpan> from { get; set; }
        public Nullable<System.TimeSpan> to { get; set; }
    }
}