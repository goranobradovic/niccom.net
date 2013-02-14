using System.Data.Entity;

namespace niccom.net.Models.db
{
    // You can add custom code to this file. Changes will not be overwritten.
    // 
    // If you want Entity Framework to drop and regenerate your database
    // automatically whenever you change your model schema, add the following
    // code to the Application_Start method in your Global.asax file.
    // Note: this will destroy and re-create your database with every model change.
    // 
    // System.Data.Entity.Database.SetInitializer(new System.Data.Entity.DropCreateDatabaseIfModelChanges<niccom.net.Models.NiccomContext>());
    public class NiccomContext : DbContext
    {
        static NiccomContext()
        {
            Database.SetInitializer(new NiccomInitializer());
        }
        public NiccomContext()
            : base("name=DefaultConnection")
        {

        }

        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<TodoList> TodoLists { get; set; }
        public DbSet<Tab> Tabs { get; set; }
        public DbSet<Bookmark> Bookmarks { get; set; }
        public DbSet<BookmarkCategory> BookmarkCategories { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

    }
}