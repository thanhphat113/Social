using System.Linq.Expressions;
using Backend.Repository.Interface;
using Backend.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository
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
			var items = await _context.Set<T>().Where(predicate).ToListAsync();


			if (items.Any())
			{
				_context.RemoveRange(items);
			}
		}

		public async Task<T> GetByIdAsync(int id)
		{
			return await _context.Set<T>().FindAsync(id);
		}

		public async Task<TResult> GetByConditionAsync<TResult>(Func<IQueryable<T>, IQueryable<TResult>> selector)
		{

			var query = _context.Set<T>();

			var result = await selector(query).FirstOrDefaultAsync();

			return result;
		}


		public async Task<IEnumerable<TResult>> FindAsync<TResult>(Func<IQueryable<T>, IQueryable<TResult>> selector)
		{

			var query = _context.Set<T>();

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