using Backend.Models;
using Backend.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

public class GroupService
{
    private readonly GroupRepositories _groupRepository;

    public GroupService(GroupRepositories groupRepository)
    {
        _groupRepository = groupRepository;
    }
        public async Task<UserGroup> GetGroupById(int id)
    {
        var group = await _groupRepository.GetById(id);
        if (group == null) throw new Exception("Group không tồn tại");
        var members = await _groupRepository.GetGroupMembers(id);
        group.Members=members;
        return group;
    }
    public async Task<List<User>> GetGroupMembers(int groupId)
    {
        return await _groupRepository.GetGroupMembers(groupId);
    }
    public async Task<bool> AddGroup(UserGroup group)
    {
        return await _groupRepository.Add(group);
    }
    public async Task<bool> UpdateGroup(UserGroup group)
    {
        return await _groupRepository.Update(group);
    }
    public async Task<bool> DeleteGroup(int groupId)
    {
        return await _groupRepository.Delete(groupId);
    }

    public async Task<List<UserGroup>> GetAllGroups()
    {
        return await _groupRepository.GetAll();
    }
}