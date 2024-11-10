using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories.Repository
{
	public class ChatInMessageRepository : IChatInMessRepository
	{
		private readonly SocialMediaContext _context;
		public ChatInMessageRepository(SocialMediaContext context)
		{
			_context = context;
		}
		public async Task<ChatInMessage> Add(ChatInMessage mess)
		{
			mess.DateCreated = DateTime.Now;
			await _context.ChatInMessages.AddAsync(mess);
			var result = await _context.SaveChangesAsync();
			if (result > 0) return mess;
			return null;
		}

		public async Task<bool> Delete(int id)
		{
			try
			{
				var item = await GetById(id);
				if (item == null) return false;

				item.IsRecall = true;
				item.Content = "Tin nhắn đã thu hồi";

				var result = await _context.SaveChangesAsync();
				return result > 0;
			}
			catch (System.Exception ex)
			{
				Console.WriteLine("Lỗi: " + ex);
				throw;
			}
		}

		public Task<IEnumerable<ChatInMessage>> GetAll()
		{
			throw new NotImplementedException();
		}

		public async Task<ChatInMessage> GetById(int id)
		{
			return await _context.ChatInMessages
				.FirstOrDefaultAsync(c => c.ChatId == id);
		}

		public Task<IEnumerable<ChatInMessage>> GetListById(int userid)
		{
			throw new NotImplementedException();
		}

		public async Task<ICollection<ChatInMessage>> GetMessage(int user1, int user2)
		{
			return await _context.Messages
						.Where(m => m.User1 == user1 || m.User2 == user1)
						.Where(m => m.User1 == user2 || m.User2 == user2)
						.SelectMany(m => m.ChatInMessages)
						.ToListAsync();
		}

		public async Task<bool> Update(ChatInMessage value)
		{
			throw new NotImplementedException();
		}

		public async Task<bool> ReadMess(int user1)
		{
			var item = await GetById(user1);

			if (item == null) return false;

			item.IsRead = true;

			var result = await _context.SaveChangesAsync();
			return result > 0;
		}
	}
}