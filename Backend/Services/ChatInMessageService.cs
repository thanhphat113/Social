
using Backend.Models;
using Backend.Repository.Interface;
using Backend.Services.Interface;
using Microsoft.AspNetCore.Http.HttpResults;


namespace Backend.Services
{
	public class ChatInMessageService : IChatInMessService
	{
		private readonly IUnitOfWork _unit;
		private readonly IHttpContextAccessor _httpContextAccessor;


		public ChatInMessageService(IUnitOfWork unit, IHttpContextAccessor httpContextAccessor)
		{
			_unit = unit;
			_httpContextAccessor = httpContextAccessor;
		}

		public async Task<ChatInMessage> AddWithMedia(Media value, int typeFile, ChatInMessage chat)
		{
			try
			{
				var media = await _unit.Media.GetByConditionAsync<Media>(query => query.Where(m => m.HashCode == value.HashCode));
				if (media == null)
				{
					chat.Media = value;
				}
				else
				{
					chat.MediaId = media.MediaId;
				}

				Message message;
				if (chat.MessagesId == -1)
				{
					message = new Message
					{
						User1 = chat.FromUser,
						User2 = chat.Otheruser
					};
					message.ChatInMessages.Add(chat);
					var item = await _unit.Message.AddAsync(message);
				}
				else
				{
					var item = await _unit.ChatInMessage.AddAsync(chat);
				}

				var save = await _unit.CompleteAsync();
				if (!save) return null;

				if (media != null)
				{
					chat.Media = media;
				}

				string type = (typeFile == 1 || typeFile == 2) ? "media" : "file";
				chat.Media.Src = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}/{type}/{chat.Media.Src}";

				return chat;

			}
			catch (System.Exception ex)
			{
				throw new ArgumentException("Lỗi: " + ex);
			}
		}

		public async Task<ChatInMessage> AddWithMediaIsHas(int mediaId, int FromUserId, int MessageId, int typeFile)
		{
			var item = new ChatInMessage
			{
				MessagesId = MessageId,
				FromUser = FromUserId,
				MediaId = mediaId
			};
			try
			{
				var newChat = await _unit.ChatInMessage.AddAsync(item);
				var result = await _unit.CompleteAsync();
				if (!result) return null;

				string type;
				if (typeFile == 1 || typeFile == 2) type = "media";
				else type = "file";
				newChat.Media.Src = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}/{type}/{newChat.Media.Src}";

				return newChat;
			}
			catch (System.Exception ex)
			{
				throw new ArgumentException("Lỗi: " + ex);
			}

		}

		public async Task<ChatInMessage> Add(ChatInMessage mess)
		{
			try
			{
				ChatInMessage item;
				if (mess.MessagesId == -1)
				{
					var message = new Message
					{
						User1 = mess.FromUser,
						User2 = mess.Otheruser,
					};
					message.ChatInMessages.Add(mess);
					var newMessage = await _unit.Message.AddAsync(message);
					var result = await _unit.CompleteAsync();
					if (!result) return null;

					item = newMessage.ChatInMessages.FirstOrDefault();
				}
				else
				{
					item = await _unit.ChatInMessage.AddAsync(mess);
					var result = await _unit.CompleteAsync();
					if (!result) return null;
				}

				return item;
			}
			catch (System.Exception ex)
			{
				Console.WriteLine("Lỗi: " + ex);
				throw;
			}
		}

		public async Task<bool> Delete(int id)
		{
			await _unit.ChatInMessage.DeleteAsync(u => u.ChatId == id);
			return await _unit.CompleteAsync();
		}

		public async Task<bool> Recall(int id)
		{
			var item = await _unit.ChatInMessage.GetByIdAsync(id);

			item.IsRecall = true;
			item.Content = "Tin nhắn đã thu hồi";

			return await _unit.CompleteAsync();
		}

		public Task<IEnumerable<ChatInMessage>> GetAll()
		{
			throw new NotImplementedException();
		}

		public Task<ChatInMessage> GetById(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<ChatInMessage>> GetListById(int id)
		{
			throw new NotImplementedException();
		}

		public async Task<bool> ReadMess(int Id)
		{
			try
			{
				var item = await _unit.ChatInMessage.GetByIdAsync(Id);
				item.IsRead = true;

				return await _unit.CompleteAsync();
			}
			catch (System.Exception ex)
			{
				return false;
				throw;
			}
		}

		public Task<bool> Update(ChatInMessage product)
		{
			throw new NotImplementedException();
		}
	}
}