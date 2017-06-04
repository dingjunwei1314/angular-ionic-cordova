angular.module('starter.controllers', [])


.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}])

// .filter('info_filter', function () {
//     return function (input) {
//     	for(var i=0;i<input.length;i++)
//         return input[i].type_name="学习资料";
//     }
// })


.controller('tabCtrl',  function($scope,$rootScope,$state,$window,common){

    
    
})
//首页
.controller('indexCtrl', function($scope,$ionicNativeTransitions,$timeout,$http,$ionicSlideBoxDelegate,$ionicLoading,$state,common){
	
	
	common.load_animation(true)
	console.log(common.getData('/main.php?session_id=203639*14e1b600b1fd579f47433b88e8d85291'))
	common.getData('/main.php?session_id=203639*14e1b600b1fd579f47433b88e8d85291').then(function(data){

		common.load_animation(false)
		data=data.data
		var product_list=[];
		for(var i=0;i<4;i++){
			product_list.push(data.product_list[i]);
		}
		$scope.index_page_data={
		data:data,
	    banner:data.push_list,  //banner
        item_0:data.live,
		item_1:data.item_1,
		item_2:data.item_2,
		item_3:data.item_3,
		item_4:product_list,  //热门课程
		item_5:data.free_video,  //干货分享
		item_6:data.news_list  //考试攻略
		}
		$ionicSlideBoxDelegate.update();
		$ionicSlideBoxDelegate.$getByHandle("slideboximgs").loop(true);

	},function(){
		common.show_toast('请求失败')
	})
	//进入banner
	$scope.enter_banner=function(n){
		if(n.is_open=='1'){
			var url=JSON.parse(n.push_params).url;
			common.start_window(url)
		}
	}
	//进入推荐
	$scope.enter_recom_info=function(n){
		console.log(n)
		common.start_window(JSON.parse(n.push_params).url)
	}
	//进入每日一练
	$scope.enter_daily_practice=function(type){
		$ionicNativeTransitions.stateGo('tab.daily_practice', {type:type}, {}, {
			type:'slide',
			direction:'left',
			duration:200
		});
	}

	//进入护士圈
	$scope.enter_nurse_index=function(){
		$ionicNativeTransitions.stateGo('tab.nurse_index', {}, {}, {
			type:'slide',
			direction:'left',
			duration:200
		});
	}
	//进入真题模考
	$scope.enter_mock_list=function(){
		$ionicNativeTransitions.stateGo('tab.mock_list', {}, {}, {
			type:'slide',
			direction:'left',
			duration:200
		});
	}
	//进入做题记录
	$scope.enter_topic_record=function(){
		$ionicNativeTransitions.stateGo('tab.topic_record', {}, {}, {
			type:'slide',
			direction:'left',
			duration:200
		});
	}
	//进入看课记录
	$scope.enter_watch_record=function(){
		$ionicNativeTransitions.stateGo('tab.my_course', {}, {}, {
			type:'slide',
			direction:'left',
			duration:200
		});
	}
	//进入课程详情
	$scope.enter_course_detail=function(n){
		$ionicNativeTransitions.stateGo('tab.course_detail', {courseId:n}, {}, {
			type:'slide',
			direction:'left',
			duration:200
		});
	}
	//进入免费课程
	$scope.enter_free_course=function(n){
		$ionicNativeTransitions.stateGo('tab.course_detail', {video_id:n}, {}, {
			type:'slide',
			direction:'left',
			duration:200
		});
	}
	//进入更多课程
	$scope.enter_course_list=function(){
		$ionicNativeTransitions.stateGo('tab.course', {}, {},{
			type:'fade',
			duration:'0'
		}
		);
	}
	//进入资讯
	$scope.enter_info=function(){
		$ionicNativeTransitions.stateGo('tab.info', {}, {}, {
			type:'slide',
			direction:'left',
			duration:200
		});
	}

	
})

//课程
.controller('courseCtrl',function($scope,$timeout,$ionicLoading,$http,common){
	function getData(is_broadcast){
		common.load_animation(true)
		common.getData('/list_product.php?type=2&session_id=203639*14e1b600b1fd579f47433b88e8d85291').then(function(data){
			$scope.list=data.data.list
			common.load_animation(false)
			if(is_broadcast){
				$scope.$broadcast('scroll.refreshComplete');
			}
		},function(){
			common.show_toast('请求失败')
			if(is_broadcast){
				$scope.$broadcast('scroll.refreshComplete');
			}
		})
	}
	getData(false)
	//下拉刷新
	$scope.doRefresh=function(){
		getData(true)
	}
	$scope.enter_course_detail=function(){
		$ionicNativeTransitions.stateGo('tab.course', {}, {}, {
		    
		});
	}
	
	
})

