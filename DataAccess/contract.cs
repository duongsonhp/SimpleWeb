//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DataAccess
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class contract
    {
        public string id { get; set; }
        [Key]
        [Column(Order = 1)]
        public string employee_id { get; set; }

        [Key]
        [Column(Order = 2)]
        public System.DateTime start_date { get; set; }

        [Key]
        [Column(Order = 3)]
        public System.DateTime end_date { get; set; }
        public string standard_work_time_for_employee_id { get; set; }
        public Nullable<double> wage { get; set; }
        public string unit { get; set; }
        public Nullable<sbyte> status { get; set; }
        public Nullable<int> restrict_product_number { get; set; }
        public Nullable<bool> require_educate { get; set; }
        public Nullable<sbyte> period_type { get; set; }
        public Nullable<sbyte> payroll_type { get; set; }
    }
}
