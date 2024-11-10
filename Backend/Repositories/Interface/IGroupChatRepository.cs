using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Repositories.Interface
{
	public interface IGroupChatRepository : IRepository<GroupChat>
	{
		Task<IEnumerable<GroupChat>> FindByUserId(int UserId);
	}
}