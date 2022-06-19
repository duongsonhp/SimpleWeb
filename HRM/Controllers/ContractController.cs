using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataAccess;
using Business;
using Business.MergedEntity;
using HRM.Models;

namespace HRM.Controllers
{
    public class ContractController : ExtendController
    {
        // GET: Contract
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Product()
        {
            return View();
        }

        public ActionResult RestrictProduct()
        {
            return View();
        }

        [HttpPost]
        public JsonResult SaveProduct(ContractProductModel added)
        {
            var success = false;
            var add = new n_product();
            using (context)
            {
                add.name = added.name;
                add.value = added.value;

                var existedId = _contractProductService.GetProducts().Select(e => e.id);
                if (existedId != null)
                {
                    if (existedId.Count() != 0)
                    {
                        do
                        {
                            add.id = _toolGenId.GenerateId(6).ToString();
                        }
                        while (existedId.Any(e => e.Equals(add.id, StringComparison.OrdinalIgnoreCase)));
                    }
                    else
                    {
                        add.id = _toolGenId.GenerateId(6).ToString();
                    }
                }
                else
                {
                    add.id = _toolGenId.GenerateId(6).ToString();
                }

                success = _contractProductService.CreateProduct(add);
            }

            return Json(new { success = success, new_id = add.id }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateProduct(ContractProductModel updated)
        {
            var success = false;
            using (context)
            {
                // var updated = new employee();
                var update = _contractProductService.GetProduct(updated.id);
                update.value = updated.value;

                success = _contractProductService.UpdateProduct(update);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult RenderProducts()
        {
            var products = new List<n_product>();
            using (context)
            {
                products = _contractProductService.GetProducts();
            }

            if (products.Count() != 0)
                return Json(products, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult RemoveProduct(string productId)
        {
            var success = false;
            using (context)
            {
                var existed = _contractProductService.GetProduct(productId);

                success = _contractProductService.RemoveProduct(existed);
            }

            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }
    }
}