//课程详情
.controller('course_detailCtrl',function($scope,$http,$timeout,$stateParams,$rootScope,$ionicHistory,$ionicNativeTransitions,$sceDelegate,resd,common){

	common.load_animation(true)
	console.log(resd)
	$scope.course_detail_data=resd.data;
	$scope.course_detail_data.fav=resd.data.is_fav
	$scope.course_detail_data.is_show_product_banner=false;
	$scope.course_detail_data.is_show_play_btn=false;
	$scope.course_detail_data.is_playing_id=resd.data.id;
	try{
		var str_index=$scope.course_detail_data.detail.indexOf('/uploadimg');
		$scope.course_detail_data.detail=$scope.course_detail_data.detail.slice(0,str_index)+'http://m.yikaotop.com'+$scope.course_detail_data.detail.slice(str_index)
	}catch(ee){console.log(ee)}
	common.load_animation(false)
	
	//点击播放
	$scope.play=function(product_id,v_id){

		var params={act:'list',product_id:product_id,id:v_id}
		
		common.show_toast('加载中')
		common.getData('/play_video.php?session_id=203639*14e1b600b1fd579f47433b88e8d85291',params).then(function(res){
			console.log(res)
			if(res.data.code==1){
				$scope.bind_video()

				$scope.course_detail_data.fav=res.data.list.is_fav
				$scope.course_detail_data.is_show_product_banner=true;
				$scope.course_detail_data.is_show_play_btn=true;
				$scope.course_detail_data.is_playing_id=res.data.list.id;
				$scope.course_detail_data.playing_src=$sceDelegate.trustAs('resourceUrl',res.data.list.videosrc);
				$scope.course_detail_data.id=res.data.list.next_id;


			}else{
				common.show_toast(res.data.msg)
			}

		},function(){
			common.show_toast('请求失败')
		})
	}
	//开始播放
	$scope.begin_play=function(product_id,v_id){
		$scope.play(product_id,v_id)
	}
	//分享
	$scope.share=function(tit,id){
		var link='http://m.yikaotop.com/play_video.php?id='+id;
		console.log(tit)
		console.log(link)
		window.plugins.socialsharing.share(tit,null,null,link)
	}
	//赞——取消赞
	$scope.handle_fav=function(product_id){
		var params={}
		if($scope.course_detail_data.fav==0){
			params={target_id:product_id,act:"add_fav",type:"1"}
		}else{
			params={target_id:product_id,act:"del_fav",type:"1"}
		}
		common.getData('/fav_action.php?session_id=203639*14e1b600b1fd579f47433b88e8d85291',params).then(function(res){
			console.log(res)
			if(res.data.code==1){
				if($scope.course_detail_data.fav==0){
					common.show_toast(res.data.msg)
					$scope.course_detail_data.fav=1
				}else{
					common.show_toast(res.data.msg)
					$scope.course_detail_data.fav=0
				}

			}else{
				common.show_toast(res.data.msg)
			}

		},function(){
			common.show_toast('请求失败')
		})
	}
	//评论
	$scope.discuss=function(){	
		var send_comment = function(results){
			if (results.buttonIndex!=2){
				return;
			}
			var con = results.input1;
			if(con==''){
				view_update.common.show_alert('','留言内容不能为空哦');
				return;
			}
			
			var params={act:'liuyan',id:$scope.course_detail_data.is_playing_id,content:con}
			common.getData('/play_video.php?session_id=203639*14e1b600b1fd579f47433b88e8d85291',params).then(function(res){
				
				if(res.data.code==1){
					common.show_toast('评论成功')
				}else{
					common.show_toast('评论失败，请稍后重试')
				}

			},function(){
				common.show_toast('请求失败')
			})
			
			
			
		}
		navigator.notification.prompt(
		    '',  // message
		    send_comment,
		    '评论',            // title
		    ['取 消','发 送'],             // buttonLabels
		    ''                 // defaultText
		);
	}
	//购买
	$scope.go_to_buy=function(p_id){
		$ionicNativeTransitions.stateGo('tab.order', {p_id:p_id}, {}, {
			type:'slide',
			direction:'left',
			duration:200
		});
	}
	//视频事件

	$scope.bind_video=function(){
		//监听播放结束
		$('#video_play').on('ended',function(){
			$scope.play($scope.course_detail_data.product_id,$scope.course_detail_data.id)
		})
	}
	
	
	//tab切换
	$scope.tab_ishide=1;
	$scope.tab_change=function(params){
		$scope.tab_ishide=params;
	}

	//返回
	$scope.back=function(){
		common.commonBack()
	}
	
})
//订单
.controller('orderCtrl',function($scope,$timeout,$stateParams,$rootScope,$ionicHistory,$ionicNativeTransitions,$sceDelegate,common){
	common.load_animation(true)
	console.log($stateParams)

	function getData(is_do_refresh){
		var params={id:$stateParams.p_id}
		common.getData('/live_product_detail.php?&session_id=203639*14e1b600b1fd579f47433b88e8d85291&act=topic',params).then(function(res){
			$scope.order=res.data
			console.log($scope.order)
			if(is_do_refresh){
				$scope.$broadcast('scroll.refreshComplete');
			}
		},function(){
			common.show_toast("请求失败，请稍后重试")
			if(is_do_refresh){
				$scope.$broadcast('scroll.refreshComplete');
			}
		})
	}
	getData(false);
	// 下拉刷新
	$scope.doRefresh=function(){
		getData(true)
	}
	//开启
	
	//退出
	$scope.back=function(){
		common.commonBack()
	}
})
//做题纪录
.controller('topic_recordCtrl',function($scope,$timeout,$ionicLoading,$ionicNativeTransitions,$http,$ionicScrollDelegate,common){
	function getData(is_do_refresh){
		common.getData('/my_record.php?&session_id=203639*14e1b600b1fd579f47433b88e8d85291&act=topic').then(function(res){
			$scope.topic_record=res.data
			console.log($scope.topic_record)
			if(is_do_refresh){
				$scope.$broadcast('scroll.refreshComplete');
			}
		},function(){
			common.show_toast("请求失败，请稍后重试")
			if(is_do_refresh){
				$scope.$broadcast('scroll.refreshComplete');
			}
		})
	}
	getData(false);
	// 下拉刷新
	$scope.doRefresh=function(){
		getData(true)
	}
	//开启
	
	//退出
	$scope.back=function(){
		common.commonBack()
	}
})
//题库中心
.controller('exercise_centerCtrl',function($scope,$timeout,$ionicLoading,$ionicNativeTransitions,$http,$ionicScrollDelegate,common){
	function getData(is_do_refresh){
		common.getData('/topic_center.php?&session_id=203639*14e1b600b1fd579f47433b88e8d85291').then(function(res){
			$scope.exercise_center_data=res.data
			if(is_do_refresh){
				$scope.$broadcast('scroll.refreshComplete');
			}
		},function(){
			common.show_toast("请求失败，请稍后重试")
			if(is_do_refresh){
				$scope.$broadcast('scroll.refreshComplete');
			}
		})
	}
	getData(false);
	// 下拉刷新
	$scope.doRefresh=function(){
		getData(true)
	}
	//进入快速练习
	$scope.enter_daily_practice=function(type,title){
		$ionicNativeTransitions.stateGo('tab.daily_practice', {type:type,title:title}, {}, {
			type:'slide',
			direction:'left',
			duration:200
		});
	}
	//进入模拟考试
	$scope.enter_mock_list=function(){
		$ionicNativeTransitions.stateGo('tab.mock_list', {}, {}, {
			type:'slide',
			direction:'left',
			duration:200
		});
	}
	//进入章节练习
	$scope.enter_exercise_list=function(){
		$ionicNativeTransitions.stateGo('tab.exercise_list', {}, {}, {
			type:'slide',
			direction:'left',
			duration:200
		});
	}

})
//题库－模拟考试列表
.controller('mock_listCtrl',function($scope,$ionicNativeTransitions,$ionicHistory,$stateParams,common){
	function getData(is_do_refresh){
		common.getData('/exercise.php?&session_id=203639*14e1b600b1fd579f47433b88e8d85291&act=get_group_list').then(function(res){
			$scope.mock_list_data=res.data
			$scope.is_open_con=false
			console.log($scope.mock_list_data)
			if(is_do_refresh){
				$scope.$broadcast('scroll.refreshComplete');
			}
		},function(){
			common.show_toast("请求失败，请稍后重试")
			if(is_do_refresh){
				$scope.$broadcast('scroll.refreshComplete');
			}
		})
	}
	getData(false);
	// 下拉刷新
	$scope.doRefresh=function(){
		getData(true)
	}
	//开启
	$scope.enter_mock=function(id){
		$scope.is_open_con=true
		$scope.sure_enter_mock=function(type){
			$ionicNativeTransitions.stateGo('tab.daily_practice', {type:type,group_id:id}, {}, {
				type:'slide',
				direction:'left',
				duration:200
			});
		}
	}
	//退出
	$scope.back=function(){
		common.commonBack()
	}
})
//题库－章节练习列表
.controller('exercise_listCtrl',function($scope,$ionicNativeTransitions,$ionicHistory,$stateParams,common){
	function getData(is_do_refresh){
		common.getData('/chapter_exercise.php?&session_id=203639*14e1b600b1fd579f47433b88e8d85291').then(function(res){
			$scope.exercise_list_data=res.data
			console.log($scope.exercise_list_data)
			if(is_do_refresh){
				$scope.$broadcast('scroll.refreshComplete');
			}
		},function(){
			common.show_toast("请求失败，请稍后重试")
			if(is_do_refresh){
				$scope.$broadcast('scroll.refreshComplete');
			}
		})
	}
	getData(false);
	// 下拉刷新
	$scope.doRefresh=function(){
		getData(true)
	}
	//进入章节练习
	$scope.enter_exercise_chapter=function(type,chapter_id){
		$ionicNativeTransitions.stateGo('tab.daily_practice', {type:type,chapter_id:chapter_id}, {}, {
			type:'slide',
			direction:'left',
			duration:200
		});
	}
	//退出
	$scope.back=function(){
		common.commonBack()
	}
})

