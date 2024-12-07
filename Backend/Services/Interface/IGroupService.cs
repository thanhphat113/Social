using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Services.Interface;

namespace Backend.Services.Interface
{
    public interface IGroupService:IService<UserGroup>
    {
        //Task<dynamic> Findidgroup();
        //Task<dynamic> GetAllGroupsAsync();  // Lấy tất cả nhóm
        Task<dynamic> SearchGroupsByName(string name);  // Tìm nhóm theo tên
        //Task<dynamic> Add(UserGroup group);  // Tạo nhóm mới
        
    }
}