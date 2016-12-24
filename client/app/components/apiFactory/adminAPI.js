(function () {
    "use strict"

    angular.module("app").factory("adminAPI", function ($http) {
        return {
            getAllUsers: getAllUsers,
            deleteUser:deleteUser,
            getOneUser:getOneUser

        }
        function getAllUsers() {
            return $http.get("/api/users/", {
                cache:true
            });
        }
        
        function deleteUser(id) {
            return $http.delete("/api/users/" + id)
        }
         function getOneUser(id) {
            return $http.get("/api/users/" + id)
        }
    })
})();