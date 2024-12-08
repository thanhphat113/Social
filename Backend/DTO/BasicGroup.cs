using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.DTO
{
	public class PrivateGroup
	{
		public int GroupId { get; set; }

		public string GroupName { get; set; } = null!;

		public string? Bio { get; set; }

		public Media? Profile { get; set; } = null;
		public Media? Cover { get; set; } = null;

	}
}