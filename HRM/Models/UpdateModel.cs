using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRM.Models
{
    public class UpdateModel
    {
        public int id { get; set; }

        public string title { get; set; }

        public HttpPostedFileBase thumbnail { get; set; }

        public string content { get; set; }

        public string brief { get; set; }
    }
}