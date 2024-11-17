using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Services.Interface
{
	public interface IGroupChatService : IService<GroupChat>
	{
		Task<IEnumerable<GroupChat>> FindByUserId(int UserId);
	}
}