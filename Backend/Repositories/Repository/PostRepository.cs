namespace Backend.Repositories;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
public class PostRepository : IRepositories<Post>
{
    private readonly SocialMediaContext _context;

    public PostRepository(SocialMediaContext context)
    {
        _context = context;
    }

    public async Task<List<Post>> GetAll()
    {
        try
        {
            return await _context.Posts
                .Include(p => p.CreatedByUser)
                .Include(p => p.Media)
                .OrderByDescending(p => p.DateCreated)
                .ToListAsync();
        }
        catch (Exception e)
        {
            return new List<Post>();
        }
    }

    public async Task<Post> GetById(int id)
    {
        return await _context.Posts.FindAsync(id);
    }

    public async Task<bool> Add(Post post)
    {
        try
        {
            await _context.Posts.AddAsync(post); // Thêm bài đăng mới
            await _context.SaveChangesAsync(); // Lưu thay đổi vào DB
            return true;
        }
        catch
        {
            return false; // Trả về false nếu có lỗi xảy ra
        }
    }

    public async Task<bool> AddPostWithMedia(Post post, List<Media> mediaFiles)
    {
        try
        {
            await _context.Posts.AddAsync(post);
            await _context.SaveChangesAsync();
            return true;
        }
        catch
        {
            return false;
        }
    }

    public async Task<bool> Update(Post post)
    {
        try
        {
            _context.Posts.Update(post); // Cập nhật bài đăng
            await _context.SaveChangesAsync(); // Lưu thay đổi vào DB
            return true;
        }
        catch
        {
            return false; // Trả về false nếu có lỗi xảy ra
        }
    }

    public async Task<bool> Delete(int id)
    {
        var post = await GetById(id);
        if (post == null)
        {
            return false; // Trả về false nếu bài đăng không tồn tại
        }

        _context.Posts.Remove(post); // Xóa bài đăng
        await _context.SaveChangesAsync(); // Lưu thay đổi vào DB
        return true;
    }
}