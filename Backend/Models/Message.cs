using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Message
{
    public int MessagesId { get; set; }

    public int User1 { get; set; }

    public int User2 { get; set; }

    public int MainTopic { get; set; }

    public virtual ICollection<ChatInMessage> ChatInMessages { get; set; } = new List<ChatInMessage>();

    public virtual MainTopic MainTopicNavigation { get; set; } = null!;

    public virtual User User1Navigation { get; set; }

    public virtual User User2Navigation { get; set; }
}
