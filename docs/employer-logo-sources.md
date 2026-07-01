# Employer Logo Sources

These assets are static brand references for the NEXHIBIT prototype. They are not AI-generated. Keep them as nominative brand display only and review each company's brand guidelines before any commercial launch.

| Employer | Local asset | Source |
| --- | --- | --- |
| Alibaba Cloud | `/public/assets/employers/emp-001.svg` | Simple Icons `alibabacloud` (`CC0-1.0`) |
| BYD International | `/public/assets/employers/emp-002.png` | BYD domain favicon fallback from `bydglobal.com` |
| SHEIN Global | `/public/assets/employers/emp-003.svg` | SHEIN Group website embedded header SVG |
| Bosch China | `/public/assets/employers/emp-004.svg` | Simple Icons `bosch` (`CC0-1.0`) |
| Siemens China | `/public/assets/employers/emp-005.svg` | Simple Icons `siemens` (`CC0-1.0`) |
| SenseTime | `/public/assets/employers/emp-006.webp` | SenseTime website header logo image |
| Geek+ Robotics | `/public/assets/employers/emp-007.webp` | Geek+ website header logo image |
| Tencent Global | `/public/assets/employers/emp-008.webp` | Tencent website header logo image |

Implementation notes:
- `EmployerLogo` renders these as images with `object-contain`, not `background-cover`, so wordmarks are not cropped.
- `getEmployerLogoSrc` maps each employer ID to the correct extension.
- `Lingxi AI` and `Cathay Robotics` were replaced with real companies, `SenseTime` and `Geek+ Robotics`, so the dataset no longer presents fictional companies as if they had real logos.
