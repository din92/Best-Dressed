(function () {
  'use strict';

  angular
    .module('app')
    .controller('LookCtrl', LookCtrl);

  LookCtrl.$inject = ['$scope', '$stateParams', 'looksAPI', 'Auth', 'commentsAPI'];

  function LookCtrl($scope, $stateParams, looksAPI, Auth, commentsAPI) {

    $scope.user = Auth.getCurrentUser();
    $scope.email= $scope.user.email;
    $scope.id = $stateParams.lookId;
    $scope.popLooks = [];

    looksAPI.findOneLook($scope.id)
      .then(function (data) {
        console.log(data);
        $scope.look = data.data;
        addView();
      })
      .catch(function (err) {
        console.log('failed to get look ', err);
      });

    looksAPI.popLooks($scope.email)
      .then(function (data) {
        console.log(data);
        $scope.popLooks = data.data; 
      })
      .catch(function (err) {
        console.log('failed to get pop look ', err);
      });

       $scope.addVote = function(look) {

      looksAPI.upVote(look)
        .then(function(data) {
          console.log(data);
        })
        .catch(function(err) {
          console.log('failure adding like');
        });
    }
    function addView() {
      looksAPI.addView($scope.id)
        .then(function(res) {
          console.log('view added to Look');
          console.log(res);
        })
        .catch(function(err) {
          console.log('failed to increment', err);
        });
    }
    commentsAPI.getComments($scope.id)
      .then(function (data) {
        $scope.comments = data.data;
        console.log($scope.comments);
      }, function (err) {
        console.log('failed to get comments ', err);
      });

    // Post new comment
    $scope.postComment = function () {
      var comment = {
        authorId: $scope.user._id,
        authorName: $scope.user.name,
        authorEmail: $scope.user.email,
        gravatar: $scope.user.gravatar,
        comment: $scope.comment.body,
        lookId: $scope.id
      }
      commentsAPI.postComment(comment)
        .then(function (data) {
          console.log(data);
          $scope.comment.body = '';
          //$scope.comment.push(data.data);
         $scope.comments.splice(0, 0, data.data);
        }, function (err) {
          console.log('failed to post object ', err);
        });
    }
  }
})();