using Backend.DTO;
using Backend.Helper;
using Backend.RealTime;
using Backend.Services;
using Backend.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Backend.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class MessageController : ControllerBase
	{
		private readonly IMessageService _mess;
		private readonly MainTopicService _main;
		private readonly IHubContext<OnlineHub> _hub;

		public MessageController(IHubContext<OnlineHub> hub, IMessageService mess, MainTopicService main)
		{
			_main = main;
			_hub = hub;
			_mess = mess;
		}


		[HttpGet]
		public async Task<IActionResult> Get([FromQuery] int id)
		{
			var UserId = MiddleWare.GetUserIdFromCookie(Request);
			var result = await _mess.FindBy2User(UserId, id);
			return Ok(result);
		}


		[HttpPut("topic")]
		public async Task<IActionResult> Put([FromBody] UpdateTopic value)
		{
			var UserId = MiddleWare.GetUserIdFromCookie(Request);
			var result = await _mess.UpdateTopic(value.MessageId, value.TopicId, UserId);
			var message = await _mess.GetById(value.MessageId);
			var ReceiveId = UserId == message.User1 ? message.User2 : message.User1;
			Console.WriteLine("Đây là id nhận: " + ReceiveId);

			var MainTopic = await _main.GetById(value.TopicId);

			if (OnlineHub.IsOnline(ReceiveId))
			{
				var connectionId = OnlineHub.UserIdConnections[ReceiveId];
				await _hub.Clients.Client(connectionId).SendAsync("ReceiveMessage", result);
				await _hub.Clients.Client(connectionId).SendAsync("ReceiveTopic", MainTopic, UserId);
			}

			return Ok(new { result, MainTopic });
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