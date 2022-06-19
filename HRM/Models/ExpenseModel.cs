using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM.Models
{
    public class ExpenseModel
    {
        public string product { get; set; }

        public string unit { get; set; }
        public int quantity { get; set; }

        public DateTime expense_date { get; set; }
    }
}