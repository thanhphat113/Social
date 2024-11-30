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
			var UserId = MiddleWare.GetUserIdFromCookie(Request);
			var result = await _mess.UpdateNickName(value.MessageId, UserId, value.Nickname1, value.Nickname2);

			var ReceiveId = await _mess.GetOtherUserIdInMessage(value.MessageId, UserId);

			var message = await _mess.GetById(value.MessageId);
			message.MainTopicNavigation = await _main.GetById((int)message.MainTopic);

			if (OnlineHub.IsOnline(ReceiveId))
			{
				var connectionId = OnlineHub.UserIdConnections[ReceiveId];
				await _hub.Clients.Client(connectionId).SendAsync("ReceiveMessage", result);
				await _hub.Clients.Client(connectionId).SendAsync("ReceiveNickName", UserId, message);
			}

			return Ok(new { result, message });
		}

		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}