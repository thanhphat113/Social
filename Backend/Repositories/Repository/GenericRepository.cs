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
			var item = await GetByConditionAsync(predicate);
			_context.Remove(item);
		}

		public async Task<T> GetByIdAsync(int id)
		{
			return await _context.Set<T>().FindAsync(id);
		}

		public async Task<T> GetByConditionAsync(Expression<Func<T, bool>> predicate)
		{
			try
			{
				return await _context.Set<T>().FirstOrDefaultAsync(predicate);
			}
			catch (ArgumentException ex)
			{
				Console.WriteLine("Lỗi khi thực hiện truy vấn: " + ex.Message);
				throw;
			}
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


		public async Task<IEnumerable<TResult>> FindAsyncMany<TResult>(Expression<Func<T, bool>> predicate, Expression<Func<T, IEnumerable<TResult>>> selector)
		{
			return await _context.Set<T>().Where(predicate).SelectMany(selector).ToListAsync();
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