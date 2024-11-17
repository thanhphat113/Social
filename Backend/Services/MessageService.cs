using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories.Interface;
using Backend.Services.Interface;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Backend.Services
{
	public class MessageService : IMessageRepository
	{
		private readonly IUnitOfWork _unit;
		public MessageService(IUnitOfWork unit)
		{
			_unit = unit;
		}


		public async Task<Message> Add(Message value)
		{
			try
			{
				var item = await _unit.Message.AddAsync(value);
				await _unit.CompleteAsync();
				return item;
			}
			catch (System.Exception ex)
			{
				return null;
				throw;
			}
		}

		public async Task<Message> FindBy2User(int user1, int user2)
		{
			return await _unit.Message.GetByConditionAsync(u =>
					(u.User1 == user1 && u.User2 == user2) ||
					(u.User1 == user2 && u.User2 == user1));
		}

		public Task<bool> Update(Message value)
		{
			throw new NotImplementedException();
		}
	}
}