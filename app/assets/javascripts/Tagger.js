function Tagger(divid, tagid, arg1, arg2, arg3, arg4){
	this.divid = divid;
	this.arg1 = arg1;	
	this.arg2 = arg2;	
	this.arg3 = arg3;	
	this.arg4 = arg4;
	this.container = document.getElementById(divid);
	this.rectangle = document.getElementById(tagid);
	this.pic = this.container.getElementsByTagName("img")[0];
	this.button = document.getElementById(divid + "_button");
	var obj = this;
	this.container.prevDefault = function(event) {
		event.preventDefault();
	};
	this.button.onclick = function(event){
		obj.showRectangle(event);
	};
}

Tagger.prototype.showRectangle = function(event){
	this.button.onclick = function(event){
		return false;
	}
	this.submission = document.getElementById("submit_" + this.divid);
	this.submission.disabled = false;
	window.location.hash = "#" + this.container.divid;
	var obj = this;

	this.img_x = this.pic.offsetLeft;
	this.img_y = this.pic.offsetTop;
	this.img_w = this.pic.offsetWidth;
	this.img_h = this.pic.offsetHeight;

	this.rectangle.style.position = "absolute";
	this.l = Math.round(this.img_x + 0.5 * this.img_w - 0.2 * Math.min(this.img_w, this.img_h));
	this.u = Math.round(this.img_y + 0.5 * this.img_h - 0.2 * Math.min(this.img_w, this.img_h));
	this.w = Math.round(0.4 * Math.min(this.img_w, this.img_h));
	this.h = Math.round(0.4 * Math.min(this.img_w, this.img_h));
	
	document.getElementById(this.arg1).value = this.l;
	document.getElementById(this.arg2).value = this.u;
	document.getElementById(this.arg3).value = this.w;
	document.getElementById(this.arg4).value = this.h;

	this.rectangle.style.left = this.l + "px";
	this.rectangle.style.top =  this.u + "px";
	this.rectangle.style.width = this.w + "px";
	this.rectangle.style.height = this.h + "px";
	this.rectangle.style.zIndex = 1;
	this.rectangle.style.border = "1px dashed #000000";
	this.container.appendChild(this.rectangle);

	this.innerRect = document.createElement("div");
	this.innerRect.style.width = this.w - 1 + "px";
	this.innerRect.style.height = this.h - 1 + "px";
	this.innerRect.style.border = "1px dashed #ffffff";
	this.innerRect.style.cursor = "move";
	this.rectangle.appendChild(this.innerRect);
	this.isMouseDown = false;
	this.innerRect.onmousedown = function (event){
		obj.container.addEventListener('mousedown', obj.container.prevDefault);
		obj.tagging(event);
	}

	var luRect = document.createElement("div");
	luRect.style.position = "absolute";
	luRect.style.top = "-1px";
	luRect.style.left = "-1px";
	luRect.style.width = "6px"; 
	luRect.style.height = "6px"; 
	luRect.style.zIndex = 2;
	luRect.style.border = "1px solid #000000";
	luRect.style.background = "#ffffff";
	luRect.style.cursor = "nw-resize";
	this.rectangle.appendChild(luRect);
	luRect.onmousedown = function (event){
		obj.container.addEventListener('mousedown', obj.container.prevDefault);
		obj.clickResizeLU(event);
	};

	var ldRect = document.createElement("div");
	ldRect.style.position = "absolute";
	ldRect.style.bottom = "-1px";
	ldRect.style.left = "-1px";
	ldRect.style.width = "6px"; 
	ldRect.style.height = "6px"; 
	ldRect.style.zIndex = 2;
	ldRect.style.border = "1px solid #000000";
	ldRect.style.background = "#ffffff";
	ldRect.style.cursor = "sw-resize";
	this.rectangle.appendChild(ldRect);
	ldRect.onmousedown = function (event){
		obj.container.addEventListener('mousedown', obj.container.prevDefault);
		obj.clickResizeLD(event);
	};

	var ruRect = document.createElement("div");
	ruRect.style.position = "absolute";
	ruRect.style.top = "-1px";
	ruRect.style.right = "-1px";
	ruRect.style.width = "6px"; 
	ruRect.style.height = "6px"; 
	ruRect.style.zIndex = 2;
	ruRect.style.border = "1px solid #000000";
	ruRect.style.background = "#ffffff";
	ruRect.style.cursor = "ne-resize";
	this.rectangle.appendChild(ruRect);
	ruRect.onmousedown = function (event){
		obj.container.addEventListener('mousedown', obj.container.prevDefault);
		obj.clickResizeRU(event);
	};

	var rdRect = document.createElement("div");
	rdRect.style.position = "absolute";
	rdRect.style.bottom = "-1px";
	rdRect.style.right = "-1px";
	rdRect.style.width = "6px"; 
	rdRect.style.height = "6px"; 
	rdRect.style.zIndex = 2;
	rdRect.style.border = "1px solid #000000";
	rdRect.style.background = "#ffffff";
	rdRect.style.cursor = "se-resize";
	this.rectangle.appendChild(rdRect);
	rdRect.onmousedown = function (event){
		obj.container.addEventListener('mousedown', obj.container.prevDefault);
		obj.clickResizeRD(event);
	};

	var closeRect = document.createElement("div");
	closeRect.className = "close";
	closeRect.style.position = "absolute";
	closeRect.style.top = "-1px";
	closeRect.style.right = "-15px";
	closeRect.style.width = "13px"; 
	closeRect.style.height = "13px"; 
	closeRect.style.zIndex = 2;
	closeRect.style.cursor = "pointer";
	closeRect.style.padding = "0px";
	this.rectangle.appendChild(closeRect);
	closeRect.onclick = function (event){
		obj.container.removeEventListener('mousedown', obj.container.prevDefault);
		obj.rectangle.offsetParent.onmousemove = obj.oldMoveHandler;
		obj.rectangle.offsetParent.onmouseup = obj.oldUpHandler;
		obj.isMouseDown = false;
		obj.rectangle.parentNode.removeChild(obj.rectangle);
		obj.button.onclick = function(event){
			obj.showRectangle(event);
		};
		obj.submission.disabled = true;
	};
}

