	var listDemo;
	var initialAppStart = false;
<<<<<<< HEAD
	var realtimeLoader;
	var DEBUG_MODE = true;

=======
  var realtimeLoader;
>>>>>>> origin/gh-pages

	var realtimeOptions = {

		/**
		* Client ID from the console.
		*/
<<<<<<< HEAD
		clientId: '777750276820-30pop6psr99unjqt34ubmrq50fi5ao76.apps.googleusercontent.com',
=======
		clientId: '488687976561-cbn0sjmncb567hviggdetb3g84tb6ipk.apps.googleusercontent.com',
>>>>>>> origin/gh-pages

		/**
		* The ID of the button to click to authorize. Must be a DOM element ID.
		*/
		authButtonElementId: 'authorizeButton',

		appId: '500599261050',

		/**
		* Function to be called when a Realtime model is first created.
		*/
		initializeModel: initializeModel,

		/**
		* Autocreate files right after auth automatically.
		*/
		autoCreate: false,

		/**
		* The name of newly created Drive files.
		*/
		defaultTitle: "Snug Baby GAPI file",

		/**
		* Function to be called every time a Realtime file is loaded.
		*/
		onFileLoaded: onFileLoaded,

		/**
		* The MIME type of newly created Drive Files. By default the application
		* specific MIME type will be used:
		*     application/vnd.google-apps.drive-sdk.
		*/
      	newFileMimeType: null, // Using default.

		/**
		* Function to be called to inityalize custom Collaborative Objects types.
		*/
		registerTypes: null, // No action.

		/**
		* Function to be called after authorization and before loading files.
		*/
		afterAuth: afterAuth // No action.
	}

<<<<<<< HEAD
	//
=======
	/*retrieveAllFiles(function(response){
		console.log(response.toString());
	});*/

>>>>>>> origin/gh-pages
	function initializeModel(model){
			var collaborativeList = model.createList();
			model.getRoot().set("data_list", collaborativeList);
	}

	/**
	* Retrieve a list of File resources.
	*
	* @param {Function} callback Function to call when the request is complete.
	*/

	function retrieveAllFiles(callback) {
		var retrievePageOfFiles = function(request, result) {
			request.execute(function(resp) {
		  		result = result.concat(resp.items);
				var nextPageToken = resp.nextPageToken;
				if (nextPageToken) {
					request = gapi.client.drive.files.list({
					  'pageToken': nextPageToken
					});
					retrievePageOfFiles(request, result);
				} else {
					callback(result);
				}
			});
		}
		var initialRequest = gapi.client.drive.files.list();
		retrievePageOfFiles(initialRequest, []);
	}


	function onFileLoaded(doc){
		var model = doc.getModel();
		listDemo = model.getRoot().get("data_list");
		var array = listDemo.asArray();
		var length = listDemo.length;

		for(var i=0; i< 5; i++){
			console.log("");
		}
		console.log("-----------------------------------------------");
		console.log("-------------- FULL INFORMATION ---------------");
		console.log("-----------------------------------------------");
		console.log("\t" + array);
		for(var i=0; i< 5; i++){
			console.log("");
		}

		var textarea = $("#textarea")[0];
		textarea.value = array;

		var onListChange = function(event){
			textarea.setAttribute('value', array);
			console.log("TextArea value is " + textarea.value);
		}

		listDemo.addEventListener(gapi.drive.realtime.EventType.VALUES_ADDED, onListChange);
		listDemo.addEventListener(gapi.drive.realtime.EventType.VALUES_REMOVED, onListChange);

		onListChange();
	}

<<<<<<< HEAD
	function afterAuth () {
		// only create/load files when no files were loaded initialy
		gapi.client.load('drive', 'v2', function () {
			if (rtclient.params.fileIds && rtclient.params.fileIds.length) {
				return;
			}
			retrieveAllFiles(function (files) {
				if (files.length === 0) {
					// create new file
					realtimeLoader.createNewFileAndRedirect();
				} else {
					// get last file and use it
					// TODO: add dialog to select files
					var file = files[files.length - 1];
					realtimeLoader.redirectTo([file.id], realtimeLoader.authorizer.userId);
				}
			});
		});
	}

	function startGoogleDriveRealtime() {
		realtimeLoader = new rtclient.RealtimeLoader(realtimeOptions);
		realtimeLoader.start();
	}
=======
  function afterAuth () {
    // only create/load files when no files were loaded initialy
    gapi.client.load('drive', 'v2', function () {
      if (rtclient.params.fileIds && rtclient.params.fileIds.length) {
        return;
      }
      retrieveAllFiles(function (files) {
        if (files.length === 0) {
          // create new file
          realtimeLoader.createNewFileAndRedirect();
        } else {
          // get last file and use it
          // TODO: add dialog to select files
          var file = files[files.length - 1];
          realtimeLoader.redirectTo([file.id], realtimeLoader.authorizer.userId);
        }
      });
    });
  }

	function startGoogleDriveRealtime() {
		realtimeLoader = new rtclient.RealtimeLoader(realtimeOptions);
    realtimeLoader.start()
	}
>>>>>>> origin/gh-pages
