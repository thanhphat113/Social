using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class ReadMessage
{
    public int? MessagesId { get; set; }

    public int? UserId { get; set; }

    public bool? IsRead { get; set; }

    public virtual Message? Messages { get; set; }

    public virtual User? User { get; set; }
}
