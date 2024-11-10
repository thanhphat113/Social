using Backend.Models;
using Backend.Repositories;
using Backend.Services;
using Backend.Repositories.Interface;
using Backend.Services;

namespace Backend.Services
{
    public class UserService : IService<User>
    {
        private readonly IUserRepository _userRepo;
        private readonly IChatInMessRepository _mess;


        public UserService(IUserRepository repo, IChatInMessRepository mess)
        {
            _userRepo = repo;
            _mess = mess;
        }
        public async Task<string> Add(User product)
        {
            if (await _userRepo.Add(product) != null)
            {
                return "Đăng ký tài khoản thành công";
            }
            return "Đăng ký thất bại thất bại";
        }

        public Task<string> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<User>> GetAll()
        {
            return _userRepo.GetAll();
        }

        public async Task<User> GetById(int id)
        {
            return await _userRepo.GetById(id);
        }

        public Task<IEnumerable<User>> GetListById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<string> Update(User product)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<User>> GetFriends(int id)
        {
            try
            {
                return await _userRepo.GetListFriends(id);
            }
            catch
            {
                return null;
            }
        }


        public async Task<IEnumerable<Object>> GetListByName(string name)
        {
            return await _userRepo.GetUsersByName(name);
        }

        public async Task<IEnumerable<User>> FriendsWithChat(int UserId, IEnumerable<User> friends)
        {
            foreach (var item in friends)
            {
                item.ChatInMessages = await _mess.GetMessage(UserId, item.UserId);
            }
            return friends;
        }

        public async Task<IEnumerable<User>> GetFriendsByName(int userid, string name)
        {
            try
            {
                var friends = await _userRepo.GetFriendByName(userid, name);
                var results = await FriendsWithChat(userid, friends);
                return results;
            }
            catch
            {
                return null;
            }
        }
    }

}