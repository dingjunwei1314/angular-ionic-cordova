angular.module('starter.services', [])
.service('common', function($http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicNativeTransitions){
  var orderlist=1;
  
  return{
    getData:function(url,params){
      var serce_url='https://m.yikaotop.com/app/yi_v2/api';
      if(!params){
        params={}
      }
      return $http({
        method:'GET',
        params:params,
        url:serce_url+url,
      })
    },
    load_animation:function(iswitch){
      if(!iswitch){
        $ionicLoading.hide();
        return;
      }

      $ionicLoading.show({
        template:"<img style='width:1rem;height:1rem' src='img/loading.gif'></img>",
        noBackdrop:true,
        duration:5000
      })

    },
    commonBack:function(){
      if($ionicHistory.backView()!=null){
        $ionicNativeTransitions.stateGo($ionicHistory.backView().stateId, {}, {}, {
            type:'slide',
            direction:'right',
            duration:200
        });
      }else{
        $ionicNativeTransitions.stateGo('tab.index', {}, {}, {
            type:'slide',
            direction:'right',
            duration:200
        });
      }
    },
    start_window:function(url,title){
      if (url == null) {
            return;
        }
        if (title == null) {
            title = '';
        }
        var window_ref=cordova.ThemeableBrowser.open(url, '_blank', {

            statusbar: {
                color: '#ff6600'
            },
            toolbar: {
                height: 44,
                color: '#ffffff',
                borderBottom: '1px solid #787878'
            },
            title: {
                color: '#787878',
                staticText: title,
                showPageTitle: false
            },
            closeButton: {
                wwwImage: 'img/return.png',
                wwwImagePressed: 'img/return.png',
                align: 'left',
                wwwImageDensity: 3,
                event: 'closePressed'
            }

        });
    },
    show_toast:function(msg){
      var myPopup = $ionicPopup.show({
        title: msg,
      });
      $timeout(function() {
        myPopup.close(); 
      }, 1000);
    },
    show_confirm:function(fn){
      var myPopup = $ionicPopup.show({
         template: '<textarea name="report" id="feedback" ng-modal="feedback_text" class="report" style="width:100%;height:40px;"></textarea>',
         title: '反馈',
         buttons: [
           { text: '取消' },
           {
             text: '发送',
             type: 'button-positive',
             onTap: function(e) {
              if(fn){
                fn() 
              }
              
             }
           },
         ]
      });
    }
  }
})


.factory('course_fac', function($http) {
  return {
    get: function(courseId) {
      for (var i = 0; i < courses.length; i++) {
        if (courses[i].id == parseInt(courseId)) {
          return courses[i];
        }
      }
      return null;
    }
  };
});
