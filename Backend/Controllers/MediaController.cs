using System.Security.Cryptography;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class MediaController : ControllerBase
	{
		private readonly MediaService _media;
		private readonly IWebHostEnvironment _env;

		public MediaController(MediaService media, IWebHostEnvironment env)
		{
			_env = env;
			_media = media;
		}
		[HttpGet]
		public async Task<IActionResult> Get([FromQuery] int MessageId, string? Type = "media")
		{
			return Ok(await _media.FindByMessageId(MessageId, Type));
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