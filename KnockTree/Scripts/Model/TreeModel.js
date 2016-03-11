
function TreeView(data, propMap) {
	var treeView = this;
	this.data = data;
	this.selectedNode = ko.observable();
	this.children = ko.computed(function () {
		return dataToNodes(ko.utils.unwrapObservable(data));
	});
	setIsLast(this.children());
	this.children.subscribe(function (newVal) {
		setIsLast(newVal);
	});



	function dataToNodes(dataArray, old) {
		var res = [];
		for (var i = 0, l = dataArray.length; i < l; i++) {
			res.push(dataArray[i]._treeviewNode || new TreeViewNode(dataArray[i]));
		}
		return res;
	}

	function setIsLast(children) {
		for (var i = 0, l = children.length; i < l; i++) {
			children[i].isLast(i == (l - 1));
		}
	}

	function TreeViewNode(data) {
		 
		var self = this;
		
		this.data = data;
		data._treeviewNode = this;
		var
			map = (typeof propMap == 'function') ? propMap(data) : propMap;
		captionProp = (map && map.caption) || 'caption',
		childrenProp = (map && map.children) || 'children';
		idProp = (map && map.id) || 'id',
		this.caption = data[captionProp];
		this.id = data[idProp];
	 
		if (data[childrenProp]){
			this.children = ko.computed(function () {
				return dataToNodes(ko.utils.unwrapObservable(data[childrenProp]));
			
			});
		}
 		else
 			this.children = null;

		this.isOpen = ko.observable(false);
		this.isClosed = ko.computed(function () {
			return !this.isOpen();
		}, this);

		 this.isLeaf = ko.computed(function () {
			return !(this.children && this.children().length);
		}, this); 
		this.isLeaf = true;
		this.isLast = ko.observable(false);

		if (this.children) {
			setIsLast(this.children());
			this.children.subscribe(function (newVal) {
				setIsLast(newVal);
			});
		}

		this.toggleOpen = function () {
			if  (self.data.Nodes() && !self.data.Nodes().length)
		 		$.ajax(
					{
						url: "api/data/getchildren",
						data: { id: self.id },
						success: function (items) {
						//self.children = ko.observableArray();

								//.computed(function () {
								//	return dataToNodes(ko.utils.unwrapObservable(items))
							//});

							var data = self.data;
							for (var i = 0; i < items.length; i++)
								data.Nodes.push(new SomeObject(items[i]));
  
							self.isOpen(!self.isOpen());
						},
						error: function (x, err) {
							console.log(err);
						}
					});
		 else
			self.isOpen(!self.isOpen());
		};

		this.isSelected = ko.computed(function () {
			return (treeView.selectedNode() === this)
		}, this);

		this.toggleSelection = function () {
			if (this.isSelected()) treeView.selectedNode(null);
			else treeView.selectedNode(this);
		}
	}

}

function SomeObject(col) {
	this.Caption = col.Caption;
	this.Id = col.Id;
	this.Nodes = ko.observableArray();
	this.collection = col;
}



 
