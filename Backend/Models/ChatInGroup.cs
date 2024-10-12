using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class ChatInGroup
{
    public int ChatId { get; set; }

    public int FromUser { get; set; }

    public int GroupChatId { get; set; }

    public string Content { get; set; } = null!;

    public DateTime DateCreated { get; set; }

    public virtual User FromUserNavigation { get; set; } = null!;

    public virtual GroupChat GroupChat { get; set; } = null!;
}
