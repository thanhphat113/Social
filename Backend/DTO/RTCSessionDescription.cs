using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DTO
{
	public class RTCSessionDescription
	{
		public string type { get; set; }
		public string sdp { get; set; }
	}
}