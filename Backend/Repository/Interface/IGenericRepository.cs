using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Backend.Repositories.Interface
{
	public interface IGenericRepository<T>
	{
		Task<IEnumerable<T>> GetAll();
		Task<T> GetByIdAsync(int id);
		Task<TResult> GetByConditionAsync<TResult>(Expression<Func<T, bool>> predicate, Expression<Func<T, TResult>>? selector = null);

		Task<IEnumerable<TResult>> FindAsync<TResult>(Expression<Func<T, bool>> predicate, Expression<Func<T, TResult>>? selector = null, Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null);
		Task<IEnumerable<TResult>> FindAsyncMany<TResult>(Expression<Func<T, bool>> predicate, Func<IQueryable<T>, IQueryable<TResult>> selector);

		Task<T> AddAsync(T value);
		void UpdateAsync(T value);
		Task DeleteAsync(Expression<Func<T, bool>> predicate);
	}
}