//题库-答题
.controller('daily_practiceCtrl',function($scope,$window,$ionicNativeTransitions,$ionicHistory,$timeout,$stateParams,common){
	console.log($stateParams)
	if($stateParams.type=='zj'){
		$scope.params1={act:'start_training',type:$stateParams.type,chapter_id:$stateParams.chapter_id,load_all:1}
		$scope.title='章节练习'
	}else if($stateParams.type=='kslx'){
		$scope.title='快速练习'
		$scope.params1={act:'start_training',type:$stateParams.type}
		if($stateParams.title=='历年真题'){
			$scope.title='历年真题'
		}
	}else if($stateParams.type=='sll'){
		$scope.params1={act:'start_training',type:$stateParams.type}
		$scope.title='每日一练'
		
	}else if($stateParams.type=='mock'){
		$scope.params1={act:'start_training',type:$stateParams.type,group_id:$stateParams.group_id}
		$scope.title='模拟考试'
	}else if($stateParams.type=='ctb'){
		$scope.params1={act:'start_training',type:$stateParams.type}
		$scope.title='错题练习'
	}else if($stateParams.type=='faved'){
		$scope.params1={act:'start_training',type:$stateParams.type}
		$scope.title='题库收藏'
	}
	common.load_animation(true)
	//请求数据
	function getDate(is_do_refresh){
		//变量
		$scope.type=$stateParams.type;//大体类型
		$scope.is_answering_num=1;//题号
		$scope.render_topic_data={};//渲染每一道题的数据
		$scope.finall_updata_data={};//最后提及数据
		$scope.all_data={}//请求到的所有数据
		$scope.topic_list_data={}//题目数据
		$scope.is_show_result_pad=false//是否显示答题卡
		$scope.timer_number=0;//定时器数字
		$scope.feedback_text='eee'//反馈
		$scope.is_open_timer_number=true;
		$scope.dx_myoptions=[]
		$scope.dx_myoption=[]

		common.getData('/exercise.php?&session_id=203639*14e1b600b1fd579f47433b88e8d85291',$scope.params1
			)
		.then(function(res){
			$scope.params2={act:'get_next_item',load_all:1,code:res.data.e_code}
			common.getData('/exercise.php?&session_id=203639*14e1b600b1fd579f47433b88e8d85291',$scope.params2
			).then(function(res){

				common.load_animation(false)
				$scope.action(res)
				if(is_do_refresh){
					$scope.$broadcast('scroll.refreshComplete');
				}
			},function(){
				common.show_toast("请求失败，请稍后重试")
				if(is_do_refresh){
					$scope.$broadcast('scroll.refreshComplete');
				}
			})
		},function(){
			common.show_toast("请求失败，请稍后重试")
		});
	}
	getDate(false)
	//下拉刷新
	$scope.doRefresh=function(){
		getDate(true)
	}

	//获取到数据后的回调函数
	$scope.action=function(n){
		//处理数据
		$scope.all_data=n.data;
		$scope.topic_list_data=n.data.list
		$scope.finall_updata_data={act:'finish',load_all:1,type:'sll',code:n.data.e_code,data:{results:[]}}
		for(var i=0;i<$scope.topic_list_data.length;i++){
        	$scope.topic_list_data[i].index_num=(i+1)  
        	$scope.topic_list_data[i].my_option=[]
        	$scope.topic_list_data[i].answer_state=false;
        }

        $scope.change_render_topic_data=function(){
        	$scope.render_topic_data=_.filter($scope.topic_list_data, function(n){
	          return n.index_num == $scope.is_answering_num;
	        })
	        $scope.render_topic_data=$scope.render_topic_data[0]
	      
        }
        //当前正在做题的数据
        $scope.change_render_topic_data()
        
       
        //选择答案
        $scope.chose_option=function(topic_id,id,my_option,right_option_id){
        	if($scope.render_topic_data.answer_state){return;}
        	if($scope.render_topic_data.ctype=='0'){
        		//单选题
        		$scope.render_topic_data.answer_state=true;
	        	$scope.render_topic_data.my_options.push(id)
	        	$scope.render_topic_data.my_option.push(my_option)
	        	$scope.finall_updata_data.data.results.push({topic_id:topic_id,options:[id]})
	        	
	        	
	        	if($scope.type=='mock'){
	        		$timeout(function(){
	        			$scope.is_answering_num++;
		    			if($scope.is_answering_num>$scope.all_data.all_count){
			        		return;
			        	}
		    			$scope.change_render_topic_data()
		        		$scope.is_open_timer_number=!$scope.is_open_timer_number
	        		},500)
	        		

	        	}else{
					if(id==right_option_id[0]){
						$timeout(function(){
			        		$scope.is_answering_num++;
			    			if($scope.is_answering_num>$scope.all_data.all_count){
				        		return;
				        	}
			    			$scope.change_render_topic_data()
			        		$scope.is_open_timer_number=!$scope.is_open_timer_number
		        		},500)
		        	}
	        	}
        	}else{
        		//多选题
        		$scope.render_topic_data.my_options.push(id)
        		$scope.render_topic_data.my_option.push(my_option)
        		
        		
        		
        	}
        	
        }
        //多选题确认
        $scope.dx_btn=function(topic_id){
        	$scope.finall_updata_data.data.results.push({topic_id:topic_id,options:$scope.render_topic_data.my_options})
        	$scope.render_topic_data.answer_state=true;
        	$scope.is_answering_num++;
			if($scope.is_answering_num>$scope.all_data.all_count){
        		return;
        	}
        	$scope.is_open_timer_number=!$scope.is_open_timer_number
			$scope.change_render_topic_data()
			
		}
        //上下题切换
        $scope.next_prev=function(left_right,n){
        	
        	$scope.is_open_timer_number=!$scope.is_open_timer_number
        	if(left_right==1){
        		$scope.is_answering_num++
        	}else if(left_right==0){
        		$scope.is_answering_num--
			}else{
				$scope.is_answering_num=n;
				$scope.is_show_result_pad=false;
			}

        	if($scope.is_answering_num>$scope.all_data.all_count||$scope.is_answering_num<1){
        		return;
        	}
        	if(!$scope.render_topic_data.answer_state){
        		$scope.render_topic_data.my_options=[]
        		$scope.render_topic_data.my_option=[]

        	}
        	$scope.change_render_topic_data()

        }
        //收藏
        $scope.to_my_fav=function(id){

        	if($scope.render_topic_data.fav){
        		var params={act:'del_fav',type:'5',target_id:id};
				common.getData('/fav_action.php?&session_id=203639*14e1b600b1fd579f47433b88e8d85291',params
				).then(function(res){
					if(res.data.code==1){
						$scope.render_topic_data.fav=false;
						common.show_toast("取消收藏")
					}
				},function(){})
        	}else{
        		var params={act:'add_fav',type:'5',target_id:id};
				common.getData('/fav_action.php?&session_id=203639*14e1b600b1fd579f47433b88e8d85291',params
				).then(function(res){
					if(res.data.code==1){
						$scope.render_topic_data.fav=true;
						common.show_toast("收藏成功")
						
					}
				},function(){})

        	}
        }
        //反馈
        $scope.feedback=function(code){
        	common.show_confirm(function(){
        		$.post('https://m.yikaotop.com/app/yi_v2/api/userfeedback.php?session_id=203639*14e1b600b1fd579f47433b88e8d85291&act=finish&load_all=1&type=sll&code='+code,{content:angular.element('#feedback').val()},'json').success(function(data){
        			console.log(typeof data)
	        		if(JSON.parse(data).code==1){
	        			common.show_toast("反馈成功")
					}
	        		
	        	})

        	})

        }
        //打开答题卡
        $scope.open_result_pad=function(){
        	$scope.is_show_result_pad=true;
        }
        //提交答案
        $scope.finally_submit_result=function(){
        	
        	$.post('https://m.yikaotop.com/app/yi_v2/api/exercise.php?session_id=203639*14e1b600b1fd579f47433b88e8d85291&act=finish&load_all=1&type=sll&code='+$scope.all_data.e_code,{data:JSON.stringify($scope.finall_updata_data.data)},'json').success(function(data){
        
        		if(JSON.parse(data).code==1){
        			console.log($stateParams.type)
					$ionicNativeTransitions.stateGo('tab.daily_practice_result', {code:$scope.all_data.e_code,type:$stateParams.type}, {}, {
				    	type:'slide',
				    	direction:'left',
				    	duration:200
					});
					
				}
        		
        	})
        	
        }
       
	}

	//退出
	$scope.back=function(){
		common.commonBack()
	}

	//左滑返回
	$scope.left_back=function(){
		common.commonBack()
	}	
	
})
//题库－答题结果
.controller('daily_practice_resultCtrl',function($scope,$stateParams,$ionicNativeTransitions,$ionicHistory,common){
	console.log($stateParams)
	$scope.result_data={}
	common.getData('/exercise.php?&session_id=203639*14e1b600b1fd579f47433b88e8d85291&type=sll&act=is_answer&code='+$stateParams.code
			).then(function(res){
		
		$scope.result_data=res.data;	
	},function(){
		common.show_toast("请求失败，请稍后重试")
	})

	//查看解析
	$scope.enter_analysis=function(code,ana_type,index_num){
		var params={};
		if(ana_type==1){
			params={code:code,ana_type:1,type:$stateParams.type}
		}else if(ana_type==2){
			if($scope.result_data.wrong_num==0){	
				common.show_toast('没有错题...')
				return;

			}
			params={code:code,ana_type:2,type:$stateParams.type}
		}else if(ana_type==3){
			params={code:code,ana_type:1,index_num:index_num,type:$stateParams.type}
		}
		$ionicNativeTransitions.stateGo('tab.daily_parctice_analysis',params, {}, {
	    	type:'slide',
	    	direction:'left',
	    	duration:200
		});
	}
	//退出
	$scope.back=function(){
		var backurl=''
		if($stateParams.type=='sll'){
			backurl='tab.index'
		}else{
			backurl='tab.exercise_center'
		}
		$ionicNativeTransitions.stateGo(backurl, {}, {}, {
	    	type:'slide',
	    	direction:'right',
	    	duration:200
		});
	}
}) 
//题库－解析
.controller('daily_parctice_analysisCtrl',function($scope,$stateParams,$ionicNativeTransitions,$ionicHistory,common){
	console.log($stateParams)
	common.load_animation(true)
	if($stateParams.ana_type==1){
		$scope.src='/exercise.php?&session_id=203639*14e1b600b1fd579f47433b88e8d85291&result=1&act=get_book_wrong&code='+$stateParams.code

	}else{
		$scope.src='/exercise.php?&session_id=203639*14e1b600b1fd579f47433b88e8d85291&result=2&act=get_book_wrong&code='+$stateParams.code
	}
	common.getData($scope.src).then(function(res){
		common.load_animation(false)
		$scope.analy_data=res.data;	
		$scope.action($scope.analy_data)
	},function(){
		common.show_toast("请求失败，请稍后重试")
	})

	$scope.action=function(n){
		//处理数据
		$scope.is_answering_num=1;
		if($stateParams.index_num){
			$scope.is_answering_num=$stateParams.index_num
		}
		$scope.all_data=n;
		$scope.topic_list_data=n.list
		for(var i=0;i<$scope.topic_list_data.length;i++){
        	$scope.topic_list_data[i].index_num=(i+1)
        }

        $scope.change_render_topic_data=function(){
        	$scope.render_topic_data=_.filter($scope.topic_list_data, function(n){
	          return n.index_num == $scope.is_answering_num;
	        })
	        $scope.render_topic_data=$scope.render_topic_data[0]
	        
        }
        $scope.change_render_topic_data()
	}
	//上下切换
	$scope.next_prev=function(left_right){
		if(left_right==1){
    		$scope.is_answering_num++
    	}else if(left_right==0){
    		$scope.is_answering_num--
		}

		if($scope.is_answering_num>$scope.all_data.all_count||$scope.is_answering_num<1){
    		return;
    	}
    	$scope.change_render_topic_data()
	}
	//收藏
	$scope.to_my_fav=function(id){

    	if($scope.render_topic_data.fav){
    		var params={act:'del_fav',type:'5',target_id:id};
			common.getData('/fav_action.php?&session_id=203639*14e1b600b1fd579f47433b88e8d85291',params
			).then(function(res){
				if(res.data.code==1){
					common.show_toast("取消收藏")
					$scope.render_topic_data.fav=false;
					
				}
			},function(){})
    	}else{
    		var params={act:'add_fav',type:'5',target_id:id};
			common.getData('/fav_action.php?&session_id=203639*14e1b600b1fd579f47433b88e8d85291',params
			).then(function(res){
				if(res.data.code==1){
					common.show_toast("收藏成功")
					$scope.render_topic_data.fav=true;
					
				}
			},function(){})

    	}
    }
    //反馈
    $scope.feedback=function(code){
    	common.show_confirm(function(){
    		$.post('https://m.yikaotop.com/app/yi_v2/api/userfeedback.php?session_id=203639*14e1b600b1fd579f47433b88e8d85291&act=finish&load_all=1&type=sll&code='+code,{content:angular.element('#feedback').val()},'json').success(function(data){
    			console.log(typeof data)
        		if(JSON.parse(data).code==1){
        			common.show_toast("反馈成功")
				}
        		
        	})

    	})

    }	
	//返回
	$scope.back=function(){
		$ionicNativeTransitions.stateGo('tab.daily_practice_result', {code:$stateParams.code,type:$stateParams.type}, {}, {
	    	type:'slide',
	    	direction:'right',
	    	duration:200
		});
	}

})

