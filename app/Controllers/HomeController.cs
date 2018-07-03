using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace app.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> Schema()
        {
            Assembly assembly = Assembly.GetExecutingAssembly();
            using (StreamReader schemaReader = new StreamReader(assembly.GetManifestResourceStream("app.Assets.Json.input-schema.json")))
            {
                string schema = await schemaReader.ReadToEndAsync();
                return Ok(schema);
            }
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}
