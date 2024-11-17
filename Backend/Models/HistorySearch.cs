using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class HistorySearch
{
    public int HistoryId { get; set; }

    public int? OtherUserId { get; set; }

    public int? FromUserId { get; set; }

    public DateTime? DateSearch { get; set; }

    public virtual User? FromUser { get; set; }

    public virtual User? OtherUser { get; set; }
}
