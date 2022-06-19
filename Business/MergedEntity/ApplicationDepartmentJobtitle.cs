using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.MergedEntity
{
    public class ApplicationDepartmentJobtitle
    {
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string department { get; set; }
        public string department_id { get; set; }
        public string title { get; set; }
        public string title_id { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string degree { get; set; }
        public string college { get; set; }
        public Nullable<double> require_wage { get; set; }
        public string interview_date { get; set; }
        public string interviewer_id { get; set; }
        public Nullable<sbyte> status { get; set; }
        public Nullable<double> ultimate_wage { get; set; }
        public string id { get; set; }
    }
}
