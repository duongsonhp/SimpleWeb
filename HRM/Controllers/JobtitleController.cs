using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Business;
using DataAccess;
using Business.MergedEntity;
using HRM.Models;

namespace HRM.Controllers
{
    public class JobtitleController : ExtendController
    {
        // GET: Jobtitle
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult RenderTitles()
        {
            var titles = new List<title>();
            using (context)
            {
                titles = _titleService.GetTitles();
            }

            if (titles.Count() != 0)
                return Json(titles, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateTitle(TitleModel updated)
        {
            var success = false;
            using (context)
            {
                // var updated = new employee();
                var update = _titleService.GetTitleById(updated.title_id);
                update.title_name = updated.title_name;

                success = _titleService.UpdateTitle(update);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveTitle(TitleModel added)
        {
            var success = false;
            var add = new title();
            using (context)
            {
                add.title_name = added.title_name;

                var existedId = _titleService.GetTitles().Select(e => e.title_id);
                if (existedId != null)
                {
                    if (existedId.Count() != 0)
                    {
                        do
                        {
                            add.title_id = Guid.NewGuid().ToString();
                        }
                        while (existedId.Any(e => e.Equals(add.title_id, StringComparison.OrdinalIgnoreCase)));
                    }
                    else
                    {
                        add.title_id = Guid.NewGuid().ToString();
                    }
                }
                else
                {
                    add.title_id = Guid.NewGuid().ToString();
                }

                success = _titleService.CreateTitle(add);
            }

            return Json(new { success = success, new_id = add.title_id }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult RemoveTitle(string titleId)
        {
            var success = false;
            using (context)
            {
                var existed = _titleService.GetTitleById(titleId);

                success = _titleService.RemoveTitle(existed);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }
    }
}