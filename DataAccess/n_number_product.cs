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

    public partial class n_number_product
    {
        [Key]
        [Column(Order = 1)]
        public System.DateTime start_date { get; set; }

        [Key]
        [Column(Order = 2)]
        public System.DateTime end_date { get; set; }
        public Nullable<int> number_product { get; set; }

        [Key]
        [Column(Order = 4)]
        public string product_id { get; set; }

        [Key]
        [Column(Order = 3)]
        public string employee_id { get; set; }
    }
}
