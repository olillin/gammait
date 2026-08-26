# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html) after v1.0.4.

## [Unreleased]

### Added

- Allow List API client.
- Account Scaffold API client.
- Documentation with links to Gamma Docs for all API methods and models.
- Support for scopes UserInfo endpoint.
- Workflow for GitHub releases.
- Prettier plugins to sort imports and format package.json.

### Changed

- Project description in package.json and README.

### Fixed

- OAuth2 URL paths missing `/oauth2` prefix.

### Security

- Update vulnerable dependencies.

## [1.0.4] - 2026-06-20

### Added

- Support for different API key formats.
- Automated QA and publish workflows.
- Unit testing

### Changed

- Reorganize URL collection (BREAKING).
  - `AUTHORIZE_PATH` -> `OAUTH2_AUTHORIZE_PATH`
  - `AUTHORIZE` -> `OAUTH2_AUTHORIZE`
  - `TOKEN_PATH` -> `OAUTH2_TOKEN_PATH`
  - `TOKEN` -> `OAUTH2_TOKEN`
- Improve internal project structure.

### Security

- Update vulnerable dependencies.

## [1.0.3] - 2026-04-05

### Security

- Updated vulnerable dependencies.

## [1.0.2] - 2026-01-28

### Security

- Updated vulnerable dependencies.

## [1.0.1] - 2025-02-09

### Added

- README file with project description.

## [1.0.0] - 2025-02-09

### Added

- Client API, Info API and Authorization Code clients.
- Collection of Gamma API URLs.
- Gamma model types:
  - User
  - UserInfo
  - UserWithGroups
  - Group
  - GroupWithPost
  - Post
  - PostInfo
  - SuperGroup

[1.0.0]: https://github.com/olillin/gammait/commits/v1.0.0
[1.0.1]: https://github.com/olillin/gammait/compare/v1.0.0...v1.0.1
[1.0.2]: https://github.com/olillin/gammait/compare/v1.0.1...v1.0.2
[1.0.3]: https://github.com/olillin/gammait/compare/v1.0.2...v1.0.3
[1.0.4]: https://github.com/olillin/gammait/compare/v1.0.3...v1.0.4
[unreleased]: https://github.com/olillin/gammait/compare/v1.0.4...dev