Tagger.prototype.tagging = function(event) {
	var obj = this;
	this.oldMoveHandler = this.rectangle.offsetParent.onmousemove;
	this.rectangle.offsetParent.onmousemove = function(event) {
		obj.moveTag(event);
	};
	this.oldUpHandler = this.rectangle.offsetParent.onmouseup;
	this.rectangle.offsetParent.onmouseup = function(event) {
		obj.mouseUp(event);
	};

	this.mouseMinLeft = 0;
	this.mouseMinTop = 0;
	var el = this.pic;
	while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
		this.mouseMinLeft += el.offsetLeft - el.scrollLeft;
		this.mouseMinTop += el.offsetTop;
		el = el.offsetParent;
	}
	this.mouseMaxLeft = this.mouseMinLeft + this.img_w;
	this.mouseMaxTop = this.mouseMinTop + this.img_h;

	this.oldX = Math.max(this.mouseMinLeft, Math.min(event.pageX, this.mouseMaxLeft));
	this.oldY = Math.max(this.mouseMinTop, Math.min(event.pageY, this.mouseMaxTop));
	this.isMouseDown = true;
}

Tagger.prototype.moveTag = function(event) {
	if(!this.isMouseDown) return;
	var maxLeft = this.img_x + this.img_w - this.rectangle.offsetWidth;
	var maxTop = this.img_y + this.img_h - this.rectangle.offsetHeight;

	var newPageX = Math.max(this.mouseMinLeft, Math.min(event.pageX, this.mouseMaxLeft));
	var newPageY = Math.max(this.mouseMinTop, Math.min(event.pageY, this.mouseMaxTop));
	var newLeft = (this.rectangle.offsetLeft + (newPageX - this.oldX));
	var newTop = (this.rectangle.offsetTop + (newPageY - this.oldY));

	this.l = Math.max(this.img_x, Math.min(maxLeft, newLeft));
	this.u = Math.max(this.img_y, Math.min(maxTop, newTop));

	this.rectangle.style.left = this.l + "px";
	this.rectangle.style.top = this.u + "px";

	this.oldX = newPageX;
	this.oldY = newPageY;

}

Tagger.prototype.mouseUp = function(event){
	this.isMouseDown = false;
	var frm = document.getElementById("form_" + this.divid);
	frm.elements["left"].value = this.l;
	frm.elements["top"].value = this.u;
	frm.elements["width"].value = this.w;
	frm.elements["height"].value = this.h;
	this.rectangle.offsetParent.onmousemove = this.oldMoveHandler;
	this.rectangle.offsetParent.onmouseup = this.oldUpHandler;
}

Tagger.prototype.clickResizeLU = function(event) {
	var obj = this;
	this.oldMoveHandler = this.rectangle.offsetParent.onmousemove;
	this.rectangle.offsetParent.onmousemove = function(event) {
		obj.resize_lu(event);
	};
	this.oldUpHandler = this.rectangle.offsetParent.onmouseup;
	this.rectangle.offsetParent.onmouseup = function(event) {
		obj.mouseUp(event);
	};

	this.mouseMinLeft = 0;
	this.mouseMinTop = 0;
	var el = this.pic;
	while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
		this.mouseMinLeft += el.offsetLeft - el.scrollLeft;
		this.mouseMinTop += el.offsetTop;
		el = el.offsetParent;
	}

	this.mouseMaxLeft = this.mouseMinLeft + this.l + this.w - this.img_x;
	this.mouseMaxTop = this.mouseMinTop + this.u + this.h - this.img_y;
	this.oldX = Math.max(this.mouseMinLeft, Math.min(event.pageX, this.mouseMaxLeft));
	this.oldY = Math.max(this.mouseMinTop, Math.min(event.pageY, this.mouseMaxTop));
	this.isMouseDown = true;
}

