using Backend.Data;
using Backend.Models;
using Backend.Repositories;
using Microsoft.EntityFrameworkCore;
using Backend.Repositories.Interface;

public class GroupRepositories /*: IRepository<UserGroup>*/
{
    private readonly SocialMediaContext _context;

    public GroupRepositories(SocialMediaContext context)
    {
        _context = context;
    }

    public async Task<List<UserGroup>> GetAll()
    {
        try
        {
            return await _context.UserGroups.ToListAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return new List<UserGroup>();
        }
    }

    public async Task<UserGroup> GetById(int id)
    {
        try
        {
            return await _context.UserGroups.FirstOrDefaultAsync(g => g.GroupId == id);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return null;
        }
    }
    public async Task<List<User>> GetGroupMembers(int groupId)
    {
        try
        {
            return await _context.UserInGroups
                .Where(uig => uig.GroupId == groupId)
                .Select(uig => uig.User)
                .ToListAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return new List<User>();
        }
    }
    public async Task<bool> Add(UserGroup group)
    {
        try
        {
            await _context.UserGroups.AddAsync(group);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return false;
        }
    }

    public async Task<bool> Update(UserGroup group)
    {
        try
        {
            _context.UserGroups.Update(group);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return false;
        }
    }

    public async Task<bool> Delete(int id)
    {
        try
        {
            var group = await GetById(id);
            if (group == null) return false;

            _context.UserGroups.Remove(group);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return false;
        }
    }

    public async Task<IEnumerable<UserGroup>> SearchGroupsByNameAsync(string name)
    {
        return await _context.UserGroups
            .Where(g => g.GroupName.Contains(name))  // Tìm nhóm theo tên
            .ToListAsync();
    }



}