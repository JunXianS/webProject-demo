
/*效果需求：
※ 1，菜单滑动起来
※ 2，当滑动到一定的距离的时候不能滑动  滑动区间
※ 3，当触摸结束的时候 需要判断是否在定位区间内 否则吸附回去 定位回去
※ 4，点击菜单的时候 改变当前的样式
※ 5，点击菜单的时候 定位到当前的那个菜单到最顶部 如果不满足定位区间就不做定位
*/
var parentBox=document.querySelector(".jd_category_left");
var childBox=parentBox.querySelector("ul");
var parentHeight=parentBox.offsetHeight;
var childHeight=childBox.offsetHeight;
/*
	translateY 初始的定位 其实就是最大定位 0
	translateY 滑动到最下面的定位 就是最小定位 = 父容器高度 - 子容器高度
*/
var maxY=0;
var minY=parentHeight-childHeight;
/*自定义缓冲距离*/
var distance=100;
/*translateY 最大滑动定位*/
var maxSwipe=maxY+100;
/*translateY 最小滑动定位*/
var minSwipe=minY+100;

/*第一步  1.菜单滑动起来*/
var startY=0;//刚刚触摸到菜单时的y的坐标
var moveY=0;//在不停滑动的时候的y的坐标
var distanceY=0;//不停滑动时滑动距离的坐标值
var isMove=false;//判断是否滑动过

var currY=0;//记录当前定位 全局参数 相当于轮播图中的index

/*定义公用的方法*/
var addTransition = function(){//添加过渡
    childBox.style.webkitTransition = "all .2s";
    childBox.style.transition = "all .2s";
}
var removeTransition = function(){//清除过渡
    childBox.style.webkitTransition = "none";
    childBox.style.transition = "none";
}
var setTranslateY = function(y){//设置y轴的定位
    childBox.style.webkitTransform = "translateY("+y+"px)";
    childBox.style.transform = "translateY("+y+"px)";
}
// 绑定事件
childBox.addEventListener('touchstart',function(e){
	startY = e.touches[0].clientY;
});
childBox.addEventListener('touchmove',function(e){
	moveY = e.touches[0].clientY;
	distanceY=moveY-startY;
	// 清除过渡
	removeTransition();
	// 设置定位
	// 第二个需求点
	 if((currY + distanceY) < maxSwipe &&　(currY + distanceY) > minSwipe){
            setTranslateY(currY + distanceY);
        }

});
window.addEventListener('touchend',function(e){
	/*当往下滑的时候 大于 最大定位*/
        if(( currY + distanceY)>maxY){
            currY = maxY;
            addTransition();
            setTranslateY(currY);
        }
        /*当往上滑的时候 小于 最小定位*/
        else if(( currY + distanceY)<minY){
            currY = minY;
            addTransition();
            setTranslateY(currY);
        }
        else{
            /*记录当前的定位   上一次当前的定位 + 这一次改变的定位*/
            currY = currY + distanceY;
        }

	// 重置所有参数，不重置currY
	startY=0;
 	moveY=0;
 	distanceY=0;
 	isMove=false

});


