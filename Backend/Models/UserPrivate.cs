using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models;

public partial class UserPrivate
{
	public int UserId { get; set; }

	public string FirstName { get; set; } = null!;

	public string LastName { get; set; } = null!;


	public virtual Media? ProfilePicture { get; set; } = null;

	public int? GenderId { get; set; }

	public bool? IsOnline { get; set; } = false;
	public virtual ICollection<ChatInMessage> ChatInMessages { get; set; } = new List<ChatInMessage>();

}