using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DTO
{
	public class ValidateEmail
	{
		public ValidateEmail(string notification, Boolean isTrue)
		{
			this.notification = notification;
			this.isTrue = isTrue;
		}

		public String notification { get; set; }
		public Boolean isTrue { get; set; }
	}
}