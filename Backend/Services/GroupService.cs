using Backend.Models;
using Backend.Repository;
using Backend.Repository.Interface;
using Microsoft.EntityFrameworkCore;
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
		return await _unit.UserGroup.GetByIdAsync(groupId);

	}

	public async Task<UserGroup?> GetGroupByIdAsync(int groupId)
	{
		return await _unit.UserGroup.GetByConditionAsync(query =>
			query.Include(g => g.UserInGroups)
				 .ThenInclude(uig => uig.User)
				 .Where(g => g.GroupId == groupId));
	}


	public async Task<bool> AddGroup(UserGroup group)
	{
		await _unit.UserGroup.AddAsync(group);
		return await _unit.CompleteAsync();
	}

	public async Task<bool> UpdateGroup(UserGroup group)
	{
		_unit.UserGroup.UpdateAsync(group);
		return await _unit.CompleteAsync();
	}

	public async Task<bool> DeleteGroup(int groupId)
	{
		await _unit.UserGroup.DeleteAsync(x => x.GroupId == groupId);
		return await _unit.CompleteAsync();
	}


	public async Task<List<UserGroup>> GetAllGroups()
	{
		var groups = await _unit.UserGroup.GetAll();
		return groups as List<UserGroup>;
	}

	// check user in group
	public async Task<string> CheckUserInGroup(int userId, int groupId)
	{
		var userInGroup = await _unit.UserInGroup.GetByConditionAsync(query =>
			query.Where(uig => uig.UserId == userId && uig.GroupId == groupId));

		if (userInGroup == null)
		{
			return "null";
		}


		else
		{
			return "1";
		}

	}

	//update date cua user in group
	public async Task<bool> UpdateDateUserInGroup(int userId, int groupId)
	{
		var userInGroup = await _unit.UserInGroup.GetByConditionAsync(query =>
			query.Where(uig => uig.UserId == userId && uig.GroupId == groupId));

		if (userInGroup == null)
		{
			return false;
		}

		userInGroup.DateIn = System.DateTime.Now;
		_unit.UserInGroup.UpdateAsync(userInGroup);
		return await _unit.CompleteAsync();
	}

	// them 1 user vao group
	public async Task<bool> addUserToGroup(UserInGroup userInGroup)
	{

		var result = await _unit.UserInGroup.AddAsync(userInGroup);

		if (result == null)
		{
			return false;
		}
		await _unit.CompleteAsync();

		return true;
	}
}