// namespace Backend.Services;

// using Backend.Models;
// using Backend.Repositories;
// using Backend.DTO;

// public class PostService
// {
//     private readonly PostRepository _postRepository;

//     public PostService(PostRepository postRepository)
//     {
//         _postRepository = postRepository;
//     }

//     public async Task<List<PostDTO>> GetAllPost()
//     {
//         var posts = await _postRepository.GetAll();

//         return posts.Select(post => new PostDTO
//         {
//             PostId = post.PostId,
//             Content = post.Content,
//             DateCreated = post.DateCreated,
//             CreatedByUser = new UserDTO
//             {
//                 UserId = post.CreatedByUser.UserId,
//                 Name = $"{post.CreatedByUser.FirstName} {post.CreatedByUser.LastName}",
//                 Email = post.CreatedByUser.Email
//             },
//             ImageUrls = post.Media.Select(m => m.Src).ToList()
//         }).ToList();
//     }

//     public async Task<bool> AddPostWithMedia(Post post, List<Media> mediaFiles)
//     {
//         return await _postRepository.AddPostWithMedia(post, mediaFiles);
//     }

//     public async Task<Post> GetPostById(int id)
//     {
//         return await _postRepository.GetById(id);
//     }

//     public async Task<bool> AddPost(Post post)
//     {
//         return await _postRepository.Add(post);
//     }

//     public async Task<bool> UpdatePost(Post post)
//     {
//         return await _postRepository.Update(post);
//     }

//     public async Task<bool> DeletePost(int id)
//     {
//         return await _postRepository.Delete(id);
//     }
// }
