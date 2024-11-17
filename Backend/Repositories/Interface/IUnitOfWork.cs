using Backend.Models;

namespace Backend.Repositories.Interface;
public interface IUnitOfWork : IDisposable
{
	IGenericRepository<User> Users { get; }
	IGenericRepository<ChatInMessage> ChatInMessage { get; }
	IGenericRepository<GroupChat> GroupChat { get; }
	IGenericRepository<HistorySearch> HistorySearch { get; }
	IGenericRepository<Message> Message { get; }
	IGenericRepository<PostNotification> PostNotification { get; }
	IGenericRepository<RequestNotification> RequestNotification { get; }
	IGenericRepository<Relationship> Relationship { get; }
	IGenericRepository<Media> Media { get; }
	IGenericRepository<UserMedia> UserMedia { get; }

	Task<bool> CompleteAsync();
}