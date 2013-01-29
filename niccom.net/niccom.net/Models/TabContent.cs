using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace niccom.net.Models
{
    public enum TabContentType
    {
        Html,
        Partial
    }

    public class TabContent
    {
        public int Id { get; set; }

        public virtual Tab Parent { get; set; }

    }
}