//护士圈首页
.controller('nurse_indexCtrl',function($scope,$ionicNativeTransitions,$timeout,$http,$ionicSlideBoxDelegate,$ionicLoading,$state,common){
	$scope.activeCate=0;
	$scope.is_first=true;
	common.load_animation(true);
	function getData(is_do_refresh,type,last_talk_id){
		var params={};
		if(type=='newest'){
			params={act:'talk_list',type:type,last_talk_id:last_talk_id}
		}else{
			params={act:'talk_list',type:type,last_talk_id:last_talk_id}

		}
		common.getData('/talk.php?&session_id=203639*14e1b600b1fd579f47433b88e8d85291',params).then(function(res){
			common.load_animation(false);
			if(type=='newest'){
				$scope.nurse_index_new=res.data
				console.log($scope.nurse_index_new)
			}else{
				$scope.nurse_index_hot=res.data
				console.log($scope.nurse_index_hot)
			}
			
			
			if(is_do_refresh){
				$scope.$broadcast('scroll.refreshComplete');
			}
		},function(){
			common.load_animation(false);
			common.show_toast("请求失败，请稍后重试")
			if(is_do_refresh){
				$scope.$broadcast('scroll.refreshComplete');
			}
		})
	}
	getData(false,'newest',0);
	// 下拉刷新
	$scope.doRefresh=function(){
		var activePage=$ionicSlideBoxDelegate.currentIndex()
		if(activePage==0){
			getData(true,'newest',0)
		}else{
			getData(true,'hottest',0);
		}
		
	}
	
	//滑动框
	$scope.slide=function(index){
		$ionicSlideBoxDelegate.slide(index)
		if(index==1){
			if($scope.is_first){
				getData(true,'hottest',0);
			}
			$scope.is_first=false
		}
	}
	$scope.slideHasChanged=function(){
		var activePage=$ionicSlideBoxDelegate.currentIndex()
		if(activePage==0){
			$scope.activeCate=0;
		}else{
			$scope.activeCate=1;
			if($scope.is_first){
				getData(true,'hottest',0);
			}
			$scope.is_first=false
		}
	}
	//赞
	$scope.fav=function(talk_id,cont){
		
		
		var params={act:'zan_talk',talk_id:talk_id}
		common.getData('/talk.php?&session_id=203639*14e1b600b1fd579f47433b88e8d85291',params).then(function(res){
			if(res.data.code==1){
				common.show_toast("已赞")
				if($scope.activeCate==0){
					for(var i=0;i<$scope.nurse_index_new.data.length;i++){
						
						if(talk_id==$scope.nurse_index_new.data[i].talk_id){
							$scope.nurse_index_new.data[i].zan_count++;
							$scope.nurse_index_new.data[i].is_zan=1;
						}
					}
				}else{
					for(var i=0;i<$scope.nurse_index_hot.data.length;i++){
						
						if(talk_id==$scope.nurse_index_hot.data[i].talk_id){
							$scope.nurse_index_hot.data[i].zan_count++;
							$scope.nurse_index_hot.data[i].is_zan=1;
						}
					}
				}
			}else{
				common.show_toast(res.data.msg)
				
			}
			
		},function(){
			
			common.show_toast("请求失败，请稍后重试")
			
		})
	}
	//进入帖子详情
	$scope.enter_detail=function(id){
		$ionicNativeTransitions.stateGo('tab.nurse_detail', {talk_id:id}, {}, {
			type:'slide',
			direction:'left',
			duration:200
		});
	}
	//返回
	$scope.back=function(){
		common.commonBack()
	}

})

