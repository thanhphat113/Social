
using Backend.Models;
using Backend.Repositories.Interface;
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

		public async Task<ChatInMessage> AddWithMedia(Media value, int FromUserId, int MessageId, int typeFile)
		{
			try
			{
				var item = await _unit.Media.GetByConditionAsync<Media>(m => m.HashCode == value.HashCode);


				var ChatInMessage = new ChatInMessage
				{
					MessagesId = MessageId,
					FromUser = FromUserId,
				};

				var Message = await _unit.Message.GetByIdAsync(MessageId);


				if (item == null)
				{
					var newMedia = await _unit.Media.AddAsync(value);
					ChatInMessage.Media = newMedia;
					Message.Medias.Add(newMedia);
				}
				else
				{
					ChatInMessage.MediaId = item.MediaId;
				}


				var NewChatInMessage = await _unit.ChatInMessage.AddAsync(ChatInMessage);

				var result = await _unit.CompleteAsync();

				string type;
				if (typeFile == 1 || typeFile == 2) type = "media";
				else type = "file";
				NewChatInMessage.Media.Src = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}/{type}/{NewChatInMessage.Media.Src}";

				if (result) return NewChatInMessage;
				return null;
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
				var item = await _unit.ChatInMessage.AddAsync(mess);
				await _unit.CompleteAsync();
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
			await _unit.ChatInMessage.DeleteAsync(c => c.ChatId == id);
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