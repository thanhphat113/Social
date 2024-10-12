using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Media
{
    public int MediaId { get; set; }

    public int? PostId { get; set; }

    public string Src { get; set; } = null!;

    public int? MediaType { get; set; }

    public virtual TypeMedia? MediaTypeNavigation { get; set; }

    public virtual Post? Post { get; set; }

    public virtual ICollection<User> UserCoverPhotoNavigations { get; set; } = new List<User>();

    public virtual ICollection<User> UserProfilePictureNavigations { get; set; } = new List<User>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
