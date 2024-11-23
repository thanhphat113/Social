using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class MainTopicController : ControllerBase
	{
		private readonly IService<MainTopic> _topic;
		public MainTopicController(IService<MainTopic> topic)
		{
			_topic = topic;
		}

		[HttpGet]
		public async Task<IActionResult> Get()
		{
			return Ok(await _topic.GetAll());
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