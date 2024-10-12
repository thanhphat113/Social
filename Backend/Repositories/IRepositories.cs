using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Repositories
{
	public interface IRepositories<T>
	{
		Task<List<T>> GetAll();
    	Task<List<T>> GetListById(int id);
    	Task<T> GetById(int id);
    	Task<bool> Add(T product);
    	Task<bool> Update(T product);
    	Task<bool> Delete(int id);
	}
}