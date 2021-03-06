"use strict";

function LoginManager() {
    return Qt.createQmlObject("import LoginManager 1.0; LoginManager {}",
                              appWindow, "LoginManager");
}

//function LoginManager(){
//    eventsNotifier = Qt.createQmlObject('import QtQuick 2.0; QtObject { signal loginSuccess;signal loginFailure;signal serverNames(var serverNames);signal lastLogin(string login);signal lastServer(string server) }', Qt.application);
//    return eventsNotifier;
//}


function submitLogin() {
    var loginManager = new LoginManager();

    loginManager.loginSuccess.connect(function(reply){
      loginPage.onLogin();
    });

    loginManager.loginFailure.connect(function(reply){
        error.text = reply;
    });

    loginManager.Login(login.text, password.text, cmbServers.currentText);
}

function onLoad(){
    var loginManager = new LoginManager();

    // Populate Server List
    loginManager.serverNames.connect(function(ServerNames){
        for(var i = 0;i<ServerNames.length;i++){
            serverModel.add(ServerNames[i]);
        }
    });

    loginManager.GetServerNames();

    // Populate Last Server
    loginManager.lastServer.connect(function(lastServer){
        if (lastServer != ""){
            cmbServers.currentIndex = cmbServers.find(lastServer);
        }
    });

    loginManager.GetLastServerName();

    // Populate Last Login
    loginManager.lastLogin.connect(function(lastLogin){
        if (lastLogin != ""){
            login.text = lastLogin;
            password.focus = true;
        }
    });

    loginManager.GetLastLogin();
}
