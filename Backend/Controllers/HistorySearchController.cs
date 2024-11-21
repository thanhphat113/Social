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
		public async Task<ActionResult> GetById()
		{
			var UserId = GetCookie.GetUserIdFromCookie(Request);
			return Ok(await _service.GetHistorySearchByUserId(UserId));
		}


		[HttpPost]
		public async Task<ActionResult> Post([FromBody] HistorySearch value)
		{
			var UserId = GetCookie.GetUserIdFromCookie(Request);
			value.FromUserId = UserId;
			Console.WriteLine("Đây là đối tượng: " + value.OtherUserId + " " + value.FromUserId);
			return Ok(await _service.Add(value));
		}

		[HttpPut("{OtherUserId}")]
		public async Task<ActionResult> Put(int OtherUserId)
		{
			var UserId = GetCookie.GetUserIdFromCookie(Request);
			return Ok(await _service.UpdateTime(UserId, OtherUserId));
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult> Delete(int id)
		{
			var userId = GetCookie.GetUserIdFromCookie(Request);
			return Ok(await _service.Delete(id));
		}
	}
}