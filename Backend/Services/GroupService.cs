using Backend.Models;
using Backend.Repositories;
using Backend.Repositories.Interface;
using System.Collections.Generic;
using System.Threading.Tasks;

public class GroupService
{
    private readonly IUnitOfWork _unit;

    public GroupService(IUnitOfWork unit)
    {
        _unit = unit;
    }

    public async Task<UserGroup> GetGroupById(int groupId)
    {
        return await _unit.userGroup.GetByIdAsync(groupId);

    }

    public async Task<bool> AddGroup(UserGroup group)
    {
        await _unit.userGroup.AddAsync(group);
        return await _unit.CompleteAsync();
    }

    public async Task<bool> UpdateGroup(UserGroup group)
    {
        _unit.userGroup.UpdateAsync(group);
        return await _unit.CompleteAsync();
    }


    public async Task<bool> DeleteGroup(int groupId)
    {
        await _unit.userGroup.DeleteAsync(x => x.GroupId == groupId);
        return await _unit.CompleteAsync();
    }


    public async Task<List<UserGroup>> GetAllGroups()
    {
        var groups = await _unit.userGroup.GetAll();
        return groups as List<UserGroup>;
    }

    //get member of group
    public async Task<List<UserGroup>> GetMembers(int groupId)
    {
        var members = await _unit.userGroup.FindAsyncMany(
            x => x.GroupId == groupId,
            x => new List<UserGroup> { x }
        );
        return members.ToList();
    }

}