using System.Linq.Expressions;
using Backend.Repositories.Interface;
using Backend.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories.Repository
{
	public class GenericRepository<T> : IGenericRepository<T> where T : class
	{
		private readonly SocialMediaContext _context;
		public GenericRepository(SocialMediaContext context)
		{
			_context = context;
		}

		public async Task<T> AddAsync(T value)
		{
			var item = await _context.Set<T>().AddAsync(value);
			return item.Entity;
		}

		public async Task DeleteAsync(Expression<Func<T, bool>> predicate)
		{
			var item = await GetByConditionAsync<T>(predicate);
			_context.Remove(item);
		}

		public async Task<T> GetByIdAsync(int id)
		{
			return await _context.Set<T>().FindAsync(id);
		}

		public async Task<TResult> GetByConditionAsync<TResult>(Expression<Func<T, bool>> predicate, Expression<Func<T, TResult>>? selector = null)
		{

			var query = _context.Set<T>().Where(predicate);

			if (selector != null)
			{
				var resultQuery = query.Select(selector);

				return await resultQuery.FirstOrDefaultAsync();
			}

			return await query.Cast<TResult>().FirstOrDefaultAsync();
		}


		public async Task<IEnumerable<TResult>> FindAsync<TResult>(Expression<Func<T, bool>> predicate, Expression<Func<T, TResult>>? selector = null, Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null)
		{
			var query = _context.Set<T>().Where(predicate);

			if (orderBy != null)
			{
				query = orderBy(query);
			}

			if (selector != null)
			{
				var resultQuery = query.Select(selector);

				return await resultQuery.ToListAsync();
			}
			return await query.Cast<TResult>().ToListAsync();
		}


		public async Task<IEnumerable<TResult>> FindAsyncMany<TResult>(Expression<Func<T, bool>> predicate, Func<IQueryable<T>, IQueryable<TResult>> selector)
		{

			var query = _context.Set<T>().Where(predicate);

			var result = await selector(query).ToListAsync();

			return result;
		}

		public async Task<IEnumerable<T>> GetAll()
		{
			return await _context.Set<T>().ToListAsync();
		}


		public void UpdateAsync(T value)
		{
			_context.Update(value);
		}
	}
}