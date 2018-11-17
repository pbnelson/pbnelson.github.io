<p align="center">
  <img src="https://peirmobile.com/wp-content/uploads/2017/09/PEIR_header-logo.png">
</p>


# Outlook Add-in Example, One-Time Event Requests

Build an add-in for Microsoft Outlook (online, desktop or smartphone) that creates a PEIR one-time event request which can be emailed to any recipient.

For more information on Outlook add-in development, see [Microsoft's Advanced Outlook add-in tutorial: Git the Gist](https://docs.microsoft.com/en-us/outlook/add-ins/addin-tutorial)

---
## Table of Contents

1. [Prerequisites](#prerequisites)
1. [Generate the project](#generate-the-project)

<br>
<br>

---
# Prerequisites

* node.js
* Outlook 2016 or later, or Outlook Online

---
# Generate the project

###### Install [Yeoman](https://yeoman.io/) and the [Microsoft Office Add-in Project Generator](https://github.com/officedev/generator-office)
```bash
npm install -g yo generator-office
```

###### Generate the template
```bash
yo office

# Choose a project type - `Office Add-in project using Jquery framework`
# Choose a script type - `Javascript`
# What do you want to name your add-in? - `PEIR OTE`
# Which Office client application would you like to support? - `Outlook`
```

Check that the yeoman template generator finished without errors.

##### Start local server

```bash
npm start
```

##### Trust the self-signed certificate

Open your web browser to https://localhost:3000 and ensure that it is securely connected in `https` mode, otherwise Outlook will not load the add-in. This is only needed when developing on your local machine, it would not be required when running on your (secure) production servers.

If not secure, follow the directions on Microsoft's page for [Adding Self-Signed Certificates as Trusted Root Certificate](https://github.com/OfficeDev/generator-office/blob/master/src/docs/ssl.md)

##### Sideload the add-in template

Follow directions on Microsoft's page to [Sideload the add-in](https://docs.microsoft.com/en-us/outlook/add-ins/addin-tutorial#sideload-the-add-in)

