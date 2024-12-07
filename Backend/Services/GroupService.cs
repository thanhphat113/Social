using Backend.Models;
using Backend.Repository;
using Backend.Repository.Interface;
using Backend.Services.Interface;
using System.Collections.Generic;
using System.Threading.Tasks;

public class GroupService : IService<UserGroup>
{
    private readonly IUnitOfWork _unit;

    public GroupService(IUnitOfWork unit)
    {
        _unit = unit;
    }

    public async Task<UserGroup> GetById(int groupId)
    {
        return await _unit.UserGroup.GetByIdAsync(groupId);

    }

    public async Task<UserGroup> Add(UserGroup group)
    {
        UserGroup userGroup =  await _unit.UserGroup.AddAsync(group);
        return userGroup;
    }

    public async Task<bool> Update(UserGroup group)
    {
        _unit.UserGroup.UpdateAsync(group); 
        return await _unit.CompleteAsync();
    }


    public async Task<bool> Delete(int groupId)
    {
        await _unit.UserGroup.DeleteAsync(x => x.GroupId == groupId);
        return await _unit.CompleteAsync();
    }

    public async Task<IEnumerable<UserGroup>> GetListById(int userid)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<UserGroup>> GetAll()
    {
        throw new NotImplementedException();
    }




}