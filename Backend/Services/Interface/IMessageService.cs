using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Services.Interface
{
	public interface IMessageService : IService<Message>
	{
		Task<ChatInMessage> UpdateNickName(int Id, int user1, string nn1, string nn2);
		Task<Message> FindBy2User(int user1, int user2);
		Task<ChatInMessage> UpdateTopic(int Id, int TopicId, int UserId);
		Task<int> GetOtherUserIdInMessage(int MessageId, int UserId);

	}
}