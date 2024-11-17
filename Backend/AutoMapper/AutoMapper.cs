using AutoMapper;
using Backend.Models;

namespace Backend.AutoMapper;
public class MappingProfile : Profile
{
	public MappingProfile()
	{
		CreateMap<User, UserPrivate>();
		CreateMap<User, UserLogin>();
		CreateMap<HistorySearch, HistoryWithUser>()
			.ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.OtherUser.FirstName))
			.ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.OtherUser.LastName))
			.ForMember(dest => dest.GenderId, opt => opt.MapFrom(src => src.OtherUser.GenderId))
			.ForMember(dest => dest.GenderId, opt => opt.MapFrom(src => src.OtherUser.GenderId))
			.ForMember(dest => dest.HistoryId, opt => opt.MapFrom(src => src.HistoryId));

	}
}
