using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class GroupChat
{
    public int GroupChatId { get; set; }

    public string GroupChatName { get; set; } = null!;

    public string? CoverPhoto { get; set; }

    public int MainTopic { get; set; }

    public virtual ICollection<ChatInGroup> ChatInGroups { get; set; } = new List<ChatInGroup>();

    public virtual MainTopic MainTopicNavigation { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
