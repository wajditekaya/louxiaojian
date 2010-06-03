var _ppsflag=false;

function _ppsinit(p,l)
{
    if(p!=null)
    {
        
        if(typeof (p.onstatustext)=="function")
        {
            p._getobj().attachEvent("StatusText",p.onstatustext);
        }
    }
}
function _ppsdestory(p,l)
{
	try
	{
	    if(p!=null)
	    {
	    	p.stop();
	    	try
	    	{
	    		//p.pps_obj.parentNode.innerHTML="";
	    		document.getElementById('__ppswin').innerHTML="";
	    	}
	    	catch(e)
	    	{
	    	}
	        //p.pps_obj=null;
	        p=null
	    }
	}
	catch(e)
	{
	}
}



//---------------public-------------------
PPStream.prototype.pps_width="400px";
PPStream.prototype.pps_height="400px";
PPStream.prototype.pps_autostart="0";
PPStream.prototype.pps_showcontrol="1";
PPStream.prototype.pps_showposition='1';

//-------------private-------------------
//PPStream.prototype.pps_obj=null;
PPStream.prototype.pps_objid="";
PPStream.prototype.__volume=100;
PPStream.prototype.__mute=0;
PPStream.prototype.__src="";
PPStream.prototype.__ppsstr="";
PPStream.prototype.__logo="";
PPStream.prototype.__client="";
PPStream.prototype.__isshow=false;
PPStream.prototype.__isinstall=false;
PPStream.prototype.__hascreate=false;
//-------------event--------------------
PPStream.prototype.callback_installpps=null;
PPStream.prototype.onpause=null;
PPStream.prototype.onplay=null;
PPStream.prototype.onstop=null;
PPStream.prototype.onstatustext=null;


function PPStream (id) {
	
	var self = this;	
	
	this.reset = function (pid) 
	{
		if(pid!="" && _ppsflag==false)
		{
			//alert("asdf")
			this.pps_objid=pid;
			//this.pps_autostart=1
			//this.pps_showcontrol=1
			//this.pps_width=pw;
			//this.pps_height=ph;
			//this.pps_autostart=pautostart;
			//this.pps_src=psrc;
			_ppsflag=pid;
			//alert(this.pps_objid)			
			

		}
		else
		{
			throw "This is a Single Pattern Class";
		}
	};
	this.reset(id);
}

/*
 *-------------------------private------------------------
 */

PPStream.prototype._cexist=function()
{
	if(_ppsflag!=this.pps_objid)
	{	
		//alert(_ppsflag+" "+this.pps_objid)
		throw "No Class";
	}
}
PPStream.prototype._isshow=function()//throw "no call show method";
{
	return this.__isshow;
}
PPStream.prototype._isinstall=function()//throw "no install ppstream";
{
    if(!this.__isinstall)
    {
        if (typeof(this._getobj().src)!="string")
	    {
	    	document.getElementById('__ppswin').innerHTML="";
		    if(typeof (this.callback_installpps)=="function")
		    {
			    this.callback_installpps();
		    }		    
	    }
	    else
	    {
	        this.__isinstall=true;
	    }
    }
	return this.__isinstall;
}
PPStream.prototype._hascreate=function()//throw "no oncreate control";
{
    if(!this.__hascreate)
    {
        if(this._gethwnd()!='')
        {
            this.__hascreate=true;
        }    
    }
    return this.__hascreate;
}

PPStream.prototype._getobj=function()
{
	//alert(this.pps_objid)
	return document.getElementById(this.pps_objid)
}
PPStream.prototype._formatppsstr=function()
{
	this.__ppsstr="<div id='__ppswin'>";
	this.__ppsstr+="<OBJECT CLASSID=\"clsid:5EC7C511-CD0F-42E6-830C-1BD9882F3458\" ";
	this.__ppsstr+="CODEBASE=http://download.ppstream.com/bin/powerplayer.cab standby=\"加载播放器中...\" ";
	this.__ppsstr+="WIDTH='"+this.pps_width+"' HEIGHT='"+this.pps_height+"' ID='"+this.pps_objid+"'>";
	this.__ppsstr+="<param name=\"ShowControl\" value='"+this.pps_showcontrol+"'>";
	this.__ppsstr+="<param name=\"showposition\" value='"+this.pps_showposition+"'>";
	this.__ppsstr+="<param name=\"src\" value='" + this.__src + "'>";
	this.__ppsstr+="<param name=\"mute\" value='" + this.__mute + "'>";
	this.__ppsstr+="<param name=\"volume\" value='" + this.__volume + "'>";
	this.__ppsstr+="<param name=\"autostart\" value='"+this.pps_autostart+"'>";
	this.__ppsstr+="<param name=\"logo\" value='" + this.__logo + "'>";
	this.__ppsstr+="<param name=\"client\" value='"+this.__client+"'>";
	this.__ppsstr+="<param name=\"wmode\" value=\"transparent\" />";
	this.__ppsstr+="</OBJECT></div>";
}
PPStream.prototype.su1=function()
{
    if(this.__isshow && this.__isinstall)
    {
        return true;
    }
    else
    {
        return false;
    }
}
PPStream.prototype.su2=function()
{
    if(this.__isshow && this.__isinstall && this._hascreate())
    {
        return true;
    }
    else
    {
        return false;
    }
}
/*
pps控件内部接口
*/
PPStream.prototype._play=function()
{
	return this._getobj().play();
}
PPStream.prototype._stop=function()
{
	return this._getobj().stop();
}
PPStream.prototype._pause=function()
{
	return this._getobj().pause();
}
PPStream.prototype._src=function()
{
	this._getobj().src=this.__src;
}
PPStream.prototype._mute=function()
{
	this._getobj().Mute=this.__mute;
}
PPStream.prototype._volume=function()
{   
    this._getobj().Volume=this.__volume;
}
PPStream.prototype._logo=function()
{   
    this._getobj().logo=this.__logo;
}
PPStream.prototype._client=function()
{   
    this._getobj().client=this.__client;
}
PPStream.prototype._setfullscreen=function()
{   
    this._getobj().SetFullScreen(true);
}
PPStream.prototype._gethwnd=function()
{
	return this._getobj().getHWND();
}



