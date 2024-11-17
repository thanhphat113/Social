using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Services.Interface
{
	public interface IChatInMessService : IService<ChatInMessage>
	{
		public Task<ICollection<ChatInMessage>> GetMessage(int user1, int user2);
		public Task<bool> ReadMess(int user1);
	}
}