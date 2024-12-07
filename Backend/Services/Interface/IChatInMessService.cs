
using Backend.Models;

namespace Backend.Services.Interface
{
	public interface IChatInMessService : IService<ChatInMessage>
	{
		public Task<bool> ReadMess(int Id);

		Task<ChatInMessage> AddWithMedia(Media value, int typeFile, ChatInMessage chat);

		public Task<bool> Recall(int id);

	}
}