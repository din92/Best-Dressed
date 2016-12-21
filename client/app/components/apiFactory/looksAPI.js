(function(){
"use strict"

angular.module("app").factory("looksAPI",function($http){
    return{
        addScrapePost:addScrapePost,
        getAllLooks:getAllLooks
    }
    function addScrapePost(look){
       return  $http.post("/api/mylooks/scrapeUpload",look);
    }
   function getAllLooks(){
       return $http.get("/api/mylooks/getAllLooks");
   }
})
})();