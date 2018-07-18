function ObjectFunctionAjax(object,object_id,fn,target_id,formid,loadingtext,addparams,callback_fn)
{
/*  
	var params=new Object();
	var inputs=jQuery('#'+formid+' INPUT');
	for(var i=0;i<inputs.length;i++)
	{
		if(inputs[i].type=='radio')
		{
		   	if(inputs[i].checked)
			  	params[inputs[i].name]=inputs[i].value;
		}
		else if(inputs[i].type=='checkbox')
		{
		   	if(inputs[i].checked)
			  	params[inputs[i].name]=inputs[i].value;
		   	else
			  	params[inputs[i].name]=0;
		}
		else
		  	params[inputs[i].name]=inputs[i].value;
	}
	var selects=jQuery('#'+formid+' SELECT');
	for(var i=0;i<selects.length;i++)
	  	params[selects[i].name]=selects[i].value;	
	var textareas=jQuery('#'+formid+' TEXTAREA');
	for(var i=0;i<textareas.length;i++)
	  	params[textareas[i].name]=textareas[i].value;
*/
	if(loadingtext)
		jQuery('#'+target_id).html("<div class='loading'><div class='loading_inner'>"+loadingtext+"</div></div>");
	else
		jQuery('#'+target_id).addClass('loading');
		
	var params=jQuery('#'+formid).serialize();
	var checkboxes=jQuery('#'+formid+' input[type=checkbox]');
	for(var i=0;i<checkboxes.length;i++)
	{
	   	if(!checkboxes[i].checked)
		  	params+='&'+checkboxes[i].name+'=0';
	}


	var url='/ajax/ObjectFunction.php?object='+object+'&object_id='+object_id+'&object_function='+fn+'&'+addparams;

	jQuery.post(url,params,function(data){
	 	jQuery('#'+target_id).html(data);
		jQuery('#'+target_id).removeClass('loading');
	 	if(callback_fn)
	 		callback_fn();
	 	if(AttachBehaviors)
	 		AttachBehaviors();
	},'text');
}


function ObjectFunctionAjaxPopup(headline,object,object_id,fn,formid,loadingtext,addparams,callback_fn,popup_class)
{	
	jQuery('#popup').css({display:'block'});
	jQuery('#popup_bg').css({display:'block'});
	jQuery('#popup').removeClass();
	jQuery('#popup').addClass(popup_class);
	jQuery('#popup_headline').html(headline);
	ObjectFunctionAjax(object,object_id,fn,'popup_content',formid,loadingtext,addparams,callback_fn);
}

function PopupClose()
{	
	jQuery('#popup').css({display:'none'});
	jQuery('#popup_bg').css({display:'none'});
	jQuery('#popup_content').html('');
}