using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.ToolsBll
{
    public class ToolGetByCode
    {
        public string GetMaterialStatus(int id)
        {
            switch (id)
            {
                case 1:
                    {
                        return "Độc thân";
                    }
                default:
                    {
                        return "Đã kết hôn";
                    }
            }
        }

        public string GetDegree(int id)
        {
            switch (id)
            {
                case 1:
                    {
                        return "Tốt nghiệp THCS";
                    }
                case 2:
                    {
                        return "Tốt nghiệp THPT";
                    }
                case 3:
                    {
                        return "Cử nhân";
                    }
                case 4:
                    {
                        return "Kĩ sư";
                    }
                case 5:
                    {
                        return "Tốt nghiệp trung cấp";
                    }
                case 6:
                    {
                        return "Tốt nghiệp cao đẳng";
                    }
                case 7:
                    {
                        return "Cử nhân thực hành";
                    }
                case 8:
                    {
                        return "Kĩ sư thực hành";
                    }
                default:
                    {
                        return "Tốt nghiệp trường nghê";
                    }
            }
        }
    }
}
