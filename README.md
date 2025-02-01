@myorg/custom-application
===============================================
Custom App

Original Author Jon G Lind
[Article 1](https://www.servicenow.com/community/next-experience-articles/setting-up-command-line-interface-cli-for-custom-component-dev/ta-p/2361588)


ServiceNow Command Line Interface (CLI)
---------------------------------------

**NOTE: Updated as of Washington DC release, Now CLI (SNC) v1.1.2, UI-Component version v26+.**

The ServiceNow Command Line Interface (ServiceNow CLI or “SNC CLI”) is a tool which you can install and use it to make your own custom components which you can then leverage on a UIB page much like other components which ServiceNow has developed for your use.

Setting up the CLI Tool for Component Dev
-----------------------------------------

The CLI tool does a few things, but what we are interested in is the ui-component module (this used to be called "sn-cli").  ServiceNow provides thorough documentation, but there are a couple of quirks that can cause setting up the tool to fail and this document is intended to guide you through the setup in the most direct fashion possible and include some details, like dependent version numbers, that the docs lack.

### Use this guide instead of the official documentation

For reference this is based on the official [ServiceNow CLI](https://docs.servicenow.com/bundle/rome-application-development/page/build/servicenow-cli/concept/servicenow-cli.html) documentation.  However, we will be skipping some steps and changing others, so be sure to follow the instructions here.

Once you have completed this guide you will have a functional CLI installation. Go to [Part 2](https://www.servicenow.com/community/next-experience-articles/developing-a-custom-ui-component-with-the-now-command-line/ta-p/2502529) in order to begin development and for tips on source control and a fix for the event deployment bug.

A -- Install Node Version Manager (NVM)
---------------------------------------

1\. You must install an older version of **Node** and **NPM**. _NVM_ will automate installing and switching different versions of node.

### _Follow these instructions to install NVM_

a. [macOS](https://github.com/nvm-sh/nvm#installing-and-updating) 

b  [Windows](https://github.com/coreybutler/nvm-windows#install-nvm-windows)  (download the latest "nvm-setup.exe" from [the releases page](https://github.com/coreybutler/nvm-windows/releases)).

### Switch to Node.js v16.16.0

2\. After installing NVM use the following command to install and switch to version 12:

nvm install v16.16.0  
nvm use v16.16.0

#### Note about error messages

While this improved in the latest version of Now CLI you will still see a lot of error messages and warnings and most of these can be ignored.  As long as you are able to progress to the next step they are probably not significant.

B -- Install the CLI
--------------------

Download the [latest ServiceNow CLI installer from the store](https://store.servicenow.com/sn_appstore_store.do#!/store/application/9085854adbb52810122156a8dc961910) and install it.   
  
Note on Macos: After unzipping the contents of the file you'll need to hold down "option" while double-clicking the osx-installer file.

### Set the Default Profile

This step is not immediately necessary, but once you know the environment for which you will be doing development you must set that as the default profile (this is in addition to logging into the environment for UI Component dev, which is covered later).  _Note:_ As of this time _you may only develop on your default profile instance_ and must change it when switching developing between instances.

    snc configure profile set

Follow [the prompts](https://docs.servicenow.com/bundle/rome-application-development/page/build/servicenow-cli/task/configure-profile.html) and specify the instance URL, basic auth and username and password.

NOTE: If you get this error "this instance does not support dynamic commands" go to your instance and navigate to "System Definition > Plugins" and search for and install "CLI Metadata" and continue on this guide.

![JonGLind_0-1678478505541.png](https://www.servicenow.com/community/image/serverpage/image-id/246518iE515CF23DCB98EC4/image-size/large?v=v2&px=999)

C -- Add the UI Component Extension to the SNC CLI
--------------------------------------------------

After installing the "snc" tool you will need to add the "ui-component" extension.  This is what allows you to do development with the now-cli command line.  Simply use the following command:

    snc extension add --name ui-component

You may use the snc tool to update to the latest version of the ui-component extension.

    snc extension update --name ui-component

  
You may receive another scary looking message "**COULD NOT VALIDATE INSTANCE VERSION BY ACCESSING**" but [you can fix it](https://www.servicenow.com/community/next-experience-articles/troubleshooting-servicenow-cli-errors/ta-p/2464448 "Fix Could Not Validate Instance Error").

![JonGLind_0-1678478718974.png](https://www.servicenow.com/community/image/serverpage/image-id/246520iC75927C8C64FBDA0/image-size/large?v=v2&px=999)


------

ServiceNow Command Line Interface (CLI)
---------------------------------------

The ServiceNow Command Line Interface (ServiceNow CLI or “SNC CLI”) is a tool which you can install and use it to make your own custom components which you can then leverage on a UIB page much like other components which ServiceNow has developed for your use.

**  
If you have not installed the CLI yet**, go to [Part One](https://www.servicenow.com/community/next-experience-articles/setting-up-command-line-interface-cli-for-custom-component-dev/ta-p/2361588) of this two-part guide (where steps A through C are covered).

D -- Setup your project
-----------------------

#### Create Application Scope in your Instance

1\. Setup a new application scope in your instance to install your component into.  

2\. Open **System Applications > Studio** within your instance.

3\. Click **Create Application** button to create a scope to use _just for the component_.  Any other assets, like the UX page that uses it or other supporting configs like tables and flows should be in other app scopes. 

4\. Give it a name that represents precisely what the component does and make a note of the _scope_.

5\. Click "Create" then "Continue in Studio" to complete scope creation.

6\. Open the newly created app and then select **File > Settings** and verify that "JavaScript Mode" is set to **ECMAScript 2021** or greater.

Here is an example of my scope's name which I then used with the following command to setup my project.

[4-1666631795666.png](https://www.servicenow.com/community/image/serverpage/image-id/211539i8280F9C874C6C7DB/image-size/medium?v=v2&px=400)

E -- Scaffold your Component
----------------------------

The SNC CLI tool will scaffold a bare component to begin development from, including references to dependencies so that Node Package Manager (NPM) can download dependencies.

1\. Create a new folder in your dev folder that matches the name of your project but lower case and with dashes (unlike other tools, such as git, SNC CLI will not create a subfolder automatically). 

E.g. ~\\dev\\photobooth-uic-camera or c:\\dev\\photobooth-uic-camera. 

2\. Change into your new project folder and execute the following command.

NOTE: The name uses _dashes_ and the scope uses _underscores_.  The org name can be anything. I use my initials.

    snc ui-component project --name @myorg/hello-world --scope x_snc_hello_world

F -- Install Dependencies
-------------------------

Finally use NPM to install the necessary dependencies.  Heads up--this will take quite a long time.

    npm install

H -- Continue to Develop a Component
------------------------------------

Complete "[Develop a component](https://docs.servicenow.com/bundle/rome-application-development/page/build/components/task/develop-component.html)" from the official docs but **do NOT use the suggested commands to run the app locally** as specified in Step 4.

Instead simply use this:

    snc ui-component develop --open

This will run the component locally and open a web browser for viewing. 

I -- Deploy your Component to Your Instance
-------------------------------------------

Before [deploying your component to your instance](https://docs.servicenow.com/bundle/sandiego-application-development/page/build/components/task/deploy-to-instance.html) be sure to [follow the instructions to configure the now-ui.json file](https://developer.servicenow.com/dev.do#!/reference/now-experience/quebec/cli/ui-builder) which is created for you.  This maps properties and attributes and is a manifest that lets UI Builder (UIB) know that it's available to drag and drop into your page and allows a UIB developer to specify properties and respond to events.

Note: In earlier versions I stated that you must always use "--force", but as of the latest version of the CLI that is no longer necessary.  Do NOT use force as it wipes out the entire app scope when you do this! 

    snc ui-component deploy

J -- Pro Tip for Git
--------------------

You may add your component scope to source control from Studio in your instance and then _use the same repo_ to host the source code while you are working on the component.  In this way you can push the deployed version of the app to the repo from your instance after each deployment but also keep the raw source code behind the scenes in the same repo.  If you wish to take the component to another instance you may simply pull it from Git directly into the instance without having to use the CLI.

K -- Post Deployment Steps
--------------------------

There are two things to do once you're ready to start deploying the component to your instance.

### Create a UIB Test Page in a Different Scope

 Go back to your environment and create a new scoped app to test your component.  I like to use the naming convention like "photobooth-app" and "photobooth-uic-camera".  Then add a new UI Builder page to the app and drag and drop your new component! 

The test page and the component must be in separate scopes because while deploying components the tools erase everything and start over and your test pages will be destroyed.

### Create and Bind Events Manually In the Instance

After deploying your component if it dispatches events you must go into your environment and manually specify which events it dispatches and responds to. 

1\. In your environment change to your component's scope.

2\. Create sys\_ux\_event records by opening **Now Experience Framework > Actions and Events > UX Events** and clicking **New.**These records are extremely simple and should match the long event name of the event from your component (e.g. "POPULAR\_ARTICLES\_CARD\_CLICK") and hav a pleasing label that will be visible within UIB (e.g. "Popular articles card click").

2\. Locate the **sys\_us\_macroponent** record for your component and select your events in **Dispatched Events** field then save the record.

[0-1678308507727.png](https://www.servicenow.com/community/image/serverpage/image-id/245841iA225FBD9D58A7028/image-size/medium?v=v2&px=400)

Note: At one point there was a bug in the now cli which caused your event bindings to get wiped out after each deployment and I had suggested a work around here. As of version 1.1.2 (v26+ of the Servicenow that is no longer necessary!


