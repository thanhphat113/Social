using System;
using System.Collections.Generic;

namespace Backend.DTO
{
	public class MediaDTO
	{
        public int MediaId { get; set; }

        public int? PostId { get; set; }

        public string Src { get; set; } = null!;

        public int? MediaType { get; set; }
    }
}