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

    public partial class time_off
    {
        [Key]
        [Column(Order = 1)]
        public string employee_id { get; set; }

        [Key]
        [Column(Order = 2)]
        public sbyte month { get; set; }

        [Key]
        [Column(Order = 3)]
        public short year { get; set; }
        public sbyte timeoff_type_id { get; set; }
        public Nullable<sbyte> number { get; set; }
    }
}
