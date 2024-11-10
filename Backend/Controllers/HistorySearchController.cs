using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class HistorySearchController : ControllerBase
	{
		private readonly HistorySearchService _service;
		public HistorySearchController(HistorySearchService service)
		{
			_service = service;
		}

		[HttpGet]
		public async Task<ActionResult> Get([FromQuery] int userid)
		{
			var result = await _service.GetHistorySearchByUserId(userid);
			return Ok(result);
		}


		[HttpPost]
		public async Task<ActionResult> Post([FromBody] HistorySearch value)
		{
			var userId = GetCookie.GetUserIdFromCookie(Request);
			if (await _service.Add(value) != null)
			{
				return await Get(userId);
			}
			return null;
		}

		[HttpPut("{id}")]
		public async Task<ActionResult> Put(int id)
		{
			var userId = GetCookie.GetUserIdFromCookie(Request);
			Console.WriteLine("Id là:" + id);
			if (await _service.UpdateTime(id))
			{
				return await Get(userId);
			}
			return null;
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult> Delete(int id)
		{
			var userId = GetCookie.GetUserIdFromCookie(Request);
			if (await _service.Delete(id))
			{
				return await Get(userId);
			}
			return null;
		}
	}
}