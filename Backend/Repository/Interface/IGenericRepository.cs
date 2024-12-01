using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Backend.Repository.Interface
{
	public interface IGenericRepository<T>
	{
		Task<IEnumerable<T>> GetAll();
		Task<T> GetByIdAsync(int id);
		Task<TResult> GetByConditionAsync<TResult>(Func<IQueryable<T>, IQueryable<TResult>> selector);

		Task<IEnumerable<TResult>> FindAsync<TResult>(Func<IQueryable<T>, IQueryable<TResult>> selector);

		Task<T> AddAsync(T value);
		void UpdateAsync(T value);
		Task DeleteAsync(Expression<Func<T, bool>> predicate);
	}
}