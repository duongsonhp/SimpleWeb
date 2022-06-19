using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.MergedEntity
{
    public class Product
    {
        public string id { get; set; }
        public string name { get; set; }
        public Nullable<double> value { get; set; }
        public int quantity { get; set; }
    }
}
