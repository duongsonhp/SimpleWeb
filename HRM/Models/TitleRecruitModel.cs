using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM.Models
{
    public class TitleRecruitModel
    {
        public string department_id { get; set; }

        public string department { get; set; }

        public string title_id { get; set; }

        public string title { get; set; }

        public string recruiter_id { get; set; }

        public string recruiter_name { get; set; }

        public int slot { get; set; }
    }
}