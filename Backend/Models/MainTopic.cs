using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models;

public partial class MainTopic
{
    public int TopicId { get; set; }

    public string? TopicName { get; set; }

    public string? Color { get; set; }

    [JsonIgnore]
    public virtual ICollection<GroupChat> GroupChats { get; set; } = new List<GroupChat>();
    [JsonIgnore]


    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();
}
