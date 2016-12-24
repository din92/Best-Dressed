(function () {
  'use strict';

  angular
    .module('app')
    .controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['$scope', '$state', 'Auth', 'scrapeAPI', "looksAPI", '$modal', "$alert", "Upload","adminAPI"];

  function AdminCtrl($scope, $state, Auth, scrapeAPI, looksAPI, $modal, $alert, Upload,adminAPI) {
      $scope.looks = [];
      $scope.users = [];
      $scope.user = {},
      $scope.editLook = {}
      $scope.deleteBtn = true;

    var alertSuccess = $alert({
      title: 'Saved ',
      content: 'Look has been edited',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'success',
      duration: 8
    });

    var alertFail = $alert({
      title: 'Not Saved ',
      content: 'Look has failed to edit',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'warning',
      duration: 8
    });

    var myModal = $modal({
      scope: $scope,
      show: false
    });
    $scope.showModal = function () {
      myModal.$promise.then(myModal.show);
    }

    adminAPI.getAllUsers().then(function(response){
      $scope.users=response.data;
    })
    .catch(function(err){
      console.log("Error in getting all the users");
      console.log(err);
    })

    looksAPI.getAllLooks().then(function(response){
      $scope.looks=response.data;
    })
    .catch(function(err){
      console.log("Error in getting all the looks");
      console.log(err);
    })

    $scope.deleteUser=function(user){
      adminAPI.deleteUser(user).then(function(response){
        console.log("Deleted User: "+response.data);
        var user=response.data;
        var index = $scope.users.indexOf(user);
        $scope.users.splice(index,1)
      
    })
    .catch(function(err){
      console.log("Error in deleting user");
      console.log(err);
    })
    }
    $scope.eraseData = function(){
      $scope.editLook = "";
      $state.reload();
    }
    $scope.editLook = function(look) {
      looksAPI.getUpdateLook(look)
        .then(function(data) {
          console.log(data);
          $scope.editLook = data.data;
        })
        .catch(function(err) {
          console.log('failed to edit look ' + err);
        });
    }
     $scope.saveLook = function() {
      var look = $scope.editLook;

      looksAPI.updateLook(look)
        .then(function(data) {
          console.log('Look updated');
          console.log(data);
          $scope.editLook.title = '';
          $scope.editLook.description = '';
          alertSuccess.show();
        })
        .catch(function(err) {
          console.log('failed to update' + err);
          alertFail.show();
        })
        .finally(function() {
          $scope.getUserLooks();
          $state.go('mylooks');
        });
    }

    $scope.deleteLook = function(look) {
      var index = $scope.looks.indexOf(look);

      looksAPI.deleteLook(look)
        .then(function(data) {
          console.log('success, look deleted');
          $scope.looks.splice(index, 1);
        })
        .catch(function(err) {
          console.log('failed to delete look' + err);
        });
    }
  }
})();