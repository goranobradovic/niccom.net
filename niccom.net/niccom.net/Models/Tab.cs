using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace niccom.net.Models
{
    public class Tab
    {
        /// <summary>
        /// Gets or sets the id.
        /// </summary>
        /// <value>
        /// The id.
        /// </value>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>
        /// The name.
        /// </value>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the icon.
        /// </summary>
        /// <value>
        /// The icon.
        /// </value>
        public string Icon { get; set; }

        /// <summary>
        /// Gets or sets the tooltip.
        /// </summary>
        /// <value>
        /// The tooltip.
        /// </value>
        public string Tooltip { get; set; }
    }
}