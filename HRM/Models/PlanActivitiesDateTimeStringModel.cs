﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM.Models
{
    public class PlanActivitiesDateTimeStringModel
    {
        public string plan_id { get; set; }

        public string job_name { get; set; }
        public sbyte conduct_role_id { get; set; }
        public string deadline { get; set; }
    }
}