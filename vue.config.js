module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        "productName": "Concéntrese",
				"win": {
					"icon": "public/icon.ico",
					"target": "NSIS",
				},
				"nsis": {
					"oneClick": false,
					"perMachine": true,
					"artifactName": "${productName} ${version}.${ext}",
					"installerIcon": "public/icon.ico",
					// "installerHeader": "public/InstallerHeader.bmp",
					"allowElevation": true,
					"menuCategory": "Startup",
					"createDesktopShortcut": true,
					"createStartMenuShortcut": true,
					// "installerHeaderIcon ": "public/InstallerHeader.bmp",
					// "installerSidebar": "public/InstallerHeader2.bmp",
					"allowToChangeInstallationDirectory": true
				},
      }
    }
  }
}