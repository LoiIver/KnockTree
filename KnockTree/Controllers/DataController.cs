using KnockTree.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KnockTree.Controllers
{
	public class DataController : ApiController
	{
		public List<Node> Nodes
		{
			get
			{
				return new List<Node> { new Node { Caption = "One", Id = 1, Nodes = new List<Node>() },
										new Node { Caption = "Two" , Id= 2}, 
										new Node { Caption = "Three" ,Id= 3} };
			}
		}

		public IEnumerable<Node> GetTree()
		{
			return Nodes;
		}

		public IEnumerable<Node> GetChildren(int id)
		{
			// чтобы выборка отличалась от GetTree
			return Nodes.Where(t => t.Caption != "Three");
		}


	}

}
