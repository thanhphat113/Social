using Backend.Services;
using Backend.Services.Interface;
using Backend.Models;
using Backend.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Backend.RealTime;

namespace Backend.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class ChatInMessageController : ControllerBase
	{
		private readonly IChatInMessService _chat;
		private readonly IHubContext<OnlineHub> _Hub;
		private readonly IWebHostEnvironment _env;

		private readonly IMessageService _message;
		private readonly MediaService _media;
		private readonly IUserService _userContext;

		public ChatInMessageController(IHubContext<OnlineHub> Hub, MediaService media, IWebHostEnvironment env, IUserService userContext, IChatInMessService chat, IMessageService message)
		{
			_media = media;
			_env = env;
			_Hub = Hub;
			_userContext = userContext;
			_chat = chat;
			_message = message;
		}

		[HttpPost("chat-with-file")]
		public async Task<IActionResult> PostFile([FromForm] RequestPostFile data)
		{
			var UserId = MiddleWare.GetUserIdFromCookie(Request);

			var chat = new ChatInMessage
			{
				MessagesId = data.MessageId,
				FromUser = UserId,
				Otheruser = data.OtheruserId
			};

			string uploadsFolder;
			if (data.FileType == 1 || data.FileType == 2)
			{
				uploadsFolder = Path.Combine(_env.WebRootPath, "media");
			}
			else
			{
				uploadsFolder = Path.Combine(_env.WebRootPath, "file");
			}

			var fileHash = await MiddleWare.GetFileHashAsync(data.File);


			var filePath = Path.Combine(uploadsFolder, data.File.FileName);


			var item = await _media.IsHas(fileHash);

			string newName = data.File.FileName;
			if (item == -1)
			{
				if (System.IO.File.Exists(filePath))
				{
					var fileExtension = Path.GetExtension(data.File.FileName);
					newName = Guid.NewGuid().ToString() + fileExtension;
					filePath = Path.Combine(uploadsFolder, newName);
				}
				using var stream = new FileStream(filePath, FileMode.Create);
				await data.File.CopyToAsync(stream);
			}


			var media = new Media
			{
				Src = newName,
				MediaType = data.FileType,
				HashCode = fileHash
			};

			var result = await _chat.AddWithMedia(media, data.FileType, chat);

			var ConnectionId = OnlineHub.GetConnectionId(data.OtheruserId);
			if (ConnectionId != null) await _Hub.Clients.Client(ConnectionId).SendAsync("ReceiveMessage", result);

			return Ok(result);
		}

		[HttpPost]
		public async Task<IActionResult> Post([FromBody] ChatInMessage mess)
		{
			var result = await _chat.Add(mess);

			if (result == null) return BadRequest("Lỗi việc tạo tin nhắn mới");

			if (OnlineHub.IsOnline(mess.Otheruser))
			{
				var connectionId = OnlineHub.UserIdConnections[mess.Otheruser];
				Console.WriteLine("đây là: " + connectionId);
				Console.WriteLine(result.ChatId + " " + result.Content);
				await _Hub.Clients.Client(connectionId).SendAsync("ReceiveMessage", result);
			}

			return Ok(result);
		}




		[HttpPut("{id}")]
		public async Task<IActionResult> Put(int id)
		{
			var UserId = MiddleWare.GetUserIdFromCookie(Request);
			if (!await _chat.ReadMess(id)) return BadRequest("Không thể thực hiện tác vụ");

			var friends = await _userContext.GetFriends(UserId);
			return Ok(friends);
		}

		[HttpPut("recall")]
		public async Task<IActionResult> Recall([FromBody] UpdateChat value)
		{
			var UserId = MiddleWare.GetUserIdFromCookie(Request);
			var result = await _chat.Recall(value.ChatId);
			if (result)
			{
				var ConnectionId = OnlineHub.GetConnectionId(value.OtherId);
				if (ConnectionId != null) await _Hub.Clients.Client(ConnectionId).SendAsync("receiveRecallChat", value.ChatId, UserId);
			}
			return Ok(result);
		}

		[HttpDelete]
		public async Task<IActionResult> Delete(int id, int OtherId)
		{
			var UserId = MiddleWare.GetUserIdFromCookie(Request);
			var item = await _chat.Delete(id);
			if (item)
			{
				var ConnectionId = OnlineHub.GetConnectionId(OtherId);
				if (ConnectionId != null) await _Hub.Clients.Client(ConnectionId).SendAsync("receiveDeleteChat", id, UserId);
			}
			return Ok(item);
		}
	}

	public class RequestPostFile
	{
		public IFormFile? File { get; set; }

		public int OtheruserId { get; set; }
		public int MessageId { get; set; }

		public int FileType { get; set; }

	}

	public class UpdateChat
	{

		public int OtherId { get; set; }

		public int ChatId { get; set; }

	}
}