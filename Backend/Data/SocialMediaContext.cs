using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;
using Backend.Models;

namespace Backend.Data;

public partial class SocialMediaContext : DbContext
{
    public SocialMediaContext()
    {
    }

    public SocialMediaContext(DbContextOptions<SocialMediaContext> options)
        : base(options)
    {
    }


    public virtual DbSet<ChatInGroup> ChatInGroups { get; set; }

    public virtual DbSet<GenderType> Genders { get; set; }

    public virtual DbSet<ChatInMessage> ChatInMessages { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }


    public virtual DbSet<GroupChat> GroupChats { get; set; }

    public virtual DbSet<HistorySearch> HistorySearches { get; set; }

    public virtual DbSet<MainTopic> MainTopics { get; set; }

    public virtual DbSet<Media> Media { get; set; }

    public virtual DbSet<Message> Messages { get; set; }

    public virtual DbSet<Post> Posts { get; set; }
    public virtual DbSet<UserMedia> UserMedia { get; set; }

    public virtual DbSet<PostMedia> PostMedia { get; set; }

    public virtual DbSet<PostNotification> PostNotifications { get; set; }


    public virtual DbSet<PrivacySetting> PrivacySettings { get; set; }

    public virtual DbSet<ReactsComment> ReactsComments { get; set; }

    public virtual DbSet<ReactsPost> ReactsPosts { get; set; }

    public virtual DbSet<ReadMessage> ReadMessages { get; set; }

    public virtual DbSet<Relationship> Relationships { get; set; }

    public virtual DbSet<RequestNotification> RequestNotifications { get; set; }

    public virtual DbSet<SharePost> SharePosts { get; set; }

    public virtual DbSet<TypeMedia> TypeMedia { get; set; }

    public virtual DbSet<TypePostNotification> TypePostNotifications { get; set; }