Tagger.prototype.resize_lu = function(event) {
	if(!this.isMouseDown) return;
	var maxLeft = this.l + this.w;
	var maxTop = this.u + this.h;

	var newPageX = Math.max(this.mouseMinLeft, Math.min(event.pageX, this.mouseMaxLeft));
	var newPageY = Math.max(this.mouseMinTop, Math.min(event.pageY, this.mouseMaxTop));
	var newLeft = (this.rectangle.offsetLeft + (newPageX - this.oldX));
	var newTop = (this.rectangle.offsetTop + (newPageY - this.oldY));

	newLeft = Math.max(this.img_x, Math.min(maxLeft, newLeft));
	newTop = Math.max(this.img_y, Math.min(maxTop, newTop));

	this.w += this.l - newLeft;
	this.h += this.u - newTop;
	this.l = newLeft;
	this.u = newTop;

	this.rectangle.style.width = this.w + "px";
	this.rectangle.style.height = this.h + "px";

	this.rectangle.style.left = this.l + "px";
	this.rectangle.style.top = this.u + "px";

	this.innerRect.style.width = this.w - 1 + "px";
	this.innerRect.style.height = this.h - 1 + "px";

	this.oldX = newPageX;
	this.oldY = newPageY;
};

Tagger.prototype.clickResizeLD = function(event) {
	var obj = this;
	this.oldMoveHandler = this.rectangle.offsetParent.onmousemove;
	this.rectangle.offsetParent.onmousemove = function(event) {
		obj.resize_ld(event);
	};
	this.oldUpHandler = this.rectangle.offsetParent.onmouseup;
	this.rectangle.offsetParent.onmouseup = function(event) {
		obj.mouseUp(event);
	};

	this.mouseMinLeft = 0;
	this.mouseMinTop = 0;
	var el = this.pic;
	while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
		this.mouseMinLeft += el.offsetLeft - el.scrollLeft;
		this.mouseMinTop += el.offsetTop;
		el = el.offsetParent;
	}

	this.mouseMaxLeft = this.mouseMinLeft + this.l + this.w - this.img_x;
	this.mouseMaxTop = this.mouseMinTop + this.img_h;
	this.mouseMinTop += this.u - this.img_y;

	this.oldX = Math.max(this.mouseMinLeft, Math.min(event.pageX, this.mouseMaxLeft));
	this.oldY = Math.max(this.mouseMinTop, Math.min(event.pageY, this.mouseMaxTop));
	this.isMouseDown = true;
}

Tagger.prototype.resize_ld = function(event) {
	if(!this.isMouseDown) return;
	var maxLeft = this.l + this.w;
	var maxWidth = this.l + this.w - this.img_x;
	var maxHeight = this.img_y + this.img_h - this.u;
	var newPageX = Math.max(this.mouseMinLeft, Math.min(event.pageX, this.mouseMaxLeft));
	var newPageY = Math.max(this.mouseMinTop, Math.min(event.pageY, this.mouseMaxTop));

	var newLeft = (this.rectangle.offsetLeft + (newPageX - this.oldX));
	var newWidth = this.w + (this.oldX - newPageX);
	var newHeight = this.h + (newPageY - this.oldY);

	newLeft = Math.max(this.img_x, Math.min(maxLeft, newLeft));
	newWidth = Math.max(0, Math.min(maxWidth, newWidth));
	newHeight = Math.max(0, Math.min(maxHeight, newHeight));

	this.w = newWidth;
	this.h = newHeight;
	this.l = newLeft;

	this.rectangle.style.width = this.w + "px";
	this.rectangle.style.height = this.h + "px";

	this.rectangle.style.left = this.l + "px";
	this.rectangle.style.top = this.u + "px";

	this.innerRect.style.width = this.w - 1 + "px";
	this.innerRect.style.height = this.h - 1 + "px";

	this.oldX = newPageX;
	this.oldY = newPageY;
};

