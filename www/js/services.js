angular.module('starter.services', [])

.factory('Movies', function(){
	var movies = [{id: 1, name:'Movie A', price:'42', freshness: 60, genre: "comedy", min_level: 1, movie_length: 2},
								   {id: 2, name:'Movie BB', price:'87', freshness: 100, genre: "action", min_level: 1,movie_length: 2}, 
								   {id: 3, name:'Movie C', price:'110', freshness: 45, genre: "horror", min_level: 1, movie_length: 3}];
	return { 
		all: function (){
			   return movies;
		}, 
		get_name: function(movie_id){
			angular.forEach(movies, function(smovie, key) {
				if(smovie.id===movie_id)
				{
					return smovie.name;
				}
			});
		}
	}
})

.factory('Games', function(){
   var games = [{id: 1, name: 'Level 1', end_time: 30, type: "money", type_amount: 500, min_level: 1}];
   return {
	   all: function(){
		   return games;
	   }
   }
})

.factory('Players', function(){
	 var players = [{id: 1, name: "name", money: 500, rep: 0, current_station: 1}];
	  return {
		  all: function(){
		     return players;
		  } 
		}
	
 })

.factory('Stations', function(Movies, $q){
	 var stations = [{id: 1, name:"Station A", owner_id: 1, level: 1}];
	 var station_movies = [{station_id: 1, movie_id: 2, movie_name: "Movie B", movie_length: 2},
	 {station_id: 2, movie_id: 3, movie_name: "Movie C", movie_length: 2}
	];
	
   return {
	    all: function(){
		     return stations;
	    }, 
	    add_movie: function(station_id, movie_id, movie_name, movie_length){
       var dfd = $q.defer();   
		    var amovie = {station_id: station_id, movie_id: movie_id, movie_name: movie_name, movie_length: movie_length};
		    station_movies.push(amovie);
		    dfd.resolve(station_movies);
		
		    return dfd.promise;
	    }, 
	    remove_movie: function(station_id, movie_id){ 
		    var new_station_movies = [];
		    angular.forEach(station_movies, function(smovie, key) {
         		if(smovie.station_id === station_id && smovie.movie_id === movie_id){        
			   // 			delete smovie; 
	    	     }	else { 
				        new_station_movies.push(smovie); 
				     } 
    		 });
		    station_movies = new_station_movies;
		  }, 
	    buy_movie_list: function(station_id){
		
				var all_movies = [];
				var filter_movies = [];
			
			  angular.forEach(station_movies, function(smovie, key) {
        		if(smovie.station_id === station_id){        
			      			  filter_movies.push(smovie.movie_id);
			     }
    		 });
		

		    angular.forEach(Movies.all(), function(amovie, key) {
			      amovie.sold=1;
			     
        		if(filter_movies.indexOf(amovie.id) != -1){ 
			           amovie.sold=0;
			     }
							     all_movies.push(amovie);
    	 	});
		
		     return all_movies;
			 }, 
	    get_movies: function(station_id){
		   var all_movies=[{station_id: station_id, movie_id: 0, movie_name: "", movie_length: 0}];
    		angular.forEach(station_movies, function(smovie, key) {
        		if(smovie.station_id === station_id){        
			      			  all_movies.push(smovie);
			     }
    		});
       return all_movies;
	    }
   }
})

.factory('Cities', function(){
  var cities = [{id: 1, name:'City 1', population: 50000}];
   return {
	   all: function (){
		    return cities;
		 }
   }
})


.factory('Schedule', function(Movies, Stations){
   var schedule = [{id: 1, name: "Monday", station_id: 1, day: 1, 
											times: [{slot: 1, name: "8pm", item_id: 2, item_name: "Movie A", part_id: 1}, 
														 {slot: 2, name: "9pm", item_id: 2, item_name: "Movie A", part_id: 2}, 
														{slot: 3, name: "10pm", item_id: 0, item_name: "", part_id: 0}, 
														 {slot: 4, name: "11pm", item_id: 2, item_name: "Movie A", part_id: 3},
															 {slot: 5, name: "12am", item_id: 0, item_name: "", part_id: 0},
														{slot: 6, name: "1am", item_id: 0, item_name: "", part_id: 0},
														{slot: 7, name: "2am", item_id: 0, item_name: "", part_id: 0}													 
														 ]						 											
											}
										];
    return {
		  all: function(){
		     return schedule;
		  }, 	
		  delete_movie: function(station_id, day, movie_id){
			
			 			today_schedule=this.get(station_id, day); 
			var times_set=[];
			angular.forEach(today_schedule.times, function(aslot, key) {
        			if(aslot.item_id === movie_id){   
		       			var new_slot =[{ slot: aslot.slot, name: aslot.name, item_name: '', item_id: 0, part_id: 0 	}];  
			     	times_set.push(new_slot[0]);
				}
				else {
					times_set.push(aslot);
			    	}
			});
			
			  today_schedule.times=times_set;
			  for (var i = 0; i < schedule.length; i++) {
       	if (schedule[i].day === parseInt(day) && schedule[i].station_id === parseInt(station_id)) {
            schedule[i]=today_schedule;
          }
        }

		  }, 
		  save_slot: function(station_id, day, slot, movie_id, movie_name, part_id){
			today_schedule=this.get(station_id, day); 
			var times_set=[];
			angular.forEach(today_schedule.times, function(aslot, key) {
        			if(aslot.slot === slot){   
		       			var new_slot =[{ slot: aslot.slot, name: aslot.name, item_name: movie_name, item_id: movie_id, part_id: part_id 	}];  
			     	times_set.push(new_slot[0]);
				}
				else {
					times_set.push(aslot);
			    	}
			});
			
			  today_schedule.times=times_set;
			  for (var i = 0; i < schedule.length; i++) {
       	if (schedule[i].day === parseInt(day) && schedule[i].station_id === parseInt(station_id)) {
            schedule[i]=today_schedule;
          }
        }
		  }, 
		  get: function(station_id, day){
			 for (var i = 0; i < schedule.length; i++) {
          if (schedule[i].day === parseInt(day) && schedule[i].station_id === parseInt(station_id)) {
            return schedule[i];
          }
        }
        return null;
		  }
		}
	
 })



.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
