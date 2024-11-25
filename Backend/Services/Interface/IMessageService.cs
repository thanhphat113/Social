using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Services.Interface
{
	public interface IMessageService : IService<Message>
	{
		Task<Message> FindBy2User(int user1, int user2);
		Task<bool> UpdateTopic(int Id, int TopicId);

	}
}