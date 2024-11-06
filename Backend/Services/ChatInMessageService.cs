
using Backend.Models;
using Backend.Repositories.Interface;


namespace Backend.Services
{
	public class ChatInMessageService : IService<ChatInMessage>
	{
		private readonly IRepository<ChatInMessage> _chatRepo;

		public ChatInMessageService(IRepository<ChatInMessage> chatRepo)
		{
			_chatRepo = chatRepo;
		}

		public async Task<string> Add(ChatInMessage mess)
		{
			if (await _chatRepo.Add(mess))
			{
				return "Thêm thành công";
			}
			else
			{
				return "Thêm thất bại";
			}
		}

		public Task<string> Delete(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<ChatInMessage>> GetAll()
		{
			throw new NotImplementedException();
		}

		public Task<ChatInMessage> GetById(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<ChatInMessage>> GetListById(int id)
		{
			throw new NotImplementedException();
		}

		public Task<string> Update(ChatInMessage product)
		{
			throw new NotImplementedException();
		}
	}
}