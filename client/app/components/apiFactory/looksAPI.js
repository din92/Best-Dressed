(function () {
    "use strict"

    angular.module("app").factory("looksAPI", function ($http) {
        return {
            addScrapePost: addScrapePost,
            getAllLooks: getAllLooks,
            getUserLooks: getUserLooks,
            updateLook: updateLook,
            deleteLook: deleteLook,
            findOneLook: findOneLook,
            getUpdateLook: getUpdateLook,
            popLooks: popLooks,
            addView:addView,
            upVote:upVote

        }
        function addScrapePost(look) {
            return $http.post("/api/mylooks/scrapeUpload", look);
        }
        function getAllLooks() {
            return $http.get("/api/mylooks/getAllLooks");
        }
        function getUserLooks(id) {
            return $http.get("/api/mylooks/getUserLooks/" + id, {
                cache: true
            })
        }
        function updateLook(look) {
            return $http.put("/api/mylooks/" + look._id, look);
        }
        function deleteLook(look) {
            return $http.delete("/api/mylooks/" + look._id);
        }
        function findOneLook(look) {
            return $http.get('/api/mylooks/' + look);
        }
        function getUpdateLook(look) {
            return $http.get('api/mylooks/updateLook/' + look._id);
        }
        function popLooks(look) {
            return $http.get('/api/mylooks/popLooks/' + look);
        }
          function addView(look) {
            return $http.put('/api/mylooks/addView/' + look);
        }
          function upVote(look) {
            return $http.put('/api/mylooks/upvote/' + look._id);
        }
    })
})();