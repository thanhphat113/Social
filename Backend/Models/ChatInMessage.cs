using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class ChatInMessage
{
    public int ChatId { get; set; }

    public int? MessagesId { get; set; }

    public int? FromUser { get; set; }

    public string Content { get; set; } = null!;

    public DateTime? DateCreated { get; set; }

    public virtual User? FromUserNavigation { get; set; }

    public virtual Message? Messages { get; set; }
}
