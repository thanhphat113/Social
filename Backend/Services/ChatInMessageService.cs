
using Backend.Models;
using Backend.Repositories.Interface;
using Microsoft.AspNetCore.Http.HttpResults;


namespace Backend.Services
{
	public class ChatInMessageService
	{
		private readonly IUnitOfWork _unit;

		public ChatInMessageService(IUnitOfWork unit)
		{
			_unit = unit;
		}

		public async Task<ChatInMessage> Add(ChatInMessage mess)
		{
			try
			{
				var item = await _unit.ChatInMessage.AddAsync(mess);
				await _unit.CompleteAsync();
				return item;
			}
			catch (System.Exception ex)
			{
				Console.WriteLine("Lỗi: " + ex);
				throw;
			}
		}

		public async Task<bool> Delete(int id)
		{
			await _unit.ChatInMessage.DeleteAsync(c => c.ChatId == id);
			return await _unit.CompleteAsync();
		}

		public async Task<bool> Recall(int id)
		{
			var item = await _unit.ChatInMessage.GetByIdAsync(id);

			item.IsRecall = true;
			item.Content = "Tin nhắn đã thu hồi";

			return await _unit.CompleteAsync();
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

		public async Task<bool> ReadMess(int Id)
		{
			try
			{
				var item = await _unit.ChatInMessage.GetByIdAsync(Id);
				item.IsRead = true;

				return await _unit.CompleteAsync();
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