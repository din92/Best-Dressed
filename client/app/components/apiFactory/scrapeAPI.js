(function(){
"use strict"

angular.module("app").factory("scrapeAPI",function($http){
    return{
        getScrapedDeatils:getScrapedDeatils
    }
    function getScrapedDeatils(link){
       return  $http.post("/api/links/scrape",link);
    }
})
})();
