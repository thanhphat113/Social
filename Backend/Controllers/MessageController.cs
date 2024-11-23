using Backend.DTO;
using Backend.Helper;
using Backend.Models;
using Backend.Services;
using Backend.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class MessageController : ControllerBase
	{
		private readonly MessageService _mess;
		private readonly MainTopicService _main;

		public MessageController(MessageService mess, MainTopicService main)
		{
			_main = main;
			_mess = mess;
		}


		[HttpGet]
		public async Task<IActionResult> Get([FromQuery] int id)
		{
			var UserId = MiddleWare.GetUserIdFromCookie(Request);
			var result = await _mess.FindBy2User(UserId, id);
			return Ok(result);
		}

		[HttpPost]
		public void Post([FromBody] string value)
		{
		}

		[HttpPut("topic")]
		public async Task<IActionResult> Put([FromBody] UpdateTopic value)
		{
			var result = await _mess.UpdateTopic(value.MessageId, value.TopicId);
			if (result)
			{
				var item = await _mess.GetById(value.MessageId);
				item.MainTopicNavigation = await _main.GetById((int)item.MainTopic);
				return Ok(item);
			}
			return Ok(null);
		}

		[HttpPut("nickname")]
		public async Task<IActionResult> PutNickName([FromBody] UpdateNickname value)
		{
			Console.WriteLine("Ay dô: " + value.Nickname1 + value.Nickname2);
			var UserId = MiddleWare.GetUserIdFromCookie(Request);
			var result = await _mess.UpdateNickName(value.MessageId, UserId, value.Nickname1, value.Nickname2);
			if (result)
			{
				var item = await _mess.GetById(value.MessageId);
				item.MainTopicNavigation = await _main.GetById((int)item.MainTopic);
				return Ok(item);
			}
			return Ok(null);
		}

		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}