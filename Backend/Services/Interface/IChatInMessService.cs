using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Services.Interface
{
	public interface IChatInMessService : IService<ChatInMessage>
	{
		public Task<bool> ReadMess(int Id);

		public Task<bool> Recall(int id);

	}
}