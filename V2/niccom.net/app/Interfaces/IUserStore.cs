namespace app.Interfaces
{
    using Models;
    using Services;

    public interface IUserStore
    {
        void Add(User user);
        void Remove(User user);
        User GetByUsername(string username);
        bool UserExists(string userName);
    }
}