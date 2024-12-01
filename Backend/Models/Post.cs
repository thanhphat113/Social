using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Post
{
    public int PostId { get; set; }

    public string? Content { get; set; } = null;

    public int? PrivacyId { get; set; } = 1;

    public int? GroupId { get; set; } = null;

    public int CreatedByUserId { get; set; }
    public bool IsPictureProfile { get; set; }
    public bool? IsCoverPhoto { get; set; } = false;

    public DateTime? DateCreated { get; set; } = DateTime.Now;

    public DateTime DateUpdated { get; set; }

    public bool? IsVisible { get; set; } = false;


    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual User CreatedByUser { get; set; } = null!;

    public virtual UserGroup? Group { get; set; }

    public virtual ICollection<Media> Medias { get; set; }

    public virtual ICollection<PostNotification> PostNotifications { get; set; } = new List<PostNotification>();

    public virtual PrivacySetting? Privacy { get; set; }

    public virtual ICollection<SharePost> SharePosts { get; set; } = new List<SharePost>();
}
