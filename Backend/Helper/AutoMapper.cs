using AutoMapper;
using Backend.DTO;
using Backend.Models;

namespace Backend.Helper;
public class MappingProfile : Profile
{
	public MappingProfile()
	{
		CreateMap<User, UserPrivate>();
		// .ForMember(dest => dest.ProfilePicture, opt => opt.MapFrom();

		CreateMap<User, UserLogin>()
			.ForMember(dest => dest.ProfilePicture, opt => opt.MapFrom(src => src.Posts.Where(p => p.IsPictureProfile == true).FirstOrDefault()));
		CreateMap<HistorySearch, HistoryWithUser>()
			.ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.OtherUser.FirstName))
			.ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.OtherUser.LastName))
			.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.OtherUser.UserId))
			.ForMember(dest => dest.GenderId, opt => opt.MapFrom(src => src.OtherUser.GenderId))
			.ForMember(dest => dest.ProfilePicture, opt => opt.MapFrom(src => src.OtherUser.Posts.Where(p => p.IsPictureProfile == true).FirstOrDefault()))
			.ForMember(dest => dest.HistoryId, opt => opt.MapFrom(src => src.HistoryId));

	}
}
