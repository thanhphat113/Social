using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interface;
using Backend.Repository.Interface;
using Backend.Services.Interface;

namespace Backend.Services;

public class ReactPostService : IReactPostService
{
    private readonly IUnitOfWork _unit;
    private readonly SocialMediaContext _dbContext;

    public ReactPostService(IUnitOfWork unit, SocialMediaContext dbContext)
    {
        _unit = unit;
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<ReactsPost>> GetAll()
    {
        try
        {
            var reactPosts = await _unit.ReactsPost.GetAll();
            return reactPosts;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in {nameof(GetAll)}: {ex.Message}");
            throw;
        }
    }

    public Task<IEnumerable<ReactsPost>> GetListById(int userid)
    {
        throw new NotImplementedException();
    }

    public Task<ReactsPost> GetById(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<ReactsPost> Add(ReactsPost react)
    {
        // Kiểm tra xem phản hồi đã tồn tại hay chưa
        var existingReact = await _unit.ReactsPost.GetByConditionAsync(query =>
            query.Where(r => r.UserId == react.UserId && r.PostId == react.PostId));

        if (existingReact != null)
        {
            return null; // Nếu tồn tại, trả về null
        }

        // Nếu không tồn tại, thêm phản hồi mới
        await _unit.ReactsPost.AddAsync(react);
        await _unit.CompleteAsync();
        return react; // Trả về phản hồi vừa thêm
    }


    public Task<bool> Update(ReactsPost value)
    {
        throw new NotImplementedException();
    }
    
    public async Task<bool> RemoveReact(int userId, int postId)
    {
        // Sử dụng GetByConditionAsync để lấy phản hồi
        var existingReact = await _unit.ReactsPost.GetByConditionAsync(query =>
            query.Where(r => r.UserId == userId && r.PostId == postId));

        if (existingReact != null)
        {
            // Xóa phản hồi nếu tồn tại
            await _unit.ReactsPost.DeleteAsync(r => r.UserId == userId && r.PostId == postId);
            return true;
        }

        return false;
    }


    public Task<bool> Delete(int id)
    {
        throw new NotImplementedException();
    }
}