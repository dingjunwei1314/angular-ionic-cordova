angular.module('starter.directives', [])
//计时器
.directive('timingDevice',function($interval){
 	return {
        restrict : 'AE',
        replace : true,
        scope : {
        	myTime:'=',
        	myOpen:'='
		},
        controller : ['$scope',function($scope){
            $scope.minute='0';
            $scope.second='00';
		}],
        template:   '<div class="exercise_op_panel_time">\
						<img src="img/v1.4/time.png" style="width:.3rem;height:.3rem;">\
						<p class="exercise_op_panel_time_txt" style="color:#fff;">\
						<span>{{minute}}</span>\
						<span>:</span>\
						<span>{{second}}</span>\
						</p>\
					</div>',
        link:function(scope,element,attr){
        	scope.$watch('myOpen',function(){
            		scope.myTime=0;
            		scope.minute='0';
            		scope.second='00';
            		$interval.cancel(scope.daily_Timer)
					scope.daily_Timer=$interval(function(){
		            	scope.myTime++;
		            	scope.minute=parseInt(scope.myTime/60);
		            	scope.second=(scope.myTime-scope.minute*60)<10? '0'+(scope.myTime-scope.minute*60):(scope.myTime-scope.minute*60)
		            },1000)
            	
            })

            scope.$on('$destroy',function(){
            	$interval.cancel(scope.daily_Timer)
            })
        }
    };
})
//课程表
.directive('curriculumSchedule',function(){
	return{
		restrict:'AE',
		replace:true,
		scope:true,
		controller : ['$scope',function($scope){

		}],
		template:'<div ng-bind-html="course_detail_data.course|to_trusted"></div>',
		link:function(scope,element,attr){
			scope.$watch('element.find(".syllabus_cont").length',function(value){
				
				if(value!=0){
					element.find('.syllabus_cont').show()
					//一级
					element.find('.syllabus_cont').find('.z0_tit').bind('click',function(){
						if($(this).hasClass('active')){
							$(this).removeClass('active').siblings().slideUp()
							$(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down')
						}else{
							$(this).addClass('active').siblings().slideDown()
							$(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up')
						}
						
					})
					//内部
					element.find('.z1').find('.tit').bind('click',function(){
						if($(this).hasClass('active')){
							$(this).removeClass('active').siblings().slideUp()
							$(this).find('img').attr({src:'img/course_detail/jia.png'})
						}else{
							$(this).addClass('active').siblings().slideDown()
							$(this).find('img').attr({src:'img/course_detail/jian.png'})
						}
					})
					//播放
					element.find('.ke').bind('click',function(){
						scope.play($(this).attr('product_id'),$(this).attr('video_id'))
						
					})
					//改变状态
					$('#video_play').on('play',function(){
						element.find('.ke').find('p').css({color:'#898989'})
						element.find('.ke').each(function(i,n){
							if($(n).attr('video_id')==scope.course_detail_data.is_playing_id){
								$(n).find('p').css({color:'#f60'})
							}
						})
					})
				}
			},true)
			
		}
	}
})




