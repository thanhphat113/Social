using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories.Interface;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Backend.Services
{
	public class MessageService : IMessageRepository
	{
		private readonly IMessageRepository _messRepo;
		public MessageService(IMessageRepository mess)
		{
			_messRepo = mess;
		}


		public async Task<Message> Add(Message value)
		{
			try
			{
				return await _messRepo.Add(value);
			}
			catch (System.Exception ex)
			{
				return null;
				throw;
			}
		}

		public Task<Message> FindBy2User(int user1, int user2)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Update(Message value)
		{
			throw new NotImplementedException();
		}
	}
}