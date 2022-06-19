using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Business;
using DataAccess;

namespace HRM.Controllers
{
    public class StandardWorkTimeController : ExtendController
    {
        // GET: StandardWorkTime
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult RenderListStandardWorkTime()
        {
            var workTimes = new List<standard_work_time>();
            using (context)
            {
                workTimes = _workTimeService.GetWorkTimes();
            }

            if (workTimes.Count() != 0)
                return Json(workTimes, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateStandardWorkTime(string id, int amount_time, string unit, string period)
        {
            var standardWorkTime = new standard_work_time();
            var existStandartWorkTime = _workTimeService.Get(id);
            var success = false;

            using (context)
            {
                if (existStandartWorkTime != null)
                {
                    existStandartWorkTime.amount_time = Convert.ToSByte(amount_time);
                    existStandartWorkTime.unit = unit;
                    existStandartWorkTime.period = period;
                    success = _workTimeService.UpdateStandardWorkTime(existStandartWorkTime);
                }
                else
                {
                    standardWorkTime.id = _toolGenId.ConvertToId(id, 4);
                    standardWorkTime.amount_time = Convert.ToSByte(amount_time);
                    standardWorkTime.unit = unit;
                    standardWorkTime.period = period;
                    success = _workTimeService.CreateStandardWorkTime(standardWorkTime);
                }
            }
            return Json(new { success = success}, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult RemoveStandardWorkTime(string id)
        {
            var success = false;
            using (context)
            {
                success = _workTimeService.RemoveStandardWorkTime(id);
            }
            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }
    }
}