using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class MainTopic
{
    public int TopicId { get; set; }

    public string? TopicName { get; set; }

    public string? Color { get; set; }

    public virtual ICollection<GroupChat> GroupChats { get; set; } = new List<GroupChat>();

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();
}
