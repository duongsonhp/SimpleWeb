using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM.Tools
{
    public class GenId
    {
        public string GenEmployeeId()
        {
            var random = new Random();
            var suffEmployeeId = new sbyte[5] { 0, 0, 0, 0, 0 };
            for (var i = 0; i < 5; ++i)
            {
                suffEmployeeId[i] = Convert.ToSByte(random.Next(0, 9));
            }
            return $"BK{string.Join("", suffEmployeeId)}";
        }

        public string GenWorkTimeForEmpId()
        {
            var random = new Random();
            var suffEmployeeId = new sbyte[6] { 0, 0, 0, 0, 0, 0 };
            for (var i = 0; i < 6; ++i)
            {
                suffEmployeeId[i] = Convert.ToSByte(random.Next(0, 9));
            }
            return $"{string.Join("", suffEmployeeId)}";
        }

        public string GenerateId(sbyte max)
        {
            var random = new Random();
            var suffEmployeeId = new List<int>();
            for (var i = 0; i < max; ++i)
            {
                suffEmployeeId.Add(Convert.ToSByte(random.Next(0, 9)));
            }
            return $"{string.Join("", suffEmployeeId)}";
        }

        public string ConvertToId(string value, int maxLength)
        {
            if(value.Length < maxLength)
            {
                var number0Prefix = maxLength - value.Length;
                for(var i = 0; i < number0Prefix; ++i)
                {
                    value = $"0{value}";
                }
            }
            return value;
        }
    }
}