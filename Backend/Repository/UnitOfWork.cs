
using Backend.Models;
using Backend.Data;
using Backend.Repository.Interface;

namespace Backend.Repository
{
	public class UnitOfWork : IUnitOfWork
	{
		private readonly SocialMediaContext _context;

		// Khai báo các repository riêng tư
		private readonly IGenericRepository<User> _Users;
		private readonly IGenericRepository<ChatInMessage> _ChatInMessage;
		private readonly IGenericRepository<HistorySearch> _HistorySearch;
		private readonly IGenericRepository<Message> _Message;
		private readonly IGenericRepository<Media> _Media;
		private readonly IGenericRepository<MainTopic> _main;
		private readonly IGenericRepository<PostNotification> _PostNotification;
		private readonly IGenericRepository<RequestNotification> _RequestNotification;
		private readonly IGenericRepository<Relationship> _Relationship;
		private readonly IGenericRepository<Post> _post;
		private readonly IGenericRepository<PostMedia> _postMedia;
		private readonly IGenericRepository<ReactsPost> _reactPost;

		private readonly IGenericRepository<UserGroup> _userGroup;
		private readonly IGenericRepository<Comment> _comment;
		private IGenericRepository<ReactsComment> _reactComment;

		public UnitOfWork(SocialMediaContext context,
						  IGenericRepository<User> Users,
						  IGenericRepository<ChatInMessage> ChatInMessage,
						  IGenericRepository<HistorySearch> HistorySearch,
						  IGenericRepository<Message> Message,
						  IGenericRepository<PostNotification> PostNotification,
						  IGenericRepository<RequestNotification> RequestNotification,
						  IGenericRepository<Relationship> Relationship,
						  IGenericRepository<Media> Media,
						  IGenericRepository<MainTopic> main,
						  IGenericRepository<Post> post,
						  IGenericRepository<UserGroup> userGroup,
						  IGenericRepository<PostMedia> postMedia,
						  IGenericRepository<ReactsPost> reactPost,
						  IGenericRepository<Comment> comment,
						  IGenericRepository<ReactsComment> reactComment)
		{
			_context = context;
			_main = main;
			_Users = Users;
			_post = post;
			_ChatInMessage = ChatInMessage;
			_HistorySearch = HistorySearch;
			_Message = Message;
			_PostNotification = PostNotification;
			_RequestNotification = RequestNotification;
			_Relationship = Relationship;
			_Media = Media;
			_userGroup = userGroup;
			//_postMedia = postMedia;
			_reactPost = reactPost;
			_comment = comment;
			_reactComment = reactComment;
		}

		// Các property chỉ đọc cho các repository
		public IGenericRepository<User> Users => _Users;
		public IGenericRepository<ChatInMessage> ChatInMessage => _ChatInMessage;
		public IGenericRepository<HistorySearch> HistorySearch => _HistorySearch;
		public IGenericRepository<Message> Message => _Message;
		public IGenericRepository<Media> Media => _Media;
		public IGenericRepository<MainTopic> MainTopic => _main;
		// public IGenericRepository<PostMedia> PostMedia => _postMedia;


		public IGenericRepository<PostNotification> PostNotification => _PostNotification;
		public IGenericRepository<RequestNotification> RequestNotification => _RequestNotification;
		public IGenericRepository<Relationship> Relationship => _Relationship;
		public IGenericRepository<ReactsPost> ReactsPost => _reactPost;
		public IGenericRepository<Comment> Comment => _comment;
		public IGenericRepository<ReactsComment> ReactsComment => _reactComment;
		public IGenericRepository<Post> Post => _post;
		public IGenericRepository<UserGroup> UserGroup => _userGroup;

		// Phương thức SaveChanges
		public async Task<bool> CompleteAsync()
		{
			var result = await _context.SaveChangesAsync();
			return result > 0;
		}

		public void Dispose()
		{
			_context.Dispose();
			GC.SuppressFinalize(this);
		}
	}
}
