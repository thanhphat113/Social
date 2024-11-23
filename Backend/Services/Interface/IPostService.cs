using Backend.Models;

namespace Backend.Services.Interface
{
    public interface IPostService : IService<Post>
    {
	    Task<IEnumerable<Post>> GetAllPostsWithMedia();
    }
}