//护士圈详情
.controller('nurse_detailCtrl',function($scope,$ionicNativeTransitions,$timeout,$http,$ionicSlideBoxDelegate,$ionicLoading,$stateParams,$state,common){
	console.log($stateParams)
	common.load_animation(true);
	function getData(is_do_refresh){
		var params={};
		params={act:'talk_item',talk_id:$stateParams.talk_id}
		
		common.getData('/talk.php?&session_id=203639*14e1b600b1fd579f47433b88e8d85291',params).then(function(res){
			common.load_animation(false);
			
			$scope.nurse_detail=res.data
			console.log($scope.nurse_detail)
			
			if(is_do_refresh){
				$scope.$broadcast('scroll.refreshComplete');
			}
		},function(){
			common.load_animation(false);
			common.show_toast("请求失败，请稍后重试")
			if(is_do_refresh){
				$scope.$broadcast('scroll.refreshComplete');
			}
		})
	}
	getData(false);
	// 下拉刷新
	$scope.doRefresh=function(){
		getData(true)
	}

	//赞
	$scope.fav=function(talk_id){
		
		
		var params={act:'zan_talk',talk_id:talk_id}
		common.getData('/talk.php?&session_id=203639*14e1b600b1fd579f47433b88e8d85291',params).then(function(res){
			if(res.data.code==1){
				common.show_toast("已赞")
				$scope.nurse_detail.data.is_zan=1;
				$scope.nurse_detail.data.zan_count++;
				
				
			}else{
				common.show_toast(res.data.msg)
			}
			
		},function(){
			
			common.show_toast("请求失败，请稍后重试")
			
		})
	}

	//返回
	$scope.back=function(){
		common.commonBack()
	}

})

