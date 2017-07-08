(function($){  
  
    jQuery.fn.select = function(options){  
        return this.each(function(){  
            var $this = $(this);  
            var $select = $this.find("p");  
            var $el = $this.find("ul > li");  
                                      
            $this.click(function(e){ 
            	$select.toggleClass("cur");
                $(this).children("ul").slideToggle();  
                e.stopPropagation();  
            });  
              
            $el.click(function(){  
                var $this_ = $(this);
                $select.removeClass("cur");  
                $select.html("<span>"+$this_.text()+"</span><i></i>");
            }); 
                 
        });  
          
    }  
      
})(jQuery);
$(".bjbox .head .drop").select();

var data = [
	{
		child:"曹俊熙",
		parent:"曹斌",
		isfather:true,
		phone:"15623656688"
	},
	{
		child:"王熙",
		parent:"麻仁",
		isfather:false,
		phone:"16253698745"
	},
	{
		child:"小樱",
		parent:"王熙",
		isfather:false,
		phone:"13966665555"
	},
	{
		child:"佐助",
		parent:"王军",
		isfather:true,
		phone:"13152689456"
	},
	{
		child:"卡卡西",
		parent:"西卡卡",
		isfather:false,
		phone:"18325256771"
	},
	{
		child:"大蛇丸",
		parent:"蛇王",
		isfather:true,
		phone:"13562144125"
	},
	{
		child:"佩恩",
		parent:"天",
		isfather:true,
		phone:"15325256912"
	},
	{
		child:"鸣人",
		parent:"四代",
		isfather:true,
		phone:"18236514587"
	},
	{
		child:"纲手",
		parent:"岗脚",
		isfather:true,
		phone:"17362569854"
	},
	{
		child:"春野樱",
		parent:"花文",
		isfather:false,
		phone:"13612546254"
	}
];
function create(option,index,arr){
	$("#householder").height((arr.length*2.4533+7.4667)+"rem")
	var li = document.createElement('li');
	if(index%3==0){li.className+=" color3"}
	if(index%3==1){li.className+=" color1"}
	if(index%3==2){li.className+=" color2"}
	li.innerHTML = ["<p class=\"name\"><span>",
					option.child,
					"</span></p><div class=\"inner\"><div class=\"cnt\"><p class=\"p1\">监护人：",
					option.parent,
					"（",
					option.isfather?"爸爸":"妈妈",
					"）</p><p class=\"p2\">电话：",
					option.phone,
					"</p><p class=\"p3\"><span>移除</span><span>加入</span></p><div class=\"fix fix1\"><p>你是否确认",
					option.child,
					option.isfather?"爸爸":"妈妈",
					"移除",
					"三（1）班",
					"</p><p><span>取消</span><span>确认</span></p></div>",
					"<div class=\"fix fix2\"><p>你是否确认",
					option.child,
					option.isfather?"爸爸":"妈妈",
					"加入",
					"三（1）班",
					"</p><p><span>取消</span><span>确认</span></p></div>",
					"</div></div>"].join("");
	return li;
}
$(document).ready(function(){
	data.forEach(function(item,index,arr){
		$("#householder").append(create(item,index,arr))
	});
	var $cnt = $("#householder li .inner .cnt")
	$(".p3 span:first-child",$cnt).click(function(){
		$(this).parent().parent().find(".fix1").show()
	});
	$(".p3 span:last-child",$cnt).click(function(){
		$(this).parent().parent().find(".fix2").show()
	});
	$(".fix1 p:last-child span:last-child",$cnt).click(function(){
		$(this).closest("li").animate({left:"-10rem",opacity:"0.3"},500,function(){
		      $(this).remove();
		});
	});
	$(".fix2 p:last-child span:last-child",$cnt).click(function(){
		$(this).closest("li").animate({left:"10rem",opacity:"0.3",transform:"translateY(-5rem) scale(0.3)"},500,function(){
		      $(this).remove();
		});
	});
	$(".fix p:last-child span:first-child").click(function(){
		$(this).parent().parent().hide();
	});
	
})

var y0,y1,y2;
$('#householder').on('touchstart',function(e) {
    var _touch = e.originalEvent.targetTouches[0];
    var _y0= _touch.pageY;
    y0 = _y0;
    $('#householder').on('touchmove',function(e) {
		e.preventDefault();	
	    var _touch = e.originalEvent.targetTouches[0];
	    var _y1= _touch.pageY;
	    y1 = _y1;
	},false);
});
$('#householder').on('touchend',function(e) {
    var _touch = e.originalEvent.changedTouches[0];
    var _y2= _touch.pageY;
    y2 = _y2;
    if(y2-y0>30){
    	$('#householder').append($('#householder li').eq(0))
    }else if(y2-y0<-30){
    	var $Len = $('#householder li').length;
		$('#householder').prepend($('#householder li').eq($Len-1))
    }
});