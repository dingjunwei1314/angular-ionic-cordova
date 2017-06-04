/*
app启动 
登录验证
路由配置 
 */
angular.module('starter', ['ionic','ngAnimate','ngCordova','ngSanitize','ionicLazyLoad','starter.controllers', 'starter.services','starter.directives','ionic-native-transitions'])

.run(function($ionicPlatform,$rootScope,$window,$state,$location,$cordovaStatusbar) {
  //引入rem
    var designWidth = 720;
    var designFontSize = 100;
    if(window.screen.width>640){
      window.screen.width=640
    }
    var scale = window.screen.width/designWidth;
    var root_font_size = ((scale * 10000 * designFontSize) / 10000).toFixed(4);
    document.documentElement.style.fontSize = root_font_size+'px';

  $ionicPlatform.ready(function(){
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard){
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar){
      // StatusBar.styleDefault();
      StatusBar.styleLightContent();
    }

    if (cordova.platformId == 'android') {
      StatusBar.backgroundColorByHexString("#f60");
    }

    
    // $cordovaStatusbar.hide()

    // setTimeout(function(){
    //   $cordovaStatusbar.overlaysWebView(true);  
    // },10000)
    $cordovaStatusbar.styleColor('black');
    // $cordovaStatusbar.style(1);

    // $cordovaStatusbar.styleHex('#000');
  });

  //验证登录
  $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
    if(!$window.localStorage.getItem('session_id')){
      $location.path('/login')
    }
  });

  //控制底部tab状态
  $rootScope.$on('$ionicView.beforeEnter',function(){
    $rootScope.hideTabs = false;
      if($state.current.name != 'tab.index' && $state.current.name != 'tab.course' &&$state.current.name != 'tab.exercise_center'&&$state.current.name != 'tab.person') {
        $rootScope.hideTabs = true;
      }
  });

})


