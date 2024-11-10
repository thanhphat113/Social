using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Backend.Models
{
	public class GenderType
	{
		public int GenderId { get; set; }
		public string GenderName { get; set; }
		[JsonIgnore]
		public virtual ICollection<User> Users { get; set; }

	}
}