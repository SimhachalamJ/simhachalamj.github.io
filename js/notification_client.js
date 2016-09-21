/**
 * 
 */
function NotificationClient()
{
    this.checkSetup();
    this.initFirebase();
}
NotificationClient.prototype.initFirebase = function()
{
    // Shortcuts to Firebase SDK features.
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
    // Initiates Firebase auth and listen to auth state changes.
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};
NotificationClient.prototype.checkSetup = function()
{
    if (!window.firebase || !(firebase.app instanceof Function) || !window.config)
    {
        window.alert('You have not configured and imported the Firebase SDK. ' + 'Make sure you go through the codelab setup instructions.');
    }
    else if (config.storageBucket === '')
    {
        window
                .alert('Your Firebase Storage bucket has not been enabled. Sorry about that. This is ' + 'actually a Firebase bug that occurs rarely. ' + 'Please go and re-generate the Firebase initialisation snippet (step 4 of the codelab) ' + 'and make sure the storageBucket attribute is not empty. ' + 'You may also need to visit the Storage tab and paste the name of your bucket which is ' + 'displayed there.');
    }
};
NotificationClient.prototype.signIn = function()
{
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider);
    this.onAuthStateChanged(this);
};
NotificationClient.prototype.onAuthStateChanged = function(user)
{
    if (user)
    { // User is signed in!
        console.log(user);
    }
    else
    { // User is signed out!
        // Hide user's profile and sign-out button.
        this.signIn();
    }
};
window.onload = function()
{
    window.noticationClient = new NotificationClient();
};