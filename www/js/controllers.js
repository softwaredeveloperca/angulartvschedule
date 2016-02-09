angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


.controller('MoviesCtrl', function($scope, $rootScope, Stations) {
	$scope.sell = function(movie_id){
										 Stations.remove_movie(1, movie_id);
  	
						      	$rootScope.available_movies = Stations.get_movies(1);
							     $rootScope.movies = Stations.buy_movie_list(1);

	}
	$scope.buy = function(movie_id, movie_name, movie_length){
		              Stations.add_movie(1, movie_id, movie_name, movie_length).then(function(greeting) {
  	
						      	$rootScope.available_movies = Stations.get_movies(1);
							     $rootScope.movies = Stations.buy_movie_list(1);


							
							 }, function(reason) {
  alert('Failed: ' + reason);
});
							       
								}
	 $rootScope.movies = Stations.buy_movie_list(1);
})

.controller('ScheduleCtrl', function($scope, $rootScope, Schedule, Movies, Stations, $ionicNavBarDelegate, $ionicPopup) {
	
	
	$scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;


$rootScope.titlea='sssxddvfg ffgrg gggggg ffgggg';
  
$ionicNavBarDelegate.title('ddddddddddd ddd');
  $scope.day=1;					
	$scope.schedule = Schedule.get(1,$scope.day);
	
	$scope.setSchedule = function(slot){
	//	console.log('setSchedule'+slot);
		$scope.setTools=true;
		$scope.selectTime=slot;
	//	console.log($scope);
	//	$scope.selectMovie.movie_id=0;
	}
	
  $scope.closeTools = function(){
		$scope.setTools=false;
		

		
	$rootScope.titlea="aaa";		
 $ionicNavBarDelegate.title('ddddddddddd dd');

	}
	$scope.checkLength = function(slot, movie_id, movie_length){
		 	var start_check=false;
			var cnt=1;
			
			 angular.forEach($scope.schedule.times, function(aza){
   
	 if(start_check===true && cnt < movie_length){
	    if(aza.movie_id>0)
		  {
			   return true;
		  }
	    cnt=cnt+1;
	  }
	  if(aza.slot === slot){
	    
          start_check=true;
       }
      

    });

   return true;
	 
	}
	$scope.saveSchedule = function(schedule_time, movie_id, movie_name){
	

     var confirmPopup = $ionicPopup.confirm({
       title: 'Programming Length',
       template: 'Saving will erase existing content.  Continue? '
     });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('Continue');

					movie_length=2;
		
					for(var y = 0; y<movie_length; y++)
					{
						Schedule.save_slot(1, $scope.day, schedule_time+y, movie_id, movie_name, (y+1));

        }

					$scope.closeTools();

       } else {
         console.log('You are not sure');
       }
     });
   
		

    }


$scope.deleteMovie = function(movie_id){
	

     var confirmPopup = $ionicPopup.confirm({
       title: 'Delete',
       template: 'Are you sure you want to delete?'
     });
     confirmPopup.then(function(res) {
       if(res) {
       
						Schedule.delete_movie(1, $scope.day, movie_id);

       } else {
         console.log('You are not sure');
       }
     });
   
		

    }
	
	$scope.onDrag = function(item_id){ }
 	
	$scope.onRelease = function(item_id){
		              // $scope.item[item_id]
						       alert('onrelease');	
								}
//	$scope.movies = Movies.all();

$scope.$watch('selectMovie', function() {
     //  alert('hey, myVar has changed!');
   });

//"checkLength(selectTime, selectMovie.movie_id)"
	$rootScope.available_movies = Stations.get_movies(1);
	 console.log($rootScope.available_movies);

}).filter('ownedMovies', function(){
  return function(input){
    var out = [];
    angular.forEach(input, function(aza){
     // if(aza.type === 'static'){
        out.push(aza)
    //  }
    })
    return out;
  }
});

/*
	
.directive('ionSelect',function(){
    'use strict';
    return{
        restrict: 'EAC',
        scope: {
           label:'@',
            labelField:'@',
            provider:'=',
            ngModel: '=?',
            ngValue: '=?',
           
        },
         require: '?ngModel',
         transclude : false,
         replace: false,
        template:
                    '<div class="selectContainer">'
                        +'<label class="item item-input item-stacked-label">' 
                            +'<span class="input-label">{{label}}</span>'
                            +'<div class="item item-input-inset">'
                                +'<label class="item-input-wrapper">'
                                    +'<i class="icon ion-ios7-search placeholder-icon"></i>'
                                    +'<input id="filtro" type="search"  ng-model="ngModel" ng-value="ngValue" ng-keydown="onKeyDown()"/>'
                                +'</label>'
                                +'<button class="button button-small button-clear" ng-click="open()">'
                                    +'<i class="icon ion-chevron-down"></i>'
                                +'</button>'
                            +'</div>' 
                        +'</label>'
                        +'<div class="optionList padding-left padding-right" ng-show="showHide">'
        +'<ion-scroll>'
                            +'<ul class="list">'
        +'<li class="item" ng-click="selecionar(item)" ng-repeat="item in provider | filter:ngModel">{{item[labelField]}}</li>'                    
                            +'</ul>'
        +'</ion-scroll>'
                        +'</div>'    
                    +'</div>'
             ,
        link: function (scope, element, attrs,ngModel) {
            scope.ngValue = scope.ngValue !== undefined ? scope.ngValue :'item';
            
            scope.selecionar = function(item){
                ngModel.$setViewValue(item);
                scope.showHide = false;
            };
            
            element.bind('click',function(){
                element.find('input').focus();
            });
            
            scope.open = function(){
                alert('a');
                  scope.ngModel = "";  
              		return scope.showHide=!scope.showHide;
            };
            
            scope.onKeyDown = function(){
                scope.showHide = true;
                if(!scope.ngModel){
                     scope.showHide = false;
                }
            }
            
            scope.$watch('ngModel',function(newValue){
                if(newValue)
           element.find('input').val(newValue[scope.labelField]);
               
            });
        },
    };
});

*/



