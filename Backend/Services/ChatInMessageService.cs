
using Backend.Models;
using Backend.Repositories.Interface;
using Microsoft.AspNetCore.Http.HttpResults;


namespace Backend.Services
{
	public class ChatInMessageService : IChatInMessRepository
	{
		private readonly IChatInMessRepository _chatRepo;

		public ChatInMessageService(IChatInMessRepository chatRepo)
		{
			_chatRepo = chatRepo;
		}

		public async Task<ChatInMessage> Add(ChatInMessage mess)
		{
			try
			{
				return await _chatRepo.Add(mess);
			}
			catch (System.Exception ex)
			{
				Console.WriteLine("Lỗi: " + ex);
				throw;
			}
		}

		public async Task<bool> Delete(int id)
		{
			return await _chatRepo.Delete(id);
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

		public async Task<ICollection<ChatInMessage>> GetMessage(int user1, int user2)
		{
			try
			{
				return await _chatRepo.GetMessage(user1, user2);
			}
			catch
			{
				return null;
			}
		}

		public async Task<bool> ReadMess(int user1)
		{
			try
			{
				return await _chatRepo.ReadMess(user1);
			}
			catch (System.Exception ex)
			{
				return false;
				throw;
			}
		}

		public Task<bool> Update(ChatInMessage product)
		{
			throw new NotImplementedException();
		}
	}
}