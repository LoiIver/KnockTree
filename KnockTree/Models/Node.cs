using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KnockTree.Models
{

	public class Node
	{
		public int Id { get; set; }
		public string Caption { get; set; }
		public IEnumerable<Node> Nodes { get; set; }
	}


 
}