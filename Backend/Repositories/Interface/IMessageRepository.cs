using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Repositories.Interface
{
	public interface IMessageRepository
	{
		Task<Message> Add(Message value);
		Task<bool> Update(Message value);
		Task<Message> FindBy2User(int user1, int user2);
	}
}