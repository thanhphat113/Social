using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Repositories.Interface
{
	public interface IMessageRepository : IRepository<Message>
	{
		public Task<IEnumerable<ChatInMessage>> GetMessage(int user1, int user2);
	}
}