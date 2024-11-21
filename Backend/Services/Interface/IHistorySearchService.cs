using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Services.Interface
{
	public interface IHistorySearchService : IService<HistorySearch>
	{
		Task<IEnumerable<HistoryWithUser>> GetHistorySearchByUserId(int userid);
		Task<bool> UpdateTime(int FromUserId, int OtherUserId);
	}
}