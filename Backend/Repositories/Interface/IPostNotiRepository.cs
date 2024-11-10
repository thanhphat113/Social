using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Repositories.Interface
{
	public interface IPostNotiRepository : IRepository<PostNotification>
	{
		Task<IEnumerable<Object>> FindByUserId(int userid);
	}
}