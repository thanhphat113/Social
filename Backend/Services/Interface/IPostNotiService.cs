using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Services.Interface
{
	public interface IPostNotiService : IService<PostNotification>
	{
		Task<IEnumerable<Object>> FindByUserId(int userid);
	}
}