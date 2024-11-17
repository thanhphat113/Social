using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Services.Interface
{
	public interface INotificationsService : IService<RequestNotification>
	{
		Task<IEnumerable<Object>> FindByUserId(int userid);
		Task<bool> Accept(int user1, int user2);

	}
}