using Backend.Models;

namespace Backend.Repository.Interface;
public interface IUnitOfWork : IDisposable
{
	IGenericRepository<User> Users { get; }
	IGenericRepository<ChatInMessage> ChatInMessage { get; }
	IGenericRepository<HistorySearch> HistorySearch { get; }
	IGenericRepository<Message> Message { get; }
	IGenericRepository<MainTopic> MainTopic { get; }

	IGenericRepository<PostNotification> PostNotification { get; }
	IGenericRepository<RequestNotification> RequestNotification { get; }
	IGenericRepository<Relationship> Relationship { get; }
	IGenericRepository<Media> Media { get; }
	IGenericRepository<UserGroup> UserGroup { get; }
	IGenericRepository<Post> Post { get; }
	IGenericRepository<PostMedia> PostMedia { get; }
	IGenericRepository<ReactsPost> ReactsPost { get; }
	IGenericRepository<Comment> Comment { get; }
	IGenericRepository<ReactsComment> ReactsComment { get; }

	Task<bool> CompleteAsync();
}