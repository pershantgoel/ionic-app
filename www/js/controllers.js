angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('dailyFeedCtrl', function($scope,$stateParams,dailyFeedFactory) {
  console.log("controller");
   $scope.countryId = $stateParams.countryId;

    //Default view of page
    dailyFeedView=()=>{
      dailyFeedFactory.view($scope.countryId)
      .then(function(response) {
        if(response.data.status === "ok") {
                  $scope.articles= response.data.articles;
        }
        else{
          alert("Error occured from Server Side");
        }
      })
      .catch(function() {
              alert("Connection failure");
      });
    }
    dailyFeedView();

    $scope.doRefresh=()=> {
          dailyFeedView();
          $scope.$broadcast('scroll.refreshComplete');
    }
      
})


.factory("dailyFeedFactory", function($http, $q) {
	return {
		view : function(countryId) {
			var deferred = $q.defer();
			$http({
				"method" : "GET",
				"url" : "https://newsapi.org/v2/top-headlines?country="+ countryId +"&apiKey=ba97c3d4768f403c824674e9be23df42"
			})
			.then(function(resolveObj) {
				deferred.resolve(resolveObj)
			})
			.catch(function(rejectObj) {
				deferred.reject(rejectObj)
			})
			return deferred.promise;
        },
      catView : function(countryId, category) {
			var deferred = $q.defer();
			$http({
				"method" : "GET",
				"url" : "https://newsapi.org/v2/top-headlines?country="+ countryId + "&category="+ category +"&apiKey=ba97c3d4768f403c824674e9be23df42"
			})
			.then(function(resolveObj) {
				deferred.resolve(resolveObj)
			})
			.catch(function(rejectObj) {
				deferred.reject(rejectObj)
			})
			return deferred.promise;
		}
	}
});