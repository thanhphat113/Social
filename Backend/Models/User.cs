using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models;

public partial class User
{
    public int UserId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Bio { get; set; }

    public string? Location { get; set; }

    public int? ProfilePicture { get; set; }

    public int? CoverPhoto { get; set; }

    public int? GenderId { get; set; }

    public DateTime DateCreated { get; set; }

    public DateTime DateUpdated { get; set; }

    [JsonIgnore]
    public virtual ICollection<ChatInGroup> ChatInGroups { get; set; } = new List<ChatInGroup>();
    [JsonIgnore]
    public virtual ICollection<ChatInMessage> ChatInMessages { get; set; } = new List<ChatInMessage>();
    [JsonIgnore]
    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
    [JsonIgnore]
    public virtual Media? CoverPhotoNavigation { get; set; }
    [JsonIgnore]
    public virtual GenderType? Gender { get; set; }
    [JsonIgnore]
    public virtual ICollection<HistorySearch> HistorySearchFromUserNavigations { get; set; } = new List<HistorySearch>();
    [JsonIgnore]
    public virtual ICollection<HistorySearch> HistorySearchOtherUserNavigations { get; set; } = new List<HistorySearch>();
    [JsonIgnore]
    public virtual ICollection<Message> MessageUser1Navigations { get; set; } = new List<Message>();
    [JsonIgnore]
    public virtual ICollection<Message> MessageUser2Navigations { get; set; } = new List<Message>();
    [JsonIgnore]
    public virtual ICollection<PostNotification> PostNotifications { get; set; } = new List<PostNotification>();
    [JsonIgnore]
    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();
    [JsonIgnore]
    public virtual Media? ProfilePictureNavigation { get; set; }
    [JsonIgnore]
    public virtual ReactsComment? ReactsComment { get; set; }
    [JsonIgnore]
    public virtual ICollection<Relationship> RelationshipFromUsers { get; set; } = new List<Relationship>();
    [JsonIgnore]
    public virtual ICollection<Relationship> RelationshipToUsers { get; set; } = new List<Relationship>();
    [JsonIgnore]
    public virtual ICollection<RequestNotification> RequestNotificationFromUsers { get; set; } = new List<RequestNotification>();
    [JsonIgnore]
    public virtual ICollection<RequestNotification> RequestNotificationToUsers { get; set; } = new List<RequestNotification>();
    [JsonIgnore]
    public virtual ICollection<SharePost> SharePosts { get; set; } = new List<SharePost>();
    [JsonIgnore]
    public virtual ICollection<UserGroup> UserGroups { get; set; } = new List<UserGroup>();
    [JsonIgnore]
    public virtual ICollection<UserInGroup> UserInGroups { get; set; } = new List<UserInGroup>();
    [JsonIgnore]
    public virtual ICollection<GroupChat> GroupChats { get; set; } = new List<GroupChat>();
    [JsonIgnore]
    public virtual ICollection<Media> Media { get; set; } = new List<Media>();
}
