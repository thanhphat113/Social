using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DTO
{
	public class UpdateNickname
	{
		public int MessageId { get; set; }
		public string? Nickname1 { get; set; } = null;
		public string? Nickname2 { get; set; } = null;
	}
}