/*
 *----------------------public------------------------
 */
PPStream.prototype.show=function()
{
	try
	{
		if(!this.__isshow)
		{
			this._cexist();//判断是否类存在
			this._formatppsstr();//格式化
			//alert(this.__ppsstr)
			document.write(this.__ppsstr);		
			//this.pps_obj=this._getobj();
			this.__isshow=true;
			this._isinstall();
			//window.attachEvent('onload',new Function(this._ppsinit(this)));//IE中
		}
	}
	catch(e)
	{
	}
}
PPStream.prototype.setsrc=function(aurl)
{
	try
	{
		this.__src=aurl;
		if(this.su1())
		{
		    this._src()
		}
	}
	catch(e)
	{
	}
}
PPStream.prototype.setvolume=function(v)
{
	try
	{
	    if(v>=0 && v<=100)
	    {
	        this.__volume=v;
		    if(this.su1())
	        {
	            s=this._volume(v);
	        }
		    return s;
	    }
    }
	catch(e)
	{
	}
}
PPStream.prototype.setlogo=function(l)
{   
	try
	{
	    this.__logo=l;
		if(this.su1())
		{
		    this._logo()
		}
	}
	catch(e)
	{
	}
}
PPStream.prototype.setclient=function(c)
{   
	try
	{
	    this.__client=c;
		if(this.su1())
		{
		    this._client()
		}
	}
	catch(e)
	{
	}
}
PPStream.prototype.mute=function(m)
{
	
	try
	{
	    if(m=="1" || m=="0")
		{
			this.__mute=m;
		}
		else
		{
	        this.__mute=(this.__mute+1)%2;
	    }
		if(this.su1())
	    {
	        s=this._mute();
	    }
		//return s;
	}
	catch(e)
	{
	}
}
PPStream.prototype.setfullscreen=function()
{
	try
	{
	    if(this.su2())
	    {
	        this._setfullscreen();
	    }
    }
	catch(e)
	{
	}
}
PPStream.prototype.play=function(aurl)
{	
	try
	{
		if(aurl!=null)
		{
			this.setsrc(aurl);
		}
		else
		{
			//alert("empty")
		}
		if(this.__src!="")
		{
			if(this.su2())
		    {
		    	s=this._play();
		    	if(typeof (this.onplay)=="function")
				{
					this.onplay();
				}
			    
			}
		}	
		//return s;
	}
	catch(e)
	{
	}
}
PPStream.prototype.stop=function()
{
	try
	{
		if(this.su2())
	    {
	        s=this._stop();
	        if(typeof (this.onstop)=="function")
			{
				this.onstop();
			}
	    }
		//return s;
	}
	catch(e)
	{
	}
}
PPStream.prototype.pause=function()
{
	try
	{
		if(this.su2())
	    {
	        s=this._pause();
	        if(typeof (this.onpause)=="function")
			{
				this.onpause();
			}
	    }
		return s;
	}
	catch(e)
	{
	}
}
PPStream.prototype.getsrc=function()
{
	try
	{
		return this.__src;
	}
	catch(e)
	{
	}
}
PPStream.prototype.getvolume=function()
{
	try
	{
    	return this.__volume;
    }
	catch(e)
	{
	}
}
PPStream.prototype.getlogo=function()
{   
	try
	{
    	return this.__logo;
    }
	catch(e)
	{
	}
}
PPStream.prototype.getclient=function()
{   
	try
	{
    	return this.__client;
    }
	catch(e)
	{
	}
}
PPStream.prototype.ismute=function(m)
{
	try
	{
		return this.__mute;
	}
	catch(e)
	{
	}
}


ppspowerplayer=new PPStream('powerplayer');
window.attachEvent("onload",new Function("_ppsinit(ppspowerplayer)"));
window.attachEvent("onunload",new Function("_ppsdestory(ppspowerplayer)"));