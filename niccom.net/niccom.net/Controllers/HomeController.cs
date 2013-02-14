using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using niccom.net.Models;
using niccom.net.Models.db;

namespace niccom.net.Controllers
{
    public class HomeController : Controller
    {
        NiccomContext db = new NiccomContext();

        public ActionResult Index(string returnUrl)
        {
            var tabs = db.Tabs.ToList();
            ViewBag.ReturnUrl = returnUrl;
            return View(tabs);
        }
    }
}