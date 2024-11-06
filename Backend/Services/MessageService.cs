using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories.Interface;

namespace Backend.Services
{
	public class MessageService : IService<Message>
	{
		private readonly IMessageRepository _messRepo;
		public MessageService(IMessageRepository mess)
		{
			_messRepo = mess;
		}
		public Task<string> Add(Message product)
		{
			throw new NotImplementedException();
		}

		public Task<string> Delete(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<Message>> GetAll()
		{
			throw new NotImplementedException();
		}

		public Task<Message> GetById(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<Message>> GetListById(int id)
		{
			throw new NotImplementedException();
		}

		public async Task<IEnumerable<ChatInMessage>> GetMessage(int user1, int user2)
		{
			try
			{
				return await _messRepo.GetMessage(user1, user2);
			}
			catch
			{
				return null;
			}
		}

		public Task<string> Update(Message product)
		{
			throw new NotImplementedException();
		}
	}
}