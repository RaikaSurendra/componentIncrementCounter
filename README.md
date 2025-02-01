@myorg/custom-application
===============================================
Custom App

Component Authors, provide some documentation for your users here!


ServiceNow Command Line Interface (CLI)

NOTE: Updated as of Washington DC release, Now CLI (SNC) v1.1.2, UI-Component version v26+.

 

The ServiceNow Command Line Interface (ServiceNow CLI or “SNC CLI”) is a tool which you can install and use it to make your own custom components which you can then leverage on a UIB page much like other components which ServiceNow has developed for your use.

 
Setting up the CLI Tool for Component Dev

The CLI tool does a few things, but what we are interested in is the ui-component module (this used to be called "sn-cli").  ServiceNow provides thorough documentation, but there are a couple of quirks that can cause setting up the tool to fail and this document is intended to guide you through the setup in the most direct fashion possible and include some details, like dependent version numbers, that the docs lack.
 
Use this guide instead of the official documentation

For reference this is based on the official ServiceNow CLI documentation.  However, we will be skipping some steps and changing others, so be sure to follow the instructions here.

 

Once you have completed this guide you will have a functional CLI installation. Go to Part 2 in order to begin development and for tips on source control and a fix for the event deployment bug.

 
A -- Install Node Version Manager (NVM)

1. You must install an older version of Node and NPM. NVM will automate installing and switching different versions of node.

 
Follow these instructions to install NVM

a. macOS 

b  Windows  (download the latest "nvm-setup.exe" from the releases page).

 
Switch to Node.js v16.16.0

2. After installing NVM use the following command to install and switch to version 12:

nvm install v16.16.0
nvm use v16.16.0

 
Note about error messages
While this improved in the latest version of Now CLI you will still see a lot of error messages and warnings and most of these can be ignored.  As long as you are able to progress to the next step they are probably not significant.
 
B -- Install the CLI

Download the latest ServiceNow CLI installer from the store and install it. 

Note on Macos: After unzipping the contents of the file you'll need to hold down "option" while double-clicking the osx-installer file.

 
Set the Default Profile

This step is not immediately necessary, but once you know the environment for which you will be doing development you must set that as the default profile (this is in addition to logging into the environment for UI Component dev, which is covered later).  Note: As of this time you may only develop on your default profile instance and must change it when switching developing between instances.

 

snc configure profile set

 

Follow the prompts and specify the instance URL, basic auth and username and password.

 

NOTE: If you get this error "this instance does not support dynamic commands" go to your instance and navigate to "System Definition > Plugins" and search for and install "CLI Metadata" and continue on this guide.

 
JonGLind_0-1678478505541.png

 
C -- Add the UI Component Extension to the SNC CLI

After installing the "snc" tool you will need to add the "ui-component" extension.  This is what allows you to do development with the now-cli command line.  Simply use the following command:

snc extension add --name ui-component

 

You may use the snc tool to update to the latest version of the ui-component extension.

snc extension update --name ui-component


You may receive another scary looking message "COULD NOT VALIDATE INSTANCE VERSION BY ACCESSING" but you can fix it.
JonGLind_0-1678478718974.png

  
Next Steps

To continue to setting up and begin dev of your first component, continue to Part 2 - Developing a Custom UI Component.
