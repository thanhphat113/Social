using AutoMapper;
using Backend.DTO;
using Backend.Models;

namespace Backend.Helper;
public class MappingProfile : Profile
{
	public MappingProfile()
	{
		CreateMap<User, UserPrivate>();
		CreateMap<RequestNotification, RequestUser>()
			.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.FromUser.UserId))
			.ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FromUser.FirstName))
			.ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.FromUser.LastName))
			.ForMember(dest => dest.ProfilePicture, opt => opt.MapFrom(src => src.FromUser.Posts.Where(p => p.IsPictureProfile == true).SelectMany(p => p.Medias).FirstOrDefault()))
			.ForMember(dest => dest.GenderId, opt => opt.MapFrom(src => src.FromUser.GenderId));

		CreateMap<UserGroup, PrivateGroup>()
			.ForMember(dest => dest.Profile, opt => opt.MapFrom(src => src.Posts.Where(p => p.IsPictureProfile == true).SelectMany(p => p.Medias).FirstOrDefault()))
			.ForMember(dest => dest.Cover, opt => opt.MapFrom(src => src.Posts.Where(p => p.IsCoverPhoto == true).SelectMany(p => p.Medias).FirstOrDefault()));

		// .ForMember(dest => dest.ProfilePicture, opt => opt.MapFrom();

		CreateMap<User, UserLogin>()
			.ForMember(dest => dest.ProfilePicture, opt => opt.MapFrom(src => src.Posts.Where(p => p.IsPictureProfile == true)
					.SelectMany(p => p.Medias).FirstOrDefault()));
		CreateMap<HistorySearch, HistoryWithUser>()
			.ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.OtherUser.FirstName))
			.ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.OtherUser.LastName))
			.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.OtherUser.UserId))
			.ForMember(dest => dest.GenderId, opt => opt.MapFrom(src => src.OtherUser.GenderId))
			.ForMember(dest => dest.ProfilePicture, opt => opt.MapFrom(src => src.OtherUser.Posts.Where(p => p.IsPictureProfile == true).SelectMany(p => p.Medias).FirstOrDefault()))
			.ForMember(dest => dest.HistoryId, opt => opt.MapFrom(src => src.HistoryId));

	}
}
