for(var i=1; i < 4; i++){
                var id = document.getElementById("a" + i);
				  /*
				   这里生成了一个匿名函数并赋值给对象 id_i;
				  */
                id.onclick = function(){
				  /*
				  这个i来源于局部变量，无法以window.i或者obj.i的形式在后期引用，
				  只好以指针或者变量地址方式保存在这个匿名函数中，
				  这就是传说的闭包，所以所有这个过程中生成的事件句柄都使用引用
				  的方式来持久这个变量，也就是这些匿名函数共用一个变量i;
				  */
                          alert(i);
                };
        };
        /*
        解决方式:
        1. 局部变全局

        for(var i=1; i < 4; i++){
                var id = document.getElementById("a" + i);
                id.i=i;//这个i有了根
                id.onclick=function(){
                        alert(this.i)
                };
         };

        for(var i=1; i < 4; i++){
                var id = document.getElementById("a" + i);
                window[id.id]=i;//这个i有了根
                id.onclick=function(){
                        alert(window[this.id]);
                };
        }

         2. 产生一对一的更多闭包

        for(var i=1; i < 4; i++){
           var id = document.getElementById("a" + i);
           id.onclick=(function(i){
                return function(){
                                alert(i);//这个i是实参的闭包
                        }
           })(i);
         };

        for(var i=1; i < 4; i++){
           var id = document.getElementById("a" + i);
           id.onclick=new function(){
               var i2=i;//这个i是闭包的闭包
                return function(){
                                alert(i2);
                        }
           };
        };

        */