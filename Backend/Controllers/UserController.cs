using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Backend.Repositories;
using Backend.Models;

namespace Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly IRepositories<User> __UserContext;

		public UserController(IRepositories<User> UserContext){
			__UserContext = UserContext;
		}
		[HttpGet]
		public async Task<IActionResult> Get()
		{
			return Ok(await __UserContext.GetAll());
		}

		// [HttpGet("{id}")]
		// public ActionResult<string> Get(int id)
		// {
		// 	return "value";
		// }

		[HttpPost]
		public void Post([FromBody] string value)
		{
		}

		[HttpPut("{id}")]
		public void Put(int id, [FromBody] string value)
		{
		}

		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}