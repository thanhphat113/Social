using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories.Interface;
using Backend.Services.Interface;

namespace Backend.Services
{
	public class MediaService : IService<Media>
	{
		private readonly IUnitOfWork _unit;
		public MediaService(IUnitOfWork unit)
		{
			_unit = unit;
		}


		public Task<bool> Delete(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<Media>> GetAll()
		{
			throw new NotImplementedException();
		}

		public async Task<Media> FindProfilePictureByUserId(int UserId)
		{
			var UserMedia = await _unit.UserMedia.GetByConditionAsync(u => u.UserId == UserId && u.IsProfilePicture == true);
			if (UserMedia == null) return null;
			return await _unit.Media.GetByConditionAsync(m => m.MediaId == UserMedia.MediaId);
		}

		public async Task<Media> FindCoverPictureByUserId(int UserId)
		{
			var UserMedia = await _unit.UserMedia.GetByConditionAsync(u => u.UserId == UserId && u.IsCoverPicture == true);
			if (UserMedia == null) return null;
			return await _unit.Media.GetByConditionAsync(m => m.MediaId == UserMedia.MediaId);
		}

		public async Task<IEnumerable<Media>> FindByUserId(int UserId)
		{

			return await _unit.UserMedia.FindAsync<Media>(m => m.UserId == UserId, m => m.Media);
		}

		public Task<Media> GetById(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<Media>> GetListById(int id)
		{
			throw new NotImplementedException();
		}

		public Task<Media> Add(Media value)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Update(Media value)
		{
			throw new NotImplementedException();
		}
	}
}