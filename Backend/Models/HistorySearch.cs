using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class HistorySearch
{
    public int HistoryId { get; set; }

    public int? OtherUser { get; set; }

    public int? FromUser { get; set; }

    public DateTime? DateSearch { get; set; }

    public virtual User? FromUserNavigation { get; set; }

    public virtual User? OtherUserNavigation { get; set; }
}