.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider,$ionicNativeTransitionsProvider){
  //设置tab在android以及ios的状态
  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('bottom');
  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');

  

  $ionicConfigProvider.views.transition('no');
  
  

  //调用原生切换效果
  $ionicNativeTransitionsProvider.setDefaultOptions({
    duration: 200, 
    slowdownfactor: 12,
    type: 'slide', 
    direction: 'left',
    iosdelay: -1, 
    androiddelay: -1, 
    winphonedelay: -1, 
    fixedPixelsTop: 0, 
    fixedPixelsBottom: 0, 
    triggerTransitionEvent:'$ionicView.afterEnter', 
    backInOppositeDirection: false 
  });


  $ionicNativeTransitionsProvider.setDefaultTransition({
        type: 'slide',
        direction: 'left'
  });

  $ionicNativeTransitionsProvider.setDefaultBackTransition({
        type: 'slide',
        direction: 'right',
  });
  //配置路由
  $stateProvider

  .state('tab',{
    url: '/tab',
    abstract: true,
    views:{
      'main-view':{
        templateUrl: 'templates/tabs.html',
        controller:'tabCtrl'
      }
    }
    
  })

  //登录
  .state('login', {
    url: '/login',
    cache:false,
    views: {
      'main-view': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  //首页
  .state('tab.index', {
    url: '/index',
    cache:true,
    nativeTransitions:null,
    views: {
      'content-view': {
        templateUrl: 'templates/index.html',
        controller: 'indexCtrl'
      }
    }
  })
  //课程列表
  .state('tab.course', {
      url: '/course',
      cache:true,
      nativeTransitions:null,
      views: {
        'content-view': {
          templateUrl: 'templates/course.html',
          controller: 'courseCtrl'
        }
      }
  })
  
  //练题中心
  .state('tab.exercise_center', {
    url: '/exercise_center',
    cache:true,
    nativeTransitions:null,
    views: {
      'content-view': {
        templateUrl: 'templates/exercise_center.html',
        controller: 'exercise_centerCtrl'
      }
    }
  })

  //个人中心
  .state('tab.person',{
    url:'/person',
    nativeTransitions:null,
    cache:true,
    views:{
      'content-view':{
        templateUrl:'templates/person.html',
        controller:'personCtrl'
      }
    }
  })

  //课程详情
  .state('tab.course_detail', {
    url: '/course/:courseId/:video_id/',
    cache:false,
    views: {
      'content-view': {
        templateUrl: 'templates/course_detail.html',
        controller: 'course_detailCtrl'
      }
    },
    resolve:{
        resd:function($http,$stateParams,common){
            common.load_animation(true)
            console.log($stateParams)
            var params={};
            if($stateParams.video_id&&$stateParams.courseId){
              
              params={id:$stateParams.courseId,video_id:$stateParams.video_id}
            }else if(!$stateParams.video_id&&$stateParams.courseId){
              params={id:$stateParams.courseId}
              
            }else{
              params={video_id:$stateParams.video_id}
              
            }
            return $http({
                method:'GET',
                params:params,
                url:'http://m.yikaotop.com/app/yi_v2/api/course_detail_v2.php?session_id=203639*14e1b600b1fd579f47433b88e8d85291'
            })
        }
    }
  })
  //订单首页
  .state('tab.info', {
    url: '/info',
    cache:true,
    views: {
      'content-view': {
        templateUrl: 'templates/info.html',
        controller: 'infoCtrl'
      }
    }
  })
  //资讯中心
  .state('tab.order', {
    url: '/order/:p_id/',
    cache:true,
    views: {
      'content-view': {
        templateUrl: 'templates/order.html',
        controller: 'orderCtrl'
      }
    }
  })
  //题库－做题纪录
  .state('tab.topic_record',{
    url: '/topic_record',
    cache:false,
    views: {
      'content-view':{
        templateUrl: 'templates/topic_record.html',
        controller: 'topic_recordCtrl'
      }
    }
  })
  //题库-章节列表
  .state('tab.exercise_list',{
    url: '/exercise_list',
    cache:false,
    views: {
      'content-view':{
        templateUrl: 'templates/exercise_list.html',
        controller: 'exercise_listCtrl'
      }
    }
  })
  //题库-真题模拟列表
  .state('tab.mock_list',{
    url: '/mock_list',
    cache:false,
    views: {
      'content-view':{
        templateUrl: 'templates/mock_list.html',
        controller: 'mock_listCtrl'
      }
    }
  })
  //题库-答题
  .state('tab.daily_practice', {
    url: '/daily_practice/:type/:chapter_id/:title/:group_id',
    cache:false,
    views: {
      'content-view': {
        templateUrl: 'templates/daily_practice.html',
        controller: 'daily_practiceCtrl'
      }
    }
  })

  //题库－答案结果页面
  .state('tab.daily_practice_result', {
    url: '/daily_practice/:code/:type',
    cache:false,
    views: {
      'content-view': {
        templateUrl: 'templates/daily_practice_result.html',
        controller: 'daily_practice_resultCtrl'
      }
    }
  })

  //题库－解析页面
  .state('tab.daily_parctice_analysis', {
    url: '/daily_parctice_analysis/:code/:type/:index_num/:ana_type',
    cache:false,
    views: {
      'content-view': {
        templateUrl: 'templates/daily_parctice_analysis.html',
        controller: 'daily_parctice_analysisCtrl'
      }
    }
  })

  //护士圈首页
  .state('tab.nurse_index', {
    url: '/nurse_index',
    cache:true,
    views: {
      'content-view': {
        templateUrl: 'templates/nurse_index.html',
        controller: 'nurse_indexCtrl'
      }
    }  
  })
  //护士圈详情
  .state('tab.nurse_detail', {
    url: '/nurse_detail/:talk_id',
    cache:true,
    views: {
      'content-view': {
        templateUrl: 'templates/nurse_detail.html',
        controller: 'nurse_detailCtrl'
      }
    }  
  })
  //个人中心-我的课堂
  .state('tab.my_course', {
    url: '/my_course',
    cache:true,
    views: {
      'content-view': {
        templateUrl: 'templates/my_course.html',
        controller: 'my_courseCtrl'
      }
    }
  })
  //个人中心-我的课堂
  .state('tab.my_course_record', {
    url: '/my_course_record',
    cache:true,
    views: {
      'content-view': {
        templateUrl: 'templates/my_course_record.html',
        controller: 'my_course_recordCtrl'
      }
    }
  })

  //默认进入首页
  $urlRouterProvider.otherwise('/tab/index');
 
  

});
