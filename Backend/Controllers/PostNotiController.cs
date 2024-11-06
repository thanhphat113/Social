using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Namespace
{
	[Route("api/[controller]")]
	[ApiController]
	public class PostNotiController : ControllerBase
	{
		private readonly PostNotiService _service;
		public PostNotiController(PostNotiService service)
		{
			_service = service;
		}

		[HttpGet("findbyid")]
		public async Task<ActionResult> GetByUserId([FromQuery] int userid)
		{
			var results = await _service.FindByUserId(userid);
			return Ok(results);
		}

		[HttpGet("{id}")]
		public ActionResult<string> Get(int id)
		{
			return "value";
		}

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