//资讯列表
.controller('infoCtrl', function($scope,common,$ionicNativeTransitions,$filter,$ionicScrollDelegate){
	common.load_animation(true)
	common.getData('/news_list.php?&session_id=203639*14e1b600b1fd579f47433b88e8d85291').then(function(res){
		common.load_animation(false)
		$scope.info_list_data=res.data;

	},function(){
		common.show_toast("请求失败，请稍后重试")
	});
	//下拉刷新
	$scope.doRefresh=function(){
		common.getData('/news_list.php?&session_id=203639*14e1b600b1fd579f47433b88e8d85291').then(function(res){
			$scope.info_list_data=res.data;
			$scope.$broadcast('scroll.refreshComplete');
		},function(){
			common.show_toast("请求失败，请稍后重试")
			$scope.$broadcast('scroll.refreshComplete');
		});
	}
	//切换资讯栏目
	$scope.is_show_banner=true;
	$scope.tab_ishide=1;
	$scope.type_name='';
	$scope.is_show_toTop=false;
	$scope.change_cate=function(n,type_name){
		$scope.tab_ishide=n;
		$scope.type_name=type_name;

		if(n!=1){
			$scope.is_show_banner=false;
		}else{
			$scope.is_show_banner=true;
		}
	}
	//监听滚动
	$scope.banner_opacity=1;
	$scope.watch_scroll=function(){
		var scrollTop = $ionicScrollDelegate.getScrollPosition().top;
		var opacity_num=1-scrollTop/160;
		if(opacity_num<0){
			opacity_num=0
		}else if(opacity_num>1){
			opacity_num=1
		}
		if(scrollTop>=500){
			$scope.is_show_toTop=true;
		}else{
			$scope.is_show_toTop=false;
		}
		$scope.banner_opacity=opacity_num;
		$scope.$evalAsync()
		
	}
	//回到顶部
	$scope.toTop=function(){
		
		$ionicScrollDelegate.scrollTop(true)
	}
	//进入资讯
	$scope.enter_info_detail=function(url){
		common.start_window(url)
	}
	//返回首页
	$scope.back=function(){
		common.commonBack()
	}
	//左滑返回
	$scope.left_back=function(){
		common.commonBack()
	}	
})

