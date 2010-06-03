(function(){
		domReady = !+'\v1' ? function(fn){(function(){
			try{
				document.documentElement.doScroll('left');
			} catch (error){
				setTimeout(arguments.callee, 0);
				return;
			};
			fn();
		})();
		} : function(fn){
		document.addEventListener('DOMContentLoaded', fn, false);
		};
		function cleanWhitespace(oEelement)
			{
			 for(var i=0;i<oEelement.childNodes.length;i++){
			  var node=oEelement.childNodes[i];
			  if(node.nodeType==3 && !/\S/.test(node.nodeValue)){node.parentNode.removeChild(node)}
			  }
		}
		function getElementsByClassName(node, name, type) {
			if (node.getElementsByClassName)
				return node.getElementsByClassName(name);
				else {
				var r = [], re = new RegExp("(^|\\s)" + name + "(\\s|$)"), e = (node || document).getElementsByTagName(type || "*");
				for ( var i = 0; i < e.length; i++ ) {
					if( re.test(e[i].className) )
						r.push(e[i]);
				}
				return r;
			}
		};
		function ExpandContraction(s){
			  this.sets(s);
			  if(!this.getElementsByClassName(document,this.set.className,this.set.classTag)){return false}
			  this.aClass=this.getElementsByClassName(document,this.set.className,this.set.classTag);
			  this.show();
		}
		ExpandContraction.prototype={
		getElementsByClassName:function(node, name, type) {
			if (node.getElementsByClassName)
				return node.getElementsByClassName(name);
				else {
				var r = [], re = new RegExp("(^|\\s)" + name + "(\\s|$)"), e = (node || document).getElementsByTagName(type || "*");
				for ( var i = 0; i < e.length; i++ ) {
					if( re.test(e[i].className) )
						r.push(e[i]);
				}
				return r;
			}
		},
		Extend:function(destination, source) {
		for (var property in source) {
		  destination[property] = source[property];
		}
		},
		sets:function(s){
			this.set={
			className:'ClientCat',
			classTag:"div",
			curClass:"cur",
			indexNub:0,
			fTag:"dt",
			sTag:"dd",
			closeSelf:1,//自己展开时再点击自己时是否需要关闭自己
			closeLast:1 //是否要关闭上一个展开，1要关闭，0不关闭
			}
		   this.Extend(this.set,s||{})
		},
		show:function(){
			  var _this=this;
			  for(var i=0;i<this.aClass.length;i++){
			   (function(){
				var last,lastMenu,aDt=_this.aClass[i].getElementsByTagName(_this.set.fTag),aDd=_this.aClass[i].getElementsByTagName(_this.set.sTag),e=0;
				if(aDt.length!=aDd.length){alert('展开所需要的'+_this.set.fTag+'和'+_this.set.sTag+'数目不一样');return false}
				for(j=0;j<aDt.length;j++){
				  cleanWhitespace(aDd[j]);
				  (aDt[j].getElementsByTagName('a')[0] || aDt[j]).onfocus=function(){this.blur()}
				  if(aDd[j].childNodes.length==0){
					  //aDt[j].className+=" "+_this.set.curClass;
					  continue;
				  }
				  if(e==0 && aDt[j].className.indexOf(_this.set.curClass)!=-1){
					  aDd[j].style.display="block";
					  last=aDd[j];
					  lastMenu=aDt[j];
					  e++;
				  }
				  aDt[j].nub=j;
				  if(aDt[j].parentNode==_this.aClass[i]){
					  aDt[j].onclick=function(){
					  if(lastMenu==this){
						if(aDd[this.nub].style.display&&aDd[this.nub].style.display=="block"){
							this.className=this.className.replace(_this.set.curClass,"");
							aDd[this.nub].style.display="none";
							return false;
							}else{
							aDd[this.nub].style.display="block";
							if(this.className.indexOf(_this.set.curClass)==-1){this.className+=" "+_this.set.curClass;}
							return false;
						  };
					  }else{
						  
					  if(_this.set.closeLast){
						  if(last&&last!=aDd[this.nub]){last.style.display="none";}
						  if(lastMenu&&lastMenu!=this){lastMenu.className=lastMenu.className.replace(_this.set.curClass,"");}
					  }
					  
					  aDd[this.nub].style.display="block";
					  if(this.className.indexOf(_this.set.curClass)==-1){this.className+=" "+_this.set.curClass;}
					  last=aDd[this.nub];
					  lastMenu=this;
					  return false;
					  }
					  };
				   }  
				}
				if(e==0){
					aDd[_this.set.indexNub].style.display="block";
					if(aDt[_this.set.indexNub].className.indexOf(_this.set.curClass)==-1){aDt[_this.set.indexNub].className+=" "+_this.set.curClass;}
					last=aDd[_this.set.indexNub];
					lastMenu=aDt[_this.set.indexNub];
				}
			 })(); 
			   
			}
			
		}
			  
		};
		domReady(function(){
		var tip=getElementsByClassName(document,'p-close','a');
		for(var i=0,len=tip.length;i<len;i++){
			tip[i].onclick=function(){this.parentNode.style.display='none';return false}
		}
		var ClientCat=new ExpandContraction({className:'ClientCat',fTag:"dt",sTag:"dd",classTag:"dl",curClass:'select'})
		})

})()