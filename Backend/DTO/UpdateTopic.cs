using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DTO
{
	public class UpdateTopic
	{
		public int TopicId { get; set; }
		public int MessageId { get; set; }
	}
}