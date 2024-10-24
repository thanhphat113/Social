using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Repositories;
	public interface IRepositories<T> where T : class
	{
    Task<List<T>> GetAll();
    Task<T> GetById(int id);
    Task<bool> Add(T entity);
    Task<bool> Update(T entity);
    Task<bool> Delete(int id);
}