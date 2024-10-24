using Backend.Models;
using Backend.Repositories;

public class UserService
{
    private readonly UserRepositories _userRepository;

    public UserService(UserRepositories userRepository)
    {
        _userRepository = userRepository;
    }

    // Lấy tất cả người dùng
    public async Task<List<User>> GetAllUsers()
    {
        return await _userRepository.GetAll();
    }

    // Lấy thông tin người dùng
    public async Task<User> GetUserById(int id)
    {
        var user = await _userRepository.GetUserById(id);
        if (user == null) throw new Exception("Người dùng không tồn tại");
        return user;
    }

    // Thêm người dùng
    public async Task<bool> AddUser(User newUser)
    {
        return await _userRepository.Add(newUser); // Giả định rằng bạn đã có phương thức Add trong IRepositories
    }

    // Cập nhật thông tin người dùng
    public async Task<bool> UpdateUser(int id, User updatedUser)
    {
        var user = await _userRepository.GetUserById(id);
        if (user == null) throw new Exception("Người dùng không tồn tại");

        // Cập nhật thông tin
        user.FirstName = updatedUser.FirstName;
        user.LastName = updatedUser.LastName;
        user.Email = updatedUser.Email;

        return await _userRepository.Update(user);
    }

    // Xóa người dùng
    public async Task<bool> DeleteUser(int id)
    {
        var user = await _userRepository.GetUserById(id);
        if (user == null) throw new Exception("Người dùng không tồn tại");
        return await _userRepository.Delete(id); // Giả định rằng bạn đã có phương thức Delete trong IRepositories
    }
}
