using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class ChatInGroup
{
    public int ChatId { get; set; }

    public int FromUser { get; set; }

    public int GroupChatId { get; set; }

    public string? Content { get; set; } = null!;

    public int? MediaId { get; set; } = null;

    public bool? IsRead { get; set; } = false;
    public bool? IsRecall { get; set; } = false;

    public DateTime? DateCreated { get; set; } = DateTime.Now;
    public int Otheruser { get; set; }


    public virtual User FromUserNavigation { get; set; } = null!;

    public virtual GroupChat GroupChat { get; set; } = null!;
    public virtual Media Media { get; set; } = null;

}
