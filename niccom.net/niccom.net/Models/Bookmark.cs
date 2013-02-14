using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace niccom.net.Models
{
    public class BookmarkCategory
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public virtual BookmarkCategory Parent { get; set; }

        public virtual ICollection<BookmarkCategory> Children  { get; set; }

        public virtual ICollection<Bookmark> Bookmarks { get; set; }
    }

    public class Bookmark
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Url { get; set; }

        public string Favicon { get; set; }

        public virtual BookmarkCategory Category { get; set; }
    }
}