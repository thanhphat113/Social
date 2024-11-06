using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interface;

namespace Backend.Repositories.Repository
{
	public class ChatInMessageRepository : IRepository<ChatInMessage>
	{
		private readonly SocialMediaContext _context;
		public ChatInMessageRepository(SocialMediaContext context)
		{
			_context = context;
		}
		public async Task<bool> Add(ChatInMessage mess)
		{
			try
			{
				await _context.ChatInMessages.AddAsync(mess);
				await _context.SaveChangesAsync();
				return true;
			}
			catch (Exception error)
			{
				Console.WriteLine("Lỗi là:" + error.Data);
				return false;
			}
		}

		public Task<bool> Delete(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<ChatInMessage>> GetAll()
		{
			throw new NotImplementedException();
		}

		public Task<ChatInMessage> GetById(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<ChatInMessage>> GetListByType(int condition, string type)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Update(ChatInMessage value)
		{
			throw new NotImplementedException();
		}
	}
}