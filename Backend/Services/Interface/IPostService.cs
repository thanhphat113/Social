using Backend.Models;

namespace Backend.Services.Interface
{
    public interface IPostService : IService<Post>
    {
	    Task<IEnumerable<Post>> GetAllPostsWithMedia();
        Task<bool> CreatePostWithMedia(Post post, List<IFormFile> files);
        Task<bool> UpdatePost(Post post);
        Task<bool> GetLikesUser(int postId, int userId);
        Task<int> GetLikesCount(int postId);
        Task<int> GetCommentCount(int postId);
        Task<bool> RemoveLike(int postId, int userId);
        Task<bool> AddLike(int postId, int userId);

        Task<IEnumerable<Post>> GetPostsByCreatedByUserId(int userId);
        Task<int?> GetProfilePicturePostId(int userId);
        Task<int?> GetCoverPhotoPostId(int userId);
        Task<IEnumerable<Post>> SearchPostByUserNameAsync(string searchTerm);
        Task<List<string>> GetProfileUser(int userId);

    }
}