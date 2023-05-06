module.exports = {
  packagerConfig: {
    icon: './icons/icon',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        setupIcon: './icons/icon.ico',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'win32', 'linux'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: './icons/icon.png',
        }
      },
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        icon: './icons/icon.icns',
        debug: false,
        name: 'runway-detection'
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        icon: './icons/icon.png',
      },
    },
  ],
};
