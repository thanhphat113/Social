namespace Backend.Services.Interface;
public interface IService<T> where T : class
{
	Task<IEnumerable<T>> GetAll();
	Task<IEnumerable<T>> GetListById(int userid);
	Task<T> GetById(int id);
	Task<T> Add(T value);
	Task<bool> Update(T value);
	Task<bool> Delete(int id);
}