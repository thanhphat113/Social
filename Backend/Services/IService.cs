using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Services;
public interface IService<T> where T : class
{
	Task<IEnumerable<T>> GetAll();
	Task<IEnumerable<T>> GetListById(int id);
	Task<T> GetById(int id);
	Task<string> Add(T product);
	Task<string> Update(T product);
	Task<string> Delete(int id);
}