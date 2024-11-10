using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models;

public partial class ChatInMessage
{
    public int? ChatId { get; set; }

    public int MessagesId { get; set; }

    public int FromUser { get; set; }
    public bool? IsRead { get; set; } = false;
    public bool? IsRecall { get; set; } = false;

    public string Content { get; set; } = null!;

    public DateTime DateCreated { get; set; }

    [NotMapped]
    public int Otheruser { get; set; }


    [JsonIgnore]
    public virtual User? FromUserNavigation { get; set; }

    [JsonIgnore]
    public virtual Message? Messages { get; set; }
}
