using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Business;
using DataAccess;
using HRM.Models;
using Business.MergedEntity;

namespace HRM.Controllers
{
    public class PlanController : ExtendController
    {
        // GET: Plan
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult RenderPlans()
        {
            var plans = new List<plan>();
            using (context)
            {
                plans = _planService.GetPlans();
            }

            if (plans.Count() != 0)
                return Json(plans, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult RenderPlansForEmployee(string empId)
        {
            var plans = new List<PlanEmployee>();
            using (context)
            {
                plans = _planService.GetPlans(empId);
            }

            if (plans.Count() != 0)
                return Json(plans, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetActivities(string planId)
        {
            var activities = new List<plan_activities>();
            var result = new List<PlanActivitiesDateTimeStringModel>();
            using (context)
            {
                activities = _planService.GetPlanActivities(planId);
            }

            activities.ForEach(delegate (plan_activities pl)
            {
                result.Add(new PlanActivitiesDateTimeStringModel
                {
                    plan_id = pl.plan_id,
                    job_name = pl.job_name,
                    conduct_role_id = pl.conduct_role_id.Value,
                    deadline = pl.deadline.Value.ToShortDateString()
                });
            });

            if (result.Count() != 0)
                return Json(result, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateActivitiesForPlan(List<PlanActivitiesModel> updated, List<PlanActivitiesModel> created)
        {
            var success = false;
            var updates = new List<plan_activities>();
            var creates = new List<plan_activities>();
            using (context)
            {
                foreach(var update in updated)
                {
                    var existed = _planService.GetPlanActivities(update.plan_id, update.job_name.Trim());
                    existed.conduct_role_id = update.conduct_role_id;
                    existed.deadline = update.deadline;
                    updates.Add(existed);
                }

                foreach (var create in created)
                {
                    var add = new plan_activities
                    {
                        job_name = create.job_name,
                        conduct_role_id = create.conduct_role_id,
                        deadline = create.deadline,
                        plan_id = create.plan_id
                    };
                    creates.Add(add);
                }

                success = _planService.CreateActivities(creates);
                success = _planService.UpdateActivities(updates);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CreatePlan(PlanModel plan, List<PlanActivitiesModel> activities)
        {
            var success = false;
            var newPlan = new plan();
            var newActivities = new List<plan_activities>();
            using (context)
            {
                newPlan.plan_name = plan.plan_name;
                var existedId = _planService.GetPlans().Select(e => e.id);
                if (existedId != null)
                {
                    if (existedId.Count() != 0)
                    {
                        do
                        {
                            newPlan.id = _toolGenId.GenerateId(4);
                        }
                        while (existedId.Any(e => e.Equals(newPlan.id, StringComparison.OrdinalIgnoreCase)));
                    }
                    else
                    {
                        newPlan.id = _toolGenId.GenerateId(4);
                    }
                }
                else
                {
                    newPlan.id = _toolGenId.GenerateId(4);
                }

                success = _planService.CreatePlan(newPlan);

                foreach (var activity in activities)
                {
                    var created = new plan_activities
                    {
                        job_name = activity.job_name,
                        conduct_role_id = activity.conduct_role_id,
                        deadline = activity.deadline,
                        plan_id = newPlan.id
                    };
                    newActivities.Add(created);
                }

                success = _planService.CreateActivities(newActivities);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult RemoveActivityForPlan(string planId, string jobName)
        {
            var success = false;
            using (context)
            {
                var existed = _planService.GetPlanActivities(planId, jobName.Trim());

                success = _planService.RemoveActivity(existed);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult RemovePlan(string planId)
        {
            var success = false;
            using (context)
            {
                var existed = _planService.GetPlan(planId);

                success = _planService.RemovePlan(existed);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }
    }
}