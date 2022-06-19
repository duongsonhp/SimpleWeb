using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess;

namespace Business.MergedEntity
{
    public class Payroll
    {
        public string id { get; set; }
        public string name { get; set; }
        public sbyte payroll_type { get; set; }
        public sbyte period_type { get; set; }
        public bool require_educate { get; set; }
        public double require_wage { get; set; }
        // public DateTime payroll_period { get; set; }
        public DateTime payroll_period { get; set; }
        public int standard_work_time { get; set; }
        public int real_work_day { get; set; } // Số ngày làm việc thực tế
        public int extra_weekday { get; set; } // Số giờ làm thêm vào ngày thường
        public int extra_weekend { get; set; } // Số giờ làm thêm vào ngày cuối tuần
        public int extra_holiday { get; set; } // Số giờ làm thêm vào ngày lễ tết
        public int completed_product_price { get; set; } // Tổng giá trị số sản phẩm hoàn thành
        public int restrict_product { get; set; } // Số sản phẩm khoán
        public int completed_restrict_product { get; set; }
        // public double price_per_product { get; set; } // Đơn giá một sản phẩm
        public double total { get; set; }
        public int absences { get; set; }
        public int normalExtraHours { get; set; }
        public int weekendExtraHours { get; set; }
        public int holidayExtraHours { get; set; }
        public List<Product> listProducts { get; set; }
    }
}
