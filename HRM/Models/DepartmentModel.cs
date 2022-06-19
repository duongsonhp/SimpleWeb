using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM.Models
{
    public class DepartmentModel
    {
        public string department_id { get; set; }
        public string department_name { get; set; }
        public string manager_id { get; set; }
        public string parent_id { get; set; }
    }
}