var app = angular.module('hackerNews', ['ui.router']);

app.factory('posts', [function(){
  var o = {
    posts: [
      {title: 'post 1', upvotes: 5, link: 'https://news.ycombinator.com/', comments: []},
      {title: 'post 2', upvotes: 2, link: 'https://news.ycombinator.com/', comments: [{author: 'Tom', body: 'Interesting.', upvotes: 2}]},
      {title: 'post 3', upvotes: 15, link: 'https://news.ycombinator.com/', comments: [{author: 'Mary', body: 'no way', upvotes: 5}]},
      {title: 'post 4', upvotes: 9, link: 'https://news.ycombinator.com/', comments: [{author: 'Jane', body: 'Bah! Humbug!', upvotes: 10}, {author: 'Kevin', body: 'great. :P', upvotes: 1}]},
      {title: 'post 5', upvotes: 4, link: 'https://news.ycombinator.com/', comments: [{author: 'Bob', body: 'weird!', upvotes: 2}, {author: 'Joe', body: 'cool post', upvotes: 0}]}
    ]
  };
  return o;
}])

app.controller('MainCtrl', [
  '$scope',
  'posts',
  function($scope, posts){
    $scope.posts = posts.posts;
    $scope.addPost = function(){
      if(!$scope.title || $scope.title === '') { return; }
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0
      });
      $scope.title = '';
      $scope.link = '';
    };
    $scope.incrementUpvotes = function(post) {
      post.upvotes += 1;
    };
  }
]);

app.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'posts',
  function($scope, $stateParams, posts){
    $scope.post = posts.posts[$stateParams.id];
    $scope.addComment = function(){
      if($scope.body === '') { return; }
      $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0
      });
      $scope.body = '';
    };
  }
]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
      })
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
      });

    $urlRouterProvider.otherwise('home');
  }
]);
