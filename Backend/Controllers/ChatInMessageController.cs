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
		private readonly UserService _userContext;

		public ChatInMessageController(IHubContext<OnlineHub> Hub, MediaService media, IWebHostEnvironment env, UserService userContext, IChatInMessService chat, IMessageService message)
		{
			_media = media;
			_env = env;
			_Hub = Hub;
			_userContext = userContext;
			_chat = chat;
			_message = message;
		}

		[HttpPost("chat-with-file")]
		public async Task<IActionResult> PostFile([FromForm] IFormFile file,
												[FromForm] int fileType,
												[FromForm] int messageId)
		{
			Console.WriteLine("file: " + file.FileName + ", " + "type: " + fileType + messageId);
			var UserId = MiddleWare.GetUserIdFromCookie(Request);
			if (file == null || file.Length == 0)
			{
				return BadRequest("Không có tệp được chọn.");
			}

			string uploadsFolder;
			if (fileType == 1 || fileType == 2)
			{
				uploadsFolder = Path.Combine(_env.WebRootPath, "media");
			}
			else
			{
				uploadsFolder = Path.Combine(_env.WebRootPath, "file");
			}

			var fileHash = await MiddleWare.GetFileHashAsync(file);


			var filePath = Path.Combine(uploadsFolder, file.FileName);


			var item = await _media.IsHas(fileHash);

			string newName = file.FileName;
			if (item == -1)
			{
				if (System.IO.File.Exists(filePath))
				{
					var fileExtension = Path.GetExtension(file.FileName);
					newName = Guid.NewGuid().ToString() + fileExtension;
					filePath = Path.Combine(uploadsFolder, newName);
				}
				using var stream = new FileStream(filePath, FileMode.Create);
				await file.CopyToAsync(stream);
			}


			var media = new Media
			{
				Src = newName,
				MediaType = fileType,
				HashCode = fileHash
			};

			var result = await _chat.AddWithMedia(media, UserId, messageId, fileType);
			return Ok(result);
		}

		[HttpPost]
		public async Task<IActionResult> Post([FromBody] ChatInMessage mess)
		{
			if (mess.MessagesId == -1)
			{
				var item = await _message.Add(new() { User1 = mess.FromUser, User2 = mess.Otheruser });
				if (item == null) return BadRequest("Lỗi việc tạo chat mới");
				mess.MessagesId = (int)item.MessagesId;
			}

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

		[HttpPost("recall")]
		public async Task<IActionResult> Recall([FromBody] int id)
		{
			Console.WriteLine("Đây là recall: " + id);
			return Ok(await _chat.Recall(id));
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			return Ok(await _chat.Delete(id));
		}
	}
}