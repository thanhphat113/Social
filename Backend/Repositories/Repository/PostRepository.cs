// namespace Backend.Repositories
// {
//     using Microsoft.EntityFrameworkCore;
//     using Backend.Data;
//     using Backend.Models;
//     using Backend.Repositories.Interface;
//     using Backend.DTO;
//     using Microsoft.AspNetCore.Http.HttpResults;

//     public class PostRepository : IPostRepository
//     {
//         private readonly SocialMediaContext _context;

//         public PostRepository(SocialMediaContext context)
//         {
//             _context = context;
//         }

//         public async Task<List<PostDTO>> GetAllUser()
//         {
//             try
//             {
//                 return await _context.Posts
//                 .Select(post => new PostDTO
//                 {
//                     PostId = post.PostId,
//                     Content = post.Content,
//                     DateCreated = post.DateCreated,
//                     CreatedByUserId = post.CreatedByUserId,
//                     CreatedByUser = new UserDTO
//                     {
//                         UserId = post.CreatedByUser.UserId,
//                         FirstName = post.CreatedByUser.FirstName,
//                         LastName = post.CreatedByUser.LastName,
//                         ProfilePicture = post.CreatedByUser.ProfilePicture,
//                     },
//                     Media = post.Media.Select(media => new MediaDTO
//                     {
//                         MediaId = media.MediaId,
//                         Src = media.Src
//                     }).ToList(),
//                     Comments = post.Comments.Select(comment => new CommentDTO
//                     {
//                         CommentId = comment.CommentId,
//                         Content = comment.Content,
//                         DateCreated = comment.DateCreated
//                     }).ToList()
//                 }).ToListAsync();
//             }
//             catch (Exception ex)
//             {
//                 // Log exception here
//                 return new List<PostDTO>(); // Return an empty list if error occurs
//             }
//         }

//         public async Task<PostDTO> GetById(int id)
//         {
//             var post = await _context.Posts
//             .Where(p => p.PostId == id)
//             .Select(p => new PostDTO
//             {
//                 PostId = p.PostId,
//                 Content = p.Content,
//                 DateCreated = p.DateCreated,
//                 CreatedByUserId = p.CreatedByUserId,
//                 Media = p.Media.Select(m => new MediaDTO
//                 {
//                     MediaId = m.MediaId,
//                     Src = m.Src
//                 }).ToList(),
//                 Comments = p.Comments.Select(c => new CommentDTO
//                 {
//                     CommentId = c.CommentId,
//                     Content = c.Content,
//                     DateCreated = c.DateCreated
//                 }).ToList()
//             }).FirstOrDefaultAsync();

//             return post;
//         }

//         public async Task<bool> Add(PostDTO post)
//         {
//             var entity = new Post
//             {
//                 Content = post.Content,
//                 DateCreated = post.DateCreated,
//                 CreatedByUserId = post.CreatedByUserId
//             };

//             _context.Posts.Add(entity);
//             await _context.SaveChangesAsync();
//             return  true;
//         }

//         public async Task<bool> AddPostWithMedia(PostDTO postDTO, List<MediaDTO> mediaFiles)
//         {
//             using var transaction = await _context.Database.BeginTransactionAsync();
//             try
//             {

//                 var post = new Post
//                 {
//                     CreatedByUserId = postDTO.CreatedByUser.UserId,
//                     Content = postDTO.Content,
//                     DateCreated = DateTime.Now
//                 };

//                 _context.Posts.Add(post);
//                 await _context.SaveChangesAsync();

//                 foreach (var media in mediaFiles)
//                 {
//                     var newMedia = new Media
//                     {
//                         PostId = post.PostId,
//                         Src = media.Src,
//                         MediaType = media.MediaType,
//                     };

//                     _context.Media.Add(newMedia);
//                 }

//                 await _context.SaveChangesAsync();

//                 await transaction.CommitAsync();
//                 return true;
//             }
//             catch (Exception ex)
//             {
//                 await transaction.RollbackAsync();
//                 return false;
//             }
//         }

//         public async Task<bool> Update(int id, PostDTO postDTO)
//         {
//             try
//             {
//                 var post = await _context.Posts.FindAsync(id);
//                 if (post == null)
//                 {
//                     return false; // Không tìm thấy bài viết
//                 }

//                 // Cập nhật các trường cần thiết
//                 post.Content = postDTO.Content;
//                 post.DateCreated = postDTO.DateCreated;

//                 _context.Posts.Update(post);
//                 await _context.SaveChangesAsync();
//                 return true;
//             }
//             catch (Exception ex)
//             {
//                 // Ghi log lỗi
//                 throw new Exception("Error while updating post", ex);
//             }
//         }

//         //public async Task<bool> Delete(int id)
//         //{
//         //    var post = await GetById(id);
//         //    if (post == null)
//         //    {
//         //        return false; // Trả về false nếu bài đăng không tồn tại
//         //    }

//         //    _context.Posts.Remove(post); // Xóa bài đăng
//         //    await _context.SaveChangesAsync(); // Lưu thay đổi vào DB
//         //    return true;
//         //}
//     }
// }
