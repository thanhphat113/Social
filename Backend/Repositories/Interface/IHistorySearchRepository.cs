using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Repositories.Interface
{
	public interface IHistorySearchRepository : IRepository<HistorySearch>
	{
		Task<IEnumerable<Object>> GetHistorySearchByUserId(int userid);
		Task<bool> UpdateTime(int historyid);
	}
}