using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repository.Interface;
using Backend.Services.Interface;

namespace Backend.Services
{
    public class Group1Service : IGroupService
    {
        private readonly IUnitOfWork _unit;
        public Group1Service(IUnitOfWork unit)
        {
            _unit = unit;
          
        }

        public async Task<UserGroup> Add(UserGroup value)
        {
            var item = await _unit.UserGroup.AddAsync(value);
            await _unit.CompleteAsync();
            return item;
        }

        public Task<bool> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<UserGroup>> GetAll()
        {
            var item = await _unit.UserGroup.GetAll();
            return item;
        }

        public Task<UserGroup> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<UserGroup>> GetListById(int userid)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(UserGroup value)
        {
            throw new NotImplementedException();
        }

        // public async Task<dynamic> Findidgroup()
        // {
        //     try
        //     {
        //         var item = await _unit.UserGroup.GetByConditionAsync(query => query.Where(g => g.GroupId == 1).Select(g => new {g.Bio, g.GroupName}));
        //         return item;
        //     }
        //     catch (System.Exception ex)
        //     {
        //         Console.WriteLine(ex);
        //         throw;
        //     }
        // }

        public async Task<dynamic> SearchGroupsByName(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return null;
            }

            // Tìm kiếm nhóm theo tên chứa từ khóa
            return await _unit.UserGroup.FindAsync(query => query.Where(
                g => g.GroupName.Contains(name)));
        }
    }
}