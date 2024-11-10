using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Backend.Repositories.Interface;

namespace Backend.Repositories.Repository
{
	public class MessageRepository : IMessageRepository
	{
		private readonly SocialMediaContext _context;
		public MessageRepository(SocialMediaContext context)
		{
			_context = context;
		}

		public async Task<Message> Add(Message value)
		{
			var item = await FindBy2User(value.User1, value.User2);

			if (item == null) _context.Messages.Add(value);
			await _context.SaveChangesAsync();

			return value;
		}

		public async Task<Message> FindBy2User(int user1, int user2)
		{
			return await _context.Messages
					.FirstOrDefaultAsync(u =>
						(u.User1 == user1 && u.User2 == user2) ||
						(u.User1 == user2 && u.User2 == user1));

		}

		public Task<bool> Update(Message value)
		{
			throw new NotImplementedException();
		}
	}
}