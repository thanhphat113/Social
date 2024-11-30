using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models;

public partial class ChatInMessage
{
    public int? ChatId { get; set; }

    public int MessagesId { get; set; }
    [JsonIgnore]

    public int? MediaId { get; set; } = null!;

    public bool? IsRead { get; set; } = false;
    public bool? IsRecall { get; set; } = false;

    public int FromUser { get; set; }


    public string? Content { get; set; } = null!;

    public bool? IsNoti { get; set; } = false;


    public DateTime DateCreated { get; set; } = DateTime.Now;

    [NotMapped]
    public int Otheruser { get; set; }


    [JsonIgnore]
    public virtual User? FromUserNavigation { get; set; }

    [JsonIgnore]
    public virtual Message? Messages { get; set; }
    public virtual Media? Media { get; set; } = null;

}
