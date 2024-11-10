using Backend.Services;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class ChatInMessageController : ControllerBase
	{
		private readonly ChatInMessageService _mess;
		private readonly MessageService _message;
		private readonly UserService _userContext;

		public ChatInMessageController(UserService userContext, ChatInMessageService chat, MessageService message)
		{
			_userContext = userContext;
			_mess = chat;
			_message = message;
		}

		[HttpGet]
		public async Task<IActionResult> Get([FromQuery] int user1, [FromQuery] int user2)
		{
			return Ok(await _mess.GetMessage(user1, user2));
		}

		[HttpGet("{id}")]
		public ActionResult<string> Get(int id)
		{
			return "value";
		}

		[HttpPost]
		public async Task<IActionResult> Post([FromBody] ChatInMessage mess)
		{
			Console.WriteLine($"Received otheruser: {mess.Otheruser}");
			Console.WriteLine($"Received userid: {mess.FromUser}");
			Console.WriteLine($"Received MessagesId: {mess.MessagesId}");

			if (mess.MessagesId == -1)
			{
				var item = await _message.Add(new() { User1 = mess.FromUser, User2 = mess.Otheruser });
				if (item == null) return BadRequest("Lỗi việc tạo chat mới");
				mess.MessagesId = item.MessagesId;
			}

			var result = await _mess.Add(mess);

			if (result == null)
				return BadRequest("Lỗi việc tạo tin nhắn mới");

			return Ok(result);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> Put(int id)
		{
			var UserId = GetCookie.GetUserIdFromCookie(Request);
			if (!await _mess.ReadMess(id)) return BadRequest("Không thể thực hiện tác vụ");

			var friends = await _userContext.GetFriends(UserId);
			return Ok(friends);
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			var UserId = GetCookie.GetUserIdFromCookie(Request);
			return Ok(await _mess.Delete(id));
		}
	}
}