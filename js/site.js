nav_close_time=2000;
nav_close_timer=0;
var cardswipe_active=false;
$(document).ready(function() 
{
	jQuery('DIV.navigation').mouseenter(function(){
	 	window.clearTimeout(nav_close_timer);
	});
	jQuery('DIV.navigation').mouseleave(function(){
	 	window.clearTimeout(nav_close_timer);
	 	nav_close_timer=window.setTimeout(function(){jQuery('DIV.subnavigation_area').removeClass('subnavigation_area_active');},nav_close_time);
	}); 
	jQuery('DIV.subnavigation_area').mouseenter(function(){
	 	window.clearTimeout(nav_close_timer);
	});
	jQuery('DIV.subnavigation_area').mouseleave(function(){
	 	window.clearTimeout(nav_close_timer);
	 	nav_close_timer=window.setTimeout(function(){jQuery('DIV.subnavigation_area').removeClass('subnavigation_area_active');},nav_close_time);
	});

	jQuery("#card_modal").delegate("#cc_rawdata",'change',function(){
	 	CardSwipe(jQuery(this));
	});	

	$(document).on('submit','FORM',function(){
		if(cardswipe_active)
		{
			event.preventDefault();
			return false;
		}
	});
});

function CardSwipeOpen()
{
	cardswipe_active=true; 
 
	jQuery("#card_modal_data").html("Swipe Card to Continue");
	jQuery("#card_modal").modal("show");		
	jQuery("#cc_rawdata").val('');
	jQuery("#cc_rawdata").focus();				
}

function CardSwipe(item)
{ 
	jQuery("#card_modal_data").html("Reading Card...");

	var trackdata=item.val(); 
	if(!trackdata)
		return CardError();		

	var data=ParseTrack(item.val());
	var ccnum=data['ccnum'];
	var ccexp=data['ccexp'];
	var name=data['name'];

	if(!ccnum)
		return CardError();	
	if(!ccexp)
		return CardError();	
	if(!ccexp)
		return CardError();	

	var ccexp=ccexp.split('/');

	jQuery("INPUT.order_ccnum").val(ccnum);
	jQuery("SELECT.order_ccexpm").val(ccexp[0]);
	jQuery("SELECT.order_ccexpy").val(ccexp[1]);
	jQuery("INPUT.order_ccccv").val('');
	jQuery("#card_modal").modal("hide");
	
	setTimeout(function(){cardswipe_active=false;},1000);
	
	return false;		
	
}

function ParseTrack(trackdata)
{
	var data=new Array();

	var lines = trackdata.split("?");	
	if(lines.length<2)
		return data;
	var line0 = lines[0].split("^");	
	if(line0.length<2)
		return data;
	var line1 = lines[1].split("=");	
	if(line1.length<2)
		return data;

	var cc=line1[0].replace(';','').replace(' ','');

	data['name']=line0[1].split('/');
	data['ccnum']=cc;
	data['ccexp']=line1[1].substr(2,2)+'/'+line1[1].substr(0,2);

	return data;
	
}


function CardError()
{
	jQuery("#card_modal_data").html("There was an error reading your card; please try again");
	jQuery("#cc_rawdata").val('');	
}


//EQUAL HEIGHTS
jQuery(function(){
	$("DIV.wysiwyg_block").each(function(){$(this).contents().wrapAll("<div class='box_inner'></div>");});	
	$("DIV.footer_section").each(function(){$(this).contents().wrapAll("<div class='box_inner'></div>");});	
	$("DIV.carousel-inner DIV.item").each(function(){$(this).contents().wrapAll("<div class='box_inner'></div>");});		
	$("DIV.category_short").each(function(){$(this).contents().wrapAll("<div class='box_inner'></div>");});		
	$("DIV.product_short_,DIV.product_short_WIDE").each(function(){$(this).contents().wrapAll("<div class='box_inner'></div>");});		
	//$("TD.CalendarDay").each(function(){$(this).contents().wrapAll("<div class='box_inner'></div>");});//done by calendar.

})