    public virtual DbSet<TypeRelationship> TypeRelationships { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserGroup> UserGroups { get; set; }

    public virtual DbSet<UserInGroup> UserInGroups { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;database=SocialMedia;user=root", Microsoft.EntityFrameworkCore.ServerVersion.Parse("10.4.28-mariadb"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_general_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<ChatInGroup>(entity =>
        {
            entity.HasKey(e => e.ChatId).HasName("PRIMARY");

            entity.ToTable("chat_in_group");

            entity.HasIndex(e => e.GroupChatId, "fk_chat_in_group_group_chat_id");

            entity.HasIndex(e => e.FromUser, "fk_chat_in_group_user_id");

            entity.Property(e => e.ChatId)
                .HasColumnType("int(11)")
                .HasColumnName("chat_id");
            entity.Property(e => e.Content)
                .HasColumnType("text")
                .HasColumnName("content");
            entity.Property(e => e.DateCreated)
                .HasDefaultValueSql("current_timestamp()")
                .HasColumnType("timestamp")
                .HasColumnName("date_created");
            entity.Property(e => e.FromUser)
                .HasColumnType("int(11)")
                .HasColumnName("from_user");
            entity.Property(e => e.GroupChatId)
                .HasColumnType("int(11)")
                .HasColumnName("group_chat_id");

            entity.HasOne(d => d.FromUserNavigation).WithMany(p => p.ChatInGroups)
                .HasForeignKey(d => d.FromUser)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_group_user");

            entity.HasOne(d => d.GroupChat).WithMany(p => p.ChatInGroups)
                .HasForeignKey(d => d.GroupChatId)
                .HasConstraintName("fk_chat_in_group_group_chat_id");
        });

        modelBuilder.Entity<ChatInMessage>(entity =>
        {
            entity.HasKey(e => e.ChatId).HasName("PRIMARY");

            entity.ToTable("chat_in_message");

            entity.HasIndex(e => e.FromUser, "from_user");

            entity.HasIndex(e => e.MessagesId, "messages_id");

            entity.Property(e => e.ChatId)
                .HasColumnType("int(11)")
                .HasColumnName("chat_id");
            entity.Property(e => e.Content)
                .HasMaxLength(255)
                .HasColumnName("content");
            entity.Property(e => e.DateCreated)
                .HasColumnType("datetime")
                .HasColumnName("date_created");
            entity.Property(e => e.FromUser)
                .HasColumnType("int(11)")
                .HasColumnName("from_user");
            entity.Property(e => e.IsRead)
                .HasColumnType("tinyint(1)")
                .HasColumnName("is_read");
            entity.Property(e => e.IsRecall)
                .HasColumnType("tinyint(1)")
                .HasColumnName("is_recall");
            entity.Property(e => e.MessagesId)
                .HasColumnType("int(11)")
                .HasColumnName("messages_id");

            entity.HasOne(d => d.FromUserNavigation).WithMany(p => p.ChatInMessages)
                .HasForeignKey(d => d.FromUser)
                .HasConstraintName("chat_in_message_ibfk_1");

            entity.HasOne(d => d.Messages).WithMany(p => p.ChatInMessages)
                .HasForeignKey(d => d.MessagesId)
                .HasConstraintName("chat_in_message_ibfk_2");
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.CommentId).HasName("PRIMARY");

            entity.ToTable("comments");

            entity.HasIndex(e => e.ChildOf, "fk_child_of");

            entity.HasIndex(e => e.PostId, "fk_comments_post_id");

            entity.HasIndex(e => e.UserId, "fk_comments_user_id");

            entity.Property(e => e.CommentId)
                .HasColumnType("int(11)")
                .HasColumnName("comment_id");
            entity.Property(e => e.ChildOf)
                .HasColumnType("int(11)")
                .HasColumnName("child_of");
            entity.Property(e => e.Content)
                .HasColumnType("text")
                .HasColumnName("content");
            entity.Property(e => e.DateCreated)
                .HasDefaultValueSql("current_timestamp()")
                .HasColumnType("timestamp")
                .HasColumnName("date_created");
            entity.Property(e => e.DateUpdated)
                .HasDefaultValueSql("current_timestamp()")
                .HasColumnType("timestamp")
                .HasColumnName("date_updated");
            entity.Property(e => e.PostId)
                .HasColumnType("int(11)")
                .HasColumnName("post_id");
            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("user_id");

            entity.HasOne(d => d.ChildOfNavigation).WithMany(p => p.InverseChildOfNavigation)
                .HasForeignKey(d => d.ChildOf)
                .HasConstraintName("fk_child_of");

            entity.HasOne(d => d.Post).WithMany(p => p.Comments)
                .HasForeignKey(d => d.PostId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_comments_post_id");

            entity.HasOne(d => d.User).WithMany(p => p.Comments)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("fk_comments_user_id");
        });


        modelBuilder.Entity<GroupChat>(entity =>
        {
            entity.HasKey(e => e.GroupChatId).HasName("PRIMARY");

            entity.ToTable("group_chats");

            entity.HasIndex(e => e.MainTopic, "fk_topic_group");

            entity.Property(e => e.GroupChatId)
                .HasColumnType("int(11)")
                .HasColumnName("group_chat_id");
            entity.Property(e => e.CoverPhoto)
                .HasMaxLength(255)
                .HasColumnName("cover_photo");
            entity.Property(e => e.GroupChatName)
                .HasMaxLength(255)
                .HasColumnName("group_chat_name");
            entity.Property(e => e.MainTopic)
                .HasDefaultValueSql("'1'")
                .HasColumnType("int(11)")
                .HasColumnName("main_topic");

            entity.HasOne(d => d.MainTopicNavigation).WithMany(p => p.GroupChats)
                .HasForeignKey(d => d.MainTopic)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_topic_group");
        });

        modelBuilder.Entity<HistorySearch>(entity =>
        {
            entity.HasKey(e => e.HistoryId).HasName("PRIMARY");

            entity.ToTable("history_search");

            entity.HasIndex(e => e.FromUserId, "from_user");

            entity.HasIndex(e => e.OtherUserId, "other_user");

            entity.Property(e => e.HistoryId)
                .HasColumnType("int(11)")
                .HasColumnName("history_id");
            entity.Property(e => e.DateSearch)
                .HasDefaultValueSql("current_timestamp()")
                .HasColumnType("datetime")
                .HasColumnName("date_search");
            entity.Property(e => e.FromUserId)
                .HasColumnType("int(11)")
                .HasColumnName("from_user");
            entity.Property(e => e.OtherUserId)
                .HasColumnType("int(11)")
                .HasColumnName("other_user");

            entity.HasOne(d => d.FromUser).WithMany(p => p.HistorySearchFromUserNavigations)
                .HasForeignKey(d => d.FromUserId)
                .HasConstraintName("history_search_ibfk_2");

            entity.HasOne(d => d.OtherUser).WithMany(p => p.HistorySearchOtherUserNavigations)
                .HasForeignKey(d => d.OtherUserId)
                .HasConstraintName("history_search_ibfk_1");
        });

        modelBuilder.Entity<MainTopic>(entity =>
        {
            entity.HasKey(e => e.TopicId).HasName("PRIMARY");

            entity.ToTable("main_topic");

            entity.Property(e => e.TopicId)
                .HasColumnType("int(11)")
                .HasColumnName("topic_id");
            entity.Property(e => e.Color)
                .HasMaxLength(20)
                .HasColumnName("color");
            entity.Property(e => e.TopicName)
                .HasMaxLength(255)
                .HasColumnName("topic_name");
        });

        modelBuilder.Entity<Media>(entity =>
        {
            entity.HasKey(e => e.MediaId).HasName("PRIMARY");

            entity.ToTable("media");

            entity.HasIndex(e => e.MediaType, "fk_type_media");

            entity.Property(e => e.MediaId)
                .HasColumnType("int(11)")
                .HasColumnName("media_id");
            entity.Property(e => e.MediaType)
                .HasColumnType("int(11)")
                .HasColumnName("media_type");
            entity.Property(e => e.Src)
                .HasMaxLength(255)
                .HasColumnName("src");

            entity.HasOne(d => d.MediaTypeNavigation).WithMany(p => p.Media)
                .HasForeignKey(d => d.MediaType)
                .HasConstraintName("fk_type_media");

        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.HasKey(e => e.MessagesId).HasName("PRIMARY");

            entity.ToTable("messages");

            entity.HasIndex(e => e.MainTopic, "fk_topic_main");

            entity.HasIndex(e => e.User1, "user_1");

            entity.HasIndex(e => e.User2, "user_2");

            entity.Property(e => e.MessagesId)
                .HasColumnType("int(11)")
                .HasColumnName("messages_id");
            entity.Property(e => e.MainTopic)
                .HasDefaultValueSql("'1'")
                .HasColumnType("int(11)")
                .HasColumnName("main_topic");
            entity.Property(e => e.User1)
                .HasColumnType("int(11)")
                .HasColumnName("user_1");
            entity.Property(e => e.NickName1)
                .HasMaxLength(255)
                .HasColumnName("nickname_1");
            entity.Property(e => e.NickName2)
                .HasMaxLength(255)
                .HasColumnName("nickname_2");
            entity.Property(e => e.User2)
                .HasColumnType("int(11)")
                .HasColumnName("user_2");

            entity.HasOne(d => d.MainTopicNavigation).WithMany(p => p.Messages)
                .HasForeignKey(d => d.MainTopic)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_topic_main");

            entity.HasOne(d => d.User1Navigation).WithMany(p => p.MessageUser1Navigations)
                .HasForeignKey(d => d.User1)
                .HasConstraintName("messages_ibfk_1");

            entity.HasOne(d => d.User2Navigation).WithMany(p => p.MessageUser2Navigations)
                .HasForeignKey(d => d.User2)
                .HasConstraintName("messages_ibfk_2");
        });

        modelBuilder.Entity<Post>(entity =>
        {
            entity.HasKey(e => e.PostId).HasName("PRIMARY");

            entity.ToTable("posts");

            entity.HasIndex(e => e.GroupId, "fk_posts_group_id");

            entity.HasIndex(e => e.PrivacyId, "fk_posts_privacy_id");

            entity.HasIndex(e => e.CreatedByUserId, "idx_created_by_user_id_posts");

            entity.Property(e => e.PostId)
                .HasColumnType("int(11)")
                .HasColumnName("post_id");
            entity.Property(e => e.Content)
                .HasColumnType("text")
                .HasColumnName("content");
            entity.Property(e => e.CreatedByUserId)
                .HasColumnType("int(11)")
                .HasColumnName("created_by_user_id");
            entity.Property(e => e.DateCreated)
                .HasDefaultValueSql("current_timestamp()")
                .HasColumnType("timestamp")
                .HasColumnName("date_created");
            entity.Property(e => e.DateUpdated)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("current_timestamp()")
                .HasColumnType("timestamp")
                .HasColumnName("date_updated");
            entity.Property(e => e.GroupId)
                .HasColumnType("int(11)")
                .HasColumnName("group_id");
            entity.Property(e => e.PrivacyId)
                .HasColumnType("int(11)")
                .HasColumnName("privacy_id");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.Posts)
                .HasForeignKey(d => d.CreatedByUserId)
                .HasConstraintName("fk_posts_created_by_user_id");

            entity.HasOne(d => d.Group).WithMany(p => p.Posts)
                .HasForeignKey(d => d.GroupId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("fk_posts_group_id");

            entity.HasOne(d => d.Privacy).WithMany(p => p.Posts)
                .HasForeignKey(d => d.PrivacyId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("fk_posts_privacy_id");
        });

        modelBuilder.Entity<UserMedia>(entity =>
        {
            entity.HasKey(ui => new { ui.MediaId, ui.UserId });
            entity.ToTable("user_media");

            entity.HasIndex(e => e.MediaId, "fk_user_media_media_id");

            entity.HasIndex(e => e.UserId, "fk_user_media_user_id");

            entity.Property(e => e.MediaId)
                .HasColumnType("int(11)")
                .HasColumnName("media_id");
            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("user_id");
            entity.Property(e => e.IsProfilePicture)
                .HasColumnType("tinyint(1)")
                .HasColumnName("is_profile_picture");
            entity.Property(e => e.IsCoverPicture)
                .HasColumnType("tinyint(1)")
                .HasColumnName("is_cover_picture");

            entity.HasOne(d => d.Media).WithMany(m => m.UserMedia)
                .HasForeignKey(d => d.MediaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_user_media_media_id");

            entity.HasOne(d => d.User).WithMany(p => p.UserMedia)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_user_media_user_id");

            entity.HasIndex(ui => new { ui.UserId, ui.IsProfilePicture })
            .IsUnique()
            .HasFilter("[is_profile_picture] = 1");

            entity.HasIndex(ui => new { ui.UserId, ui.IsCoverPicture })
            .IsUnique()
            .HasFilter("[is_cover_picture] = 1");
        });

        modelBuilder.Entity<PostMedia>(entity =>
        {
            entity.HasKey(ui => new { ui.MediaId, ui.PostId });
            entity.ToTable("post_media");

            entity.HasIndex(e => e.MediaId, "fk_media");

            entity.HasIndex(e => e.PostId, "fk_post");

            entity.Property(e => e.MediaId)
                .HasColumnType("int(11)")
                .HasColumnName("media_id");
            entity.Property(e => e.PostId)
                .HasColumnType("int(11)")
                .HasColumnName("post_id");

            entity.HasOne(d => d.Media).WithMany(m => m.PostMedia)
                .HasForeignKey(d => d.MediaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_media");

            entity.HasOne(d => d.Post).WithMany(p => p.PostMedia)
                .HasForeignKey(d => d.PostId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_post");
        });

        modelBuilder.Entity<PostNotification>(entity =>
        {
            entity.HasKey(e => e.PostNotificationId).HasName("PRIMARY");

            entity.ToTable("post_notifications");

            entity.HasIndex(e => e.FromUserId, "fk_post_notifications_from_user_id");

            entity.HasIndex(e => e.PostId, "fk_post_notifications_post_id");

            entity.HasIndex(e => e.TypeId, "fk_post_notifications_type");

            entity.Property(e => e.PostNotificationId)
                .HasColumnType("int(11)")
                .HasColumnName("post_notification_id");
            entity.Property(e => e.DateCreated)
                .HasDefaultValueSql("current_timestamp()")
                .HasColumnType("timestamp")
                .HasColumnName("date_created");
            entity.Property(e => e.FromUserId)
                .HasColumnType("int(11)")
                .HasColumnName("from_user_id");
            entity.Property(e => e.PostId)
                .HasColumnType("int(11)")
                .HasColumnName("post_id");
            entity.Property(e => e.TypeId)
                .HasColumnType("int(11)")
                .HasColumnName("type_id");
            entity.Property(e => e.IsRead)
                .HasColumnType("tinyint(1)")
                .HasColumnName("is_read");

            entity.HasOne(d => d.FromUser).WithMany(p => p.PostNotifications)
                .HasForeignKey(d => d.FromUserId)
                .HasConstraintName("fk_post_notifications_from_user_id");

            entity.HasOne(d => d.Post).WithMany(p => p.PostNotifications)
                .HasForeignKey(d => d.PostId)
                .HasConstraintName("fk_post_notifications_post_id");

            entity.HasOne(d => d.Type).WithMany(p => p.PostNotifications)
                .HasForeignKey(d => d.TypeId)
                .HasConstraintName("fk_post_notifications_type");
        });


        modelBuilder.Entity<PrivacySetting>(entity =>
        {
            entity.HasKey(e => e.PrivacyId).HasName("PRIMARY");

            entity.ToTable("privacy_settings");

            entity.Property(e => e.PrivacyId)
                .HasColumnType("int(11)")
                .HasColumnName("privacy_id");
            entity.Property(e => e.PrivacyName)
                .HasMaxLength(255)
                .HasColumnName("privacy_name");
        });

        modelBuilder.Entity<ReactsComment>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PRIMARY");

            entity.ToTable("reacts_comment");

            entity.HasIndex(e => e.CommentId, "fk_reacts_comment_comment_id");

            entity.Property(e => e.UserId)
                .ValueGeneratedNever()
                .HasColumnType("int(11)")
                .HasColumnName("user_id");
            entity.Property(e => e.CommentId)
                .HasColumnType("int(11)")
                .HasColumnName("comment_id");

            entity.HasOne(d => d.Comment).WithMany(p => p.ReactsComments)
                .HasForeignKey(d => d.CommentId)
                .HasConstraintName("fk_reacts_comment_comment_id");

            entity.HasOne(d => d.User).WithOne(p => p.ReactsComment)
                .HasForeignKey<ReactsComment>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_user_cloud");
        });

        modelBuilder.Entity<ReactsPost>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("reacts_post");

            entity.HasIndex(e => e.PostId, "fk_reacts_post_post_id");

            entity.HasIndex(e => e.UserId, "fk_reacts_post_user_id");

            entity.Property(e => e.PostId)
                .HasColumnType("int(11)")
                .HasColumnName("post_id");
            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("user_id");

            entity.HasOne(d => d.Post).WithMany()
                .HasForeignKey(d => d.PostId)
                .HasConstraintName("fk_reacts_post_post_id");

            entity.HasOne(d => d.User).WithMany()
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("fk_reacts_post_user_id");
        });

        modelBuilder.Entity<ReadMessage>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("read_message");

            entity.HasIndex(e => e.MessagesId, "messages_id");

            entity.HasIndex(e => e.UserId, "user_id");

            entity.Property(e => e.IsRead)
                .HasDefaultValueSql("'0'")
                .HasColumnName("is_read");
            entity.Property(e => e.MessagesId)
                .HasColumnType("int(11)")
                .HasColumnName("messages_id");
            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("user_id");

            entity.HasOne(d => d.Messages).WithMany()
                .HasForeignKey(d => d.MessagesId)
                .HasConstraintName("read_message_ibfk_2");

            entity.HasOne(d => d.User).WithMany()
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("read_message_ibfk_1");
        });

        modelBuilder.Entity<Relationship>(entity =>
        {
            entity.HasKey(e => e.RelationshipId).HasName("PRIMARY");

            entity.ToTable("relationship");

            entity.HasIndex(e => e.ToUserId, "fk_relationship_to_user_id");

            entity.HasIndex(e => e.TypeRelationship, "fk_type_relationship");

            entity.HasIndex(e => new { e.FromUserId, e.ToUserId }, "from_user_id").IsUnique();

            entity.Property(e => e.RelationshipId)
                .HasColumnType("int(11)")
                .HasColumnName("relationship_id");
            entity.Property(e => e.DateCreated)
                .HasDefaultValueSql("current_timestamp()")
                .HasColumnType("timestamp")
                .HasColumnName("date_created");
            entity.Property(e => e.FromUserId)
                .HasColumnType("int(11)")
                .HasColumnName("from_user_id");
            entity.Property(e => e.ToUserId)
                .HasColumnType("int(11)")
                .HasColumnName("to_user_id");
            entity.Property(e => e.TypeRelationship)
                .HasDefaultValueSql("'0'")
                .HasColumnType("int(1)")
                .HasColumnName("type_relationship");

            entity.HasOne(d => d.FromUser).WithMany(p => p.RelationshipFromUsers)
                .HasForeignKey(d => d.FromUserId)
                .HasConstraintName("fk_relationship_from_user_id");

            entity.HasOne(d => d.ToUser).WithMany(p => p.RelationshipToUsers)
                .HasForeignKey(d => d.ToUserId)
                .HasConstraintName("fk_relationship_to_user_id");

            entity.HasOne(d => d.TypeRelationshipNavigation).WithMany(p => p.Relationships)
                .HasForeignKey(d => d.TypeRelationship)
                .HasConstraintName("fk_type_relationship");
        });

        modelBuilder.Entity<RequestNotification>(entity =>
        {
            entity.HasKey(e => e.NotificationId).HasName("PRIMARY");

            entity.ToTable("request_notifications");

            entity.HasIndex(e => e.FromUserId, "fk_request_notifications_from_user_id");

            entity.HasIndex(e => e.ToUserId, "fk_request_notifications_to_user_id");

            entity.Property(e => e.NotificationId)
                .HasColumnType("int(11)")
                .HasColumnName("notification_id");
            entity.Property(e => e.DateCreated)
                .HasDefaultValueSql("current_timestamp()")
                .HasColumnType("timestamp")
                .HasColumnName("date_created");
            entity.Property(e => e.FromUserId)
                .HasColumnType("int(11)")
                .HasColumnName("from_user_id");
            entity.Property(e => e.IsAccept)
                .HasDefaultValueSql("'0'")
                .HasColumnName("is_accept");
            entity.Property(e => e.IsRead)
                .HasDefaultValueSql("'0'")
                .HasColumnName("is_read");
            entity.Property(e => e.ToUserId)
                .HasColumnType("int(11)")
                .HasColumnName("to_user_id");

            entity.HasOne(d => d.FromUser).WithMany(p => p.RequestNotificationFromUsers)
                .HasForeignKey(d => d.FromUserId)
                .HasConstraintName("fk_request_notifications_from_user_id");

            entity.HasOne(d => d.ToUser).WithMany(p => p.RequestNotificationToUsers)
                .HasForeignKey(d => d.ToUserId)
                .HasConstraintName("fk_request_notifications_to_user_id");
        });

        modelBuilder.Entity<SharePost>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.PostId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

            entity.ToTable("share_posts");

            entity.HasIndex(e => e.PostId, "fk_share_posts_post_id");

            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("user_id");
            entity.Property(e => e.PostId)
                .HasColumnType("int(11)")
                .HasColumnName("post_id");
            entity.Property(e => e.DateShare)
                .HasDefaultValueSql("current_timestamp()")
                .HasColumnType("timestamp")
                .HasColumnName("date_share");

            entity.HasOne(d => d.Post).WithMany(p => p.SharePosts)
                .HasForeignKey(d => d.PostId)
                .HasConstraintName("fk_share_posts_post_id");

            entity.HasOne(d => d.User).WithMany(p => p.SharePosts)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("fk_share_posts_user_id");
        });

        modelBuilder.Entity<TypeMedia>(entity =>
        {
            entity.HasKey(e => e.TypeId).HasName("PRIMARY");

            entity.ToTable("type_media");

            entity.Property(e => e.TypeId)
                .HasColumnType("int(11)")
                .HasColumnName("type_id");
            entity.Property(e => e.TypeName)
                .HasMaxLength(255)
                .HasColumnName("type_name");
        });

        modelBuilder.Entity<TypePostNotification>(entity =>
        {
            entity.HasKey(e => e.TypeId).HasName("PRIMARY");

            entity.ToTable("type_post_notifications");

            entity.Property(e => e.TypeId)
                .HasColumnType("int(11)")
                .HasColumnName("type_id");
            entity.Property(e => e.Content)
                .HasMaxLength(255)
                .HasColumnName("content");
            entity.Property(e => e.TypeName)
                .HasMaxLength(255)
                .HasColumnName("type_name");
        });

        modelBuilder.Entity<TypeRelationship>(entity =>
        {
            entity.HasKey(e => e.TypeId).HasName("PRIMARY");

            entity.ToTable("type_relationship");

            entity.Property(e => e.TypeId)
                .HasColumnType("int(11)")
                .HasColumnName("type_id");
            entity.Property(e => e.TypeName)
                .HasMaxLength(255)
                .HasColumnName("type_name");
        });


        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PRIMARY");

            entity.ToTable("users");

            entity.HasIndex(e => e.Email, "idx_username").IsUnique();

            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("user_id");
            entity.Property(e => e.Bio)
                .HasColumnType("text")
                .HasColumnName("bio");
            entity.Property(e => e.DateCreated)
                .HasDefaultValueSql("current_timestamp()")
                .HasColumnType("timestamp")
                .HasColumnName("date_created");
            entity.Property(e => e.DateUpdated)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("current_timestamp()")
                .HasColumnType("timestamp")
                .HasColumnName("date_updated");
            entity.Property(e => e.Email)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(255)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(255)
                .HasColumnName("last_name");
            entity.Property(e => e.Location)
                .HasMaxLength(255)
                .HasColumnName("location");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.GenderId)
                .HasColumnType("int(1)")
                .HasColumnName("gender_id");
            entity.Property(e => e.IsOnline)
                .HasColumnType("tinyint(1)")
                .HasColumnName("is_online");



            entity.HasOne(d => d.Gender).WithMany(g => g.Users)
                .HasForeignKey(d => d.GenderId)
                .HasConstraintName("fk_gender");

            entity.HasMany(d => d.GroupChats).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "UserInGroupChat",
                    r => r.HasOne<GroupChat>().WithMany()
                        .HasForeignKey("GroupChatId")
                        .HasConstraintName("fk_user_in_group_chat_group_chat_id"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .HasConstraintName("fk_user_in_group_chat_user_id"),
                    j =>
                    {
                        j.HasKey("UserId", "GroupChatId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("user_in_group_chat");
                        j.HasIndex(new[] { "GroupChatId" }, "fk_user_in_group_chat_group_chat_id");
                        j.IndexerProperty<int>("UserId")
                            .HasColumnType("int(11)")
                            .HasColumnName("user_id");
                        j.IndexerProperty<int>("GroupChatId")
                            .HasColumnType("int(11)")
                            .HasColumnName("group_chat_id");
                    });
        });

        modelBuilder.Entity<UserGroup>(entity =>
        {
            entity.HasKey(e => e.GroupId).HasName("PRIMARY");

            entity.ToTable("user_groups");

            entity.HasIndex(e => e.PrivacyId, "fk_user_groups_privacy_id");

            entity.HasIndex(e => e.CreatedByUserId, "idx_created_by_user_id");

            entity.Property(e => e.GroupId)
                .HasColumnType("int(11)")
                .HasColumnName("group_id");
            entity.Property(e => e.Bio)
                .HasColumnType("text")
                .HasColumnName("bio");
            entity.Property(e => e.CoverPhoto)
                .HasMaxLength(255)
                .HasColumnName("cover_photo");
            entity.Property(e => e.CreatedByUserId)
                .HasColumnType("int(11)")
                .HasColumnName("created_by_user_id");
            entity.Property(e => e.DateCreated)
                .HasDefaultValueSql("current_timestamp()")
                .HasColumnType("timestamp")
                .HasColumnName("date_created");
            entity.Property(e => e.DateUpdated)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("current_timestamp()")
                .HasColumnType("timestamp")
                .HasColumnName("date_updated");
            entity.Property(e => e.GroupName)
                .HasMaxLength(255)
                .HasColumnName("group_name");
            entity.Property(e => e.MemberCount)
                .HasDefaultValueSql("'0'")
                .HasColumnType("int(11)")
                .HasColumnName("member_count");
            entity.Property(e => e.PrivacyId)
                .HasColumnType("int(11)")
                .HasColumnName("privacy_id");
            entity.Property(e => e.ProfilePicture)
                .HasMaxLength(255)
                .HasColumnName("profile_picture");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.UserGroups)
                .HasForeignKey(d => d.CreatedByUserId)
                .HasConstraintName("fk_user_groups_created_by_user_id");

            entity.HasOne(d => d.Privacy).WithMany(p => p.UserGroups)
                .HasForeignKey(d => d.PrivacyId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("fk_user_groups_privacy_id");
        });

        modelBuilder.Entity<GenderType>(entity =>
        {
            entity.HasKey(e => e.GenderId);
            entity.ToTable("gender_type");

            entity.Property(e => e.GenderId)
                .HasColumnType("int(11)")
                .HasColumnName("gender_id");
            entity.Property(e => e.GenderName)
                .HasColumnType("text")
                .HasColumnName("gender_name");
        });

        modelBuilder.Entity<UserInGroup>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.GroupId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

            entity.ToTable("user_in_group");

            entity.HasIndex(e => e.GroupId, "fk_user_in_group_group_id");

            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("user_id");
            entity.Property(e => e.GroupId)
                .HasColumnType("int(11)")
                .HasColumnName("group_id");
            entity.Property(e => e.DateIn)
                .HasDefaultValueSql("current_timestamp()")
                .HasColumnType("timestamp")
                .HasColumnName("date_in");

            entity.HasOne(d => d.Group).WithMany(p => p.UserInGroups)
                .HasForeignKey(d => d.GroupId)
                .HasConstraintName("fk_user_in_group_group_id");

            entity.HasOne(d => d.User).WithMany(p => p.UserInGroups)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("fk_user_in_group_user_id");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}