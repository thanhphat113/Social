using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Backend.DTO;
using Backend.Helper;
using Backend.Models;
using Backend.Repository.Interface;

using Backend.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
	public class RequestNotiService : INotificationsService
	{
		private readonly IUnitOfWork _unit;
		private readonly IMapper _mapper;
		public RequestNotiService(IUnitOfWork unit, IMapper mapper)
		{
			_unit = unit;
			_mapper = mapper;
		}

		public async Task<dynamic> Accept(int user1, int user2)
		{
			try
			{
				var item = await _unit.RequestNotification.GetByConditionAsync<RequestNotification>(query => query
							.Where(r =>
							(r.FromUserId == user1 && r.ToUserId == user2) ||
					 		(r.FromUserId == user2 && r.ToUserId == user1))
							.Include(u => u.FromUser)
							.ThenInclude(u => u.Posts)
							.ThenInclude(p => p.Medias)) ?? throw new ArgumentException("Không tìm thấy quan hệ");
				item.IsAccept = true;
				item.IsRead = true;

				var relation = await _unit.Relationship.GetByConditionAsync<Relationship>(query => query
							.Where(r =>
							(r.FromUserId == user1 && r.ToUserId == user2) ||
					 		(r.FromUserId == user2 && r.ToUserId == user1)));

				relation.TypeRelationship = 2;

				var result = _mapper.Map<RequestUser>(item);
				if (await _unit.CompleteAsync()) return result;
				return null;
			}
			catch (Exception e)
			{
				throw new ArgumentException("Lỗi" + e.Data);
			}
		}

        //tao moi 1 request
        public async Task<RequestNotification> Add(RequestNotification req)
        {
            try
            {
                var result =  await _unit.RequestNotification.AddAsync(req);
                await _unit.CompleteAsync();
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to add request notification.", ex);
            }
        }

        public async Task<bool> Delete(int id)
		{
			try
			{
				await _unit.RequestNotification.DeleteAsync(r => r.NotificationId == id);
				return await _unit.CompleteAsync();
			}
			catch
			{
				Console.WriteLine("Lỗi rầu");
				return false;
			}
		}

		public async Task<IEnumerable<Object>> FindByUserId(int id)
		{
			try
			{
				var items = await _unit.RequestNotification.FindAsync(query => query
							.Where(r => r.ToUserId == id)
							.Include(r => r.FromUser)
							.ThenInclude(r => r.Posts)
							.ThenInclude(r => r.Medias)
							.ProjectTo<RequestUser>(_mapper.ConfigurationProvider));

				foreach (var item in items)
				{
					if (item.ProfilePicture == null) continue;
					var type = item.ProfilePicture.MediaType;
					item.ProfilePicture.Src = MiddleWare.GetFullSrc(item.ProfilePicture.Src, type != 3 ? "media" : "file");
				}

				return items;
			}
			catch
			{
				return null;
			}
		}

		public Task<IEnumerable<RequestNotification>> GetAll()
		{
			throw new NotImplementedException();
		}

		public Task<RequestNotification> GetById(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<RequestNotification>> GetListById(int userid)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Update(RequestNotification product)
		{
			throw new NotImplementedException();
		}
	}
}