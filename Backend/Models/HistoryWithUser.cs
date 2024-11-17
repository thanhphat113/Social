using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class HistoryWithUser
{
	public int HistoryId { get; set; }
	public int UserId { get; set; }


	public string FirstName { get; set; } = null!;

	public string LastName { get; set; } = null!;


	public virtual Media? ProfilePicture { get; set; } = null;

	public int? GenderId { get; set; }

}