//个人中心
.controller('personCtrl',function($scope,$window,$ionicNativeTransitions,common){
	common.getData('/user_api.php?&session_id=203639*14e1b600b1fd579f47433b88e8d85291').then(function(res){
		$scope.person_center_data=res.data
	},function(){
		common.show_toast("请求失败，请稍后重试")
	});
	//进入课程记录
	$scope.enter_watch_record=function(){
		$ionicNativeTransitions.stateGo('tab.my_course', {}, {}, {
			type:'slide',
			direction:'left',
			duration:200
		});
	}
	//进入我的课程
	$scope.enter_my_course=function(){
		$ionicNativeTransitions.stateGo('tab.my_course_record', {}, {}, {
			type:'slide',
			direction:'left',
			duration:200
		});
	}
	//退出
	$scope.exit=function(){
		$window.localStorage.setItem('session_id',false)
		$ionicNativeTransitions.stateGo('login', {}, {}, {
			type:'slide',
			duration:200,
			direction:'left'
		});
	}
	
}) 
//我的课堂
.controller('my_courseCtrl', function($scope,common,$ionicNativeTransitions){
	common.load_animation(true)
	//获取数据
	getData(false)
	//下拉刷新
	$scope.doRefresh=function(){
		getData(true)
	}
	//进入课程
	$scope.enter_course=function(courseId,videoId){
		
		$ionicNativeTransitions.stateGo('tab.course_detail', {courseId:courseId,video_id:videoId}, {}, {
		  	type:'slide',
			direction:'left',
			duration:200,
		});
	}
	//返回
	$scope.back=function(){
		common.commonBack()
	}
	function getData(is_broadcast){
		common.getData('/my_record.php?act=video&session_id=203639*14e1b600b1fd579f47433b88e8d85291').then(function(res){
			common.load_animation(false)
			$scope.data=res.data;
			if(is_broadcast){
				$scope.$broadcast('scroll.refreshComplete');
			}
		},function(){
			common.show_toast("请求失败，请稍后重试")
			if(is_broadcast){
				$scope.$broadcast('scroll.refreshComplete');
			}
		});
	}	
})
//看课记录
.controller('my_course_recordCtrl',function($scope,common,$ionicNativeTransitions){
	common.load_animation(true)
	//获取数据
	getData(false)
	//下拉刷新
	$scope.doRefresh=function(){
		getData(true)
	}
	//进入课程
	$scope.enter_course_detail=function(courseId){
		
		$ionicNativeTransitions.stateGo('tab.course_detail', {courseId:courseId}, {}, {
		  	type:'slide',
			direction:'left',
			duration:200,
		});
	}
	//返回
	$scope.back=function(){
		common.commonBack()
	}
	function getData(is_broadcast){
		common.getData('/my_course.php?act=video&session_id=203639*14e1b600b1fd579f47433b88e8d85291').then(function(res){
			common.load_animation(false)
			$scope.data=res.data;
			console.log($scope.data)
			if(is_broadcast){
				$scope.$broadcast('scroll.refreshComplete');
			}
		},function(){
			common.show_toast("请求失败，请稍后重试")
			if(is_broadcast){
				$scope.$broadcast('scroll.refreshComplete');
			}
		});
	}	
})
//登录
.controller('loginCtrl',function($scope,$http,$log,$ionicPopup,$state,$window,$ionicNativeTransitions){
	
	$scope.login_phone='';
	$scope.login_password='';
	$scope.login=function(){
		if($scope.login_phone.length!=11){
			common.show_toast('手机号格式不正确')
			return;
		}
		if($scope.login_password.length<6||$scope.login_password.length>12){
			common.show_toast('密码必须是6到12位的数字或者字母')
			return;
		}
		$http({
		url:'http://103.41.116.70/ionic/login.php',
		method:'POST',
		params:{
		'mobile':$scope.login_phone,
		'password':$scope.login_password
		}
		}).success(function(data){
			if(data.code==1){
				$window.localStorage.setItem('session_id',true)
				$ionicNativeTransitions.stateGo('tab.index', {}, {}, {
					type:'slide',
					duration:200,
					direction:'left'
				});
			}else{
				common.show_toast('账号或密码错误')
			}
			

		}).error(function(data){
			
		})
	}
})








