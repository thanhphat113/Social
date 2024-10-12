using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class PrivacySetting
{
    public int PrivacyId { get; set; }

    public string PrivacyName { get; set; } = null!;

    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();

    public virtual ICollection<UserGroup> UserGroups { get; set; } = new List<UserGroup>();
}
