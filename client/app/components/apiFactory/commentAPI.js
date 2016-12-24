(function () {
    "use strict"

    angular.module("app").factory("commentsAPI", function ($http) {
        return {
            postComment: postComment,
            getComments:getComments

        }
        function postComment(comment) {
            return $http.post("/api/comment/", comment);
        }
        
        function getComments(id) {
            return $http.get("/api/comment/" + id, {
                cache: true
            })
        }
    })
})();