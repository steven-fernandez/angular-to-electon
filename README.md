# Angular to Electron CLI Tool

A command-line tool to convert Angular applications into Electron desktop applications with cross-platform support.

## Features

### Core Features
- 🔄 One-command Angular to Electron conversion
- 🖥️ Cross-platform build support (macOS, Windows, Linux)
- ✅ Automatic project structure validation
- 📦 Automated dependency installation
- ⚙️ Platform-specific build configurations

### Technical Features
- Automatic Electron main process configuration
- IPC communication setup between Angular and Electron
- Proper window management setup
- Development and production build configurations
- Cross-platform packaging setup
- Hot-reload support in development

## Installation

```bash
npm install -g angular-to-electron
```

## Usage

### Basic Usage
```bash
angular-to-electron /path/to/angular-app
```

### With Platform Specification
```bash
angular-to-electron /path/to/angular-app --platforms macos,windows,linux
```

### Options
- `--platforms, -p`: Target platforms (comma-separated) [default: "macos,windows"]
- `--help, -h`: Show help information

## Requirements

- Node.js 14+
- npm 6+
- Angular project (version 12+)
- Git (for development)

## Project Structure After Conversion

```
your-angular-app/
├── src/
│   └── ... (Angular source files)
├── main.js             # Electron main process file
├── preload.js          # Electron preload script
├── electron-builder.json   # Electron build configuration
└── package.json        # Updated with Electron scripts
```

## Available Scripts After Conversion

```bash
# Run in development mode
npm run electron:serve

# Build and run
npm run electron:build

# Package for distribution
npm run electron:package
```

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/angular-to-electron.git
cd angular-to-electron
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Link the package locally:
```bash
npm link
```

## Building for Distribution

The tool configures your Angular app with electron-builder. After conversion, you can build your app for different platforms:

### macOS
```bash
npm run electron:package -- --mac
```

### Windows
```bash
npm run electron:package -- --win
```

### Linux
```bash
npm run electron:package -- --linux
```

## Troubleshooting

### Common Issues

1. **Electron Installation Failed**
   - Ensure you have proper network connectivity
   - Try running with admin privileges

2. **Build Errors**
   - Make sure your Angular app builds successfully before conversion
   - Check if all dependencies are properly installed

3. **Packaging Errors**
   - Ensure you have the necessary platform-specific requirements installed
   - For Windows builds on macOS/Linux, wine is required
   - For macOS builds, XCode is required

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

## Support

For issues and feature requests, please [open an issue](https://github.com/yourusername/angular-to-electron/issues)
