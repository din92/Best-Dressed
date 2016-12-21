(function () {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$state', 'Auth', 'scrapeAPI', "looksAPI", '$modal', "$alert", "Upload"];

  function MainCtrl($scope, $state, Auth, scrapeAPI, looksAPI, $modal, $alert, Upload) {
    $scope.user = Auth.getCurrentUser();
    $scope.look = {};
    $scope.looks = [];
    $scope.picPreview = true;
    $scope.scrapePostForm = true;
    $scope.uploadLookTitle = true;
    $scope.uploadLookForm = false;
    $scope.showScrapeDetails = false;
    $scope.gotScrapeResults = false;
    $scope.loading = false;

    var alertSuccess = $alert({
      title: "Success!",
      content: "New Look Added",
      placement: "top-right",
      container: "#alertContainer",
      type: "success",
      duration: 8
    });
    var alertFailure = $alert({
      title: "Not Saved!",
      content: "New Look failed to save",
      placement: "top-right",
      container: "#alertContainer",
      type: "warning",
      duration: 8
    });
    var myModal = $modal({
      scope: $scope,
      show: false
    });
    $scope.showModal = function () {
      myModal.$promise(myModal.show);
    }

    //Watch for URL changes,Scrape and display results
    $scope.$watch("look.link", function (newVal, oldVal) {
      if (newVal.length > 5) {
        $scope.loading = true;
        var link = { url: $scope.look.link }
        scrapeAPI.getScrapedDeatils(link).then(function (response) {
          console.log(response);
          $scope.showScrapeDetails = true;
          $scope.gotScrapeResults = true;
          $scope.uploadLookTitle = false;
          $scope.look.imgThumb = response.data.img;
          $scope.look.description = response.data.desc;
        })
          .catch(function (error) {
            console.log("failed to return from scrape");
            $scope.loading = false;
            $scope.look.link = "";
            $scope.gotScrapeDetails = false;
          })
          .finally(function () {
            $scope.loading = false;
            $scope.uploadLookForm = false;
          })
      }
    });
    $scope.showUploadForm = function () {
      $scope.uploadLookForm=true;
      $scope.uploadLookTitle=false;
      $scope.scrapePostForm = false;
    }
    looksAPI.getAllLooks().then(function (response) {
      console.log(response);
      $scope.looks = response.data;

    })
      .catch(function (err) {
        console.log("failed to get Looks " + err);
      })

    $scope.addScrapePost = function () {
      var look = {
        description: $scope.look.description,
        title: $scope.look.title,
        image: $scope.look.imgThumb,
        linkURL: $scope.look.link,
        email: $scope.user.email,
        name: $scope.user.name,
        _creator: $scope.user._id

      };
      looksAPI.addScrapePost(look).then(function (response) {
        $scope.showScrapeDetails = false;
        $scope.gotScrapeResults = false;
        $scope.look.title = "";
        $scope.look.link = "";
        $scope.looks.splice(0, 0, response.data);
        alertSuccess.show();
        console.log(response);
      })
        .catch(function (err) {
          console.log("Failed to post");
          alertFailure.show();
          $scope.showScrapeDetails = false;
        })
    }
    $scope.uploadPic = function (file) {
      Upload.upload({
        url: "/api/mylooks/upload/",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: {
          file: file,
          title: $scope.look.title,
          description: $scope.look.description,
          email: $scope.user.email,
          name: $scope.user.name,
          linkURL: $scope.look._id,
          _creator: $scope.user._id
        }
      }).then(function (response) {
        console.log("sucessful upload");
        $scope.looks.splice(0, 0, response.data);
        $scope.look.title = "";
        $scope.look.description = "";
        $scope.picFile = "";
        $scope.picPreview = "";
        alertSuccess.show();
      }, function (response) {
        alertFailure.show();
      }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log("progress " + progressPercentage + "%" + evt.config + data.file.name);
      })
    }

  }
})();