Tagger.prototype.clickResizeRU = function(event) {
	var obj = this;
	this.oldMoveHandler = this.rectangle.offsetParent.onmousemove;
	this.rectangle.offsetParent.onmousemove = function(event) {
		obj.resize_ru(event);
	};
	this.oldUpHandler = this.rectangle.offsetParent.onmouseup;
	this.rectangle.offsetParent.onmouseup = function(event) {
		obj.mouseUp(event);
	};

	this.mouseMinLeft = 0;
	this.mouseMinTop = 0;
	var el = this.pic;
	while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
		this.mouseMinLeft += el.offsetLeft - el.scrollLeft;
		this.mouseMinTop += el.offsetTop;
		el = el.offsetParent;
	}
	this.mouseMaxLeft = this.mouseMinLeft + this.img_w;
	this.mouseMaxTop = this.mouseMinTop + this.u + this.h - this.img_y;
	this.mouseMinLeft += this.l - this.img_x;

	this.oldX = Math.max(this.mouseMinLeft, Math.min(event.pageX, this.mouseMaxLeft));
	this.oldY = Math.max(this.mouseMinTop, Math.min(event.pageY, this.mouseMaxTop));
	this.isMouseDown = true;
}

Tagger.prototype.resize_ru = function(event) {
	if(!this.isMouseDown) return;
	var maxWidth = this.img_x + this.img_w - this.l;
	var maxHeight = this.h + this.u - this.img_y;
	var maxTop = this.h + this.u;
	var newPageX = Math.max(this.mouseMinLeft, Math.min(event.pageX, this.mouseMaxLeft));
	var newPageY = Math.max(this.mouseMinTop, Math.min(event.pageY, this.mouseMaxTop));
	var newWidth = this.w + (newPageX - this.oldX);
	var newHeight = this.h + (this.oldY - newPageY);
	var newTop = (this.rectangle.offsetTop + (newPageY - this.oldY));

	newWidth = Math.max(0, Math.min(maxWidth, newWidth));
	newHeight = Math.max(0, Math.min(maxHeight, newHeight));
	newTop = Math.max(this.img_y, Math.min(maxTop, newTop));

	this.w = newWidth;
	this.h = newHeight;
	this.u = newTop;

	this.rectangle.style.width = this.w + "px";
	this.rectangle.style.height = this.h + "px";

	this.rectangle.style.left = this.l + "px";
	this.rectangle.style.top = this.u + "px";

	this.innerRect.style.width = this.w - 1 + "px";
	this.innerRect.style.height = this.h - 1 + "px";

	this.oldX = newPageX;
	this.oldY = newPageY;
};



Tagger.prototype.clickResizeRD = function(event) {
	var obj = this;
	this.oldMoveHandler = this.rectangle.offsetParent.onmousemove;
	this.rectangle.offsetParent.onmousemove = function(event) {
		obj.resize_rd(event);
	};
	this.oldUpHandler = this.rectangle.offsetParent.onmouseup;
	this.rectangle.offsetParent.onmouseup = function(event) {
		obj.mouseUp(event);
	};

	this.mouseMinLeft = 0;
	this.mouseMinTop = 0;
	var el = this.pic;
	while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
		this.mouseMinLeft += el.offsetLeft - el.scrollLeft;
		this.mouseMinTop += el.offsetTop;
		el = el.offsetParent;
	}
	this.mouseMaxLeft = this.mouseMinLeft + this.img_w;
	this.mouseMaxTop = this.mouseMinTop + this.img_h;
	this.mouseMinLeft += this.l - this.img_x;
	this.mouseMinTop += this.u - this.img_y;

	this.oldX = Math.max(this.mouseMinLeft, Math.min(event.pageX, this.mouseMaxLeft));
	this.oldY = Math.max(this.mouseMinTop, Math.min(event.pageY, this.mouseMaxTop));
	this.isMouseDown = true;
}

Tagger.prototype.resize_rd = function(event) {
	if(!this.isMouseDown) return;
	var maxWidth = this.img_x + this.img_w - this.l;
	var maxHeight = this.img_y + this.img_h - this.u;
	var newPageX = Math.max(this.mouseMinLeft, Math.min(event.pageX, this.mouseMaxLeft));
	var newPageY = Math.max(this.mouseMinTop, Math.min(event.pageY, this.mouseMaxTop));
	var newWidth = this.w + (newPageX - this.oldX);
	var newHeight = this.h + (newPageY - this.oldY);

	newWidth = Math.max(0, Math.min(maxWidth, newWidth));
	newHeight = Math.max(0, Math.min(maxHeight, newHeight));

	this.w = newWidth;
	this.h = newHeight;

	this.rectangle.style.width = this.w + "px";
	this.rectangle.style.height = this.h + "px";

	this.rectangle.style.left = this.l + "px";
	this.rectangle.style.top = this.u + "px";

	this.innerRect.style.width = this.w - 1 + "px";
	this.innerRect.style.height = this.h - 1 + "px";

	this.oldX = newPageX;
	this.oldY = newPageY;
};

