using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories.Interface;
using Backend.Services.Interface;

namespace Backend.Services
{
	public class MessageService : IMessageService
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

		public Task<bool> Delete(int id)
		{
			throw new NotImplementedException();
		}

		public async Task<Message> FindBy2User(int user1, int user2)
		{
			var predicate = (Expression<Func<Message, bool>>)(u =>
					(u.User1 == user1 && u.User2 == user2) ||
					(u.User1 == user2 && u.User2 == user1));
			var selector = (Expression<Func<Message, Message>>)
					(m => new Message
					{
						MessagesId = m.MessagesId,
						User1 = m.User1,
						User2 = m.User2,
						NickName1 = m.NickName1,
						NickName2 = m.NickName2,
						MainTopicNavigation = m.MainTopicNavigation,
					});

			return await _unit.Message.GetByConditionAsync(predicate, selector);
		}

		public Task<IEnumerable<Message>> GetAll()
		{
			throw new NotImplementedException();
		}

		public async Task<Message> GetById(int id)
		{
			return await _unit.Message.GetByIdAsync(id);
		}

		public Task<IEnumerable<Message>> GetListById(int userid)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Update(Message value)
		{
			throw new NotImplementedException();
		}

		public async Task<bool> UpdateTopic(int Id, int TopicId)
		{
			try
			{
				var item = await _unit.Message.GetByIdAsync(Id);
				item.MainTopic = TopicId;
				return await _unit.CompleteAsync();
			}
			catch (System.Exception ex)
			{
				Console.WriteLine(ex);
				throw;
			}
		}

		public async Task<bool> UpdateNickName(int Id, int user1, string nn1, string nn2)
		{
			try
			{
				var item = await _unit.Message.GetByIdAsync(Id);
				if (user1 == item.User1)
				{
					item.NickName1 = nn1;
					item.NickName2 = nn2;
				}
				else
				{
					item.NickName1 = nn2;
					item.NickName2 = nn1;
				}
				return await _unit.CompleteAsync();
			}
			catch (System.Exception ex)
			{
				Console.WriteLine(ex);
				throw;
			}
		}
	}
}