//RESEIZE
$(window).bind("resize", resize_handler).bind("load", resize_handler)
function resize_handler(){
	if($(window).width()>991)  //xs-767-sm-991-md-1199-lg
		$("DIV.wysiwyg_blocks").equalHeightsEach('DIV.wysiwyg_block');
	else
		$("DIV.wysiwyg_block").css({'height':''});

	if($(window).width()>767)
		$("DIV.footer_section").equalHeights();
	else
		$("DIV.footer_section").css({'height':''});

	if($(window).width()<=767)
   		$('.carousel').carousel('pause');
   	else
   		$('.carousel').carousel('cycle');
//	if($(window).width()>991)  //xs-767-sm-991-md-1199-lg
//		$("TD.CalendarDay").equalHeights();
//	else
//		$("TD.CalendarDay").css({'height':''});

	var which=0;
	for(var i=0;i<$("DIV.carousel-inner DIV.item").length;i++)
	{
		if($($("DIV.carousel-inner DIV.item").get(i)).hasClass('active'))
			which=i;
	}
	$("DIV.carousel-inner DIV.item").addClass('active');
	$("DIV.carousel-inner DIV.item").equalHeights(); 
	$("DIV.carousel-caption-wrapper").valignCenter('DIV.carousel-caption-container'); 		
	$("DIV.carousel-inner DIV.item").removeClass('active');
	$($("DIV.carousel-inner DIV.item").get(which)).addClass('active');

	$("DIV.category_short").equalHeights(); 
	$("DIV.category_short-wrapper").valignCenter('DIV.category_short-container'); 		

	$("DIV.product_short_,DIV.product_short_WIDE").equalHeights(); 

	var products=$("DIV.product_short");
	for(var i=0;i<products.length;i++)
	{
		var product=jQuery(products.get(i));	
		$('DIV.product_short-container',product).css({'max-height':($('IMG',product).height()-40)+'px','overflow':'auto','position':'relative','top':'-40px'}); 				
	}

	$("DIV.product_short-wrapper").addClass('product_short-wrapper_active');
	$("DIV.product_short-wrapper").valignCenter('DIV.product_short-container'); 		
	$("DIV.product_short-wrapper").removeClass('product_short-wrapper_active');
}

/*glob function*/
(function($){
	$.fn.equalHeights=function(minHeight,maxHeight){
		tallest=(minHeight)?minHeight:0;
		this.each(function(){
			if($(">.box_inner", this).outerHeight()>tallest){
				tallest=$(">.box_inner", this).outerHeight()
			}
		});
		if(this.length<2)
			return;
		if((maxHeight)&&tallest>maxHeight) tallest=maxHeight;
		return this.each(function(){$(this).height(tallest)});
	}
	$.fn.equalHeightsEach=function(selector){
		this.each(function(){
			tallest=0;
			$(selector,this).each(function()
			{
				if($(">.box_inner", this).outerHeight()>tallest){
					tallest=$(">.box_inner", this).outerHeight();
				}
			});
			if(tallest && $(selector,this).length>1)
				jQuery(selector,this).each(function(){$(this).height(tallest)});
		});
	}
	$.fn.equalHeightsN=function(minHeight,maxHeight,n){
		tallest=(minHeight)?minHeight:0;
		var cnt=0;
		var cntstart=0;
		for(var i=0;i<this.length;i++)
		{			
			cnt++;			
			if($(">.box_inner", jQuery(this.get(i))).outerHeight()>tallest)
			{
				tallest=$(">.box_inner", jQuery(this.get(i))).outerHeight()
			}
			if((cnt==4) || i==(this.length-1))
			{
				for(var j=0;j<n;j++)			
				{
					jQuery(this.get(j+cntstart)).height(tallest);
				}
				tallest=(minHeight)?minHeight:0;
				var cntstart=i+1;
				var cnt=0;
			}
		}
		return this;
	}
	$.fn.valignCenter=function(selector){
		this.each(function(){
			var img=jQuery(selector, this);
			var half=(jQuery(this).height()-img.height())/2;
			img.css({'margin-top':half+'px','margin-bottom':half+'px'});
		});
	}	
})(jQuery)


var variation_dates_array=new Array();
function AttachBehaviors()
{
	jQuery('INPUT.datepicker').datepicker({dateFormat:'mm/dd/yy DD'});
	jQuery('INPUT.datepicker_consult').datepicker({dateFormat:'mm/dd/yy DD',minDate:'+2d',beforeShowDay: function(date) {var day = date.getDay();return [(day == 3 || day == 4)];}});
	jQuery('DIV.variation_dates').datepicker({ 
		dateFormat:'yy-mm-dd',
		onSelect: function(dateText) {
			if(variation_dates_array.indexOf(dateText)!==-1)
				variation_dates_array.splice(variation_dates_array.indexOf(dateText),1);
			else
				variation_dates_array[variation_dates_array.length]=dateText;
			variation_dates_array.sort();
		 	jQuery('INPUT.variation_dates').val(variation_dates_array.join(","));
		},
		beforeShowDay: function (date) {
			var day=date.getDate();
			if(day.toString().length==1)
				day='0'+day;
			var month=(date.getMonth()+1);
			if(month.toString().length==1)
				month='0'+month;
			var year=date.getFullYear();
			var theday = year + '-' + month + '-' + day; 
			return [true,$.inArray(theday, variation_dates_array) >=0?'selected_date':'nonselected_date'];
		}	 			
	});

	jQuery('TEXTAREA.noscroller').each(function(){
		jQuery(this).css({height:'5px'});
		jQuery(this).css({height:25+jQuery(this).prop('scrollHeight')});		
	});
	jQuery('TEXTAREA.noscroller').keyup(function(){
		jQuery(this).css({height:'5px'});
		jQuery(this).css({height:25+jQuery(this).prop('scrollHeight')});		
	});
}
jQuery(document).ready(function($){AttachBehaviors();});


function CharCount(inputid,coutdivid,max=0)
{
	var len=jQuery('#'+inputid).val().length;
	jQuery('#'+coutdivid).html(len);	
}
