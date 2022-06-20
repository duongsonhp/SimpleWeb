using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
// using HRM.Models;
using DataAccess;
using DataAccess.MySQLEntities;
using Business;
using Business.MergedEntity;
using HRM.Models;
using System.IO;

namespace HRM.Controllers
{
    public class InformationController : Controller
    {
        //public InformationController() : base()
        //{

        //}

        Business.ArticlesBll articleService = new ArticlesBll();

        #region Action
        public ActionResult Index()
        {
            List<article> listArticles = articleService.GetArticlesOrderByTime();
            var listNews = new List<NewsModel>();
            listArticles.ForEach((article _article) =>
            {
                listNews.Add(new NewsModel
                {
                    id = _article.id,
                    title = _article.title,
                    thumbnail = _article.thumbnail,
                    brief = _article.brief,
                    content = _article.content
                });
            });
            return View("/Views/Employee/Index.cshtml", listNews);
        }

        public ActionResult Update(UpdateModel model)
        {
            var _article = new article();
            _article.id = model.id;
            _article.title = model.title;
            _article.brief = model.brief;
            _article.content = model.content;
            _article.datecreated = DateTime.Now;
            if (model.thumbnail != null)
            {
                var timestamp = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString();
                var extension = Path.GetExtension(model.thumbnail.FileName);
                var fileName = $"{timestamp}{extension}";
                string pic = System.IO.Path.GetFileName(fileName);
                string path = System.IO.Path.Combine(
                                       Server.MapPath("~/Store/Pics/ThumbnailImage"), pic);
                // file is uploaded
                
                model.thumbnail.SaveAs(path);

                // save the image path path to the database or you can send image 
                // directly to database
                // in-case if you want to store byte[] ie. for DB
                using (MemoryStream ms = new MemoryStream())
                {
                    model.thumbnail.InputStream.CopyTo(ms);
                    byte[] array = ms.GetBuffer();
                }
                _article.thumbnail = fileName;
            }
            articleService.UpdateArticle(_article);
            return RedirectToAction("Index");
        }

        public ActionResult Create(UpdateModel model)
        {
            var _article = new article(); //
            _article.title = model.title;
            _article.brief = model.brief;
            _article.content = model.content;
            _article.datecreated = DateTime.Now;
            if (model.thumbnail != null)
            {
                var timestamp = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString();
                var extension = Path.GetExtension(model.thumbnail.FileName);
                var fileName = $"{timestamp}{extension}";
                string pic = System.IO.Path.GetFileName(fileName);
                string path = System.IO.Path.Combine(
                                       Server.MapPath("~/Store/Pics/ThumbnailImage"), pic);
                // file is uploaded

                model.thumbnail.SaveAs(path);

                // save the image path path to the database or you can send image 
                // directly to database
                // in-case if you want to store byte[] ie. for DB
                using (MemoryStream ms = new MemoryStream())
                {
                    model.thumbnail.InputStream.CopyTo(ms);
                    byte[] array = ms.GetBuffer();
                }
                _article.thumbnail = fileName;
            }
            articleService.InsertArticle(_article);
            return RedirectToAction("Index");
        }
        #endregion

        #region Hàm trả về json
        public JsonResult GetArticle(int id)
        {
            article result = articleService.GetArticle(id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult RemoveArticle(int id)
        {
            articleService.RemoveArticle(id);
            return Json(new { }, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}