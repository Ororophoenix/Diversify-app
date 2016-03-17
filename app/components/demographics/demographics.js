(function(){
  'use strict';

  var DemographicsCtrl = function($scope, $http, $window, $state){
  $scope.user = {};
  $scope.formData= {};
  $http({
    method: 'GET',
    url: 'http://localhost:3000/api/users/profile',
    headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
    }
  }).success(function(data){
    console.log('blah')
    console.log(data)
    $scope.user = data
  });
  $http({
    method: 'GET',
    url: 'http://localhost:3000/api/demographics/new',
    headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken
    }
  }).success(function(data){
    $scope.demographics = data
  });
  $scope.processForm= function(){
    $scope.formData={user: $scope.user, demographic: $scope.user.demographic}
    console.log($scope.formData)
    $http({
      method: 'PATCH',
      url: 'http://localhost:3000/api/demographics/' + $scope.user.demographic.id,
      data: $scope.formData,
      headers:{Authorization: "Token token=" + $window.sessionStorage.accessToken}
    }).success(function(data){
      console.log('scope')
      console.log($scope.user)
      $state.go('profile')
    });
  };
};

  angular
    .module('demographics', [])

    .config(['$stateProvider', function($stateProvider){
      $stateProvider
        .state('demographics', {
          url: '/demographics',
          views: {
            'header':{
              templateUrl: '/components/partials/header.html'
            },
            'content':{
              controller: 'DemographicsCtrl',
              templateUrl: '/components/demographics/demographics.html'
            }
          }
        });
    }])

.controller("DemographicsCtrl", [
    '$scope',
    '$http',
    '$window',
    '$state',
    DemographicsCtrl
    ]);


})();
